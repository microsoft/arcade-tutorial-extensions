
let lose_size = 6
let win_size = 120

let arrow: Sprite = null
let redheart: Sprite = null

namespace SpriteKind {
    //% isKind
    export const Valentine = SpriteKind.create()

    //% isKind
    export const Arrow = SpriteKind.create()
}



//% color="#ef0568" icon="\uf004"
//% block="Valentine"
namespace valentine {


    /*
     * Send a valentine in from the top
     * of the screen, releasing a certain
     * number of arrows
     */
    //% block="send valentine $valImage with $arrowNum arrows $arrowImage"
    //% valImage.shadow=screen_image_picker
    //% arrowImage.shadow=screen_image_picker
    //% arrowNum.defl=3
    //% help=github:docs/send-valentine-with-arrows
    export function send_valentine(valImage: Image, arrowNum: number, arrowImage: Image) {
        if (arrowNum > 100) {
            redheart = sprites.createProjectileFromSide(valImage, randint(-20, 20), randint(30, 60))
            redheart.setKind(SpriteKind.Valentine)
            redheart.lifespan = 5000
            for (let index = 0; index < 30; index++) {
                arrow = sprites.createProjectileFromSprite(arrowImage, redheart, randint(-100, 100), randint(50, 100))
                arrow.setKind(SpriteKind.Arrow)
                arrow.startEffect(effects.coolRadial)
            }
        } else {
            let divWidth = 100 / arrowNum
            redheart = sprites.createProjectileFromSide(valImage, randint(-20, 20), randint(30, 60))
            redheart.setPosition(randint(-64, 64) + scene.cameraProperty(CameraProperty.X), -34 + scene.cameraProperty(CameraProperty.Y))
            redheart.setKind(SpriteKind.Valentine)
            redheart.lifespan = 5000
            for (let index = 0; index <= arrowNum - 1; index++) {
                arrow = sprites.createProjectileFromSprite(arrowImage, redheart, divWidth * index - 50, 75)
                arrow.setKind(SpriteKind.Arrow)
            }
        }
    }

    /*
      * Set the parameters for winning
      * and losing the game
      */
    //% block="win at width $winsize | lose at width $losesize"
    //% winsize.defl=120
    //% losesize.defl=6
    //% help=github:docs/set-win-loss-width
    export function set_win_lose_size(winsize: number, losesize: number) {
        win_size = winsize
        lose_size = losesize
    }

    /*
      * Check to see whether win or
      * loss condition is met
      */
    //% block="check for win or loss"
    //% help=github:docs/check-win-loss
    export function check_win_or_lose() {
        for (let value of sprites.allOfKind(SpriteKind.Player)) {
            if (value.width >= win_size) {
                game.over(true)
            } else if (value.width <= lose_size) {
                game.over(false)
            }
        }
    }

}

