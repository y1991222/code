<template>
    <Form ref="form" :model="form" :rules="rules" :label-width="70">
        <FormItem label="父级">
            <i-input type="text" v-model="parent_name" disabled/>
        </FormItem>
        <FormItem prop="name" label="规则名">
            <i-input type="text" v-model="form.name" :maxlength="50"/>
        </FormItem>
        <FormItem prop="rule" label="规则">
            <i-input type="text" v-model="form.rule" :maxlength="50"/>
        </FormItem>
        <FormItem label="图标">
            <Input type="text" v-model="form.icon" :maxlength="50"/>
        </FormItem>
        <FormItem class="text-center">
            <Button type="primary" @click="submit('form')" :loading="btnload">提交</Button>
        </FormItem>
    </Form>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                rules: {
                    name: [
                        {required: true, message: '规则名不能为空', trigger: 'blur'}
                    ]
                    , rule: [
                        {required: true, message: '规则不能为空', trigger: 'blur'}
                    ]
                }
                , roleID: ''
                , btnload: false
                , parent_name: '顶级'
                , form: {
                    parent: 0,
                    name: '',
                    rule: '',
                    icon: '',
                }
            }
        }
        , props: ['pdata']
        , mounted() {
            if (this.pdata != null) {
                this.form.parent = this.pdata.id;
                this.parent_name = this.pdata.name;
                console.log(this.pdata);
            }
        }
        , methods: {
            submit(data) {
                this.$refs[data].validate((valid) => {
                    if (valid) {
                        this.btnload = true;
                        if (this.roleID) {
                            this.form.id = this.roleID;
                        }
                        ajax.rulePostSave(this.form, () => {
                            this.$Message.success('操作成功');
                            this.$emit('close', true)
                        }, () => {
                            this.btnload = false;
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

