/* eslint-disable */
module.exports = {
    command: {
        css: [],
        js: [
            {name: 'main', path: './src/main.js'},
        ],
        'x-icon': 'http://otaflb4oo.bkt.clouddn.com/CX-UI-Design/Logo/bigBear.ico'
    },
    pages: [
        {
            name: 'index',
            template: 'src/pages/home/index.ejs',
            output: 'dist/index.hbs',
            jsEntry: 'src/pages/home/index.js',
            content: {
                title: 'My interviewMap | Home',
                description: 'Home Page'
            },
        },
        {
            name: 'about',
            template: 'src/pages/about/about.ejs',
            output: 'dist/pages/index.hbs',
            jsEntry: 'src/pages/about/index.js',
            content: {
                title: 'My interviewMap | about',
                description: 'about Page'
            },
        },
        {
            name: 'about',
            template: 'src/pages/contact/contact.ejs',
            output: 'dist/pages/contact.html',
            jsEntry: 'src/pages/contact/contact.js',
            content: {
                title: 'My interviewMap | contact',
                description: 'contact Page'
            },
        }
    ]
};
