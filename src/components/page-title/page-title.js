import Cookies from 'js-cookie';

const page_title = require('./page-title.hbs');
import {Hbs} from "../../utils";

$(document).ready(() => {
    console.log('page-title works');

    const page_info = JSON.parse(Cookies.get('page_info')).content;

    let HBS = new Hbs();
    HBS.directImport(page_title, '#page-header', page_info);//导入页面标题

});
