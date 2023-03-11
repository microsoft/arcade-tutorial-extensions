# change text log colors

Allows you to change the colors of fresh and read text

```sig
 changeLogColors(c1: number, c2: number)
 ```

## Parameters

* **c1**: The color of the text when it's fresh on the screen
* **c2**: The color of the text as it scrolls up the screen

## Example #example

In this example, we override the default colors with green and grurple.

```blocks
adventure.changeLogColors(7, 11)
adventure.addToTextlog("Hello world")
```

```package
carnival=github:microsoft/arcade-tutorial-extensions/adventure
```