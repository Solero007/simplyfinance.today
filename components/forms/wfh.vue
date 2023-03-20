<template>
    <Form ref="start" name="start" key="start" v-slot="{ busy }" :submit="submit">
        <div class="space-y-6">
            <FormTextbox
                inputClass="!text-3xl !font-bold !text-center !tracking-widest !uppercase"
                label="National Insurance Number"
                vid="nationalInsurance"
                :rules="{
                    required: true,
                    regex: /^[A-CEGHJ-PR-TW-Za-ceghj-pr-tw-z]{1}[A-CEGHJ-NPR-TW-Za-ceghj-pr-tw-z]{1}[0-9]{6}[A-DFMa-dfm]{1}$/,
                }"
                name="National Insurance"
                v-model="nationalInsurance"
                helper="Please double check your national insurance number is correct"
                placeholder="AB123456D"
            />

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

            <FormSelectBox
                :rules="{
                    required: false,
                }"
                name="Employment industry"
                v-model="selectedInd"
                :value="selectedInd"
                label="Employment Industry"
                :options="employmentCategories"
                helper="Please select the industry closest to your profession"
            />

            <div class="relative flex items-center">
                <div class="flex h-6 items-center">
                    <input id="selfEmployed" name="Self employed" type="checkbox" v-model="selfEmployed" :true-value="true" :false-value="false" class="checkbox" />
                </div>
                <div class="ml-3">
                    <label for="selfEmployed" class="font-semibold text-sm sm:text-base">I'm self employed <small>(I do my own taxes)</small></label>
                </div>
            </div>

            <FormSubmitButton :busy="busy">Get Decision</FormSubmitButton>
        </div>
    </Form>
</template>

<script>
import { off } from 'process';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    name: 'IndexPage',
    fetchOnServer: false,
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
    async fetch() {
        const empCat = await this.$api.get(this.$config.TAX_API_URL + '/emploment-categories');
        switch (empCat.status) {
            case 200:
                this.employmentCategories = empCat.data.data.map((x) => {
                    return {
                        id: x.id,
                        text: x.attributes.text,
                        value: x.attributes.value,
                    };
                });
                break;
        }
    },
    created() {},
    data() {
        return {
            selectedInd: 1,
            employmentCategories: [],
        };
    },
    methods: {
        async submit() {
            this.$nuxt.$emit('loader', true);
            setTimeout(async () => {
                try {
                    const result = await this.$store.dispatch('client/submitClient');
                    switch (result.status) {
                        case 200:
                            this.$emit('complete', result);
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
