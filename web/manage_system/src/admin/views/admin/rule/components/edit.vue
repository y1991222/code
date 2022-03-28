<template>
    <Form ref="form" :model="form" :rules="rules" :label-width="70">
        <FormItem label="父级">
            <Input type="text" v-model="parent_name" disabled/>
        </FormItem>
        <FormItem prop="name" label="规则名">
            <Input type="text" v-model="form.name" :maxlength="50"/>
        </FormItem>
        <FormItem prop="rule" label="规则">
            <Input type="text" v-model="form.rule" :maxlength="50"/>
        </FormItem>
        <FormItem label="图标">
            <Input type="text" v-model="form.icon" :maxlength="50"/>
        </FormItem>
        <FormItem label="接口路径" v-if="pdata.level > 0">
            <Input class="pre-line" type="textarea" :rows="10" v-model="form.auth" :maxlength="50"/>
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
                    id: '',
                    parent: 0,
                    name: '',
                    rule: '',
                    bewrite: ''
                }
            }
        }
        , props: ['pdata']
        , mounted() {
            if (this.pdata !== false) {
                this.form = {
                    parent: this.pdata.parent_id,
                    id: this.pdata.id,
                    name: this.pdata.name,
                    rule: this.pdata.path,
                    auth: this.pdata.auth,
                    icon: this.pdata.icon,
                };
                this.parent_name = this.pdata.parent_id;
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

