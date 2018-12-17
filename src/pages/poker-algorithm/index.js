/**
 * -----------------------
 * poker-algorithm template
 * -----------------------
 */
console.log('===== poker algorithm template =====');


/**
 * change card num=>text
 * @param num
 * @param tList
 * @returns {*}
 */
let changeCard = (num, tList) => {
    if (typeof num !== 'number' || (num > 54 || num < 1)) {
        throw '必须输入1-54之间的数字';
    }
    const map = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', '小王', '大王'];
    const FN = Math.ceil(num / 4);
    const SN = num % 4;
    const huase = SN === 0 ? tList[tList.length - 1] : tList[SN - 1];
    return FN > 13 ? map[FN + SN - 2] : huase + map[FN - 1];
};

console.log(changeCard(5, ['黑桃', '红桃', '方块', '梅花']));

