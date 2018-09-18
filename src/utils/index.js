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
 * isEqual
 * https://segmentfault.com/a/1190000010567491
 * @param a
 * @param b
 * @param aStack        可以不用
 * @param bStack        可以不用
 * @returns {boolean}
 */
export const isEqual = (a, b, aStack, bStack) => {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null) return false;
    if (a !== a) return b !== b;
    let type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

    /**
     * deep equire
     * @param a
     * @param b
     * @param aStack
     * @param bStack
     * @returns {boolean}
     * @private
     */
    function _deepEq(a, b, aStack, bStack) {
        let className = toString.call(a);
        if (className !== toString.call(b)) return false;

        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        let areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a !== 'object' || typeof b !== 'object') return false;
            let aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor === bCtor && !(judgeType(aCtor) === 'function' && aCtor instanceof aCtor && (judgeType(bCtor) === 'function' && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b))) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        let length = aStack.length;
        while (length--) {
            if (aStack[length] === a) {
                return bStack[length] === b;
            }
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;
            while (length--) {
                if (!isEqual(a[length], b[length], aStack, bStack)) return false;
            }
        }
        else {
            let keys = Object.keys(a), key;
            length = keys.length;
            if (Object.keys(b).length !== length) return false;
            while (length--) {
                key = keys[length];
                if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack))) return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    }

    return _deepEq(a, b, aStack, bStack);
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
