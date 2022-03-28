export default [
    {
        path: 'chpw',
        name: 'chpw',
        label: '修改密码',
        component: () => import('../views/admin/chpw.vue')
    }
    , {
        path: 'index',
        name: 'index',
        label: '首页',
        component: () => import('../views/index/index.vue')
    }
    , {
        path: 'admin/role',
        name: 'role',
        label: '角色管理',
        component: () => import('../views/admin/role/role.vue')
    }
    , {
        path: 'admin/rule',
        name: "rule",
        label: '规则管理',
        component: () => import('../views/admin/rule/rule.vue')
    }
    , {
        path: 'admin/account',
        name: 'account',
        label: '账号管理',
        component: () => import('../views/admin/account/account.vue')
    }
]
