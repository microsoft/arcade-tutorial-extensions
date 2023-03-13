namespace controller{
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
    //% color="#d54322"
    //% blockId=move_only_onscreen_with_arrows
    //% block="move $thisSprite=variables_get(myHammer) on screen with speed $mySpeed"
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
}
namespace sprites {
    /**
    * Randomly moves mole to one of the holes on grid
    */
    //% color="#4b7bec"
    //% blockId=move_to_random_hole_on_grid
    //% block="move sprite $thisSprite=variables_get(myMole) to random area"
    //% inlineInputMode=inline
    export function moveToRandomHoleOnGrid(thisSprite: Sprite) {
        thisSprite.setPosition(simplified.chooseRandomNumber(28, 80, 130), simplified.chooseRandomNumber(21, 53, 85))
    simplified.still = 0;
    }
}
namespace simplified {
   export let still = 0;
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
     * Checks to see if mole has been moved since last time position was checked
     */
    //% blockId=check_mole_escape
    //% block="check if mole has escaped"
    export function checkMoleEscape () {
        if (still == 1) {
            info.player2.changeScoreBy(1)
        }
        still = 1
    }
}