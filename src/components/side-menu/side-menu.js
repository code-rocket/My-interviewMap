import {Hbs} from '../../utils/index';

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

	let trigger = $('.hamburger'), overlay = $('.overlay'), isClosed = false;

	trigger.click(function () {
		hamburger_cross();
	});

	function hamburger_cross() {

		if (isClosed === true) {
			overlay.hide();
			trigger.removeClass('is-open');
			trigger.addClass('is-closed');
			isClosed = false;
		} else {
			overlay.show();
			trigger.removeClass('is-closed');
			trigger.addClass('is-open');
			isClosed = true;
		}
	}

	$('[data-toggle="offcanvas"]').click(function () {
		console.log(123213)
		console.log($('#wrapper'));
		$('#wrapper').toggleClass('toggled');
	});

});
