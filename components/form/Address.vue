<template>
    <div>
        <Form ref="addressForm" id="addressForm" name="addressForm" key="addressForm" v-slot="{ busy }" :submit="submit">
            <ValidationProvider :ref="id" name="postcode" vid="postcode" rules="required" v-slot="{ errors }" tag="div">
                <div class="flex justify-between">
                    <FormUILabel :id="id" :label="label" />
                    <FormUIOptional v-if="optional" />
                </div>
                <div class="relative xl:w-auto">
                    <input
                        v-model="manualPostcode"
                        :id="id"
                        :type="type"
                        class="form-control form-control-lg uppercase font-extrabold"
                        :class="{ hasErrors: errors.length > 0 }"
                        :placeholder="placeholder"
                        :value="innerValue"
                        v-bind="$attrs"
                    />
                    <button
                        @click.prevent="getAddress()"
                        :disabled="busy"
                        class="btn bg-slate-900 text-white lg:absolute w-full lg:w-auto mt-2 lg:mt-0 lg:right-2 lg:top-2 lg:bottom-2 leading-none font-semibold text-base px-4 lg:px-4 lg:py-0"
                    >
                        Search
                    </button>
                </div>
                <FormUIValidationError v-if="errors.length > 0" :text="errors[0]" />
            </ValidationProvider>
            <div v-if="list.length > 0" class="mt-4">
                <ValidationProvider :ref="`${id}_select`" vid="select address" :name="name || `${id}_select`" rules="required" v-slot="{ errors }" tag="div">
                    <select :value="selectedIndex" class="form-select" @change="selectAddress($event)" :class="[{ hasErrors: errors.length > 0 }, inputClass]">
                        <option disabled selected :value="null">-- Select Address --</option>
                        <option v-for="(item, i) in list" :key="i" :value="i">
                            <span v-if="item.formatted_address[0]" v-html="item.formatted_address[0] + ','"></span>
                            <span v-if="item.formatted_address[1]" v-html="item.formatted_address[1] + ','"></span>
                            <span v-if="item.formatted_address[2]" v-html="item.formatted_address[2] + ','"></span>
                            <span v-if="item.formatted_address[3]" v-html="item.formatted_address[3] + ','"></span>
                            <span v-if="item.formatted_address[4]" v-html="item.formatted_address[4]"></span>
                        </option>
                    </select>
                </ValidationProvider>
            </div>
        </Form>
    </div>
</template>

<script>
import axios from 'axios';
import global from './mixins/global';
import { createHelpers } from 'vuex-map-fields';
const { mapFields, mapMultiRowFields } = createHelpers({
    getterType: 'tax/getField',
    mutationType: 'tax/updateField',
});
export default {
    inheritAttrs: false,
    mixins: [global],
    props: {
        defaultAddress: {
            type: Object,
            default: () => {},
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        ...mapFields({
            address_line1: 'form.address_line1',
            address_line2: 'form.address_line2',
            address_line3: 'form.address_line3',
            city: 'form.city',
            province: 'form.province',
            postcode: 'form.postcode',
            address: 'form.address',
        }),
        innerValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.value = val;
            },
        },
        hasAddress() {
            return this.address.isValid;
        },
    },
    data() {
        return {
            selectedIndex: null,
            selected: null,
            list: [],
            listVisible: false,
            manualPostcode: null,
            manualEntry: false,
        };
    },
    created() {
        if (this.value != null) this.address.postcode = this.value;
        if (this.defaultAddress?.isValid) {
            this.address = { ...this.defaultAddress };
        }
    },
    methods: {
        isManual() {
            this.manualEntry = true;
        },
        async submit() {},
        async getAddress() {
            let isValid = await this.$refs['addressForm'].validCheck();

            if (!isValid) return;

            this.selectedIndex = null;

            let result; 

            try {
                result = await axios.get(this.$config.TAX_API_URL + '/postcode?postcode=' + this.manualPostcode.replace(/\s/g, ''));
            } catch (error) {
                console.log(error);
            }

            switch (result.status) {
                case 200:
                    let hasAddress = Object.keys(result.data).length > 0;

                    if (!hasAddress) {
                        this.list = [];
                        this.$refs['addressForm'].setErrors({ postcode: 'No address found' });
                        return;
                    }
                    this.postcodeData = result.data;
                    this.list = result.data.addresses;
                    break;
                default:
                    break;
            }
        },

        selectAddress(event) {
            this.selected = this.list[event.target.value];
            this.selectedIndex = event.target.value;

            let a = this.selected.formatted_address.filter((x) => {
                if (x !== '' || x != 'undefined') return x;
            });

            a = a.join(', ');

            this.address = a + `, ${this.manualPostcode}`;
            this.address_line1 = this.selected.line_1;
            this.address_line2 = this.selected.line_2;
            this.address_line3 = this.selected.line_3;
            this.city = this.selected.town_or_city;
            this.province = this.selected.county;
            this.postcode = this.manualPostcode;

            this.listVisible = false;
        },
    },
};
</script>
