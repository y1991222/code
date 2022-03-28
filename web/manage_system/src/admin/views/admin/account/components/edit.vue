<template>
    <Form ref="form" :rules="ruleCustom" :model="form">
        <FormItem prop="username">
            <i-input v-model="form.username" placeholder="请输入1-20位字符" :maxlength="20">
                <span slot="prepend">账号</span>
            </i-input>
        </FormItem>
        <FormItem prop="name">
            <i-input v-model="form.name" placeholder="请输入1-12位字符" :maxlength="12">
                <span slot="prepend">姓名</span>
            </i-input>
        </FormItem>
        <FormItem prop="passwd">
            <i-input v-model="form.passwd" placeholder="请输入6-12位字符" :maxlength="12">
                <span slot="prepend">新密码</span>
            </i-input>
        </FormItem>
        <FormItem prop="passwdCheck">
            <i-input v-model="form.passwdCheck" placeholder="请输入6-12位字符" :maxlength="12">
                <span slot="prepend">确认密码</span>
            </i-input>
        </FormItem>
        <p class="text-center">
            <Button type="primary" @click="submit('form')" :loading="loading">提交</Button>
        </p>
    </Form>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            // 密码验证
            const validatePass = (rule, value, callback) => {
                if (this.form.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.form.validateField('passwdCheck');
                }
                callback();
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value !== this.form.passwd) {
                    callback(new Error('两次输入密码不相同'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    id: 0,
                    username: '',
                    passwd: '',
                    passwdCheck: ''
                },
                //验证信息
                ruleCustom: {
                    username: [
                        {required: true, message: '账号不能为空', trigger: 'blur'},
                        {max: 20, min: 1, message: '账号为1到20位字符', trigger: 'blur'},
                    ]
                    , name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'},
                        {max: 12, min: 1, message: '姓名为1到12位字符', trigger: 'blur'},
                    ]
                    , passwd: [
                        {max: 12, min: 6, message: '密码为6到12位字符', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ]
                    , passwdCheck: [
                        {max: 12, min: 6, message: '密码为6到12位字符', trigger: 'blur'},
                        {validator: validatePassCheck, trigger: 'blur'}
                    ]
                }
                , loading: false
            }
        }
        , props: ['pdata']
        , created() {
            this.form = {
                id: this.pdata.id,
                username: this.pdata.account,
                name: this.pdata.name,
                passwd: '',
                passwdCheck: ''
            };
        }
        , methods: {
            //确认修改
            submit(data) {
                this.$refs[data].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        ajax.saveAccount(this.form, () => {
                            this.$emit('close', true);
                            this.loading = false;
                        }, () => {
                            this.loading = false;
                        })
                    } else {
                        this.$Message.warning({
                            content: this.$common.getFormErrorMsg(this.$refs[data].fields)
                            , duration: 2
                        });
                    }
                })
            }
        }
    }
</script>
<style>

</style>
