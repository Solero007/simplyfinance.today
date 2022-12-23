<template>
    <button v-bind="$attrs" type="submit" class="btn-submit w-full disabled:opacity-30" :class="{ 'w-full': block }" @click="$emit('click', $event)" :disabled="busy || disabled">
        <span v-if="busy" class="flex justify-center items-center">
            <!-- <span class="spinner-border bg-gradient-to-br from-red-100 to-red animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span class="visually-hidden"></span>
            </span> -->
            <span>Busy</span>
        </span>
        <span v-else class="capitalize"><slot>Submit</slot></span>
    </button>
</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        block: {
            type: Boolean,
            default: false,
        },
        busy: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
