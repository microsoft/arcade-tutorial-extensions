# wrapper

Provides a descriptive wrapper around several blocks of text.

```sig
wrap()

```

## Example

In this example, the wrapper does nothing except delineate the section of code being described in a step.

```blocks
simplified.wrap(function () {
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(assets.image`p1`, SpriteKind.Player))
    mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One), 0, 150)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setStayInScreen(true)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).left = 15

})
```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```