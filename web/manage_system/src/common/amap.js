export default {
    init(plugin) {
        return new Promise(function (resolve, reject) {
            if (typeof AMap != 'undefined') {
                resolve(AMap);
                return false;
            }
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "//webapi.amap.com/maps?v=1.4.15&key=9474826e8de6560fd7f30666c19baebe&plugin=AMap.Geocoder";
            script.onerror = reject;
            document.head.appendChild(script);
            let interval = setInterval(() => {
                if (typeof AMap != 'undefined') {
                    resolve(AMap);
                    clearInterval(interval);
                }
            }, 20);
        })
    }
}
