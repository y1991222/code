<template>
    <div class="relative">
        <table class="table border">
            <tr>
                <th colspan="2">基本信息(<span class="red" v-if="pdata.status == 1">禁用</span>
                    <span class="success" v-else>正常</span>)
                </th>
            </tr>
            <tr>
                <td>昵称：{{pdata.nick_name}}</td>
                <td>手机号码：{{pdata.mobile}}</td>
            </tr>
            <tr>
                <td>生日：{{info.birthday}}</td>
                <td>注册时间：{{pdata.create_time}}</td>
            </tr>
            <tr>
                <td>支付密码：<span class="success" v-if="info.pay_pwd == 1">已设置</span>
                    <span class="red" v-else>未设置</span></td>
                <td>订阅：<span class="success" v-if="info.wx_mp_openid">是</span>
                    <span class="red" v-else>否</span></td>
            </tr>
            <tr>
                <td>总积分：{{info.score_get}}</td>
                <td>已消费积分：{{info.score_used}}</td>
            </tr>
            <tr>
                <td>可用积分：{{info.score}}</td>
                <td>已捐赠积分：{{info.donate_score}}</td>
            </tr>
            <tr>
                <td>购物次数：{{info.buy_count}}</td>
                <td>大岛投放次数：{{info.big_device_drop_count}}</td>
            </tr>
            <tr>
                <td colspan="2">
                    微信OPENID：{{info.wx_mp_openid}}
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    地址：{{pdata.address + pdata.community_name}}{{info.door}}
                </td>
            </tr>
            <tr>
                <th colspan="2">投递(累计：{{info.weight}}Kg)</th>
            </tr>
            <tr>
                <td>名称</td>
                <td>重量(Kg)</td>
            </tr>
            <tr v-for="item in info.types_weight">
                <td>{{item.name}}</td>
                <td>{{item.weight}}</td>
            </tr>
            <tr>
                <th colspan="2">绑定IC卡</th>
            </tr>
            <tr v-for="item in info.cards">
                <td colspan="2">{{item}}</td>
            </tr>
        </table>
        <Spin size="large" fix v-show="loading"></Spin>
    </div>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                info: {},
                loading: false
            }
        }
        , props: ['pdata']
        , created() {
            this.loading = true;
            ajax.userDetail({id: this.pdata.id}, (res) => {
                this.info = res;
                this.loading = false;
            });
        }
    }
</script>
