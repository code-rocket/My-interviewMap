/**
 * -----------------------
 * Array for ES6
 * -----------------------
 */
console.log('===== Array for ES6 =====');
{
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
    //Array.of() 这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
    console.log(Array.of());// []
    console.log(Array.of(3));// [3]
    console.log(Array.of(3, 11, 8));// [3, 11, 8]
    console.log(Array());// []
    console.log(Array(3)); // [, , ,]
    console.log(Array(3, 11, 8)) // [3, 11, 8]
}


