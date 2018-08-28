import {createLink} from './index'

import pageConfig from '../../src/pages/page.config'

{
    init();
}

function init() {
    console.log('初始化开始');
    const command = pageConfig.command;
    createLink(command['x-icon'], "icon", "image/x-icon");
    createLink(command['x-icon'], "shortcut icon", "image/x-icon");
}

