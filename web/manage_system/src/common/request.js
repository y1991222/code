/**
 * VUE 全局方法
 * Created by home on 2017-05-23.
 */
import Vue from "vue";
import Resouse from 'vue-resource';
import {Message} from 'view-design';

Vue.use(Resouse);

/**
 * 移除 空数据
 * @param data
 */
// function removeEmpty(data) {
//     let obj = {};
//     for (let p in data) {
//         if (data.hasOwnProperty(p) && data[p] !== '' && data[p] !== undefined) {
//             obj[p] = data[p]
//         }
//     }
//     return obj;
// }

/**
 * ajax请求
 * @param url 请求地址
 * @param method 请求类型 get post put delete
 * @param data 参数
 * @param success 成功回调
 * @param error 错误回调
 */

export const request = (url, method, data, success, error) => {
    let option = {
        url: '/admin.php' + url,
        method: method,
        headers: {"X-Router": Vue._location},
        emulateJSON: true
    };
    switch (method) {
        case 'get':
            option.params = data;
            break;
        case 'post':
            option.body = data;
            break;
        default:
            option.body = data;
            option.emulateJSON = false;
            break
    }
    Vue.http(option).then((res) => {
        switch (parseInt(res.body.code)) {
            //未登录
            case 10001:
                window.location.href = '#/login';
                // IE 跳转问题
                // window.location.reload();
                break;
            case 1:
                success(res.body.data);
                break;
            case 10006:
                Message.error('没有权限');
                break;
            case 10007:
                Message.error('非法请求路径');
                break;
            default:
                Message.error(res.body.msg);
                if (typeof error === 'function') {
                    error();
                }
        }
    }, () => {
        Message.error('请求错误');
    });
};

export const aliOssUpload = (url, data, success, error) => {
    Vue.http.post(url, data, {
        credentials: false,
        emulateJSON: false,
        headers: {"Content-Type": "multipart/form-data"}
    }).then(function () {
        success(url);
    }, function () {
        Message.error('请求错误');
        if (typeof error === 'function') {
            error();
        }
    });
};
