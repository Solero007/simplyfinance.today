<template>
    <div v-if="text" class="text-xs sm:text-sm text-slate-400 font-normal mt-2" v-html="text" />
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
    },
};
</script>
