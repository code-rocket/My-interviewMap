import './assets/front.scss'
/** 基础 - 四则运算符 **/
// import './JS/operation/operation';

/** 判断两个值 / 对象相等 **/
// import './JS/judge/judgeEqual ';

/** instanceof **/
// import './JS/base/instanceof';

/** this **/
import './JS/base/this';

{
    /**
     * create title content
     * @param id
     * @param tit
     * @returns {boolean}
     */
    let createTit = (id, tit) => {
        const dom = document.getElementById(id);
        try {
            dom.innerHTML = tit;
        }
        catch (e) {
            return false;
        }
    };

    window.onload = function () {
        createTit('interviewMap', 'InterviewMap')
    }
}
