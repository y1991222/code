<template>
    <div class="v-data">
        <div class="v-data-info">
            <div class="condition">
                <span>状态：</span>
                <Select v-model="condition.status" style="width:65px" class="r5" @on-change="search">
                    <Option value="all" key="all">全部</Option>
                    <Option value="yes" key="yes">启用</Option>
                    <Option value="no" key="no">禁用</Option>
                </Select>
                <i-button type="primary" @click="add">添加账号</i-button>
            </div>
            <i-table :disabled-hover=true :columns="column" :data="data" :loading="loading">
                <template slot-scope="{row}" slot="status">
                    <template v-if="row.id > 1">
                        <a class="success" v-if="row.status == 1" @click="changeStatus(row, 0)">启用</a>
                        <a class="red" v-else @click="changeStatus(row, 1)">禁用</a>
                    </template>
                </template>
                <template slot-scope="{row}" slot="act">
                    <ButtonGroup size="small" v-if="row.id > 1">
                        <Button type="info" @click="editRole(row)">编辑</Button>
                        <Button type="success" @click="authRole(row)">角色</Button>
                    </ButtonGroup>
                </template>
            </i-table>
        </div>
        <dlg v-model="modal.show"
             :title="modal.title"
             :components=modal.components
             :data="modal.data"
             :callBack="search"/>
    </div>
</template>

<script>
    import save from './components/save';
    import edit from './components/edit';
    import role from './components/role';
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                column: [
                    {title: '账号', key: 'account'},
                    {title: '姓名', key: 'name'},
                    {title: '角色', key: 'roles'},
                    {title: '状态',  slot: 'status'},
                    {title: '更新时间', key: 'update_time',},
                    {title: '操作',  slot: 'act'}
                ]
                , data: []
                , btnload: 0
                , condition: {
                    status: 'all'
                }
                , loading: false
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
            //获取日志列表及搜索
            search() {
                this.loading = true;
                ajax.getAccount(this.condition, (res) => {
                    this.loading = false;
                    this.data = res.lists;
                }, () => {
                    this.loading = false;
                })
            }
            , add() {
                this.modal = {
                    show: true
                    , title: '添加账号'
                    , components: save
                    , data: null
                };
            }
            , changeStatus(row, status) {
                this.loading = true;
                ajax.accountStatus({id: row.id, status: status}, () => {
                    row.status = status;
                    this.loading = false;
                }, () => {
                    this.loading = false;
                })
            }
            , editRole(row) {
                this.modal = {
                    show: true
                    , title: '编辑账号'
                    , components: edit
                    , data: row
                };
            }
            , authRole(row) {
                this.modal = {
                    show: true
                    , title: '分配角色'
                    , components: role
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
