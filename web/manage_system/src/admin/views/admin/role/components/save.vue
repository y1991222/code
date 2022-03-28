<template>
    <Form ref="form" :model="form" :rules="rules" :label-width="70">
        <FormItem prop="name" label="角色名">
            <Input type="text" v-model="form.name" :maxlength=50></Input>
        </FormItem>
        <FormItem prop="bewrite" label="角色描述">
            <i-input type="textarea" v-model="form.bewrite" :maxlength=200></i-input>
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
                        {required: true, message: '角色名不能为空', trigger: 'blur'}
                    ],
                    bewrite: [
                        {required: true, message: '角色描述不能为空', trigger: 'blur'}
                    ],
                }
                , btnload: false
                , roleID: 0
                , form: {
                    name: ''
                    , bewrite: ''
                    , status: 1
                }
            }
        }
        , props: ['pdata']
        , created() {
            if (this.pdata != null) {
                this.form = {
                    name: this.pdata.name
                    , bewrite: this.pdata.description
                    , status: this.pdata.status
                    , id: this.pdata.id
                };
            }
        }
        , methods: {
            submit(data) {
                this.$refs[data].validate((valid) => {
                    if (valid) {
                        this.btnload = true;
                        ajax.roleSave(this.form, () => {
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
