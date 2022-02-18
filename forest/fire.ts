namespace forestFire {
    class FireState {
        period: number;
        timer: number;

        timeBuffer: Image;
        healthBuffer: Image;

        tileCache: Image[];
        unburntTileCache: Image[];

        fireImage: Image;

        windSpeed: number;
        treeHealth: number;
        dryGrass: number;

        fireCreatedHandlers: ((location: tiles.Location) => void)[];
        fireDestroyedHandlers: ((location: tiles.Location) => void)[];

        fireHasStarted: boolean;
        updateHasBeenCalled: boolean;

        constructor() {
            // Every period (in ms) we update the fire spread. The timer tracks how
            // much time is remaining in the period
            this.period = 300;
            this.timer = this.period;

            // The time remaining is stored inside an image. Each "pixel" represents a tile
            // and the "color" is the time remaining. For example, if the color is 3, the time
            // remaining is 3 * this.period
            this.timeBuffer = image.create(16, 16);

            // Same for fire health
            this.healthBuffer = image.create(16, 16);

            // The tile cache is for storing tiles so that we don't create the same tile multiple times
            this.tileCache = [];
            this.unburntTileCache = [];

            // These handlers run whenever a fire is created or destroyed
            this.fireCreatedHandlers = [];
            this.fireDestroyedHandlers = [];

            this.windSpeed = 5;
            this.treeHealth = 4;
            this.dryGrass = 5;

            this.fireHasStarted = false;
            this.updateHasBeenCalled = false;


            game.onUpdate(() => {

                let burntTrees = 0;
                let unburntTrees = 0;
                let activeFires = 0;

                for (const tile of this.unburntTileCache) {
                    unburntTrees += tiles.getTilesByType(tile).length;
                }

                for (let x = 0; x < this.timeBuffer.width; x++) {
                    for (let y = 0; y < this.timeBuffer.height; y++) {
                        if (this.timeBuffer.getPixel(x, y) === 0) continue;
                        else if (this.timeBuffer.getPixel(x, y) < 15) {
                            activeFires++;
                            burntTrees++;
                        }
                        else if (this.timeBuffer.getPixel(x, y) === 15) {
                            burntTrees ++;
                        }
                    }
                }

                const totalTrees = unburntTrees + burntTrees;

                hud.updateForestHealth(totalTrees, unburntTrees);
                hud.updateFireNumber(activeFires)

                if (this.danger < 2.5) {
                    hud.updateDangerBarColors(7)
                } else if (this.danger < 5) {
                    hud.updateDangerBarColors(5)
                } else if (this.danger < 7.5) {
                    hud.updateDangerBarColors(4)
                } else {
                    hud.updateDangerBarColors(2)
                }

                if (this.updateHasBeenCalled && this.fireHasStarted && activeFires == 0) {
                    const score = Math.round((unburntTrees / totalTrees) * 100);
                    info.setScore(score)
                    game.splash("You saved " + score + "% of the forest!");
                    game.over(score > 0);
                }
            })
        }

        get danger() {
            return (this.windSpeed + this.dryGrass + (10 - this.treeHealth)) / 3
        }

        get spreadTime() {
            return 4500 - (this.danger / 10) * 3500;
        }

        getRandomSpreadInterval() {
            const spreadTime = this.spreadTime + Math.randomRange(0, 1000);
            return Math.min(14, Math.idiv(spreadTime, this.period));
        }

        createFireAtRandomLocation(tile: Image, fire: Image) {
            this.fireImage = fire;
            this.createFireAtLocation(tiles.getRandomTileByType(tile), tile, fire);
        }

        createFireAtLocation(location: tiles.Location, tile: Image, fire: Image) {
            if (location) {
                this.fireHasStarted = true;
                let image = tile.clone();
                image.drawTransparentImage(fire, 0, 0);

                let foundIt = false;
                for (const tile of this.tileCache) {
                    if (tile.equals(image)) {
                        image = tile;
                        foundIt = true;
                        break;
                    }
                }

                if (!foundIt) {
                    this.tileCache.push(image);
                    this.unburntTileCache.push(tile);
                }

                tiles.setTileAt(location, image);

                this.timeBuffer.setPixel(location.col, location.row, this.getRandomSpreadInterval());

                for (const handler of this.fireCreatedHandlers) {
                    handler(location);
                }
            }
        }

        update() {
            this.updateHasBeenCalled = true;
            // First check to make sure the tilemap hasn't changed size
            const tm = game.currentScene().tileMap;
            const tmWidth = tm.areaWidth() >> tm.scale;
            const tmHeight = tm.areaHeight() >> tm.scale;

            if (this.timeBuffer.width !== tmWidth || this.timeBuffer.height !== tmHeight) {
                // If it has, create a new time buffer and copy over the old data
                const old = this.timeBuffer;
                this.timeBuffer = image.create(tmWidth, tmHeight);
                this.timeBuffer.drawTransparentImage(old, 0, 0);

                const oldHealth = this.healthBuffer;
                this.healthBuffer = image.create(tmWidth, tmHeight);
                this.healthBuffer.drawTransparentImage(oldHealth, 0, 0);
            }

            // Decrement timer
            this.timer -= game.currentScene().eventContext.deltaTimeMillis;

            // Run the fire spread code
            while (this.timer < 0) {
                this.timer += this.period;
                this.updateFireSpread();
            }
        }

        updateFireSpread() {
            let current = 0;

            // Loop over every location in the timeBuffer and update the times
            for (let x = 0; x < this.timeBuffer.width; x++) {
                for (let y = 0; y < this.timeBuffer.height; y++) {
                    if (Math.percentChance(30 * (10 - this.danger) / 10)) continue;

                    current = this.timeBuffer.getPixel(x, y);

                    // If the value is 0, the fire hasn't started yet
                    // If the value is 15, the tile is already burnt
                    if (current > 0 && current < 15) {
                        // Decrement the time remaining
                        this.timeBuffer.setPixel(x, y, current - 1);

                        // If we were already on our last increment, then spread the tile
                        if (current === 1) {
                            this.timeBuffer.setPixel(x, y, this.getRandomSpreadInterval());

                            const tm = game.currentScene().tileMap;

                            // Attempt to spread the fire in a random cardinal direction.
                            // After ten tries, give up
                            for (let i = 0; i < 10; i++) {
                                let location: tiles.Location;
                                if (Math.percentChance(50)) {
                                    location = tiles.getTileLocation(
                                        Math.clamp(
                                            0,
                                            (tm.areaWidth() >> tm.scale) - 1,
                                            x + Math.randomRange(-2, 2)
                                        ),
                                        y
                                    );
                                }
                                else {
                                    location = tiles.getTileLocation(
                                        x,
                                        Math.clamp(
                                            0,
                                            (tm.areaHeight() >> tm.scale) - 1,
                                            y + Math.randomRange(-2, 2)
                                        )
                                    );
                                }

                                // Once the fire has spread, stop trying
                                if (this.tryFireSpread(location)) break;
                            }
                        }
                    }
                }
            }
        }

        tryFireSpread(location: tiles.Location) {
            const tileImage = tiles.getTileImage(location);

            if (this.timeBuffer.getPixel(location.col, location.row)) return false;

            for (const tile of this.unburntTileCache) {
                if (tileImage.equals(tile)) {
                    this.createFireAtLocation(location, tileImage, this.fireImage)
                    return true;
                }
            }

            return false;
        }

        onFireCreated(handler: (location: tiles.Location) => void) {
            this.fireCreatedHandlers.push(handler);
        }

        onFireDestroyed(handler: (location: tiles.Location) => void) {
            this.fireDestroyedHandlers.push(handler);
        }

        setFireHealth(location: tiles.Location, health: number) {
            health = Math.max(0, Math.min(health, 15));
            this.healthBuffer.setPixel(location.col, location.row, health);

            if (health === 0) {
                // Remove the tile from the tracked fires
                this.timeBuffer.setPixel(location.col, location.row, 15);
                for (const handler of this.fireDestroyedHandlers) {
                    handler(location);
                }

                // // Restore the unburnt tile image
                // const currentTile = tiles.getTileImage(location);
                // for (let i = 0; i < this.tileCache.length; i++) {
                //     if (this.tileCache[i].equals(currentTile)) {
                //         tiles.setTileAt(location, this.unburntTileCache[i]);
                //         break;
                //     }
                // }
            }
        }

        changeFireHealth(location: tiles.Location, changeBy: number) {
            const currentHealth = this.healthBuffer.getPixel(location.col, location.row);
            this.setFireHealth(location, currentHealth + changeBy);
        }
    }

    const state = new FireState();

    export function createFireAtRandomLocation(tile: Image, fire: Image) {
        state.createFireAtRandomLocation(tile, fire);
    }

    export function setWindSpeed(speed: number) {
        state.windSpeed = speed;
    }

    export function setDryGrass(grass: number) {
        state.dryGrass = grass;
    }

    export function setTreeHealth(treeHealth: number) {
        state.treeHealth = treeHealth;
    }

    export function setFireHealth(location: tiles.Location, health: number) {
        state.setFireHealth(location, health);
    }

    export function changeFireHealth(location: tiles.Location, changeBy: number) {
        state.changeFireHealth(location, changeBy);
    }

    export function updateFireSpread() {
        state.update();
    }

    export function onFireDestroyed(handler: (location: tiles.Location) => void) {
        state.onFireDestroyed(handler);
    }

    export function onFireCreated(handler: (location: tiles.Location) => void) {
        state.onFireCreated(handler);
    }
}
