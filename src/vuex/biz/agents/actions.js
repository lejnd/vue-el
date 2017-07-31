import agentsService from '../../../services/agentsService';
import {
    SET_AGENT_LIST,
    SET_AGENT_DETAIL,
} from '../../mutation-types';

const getAgentList = (
    { commit },
    { paging, condition },
) => new Promise((resolve, reject) => {
    agentsService.searchAgents({ paging, condition }).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_AGENT_LIST, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

const getAgentDetail = ({ commit }, agentId) => new Promise((resolve, reject) => {
    agentsService.getAgentDetail(agentId).then(({
        msg,
        code,
        data,
    }) => {
        if (code === '0') {
            commit(SET_AGENT_DETAIL, data);
            resolve(data);
        } else {
            reject(msg);
        }
    }).catch((error) => {
        reject(error);
    });
});

export default {
    getAgentList,
    getAgentDetail,
};
