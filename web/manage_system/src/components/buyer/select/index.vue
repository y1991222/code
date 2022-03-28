<template>
    <Select filterable
            remote
            @on-change="change"
            @on-clear="clear"
            :clearable="true"
            :remote-method="getBuyer"
            :loading="loading">
        <Option v-for="(item,index) in buyers" :value="item.id" :key="index" :label="item.name"></Option>
    </Select>
</template>

<script>
    import ajax from "@/admin/ajax";

    export default {
        name: "buyerSelect",
        data() {
            return {
                loading: false,
                buyers: []
            }
        }
        , methods: {
            getBuyer(val) {
                this.loading = true;
                ajax.buyerLists({all: 1, name: val}, (res) => {
                    this.loading = false;
                    this.buyers = res.lists;
                })
            },
            change(value) {
                this.$emit('input', value)
            },
            clear() {
                this.$emit('input', undefined)
            }
        }
    }
</script>
