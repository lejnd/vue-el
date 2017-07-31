<template lang="html">
    <div id="agent_detail">
        <h1 class="title">代办员个人信息</h1>
        <el-form ref="agent-form" :model="form" label-width="120px">
            <el-form-item label="姓名：">
                {{form.agentName}}
            </el-form-item>
            <el-form-item label="州/市：">
                {{form.cityName}}
            </el-form-item>
            <el-form-item label="县/区：">
                {{form.districtName}}
            </el-form-item>
            <el-form-item label="乡/镇：">
                {{form.townName}}
            </el-form-item>
            <el-form-item label="社区/村：">
                {{form.villageName}}
            </el-form-item>
            <el-form-item label="服务站名称：">
                {{form.station}}
            </el-form-item>
            <el-form-item label="站点编号：">
                {{form.stationCode}}
            </el-form-item>
            <el-form-item label="服务站地址：">
                {{form.stationAddress}}
            </el-form-item>
            <el-form-item label="所属公司：">
                {{form.companyName}}
            </el-form-item>
            <el-form-item label="合作模式：">
                {{form.workModel}}
            </el-form-item>
            <el-form-item label="联系电话：">
                {{form.agentPhone}}
            </el-form-item>
            <el-form-item label="入职日期：">
                {{form.entryTime}}
            </el-form-item>
            <el-form-item label="离职日期：" v-if="form.dismissTime">
                {{form.dismissTime}}
            </el-form-item>
            <el-form-item label="身份证号：">
                {{form.idCard}}
            </el-form-item>
            <el-form-item label="银行卡号：">
                {{form.bankCard}}
            </el-form-item>
            <el-form-item label="银行行号：">
                {{form.bankNo}}
            </el-form-item>
            <el-form-item label="开户银行：">
                {{form.bankName}}
            </el-form-item>
            <el-form-item label="状态：">
                {{form.agentState}}
            </el-form-item>
            <el-form-item label="备注：">
                {{form.remark}}
            </el-form-item>
            <el-form-item label="离职原因：" v-if="form.dismissReason">
                {{form.dismissReason}}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import BaseComponent from '../base';

export default {
    extends: BaseComponent,
    computed: {
        ...mapGetters([
            'agentDetail',
        ]),
        form() {
            return this.formatForm();
        },
    },
    methods: {
        ...mapActions([
            'getAgentDetail',
        ]),
        formatForm() {
            return this.agentDetail.region ? Object.assign({}, this.agentDetail, {
                region: `${this.agentDetail.region.city.name}` +
                `${this.agentDetail.region.district.name}` +
                `${this.agentDetail.region.town.name}`,
                AgentState: this.agentDetail.agentState ? '在职' : '离职',
            }) : this.agentDetail;
        },
    },
    mounted() {
        this.getAgentDetail(parseInt(this.$route.params.id, 10));
    },
};
</script>

<style lang="less">
#agent_detail {
    color: #8492A6;
    .title {
        height: 40px;
        line-height: 40px;
        margin: 0 15px 15px 15px;
        border-bottom: 1px solid #EFF2F7;
        font-size: 18px;
        color: #8492A6;
        font-weight: normal;
    }
    .el-form-item__label {
        text-align: left;
        margin-left: 15px;
    }
}
</style>
