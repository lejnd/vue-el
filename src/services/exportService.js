import Vue from 'vue';

const getAgentsExportKey = condition => Vue.axios.post('/agents/export', condition);
const getWagesExportKey = condition => Vue.axios.post('/wages/export', condition);
const getTurnoversKey = condition => Vue.axios.post('/turnovers/export', condition);
const getPaymentsCardKey = condition => Vue.axios.post('/cards/bill/search-export', condition);
const getPaymentsKey = condition => Vue.axios.post('/payments/EPexport', condition);
const getCardsTurnoversKey = condition => Vue.axios.post('/cards/turnovers/search-export', condition);
const getCardsReconciliationKey = condition => Vue.axios.post('/cards/reconciliation/search-export', condition);
const getPaymentsReconciliationKey = condition => Vue.axios.post('/payments/reconciliation/search-export', condition);
const companyExport = data => Vue.axios.post('/company/search-export', data);
const getSaleTurnoverKey = data => Vue.axios.post('/turnovers/statistics/sale-export', data);

export default {
    getAgentsExportKey,
    getWagesExportKey,
    getTurnoversKey,
    getPaymentsCardKey,
    getPaymentsKey,
    getCardsTurnoversKey,
    getCardsReconciliationKey,
    getPaymentsReconciliationKey,
    companyExport,
    getSaleTurnoverKey,
};
