<template>
    <div style="position: relative;">
        <Tree ref="rule" :children-key="key" :data="tree" show-checkbox :check-strictly=true></Tree>
        <Button type="primary" @click="save">保存</Button>
        <Spin size="large" fix v-show="loading"></Spin>
    </div>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                key: 'children'
                , loading: true
                , tree: []
            }
        }
        , props: ['pdata']
        , mounted() {
            ajax.accountRole('get', {id: this.pdata.id}, (res) => {
                this.tree = res.lists;
                this.loading = false;
            }, () => {
                this.$Message.error('请求错误');
            })
        }
        , methods: {
            clsoe() {
                this.$emit('close', true)
            }
            , save() {
                let ids = []
                    , checked = this.$refs['rule'].getCheckedNodes();
                checked.forEach((val) => {
                    ids.push(val.id);
                });
                if (ids.length == 0) {
                    this.$Message.error('请选择角色');
                    return false;
                }
                this.loading = true;
                ajax.accountRole('post', {id: this.pdata.id, roles: ids}, () => {
                    this.$Message.success('操作成功');
                    this.clsoe();
                }, () => {
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
