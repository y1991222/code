<template>
    <div class="block">
        <Select class="r5" v-model="province_code" style="width:auto;" @on-change="provinceChange">
            <Option value="0" key="0">全部</Option>
            <Option v-for="item in province" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select class="r5" v-model="city_code" style="width:auto;" v-show="city.length >0" @on-change="cityChange">
            <Option value="0" key="0">全部</Option>
            <Option v-for="item in city" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="district_code" style="width:auto;" v-show="district.length >0" @on-change="callback">
            <Option value="0" key="0">全部</Option>
            <Option v-for="item in district" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>

<script>
    import {districts, provice} from "./address";

    export default {
        data() {
            return {
                province_code: '0',
                city_code: '0',
                district_code: '0',
                province: [],
                city: [],
                district: [],
            }
        }
        , created() {
            this.province = provice();
        }
        , methods: {
            provinceChange(val) {
                this.city_code = '0';
                this.district_code = '0';
                this.district = [];
                if (val == 0) {
                    this.city = [];
                } else {
                    this.city = this.child(val);
                }
                this.callback();
            }
            , cityChange(val) {
                this.district_code = '0';
                this.district = this.child(val);
                this.callback();
            }
            , child(parent) {
                let children = [], lists = districts();
                lists.forEach((val) => {
                    if (val.parent == parent) {
                        children.push(val)
                    }
                });
                return children;
            }
            , callback() {
                this.$emit('on-change', {
                    province_code: this.province_code > 0 ? this.province_code : undefined,
                    city_code: this.city_code > 0 ? this.city_code : undefined,
                    district_code: this.district_code > 0 ? this.district_code : undefined,
                })
            }
        }
    }
</script>

<style scoped>

</style>
