function pathToCamelCase(path) {
    var parts = path.split('.');

    if (parts.length === 0 || parts[0] === '') {
        return '';
    }

    return parts.map((part) => part[0].toLocaleLowerCase() + part.substring(1)).join('.');
}

export default ({ app, store, $config }, inject) => {
    var axiosInstance = app.$axios;

    var handleResponse = (response) => {
        if (!response) {
            return { status: 0, data: null };
        }

        switch (response.status) {
            case 400: {
                var data = response.data.message ? response.data.message : response.data;
                return { status: response.status, data };
            }
        }

        return { status: response.status, data: response.data };
    };

    var api = {
        get: async function (url, params = null) {
            try {
                // var params = qs.stringify(options);
                // if (options) url += `?${params}`;
                // console.log(url);
              
                var response = await axiosInstance.get(url, { params });
 

                if (response.status === 200) {
                    return { status: response.status, data: response.data };
                }

                return handleResponse(response);
            } catch (err) {
                console.log(err);
                return handleResponse(err.response);
            }
        },
        post: async function (url, payload, config = {}) {
            try {
                var response = await axiosInstance.post(url, { data: { ...payload } }, config);

                if (response.status === 200) {
                    return { status: response.status, data: response.data };
                }

                return handleResponse(response);
            } catch (err) {
                return handleResponse(err.response);
            }
        },
        put: async function (url, payload, options) {
            try {
                var response = await axiosInstance.put(url, { data: { ...payload } }, options);

                if (response.status === 200) {
                    return { status: response.status, data: response.data };
                }

                return handleResponse(response);
            } catch (err) {
                return handleResponse(err.response);
            }
        },
        delete: async function (url, options) {
            try {
                var response = await axiosInstance.delete(url, options);

                if (response.status === 200) {
                    return { status: response.status, data: response.data };
                }

                return handleResponse(response);
            } catch (err) {
                return handleResponse(err.response);
            }
        },
        defaultHandler: async function (response) {
            try {
                switch (response.status) {
                    case 0:
                        // global redirect thing
                        // set err in store
                        // redirect -> /0

                        break;
                    case 401:
                    // return this.$router.push('/401');
                    case 403:
                    // return this.$router.push('/403');
                    case 500:
                        // global redirect thing
                        // set err in store
                        // redirect -> /500

                        /*await this.$store.dispatch("diagnostic/setDiagnostic", {
                          errorUrl: window.location.href,
                          error: result.data
                      });*/
                        console.log(result.data);
                        return this.$router.push('/500');
                    default:
                        // No handler at all
                        // redirect -> /500
                        console.error('No handler');
                        // this.$notify({ type: 'error', text: 'The asd assa das dasd completed', group: 'error' });
                        break;
                }
            } catch (error) {
                this.$bvToast.toast(error, {
                    title: 'BootstrapVue Toast',
                    autoHideDelay: 5000,
                    appendToast: append,
                });
                return error;
            }
        },
    };

    inject('api', api);
};
