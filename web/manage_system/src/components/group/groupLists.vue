<template>
    <Cascader :data="address"
              :class="{'ivu-cascader-show-clear':clearShow}"
              v-model="selectPath"
              :load-data="child"
              @on-change="handleChange">
        <Input v-model="select" readonly></Input>
        <Icon class="ivu-cascader-arrow" type="ios-close-circle" v-show="clearShow"
              @click.native.stop="clear"></Icon>
        <Icon class="ivu-cascader-arrow" type="ios-arrow-down"></Icon>
    </Cascader>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        data() {
            return {
                address: [],
                select: '',
                selectPath: [],
                clearShow: false
            }
        },
        props: {
            value: {
                type: String
                , default: ''
            },
            change: {
                required: true,
                type: Function
            }
        },
        created() {
            if (this.value) {
                this.select = this.value;
                this.clearShow = true;
            }
            ajax.maintainGroup('get', {all: 'yes', pid: 0}, (res) => {
                this.address = res;
            })
        },
        methods: {
            // 子级加载，子级不能直接加载 否则会卡顿
            child(item, callback) {
                item.loading = true;
                ajax.maintainGroup('get', {all: 'yes', pid: item.value}, (res) => {
                    item.children = res;
                    item.loading = false;
                    callback();
                });
            }
            , handleChange(value, selectedData) {
                this.clearShow = true;
                this.select = selectedData.map(o => o.label).join(' ');
                this.change(value);
            }
            , clear() {
                this.selectPath = [];
                this.clearShow = false;
                this.select = '';
                this.change([]);
            }
        }
    }
</script>
