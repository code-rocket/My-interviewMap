{
    var foo = 1;
    (function foo() {
        foo = 10;
        console.log(foo)
    }()) // -> ƒ foo() { foo = 10 ; console.log(foo) }



    // multi(2)(3)(4)=24?

    function multi(x) {
        return x * multi(x);
    }
    multi()
}
