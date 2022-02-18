# check for win or loss

Checks whether any player has hit the maximum or minimum size.

```sig
valentine.check_win_or_lose()
```

## Example #example

In this example, we check the size of our player heart for win/loss every 1.8 seconds.

```blocks
// When your Player (grey heart) overlaps with a Cupid (red heart), the Cupid disappears and your Player heart grows
sprites.onOverlap(SpriteKind.Player, SpriteKind.Valentine, function (sprite, otherSprite) {
    otherSprite.destroy()
    scaling.scaleByPixels(sprite, 15, ScaleDirection.Uniformly, ScaleAnchor.Middle)
})
// When your Player (grey heart) overlaps with an Arrow, the Arrow disappears and your Player heart shrinks
sprites.onOverlap(SpriteKind.Player, SpriteKind.Arrow, function (sprite, otherSprite) {
    otherSprite.destroy()
    scaling.scaleByPixels(sprite, -7, ScaleDirection.Uniformly, ScaleAnchor.Middle)
})

// Every 1.8 seconds a red heart appears on the screen shooting this number of arrows
game.onUpdateInterval(1800, function () {
    valentine.check_win_or_lose()
    valentine.send_valentine(assets.image`cupid hearts`, 3, assets.image`arrow`)
})
```

```package
valentine-special=github:kiki-lee/valentine-special#v0.0.5
```
