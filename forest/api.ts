namespace SpriteKind {
    //% isKind
    export const Water = SpriteKind.create()
}

namespace game {

    /*
     * Set the strength of your wind.
     * Higher numbers spread fire faster.
     */
    //% block="set strength of wind to $num"
    //% num.defl=3
    //% num.min=0
    //% num.max=10
    export function set_strength_of_wind(num: number) {
        forestFire.setWindSpeed(Math.clamp(0, 10, num));
    }

    /*
     * Set the health of your trees.
     * Lower numbers spread fire faster.
     */
    //% block="set health of trees to $num"
    //% num.defl=7
    //% num.min=0
    //% num.max=10
    export function set_health_of_trees(num: number) {
        forestFire.setTreeHealth(Math.clamp(0, 10, num));
    }

    /*
     * Set how dry your grass is.
     * Higher numbers spread fire faster.
     */
    //% block="set dryness of grass to $num"
    //% num.defl=3
    //% num.min=0
    //% num.max=10
    export function set_dryness_of_grass(num: number) {
        forestFire.setDryGrass(Math.clamp(0, 10, num));
    }
}



namespace sprites {

    /*
     * Set the number of "lives" for your sprite.
     */
    //% block="set strength of fire at $location to $health"
    //% location.shadow=variables_get
    //% location.defl=location
    //% health.defl=5
    export function set_flame_strength(location: tiles.Location, health: number) {
        forestFire.setFireHealth(location, health)
    }

    /*
     * Add or remove "lives" from your flame.
     */
    //% block="change strength of fire at $location by $changeBy"
    //% location.shadow=variables_get
    //% location.defl=location
    //% changeBy.defl=-1
    export function change_flame_strength_by(location: tiles.Location, changeBy: number) {
        forestFire.changeFireHealth(location, changeBy);
    }

    let facing = 0;
    let hoseDirection = 0;
    let changeRate = 10;

    /*
     * Choose a sprite to "spray" an image (in sprite form.)
     */
    //% block="spray from $thisSprite=variables_get(mySprite) using $img=screen_image_picker"
    //% img.defl=water
    export function spray(thisSprite: Sprite, img: Image) {
        if (controller.up.isPressed()) {
            if (controller.left.isPressed()) {
                facing = 225
            } else if (controller.right.isPressed()) {
                facing = 315
            } else if (controller.down.isPressed()) {

            } else {
                facing = 270
            }
        } else if (controller.left.isPressed()) {
            if (controller.right.isPressed()) {

            } else if (controller.down.isPressed()) {
                facing = 135
            } else {
                facing = 180
            }
        } else if (controller.right.isPressed()) {
            if (controller.down.isPressed()) {
                facing = 45
            } else {
                facing = 0
            }
        } else if (controller.down.isPressed()) {
            facing = 90
        }

        if (Math.abs(facing - hoseDirection) < 180) {
            if (facing < hoseDirection) {
                hoseDirection += 0 - changeRate
            } else {
                hoseDirection += changeRate
            }
        } else {
            if (facing < hoseDirection) {
                hoseDirection += changeRate
            } else {
                hoseDirection += 0 - changeRate
            }
            if (hoseDirection < 0) {
                hoseDirection += 360
            } else if (hoseDirection > 360) {
                hoseDirection += -360
            }
            hoseDirection = hoseDirection % 360
        }
        let waterProj = sprites.createProjectileFromSprite(img, thisSprite, 150 * Math.cos(hoseDirection * Math.PI / 180), 150 * Math.sin(hoseDirection * Math.PI / 180))
        waterProj.setKind(SpriteKind.Water)
    }

    /*
     * Spread current fires according to wind speed,
     * dryness of grass, and health of trees.
     */
    //% block="update fire spread"
    export function random_spread() {
        forestFire.updateFireSpread();
    }

    /**
     *
     */
    //% block="create spreading fire on random $onTile with image $burningTile"
    //% onTile.shadow=tileset_tile_picker
    //% onTile.decompileIndirectFixedInstances=true
    //% burningTile.shadow=tileset_tile_picker
    //% burningTile.decompileIndirectFixedInstances=true
    export function create_spreading_fire(onTile: Image, burningTile: Image) {
        forestFire.createFireAtRandomLocation(onTile, burningTile);
    }

    //% block="on fire destroyed at $location"
    //% draggableParameters="reporter"
    export function on_fire_destroyed(handler: (location: tiles.Location) => void) {
        forestFire.onFireDestroyed(handler);
    }


    //% block="on fire created at $location"
    //% draggableParameters="reporter"
    export function on_fire_created(handler: (location: tiles.Location) => void) {
        forestFire.onFireCreated(handler);
    }
}
