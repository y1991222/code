<template>
    <div class="v-data">
        <Row class="v-data-info">
            <Col span="6" offset="9" style="padding: 30px 0;">
                <Form ref="pwd" :rules="ruleCustom" :model="pwd">
                    <FormItem prop="old_password">
                        <i-input v-model="pwd.old_password" placeholder="请输入旧密码">
                            <span slot="prepend">旧密码</span>
                        </i-input>
                    </FormItem>
                    <FormItem prop="password">
                        <i-input v-model="pwd.password" placeholder="请输入新密码">
                            <span slot="prepend">新密码</span>
                        </i-input>
                    </FormItem>
                    <FormItem prop="password_confirm">
                        <i-input v-model="pwd.password_confirm" placeholder="再次输入新密码">
                            <span slot="prepend">确认密码</span>
                        </i-input>
                    </FormItem>
                </Form>
                <p class="text-center">
                    <Button type="primary" @click="submit('pwd')">提交</Button>
                </p>
            </Col>
        </Row>
    </div>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            // 密码验证
            const validatePass = (rule, value, callback) => {
                if (value.length < 6 || value.length > 12) {
                    callback(new Error('新密码为6-12位'));
                } else {
                    if (this.pwd.password_confirm !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.pwd.validateField('password_confirm');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认密码不能为空'));
                } else if (value !== this.pwd.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                pwd: {
                    old_password: '',
                    password: '',
                    password_confirm: ''
                },
                username: '',
                //验证信息
                ruleCustom: {
                    old_password: [
                        {required: true, message: '原密码不能为空', trigger: 'blur'}
                    ]
                    , password: [
                        {required: true, message: '新密码不能为空', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ]
                    , password_confirm: [
                        {required: true, message: '确认密码不能为空', trigger: 'blur'},
                        {validator: validatePassCheck, trigger: 'blur'}
                    ]
                }
            }
        }
        , methods: {
            //确认修改
            submit(form) {
                this.$submit(this, form, () => {
                    this.$emit('loading', true);
                    ajax.changePwd(this.pwd, () => {
                        this.$Message.success('修改成功');
                        this.$refs[data].resetFields();
                        this.$emit('loading', false);
                    }, () => {
                        this.$emit('loading', false);
                    })
                });
            }
        }
    }
</script>
