import Vue from 'vue';
import actions from './actions';
import getters from './getters';

import {
    SET_AGENT_LIST,
    SET_AGENT_DETAIL,
} from '../../mutation-types';

const initState = {
    agentList: {
        paging: {},
        itemList: [],
    },
    agentDetail: {},
};

// const replaceTime = (time) => {
//     if (time) {
//         return time.replace(/T/, ' ');
//     }
//     return null;
// };

const mutations = {
    [SET_AGENT_LIST](state, data) {
        const newData = data.itemList.map((item) => {
            const newItem = Object.assign(item);
            if (newItem.region) {
                newItem.cityName = newItem.region.city.name;
                newItem.districtName = newItem.region.district.name;
                newItem.townName = newItem.region.town.name;
                newItem.villageName = newItem.region.village.name;
            }
            return newItem;
        });
        Vue.set(state.agentList, 'paging', data.paging);
        Vue.set(state.agentList, 'itemList', newData);
    },
    [SET_AGENT_DETAIL](state, data) {
        const newData = Object.assign(data);
        if (newData.region) {
            newData.cityName = newData.region.city.name;
            newData.districtName = newData.region.district.name;
            newData.townName = newData.region.town.name;
            newData.villageName = newData.region.village.name;
        }
        Vue.set(state, 'agentDetail', newData);
    },
};

export default {
    state: initState,
    mutations,
    actions,
    getters,
};
