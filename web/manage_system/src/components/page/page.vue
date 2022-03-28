<template>
    <Page :total="total"
          :page-size="size"
          :current="current"
          show-sizer
          size="small"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange" show-total/>
</template>

<script>
    export default {
        data() {
            return {
                obj: {
                    size: 10
                    , current: 1
                }
            }
        }
        , props: {
            total: {
                type: Number
                , required: true
            }
            , size: {
                type: Number
                , required: true
            }
            , current: {
                type: Number
                , required: true
            }
        }
        , mounted() {
            this.obj.size = this.size;
            this.obj.current = this.current;
        }
        , methods: {
            pageChange(page) {
                this.obj.current = page;
                this.$emit('change', this.obj);
            }
            , pageSizeChange(size) {
                this.obj.size = size;
                this.$emit('change', this.obj);
            }
        }
    }
</script>

<style scoped>

</style>