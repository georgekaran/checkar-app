import { projects as projectsApi } from '../../../main/api';

export const updateCounters = (dispatch, id) => {
    projectsApi.getCounters(id).then((res) => {
        dispatch({
            type: 'UPDATE_COUNTERS',
            payload: res.data
        });
    });
}