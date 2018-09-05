import {Hbs, getPageConfig} from '../../utils/index';
import pageConfig from '../../page.config';
import status from '../../status';
import Cookies from 'js-cookie';

// const Handlebars = require('handlebars/dist/handlebars.min');
const menuData = require('./side-menu.json');
const sideMenuTemp = require('./side-menu.hbs');

$(document).ready(() => {
    console.log('side-menu works');

    let HBS = new Hbs();
    HBS.directImport(sideMenuTemp, '#sidebar-wrapper', menuData);//导入侧边栏

    // HBS.compileImport('#side-menu-temp', '#side-menu', menuData).then(() => {
    //
    // });


    //  sidebar dom
    let sidebarNav = $('#sidebar-wrapper .sidebar-nav');

    //add active class for current navLink
    initActive();

    sidebarNav[0].addEventListener('click', menuClickHandler);


    function initActive() {
        const nav_link = sidebarNav.find("a.side-menu-link");
        const nav_list = Array.prototype.slice.call(nav_link);//get a.nav-link array
        const index = Cookies.get('menu_status').activeIndex || status.menu_status.activeIndex;
        nav_list.forEach((a, i) => {
            $(a).removeClass('active');
            if (i === index) {
                $(a).addClass('active');
            }
        });
    }

    function menuClickHandler(e) {
        e = e || window.event;
        const target = e.target || e.srcElement;
        if (!!target && target.className.toLowerCase() === 'side-menu-link') {
            const url = $(target).attr("data-href");
            const page_name = $(target).attr("name");
            let nav_link = Array.prototype.slice.call($(this).find("a.side-menu-link"));//get a.nav-link array
            const index = Array.prototype.indexOf.call(nav_link, target);//a标签 下标索引
            nav_link.forEach((a, i) => {
                $(a).removeClass('active');
                if (i === index) {
                    $(a).addClass('active');
                }
            });
            const pageConf = getPageConfig(pageConfig.pages, page_name);
            Cookies.set('page_info', pageConf);
            window.location.href = url;
        }
    }
});
