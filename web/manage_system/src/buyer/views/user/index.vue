<template>
    <div class="v-data">
        <div class="v-data-info">
            <div class="condition">
                <span>状态：</span>
                <Select class="r5" v-model="condition.status" style="width:65px" @on-change="searchBtn">
                    <Option value="all">全部</Option>
                    <Option value="yes">正常</Option>
                    <Option value="no">禁用</Option>
                </Select>
                <span>注册时间：</span>
                <DatePicker class="r5" type="daterange" :editable="false" style="width: 175px"
                            @on-change="dateChange"></DatePicker>
                <span>手机号：</span>
                <i-input class="r5" v-model="condition.mobile" style="width: 110px;" :maxlength="11"></i-input>
                <span>地区：</span>
                <area-list class="r5" @on-change="areaChange"></area-list>
                <i-button class="r5" type="primary" @click="searchBtn">查询</i-button>
                <i-button class="r5" type="success" @click="outCvs">导出</i-button>
            </div>
            <i-table :disabled-hover=true :columns="column" :data="data" :loading="loading">
                <template slot-scope="{row}" slot="status">
                    <span class="red" v-if="row.status == 1">是</span>
                    <span class="success" v-else>否</span>
                </template>
                <template slot-scope="{row}" slot="avatar">
                    <a v-if="row.avatar" :href="row.avatar" target="_blank">
                        <Avatar :src="row.avatar"/>
                    </a>
                </template>
                <template slot-scope="{row}" slot="act">
                    <a class="blue r5" @click="detailInfo(row)">详细</a>
                    <a class="success r5" v-if="row.status == 1" @click="status(row.id, 0)">启用</a>
                </template>
            </i-table>
            <div class="page">
                <page :total="total" :size="condition.size" :current="condition.page" @change="pageChange"></page>
            </div>
        </div>
        <dlg v-model="modal.show" :title="modal.title" :components=modal.components :data="modal.data"
             :callBack="search"></dlg>
    </div>
</template>

<script>
    import ajax from "@/buyer/ajax";
    import detail from "./components/detail";
    import {parseParams} from "@/common/tools";
    import areaList from "@/components/city/area";

    export default {
        data() {
            return {
                column: [
                    // {title: 'ID', width: 85, key: 'id'},
                    {title: '手机号码', width: 110, key: 'mobile'},
                    {title: '头像', width: 50, slot: 'avatar'},
                    {title: '昵称', key: 'nick_name'},
                    {title: '地区', key: 'address'},
                    {title: '小区', key: 'community_name'},
                    {title: '禁用', width: 80, slot: 'status'},
                    {title: '注册时间', width: 150, key: 'create_time'},
                    {title: '操作', width: 150, slot: 'act'},
                ]
                , condition: {
                    page: 1
                    , size: 10
                    , status: 'all'
                    , mobile: ''
                }
                , loading: false
                , data: []
                , total: 0
                , modal: {
                    show: false
                    , title: ''
                    , components: ''
                    , data: null
                }
            }
        }
        , components: {areaList}
        , created() {
            this.search();
        }
        , methods: {
            search() {
                this.loading = true;
                ajax.userLists(this.condition, (res) => {
                    this.loading = false;
                    this.data = res.lists;
                    this.total = parseInt(res.total);
                })
            }
            , pageChange(obj) {
                this.condition.page = obj.current;
                this.condition.size = obj.size;
                this.search();
            }
            // 搜索
            , searchBtn() {
                this.condition.page = 1;
                this.search();
            }
            , dateChange(date) {
                if (date[0]) {
                    this.condition.time = date[0] + ',' + date[1];
                } else {
                    this.condition.time = '';
                }
                this.searchBtn();
            }
            // 积分记录
            , detailInfo(obj) {
                this.modal = {
                    show: true
                    , title: obj.nick_name + ' 详细信息'
                    , components: detail
                    , data: obj
                };
            },
            areaChange(obj) {
                this.condition.province = obj.province_code;
                this.condition.city = obj.city_code;
                this.condition.district = obj.district_code;
            }
            , outCvs() {
                window.open('/admin.php/b/user/lists?export=1&' + parseParams(this.condition));
            }
        }
    }
</script>
