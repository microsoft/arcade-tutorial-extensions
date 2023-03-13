namespace simplified{
    /**
    * just run the code
    */
    //% block="create player"
    //% handlerStatement=1
    export function wrap(handler: () => void) {
        handler();
    }
}