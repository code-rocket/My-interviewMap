import 'jquery'
import 'bootstrap';
import Cookies from 'js-cookie';
import './assets/css/main.scss';
import './components/hamburger/hamburger';
import './components/side-menu/side-menu';

import status from "./status";

$(document).ready(() => {
    console.log('main.js loaded');

    const menu_status = status.menu_status;
    // store init menu status
    initRegister('menu_status', menu_status);

    if (status.menu_status.isClosed) {
        $('#wrapper').addClass('toggled');
    }
});


/**
 * init register
 * @param key
 * @param value
 * @returns {boolean}
 */
function initRegister(key, value) {
    const old = Cookies.get(key);
    if (old) return false;
    // store init menu status
    Cookies.set(key, value);
}
