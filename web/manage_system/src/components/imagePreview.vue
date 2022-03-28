<template>
    <img style="max-height: 500px;max-width: 100%;display:block;margin:0 auto;" :src="src" alt="">
</template>

<script>
    export default {
        name: "headImage"
        , data() {
            return {
                src: "",
            }
        }
        , props: ['pdata']
        , mounted() {
            this.src = this.pdata;
        }
    }
</script>
