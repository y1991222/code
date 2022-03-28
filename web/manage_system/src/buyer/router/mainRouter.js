export default [
    {
        path: 'chpw',
        name: 'chpw',
        label: '修改密码',
        component: () => import('../views/index/chpw.vue')
    }
    , {
        path: 'index',
        name: 'index',
        label: '首页',
        component: () => import('../views/index/index.vue')
    }
    , {
        path: 'user/lists',
        name: 'userLists',
        label: '用户列表',
        component: () => import('../views/user/index.vue')
    }
]
