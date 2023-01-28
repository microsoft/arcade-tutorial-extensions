# choose one from number

Choose one number randomly from a list of up to 5.

```sig
simplified.chooseRandomText(choice1, choice2, choice3)

```

## Example

In this example, one of the numbers 11, 22, or 33 will be displayed at the bottom of the screen...chosen at random.

```blocks
game.showLongText(simplified.chooseRandomText(11, 22, 33), DialogLayout.Bottom)

```

```package
simple-blocks=github:microsoft/arcade-tutorial-extensions/simple-blocks
```