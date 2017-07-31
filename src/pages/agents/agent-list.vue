<template lang="html">
    <div id="agent_list">
        <gz-list
            ref="agentList"
            :loading="loading"
            @getData="getListHanlder"
            :form="form"
            :colNameMap="colNameMap"
            :originPaging="agentList.paging"
            :originData="viewData"
            :maxCacheSize="5"
            :operation="operation"
            :pageShow="pageShow"
            @operation-click="clickToCheck"
            :searchFormHidden="true"
            >
            <el-form label-position="left" label-width="100px" slot="searchForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="所属地区：">
                            <el-cascader
                                v-model="form.region"
                                placeholder="选择地区"
                                :options="regionTree"
                                change-on-select
                                clearable>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="服务站名称：">
                            <el-input v-model="form.station" placeholder="服务站名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="站点编号：">
                            <el-input v-model="form.stationCode" placeholder="站点编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名：">
                            <el-input v-model="form.agentName" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="合作模式：">
                            <el-select v-model="form.workModel" placeholder="全部模式">
                                <el-option
                                    v-for="item in optionswm"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态：">
                            <el-select v-model="form.agentState" placeholder="所有状cc态">
                                <el-option
                                    v-for="item in optionsas"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-form label-position="left" label-width="100px" slot="searchFormHidden">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号：">
                            <el-input v-model="form.idCard" placeholder="身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话：">
                            <el-input v-model="form.agentsPhone" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属公司：">
                            <el-input v-model="form.companyName" placeholder="所属公司"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="入职时间从：">
                            <el-date-picker
                                v-model="form.entryTime"
                                type="date"
                                placeholder="选择日期时间"
                                :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="到：">
                            <el-date-picker
                                v-model="form.entryTimeTo"
                                type="date"
                                placeholder="选择日期时间"
                                :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="handlerToolbar" class="handler-toolbar-inner">
                <el-button type="primary" @click="$refs.agentList.queryHandler()">查询</el-button>
                <el-button type="primary" @click="exportHandler" :loading="exportLoading">导出</el-button>
                <a ref="downloadDOM" :href="downloadUrl" download="代办员明细" v-show></a>
            </div>
        </gz-list>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import List from '../../components/biz/list';
import listMethodBase from '../../components/biz/listMethodBase';
import BaseComponent from '../base';
import Auth from '../auth';
import StaticString from '../../strings';

const colNameMap = [
    {
        displayName: '操作',
        type: 'button',
        width: 80,
        fixed: true,
    }, {
        key: 'agentName',
        displayName: '姓名',
        fixed: true,
        width: 110,
    }, {
        key: 'cityName',
        displayName: '州/市',
        ellipsis: true,
        width: 90,
    }, {
        key: 'districtName',
        displayName: '区/县',
        ellipsis: true,
        width: 90,
    }, {
        key: 'townName',
        displayName: '乡/镇',
        ellipsis: true,
        width: 90,
    }, {
        key: 'villageName',
        displayName: '社区/村',
        ellipsis: true,
        width: 100,
    }, {
        key: 'station',
        displayName: '服务站名称',
        ellipsis: true,
        width: 180,
    }, {
        key: 'stationCode',
        displayName: '站点编号',
        width: 120,
    }, {
        key: 'stationAddress',
        displayName: '服务站地址',
        ellipsis: true,
        width: 160,
    }, {
        key: 'companyName',
        displayName: '所属公司',
        ellipsis: true,
        width: 150,
    }, {
        key: 'workModel',
        displayName: '合作模式',
        width: 100,
    }, {
        key: 'agentPhone',
        displayName: '联系电话',
        width: 150,
    }, {
        key: 'entryTime',
        displayName: '入职日期',
        width: 180,
    }, {
        key: 'dismissTime',
        displayName: '离职日期',
        width: 180,
    }, {
        key: 'idCard',
        displayName: '身份证号',
        width: 200,
    }, {
        key: 'bankCard',
        displayName: '银行卡号',
        width: 200,
    }, {
        key: 'bankNo',
        displayName: '银行行号',
        width: 150,
    }, {
        key: 'bankName',
        displayName: '开户银行',
        ellipsis: true,
        width: 150,
    }, {
        key: 'agentState',
        displayName: '状态',
        width: 90,
    }
];

const operation = [{
    text: '查看',
}];

export default {
    extends: BaseComponent,
    mixins: [Auth],
    data() {
        return {
            optionswm: [
                {
                    value: 0,
                    label: '全部模式'
                }, {
                    value: 3,
                    label: '代办员'
                }, {
                    value: 4,
                    label: '合伙人'
                }
            ],
            optionsas: [
                {
                    value: null,
                    label: '所有状态'
                }, {
                    value: 50,
                    label: '在职'
                }, {
                    value: -1,
                    label: '离职'
                }
            ],
            colNameMap,
            operation,
            form: {
                region: [],
                agentState: null,
                stationCode: '',
                agentName: '',
                companyName: '',
                agentsPhone: '',
                idCard: '',
                station: '',
                workModel: 0,
                entryTime: '',
                entryTimeTo: '',
            },
            downloadUrl: '',
            loading: true,
            exportLoading: false,
            thisCondition: {},
            pageShow: true,
            shown: false,
        };
    },
    computed: {
        ...mapGetters([
            'agentList',
            'regionList',
            'agentsKey',
        ]),
        viewData() {
            return this.formatViewData();
        },
        regionTree() {
            return listMethodBase.createTree(this.regionList);
        },
    },
    methods: {
        ...mapActions([
            'getAgentList',
            'getRegionList',
            'getAgentsExportKey',
        ]),
        getListHanlder(queryCondition) {
            const thisCondition = Object.assign({}, queryCondition.condition, {
                region: {
                    cityCode: this.form.region[0] || '',
                    districtCode: this.form.region[1] || '',
                    townCode: this.form.region[2] || '',
                    villageCode: this.form.region[3] || '',
                },
                entryTime: listMethodBase.formatTime(this.form.entryTime) || '',
                entryTimeTo: listMethodBase.formatTime(this.form.entryTimeTo) || '',
            });

            if (listMethodBase.isTimeError(thisCondition.entryTime, thisCondition.entryTimeTo)) return;

            this.loading = true;
            this.pageShow = false;
            this.getAgentList({
                paging: queryCondition.paging,
                condition: thisCondition,
            })
            .then(() => {
                this.loading = false;
                this.pageShow = true;
                this.$set(this, 'thisCondition', thisCondition);
            });
        },
        formatViewData() {
            return this.agentList.itemList.map((item) => {
                const targetItem = Object.assign({}, item, {
                    region: `${item.region.city.name || ''}${item.region.district.name || ''}${item.region.town.name || ''}`,
                    agentState: item.agentState === 50 ? '在职' : '离职',
                    workModel: item.workModel,
                });
                return targetItem;
            });
        },
        // agentStateToNum() {
        //     this.$set(this.form, 'agentState', parseInt(this.form.agentState, 10));
        // },
        clickToCheck(args) {
            this.$router.push(`/agents/${args[1].agentId}`);
        },
        exportHandler() {
            this.exportLoading = true;
            this.getAgentsExportKey(this.thisCondition)
            .then(() => {
                this.downloadUrl = `${StaticString.url}/common/export-excel?key=${this.agentsKey}`;
            })
            .then(() => {
                this.$refs.downloadDOM.click();
                this.exportLoading = false;
            })
            .catch((err) => {
                this.exportLoading = false;
                this.$notify({
                    message: err.msg || err,
                    type: 'warning',
                });
            });
        },
    },
    components: {
        [List.name]: List,
    },
    mounted() {
        this.$refs.agentList.queryHandler();
        this.getRegionList();
    },
};
</script>

<style lang="less">
#agent_list {
    .el-cascader {
        width: 100%;
    }
    .el-select {
        width: 100%;
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .el-icon-circle-close {
        z-index: 1000;
    }
}
</style>
