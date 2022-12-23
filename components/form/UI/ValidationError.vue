<template>
    <p v-if="text" class="mt-2 text-sm text-red-600" v-html="text" />
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: null,
        },
    },
};
</script>
