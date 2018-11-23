/**
 * -----------------------
 * Promise for ES6
 * -----------------------
 */
console.log('===== Promise for ES6 =====');

/**
 * promise demo test
 * @param index
 * @param status
 * @returns {Promise<any>}
 */
let promiseDemo = (index, status) => {
    return new Promise(function (resolve, reject) {
        const t = `=== promiseDemo 测试，当前第${index}次 =====`;
        console.info(t);
        // ... some code
        if (status) {
            resolve(status);
        }
        else {
            reject(status);
        }
    });
};


{
    console.log('===== Promise for ES6 简单用法=====');
    promiseDemo(1, true).then(res => {
        console.log('简单用法测试 -resolve：', res);//resolve： true
    }).catch(
        err => {
            console.log('简单用法测试 - reject：', err);//reject： false
        }
    )
}
{
    console.log('===== Promise.prototype.then() =====');
    promiseDemo(2, true).then(res => {
        console.log('prototype.then 测试 - resolve1：', res);//resolve1： true
        return res + '1';
    }).then(
        res => {
            console.log('prototype.then 测试 - resolve2：', res);//resolve2： true1
        }
    )
}
{
    console.log('===== Promise.prototype.catch()  =====');
    promiseDemo(3, false).then(
        res => {
            console.log('prototype.catch 测试1 - resolve：', res);//resolve： true
        }
    ).catch(err => {
        console.log('prototype.catch 测试1 - reject：', err);//reject1： false
    });
    //等同于
    promiseDemo(4, false).then(
        res => {
            console.log('prototype.catch 测试2 -resolve：', res);//resolve： true
        }
    ).then(null, err => {
        console.log('prototype.catch 测试2 - reject：', err);//reject： false
    });
    //一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。


    promiseDemo(5, false).then(function () {

    }).catch(function (error) {
        console.log('oh no', error);// oh no [ReferenceError: x is not defined]
        // 下面一行会报错，因为y没有声明
        y + 2;
    }).catch(function (error) {
        console.log('carry on', error);// carry on [ReferenceError: y is not defined]
    });
    //上面代码中，第二个catch方法用来捕获前一个catch方法抛出的错误。
}
{
    console.log('===== Promise.prototype.finally()  =====');
    promiseDemo(6, true).then(res => {
        console.log('finally测试 - resolve：', res);//resolve： true
    }).catch(
        err => {
            console.log('finally测试 - reject：', err);//reject： false
        }
    ).finally(f => {
        console.log('finally!!!：', f);//finally!!!： false
    })
    //finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。
    //这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
    // finally本质上是then方法的特例。
}
