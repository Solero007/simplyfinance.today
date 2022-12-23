<template>
    <ValidationProvider :ref="id" :vid="vid" :name="name || id" :rules="rules" v-slot="{ errors }" tag="div">
        <div class="flex justify-between">
            <FormUILabel :id="id" :label="label" />
            <FormUIOptional v-if="optional" />
        </div>
        <div class="mt-1 relative">
            <button type="button" @click="show = !show" class="form-control form-control-lg text-left" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
                <span class="block truncate"> Tom Cook </span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                            fill-rule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </button>

            <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
            <ul
                v-if="show"
                class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
            >
                <li class="cursor-pointer select-none relative py-3 pl-3 pr-9" id="listbox-option-0" role="option">
                    <span class="font-normal block truncate"> Wade Cooper </span>
                </li>
            </ul>
        </div>
        <FormUIHelper v-if="helper" :text="helper" />
        <FormUIValidationError v-if="errors.length > 0" :text="errors[0]" />
    </ValidationProvider>
</template>

<script>
import global from './mixins/global';
export default {
    mixins: [global],
    data() {
        return {
            show: false,
        };
    },
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
