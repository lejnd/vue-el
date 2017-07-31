import backstageUsers from '../../../services/backstageUsersService';
import {
    SET_AUTHORITIES,
    SET_TOKEN,
    SET_USERINFO,
    CLERN_TOKEN,
    CLERN_USERINFO,
    SET_PUBLIC_KEY,
} from '../../mutation-types';

const getAuthorities = ({ commit }) => new Promise((resolve, reject) => {
    backstageUsers.getAuthorities().then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_AUTHORITIES, data.permissionKeyList);
            resolve(data.permissionKeyList);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getPublicData = ({ commit }) => new Promise((resolve, reject) => {
    backstageUsers.getPublicData().then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_PUBLIC_KEY, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const login = ({ commit }, {
    userName,
    password,
    keepLogin,
    rsaId,
}) => new Promise((resolve, reject) => {
    backstageUsers.login({ userName, password, keepLogin, rsaId }).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_TOKEN, data.token);
            commit(SET_USERINFO, data.userInfo);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const signOut = ({ commit }) => {
    localStorage.removeItem('token');    // eslint-disable-line no-undef
    localStorage.removeItem('userDisplayName');    // eslint-disable-line no-undef
    sessionStorage.removeItem('token');    // eslint-disable-line no-undef
    sessionStorage.removeItem('userName');    // eslint-disable-line no-undef
    sessionStorage.removeItem('userDisplayName');    // eslint-disable-line no-undef
    commit(CLERN_TOKEN);
    commit(CLERN_USERINFO);
};

export default {
    getAuthorities,
    login,
    signOut,
    getPublicData,
};
