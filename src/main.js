import $ from "jquery";
import './vendor/bootstrap/js/bootstrap';
import './assets/styles/main.scss';


import './components/side-menu/side-menu'
import {loadHtml} from './utils/index'

console.log('main.js loaded');

$(document).ready(() => {
	console.log('jquery works');
	// loadHtml("#page-container", 0);
	// menuClickHandler("#page-container");
});

/**
 * menuClickHandler
 * @param target
 */
function menuClickHandler(target) {
	const sideID = "#side-menu";
	console.log($(sideID).find(">li"));
	console.log('12312312312');
	$(sideID).find(">li.side-menu-item").on("click", function () {
		console.log('click');
		let url = $(this).find(">a").attr("data-href");
		loadHtml(target, url);
	});
}
