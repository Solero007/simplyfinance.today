import webpack from 'webpack';
export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'simplefinance.today',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Loans with Simple Finance Today' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    css: ['@/assets/css/main.css'],

    plugins: [
        { src: '@/plugins/vee-validate.js', ssr: false },
        { src: '@/plugins/api.js', ssr: true },
        { src: '@/plugins/vuex-persist.js', ssr: true },
        { src: '@/plugins/filters.js', ssr: true },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ['@nuxt/postcss8'],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: { 
    },

    publicRuntimeConfig: {
        TAX_API_URL: process.env.TAX_API_URL,
    },

    privateRuntimeConfig: {
        TAX_API_URL: process.env.TAX_API_URL,
    },

    html: {
        minify: {
            collapseBooleanAttributes: true,
            decodeEntities: true,
            minifyCSS: true,
            minifyJS: true,
            processConditionalComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            trimCustomFragments: true,
            useShortDoctype: true,
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        extractCSS: true,
        plugins: [
            new webpack.ProvidePlugin({
                qs: 'qs',
            }),
        ],
        postcss: {
            plugins: {
                'postcss-import': {},
                'tailwindcss/nesting': {},
                tailwindcss: {},
                autoprefixer: {},
                ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
            },
            preset: {
                autoprefixer: {
                    grid: true,
                },
            },
        },
    },
    server: {
        port: process.env.PORT || 3005,
        host: '0.0.0.0',
        timing: false,
    },
};
