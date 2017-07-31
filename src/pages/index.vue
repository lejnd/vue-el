<template lang='html'>
    <div id="index">
        欢迎光临管理系统
    </div>
</template>
<script>
import BaseComponent from './base';
import Auth from './auth';

export default {
    extends: BaseComponent,
    mixins: [Auth]
};
</script>
<style lang='less'>
#index {
    padding: 5px;
    font-size: 48px;
    color: #E5E9F2;
    font-weight: bolder;
}
</style>
