/**
 * 获取oss上传配置
 * @returns {object}
 */
export const getPolicy = () => {
    let policy = JSON.parse(window.sessionStorage.getItem('ossPolicy'));
    let now = Math.floor(Date.parse(new Date()) / 1000);
    // 判断Policy是否失效
    if (policy === null || policy.expire == undefined || now >= policy.expire) {
        let xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp != null) {
            xmlhttp.open("GET", '/admin.php/upload/policy', false);
            xmlhttp.send(null);
            let res = eval("(" + xmlhttp.responseText + ")");
            window.sessionStorage.setItem('ossPolicy', JSON.stringify(res.data));
            policy = res.data;
        } else {
            alert("Your browser does not support XMLHTTP.");
            policy = {};
        }
    }
    return policy;
};

/**
 * uuid
 * @returns {string}
 */
export const uuid = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

/**
 * 重命名文件
 * @param filename
 * @returns {string}
 */
export const fileRename = (filename) => {
    return uuid() + suffix(filename);
};

/**
 * 文件后缀名
 * @param filename
 * @returns {string}
 */
export const suffix = (filename) => {
    let pos = filename.lastIndexOf('.'), suffix = '';
    if (pos != -1) {
        suffix = filename.substring(pos);
    }
    return suffix;
};
/**
 * json转查询字符串
 * @param data
 * @returns {string}
 */
export const parseParams = (data) => {
    try {
        let tempArr = [];
        for (let i in data) {
            let key = encodeURIComponent(i);
            let value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        return tempArr.join('&');
    } catch (err) {
        return '';
    }
};
