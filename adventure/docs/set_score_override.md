# set score override

Sets the score and overrides the traditional UI with an iconified version

```sig
 setScoreOverride(thisKind: adventure.Currency, thisScore: number)
 ```

## Parameters

* **thisKind**: The icon you want next to the score
* **thisScore**: The amount you want to set the score to

## Example #example

In this example, we override the UI with a candy icon and set the score to 10.

```blocks
adventure.setScoreOverride(adventure.Currency.Candy, 10)
```

```package
carnival=github:microsoft/arcade-tutorial-extensions/adventure
```