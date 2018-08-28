import {judgeType} from './judgeType'

/**
 * isEqual
 * https://segmentfault.com/a/1190000010567491
 * @param a
 * @param b
 * @param aStack        可以不用
 * @param bStack        可以不用
 * @returns {boolean}
 */
export const isEqual = (a, b, aStack, bStack) => {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null) return false;
    if (a !== a) return b !== b;
    let type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    /**
     * deep equire
     * @param a
     * @param b
     * @param aStack
     * @param bStack
     * @returns {boolean}
     * @private
     */
    function _deepEq(a, b, aStack, bStack) {
        let className = toString.call(a);
        if (className !== toString.call(b)) return false;

        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        let areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a !== 'object' || typeof b !== 'object') return false;
            let aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor === bCtor && !(judgeType(aCtor) === 'function' && aCtor instanceof aCtor && (judgeType(bCtor) === 'function' && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b))) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        let length = aStack.length;
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;
            while (length--) {
                if (!isEqual(a[length], b[length], aStack, bStack)) return false;
            }
        }
        else {
            let keys = Object.keys(a), key;
            length = keys.length;
            if (Object.keys(b).length !== length) return false;
            while (length--) {
                key = keys[length];
                if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack))) return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }

    return _deepEq(a, b, aStack, bStack);
};

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
