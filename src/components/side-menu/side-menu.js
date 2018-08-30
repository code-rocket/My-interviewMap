import {loadHtml} from "../../utils/index";


$(document).ready(function () {
    console.log('加载侧边栏脚本js～～');
    loadHtml("#page-wrapper", 1);
    menuClickHandler("#page-wrapper");
});

/**
 * menuClickHandler
 * @param target
 */
function menuClickHandler(target) {
    const sideID = "#side-menu-list";
    $(sideID).find(">li").on("click", function () {
        let url = $(this).find(">a").attr("data-href");
        loadHtml(target, url);
    });
}
