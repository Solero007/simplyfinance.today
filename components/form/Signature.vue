<template>
    <div class="d-flex flex-column">
        <client-only>
            <div class="relative">
                <div class="absolute -right-4 top-4">
                    <div class="relative">
                        <div class="h-14 pr-4 pl-2 flex items-center bg-slate-800 text-white rounded-r">
                            <span>Signature</span>
                        </div>
                        <div class="w-10 overflow-hidden inline-block absolute -left-10 top-0">
                            <div class="h-16 bg-slate-800 -rotate-45 transform origin-top-right rounded"></div>
                        </div>
                    </div>
                </div>
                <VueSignaturePad ref="signaturePad" width="100%" class="form-control rounded-lg !h-[180px] !lg:h-[260px] bg-accent-50 border-accent-100 border" :options="{ onEnd }" />
            </div>
        </client-only>
        <div class="flex justify-between items-center mt-3">
            <div>
                <b v-if="fullName.length > 0" class="capitalize" v-html="`Signed: ${fullName}`" />
            </div>

            <div>
                <button type="button" @click="undo" class="text-sm py-2 px-4 font-semibold rounded-lg bg-slate-100">Undo</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';

Vue.use(VueSignaturePad);
export default {
    name: 'MySignaturePad',
    props: {
        fullName: {
            type: String,
            default: '',
        },
    },

    methods: {
        undo() {
            this.$refs.signaturePad.undoSignature();
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            this.$emit('input', { isEmpty, data });
        },
        async onEnd() {
            const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
            this.$emit('input', { isEmpty, data });
        },
    },
};
</script>
