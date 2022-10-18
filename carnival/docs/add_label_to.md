# add label to

Adds a short text label in one of three pre-determined locations: top, "middle", or bottom.

```sig
addLabelTo(myLabel, myPosition, myColor)
```

## Parameters

* **myLabel**: The text that shows as the label
* **myPosition**: The vertical location of the label (top/middle/or bottom)
+ **myColor**: The color of the text shown

## Example #example

In this example, we add a label to the bottom of a whack-the-mole game

```blocks
let myHammer: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`grid`)
mySprite = sprites.create(assets.image`mole`, SpriteKind.Enemy)
myHammer = sprites.create(assets.image`hammer`, SpriteKind.Player)
controller.move_only_onscreen_with_arrows(myHammer, speeds.Fast)
info.startCountdownGame(15, WinTypes.Score, effects.confetti)
scene.addLabelTo("Whack-em-Mole", Areas.Bottom)

```

```package
carnival=github:microsoft/arcade-tutorial-extensions/carnival
```