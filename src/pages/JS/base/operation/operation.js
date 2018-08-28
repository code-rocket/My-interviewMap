//基础 - 四则运算符
{
    console.log('' + '');//''
    console.log('abc' - '');//''
    console.log('' * '');//0
    console.log('' + false);//'false'
    console.log('1' + '1');//'11'
    console.log(1 + 1);//2
    console.log(1 * 2);//2
    console.log(1 + '1');//'11'
    console.log(1 * '1');//'11'
    console.log(NaN + '1');//'NaN1'
    console.log(1 + NaN);//NaN
    console.log('1' + true);//'1true'
    console.log(1 + true);//2
    console.log(1 + false);//1
    console.log(1 + undefined);//NaN
    console.log('1' + undefined);//'1undefined'
    console.log('1' + [1, 2, 3]);//'11,2,3'
    console.log(1 + [1, 2, 3]);//'11,2,3'
    console.log(1 + {});//1[object Object]
    console.log({} + {});//[object Object][object Object]
    console.log({} * {});//NaN
    console.log([1, 2, 3] + [1, 2, 3]);//'1,2,31,2,3'
    console.log([1, 2, 3] * [1, 2, 3]);//NaN
    console.log(true + true);//2
    console.log(false + false);//0
    console.log(false + null);//0
    console.log(NaN + NaN);//NaN
    console.log(undefined + undefined);//NaN
    console.log(null + null);//0
}

