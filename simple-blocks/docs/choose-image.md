# choose one from 

Choose one image randomly from a list of up to 5.

```sig
sprites.createProjectileFromSprite(arrays.chooseRandomImage(img`
img`
....................
.......d.d.d........
........ddd.........
.......dd5dd........
........ddd.........
......7d.d.d........
......77.6..77......
.......777.77.......
.........7776.......
.........776........
.........76.........
....................
....................
`
`, img`
img`
. . . . b b . . . . 
. . . b 5 5 b . . . 
b b b 5 5 1 1 b b b 
b 5 5 5 5 1 1 5 5 b 
. b d 5 5 5 5 d b . 
. c b 5 5 5 5 b c . 
. c 5 d d d d 5 c . 
. c 5 d c c d 5 c . 
. c c c . . c c c . 
. . . . . . . . . . 
`
`, img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . 2 2 2 2 2 . . . 2 2 2 2 . .
. 2 2 2 2 2 2 2 . 2 2 2 2 2 2 .
. 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. . 2 2 2 2 2 2 2 2 2 2 2 2 . .
. . . 2 2 2 2 2 2 2 2 2 2 2 . .
. . . . 2 2 2 2 2 2 2 2 2 . . .
. . . . . 2 2 2 2 2 2 2 . . . .
. . . . . . . 2 2 2 . . . . . .
. . . . . . . . 2 . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`)
```

## Example

In this example, the sprite will throw either a flower, a star, or a heart when the A button is pressed...chosen at random.

```blocks
let mySprite: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(sprites.createProjectileFromSprite(arrays.chooseRandomImage(img`
img`
....................
.......d.d.d........
........ddd.........
.......dd5dd........
........ddd.........
......7d.d.d........
......77.6..77......
.......777.77.......
.........7776.......
.........776........
.........76.........
....................
....................
`
`, img`
img`
. . . . b b . . . . 
. . . b 5 5 b . . . 
b b b 5 5 1 1 b b b 
b 5 5 5 5 1 1 5 5 b 
. b d 5 5 5 5 d b . 
. c b 5 5 5 5 b c . 
. c 5 d d d d 5 c . 
. c 5 d c c d 5 c . 
. c c c . . c c c . 
. . . . . . . . . . 
`
`, img`
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
. . 2 2 2 2 2 . . . 2 2 2 2 . .
. 2 2 2 2 2 2 2 . 2 2 2 2 2 2 .
. 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. 2 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. . 2 2 2 2 2 2 2 2 2 2 2 2 2 .
. . 2 2 2 2 2 2 2 2 2 2 2 2 . .
. . . 2 2 2 2 2 2 2 2 2 2 2 . .
. . . . 2 2 2 2 2 2 2 2 2 . . .
. . . . . 2 2 2 2 2 2 2 . . . .
. . . . . . . 2 2 2 . . . . . .
. . . . . . . . 2 . . . . . . .
. . . . . . . . . . . . . . . .
. . . . . . . . . . . . . . . .
`), audience, randint(-100, 100), randint(-50, -100))
})
```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```