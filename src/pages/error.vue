<template lang="html">
    <div id="error_wrapper">
        {{errMsg}}
    </div>
</template>

<script>
import BaseComponent from './base';

export default {
    extends: BaseComponent,
    data() {
        const msg500 = '500服务器错误';
        const msg404 = '404页面不存在';
        return {
            msg500,
            msg404,
        };
    },
    computed: {
        errNum() {
            return parseInt(this.$route.params.num, 10);
        },
        errMsg() {
            return this.getMsg();
        },
    },
    methods: {
        getMsg() {
            switch (this.errNum) {
                case 500:
                    return this.msg500;
                case 404:
                    return this.msg404;
                default:
                    this.$router.replace('/');
                    return null;
            }
        },
    },
};
</script>

<style lang="less">
#error_wrapper {
    font-size: 38px;
    color: rgb(225, 229, 234);
    font-weight: bolder;
    padding-left: 10px;
}
</style>
