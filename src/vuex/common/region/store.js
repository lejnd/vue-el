import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_REGION_LIST,
} from '../../mutation-types';

const initState = {
    regionList: [],
};

const mutations = {
    [SET_REGION_LIST](state, data) {
        Vue.set(state, 'regionList', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
