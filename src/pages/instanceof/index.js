/**
 * -----------------------
 * for instanceof page
 * -----------------------
 */

/**
 * instanceof
 * 在 JavaScript 中，判断一个变量的类型尝尝会用 typeof 运算符，
 * 在使用 typeof 运算符时采用引用类型存储值会出现一个问题，无论引用的是什么类型的对象，它都返回 "object"。
 * ECMAScript 引入了另一个 Java 运算符 instanceof 来解决这个问题。
 * instanceof 运算符与 typeof 运算符相似，用于识别正在处理的对象的类型。
 * 与 typeof 方法不同的是，instanceof 方法要求开发者明确地确认对象为某特定类型。
 * instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。
 */
//示例一：
{
    console.log('------ 示例一 ------');
    let oStringObject = new String("hello world");
    const obj = {};
    const arr = [];
    const fn = function () {

    };
    console.log(oStringObject instanceof String);   // 输出 "true"
    console.log(obj instanceof Object);   // 输出 "true"
    console.log(arr instanceof Object);   // 输出 "true"
    console.log(fn instanceof Object);   // 输出 "true"
}
//示例二：
{
    console.log('------ 示例二 ------');

    // 判断 foo 是否是 Foo 类的实例, instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型
    function Foo() {
    }

    let foo = new Foo();
    console.log(foo instanceof Foo)//true
}
//示例三：
{
    console.log('------ 示例三 ------');

    //在多层继承关系中，instanceof 运算符同样适用
    function Aoo() {
    }

    function Foo() {
    }

    Foo.prototype = new Aoo();//JavaScript 原型继承

    let foo = new Foo();
    console.log(foo instanceof Foo);//true
    console.log(foo instanceof Aoo);//true
}
//示例四：
{
    function Foo() {
    }

    console.log('------ 示例四 ------');
    console.log(Object instanceof Object);//true
    console.log(Function instanceof Function);//true
    console.log(Number instanceof Number);//false
    console.log(String instanceof String);//false
    console.log(Function instanceof Object);//true
    console.log(Foo instanceof Function);//true
    console.log(Foo instanceof Foo);//false
}

/**
 * 实现一下 instanceof
 * @param left
 * @param right
 * @returns {boolean}
 * @constructor
 */
function Instanceof(left, right) {
    let prototype = right.prototype;// 获得类型的原型
    left = left.__proto__;// 获得对象的原型
    // 判断对象的类型是否等于类型的原型
    while (true) {
        if (left === null)
            return false;
        if (prototype === left)// 这里重点：当 prototype 严格等于 left 时，返回 true
            return true;
        left = left.__proto__;
    }
}
