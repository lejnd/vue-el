import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import { SET_BREADCRUMBS } from '../../mutation-types';

const initState = {
    breadcrumbs: null,
};

export const mutations = {
    [SET_BREADCRUMBS](state, breadcrumbs) {
        Vue.set(state, 'breadcrumbs', breadcrumbs);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
