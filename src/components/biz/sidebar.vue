<template lang="html">
    <el-menu :default-active="currentPath" :unique-opened="true" :router="true" theme="dark">
        <el-menu-item index="/">首页</el-menu-item>
        <el-submenu :index="'/' + item.key" v-for="item in menus" :key="item.key">
            <template slot="title">{{item.displayName}}</template>
            <el-menu-item-group v-if="item.subMenu">
                <el-menu-item :index="'/' + sub.key" v-for="sub in item.subMenu" :key="sub.key">{{sub.displayName}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import { Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui';

export default {
    name: 'gz-sidebar',
    props: {
        menus: Array,
    },
    computed: {
        currentPath() {
            return this.$route.path === '/index' ? '/' : this.$route.path;
        },
    },
    components: {
        [Menu.name]: Menu,
        [Submenu.name]: Submenu,
        [MenuItem.name]: MenuItem,
        [MenuItemGroup.name]: MenuItemGroup,
    },
};

</script>

<style lang="less" scroped>
</style>
