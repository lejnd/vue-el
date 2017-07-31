import Vue from 'vue';
import Vuex from 'vuex';

import breadcrumbsStore from './biz/breadcrumbs/store';
import authCenterStore from './biz/authCenter/store';
import agentsStore from './biz/agents/store';
import uploadStore from './biz/upload/store';
import regionStore from './common/region/store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        breadcrumbs: breadcrumbsStore,
        authCenter: authCenterStore,
        region: regionStore,
        agents: agentsStore,
        upload: uploadStore,
    },
    strict: process.env.NODE_ENV !== 'production',
});
