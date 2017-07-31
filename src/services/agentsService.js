import Vue from 'vue';

const searchAgents = ({ paging, condition }) => Vue.axios.post('/agents/search', { paging, condition });
const getAgentDetail = agentId => Vue.axios.get(`/agents/${agentId}`);

export default {
    searchAgents,
    getAgentDetail,
};
