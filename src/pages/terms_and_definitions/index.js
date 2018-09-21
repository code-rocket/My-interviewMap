/**
 * -----------------------
 * for terms_and_definitions page
 * -----------------------
 */


{
    console.log('===== 解构赋值 =====');

    // let [foo] = 1;   //Invalid attempt to destructure non-iterable instance
    let [a, [b], d] = [1, [2, 3], 4];
    console.log(b);
    let [head, ...tail] = [1, 2, 3, 4];
    console.log(tail);
    let [bar, foo] = [1];
    console.log(foo);//undefined
}

