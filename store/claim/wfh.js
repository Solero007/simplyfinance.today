import { getField, updateField } from 'vuex-map-fields';
const getDefaultState = () => {
    return {
        isSameCompany: false,
        claims: [
            {
                meta: {
                    label: 'Enter the name of the company you worked for in the tax year 2021/2022',
                    placeholder: '',
                    name: 'Company name 2021/2022',
                    description: '6th April 2021 to 5th April 2022',
                    show: true,
                    period: '2021/2022',
                },
                period: 'p_2021_2022',
                selfEmployed: false,
                name: null,
                hasWorked: true,
            },
            {
                meta: {
                    label: 'Enter the name of the company you worked for in the tax year 2020/2021',
                    placeholder: '',
                    name: 'Company name 2020/2021',
                    description: '6th April 2020 to 5th April 2021',
                    show: true,
                    period: '2020/2021',
                },
                period: 'p_2020_2021',
                selfEmployed: false,
                name: null,
                hasWorked: true,
            },
        ],
    };
};

export default {
    namespaced: true,
    state: () => getDefaultState(),

    mutations: {
        updateField,
        setIsSameCompany(state, bool) {
            const companies = state.claims.filter((x) => state.claims.indexOf(x) > 0);
            for (let item of companies) {
                item.meta.show = !bool;
                if (bool) {
                    item.name = state.claims[0].name;
                } else {
                    item.name = '';
                }
            }
        },
    },
    getters: {
        getField,
    },
    actions: {
        async submitClaim({ rootState }) {},
        setIsSameCompany({ state, commit }, bool) {
            commit('setIsSameCompany', bool);
        },
    },
};
