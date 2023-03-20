<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-accent-900/90 text-white py-2 md:py-2 text-center">
            <div class="container">
                <div class="text-xs sm:text-base md:text-lg leading-tight md:leading-normal font-semibold flex gap-3 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p>Only 30 seconds away from a decision, with no upfront payment.</p>
                </div>
            </div>
        </section>
        <section class="bg-accent-900 relative">
            <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-4xl lg:max-w-7xl">
                        <div class="space-y-3 sm:space-y-4">
                            <p class="text-xl sm:text-2xl md:text-4xl font-bold tracking-normal leading-snug md:leading-tight">
                                <span v-if="details?.firstName" class="capitalize" v-html="`${details?.firstName}, ` || ''" /> almost there! To finalise your loan application for £1,000 we just need a
                                few more details.
                            </p>
                            <p class="text-xs sm:text-lg md:text-xl leading-snug md:leading-normal">
                                All that's left to do is enter your current employer's details and your national insurance number before we can make a decision on your loan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="md:container">
                <div class="flex justify-center items-center space-y-5 flex-col">
                    <div class="card-form">
                        <div class="flex gap-4 justify-between items-center sm:items-start">
                            <div>
                                <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Further Details</p>
                            </div>
                            <div>
                                <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                            </div>
                        </div>
                        <FormsWfh @complete="complete" />
                    </div>
                    <div class="container flex justify-center">
                        <div class="text-center text-black/90 text-sm leading-tight md:max-w-2xl">
                            <p>By clicking "Get Decision" you agree to be contacted by Get A Loan Today via SMS in relation to loan and claim products</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields('client', ['details', 'details.nationalInsurance', 'details.selfEmployed']),
    },
    methods: {
        async complete(result) {
            if (!result) return;
            const data = result.data;
            if (data.selfEmployed) {
                this.$router.push({ name: 'loan-decision-id', params: { id: data.id } });
            } else {
                this.$router.push({ name: 'loan-decision-id', params: { id: data.id } });
            }
        },
    },
};
</script>
