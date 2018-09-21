/**
 * -----------------------
 * for let_and_const page
 * -----------------------
 */

import {constantize} from '../../utils'

{
    console.log('===== 冻锁死对象 =====');
    console.log('let and const in ES6');// true
    let obj = {
        a: 1,
        b: 2
    };
    // constantize(obj);
    obj.c = 3;
    console.log(obj)
}
{
    /**
     * 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象。ES5 之中，顶层对象的属性与全局变量是等价的。
     * 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一。
     * 这样的设计带来了几个很大的问题:
     * 1、首先是没法在编译时就报出变量未声明的错误，只有运行时才能知道（因为全局变量可能是顶层对象的属性创造的，而属性的创造是动态的;
     * 2、程序员很容易不知不觉地就创建了全局变量（比如打字出错）；
     * 3、顶层对象的属性是到处可以读写的，这非常不利于模块化编程。
     * 4、，window对象有实体含义，指的是浏览器的窗口对象，顶层对象是一个有实体含义的对象，也是不合适的。
     **/
    console.log('===== 顶层对象的属性 =====');
    window.a = 1;
    console.log(a);// 1

    a = 2;
    console.log(window.a); // 2

    var c = 3;
    // 如果在 Node 的 REPL 环境，可以写成 global.c
    // 或者采用通用方法，写成 this.c
    console.log(window.c); // 3

    let d = 4;
    console.log(window.d) // undefined
}
{
    console.log('===== global =====');
    console.log(this);

    function test() {
        console.log(this);
    }

    test();


}
{
    console.log('===== 获取顶层对象 =====');

    console.log('获取顶层对象 - window：', window);
    console.log('获取顶层对象 - global：', global);
    /**
     * 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。
     * 但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略,
     * 那么eval、new Function这些方法都可能无法使用。
     */
    console.log('获取顶层对象 new Function方法', new Function('return this')());

    /**
     * 获取顶层对象 方法一
     * @returns {any}
     */
    function getGlobal1() {
        return typeof window !== 'undefined' ? window :
            (typeof process === 'object' && typeof require === 'function' && typeof global === 'object') ?
                global : this
    }

    console.log('获取顶层对象 方法一', getGlobal1());

    /**
     * 获取顶层对象 方法二
     * @returns {any}
     */
    function getGlobal2() {
        if (typeof self !== 'undefined') {
            return self;
        }
        if (typeof window !== 'undefined') {
            return window;
        }
        if (typeof global !== 'undefined') {
            return global;
        }
        throw new Error('unable to locate global object');
    };
    console.log('获取顶层对象 方法二', getGlobal2());


}


