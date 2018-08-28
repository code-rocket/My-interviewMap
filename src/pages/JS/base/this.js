{
    var foo = 1;
    (function foo() {
        foo = 10;
        console.log(foo)
    }()) // -> ƒ foo() { foo = 10 ; console.log(foo) }

}
