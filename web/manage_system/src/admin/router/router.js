import Vue from 'vue'
import Router from 'vue-router'
import child from './mainRouter';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/login.vue')
        }
        , {
            path: '/',
            name: 'main',
            component: () => import('../views/main/main.vue'),
            redirect: '/index',
            children: child
        }
    ]
})
