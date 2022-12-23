<template>
    <ValidationObserver>
        <ValidationProvider :ref="id" :vid="vid" :name="name || id" rules="required|validDate:@day,@month,@year" v-slot="{ errors }" tag="div">
            <input type="hidden" v-model="innerValue" />
            <div class="flex justify-between">
                <FormUILabel :id="id" :label="label" />
                <FormUIOptional v-if="optional" />
            </div>

            <div class="lg:w-auto">
                <div class="form-control form-control-lg flex flex-between items-center !p-0 lg:gap-3" :class="{ hasErrors: errors.length > 0 }">
                    <ValidationProvider :ref="`${id}-day`" vid="day" name="day" rules="required|min:1|max:2|between:1,31" v-slot="{ errors }" tag="div">
                        <div class="relative">
                            <input v-model="innerDate.day" type="tel" :class="[{ hasErrors: errors.length > 0 }, inputClass]" class="text-center" placeholder="DD" />
                            <FormUIErrorIcon v-if="errors.length > 0" />
                        </div>
                    </ValidationProvider>
                    <div class="w-auto text-2xl font-semibold !leading-none text-slate-200">/</div>
                    <ValidationProvider :ref="`${id}-month`" vid="month" name="month" rules="required|min:1|max:2|between:1,12" v-slot="{ errors }" tag="div">
                        <div class="relative">
                            <input v-model="innerDate.month" type="tel" :class="[{ hasErrors: errors.length > 0 }, inputClass]" class="border-transparent text-center" placeholder="MM" />

                            <FormUIErrorIcon v-if="errors.length > 0" />
                        </div>
                    </ValidationProvider>
                    <div class="w-auto text-2xl font-semibold !leading-none text-slate-200">/</div>
                    <ValidationProvider :ref="`${id}-year`" vid="year" name="year" rules="required|min:4|max:4|between:1900,2005" v-slot="{ errors }" tag="div">
                        <div class="relative">
                            <input v-model="innerDate.year" type="tel" :class="[{ hasErrors: errors.length > 0 }, inputClass]" class="text-center" placeholder="YYYY" />
                            <FormUIErrorIcon v-if="errors.length > 0" />
                        </div>
                    </ValidationProvider>
                </div>
            </div>

            <FormUIValidationError v-if="errors.length > 0" :text="errors[0]" />
            <FormUIHelper v-else :text="helper" />
        </ValidationProvider>
    </ValidationObserver>
</template>

<script>
import global from './mixins/global';

export default {
    mixins: [global],
    computed: {
        innerValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.value = val;
            },
            setDob: {
                type: Object, 
            },
        },
    },
    created() {
        this.innerDate.day = this.setDob.day || null;
        this.innerDate.month = this.setDob.month || null;
        this.innerDate.year = this.setDob.year || null;
    },
    watch: {
        innerDate: {
            deep: true,
            handler(n, o) {
                if (this.innerDate.day != null && this.innerDate.day.length > 1 && this.innerDate.month != null && this.innerDate.month.length > 1 && this.innerDate.year != null && this.innerDate.year.length > 3) {
                    let date = new Date(`${this.innerDate.year}-${this.innerDate.month}-${this.innerDate.day}`);
                    if (!this.dateIsValid(date)) return;
                    this.$emit('input', this.$dayjs(date).format('YYYY-MM-DD'));
                }
            },
        },
    },
    methods: {
        dateIsValid(date) {
            return this.$dayjs(date).isValid();
        },
    },
    data() {
        return {
            innerDate: {
                day: null,
                month: null,
                year: null,
            },
        };
    },
};
</script>
