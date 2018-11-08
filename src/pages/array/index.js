/**
 * -----------------------
 * Array for ES6
 * -----------------------
 */
console.log('===== Array for ES6 =====');
{
    console.log('------ Array.from for ES6 ------');
    //Array.from方法用于将两类对象转为真正的数组：
    //1、类似数组的对象（array-like object）
    //2、可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
    let obj_like_array = {
        '0': 'a',
        '1': 'b',
        '2': 'c',
        length: 3
    };
    const Array1 = Array.from(obj_like_array);
    console.log(Array1);
}
{
    //Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
    const Array2 = Array.from([1, 2, 3], item => item * item + 1);
    console.log(Array2);
}
{
    console.log('------ Array.of for ES6 ------');
    //Array.of() 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
    console.log(Array.of());// []
    console.log(Array.of(3));// [3]
    console.log(Array.of(3, 11, 8));// [3, 11, 8]
    console.log(Array());// []
    console.log(Array(3)); // [, , ,]
    console.log(Array(3, 11, 8)) // [3, 11, 8]
}
{
    console.log('------ find for ES6 ------');
    //数组实例的find方法，用于找出 !!第一个!! 符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，
    //直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
    const temp = [1, 4, -5, 10, 6, 8, 9, 12, 34];
    console.log(temp.find((n) => n < 0));//-5
    console.log(temp.find((n) => n > 10));//12

    //find函数接收了第二个参数person对象，回调函数中的this对象指向person对象。
    function f(v) {
        return v > this.age;
    }

    let person = {name: 'John', age: 20};
    console.log(temp.find(f, person));//34

    //数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
    console.log(temp.findIndex((n) => n < 0));//2
    console.log(temp.findIndex((n) => n > 50));//-1
}
{
    const temp = ['a', 'b', 'c', 'd'];
    for (let index of temp.keys()) {
        console.log(index);// 0 1 2 3
    }
    for (let elem of temp.values()) {
        console.log(elem);// a b c d
    }
    for (let [index, elem] of temp.entries()) {
        console.log(index, elem);// 0 "a"  1 "b"  2 "c"  3 "d"

    }
}

