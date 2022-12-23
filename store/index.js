const getDefaultState = () => {
    return {
        headers: [],
        ip: null,
        userAgent: null,
        referer: null,
    };
};

export default {
    namespaced: true,
    state: () => getDefaultState(),

    mutations: {
        /**
         * Set Headers
         * @param {*} state
         * @param {*} headers
         */
        addHeaders(state, headers) {
            for (const k in headers) {
                state.headers.push({ name: k, value: headers[k] });
            }
        },
        /**
         * Set IP Address
         * @param {*} state
         * @param {*} ip
         */
        addIp(state, ip) {
            state.ip = ip;
        },

        addUserAgent(state, userAgent) {
            state.userAgent = userAgent;
        },

        addReferer(state, referer) {
            state.referer = referer;
        },
    },

    actions: {
        /**
         * Get Headers
         * @param {*} param0
         * @param {*} name
         * @returns
         */
        getHeader({ state }, name) {
            const header = state.headers.find((x) => x.name == name);
            return header ? header.value : '';
        },
        /**
         * Get user headers and IP
         * @param {*} param0
         * @param {*} param1
         */
        nuxtServerInit({ commit }, { req }) {
            if (req.headers) {
                commit('addHeaders', req.headers);
            }
            commit('addIp', req.headers['do-connecting-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress || '0.0.0.0');
            commit('addUserAgent', req.headers['user-agent'] || '');
            commit('addReferer', req.headers['referer'] || '');
        },
    },

    getters: {
        ip: (state) => state.ip,
        userAgent: (state) => {
            return;
        },
        headers: (state) => state.headers,
    },
};
