<template>
    <ValidationProvider :ref="id" :vid="vid" :name="name || id" :rules="rules" v-slot="{ errors }" tag="div">
        <div class="flex justify-between">
            <FormUILabel :id="id" :label="label" />
            <FormUIOptional v-if="optional" />
        </div>
        <div class="relative block">
            <input @input="$emit('input', $event.target.value)" :id="id" :name="name" :type="type" class="form-input" :class="[{ hasErrors: errors.length > 0 }, inputClass]" :placeholder="placeholder" :value="innerValue" />
            <FormUIErrorIcon v-if="errors.length > 0" />
        </div>        
        <FormUIValidationError v-if="errors.length > 0 && !hideErrorLabel" :text="errors[0]" />
        <FormUIHelper v-else :text="helper" />
    </ValidationProvider>
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
        },
    },
};
</script>
