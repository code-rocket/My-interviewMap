$(document).ready(function () {
    console.log('加载侧边栏脚本js～～');


});

const menuData = require('./side-menu.json');
const sideMenuTemp = require('./side-menu.hbs');
const sideMenuTempFn = sideMenuTemp(menuData);//编译
module.exports = sideMenuTempFn;
