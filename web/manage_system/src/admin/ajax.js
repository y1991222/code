import {request, aliOssUpload} from "@/common/request";

/**
 * 添加请求前缀
 * @param url
 * @param method
 * @param data
 * @param success
 * @param error
 */
function ajax(url, method, data, success, error) {
    request('/a' + url, method, data, success, error);
}

export default {
    uploadFile(data, success, error) {
        let url = 'https://xiaolanting.oss-cn-shanghai.aliyuncs.com/';
        aliOssUpload(url, data, success, error);
    }
    // 登录
    , login(data, success, error) {
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
    // 规则
    , getRules(data, success, error) {
        ajax('/rule/lists', 'get', data, success, error);
    }
    , rulePostSave(data, success, error) {
        ajax('/rule/save', 'post', data, success, error);
    }
    , rulePostSequence(data, success, error) {
        ajax('/rule/sequence', 'post', data, success, error);
    }
    , rulePostStatus(data, success, error) {
        ajax('/rule/status', 'post', data, success, error);
    }
    , ruleRefresh(success, error) {
        ajax('/rule/refresh', 'get', {}, success, error);
    }
    // 管理员账号
    , getAccount(data, success, error) {
        ajax('/admin/lists', 'get', data, success, error);
    }
    , saveAccount(data, success, error) {
        ajax('/admin/save', 'post', data, success, error);
    }
    , accountStatus(data, success, error) {
        ajax('/admin/status', 'post', data, success, error);
    }
    , accountRole(method, data, success, error) {
        ajax('/admin/role', method, data, success, error);
    }
    // 角色
    , getRole(data, success, error) {
        ajax('/role/lists', 'get', data, success, error);
    }
    , roleSave(data, success, error) {
        ajax('/role/save', 'post', data, success, error);
    }
    , roleRule(method, data, success, error) {
        ajax('/role/rule', method, data, success, error);
    }
    , rolePostDel(data, success, error) {
        ajax('/role/del', 'post', data, success, error);
    }
    // 用户
    , userLists(data, success, error) {
        ajax('/user/lists', 'get', data, success, error);
    }
    // 禁用用户
    , userDisable(data, success, error) {
        ajax('/user/disable', 'post', data, success, error);
    }
    // 用户详情
    , userDetail(data, success, error) {
        ajax('/user/detail', 'get', data, success, error);
    }
    // 用户积分
    , userScore(data, success, error) {
        ajax('/score/log', 'get', data, success, error);
    }
    // 人员分组
    , maintainGroup(method, data, success, error) {
        ajax('/maintain/group', method, data, success, error);
    }
    // 人员列表
    , maintain(method, data, success, error) {
        ajax('/maintain/people', method, data, success, error);
    }
    // 禁用用户
    , maintainDisable(data, success, error) {
        ajax('/maintain/peopleStatus', 'post', data, success, error);
    }
}
