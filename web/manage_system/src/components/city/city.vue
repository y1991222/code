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
    import {districts, provice} from "./address";

    export default {
        data() {
            return {
                address: provice(),
                select: '',
                selectPath: [],
                clearShow: false
            }
        },
        props: {
            value: {
                type: String
                , default: ''
            }
        },
        created() {
            if (this.value) {
                this.select = this.value;
                this.clearShow = true;
            }
        },
        methods: {
            // 子级加载，子级不能直接加载 否则会卡顿
            child(item, callback) {
                let children = [], lists = districts();
                lists.forEach((val) => {
                    if (val.parent == item.value) {
                        children.push(val)
                    }
                });
                item.children = children;
                callback();
            }
            , handleChange(value, selectedData) {
                this.clearShow = true;
                this.select = selectedData.map(o => o.label).join(' ');
                this.$emit('change', value);
            }
            , clear() {
                this.selectPath = [];
                this.clearShow = false;
                this.select = '';
                this.$emit('change', []);
            }
        }
    }
</script>
