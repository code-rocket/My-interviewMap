/**
 * judgeType
 * @param value
 * @returns {*}
 */
export const judgeType = (value) => {
    const t = Object.prototype.toString.call(value);
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (value instanceof Element) {
        return 'element';
    }
    return map[t];
};


/**
 * loadHtml
 * @param target
 * @param url url参数为数字，则加载第一个菜单指定的文件地址，否则直接作为地址加载
 */
export const loadHtml = (target, url) => {
    return new Promise((resolve, reject) => {
        const menuItemCls = "li.side-menu-item";
        const type = judgeType(url);
        console.log(type);
        if (type === "number") {
            const li = $(menuItemCls).eq(url);
            const turl = li.find(">a").attr("data-href");
            console.log(li);
            console.log(turl);
            loadHtml(target, turl);
        }
        else if (type === "string") {
            $(target).load(url);
            resolve();
        }
        else {
            reject('参数不符合格式');
        }
    });
};


/**
 * dynamic loading
 */
export const dynamicLoading = {
    /**
     * create css link
     * @param path
     * @param rel
     * @param type
     */
    css: function (path, rel, type) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        let head = document.getElementsByTagName('head')[0];
        let link = document.createElement('link');
        link.href = path;
        link.rel = rel || 'stylesheet';
        link.type = type || 'text/css';
        head.appendChild(link);
    },
    /**
     * create script
     * @param path
     * @param callback
     */
    js: function (path, callback) {
        if (!path || path.length === 0) {
            throw new Error('argument "path" is required !');
        }
        let body = document.body;
        let script = document.createElement('script');
        script.src = path;
        script.type = 'text/javascript';
        body.appendChild(script);
        if (!callback) return false;
        if (!script.addEventListener) {
            //Old IE
            script.attachEvent("onload", function () {
                // script has loaded in IE 7 and 8 as well.
                callback();
            });
        }
        else {
            script.addEventListener("load", function () {
                // Script has loaded.
                callback();
            });
        }
    }
};


export const Hbs = class {
    /**
     * Handlebars Direct Import
     * @param temp
     * @param targetID
     * @param data
     */
    directImport(temp, targetID, data) {
        $(targetID).html(temp(data));//把编译完成的代码放入到 .student-temp 的这个容器中
    }

    /**
     * Handlebars Compile Import
     * @param tmpID
     * @param targetID
     * @param data
     * @returns {Promise<any>}
     * @constructor
     */
    compileImport(tmpID, targetID, data) {
        return new Promise((resolve, reject) => {
            console.log('开始 compile hbs 模板,参数如下：模板ID ' + tmpID + ' 目标ID ' + targetID + '数据 ');
            console.info(data);
            try {
                const sideMenuTemp = $(tmpID).html();//获取到handlebars这个模板中的全部html内容
                const sideMenuTempFn = Handlebars.compile(sideMenuTemp);//编译
                $(targetID).html(sideMenuTempFn(data));//把编译完成的代码放入到 .student-temp 的这个容器中
                resolve();
            }
            catch (e) {
                reject('请检查侧边栏模块载入是否正确');
            }
        })
    }
};


/**
 * get page config information
 * @param pagelist
 * @param name
 */
export function getPageConfig(pagelist, name) {
    for (let conf of pagelist) {
        if (conf.name === name) {
            return conf;
        }
    }
}
