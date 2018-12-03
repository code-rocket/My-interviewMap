/**
 * -----------------------
 * Storage template
 * -----------------------
 */
console.log('===== Storage template =====');

{
    /**
     * sessionStorage : 数据的存储仅特定于某个会话中，也就是说数据只保持到浏览器关闭，当浏览器关闭后重新打开这个页面时， 之前的存储已经被清除。
     * localStorage : 是一个持久化的存储，它并不局限于会话。除非主动删除数据，否则数据是永远不会过期的。
     **/
}
{
    /**
     *  一、localStorage和sessionStorage操作
     *  localStorage和sessionStorage都具有相同的操作方法，例如setItem、getItem和removeItem等
     */
}
{
    console.log("=== setItem存储value ===");
    sessionStorage.setItem("name1", "gaocangxiong1");
    localStorage.setItem("age1", "27");
}
{
    console.log("=== getItem获取value ===");
    let name = sessionStorage.getItem("name1");
    let age = localStorage.getItem("age1");
    console.log("===== getItem获取value =====");
    console.log(name);
    console.log(age);
}
{
    console.log("=== removeItem删除key ===");
    //setItem存储value
    sessionStorage.setItem("name2", "gaocangxiong3");
    localStorage.setItem("age2", "27");
    //removeItem删除key
    sessionStorage.removeItem("name2");
    localStorage.removeItem("age2");
    console.log(sessionStorage.getItem("name2"));
    console.log(localStorage.getItem("age2"));
}
{
    console.log("=== clear清除所有的key/value ===");
    //setItem存储value
    sessionStorage.setItem("name3", "gaocangxiong3");
    localStorage.setItem("age3", "27");
    //removeItem删除key
    sessionStorage.clear();
    localStorage.clear();
    console.log(sessionStorage.getItem("name3"));
    console.log(localStorage.getItem("age3"));
}
{
    //支持其他操作方法：点操作和[]
    console.log("=== 其他操作方法：点操作和[] ===");
    //存
    localStorage.name4 = "gaocangxiong4";
    localStorage["age4"] = "27";
    sessionStorage.name4 = "gaocangxiong4";
    sessionStorage["age4"] = "27";
    //取
    console.log(localStorage.name4);
    console.log(localStorage["age4"]);
    console.log(sessionStorage.name4);
    console.log(sessionStorage["age4"]);
}
{
    console.log("=== localStorage和sessionStorage的key和length属性实现遍历 ===");

    localStorage.clear();
    localStorage.name5 = "gaocangxiong5";
    localStorage["age5"] = "27";

    //sessionStorage和localStorage提供的key()和length可以方便的实现存储的数据遍历，例如下面的代码：
    const storage = window.localStorage;
    for (let i = 0, len = storage.length; i < len; i++) {
        let key = storage.key(i);
        let value = storage.getItem(key);
        console.log(key + " = " + value);
    }
}
{
    console.log("=== localStorage/sessionStorage存取数组 ===");
    //存
    let language = ['HTML/HTML5', 'CSS/CSS3', 'JavaScript', 'Vue', 'React'];
    localStorage.language = JSON.stringify(language);
    sessionStorage.language = JSON.stringify(language);
    //取
    let localStorageLanguage = JSON.parse(localStorage.language);
    let sessionStorageLanguage = JSON.parse(sessionStorage.language);
    console.log(localStorageLanguage);
    console.log(sessionStorageLanguage);
}
{
    console.log("=== localStorage存取对象 ===");
    let myInfo = {
        'name': 'gaocangxiong',
        'age': 27,
        'school': 'ECUT',
        'city': 'Hangzhou'
    };
    //存
    localStorage.myInfo = JSON.stringify(myInfo);
    sessionStorage.myInfo = JSON.stringify(myInfo);
    //取
    let localStorageLanguage = JSON.parse(localStorage.myInfo);
    let sessionStorageLanguage = JSON.parse(localStorage.myInfo);
    console.log(localStorageLanguage);
    console.log(sessionStorageLanguage);
}
