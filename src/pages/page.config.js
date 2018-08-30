/* eslint-disable */
module.exports = {
    command: {
        css: ['assets/css/public.scss'],
        js: ['utils/common.js', 'utils/index.js'],
        'x-icon': 'http://otaflb4oo.bkt.clouddn.com/CX-UI-Design/Logo/bigBear.ico'
    },
    pagesConfig: [
        {
            name: 'index',
            type: 'pages',
            title: 'My interviewMap | home',
            html: 'home/index.ejs',
            jsEntry: 'home/index.js'
        },
        {
            name: 'side-menu',
            type: 'components',
            html: 'side-menu/side-menu.ejs',
            jsEntry: 'side-menu/side-menu.js'
        },
        {
            name: 'about',
            type: 'pages',
            title: 'My interviewMap | about',
            html: 'about/about.ejs',
            jsEntry: 'about/about.js'
        },
        {
            name: 'contact',
            type: 'pages',
            title: 'My interviewMap | contact',
            html: 'contact/contact.html',
            jsEntry: 'contact/contact.js'
        }
    ]
};
