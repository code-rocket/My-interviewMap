/**
 * -----------------------
 * for JS-utils page
 * -----------------------
 */

import {judgeType, isEqual} from "../../utils";

{
    console.log(isEqual(0, 0));// true
    console.log(isEqual(0, -0));// false
    console.log(isEqual(NaN, NaN)); // true
    console.log(isEqual(Number(NaN), Number(NaN))); // true
    console.log(isEqual('Curly', new String('Curly'))); // true
    console.log(isEqual([1], [1])); // true
    console.log(isEqual({value: 1}, {value: 1})); // true

    let a, b;
    a = {foo: {b: {foo: {c: {foo: null}}}}};
    b = {foo: {b: {foo: {c: {foo: null}}}}};
    a.foo.b.foo.c.foo = a;
    b.foo.b.foo.c.foo = b;
    console.log(isEqual(a, b));// true
}
