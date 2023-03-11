# change score override

Changes the score and overrides the traditional UI with an iconified version

```sig
 changeScoreOverride(thisKind: adventure.Currency, thisScore: number)
 ```

## Parameters

* **thisKind**: The icon you want next to the score
* **thisScore**: The amount to be added to the score

## Example #example

In this example, we override the UI with a candy icon and adds 1 to the store.

```blocks
adventure.changeScoreOverride(adventure.Currency.Candy, 1)
```

```package
carnival=github:microsoft/arcade-tutorial-extensions/adventure
```