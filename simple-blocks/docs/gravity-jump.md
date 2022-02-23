# gravity jump

Only lets sprite jump when it is in a non-jumping state.

```sig
sprite.gravity_jump(mySprite, -200)
```

## Example

In this example, the sprite will jump when the player presses the 'up' arrow, but only if the sprite is not currently in the "air".

```blocks
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    sprites.gravity_jump(mySprite)
})
scene.setBackgroundImage(assets.image`background`)
tiles.setTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`stand`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
mySprite.ay = 500
scene.cameraFollowSprite(mySprite)

```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```