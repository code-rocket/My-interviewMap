/**
 * judgeType
 * @param val
 * @returns {*}
 */
export const judgeType = (value) => {
    const t = Object.prototype.toString.call(value);
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (value instanceof Element) {
        return 'element';
    }
    return map[t];
};
