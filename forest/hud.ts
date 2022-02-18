//% color="#09282d" icon="\uf1e5"
//% block="HUD"
namespace hud {
    let burnedColor = 2;
    let healthyColor = 3;

    let drawForestHealth = false;
    let drawFireNumber = false;
    let drawFireDanger = false;

    let forestHealthText = "Healthy Forest";
    let fireNumberText = "Fires:";
    let fireNumber = 0;
    let fireDangerText = "Fire Danger:"
    let fireDangerColor = 7;

    const forestHealthBar = statusbars.create(82, 4, StatusBarKind.Health);

    function createHUD() {
        forestHealthBar.top = 12
        forestHealthBar.left = 4
        forestHealthBar.setColor(healthyColor, burnedColor)
        forestHealthBar.setFlag(SpriteFlag.Invisible, true)

        let font: image.Font;
        let text: string;
        let top: number;
        let halfWidth: number;

        let bgColor = 0xc;

        scene.createRenderable(50, screen => {
            if (drawForestHealth) {
                font = getFontForText(forestHealthText);
                screen.fillRect(0, 0, forestHealthText.length * font.charWidth + 8, font.charHeight + 4, bgColor);
                screen.print(forestHealthText, 4, 2, 1, font);
            }

            if (drawFireNumber) {
                text = fireNumberText + fireNumber;
                font = getFontForText(text);


                screen.fillRect(156 - text.length * font.charWidth - 4, 0, 80, font.charHeight + 4, bgColor);
                screen.print(text, 156 - text.length * font.charWidth, 2, 1, font);

            }

            if (drawFireDanger) {
                font = getFontForText(fireDangerText);
                top = 120 - font.charHeight - 4;
                halfWidth = (fireDangerText.length * font.charWidth + 2 + font.charHeight) >> 1;

                screen.fillRect(0, top, 160, 120 - top, bgColor);

                screen.print(fireDangerText, 80 - halfWidth, top + 2, 1, font);
                screen.fillRect(80 + halfWidth - font.charHeight, top + 1, font.charHeight + 2, font.charHeight + 2, fireDangerColor);
            }

        });
    }

    createHUD();

    /*
     * Show or hide the current number of burning fires.
     */
    //% block="show fire HUD $answer"
    //% answer.shadow="toggleYesNo"
    //% answer.defl=true
    export function fire_hud(answer: boolean) {
        drawFireNumber = answer;
    }

    /*
     * Show or hide how much of the forest has burned.
     */
    //% block="show forest HUD $answer"
    //% answer.shadow="toggleYesNo"
    //% answer.defl=true
    export function forest_hud(answer: boolean) {
        drawForestHealth = answer;
        if (answer) {
            forestHealthBar.setFlag(SpriteFlag.Invisible, false)

        } else {
            forestHealthBar.setFlag(SpriteFlag.Invisible, true)
        }

    }


    /*
     * Show or hide the fire danger level.
     */
    //% block="show danger level HUD $answer"
    //% answer.shadow="toggleYesNo"
    //% answer.defl=true
    export function danger_hud(answer: boolean) {
        drawFireDanger = answer;
    }

    /*
    * Set the color for remaining live forest
    */
    //% block="set color of healthy forest meter to $color"
    //% color.shadow="colorindexpicker"
    //% color.defl=3
    export function forest_hud_healthy(color: number) {
        healthyColor = color
        forestHealthBar.setColor(healthyColor, burnedColor)
    }

    /*
    * Set the color for burned forest
    */
    //% block="set color of burned forest meter to $color"
    //% color.shadow="colorindexpicker"
    //% color.defl=2
    export function forest_hud_burned(color: number) {
        burnedColor = color
        forestHealthBar.setColor(healthyColor, burnedColor)
    }


    /*
     * Set the label for the forest HUD
     */
    //% block="set forest HUD label to $name"
    //% name.defl="Healthy Forest"
    export function forest_hud_label(name: string) {
        forestHealthText = name;
    }


    /*
     * Set the label for the fire-counting HUD
     */
    //% block="set fire HUD label to $name"
    //% name.defl="Fires:"
    export function fire_hud_label(name: string) {
        fireNumberText = name;
    }


    /*
     * Set the label for the fire danger HUD
     */
    //% block="set danger HUD label to $name"
    //% name.defl="Fire Danger Levels"
    export function danger_hud_label(name: string) {
        fireDangerText = name;
    }


    export function updateForestHealth(max: number, value: number) {
        forestHealthBar.max = max;
        forestHealthBar.value = value;
    }

    export function updateDangerBarColors(color: number) {
        fireDangerColor = color;
    }

    export function updateFireNumber(fires: number) {
        fireNumber = fires;
    }

    function getFontForText(text: string) {
        const f = image.getFontForText(text);
        if (f === image.font8) return image.font5;
        return f;
    }
}// Add your code here
