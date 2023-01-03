<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-black relative">
            <!-- <div class="absolute inset-0 -z-0 after:bg-black after:absolute after:inset-0 after:opacity-70 after:sm:opacity-0">
                <img src="https://uktaxreclaim-98axs.ondigitalocean.app/images/hero-2.webp" class="object-center object-cover w-full h-full" alt="" />
            </div> -->
            <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-4xl lg:max-w-6xl">
                        <div class="space-y-3 sm:space-y-4">
                            <img src="https://workfromhometaxrelief.co.uk/duke/assets/images/logo.png" class="w-[170px] mx-auto" alt="" />
                            <p class="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">
                                <span v-if="details?.firstName" class="capitalize" v-html="`${details?.firstName}, ` || ''" /> you could be <span class="text-accent-300">due to claim £624</span> if
                                you have worked from home for 1 day or more since April 2020.
                            </p>
                            <p class="text-sm sm:text-lg md:text-xl leading-snug md:leading-normal">Check if you qualify below:</p>
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
            this.$router.push({ name: 'rebate-details' });
        },
    },
};
</script>
