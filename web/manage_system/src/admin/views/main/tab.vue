<template>
    <Tabs class="menu-tabs"
          :animated="false"
          type="card"
          @on-click="change"
          @on-tab-remove="remove"
          v-model="select">
        <TabPane label="首页" name="index" icon="ios-home"></TabPane>
        <template v-for="item in tabs">
            <TabPane :key="item.name" :label="item.name" :name="item.path"
                     :closable="true"></TabPane>
        </template>
    </Tabs>
</template>

<script>
    import routers from "@/admin/router/mainRouter";

    export default {
        data() {
            return {
                select: 'index'
                , tabs: []
            }
        }
        , watch: {
            '$route'(to) {
                this.addTab(to.name);
            }
        }
        , mounted() {
            this.addTab(this.$router.currentRoute.name);
        }
        , methods: {
            // 添加标签
            addTab(path) {
                this.select = path;
                if (path == 'index') {
                    return false;
                }
                let length = this.tabs.length;
                for (let i = 0; i < length; i++) {
                    if (this.tabs[i].path == path) {
                        return false;
                    }
                }
                let len = routers.length;
                for (let i = 0; i < len; i++) {
                    if (routers[i].name == path) {
                        this.tabs.push({
                            path: routers[i].name,
                            name: routers[i].label,
                        });
                        return false;
                    }
                }
            }
            // 选中修改
            , change(path) {
                if (path != this.$router.currentRoute.name) {
                    this.$router.push({name: path})
                }
            }
            // 移除标签
            , remove(path) {
                let key = 0, tabs = this.tabs;
                tabs.forEach((tab, index) => {
                    if (tab.path == path) {
                        key = index;
                    }
                });
                if (this.select != this.$router.currentRoute.name) {
                    this.$router.push({name: this.select})
                }
                this.$nextTick(() => {
                    tabs.splice(key, 1);
                    this.tabs = tabs;
                });

            }
        }
    }
</script>

<style scoped>

</style>
