# Check if sprite has moved from spot

Check if designated sprite has moved. If it has stayed still, award it thisScore points.

```sig
checkMoleEscape(playerNum, thisScore)

```

## Example

In this example, the player gets one point every half second for standing still. The `moveToRandomHoleOnGrid(mySprite)` function resets flag used for determining motion.

```blocks
let mySprite = sprites.create(img`
    . . . . . . b b b b a a . . . .
    . . . . b b d d d 3 3 3 a a . .
    . . . b d d d 3 3 3 3 3 3 a a .
    . . b d d 3 3 3 3 3 3 3 3 3 a .
    . b 3 d 3 3 3 3 3 b 3 3 3 3 a b
    . b 3 3 3 3 3 a a 3 3 3 3 3 a b
    b 3 3 3 3 3 a a 3 3 3 3 d a 4 b
    b 3 3 3 3 b a 3 3 3 3 3 d a 4 b
    b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e
    a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e
    a 3 3 3 3 3 3 3 d d a 4 4 4 e .
    a a 3 3 3 d d d a a 4 4 4 e e .
    . e a a a a a a 4 4 4 4 e e . .
    . . e e b b 4 4 4 4 b e e . . .
    . . . e e e e e e e e . . . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)

game.onUpdateInterval(500, function () {
    simplified.checkMoleEscape(mp.playerSelector(mp.PlayerNumber.Two), 1)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    simplified.moveToRandomHoleOnGrid(mySprite)
})

```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```