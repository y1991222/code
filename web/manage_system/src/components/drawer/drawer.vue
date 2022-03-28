<template>
    <Drawer v-model="show"
            :mask-closable="false"
            :title="title"
            :width="width">
        <component v-bind:is="com" @close="close" :pdata="data"></component>
    </Drawer>
</template>

<script>
    export default {
        data() {
            return {
                com: '',
            }
        }
        , model: {
            prop: 'value'
        }
        , props: {
            value: {
                required: true
                , default: false
            }
            , title: {
                required: true
                , default: ''
            }
            , components: {
                default: ''
            }
            , data: {
                default: null
            }
            , callBack: {
                type: Function
            }
            , width: {
                type: Number,
                default: 520
            }
        }
        , computed: {
            show: {
                get() {
                    if (this.value) {
                        this.com = this.components;
                    } else {
                        this.com = '';
                    }
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        }
        , methods: {
            close(refresh) {
                this.show = false;
                if (refresh && typeof this.callBack == 'function') {
                    this.callBack();
                }
            }
        }
    }
</script>

<style>

</style>
