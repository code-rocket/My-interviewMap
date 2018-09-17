$(document).ready(() => {
    console.log('hamburger works');

    //hamburger dom
    let trigger = $('.hamburger'), overlay = $('.overlay');
    let isClosed = true;

    /**
     * hamburger component click fn
     */
    trigger.on('click', function () {
        hamburger_cross();
    });

    /**
     * hamburger cross change
     */
    function hamburger_cross() {
        if (isClosed === true) {
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    //wrapper chaneg
    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});
