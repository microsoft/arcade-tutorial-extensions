# move sprite to random location

Moves chosen sprite to a random location on the screen

```sig
simplified.move_sprite_random(mySprite, 60, 80, 60)
```

## Example

In this example, the food sprite will jump to a new location each time the Player overlaps it.

```blocks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.setPosition(randint(0, 160), randint(0, 120))
})
let mySprite = sprites.create(img`
    . . . c c c c c c . . . . . . .
    . . c 6 7 7 7 7 6 c . . . . . .
    . c 7 7 7 7 7 7 7 7 c . . . . .
    c 6 7 7 7 7 7 7 7 7 6 c . . . .
    c 7 c 6 6 6 6 c 7 7 7 c . . . .
    f 7 6 f 6 6 f 6 7 7 7 f . . . .
    f 7 7 7 7 7 7 7 7 7 7 f . . . .
    . f 7 7 7 7 6 c 7 7 6 f . . . .
    . . f c c c c 7 7 6 f c c c . .
    . . c 6 2 7 7 7 f c c 7 7 7 c .
    . c 6 7 7 2 7 7 c f 6 7 7 7 7 c
    . c 1 1 1 1 7 6 6 c 6 6 6 c c c
    . c 1 1 1 1 1 6 6 6 6 6 6 c . .
    . c 6 1 1 1 1 1 6 6 6 6 6 c . .
    . . c 6 1 1 1 1 1 7 6 6 c c . .
    . . . c c c c c c c c c c . . .
    `, SpriteKind.Player)
let myFood = sprites.create(img`
    . . . . . . . e c 7 . . . . . .
    . . . . e e e c 7 7 e e . . . .
    . . c e e e e c 7 e 2 2 e e . .
    . c e e e e e c 6 e e 2 2 2 e .
    . c e e e 2 e c c 2 4 5 4 2 e .
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
    . e e e 2 2 2 2 2 2 2 2 2 4 e .
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
    . . 2 e e 2 2 2 2 2 4 4 2 e . .
    . . . 2 2 e e 4 4 4 2 e e . . .
    . . . . . 2 2 e e e e . . . . .
    `, SpriteKind.Food)
controller.moveSprite(mySprite)
animation.runImageAnimation(
mySprite,
assets.animation`myAnim`,
200,
true
)
```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```