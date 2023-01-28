
//% color="#d39a02" icon="\uf0e7"
//% block="Simplified"
namespace simplified {


    export let still = 0;

    export enum Speeds {
        //% block="fast"
        Fast,
        //% block="medium"
        Med,
        //% block="slow"
        Slow
    }




    /**
    * Combines a simple "move with arrows"
    * and stay in screen
    */
    //% group=Controller
    //% color="#d54322"
    //% blockId=move_only_onscreen_with_arrows
    //% block="move $thisSprite on screen with speed $mySpeed"
    //% thisSprite.defl=mySprite
    //% thisSprite.shadow=variables_get
    //% mySpeed.defl=Speeds.Fast
    //% inlineInputMode=inline
    export function moveOnlyOnscreenWithArrows(thisSprite: Sprite, mySpeed: Speeds) {
        thisSprite.setStayInScreen(true)
        if (mySpeed == Speeds.Fast) {
            controller.moveSprite(thisSprite, 225, 225)
        } else if (mySpeed == Speeds.Med) {
            controller.moveSprite(thisSprite, 175, 175)
        } else {
            controller.moveSprite(thisSprite, 100, 100)
        }
    }



    /**
    * Randomly moves sprite to one of nine locations on the screen
    */
    //% group=Sprites
    //% color="#4b7bec"
    //% blockId=move_to_random_hole_on_grid
    //% block="move sprite $thisSprite in grid"
    //% thisSprite.defl=mySprite
    //% thisSprite.shadow=variables_get
    //% inlineInputMode=inline
    export function moveToRandomHoleOnGrid(thisSprite: Sprite) {
        thisSprite.setPosition(simplified.chooseRandomNumber(28, 80, 130), simplified.chooseRandomNumber(21, 53, 85))
        simplified.still = 0;
    }




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



    /**
     * Randomly chooses one of the parameter numbers
     *
     * @param choice1 Numeric choice to appear in the list of player choices
     * @param choice2 Numeric choice to appear in the list of player choices
     * @param choice3 Numeric choice to appear in the list of player choices
     * @param choice4 Numeric choice to appear in the list of player choices
     * @param choice5 Numeric choice to appear in the list of player choices
     */

    //% group=Arrays
    //% color="#fa8f08"
    //% blockId=choose_random_num_from_array
    //% block="choose one of $choice1 $choice2 $choice3 || $choice4 $choice5"
    //% choice1.defl=28
    //% choice2.defl=80
    //% choice3.defl=130
    //% inlineInputMode=inline
    export function chooseRandomNumber(choice1: number, choice2: number, choice3: number, choice4?: number, choice5?: number) {
        let myList = [choice1, choice2];
        if (choice3) myList.push(choice3);
        if (choice4) myList.push(choice4);
        if (choice5) myList.push(choice5);
        return myList._pickRandom();
    }


    /**
     * Randomly chooses one of the parameter strings
     *
     * @param choice1 Text choice to appear in the list of player choices
     * @param choice2 Text choice to appear in the list of player choices
     * @param choice3 Text choice to appear in the list of player choices
     * @param choice4 Text choice to appear in the list of player choices
     * @param choice5 Text choice to appear in the list of player choices
     */

    //% group=Arrays
    //% color="#fa8f08"
    //% blockId=choose_random_text_from_array
    //% block="choose one of $choice1 $choice2 $choice3 || $choice4 $choice5"
    //% choice1.defl=abc
    //% choice2.defl=abc
    //% choice3.defl=abc
    //% inlineInputMode=inline
    export function chooseRandomText(choice1: string, choice2: string, choice3: string, choice4?: string, choice5?: string) {
        let myList = [choice1, choice2];
        if (choice3) myList.push(choice3);
        if (choice4) myList.push(choice4);
        if (choice5) myList.push(choice5);
        return myList._pickRandom();
    }




    /**
    * Wrapper to bundle code inside
    */
    //% group=Bundle
    //% block="create player"
    //% handlerStatement=1
    export function wrap(handler: () => void) {
        handler();
    }


    /**
     * Adds point to player if their sprite has not moved since last time position was checked
     */
    //% group=Game
    //% blockId=check_mole_escape
    //% block="$playerNum score $thisScore for no grid hop"
    //% playerNum.shadow=mp_playerSelector
    //% playerNum.defl=mp.PlayerNumber.Two
    //% thisScore.defl=1
    export function checkMoleEscape(playerNum?: mp.Player, thisScore?: number) {
        //if (playerNum === undefined) { playerNum = mp.PlayerNumber.Two }
        if (thisScore === undefined) { thisScore = 1; }
        if (still == 1) {
            mp.changePlayerStateBy(playerNum, MultiplayerState.score, thisScore)
        }
        still = 1
    }


}
