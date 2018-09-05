import Cookies from 'js-cookie';
import status from "../../status";

$(document).ready(() => {
    console.log('hamburger works');

    //hamburger dom
    let trigger = $('.hamburger'), overlay = $('.overlay');

    //init, add status class to hamburger
    hamburger_cross('init');

    /**
     * hamburger component click fn
     */
    trigger.on('click', function () {
        hamburger_cross('click');
    });


    /**
     * hamburger cross change
     * @param type
     */
    function hamburger_cross(type) {
        let menu_status = JSON.parse(Cookies.get('menu_status'));
        let isClosed = menu_status.isClosed;
        if (type !== 'init') {
            isClosed = !isClosed;
            menu_status.isClosed = isClosed;
            // store init menu status
            Cookies.set('menu_status', menu_status);
        }
        if (isClosed === true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            overlay.hide();
        }
        else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            overlay.show();
        }

    }


    //wrapper chaneg
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
