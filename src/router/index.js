import Vue from 'vue'
import Router from 'vue-router'

// components
import Layout from '../pages/layout';
import Login from '../pages/login';
import Index from '../pages/index';
import ErrorPage from '../pages/error';
import AgentList from '../pages/agents/agent-list';
import AgentDetail from '../pages/agents/agent-detail';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            redirect: 'index',
            component: Layout,
            meta: {
                // requiresAuth: true,
                keepAlive: false,
            },
            children: [
                {
                    path: '/index',
                    component: Index,
                },
                {
                    path: 'agents',
                    component: AgentList,
                    meta: {
                        breadcrumbs: [{
                            name: '查看代办员',
                        }],
                        keepAlive: false,
                    }
                },
                {
                    path: 'agents/:id',
                    component: AgentDetail,
                    meta: {
                        breadcrumbs: [{
                            name: '查看代办员',
                            to: '/agents',
                        }, {
                            name: '代办员详情',
                        }],
                        keepAlive: false,
                    }
                },
                {
                    path: '/error/:num',
                    component: ErrorPage,
                    meta: {
                        breadcrumbs: [{
                            name: '错误页面',
                        }],
                        keepAlive: false,
                    }
                }
            ]
        }
    ],
    mode: 'history'
});

// authorization verify
router.beforeEach((to, from, next) => {
    if (to.fullPath === '/') {
        next({
            path: '/index',
        });
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        const sessionToken = localStorage.getItem('token') || sessionStorage.getItem('token');    // eslint-disable-line no-undef
        if (!sessionToken) {
            next({
                path: '/login',
                query: { redirect: to.fullPath },
            });
        } else {
            next();
        }
        next();
    } else {
        next();
    }
});

export default router;
