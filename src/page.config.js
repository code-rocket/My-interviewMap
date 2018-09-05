const pageConfig = {
    command: {
        css: [],
        js: [
            {name: 'main', path: './src/main.js'}
        ],
    },
    pages: [
        {
            name: 'home',
            template: 'src/pages/home/home.hbs',
            output: 'dist/index.html',
            jsEntry: 'src/pages/home/home.js',
            content: {
                title: 'My interviewMap | Home',
                page_title: 'Home',
                description: 'Home Page'
            },
        },
        {
            name: 'about',
            template: 'src/pages/about/about.hbs',
            output: 'dist/pages/about.html',
            jsEntry: 'src/pages/about/about.js',
            content: {
                title: 'My interviewMap | About',
                page_title: 'About',
                description: 'About Page'
            },
        },
        {
            name: 'test',
            template: 'src/pages/test/test.hbs',
            output: 'dist/pages/test.html',
            jsEntry: '',
            content: {
                title: 'My interviewMap | Test',
                page_title: 'Test',
                description: 'Test Page'
            },
        }
    ]
};


module.exports = pageConfig;
