<template>
    <ValidationProvider :ref="id" :vid="vid" :name="name || id" :rules="rules" v-slot="{ errors }" tag="div">
        <div class="flex justify-between">
            <FormUILabel :id="id" :label="label" />
            <FormUIOptional v-if="optional" />
        </div>
        <FormUIHelper v-if="helper" :text="helper" />
        <div class="relative rounded-md block">
            <div class="flex gap-2 lg:gap-x-4 lg:gap-y-3 flex-wrap">
                <div v-for="(option, i) in options" :key="i" class="flex-1" @click.prevent="$emit('emit', option.emit)">
                    <span class="group relative">
                        <label
                            class="relative border-2 border-slate-300 py-3 rounded-md font-semibold text-base xl:text-lg !pl-12 pr-6 group-hover:bg-primary-50 group-hover:bg-opacity-30 hover:border-primary-400 cursor-pointer flex"
                            :class="{ hasErrors: errors.length > 0, valid: innerValue === option.value }"
                            @click.prevent="$emit('input', option.value)"
                        >
                            <input :id="id + i" type="radio" :name="name" :value="innerValue" :checked="innerValue === option.value" class="sr-only peer" />
                            <slot v-bind:option="option" />
                            <div
                                class="absolute left-4 self-center transition-all duration-75 peer-checked:border-primary-500 peer-checked:bg-primary-500 group-hover:bg-primary-200 h-5 w-5 rounded-full outline-2 outline outline-slate-200 peer-checked:outline-primary-500 group-hover:outline-primary-500 outline-offset-[0px] group-hover:outline-offset-[3px] peer-checked:outline-offset-[3px] ring-white"
                            ></div>
                        </label>
                    </span>
                </div>
            </div>
        </div>
        <FormUIValidationError v-if="errors.length > 0" :text="errors[0]" />
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
