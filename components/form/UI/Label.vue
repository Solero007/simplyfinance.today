<template>
    <label v-if="label" :for="id" class="form-label inline-block mb-3 text-sm sm:text-base font-semibold leading-tight sm:leading-snug" v-html="label" />
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
    },
};
</script>
