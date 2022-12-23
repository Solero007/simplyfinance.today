<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <div v-if="$fetchState.pending">Loading</div>
        <div v-else-if="!$fetchState.pending && isValid">
            <section class="bg-rose-400 text-white py-2 md:py-2 text-center">
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
                                        <p class="text-xl sm:text-3xl font-normal"><span class="capitalize" v-html="data.client.firstName" />, good news.</p>
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
                        <div class="md:max-w-3xl w-full bg-white rounded-3xl relative z-10 -mt-20 pt-3 pb-6 px-6 md:p-12 space-y-4 sm:space-y-5">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Your Tax Relief Quote</p>
                                </div>
                            </div>
                            <Form ref="start" name="start" key="start" v-slot="{ busy }" :submit="submit">
                                <div class="space-y-4">
                                    <div class="space-y-4">
                                        <div class="space-y-2">
                                            <p>We've identified you could be due up to:</p>
                                            <div class="rounded-lg bg-slate-100 py-3 px-6 text-2xl font-bold text-center">£{{ claimTotal }}</div>
                                            <p class="text-sm">* Average payout in 21 days</p>
                                        </div>
                                    </div>
                                    <div class="space-y-4">
                                        <p class="text-base sm:text-lg font-bold">Select the years you worked at least 1 day from home:</p>
                                        <div v-for="(item, i) of claims" :key="item.period" class="space-y-4">
                                            <div class="relative flex items-center">
                                                <div class="flex h-6 items-center">
                                                    <input :id="item.meta.period" :name="item.name" type="checkbox" v-model="item.hasWorked" :true-value="true" :false-value="false" class="checkbox" />
                                                </div>
                                                <div class="ml-3">
                                                    <label :for="item.meta.period" class="font-bold text-sm sm:text-base uppercase"
                                                        >{{ item.name }} <small class="ml-2 text-slate-800">{{ item.meta.period }}</small></label
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div v-if="periodCount >= 1" class="md:max-w-3xl w-full bg-white rounded-3xl relative z-10 -mt-20 pt-3 pb-6 px-6 md:p-12 space-y-4 sm:space-y-8">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Get Your Rebate</p>
                                </div>
                                <div>
                                    <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                                </div>
                            </div>

                            <div>
                                <p class="font-semibold text-sm sm:text-lg leading-tight">
                                    To get your <b>tax relief of £{{ claimTotal }}</b
                                    >, we just need your permission to start preparing your documents. All that is needed is your signature below to claim.
                                </p>
                            </div>
                            <Form ref="start" name="start" key="start" v-slot="{ busy }" :submit="submit">
                                <div class="space-y-6">
                                    <div class="space-y-2">
                                        <div class="flex gap-3 w-full">
                                            <p class="font-bold text-sm w-full sm:text-base flex justify-between gap-4">
                                                <span>Please draw your signature below</span>
                                                <small><span class="hidden lg:block">(Please use your mouse)</span> <span class="lg:hidden">(please use your finger)</span></small>
                                            </p>
                                        </div>
                                        <FormSignature :fullName="`${data.client.firstName} ${data.client.lastName}`" />
                                    </div>

                                    <div class="bg-slate-50 p-6 text-sm">
                                        <ul class="list-disc pl-5 mb-4 space-y-2">
                                            <li class="list-none -ml-5 font-bold text-xl mb-5"><p>What are you signing;</p></li>
                                            <li v-for="(item, i) of data.company.disclaimer" :key="i">
                                                <span v-html="item.item" />
                                            </li>
                                        </ul>
                                    </div>

                                    <FormSubmitButton :busy="busy"> Get Decision </FormSubmitButton>

                                    <div class="text-center font-semibold">
                                        <p v-if="data.company?.subText" v-html="data.company.subText" />
                                    </div>
                                </div>
                            </Form>
                        </div>
                        <div v-else class="md:max-w-3xl w-full bg-white rounded-3xl relative z-10 -mt-20 pt-3 pb-6 px-6 md:p-12 space-y-4 sm:space-y-8">
                            <div class="bg-rose-100 rounded-xl p-8 text-center space-y-4">
                                <p class="text-xl sm:text-2xl font-semibold leading-tight">Unfortunately, it appears based on this answer you do not qualify for working from home tax relief.</p>
                                <nuxt-link to="/offers" class="bg-black rounded-lg py-4 text-lg font-semibold inline-block px-10 text-white">View More Offers</nuxt-link>
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
