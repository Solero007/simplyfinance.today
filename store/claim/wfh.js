import { getField, updateField } from 'vuex-map-fields';
const getDefaultState = () => {
    return {
        isSameCompany: false,
        claims: [
            {
                meta: {
                    label: 'Enter the name of the company you worked for in the tax year 2021/2022',
                    placeholder: 'e.g. NHS',
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
                    placeholder: 'e.g. NHS',
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
        updateSelfEmployedStatus(state, bool = false) {
            for (let claim of state.claims) {
                claim.selfEmployed = bool;
            }
        },
    },
    getters: {
        getField,
    },
    actions: {
        async submitClaim({ rootState, state, commit }, externalId) {
            if (!externalId) {
                return {
                    status: 404,
                    msg: `No Id ${externalId}`,
                };
            }

            let client = rootState.client;

            commit('updateSelfEmployedStatus', client.details.selfEmployed);

            let result;
            let payload = {
                externalId,
                claims: state.claims,
            };

            try {
                result = await this.$api.post(this.$config.TAX_API_URL + `/client/wfh`, payload);
            } catch (error) {
                console.log(error);
                return error.response;
            }

            return result;
        },
        setIsSameCompany({ state, commit }, bool) {
            commit('setIsSameCompany', bool);
        },
    },
};
