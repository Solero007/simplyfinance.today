<template>
    <div>
        <header class="py-3 sm:py-4">
            <div class="container flex justify-between items-center">
                <nuxt-link to="/"> <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.jpg" class="w-[140px] sm:w-[220px] h-auto" alt="" /></nuxt-link>
                <div>
                    <img src="https://www.realityfinance.com/media/1186/blackplusyellow5stars.png" class="w-[70px] sm:w-[100px] h-auto" alt="" />
                </div>
            </div>
        </header>
        <Nuxt />
        <footer class="py-12 text-xs sm:text-base">
            <div class="container text-center space-y-3 sm:space-y-6">
                <p class="font-semibold">
                    © 2022 Get Fast Loans. All rights reserved. Get Fast Loans is a registered trading name of Duke Leads FZCO, which is an Introducer Appointed Representative of T Dot UK Limited,
                    registered under FRN 955804.
                </p>
                <p>
                    T Dot UK Limited are authorised and regulated by the Financial Conduct Authority and are entered on the Financial Services Register under reference number: 688026. Duke Leads FZCO
                    is registered in the United Arab Emirates under licence number 6245 with its registered office located at DSO-IFZA, Dubai Silicon Oasis, Dubai, UAE.
                </p>
            </div>
        </footer>
        <div v-show="showLoader" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-black/75 transition-opacity"></div>

            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <div class="relative transform overflow-hidden rounded-lg bg-white px-9 py-12 md:px-14 md:py-20 text-left shadow-xl transition-all sm:w-full sm:max-w-xl">
                        <div>
                            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <div class="mt-3 text-center sm:mt-5">
                                <h3 class="text-2xl font-bold" id="modal-title">Processing Application</h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">Please note: this may take up to 60 seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        this.$store.dispatch('client/init', { ...this.$route.query });
        this.$nuxt.$on('loader', (state) => {
            this.toggleLoader(state);
        });
    },
    data() {
        return {
            showLoader: false,
        };
    },
    methods: {
        toggleLoader(state) {
            this.showLoader = state || false;
        },
        openLoader() {
            this.showLoader = true;
        },
        hideLoader() {
            this.showLoader = false;
        },
    },
};
</script>
