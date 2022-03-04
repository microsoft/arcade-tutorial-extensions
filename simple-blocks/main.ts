
//% color="#d39a02" icon="\uf0e7"
//% block="Simplified"
namespace simplified {

    /**
     * Allows your sprite to jump only if it's currently
     * on a floor or without velocity.
     * Expand the + to add jumping power.
     */
    //% group=Sprites
    //% color="#3b6fe9"
    //% blockId=gravity_jump
    //% block="make $thisSprite gravity jump || with power $velo"
    //% thisSprite.shadow=variables_get
    //% thisSprite.defl=mySprite
    //% velo.defl=-200
    //% help=github:simple-blocks/docs/gravity-jump
    export function gravity_jump(thisSprite: Sprite, velo?: number) {
        if (velo == undefined) {
            velo = -200;
        }
        if (thisSprite.vy == 0 || thisSprite.isHittingTile(CollisionDirection.Bottom) || (thisSprite.bottom >= (scene.cameraTop() + 120) && (thisSprite.flags & SpriteFlag.StayInScreen))) {
            thisSprite.vy = -Math.abs(velo)
        }
    }


    /**
         * Moves center of sprite to a random location
         * on the 160 x 120 screen with optional
         * center point and range
         */
    //% group=Sprites
    //% color="#3b6fe9"
    //% blockId=move_random
    //% inlineInputMode=inline
    //% block="move $thisSprite to random position || +/- $range px from x $xloc y $yloc"
    //% thisSprite.shadow=variables_get
    //% thisSprite.defl=mySprite
    //% range.defl=60
    //% xloc.defl=80
    //% yloc.defl=60
    //% expandableArgumentMode="toggle"
    //% help=github:simple-blocks/docs/move-random
    export function move_sprite_random(thisSprite: Sprite, range?: number, xloc?: number, yloc?: number) {
        if (range == undefined) {
            thisSprite.setPosition(randint(0, 160), randint(0, 120))
        } else {
            thisSprite.setPosition(xloc + randint(-range, range), yloc + randint(-range, range))
        }
    }





    /**
     * Randomly chooses one of the parameter images
     *
     * @param choice1 A choice to appear in the list of player choices
     * @param choice2 A choice to appear in the list of player choices
     * @param choice3 A choice to appear in the list of player choices
     * @param choice4 A choice to appear in the list of player choices
     * @param choice5 A choice to appear in the list of player choices
     */

    //% group=Arrays
    //% color="#fa8f08"
    //% blockId=choose_random_from_array
    //% block="choose one of $choice1 $choice2 || $choice3 $choice4 $choice5"
    //% choice1.shadow=screen_image_picker
    //% choice2.shadow=screen_image_picker
    //% choice3.shadow=screen_image_picker
    //% choice4.shadow=screen_image_picker
    //% choice5.shadow=screen_image_picker
    //% inlineInputMode=inline
    //% help=github:simple-blocks/docs/choose-image
    export function chooseRandomImage(choice1: Image, choice2: Image, choice3?: Image, choice4?: Image, choice5?: Image) {
        let myList = [choice1, choice2];
        if (choice3) myList.push(choice3);
        if (choice4) myList.push(choice4);
        if (choice5) myList.push(choice5);
        return myList._pickRandom();
    }
}
