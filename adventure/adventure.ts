//% color=#6b3400 icon="\uf14e"
//% block="Adventure"
namespace adventure {


    export enum Currency {
        //% block="coins"
        Coins,
        //% block="tickets"
        Tickets,
        //% block="candy"
        Candy,
        //% block="potions"
        Potions
    }

    export let activeColor = 1;
    export let readColor = 9;
    export let scoreText = textsprite.create("")

    let stateStack: TextLogState[];
    const padding = 5;
    const pauseTime = 1500;
    class LogEntry {
        constructor(public isTextEntry: boolean) {
        }
    }
    class TextEntry extends LogEntry {
        text: sprites.RenderText;
        constructor(text: string) {
            super(true);
            this.text = new sprites.RenderText(text, screen.width - (padding << 1));
        }
    }
    class ImageEntry extends LogEntry {
        constructor(public image: Image) {
            super(false);
        }
    }
    class SpriteEntry extends LogEntry {
        constructor(public sprite: Sprite) {
            super(false);
        }
    }
    class TextLogState {
        log: LogEntry[];
        printIndex: number
        finishedPrinting: boolean;
        printingTimer = 0;
        constructor() {
            this.log = [];
            scene.createRenderable(10, () => this.draw())
            this.printIndex = 0;
        }
        draw() {
            let top = screen.height - padding;
            this.printIndex++
            for (let i = 0; i < this.log.length; i++) {
                const entry = this.log[this.log.length - 1 - i]
                if (entry.isTextEntry) {
                    const text = (entry as TextEntry).text;
                    if (i === 0) {
                        top -= text.calculatePartialHeight(0, this.printIndex);
                        text.drawPartial(screen, padding, top, activeColor, this.printIndex);
                        if (!this.finishedPrinting) {
                            if (this.printIndex > text.printableCharacters()) {
                                if (this.printingTimer <= 0) {
                                    this.printingTimer = pauseTime
                                }
                                else {
                                    this.printingTimer -= game.eventContext().deltaTimeMillis
                                    if (this.printingTimer <= 0) {
                                        this.finishedPrinting = true;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        top -= text.height + padding;
                        if (top + text.height < 0) {
                            this.log = this.log.slice(this.log.length - 1 - i);
                            break;
                        }
                        text.draw(screen, padding, top, readColor, 0);
                    }
                }
                else {
                    const image = (entry as ImageEntry).image;
                    top -= image.height + padding
                    screen.drawTransparentImage(image, padding, top);
                    if (i === 0 && !this.finishedPrinting) {
                        this.printingTimer -= game.eventContext().deltaTimeMillis
                        if (this.printingTimer <= 0) {
                            this.finishedPrinting = true;
                        }
                    }
                }
            }
        }
        appendToLog(text: string) {
            this.log.push(new TextEntry(text));
            this.printIndex = 0;
            this.finishedPrinting = false;
        }
        appendImageToLog(image: Image) {
            this.log.push(new ImageEntry(image));
            this.printIndex = 0;
            this.finishedPrinting = false;
            this.printingTimer = pauseTime
        }
    }
    function init() {
        if (stateStack) return;
        stateStack = [new TextLogState()]
        game.addScenePushHandler(() => {
            stateStack.push(new TextLogState())
        })
        game.addScenePopHandler(() => {
            stateStack.pop();
            if (!stateStack.length) stateStack.push(new TextLogState());
        })
    }
    function state() {
        init();
        return stateStack[stateStack.length - 1];
    }

    /**
    * Adds text to the scrolling text log
    */
    //% blockId=adv_add_to_text_log
    //% block="add $text to text log"
    //% help=github:docs/adv_add_to_text_log
    export function addToTextlog(text: string) {
        state().appendToLog(text)
        pauseUntil(() => state().finishedPrinting)
    }


    /**
    * Adds an image to the scrolling text log
    */
    //% blockId=adv_add_image_to_text_log
    //% block="add image $image to text log"
    //% image.shadow=screen_image_picker
    //% help=github:docs/adv_add_image_to_text_log
    export function addImageToTextLog(image: Image) {
        state().appendImageToLog(image)
        pauseUntil(() => state().finishedPrinting)
    }


    /**
    * Allows you to change the colors of fresh and read text
    */
    //% blockId=change_text_log_colors
    //% block="change text colors to $c1 and $c2"
    //% c1.defl=1
    //% c2.defl=9
    //% c1.shadow=colorindexpicker
    //% c2.shadow=colorindexpicker
    //% help=github:docs/change_text_log_colors
    export function changeLogColors(c1: number, c2: number) {
        adventure.activeColor = c1;
        adventure.readColor = c2;
    }


    /**
    * Overrides the normal score UI with an iconified version
    */
    //% blockId=set_score_override
    //% block="set $thisKind to $thisScore"
    //% thisScore.defl=0
    //% thisKind.defl=adventure.Currency.Coins
    //% help=github:docs/set_score_override
    export function setScoreOverride(thisKind: adventure.Currency, thisScore: number) {
        info.setScore(thisScore)
        adventure.scoreText.setText("x" + convertToText(info.score()))
        if (thisKind == adventure.Currency.Coins) {
            scoreText.setIcon(img`
                . . . b b . . .
                . . b 5 5 b . .
                . b 5 d 1 5 b .
                . b 5 3 1 5 b .
                . c 5 3 1 d c .
                . c 5 1 d d c .
                . . f d d f . .
                . . . f f . . .
                `)
        } else if (thisKind == adventure.Currency.Tickets) {
            scoreText.setIcon(img`
            . . . . . . . .
            . . . . . . . .
            4 4 4 4 4 4 4 4
            4 4 5 5 5 5 4 4
            . 4 5 4 4 5 4 .
            4 4 5 5 5 5 4 4
            4 4 4 4 4 4 4 4
            . . . . . . . .
            `)
        } else if (thisKind == adventure.Currency.Candy) {
            scoreText.setIcon(img`
            . . . . . . . .
            . . . . . . . .
            2 . 2 2 2 2 . 2
            2 2 2 1 2 2 2 2
            2 2 2 2 2 2 2 2
            2 . 2 2 2 2 . 2
            . . . . . . . .
            . . . . . . . .
            `)
        } else {
            scoreText.setIcon(img`
            . . a a a a . .
            . . . a a . . .
            . . . a a . . .
            . . a a 1 a . .
            . a a a a a a .
            . a 9 a a a a .
            . a a 9 a a a .
            . . a a a a . .
            `)
        }

        scoreText.setBorder(1, 3, 1)
        scoreText.setMaxFontHeight(9)
        scoreText.right = 160
        scoreText.top = 0
        scoreText.update()
        info.showScore(false)
    }


    /**
    * Changes the score and overrides the traditional UI
    * with an iconified version
    */
    //% blockId=change_score_override
    //% block="change $thisKind by $thisScore"
    //% thisScore.defl=1
    //% thisKind.defl=adventure.Currency.Coins
    //% help=github:docs/change_score_override
    export function changeScoreOverride(thisKind: adventure.Currency, thisScore: number) {
        info.changeScoreBy(thisScore)
        adventure.setScoreOverride(thisKind, info.score())
    }

}