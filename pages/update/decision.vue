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
                        <Form ref="start" name="start" key="start" v-slot="{ busy }" :submit="submit">
                            <div class="space-y-6">
                                <div class="space-y-4">
                                    <div v-for="(item, i) of claims" :key="item.period">
                                        <FormTextbox
                                            v-if="item.meta.show"
                                            :label="item.meta.label"
                                            rules="required|min:2|isProfanity"
                                            :name="item.meta.name"
                                            v-model="item.name"
                                            :helper="item.meta.description"
                                            :placeholder="item.meta.placeholder"
                                        />
                                        <div v-if="i == 0" class="mt-4">
                                            <div class="relative flex items-center">
                                                <div class="flex h-8 items-center">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        v-model="isSameCompany"
                                                        :true-value="true"
                                                        :false-value="false"
                                                        class="checkbox"
                                                    />
                                                </div>
                                                <div class="ml-3">
                                                    <label for="comments" class="font-semibold text-sm sm:text-base">I worked at the same company in 2020/2021</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <FormTextbox
                                    inputClass="!text-3xl !font-bold !text-center !tracking-widest !uppercase"
                                    label="National Insurance Number"
                                    vid="nationalInsurance"
                                    :rules="{
                                        required: true,
                                        regex: /^[A-CEGHJ-PR-TW-Za-ceghj-pr-tw-z]{1}[A-CEGHJ-NPR-TW-Za-ceghj-pr-tw-z]{1}[0-9]{6}[A-DFMa-dfm]{0,1}$/,
                                    }"
                                    name="National Insurance"
                                    v-model="nationalInsurance"
                                    helper="As it appeared on your NI card (9 digits)"
                                    placeholder="AB123456D"
                                />

                                <div class="relative flex items-center">
                                    <div class="flex h-6 items-center">
                                        <input id="selfEmployed" name="Self employed" type="checkbox" v-model="selfEmployed" :true-value="true" :false-value="false" class="checkbox" />
                                    </div>
                                    <div class="ml-3">
                                        <label for="selfEmployed" class="font-semibold text-sm sm:text-base">I'm self employed <small>(I do my own taxes)</small></label>
                                    </div>
                                </div>

                                <FormSubmitButton :busy="busy"> Get Decision </FormSubmitButton>
                            </div>
                        </Form>
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
        async submit() {
            this.$nuxt.$emit('loader', true);
            setTimeout(async () => {
                try {
                    const result = await this.$store.dispatch('client/submitClient');
                    switch (result.status) {
                        case 200:
                            if (result.data?.selfEmployed) {
                                this.$router.push({ name: 'decision-self-id', params: { id: result.data.id } });
                            } else {
                                this.$router.push({ name: 'decision-update-id', params: { id: result.data.id } });
                            }

                            break;
                        default:
                            break;
                    }
                    this.$nuxt.$emit('loader', false);
                } catch (error) {
                    console.log(error);
                    this.$nuxt.$emit('loader', false);
                }
            }, 5000);
        },
    },
};
</script>
