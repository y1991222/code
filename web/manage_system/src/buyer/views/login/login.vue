<template>
    <div class="login login-bg">
        <div class="login-main">
            <div class="login-form">
                <p class="t-center" style="margin-bottom: 20px;">
                    <span style="font-size: 20px;">小蓝亭客户系统</span>
                </p>
                <Form ref="form" :model="form" :rules="ruleInline"
                      @keyup.enter.native="handleSubmit('form')">
                    <FormItem prop="account">
                        <i-input prefix="ios-contact"
                                 type="text"
                                 size="large"
                                 v-model="form.account"
                                 class="login-input"
                                 placeholder="请输入手机号"></i-input>
                    </FormItem>
                    <FormItem prop="pwd">
                        <i-input prefix="ios-lock"
                                 type="password"
                                 size="large"
                                 v-model="form.pwd"
                                 class="login-input"
                                 placeholder="请输入密码"></i-input>
                    </FormItem>
                    <FormItem style="margin-top: 20px;">
                        <Button type="error"
                                size="large"
                                class="login-btn"
                                @click="handleSubmit('form')" long>登&nbsp;&nbsp;&nbsp;录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import ajax from '@/buyer/ajax';

    export default {
        data() {
            return {
                form: {
                    account: '',
                    pwd: ''
                },
                //验证信息
                ruleInline: {
                    account: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    pwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ],
                }
            }
        }
        , methods: {
            //登录
            handleSubmit(form) {
                this.$submit(this, form, () => {
                    ajax.login(this.form, () => {
                        this.$Message.success("登录成功");
                        this.$router.push({name: 'main'});
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>
