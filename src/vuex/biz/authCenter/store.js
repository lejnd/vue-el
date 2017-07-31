import Vue from 'vue';
import actions from './actions';
import getters from './getters';
import menus from '../../../menus.json';
import {
    SET_AUTHORITIES,
    SET_TOKEN,
    SET_USERINFO,
    CLERN_TOKEN,
    CLERN_USERINFO,
    SET_PUBLIC_KEY,
} from '../../mutation-types';

const initState = {
    authorities: [],
    token: '',
    userName: '',
    userDisplayName: '',
    menus,
    publicData: {
        publicKey: '',
        rsaId: '',
    },
};

const mutations = {
    [SET_AUTHORITIES](state, data) {
        Vue.set(state, 'authorities', data);
    },
    [SET_TOKEN](state, data) {
        Vue.set(state, 'token', data);
    },
    [SET_USERINFO](state, data) {
        Vue.set(state, 'userName', data.userName);
        Vue.set(state, 'userDisplayName', data.userDisplayName);
    },
    [CLERN_TOKEN](state) {
        Vue.set(state, 'token', initState.token);
    },
    [CLERN_USERINFO](state) {
        Vue.set(state, 'userName', initState.userName);
        Vue.set(state, 'userDisplayName', initState.userDisplayName);
    },
    [SET_PUBLIC_KEY](state, data) {
        Vue.set(state, 'publicData', data);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
