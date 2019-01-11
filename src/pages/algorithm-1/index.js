/**
 * -----------------------
 * algorithm-1 template
 * -----------------------
 */
console.log('=====  algorithm-1 template =====');

{
    /**
     * change card num => text value
     * @param num
     * @param tList
     * @returns {*}
     */
    let changeCard = (num, tList = ['黑桃', '红桃', '方块', '梅花']) => {
        if (typeof num !== 'number' || (num > 54 || num < 1)) {
            throw 'should be enter numbers between 1 and 54';
        }
        const map = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '小王', '大王'];
        const FN = Math.ceil(num / 4);
        const SN = num % 4;
        const huase = SN === 0 ? tList[tList.length - 1] : tList[SN - 1];
        return FN > 13 ? map[FN + SN - 2] : huase + map[FN - 1];
    };

    console.log(changeCard(5));
}

{

    /**
     * judeg integer
     * @param num
     * @returns {boolean}
     */
    function judgeInt(num) {
        return typeof num === 'number' && (/(^[1-9]\d*$)/.test(num))
    }

    /**
     * get narcissus number
     * 个位数的立方根和等于其数字本身
     * @returns {Array}
     */
    let narcissusNumber = () => {
        let res = [];
        for (let num = 100; num < 999; num++) {
            const Ten = num % 100;//
            const a = parseInt(num / 100);//hundreds digit
            const b = parseInt(Ten / 10);//Ten digit number
            const c = Ten % 10;//Single digit
            const total = Math.pow(a, 3) + Math.pow(b, 3) + Math.pow(c, 3);
            if (num === total) {
                res.push(num);
            }
        }
        return res;
    };
    console.log(narcissusNumber());
}
