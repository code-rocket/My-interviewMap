const Handlebars = require('handlebars/dist/handlebars.min');
const menuData = require('../../components/side-menu/side-menu.json');

import {loadHtml} from "../../utils/index";
import './index.scss'
import '../../components/side-menu/side-menu.scss'


const sideMenuTemp = require('../../components/side-menu/side-menu.hbs')();

$(document).ready(readyHandler);

function readyHandler() {

    console.log('首页的脚本js运行了～～');
    $('#interviewMap').css('color', 'red');
    //
    // console.log(sideMenuTemp);

    // const sideMenuTempFn = Handlebars.compile(sideMenuTemp(menuData));//编译
    // console.log(sideMenuTempFn);
    // $('#side-menu').html(sideMenuTempFn);


    // console.log(menuData);
    // console.log(sideMenuTemp);
    // console.log(sideMenuTemp.html());
    // const sideMenuTempFn = Handlebars.compile(sideMenuTemp);//编译
    //
    // console.log(sideMenuTempFn);
    // console.log(sideMenuTempFn(menuData));

    // $('#side-menu').html(sideMenuTempFn(menuData));

    // compileMenuList(menuData).then(() => {
    //     //     loadHtml("#page-wrapper", 0);
    //     //     menuClickHandler("#page-wrapper");
    //     // });
}


var sideMenuTempFn = require('../../components/side-menu/side-menu');
var homeTpl = require('./index.hbs');
var data = {
    sideMenu: sideMenuTempFn,
};
var home = homeTpl(data);
module.exports = home;


/**
 * menuClickHandler
 * @param target
 */
function menuClickHandler(target) {
    const sideID = "#side-menu";
    console.log($(sideID).find(">li"));
    $(sideID).find(">li.side-menu-item").on("click", function () {
        console.log('click');
        let url = $(this).find(">a").attr("data-href");
        loadHtml(target, url);
    });
}

/**
 * compile menu list by Handlebars
 * @param data
 */
function compileMenuList(data) {
    return new Promise((resolve, reject) => {
        console.log('compileMenuList')
        try {
            const sideMenuTemp = $('#side-menu-temp').html();//获取到handlebars这个模板中的全部html内容
            console.log(sideMenuTemp)
            const sideMenuTempFn = Handlebars.compile(sideMenuTemp);//编译
            $('#side-menu').html(sideMenuTempFn(data));//把编译完成的代码放入到 .student-temp 的这个容器中
            console.log(sideMenuTempFn(data));
            resolve();
        }
        catch (e) {
            reject('请检查侧边栏模块载入是否正确');
        }
    })

}
