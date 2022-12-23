import { getField, updateField } from 'vuex-map-fields';
const getDefaultState = () => {
    return {
        claims: [
            {
                period: 'p_2018_2019',
                name: '',
                industry: '',
                jobTitle: '',
            },
        ],
    };
};

export default {
    namespaced: true,
    state: () => getDefaultState(),

    mutations: {
        updateField,
    },
    getters: {
        getField,
    },
    actions: {
        async submitClaim({ rootState }) {},
    },
};
