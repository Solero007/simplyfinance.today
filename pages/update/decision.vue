<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-black/90 text-white py-2 md:py-2 text-center">
            <div class="container">
                <div class="text-xs sm:text-base md:text-lg leading-tight md:leading-normal font-semibold flex gap-3 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p><span v-show="details.firstName" class="capitalize inline" v-html="`${details?.firstName},` || ''" />unfortunately your loan application has not been successful.</p>
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
                                    <p class="text-xl sm:text-3xl font-normal text-accent-300"><span class="capitalize" v-html="details.firstName" />, good news.</p>
                                    <p class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">
                                        You could be eligible for tax rebate of upto £624 if you've had to work at least 1 day from home since April 2020.
                                    </p>
                                </div>
                                <div class="space-y-1 text-xs sm:text-base">
                                    <p class="font-semibold">To start your rebate simply confirm the details below.</p>
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
                                <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Further Details</p>
                            </div>
                            <div>
                                <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                            </div>
                        </div>
                        <FormsWfh @complete="complete" />
                    </div>
                    <div class="container flex justify-center">
                        <div class="text-center text-black/90 text-sm leading-tight md:max-w-2xl">
                            <p>By clicking "Get Decision" you agree to be contacted by Get A Loan Today via SMS in relation to loan and claim products</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    name: 'IndexPage',
    computed: {
        ...mapFields('client', ['details', 'details.nationalInsurance', 'details.selfEmployed']),
        ...mapFields('claim/wfh', ['isSameCompany']),
        ...mapMultiRowFields('claim/wfh', ['claims']),
    },
    watch: {
        isSameCompany: function (n, o) {
            this.$store.dispatch('claim/wfh/setIsSameCompany', n);
        },
    },
    created() {},
    methods: {
        async complete(result) {
            if (!result) return;
            const data = result.data;

            if (data.selfEmployed) {
                this.$router.push({ name: 'decision-update-id', params: { id: data.id } });
            } else {
                this.$router.push({ name: 'decision-update-id', params: { id: data.id } });
            }
        },
    },
};
</script>
