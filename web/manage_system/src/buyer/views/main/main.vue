<template>
    <Layout style="height:100%;">
        <Header class="header">
            <div class="header-logo">小蓝亭管理系统</div>
            <div class="block" style="padding-left: 10px;">
                <Breadcrumb>
                    <BreadcrumbItem to="/">
                        <Icon type="ios-home"/>
                        <span>首页</span>
                    </BreadcrumbItem>
                    <BreadcrumbItem v-for="(item,index) in path" :key="index">
                        <span>{{item}}</span>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="right block" style="padding-right: 10px;cursor: pointer;">
                <Dropdown placement="bottom-end" @on-click="userDropdown">
                    <Avatar class="r5" icon="ios-person" size="small"/>
                    <span class="r5">欢迎：{{nickname}}</span>
                    <Icon style="color: #ffffff;" type="ios-arrow-down"/>
                    <DropdownMenu slot="list">
                        <DropdownItem name="chpw">修改密码</DropdownItem>
                        <DropdownItem name="out">退出登录</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Header>
        <Layout style="background-color: #ffffff;height:100%">
            <Sider class="slide-menu">
                <div style="position: absolute;height: 100%;left:0;top:0;width: 100%;">
                    <Menu ref="menu"
                          theme="dark"
                          :accordion="true"
                          width="200"
                          @on-select="selected">
                        <template v-for="menu in menus">
                            <template v-if="menu.children.length > 0">
                                <Submenu class="menu-line" :name="menu.path">
                                    <template slot="title">
                                        <Icon v-if="menu.icon" :custom="menu.icon"/>
                                        <span>{{menu.name}}</span></template>
                                    <template v-for="child in menu.children">
                                        <MenuItem :name="child.path">
                                            <Icon v-if="child.icon" :custom="child.icon"/>
                                            <span>{{child.name}}</span>
                                        </MenuItem>
                                    </template>
                                </Submenu>
                            </template>
                            <template v-else>
                                <MenuItem class="menu-line" :name="menu.path">
                                    <Icon v-if="menu.icon" :custom="menu.icon"/>
                                    <span>{{menu.name}}</span></MenuItem>
                            </template>
                        </template>
                    </Menu>
                </div>
            </Sider>
            <Content class="main">
                <tab-bar/>
                <div class="data">
                    <div style="height:100%;overflow-y: auto;position: relative;">
                        <router-view/>
                    </div>
                </div>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    import ajax from '@/buyer/ajax';
    import tabBar from "./tab";

    export default {
        data() {
            return {
                menus: [],
                path: [],
                nickname: "",
            }
        }
        , components: {tabBar}
        , beforeCreate() {
            //获取登陆者信息
            ajax.loginInfo((data) => {
                this.nickname = data.name;
                this.menus = data.menu;
                this.getPathInfo(this.$router.currentRoute.name);
            });
        }
        , watch: {
            '$route'() {
                this.getPathInfo(this.$router.currentRoute.name);
            }
        }
        , methods: {
            //退出
            userDropdown(type) {
                switch (type) {
                    case 'out':
                        this.$Modal.confirm({
                            title: '退出登录',
                            content: '确定退出登录？',
                            onOk: () => {
                                ajax.loginOut(() => {
                                    this.$router.push({name: 'login'});
                                });
                            }
                        });
                        break;
                    case 'chpw':
                        this.$router.push({name: 'chpw'});
                        break;
                }
            },
            getPathInfo(path) {
                this.path = [];
                let sliders = '', slider = '', out = false;
                for (sliders of this.menus) {
                    if (path == sliders.path) {
                        this.path.push(sliders.name);
                        break;
                    }
                    for (slider of sliders.children) {
                        if (path == slider.path) {
                            this.path.push(sliders.name);
                            this.path.push(slider.name);
                            out = true;
                            break;
                        }
                    }
                    if (out) {
                        break;
                    }
                }
            },
            // 左侧菜单选中
            selected(router) {
                if (router != this.$router.currentRoute.name) {
                    this.$router.push({name: router})
                }
            }
        }
    }

</script>
