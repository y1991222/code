import {request} from "@/common/request";

/**
 * 添加请求前缀
 * @param url
 * @param method
 * @param data
 * @param success
 * @param error
 */
function ajax(url, method, data, success, error) {
    request('/b' + url, method, data, success, error);
}

export default {
    // 登录
    login(data, success, error) {
        ajax('/auth/login', 'post', data, success, error);
    }
    // 退出
    , loginOut(success, error) {
        ajax('/auth/out', 'get', {}, success, error);
    }
    // 获取登录信息
    , loginInfo(success, error) {
        ajax('/auth/isLogin', 'get', {}, success, error);
    }
    // 修改密码
    , changePwd(data, success, error) {
        ajax('/auth/ChangePwd', 'get', data, success, error);
    }
    // 用户
    , userLists(data, success, error) {
        ajax('/user/lists', 'get', data, success, error);
    }
}
