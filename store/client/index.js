import { getField, updateField } from 'vuex-map-fields';

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const defaultAddress = {
    building_name: '',
    building_number: '',
    thoughfare: '',
    town_or_city: '',
    county: '',
    locality: '',
    district: '',
    line_1: '',
    line_2: '',
    line_3: '',
    line_4: '',
    country: '',
    postcode: '',
    isCurrent: false,
};

const getDefaultState = () => {
    const now = new Date();
    return {
        externalId: null,
        stateSet: false,
        stateAddress: false,
        params: {
            goalId: 6,
            offerId: 6,
            clickId: null,
        },
        header: {
            ip: null,
            userAgent: null,
            referer: null,
        },
        details: {
            title: null,
            firstName: null,
            lastName: null,
            email: null,
            mobile: null,
            dobDay: now.getDate(),
            dobMonth: now.getMonth() + 1,
            dobYear: now.getFullYear() - 18,
            dob: null,
            signatureUrl: null,
            selfEmployed: false,
            industry: null,
            nationalInsurance: null,
            terms: false,
            privacy: false,
        },
        address: [],
    };
};

export default {
    namespaced: true,
    state: () => getDefaultState(),

    mutations: {
        updateField,
        setState(state) {
            state.stateSet = true;
        },
        setStateAddress(state, bool) {
            state.stateAddress = bool || false;
        },
        setParams(state, params) {
            Object.assign(state.params, params);
        },
        setHeader(state, header) {
            Object.assign(state.header, header);
        },
        setAddress(state, data) {
            state.address.push(data);
            state.stateAddress = true;
        },
        setDetails(state, data) {
            console.log(data);
            Object.assign(state.details, data);
        },
    },
    getters: {
        getField,
    },
    actions: {
        async init({ rootState, state, commit }, params) {
            if (!state.stateSet && process.client) {
                commit('setState');
                commit('setParams', {
                    goalId: params?.goalId || state.params.goalId,
                    offerId: params?.offerId || state.params.offerId,
                    clickId: params?.clickId || state.params.clickId,
                });
                commit('setHeader', {
                    ip: rootState.ip,
                    userAgent: rootState.userAgent,
                    referer: rootState.referer,
                });
                commit('setDetails', {
                    title: params?.title || '',
                    firstName: params?.firstName || '',
                    lastName: params?.lastName || '',
                    email: params?.email || '',
                    mobile: params?.mobile || '',
                    dob: params?.dob || '',
                });
                if (params?.postcode) {
                    commit('setAddress', {
                        building_name: params?.building_name || '',
                        building_number: params?.building_number || '',
                        thoughfare: params?.thoughfare || '',
                        town_or_city: params?.town_or_city || '',
                        county: params?.county || '',
                        locality: params?.locality || '',
                        district: params?.district || '',
                        line_1: params?.line_1 || '',
                        line_2: params?.line_2 || '',
                        line_3: params?.line_3 || '',
                        line_4: params?.line_4 || '',
                        country: 'United Kingdom',
                        postcode: params?.postcode || '',
                        isCurrent: true,
                    });
                    commit('setStateAddress', true);
                } else {
                    commit('setStateAddress', false);
                }
            }
        },

        async submitClient({ rootState, state, commit }) {
            let result;

            const dob = '1982-02-05';

            const payload = {
                header: {
                    affId: '',
                },
                title: state.details.title.toLowerCase(),
                firstName: state.details.firstName,
                lastName: state.details.lastName,
                email: state.details.email,
                mobile: state.details.mobile,
                nationalInsurance: state.nationalInsurance,
                ip: state.header.ip,
                userAgent: state.header.userAgent,
                nationalInsurance: state.details.nationalInsurance,
                dob,
                selfEmployed: state.details.selfEmployed,
                industry: '',
                terms: true,
                privacy: true,
                addresses: [...state.address],
            };

            try {
                result = await this.$api.post(this.$config.TAX_API_URL + '/clients', payload);
            } catch (error) {
                console.log(error);
                return error.response;
            }

            return result;
        },
        async submitSignature({ rootState, state, commit }) {},
        async getClient({ rootState, state, commit }) {},
        async doNotPost({ state, commit }) {},
        async getCompanyDetails({ commit, state }, id = null) {
            if (!id) {
                return {
                    status: 404,
                    data: {},
                };
            }

            try {
                return await this.$api.get(this.$config.TAX_API_URL + `/company/${id}`, {});
            } catch (error) {
                return error.response;
            }
        },
    },
};
