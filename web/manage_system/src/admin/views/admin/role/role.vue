<template>
    <div class="v-data">
        <div class="v-data-info">
            <div class="condition">
                <span>状态：</span>
                <Select v-model="condition.status" style="width:65px" class="r5" @on-change="search">
                    <Option value="all">全部</Option>
                    <Option value="yes">启用</Option>
                    <Option value="no">禁用</Option>
                </Select>
                <i-button type="primary" @click="roleAdd">添加角色</i-button>
            </div>
            <i-table :loading="loading" :disabled-hover=true :columns="column" :data="data">
                <template slot-scope="{row}" slot="status">
                    <a class="success" v-if="row.status == 1" @click="changeStatus(row, 0)">启用</a>
                    <a class="red" v-else @click="changeStatus(row, 1)">禁用</a>
                </template>
                <template slot-scope="{row}" slot="act">
                    <ButtonGroup size="small">
                        <Button type="info" @click="editRole(row)">编辑</Button>
                        <Button type="success" @click="authRole(row)">权限</Button>
                        <Button type="error" @click="deleteRole(row)">删除</Button>
                    </ButtonGroup>
                </template>
            </i-table>
        </div>
        <dlg v-model="modal.show" :title="modal.title" :components=modal.components :data="modal.data"
             :callBack="search"/>
    </div>
</template>

<script>
    import rule from './components/rule';
    import save from './components/save';
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                column: [
                    {title: '角色名', key: 'name'},
                    {title: '描述', key: 'description'},
                    {title: '状态', key: 'status', slot: 'status'},
                    {title: '操作', key: 'status', slot: 'act'}
                ]
                , data: []
                , loading: false
                , btnload: 0
                , condition: {
                    status: 'all'
                }
                , modal: {
                    show: false
                    , title: ''
                    , components: ''
                    , data: null
                }
            }
        }
        , created() {
            this.search();
        }
        , methods: {
            //获取角色列表
            search() {
                this.loading = true;
                ajax.getRole(this.condition, (data) => {
                    this.loading = false;
                    this.data = data.lists;
                }, () => {
                    this.loading = false;
                })
            }
            , roleAdd() {
                this.modal = {
                    show: true
                    , title: '添加规则'
                    , components: save
                    , data: null
                };
            }
            , changeStatus(row, status) {
                this.loading = true;
                ajax.roleStatus({id: row.id, status: status}, () => {
                    row.status = status;
                    this.loading = false;
                }, () => {
                    this.loading = false;
                })
            }
            , editRole(row) {
                this.modal = {
                    show: true
                    , title: '添加规则'
                    , components: save
                    , data: row
                };
            }
            , authRole(row) {
                this.modal = {
                    show: true
                    , title: '权限设置'
                    , components: rule
                    , data: row
                };
            }
            , deleteRole(row) {
                this.$Modal.confirm({
                    title: '删除'
                    , loading: true
                    , content: '确定删除该角色？'
                    , onOk: () => {
                        ajax.rolePostDel({id: row.id}, () => {
                            this.search();
                            this.$Modal.remove()
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
