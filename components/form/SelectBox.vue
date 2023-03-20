<template>
    <ValidationProvider :ref="id" :vid="vid" :name="name || id" :rules="rules" v-slot="{ errors }" tag="div">
        <div class="flex justify-between">
            <FormUILabel :id="id" :label="label" />
            <FormUIOptional v-if="optional" />
        </div>
        <div class="relative rounded-md block">
            <div class="flex gap-2 lg:gap-x-4 lg:gap-y-3 flex-wrap">
                <select class="form-select" @input="$emit('input', $event.target.value)">
                    <option :value="null">Please select</option>
                    <option v-for="(item, i) of options" :value="item.id">{{ item.text }}</option>
                </select>
            </div>
        </div>
        <FormUIValidationError v-if="errors.length > 0 && !hideErrorLabel" :text="errors[0]" />
        <FormUIHelper v-else :text="helper" />
    </ValidationProvider>
</template>

<script>
import global from './mixins/global';
export default {
    mixins: [global],
    props: {
        options: {
            type: [Object, Array],
            default: () => {},
        },
    },
    computed: {
        innerValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.value = val;
            },
        },
    },
};
</script>
