// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueAxios from 'vue-axios';
import axios from './utilities/custom-axios';
import store from './vuex/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Meta from 'vue-meta';
import * as GlobalDirectives from './directives';

Vue.use(ElementUI);
Vue.use(Meta);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.config.debug = (process.env.NODE_ENV !== 'production');

// axios interceptors
Vue.axios.interceptors.request.use(config => Object.assign({}, config, {
    headers: {
        token: store.getters.token,
    },
}));

Vue.axios.interceptors.response.use((res) => {
    if (res.status === 401) {
        store.dispatch('signOut').then(() => {
            router.replace('/login');
        });
    }
    if (res.status === 403) {
        router.replace('/index');
        return Promise.reject('无权限！');
    }
    if (res.status === 500) {
        return Promise.reject('服务器错误！');
    }
    if (res.status >= 400) {
        return Promise.reject(res.data);
    }
    return res.data;
}, (err) => {
    if (String(err).indexOf('Network Error') !== -1) {
        return Promise.reject('网络错误！');
    }
    return Promise.reject('网络连接超时！');
});

// directives
Object.keys(GlobalDirectives.default).forEach((name) => {
    const config = GlobalDirectives.default[name];
    Vue.directive(config.name, config.directive);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
