<template lang="html">
    <transition-group
        tag="ul"
        :class="['gz-el-upload-list', 'gz-el-upload-list--picture']"
        name="el-list"
        id="gz-upload-list">
        <li
            v-for="(item, index) in fileList"
            :class="['gz-el-upload-list__item']"
            :key="index">
            <img :src="item.url" alt="" class="gz-el-upload-list__item-thumbnail" v-if="item.status === 'success'">
            <i class="el-icon-document upload-document gz-el-upload-list__item-thumbnail" v-if="item.status === 'uploading'"></i>
            <a class="gz-el-upload-list__item-name">
                <i class="el-icon-document" v-if="item.status === 'uploading'"></i>
                {{ item.name }}
            </a>
            <label class="gz-el-upload-list__item-status-label" v-if="item.status === 'success'">
                <i class="el-icon-check"></i>
            </label>
            <i class="el-icon-close" @click="deleteHandler(index, item)"></i>
            <div class="gz-progress" v-if="item.status === 'uploading'">
                <el-progress :percentage="item.progress"></el-progress>
            </div>
        </li>
    </transition-group>
</template>

<script>
import Vue from 'vue';
import {
    Progress
} from 'element-ui';

Vue.use(Progress);

export default {
    name: 'gz-upload-list',
    props: {
        fileList: {
            type: Array,
            default: () => [],
        },
        upload: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    components: {
        [Progress.name]: Progress,
    },
    methods: {
        deleteHandler(index, item) {
            if (item.status === 'uploading') {
                this.upload.abort(item.raw);
            }
            this.$emit('deleteFile', index, item);
        },
        onProgress(event, file) {
            if (event.type === 'progress') {
                this.fileList.forEach((item, index) => {
                    if (item.uid === file.uid) {
                        this.fileList[index].status = 'uploading';
                        this.fileList[index].progress = parseInt(event.percent, 10);
                    }
                });
            }
            if (event.percent === 100) {
                this.fileList.forEach((item, index) => {
                    if (item.uid === file.uid) {
                        this.fileList[index].url = file.url;
                    }
                });
            }
        },
        onSuccess(file) {
            this.fileList.forEach((item, index) => {
                if (item.uid === file.uid) {
                    this.fileList[index].status = 'success';
                }
            });
        },
        onError(file) {
            this.fileList.forEach((item, index) => {
                if (item.uid === file.uid) {
                    this.fileList.splice(index, 1);
                }
            });
        },
        onAddFile(file) {
            this.fileList.push({
                name: file.name,
                status: 'uploading',
                progress: 0,
                uid: file.uid,
                raw: file,
            });
        },
        onDelete(index) {
            this.fileList.splice(index, 1);
        },
    },
};
</script>

<style lang="less" scoped>
#gz-upload-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .gz-el-upload-list__item {
        transition: all 0.5s cubic-bezier(.55,0,.1,1);
        font-size: 14px;
        color: #48576a;
        line-height: 1.8;
        position: relative;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        margin-top: 10px;
        padding: 10px 10px 10px 90px;
        .gz-el-upload-list__item-thumbnail {
            vertical-align: middle;
            display: inline-block;
            width: 70px;
            height: 70px;
            float: left;
            position: relative;
            z-index: 1;
            margin-left: -80px;
        }
        .upload-document {
            font-size: 70px;
        }
        .gz-el-upload-list__item-name {
            line-height: 70px;
            margin-top: 0;
            color: #48576a;
            display: block;
            margin-right: 40px;
            overflow: hidden;
            padding-left: 4px;
            text-overflow: ellipsis;
            transition: color 0.3s;
            white-space: nowrap;
        }
        .gz-el-upload-list__item-status-label {
            position: absolute;
            right: -17px;
            top: -7px;
            width: 46px;
            height: 26px;
            background: #13ce66;
            text-align: center;
            transform: rotate(45deg);
            box-shadow: 0 1px 1px #ccc;
            i {
                color: #fff;
                font-size: 12px;
                margin-top: 12px;
                transform: rotate(-45deg) scale(.8);
            }
        }
        .el-icon-close {
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
            opacity: 0.75;
            color: #48576a;
            transform: scale(.7);
            display: none;
        }
        .gz-progress {
            position: absolute;
            top: 65%;
            left: 92px;
            width: 70%;
        }
    }
    .gz-el-upload-list__item:hover {
        .el-icon-close {
            display: block;
        }
        .gz-el-upload-list__item-status-label {
            display: none;
        }
    }
}
</style>
