<template>
<div class="layout">
    <gz-header :title="title" :userInfo="userInfo" @signOut="logout"></gz-header>
    <div class="sidebar">
        <gz-sidebar :menus="menus"></gz-sidebar>
    </div>
    <div class="main">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in breadcrumbs" :to="{ path: item.to }" :key="item.name">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '../components/biz/header';
import Sidebar from '../components/biz/sidebar';

export default {
    name: 'layout',
    data() {
        return {
            title: '管理系统',
        };
    },
    components: {
        [Header.name]: Header,
        [Sidebar.name]: Sidebar,
    },
    computed: {
        ...mapGetters([
            'token',
            'userDisplayName',
            'breadcrumbs',
            'authorities',
            'menus',
        ]),
        userInfo() {
            return {
                userDisplayName: this.userDisplayName,
            };
        },
    },
    methods: {
        ...mapActions([
            'getAuthorities',
            'signOut',
            'setBreadcrumbs',
        ]),
        logout() {
            this.signOut()
            .then(() => {
                this.$router.replace('/login');
            });
        },
    },
    mounted() {
        if (this.token) {
            this.getAuthorities();
        }
    }
}
</script>

<style lang="less">
@import '../assets/styles/variable.less';

.layout {
    min-height: 100%;
    position: relative;
    .el-breadcrumb {
        padding: 20px 0 30px 0;
    }
    .page-content {
        padding: 20px;
    }
    .pagination-bar {
        margin-top: 20px;
        text-align: center;
    }
    .sidebar{
        width: 240px;
        position: absolute;
        top: @header-height;
        left: 0px;
        bottom: 0px;
        background-color: #324057;
    }
    .main {
        margin-left: 240px;
        padding: 0 20px 20px 20px;
        .el-loading-mask {
            z-index: 1999;
        }
    }
    .date-separator .el-form-item__label {
        text-align: center;
    }
}
</style>
