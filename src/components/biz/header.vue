<template lang="html">
<div class="gz-header">
    <div class="title">
        <div class="title-inner v-middle">
            {{title}}
        </div>
    </div>
    <div class="header-content">
        <div class="user-info">
            <div class="user-info-inner v-middle">
                <span class="welcomeMsg">{{userInfo.userDisplayName}}</span>
                <el-button type="text" @click="signOut" :loading="loading">退出</el-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { Dropdown } from 'element-ui';

export default {
    name: 'gz-header',
    props: {
        title: {
            type: String,
            default: () => '',
        },
        menus: {
            type: Object,
            default: () => {},
        },
        userInfo: {
            type: Object,
            default: () => {},
            validator: val => val !== null,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    components: {
        [Dropdown.name]: Dropdown,
    },
    methods: {
        signOut() {
            this.$set(this, 'loading', true);
            this.$emit('signOut');
        },
    },
};
</script>

<style lang="less">
@import '../../assets/styles/variable.less';
@import '../../assets/styles/functions.less';
.gz-header {
    .clearfix();
    height: @header-height;
    background-color: #1F2D3D;
    // background-image: linear-gradient(to top, #1f2d3d, #274971);
    padding: 0 30px;
    font-size: 14px;
    color: #c0ccda;
    .fl {
        float: left;
    }
    .v-middle {
        display: table-cell;
        height: @header-height;
        vertical-align: middle;
    }
    .white {
        color: #fff;
    }
    .title {
        font-size: 18px;
        .fl;
        .v-middle;
        color: #E5E9F2;
    }
    .header-content {
        float: right;
        .user-info {
            .fl;
            padding-left: 10px;
            margin: 0 5px 0 10px;
            .user-info-inner {
                .el-button {
                    color: #44b5df;
                    padding: 0 10px;

                    &:before {
                        background: 0 0;
                    }
                }
            }
        }
        .welcomeMsg {
            display: inline-block;
            margin-left: 10px;
            line-height: 20px;
        }
    }
}
.dropdown-user-items {
    color: #478fca;
}
.dropdown-user-items li:last-child {
    color: black;
}
.dropdown-icon {
    margin-right: 10px;
}
</style>
