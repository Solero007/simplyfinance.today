<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <div v-if="$fetchState.pending">
            <section class="bg-black relative">
                <div class="container text-center py-12 relative z-0 text-white">
                    <div class="flex justify-center">
                        <div class="w-full sm:max-w-4xl lg:max-w-5xl">
                            <div class="space-y-3 sm:space-y-4">
                                <div class="space-y-4 sm:space-y-2">
                                    <div class="space-y-4">
                                        <p class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">Finding Application</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-else-if="!$fetchState.pending && isValid">
            <section class="bg-black/90 text-white py-2 md:py-2 text-center">
                <div class="container">
                    <div class="text-xs sm:text-base md:text-lg leading-tight md:leading-normal font-semibold flex gap-3 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <p>
                            <span v-show="data.client?.firstName" class="capitalize inline" v-html="`${data.client?.firstName},` || ''" />unfortunately your loan application has not been successful.
                        </p>
                    </div>
                </div>
            </section>
            <section class="bg-black relative">
                <!-- <div class="absolute inset-0 -z-0 after:bg-black after:absolute after:inset-0 after:opacity-70 after:sm:opacity-0">
                <img src="https://theaccountancycloud.com/assets/images/sos-header-bg.webp" class="object-center object-cover w-full h-full" alt="" />
            </div> -->
                <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                    <div class="flex justify-center">
                        <div class="w-full sm:max-w-4xl lg:max-w-5xl">
                            <div class="space-y-3 sm:space-y-4">
                                <img src="https://workfromhometaxrelief.co.uk/duke/assets/images/logo.png" class="w-[130px] mx-auto" alt="" />
                                <div class="space-y-4 sm:space-y-2">
                                    <div class="space-y-1">
                                        <p class="text-xl sm:text-3xl font-normal text-accent-300"><span class="capitalize" v-html="data.client.firstName" />, good news.</p>
                                        <p class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">
                                            We have identified you can claim a tax rebate up to £{{ claimTotal }}.
                                        </p>
                                    </div>
                                    <div class="space-y-1 text-xs sm:text-base">
                                        <p class="font-semibold">To start your rebate with {{ data.company.name }}, simply confirm the details below.</p>
                                        <p>We aim to settle and pay out your rebate within 21 days*.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div class="md:container">
                    <div class="flex justify-center items-center space-y-5 flex-col">
                        <div class="card-form">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Uniform Rebate</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-form">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Travel Allowance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div v-else>
            <section class="bg-black relative">
                <div class="container text-center py-12 relative z-0 text-white">
                    <div class="flex justify-center">
                        <div class="w-full sm:max-w-4xl lg:max-w-5xl">
                            <div class="space-y-3 sm:space-y-4">
                                <div class="space-y-4 sm:space-y-2">
                                    <div class="space-y-4">
                                        <span class="mx-auto">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-28 h-28 mx-auto text-rose-300">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </span>
                                        <p class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">Sorry, we could not find your application</p>
                                        <nuxt-link to="/offers/alt" class="bg-white rounded-lg py-4 text-lg font-semibold inline-block px-10 text-black">View More Offers</nuxt-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    name: 'IndexPage',
    async fetch() {
        const { id } = this.$route.params;
        const result = await this.$store.dispatch('client/getCompanyDetails', id);
        switch (result.status) {
            case 200:
                this.data = result.data;
                break;
            default:
                this.isValid = false;
        }
    },
    computed: {
        ...mapFields('client', ['details.terms', 'details.privacy']),
        ...mapFields('claim/wfh', ['isSameCompany']),
        ...mapMultiRowFields('claim/wfh', ['claims']),
        periodCount: function () {
            return this.claims.filter((x) => {
                return x.hasWorked;
            }).length;
        },
        claimTotal: function () {
            return this.periodCount * this.basePrice;
        },
    },
    data() {
        return {
            basePrice: 312,
            data: {},
            isValid: true,
        };
    },
    watch: {},
    methods: {
        async submit() {},
    },
};
</script>
