<template>
    <div class="v-data">
        <div class="v-data-info">
            <div class="condition">
                <i-button class="r5" type="primary" @click="ruleAdd">添加规则</i-button>
                <i-button type="error" @click="refresh">刷新缓存</i-button>
            </div>
            <i-table :loading="loading" :disabled-hover=true :columns="column" :data="data">
                <template slot-scope="{row}" slot="sequence">
                    <i-input size="small" :value="row.sequence" @on-blur="sequence(row)"/>
                </template>
                <template slot-scope="{row}" slot="name">
                    <template v-if="row.level >0">
                        <span :style="{marginLeft:row.level*15+'px'}">
                            <span>└─</span>{{row.name}}
                        </span>
                    </template>
                    <span v-else>{{row.name}}</span>
                </template>
                <template slot-scope="{row}" slot="status">
                    <a class="success" v-if="row.status == 1" @click="changeStatus(row, 0)">启用</a>
                    <a class="red" v-else @click="changeStatus(row, 1)">禁用</a>
                </template>
                <template slot-scope="{row}" slot="act">
                    <ButtonGroup size="small">
                        <Button type="success" @click="addRule(row)">添加子级</Button>
                        <Button type="info" @click="editRule(row)">编辑</Button>
                        <Button type="error" @click="deleteRule(row)">删除</Button>
                    </ButtonGroup>
                </template>
            </i-table>
        </div>
        <dlg v-model="modal.show" :title="modal.title" :components=modal.components :data="modal.data"
             :callBack="search"/>
    </div>
</template>

<script>
    import add from './components/add';
    import edit from './components/edit';
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                column: [
                    {title: '排序', width: 110, key: 'sequence', slot: 'sequence'},
                    {title: '名称', key: 'name', slot: 'name'},
                    {title: '路由', key: 'path'},
                    {title: '状态', key: 'status', slot: 'status'},
                    {title: '操作', width: 240, key: 'status', slot: 'act'}
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
                ajax.getRules(this.condition, (data) => {
                    this.loading = false;
                    this.data = data.lists;
                }, () => {
                    this.loading = false;
                })
            }
            , ruleAdd() {
                this.modal = {
                    show: true
                    , title: '添加规则'
                    , components: add
                    , data: null
                };
            }
            , refresh() {
                this.loading = true;
                ajax.ruleRefresh((data) => {
                    this.loading = false;
                    this.$Message.success('刷新成功');
                }, () => {
                    this.loading = false;
                })
            }
            , changeStatus(row, status) {
                this.loading = true;
                ajax.rulePostStatus({id: row.id, status: status}, () => {
                    row.status = status;
                    this.loading = false;
                }, () => {
                    this.loading = false;
                })
            }
            , addRule(row) {
                this.modal = {
                    show: true
                    , title: '添加规则'
                    , components: add
                    , data: row
                };
            }
            , editRule(row) {
                this.modal = {
                    show: true
                    , title: '编辑规则'
                    , components: edit
                    , data: row
                };
            }
            , deleteRule(row) {
                this.$Modal.confirm({
                    title: '删除'
                    , loading: true
                    , content: '确定删除该规则？'
                    , onOk: () => {
                        this.$api.post('rule/del', {id: row.id}, () => {
                            this.search();
                            this.$Modal.remove()
                        }, () => {
                            this.$Modal.remove()
                        })
                    }
                })
            }
            , sequence(row) {
                let val = event.target.value;
                if (row.sequence != val) {
                    this.$Modal.confirm({
                        title: '排序'
                        , loading: true
                        , content: '确定更新排序？'
                        , onCancel: () => {
                            if (typeof row.sequence == "string") {
                                row.sequence = parseInt(row.sequence);
                            } else {
                                row.sequence = row.sequence + '';
                            }
                        }
                        , onOk: () => {
                            ajax.rulePostSequence({id: row.id, sort: val}, () => {
                                this.search();
                                this.$Modal.remove();
                            }, () => {
                                this.$Modal.remove();
                            })
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>
