import {loadHtml} from "../../utils/index";
import './index.scss'
import '../../components/side-menu/side-menu.scss'

$(document).ready(readyHandler);

function readyHandler() {
    console.log('首页的脚本js运行了～～');
    $('#interviewMap').css('color', 'red');
    loadHtml("#side-menu", './components/side-menu.html');
}
