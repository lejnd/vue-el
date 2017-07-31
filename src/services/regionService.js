import Vue from 'vue';

const getRegion = () => Vue.axios.get('/regions');
export default {
    getRegion,
};
