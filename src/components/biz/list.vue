<template lang="html">
    <div class="list-wrap">
        <div class="search">
            <slot name="searchForm"></slot>
        </div>
        <div class="search" v-if="shown">
            <slot name="searchFormHidden"></slot>
        </div>
        <div class="shown-btn" v-if="searchFormHidden">
            <el-button type="text" @click="shown = !shown">{{shown ? '关闭更多查询条件' : '打开更多查询条件'}}</el-button>
        </div>
        <div class="handler-toolbar">
            <slot name="handlerToolbar"></slot>
        </div>
        <div class="list">
            <el-table
                highlight-current-row
                :data="currentList"
                v-loading="loading"
                element-loading-text="拼命加载中"
                stripe="stripe"
                style="width: 100%;max-height: 600px;"
                border
                @selection-change="handleSelectionChange"
                @cell-click="cellClickHandler"
                @current-change="currentChangeHandler"
                :row-class-name="tableRowClassName">
                <!-- 多选 -->
                <el-table-column type="selection" width="55px" v-if="hasCheckbox===&quot;true&quot;"></el-table-column>
                <!-- 插入自定义列 -->
                <slot name="handlerColumn"></slot>
                <el-table-column v-for="column in colNameMap" :label="column.displayName" :width="column.width" :fixed="column.fixed" :key="column.displayName" align="center">
                    <template scope="scope">
                        <div v-if="column.type === 'button'">
                            <el-button v-for="(item, index) in operation" size="small" :key="item.text" :type="item.buttonType" @click="emitOperationEvent('click', [item.key, scope.row, index, $event])">{{item.text}}</el-button>
                        </div>
                        <div v-else-if="column.type === 'img'">
                            <img :src="scope.row[column.key]">
                        </div>
                        <div v-else-if="column.type === 'link'">
                            <a href="javascript:void(0)" :class="{content:column.ellipsis}" :title="scope.row[column.key]">
                                {{scope.row[column.key]}}
                            </a>
                        </div>
                        <div v-else-if="column.type === 'select'">
                            <el-select v-model="scope.row.dataState" placeholder="请选择" @change="handleOptionChange">
                                <el-option v-for="item in selectOptions" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </div>
                        <div v-else :class="{content:column.ellipsis}" :title="scope.row[column.key]">
                            {{scope.row[column.key]}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <slot name="statistics"></slot>
        <div v-show="currentList.length > 0" class="pagination-bar">
            <el-pagination
                v-if="pageShow"
                @current-change="handleCurrentChange"
                :current-page="queryCondition.paging.pageIndex"
                @size-change="handleSizeChange"
                :page-size="queryCondition.paging.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="originPaging.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { Form, Input, Select, DatePicker, Table, Button, Pagination } from 'element-ui';

    export default {
        name: 'gz-list',
        props: {
            form: {
                type: Object,
                default: () => {},
            },
            colNameMap: {
                type: Array,
                default: () => [],
            },
            selectOptions: {
                type: Array,
                default: () => [],
            },
            operation: {
                type: Array,
                default: () => [],
            },
            originPaging: {
                type: Object,
                default: () => {},
            },
            originData: {
                type: Array,
                default: () => [],
            },
            maxCacheSize: {
                type: Number,
                default: 5,
            },
            checkboxHandler: {
                type: Function,
                default: () => function checkboxHandler() {},
            },
            hasCheckbox: {
                type: String,
                default: () => 'false',
            },
            selectKey: {
                type: String,
                default: () => 'false',
            },
            loading: {
                type: Boolean,
                default: () => true,
            },
            pageShow: {
                type: Boolean,
                default: () => true,
            },
            searchFormHidden: {
                type: Boolean,
                default: () => false,
            }
        },
        data() {
            return {
                currentPageIndex: 1,
                queryCondition: {
                    paging: {
                        pageSize: 10,
                        pageIndex: 1,
                    },
                    condition: {},
                },
                cachedList: {},
                currentList: [],
                selectedList: [],
                activeRowId: '',
                shown: false,
            };
        },
        components: {
            [Table.name]: Table,
            [Button.name]: Button,
            [Pagination.name]: Pagination,
            [Form.name]: Form,
            [Input.name]: Input,
            [Select.name]: Select,
            [DatePicker.name]: DatePicker,
        },
        watch: {
            originData() {
                this.setCacheList();
                this.setCurrentList();
            },
        },
        methods: {
            emitOperationEvent(eventType, args) {
                this.$emit(`operation-${eventType}`, args);
            },
            setCacheList() {
                const pageIndex = this.currentPageIndex;
                this.cachedList[`page_${pageIndex}`] = this.originData;
                const existedPage = Object.keys(this.cachedList);
                if (existedPage.length > Number(this.maxCacheSize)) {
                    delete this.cachedList[existedPage[0]];
                }
            },
            setCurrentList() {
                this.currentList = this.cachedList[`page_${this.currentPageIndex}`];
            },
            handleSizeChange(val) {
                this.queryCondition.paging.pageSize = val;
                this.queryCondition.paging.pageIndex = 1;
                this.$emit('getData', this.queryCondition);
            },
            handleCurrentChange(index) {
                this.currentPageIndex = index;
                if (this.cachedList[`page_${index}`]) {
                    this.setCurrentList();
                    return;
                }
                this.queryCondition.paging.pageIndex = index;
                this.$emit('getData', this.queryCondition);
            },
            queryHandler() {
                this.cachedList = {};
                this.queryCondition.paging.pageIndex = 1;
                this.queryCondition.condition = this.form;
                this.$emit('getData', this.queryCondition);
            },
            cellClickHandler(row, column, cell) {
                this.$emit('cellClick', row, column, cell);
                if (column.label === '是否必须') {
                    this.$set(this, 'activeRowId', row.id);
                }
            },
            currentChangeHandler(val) {
                this.$emit('currentChange', val);
            },
            handleSelectionChange(selectedItems) {
                this.$set(this, 'selectedList', selectedItems);
                this.checkboxHandler(selectedItems);
            },
            getSelectedList() {
            },
            // 为 Table 中的某一行添加 class
            tableRowClassName(row, index) {
                this.$emit('tableRowClassName', { row, index });
            },
            handleOptionChange(selectedOption) {
                const selectionKey = this.selectKey;
                const newSelectedList = this.selectedList.map((item) => {
                    if (item.id === this.activeRowId) {
                        return {
                            ...item,
                            [selectionKey]: selectedOption,
                        };
                    }
                    return item;
                });
                this.$set(this, 'selectedList', newSelectedList);
            }
        },
    };
</script>

<style lang="less" scoped>
.list-wrap{
    .shown-btn {
        padding: 10px 0;
        box-sizing: border-box;
        border-top: 1px solid #cdcdcd;
    }
    .handler-toolbar {
        margin-bottom: 20px;
    }
    .list{
        // border-top: 1px solid #cdcdcd;
        // padding-top: 10px;
        .content{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        td a {
            display: block;
            color: #20a0ff;
        }
        .el-table {
            min-height: 0;
        }
    }
}
</style>
