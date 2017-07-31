import { SET_BREADCRUMBS } from '../../mutation-types';

const setBreadcrumbs = (
    { commit },
    { breadcrumbs }
) => {
    commit(SET_BREADCRUMBS, breadcrumbs);
};

export default { setBreadcrumbs };
