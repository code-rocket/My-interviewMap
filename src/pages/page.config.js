/* eslint-disable */
module.exports = {
    command: {
        css: ['assets/css/public.scss'],
        js: ['utils/common.js'],
        'x-icon':'http://otaflb4oo.bkt.clouddn.com/CX-UI-Design/Logo/bigBear.ico'
    },
    pagesConfig: [
        {
            name: 'index',
            title: 'My interviewMap | home',
            html: 'home/index.ejs',
            jsEntry: 'home/index.js'
        },
        {
            name: 'about',
            title: 'My interviewMap | about',
            html: 'about/about.html',
            jsEntry: 'about/about.js'
        },
        {
            name: 'contact',
            title: 'My interviewMap | contact',
            html: 'contact/contact.html',
            jsEntry: 'contact/contact.js'
        }
    ]
};
