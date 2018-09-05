import Cookies from 'js-cookie';
import status from './status';
import pageConfig from './page.config';
import {getPageConfig} from './utils';

$(document).ready(() => {
    console.log('init.js loaded');

    const menu_status = status.menu_status;
    // store init menu status
    initRegister('menu_status', menu_status);

    // store init page config information
    const pageConf = getPageConfig(pageConfig.pages, status.init_page);
    initRegister('page_info', pageConf);

    //init wrapper toggled change
    wrapper_toggled('menu_status', menu_status);

});

/**
 * init register
 * @param key
 * @param value
 * @returns {boolean}
 */
function initRegister(key, value) {
    const old = Cookies.get(key);
    console.log('initRegister');
    console.log(old);
    if (old) return false;
    // store init menu status
    Cookies.set(key, value);
}

/**
 * init wrapper toggled change
 * @param key
 * @param init
 * @returns {boolean}
 */
function wrapper_toggled(key, init) {
    const sw = Cookies.get(key) || init;
    $('#wrapper').addClass(sw.isClosed ? '' : 'toggled');
}
