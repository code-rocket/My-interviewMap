import '../assets/css/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//MetisMenu CSS
import '../vendor/metisMenu/metisMenu.min.css'
// Morris Charts CSS
import '../vendor/morrisjs/morris.css'

//Custom CSS
import '../assets/css/customCover.scss'

//Custom Fonts
import '../vendor/font-awesome/css/font-awesome.min.css'

import {dynamicLoading} from './index'


import pageConfig from '../../src/pages/page.config'

{
    init();
}

function init() {
    console.log('初始化开始');
    const command = pageConfig.command;
    dynamicLoading.css(command['x-icon'], "icon", "image/x-icon");
    dynamicLoading.css(command['x-icon'], "shortcut icon", "image/x-icon");
    // dynamicLoading.css('https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css');
    // dynamicLoading.js('https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js');
    // dynamicLoading.js('https://cdn.bootcss.com/jquery/3.3.0/jquery.min.js');
    console.log('加载完毕');
}

