# choose Random Image

Choose one image randomly from a list images.

```sig
simplified.chooseRandomImage(img`.`, img`.`)
```

A random image is chosen from a supplied list of images. The image list has a minimum of 2 images with a maximum of 5 images.

## Parameters

* **choice1**: the first [image](/types/image) in the list. 
* **choice2**: the second [image](/types/image) in the list. 
* **choice3**: (optional) the third [image](/types/image) in the list. 
* **choice4**: (optional) the fourth [image](/types/image) in the list. 
* **choice5**: (optional) the fifth [image](/types/image) in the list. 

## Returns

* an [image](/types/image) selected randomly from the supplied list.

## Example

Have the sprite will throw either a flower, a star, or a heart when the **A** button is pressed, chosen at random.

```blocks
let projectile: Sprite = null
let giver = sprites.create(img`
    . . . . . . . . . . . . . . 
    . . . . . f f f f . . . . . 
    . . . f f 5 5 5 5 f f . . . 
    . . f 5 5 5 5 5 5 5 5 f . . 
    . f 5 5 5 5 5 5 5 5 5 5 f . 
    c b 5 5 5 d b b d 5 5 5 b c 
    f 5 5 5 b 4 4 4 4 b 5 5 5 f 
    f 5 5 c c 4 4 4 4 c c 5 5 f 
    f b b f b f 4 4 f b f b b f 
    f b b e 1 f d d f 1 e b b f 
    c f b f d d d d d 4 4 b f c 
    . c e c 6 9 9 9 4 d d d c . 
    . e 4 c 9 9 9 9 4 d d 4 c . 
    . e c b b 3 b b b e e c . . 
    . . c c 3 3 b 3 b 3 c c . . 
    . . . . c b b c c c . . . . 
    `, SpriteKind.Player)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(simplified.chooseRandomImage(img`
        . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . d . d . d . . . . . . . . 
        . . . . . . . . d d d . . . . . . . . . 
        . . . . . . . d d 5 d d . . . . . . . . 
        . . . . . . . . d d d . . . . . . . . . 
        . . . . . . 7 d . d . d . . . . . . . . 
        . . . . . . 7 7 . 6 . . 7 7 . . . . . . 
        . . . . . . . 7 7 7 . 7 7 . . . . . . . 
        . . . . . . . . . 7 7 7 6 . . . . . . . 
        . . . . . . . . . 7 7 6 . . . . . . . . 
        . . . . . . . . . 7 6 . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . . . . . 
        `, img`
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
        `), giver, randint(-100, 100), randint(-50, -100))
})
```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```
