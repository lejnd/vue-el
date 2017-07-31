import regionService from '../../../services/regionService';

import {
    SET_REGION_LIST,
} from '../../mutation-types';

const getRegionList = ({
    commit,
}) => new Promise((resolve, reject) => {
    regionService.getRegion().then(({
        code,
        data,
        msg,
    }) => {
        if (code === '0') {
            commit(SET_REGION_LIST, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

export default {
    getRegionList,
};
