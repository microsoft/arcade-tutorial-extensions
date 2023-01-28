# Move to Random Spot on Grid

Moves a sprite to a "random" 3x3 grid location

```sig
moveToRandomHoleOnGrid(thisSprite)
```

## Example

In this example, the sprite will move to one of the nine predetermined locations.

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
simplified.moveToRandomHoleOnGrid(mySprite)
```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```