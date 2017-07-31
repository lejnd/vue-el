import getters from './getters';

const initState = {
    // imgDomain: process.env.NODE_ENV === 'production' ? '' : 'http://10.66.30.66:8001/',
    imgDomain: 'http://10.66.30.66:8001/',
};

export default {
    state: initState,
    getters,
};
