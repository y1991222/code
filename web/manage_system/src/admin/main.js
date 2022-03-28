import Vue from '@/common/main';
import App from './App.vue'
import router from './router/router'
// 路由全局后置钩子
router.afterEach((to, from) => {
    Vue._location = to.name;
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
