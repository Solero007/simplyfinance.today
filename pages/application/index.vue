<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-black relative">
            <!-- <div class="absolute inset-0 -z-0 after:bg-black after:absolute after:inset-0 after:opacity-70 after:sm:opacity-0">
                <img src="https://uktaxreclaim-98axs.ondigitalocean.app/images/hero-2.webp" class="object-center object-cover w-full h-full" alt="" />
            </div> -->
            <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-4xl lg:max-w-6xl">
                        <div class="space-y-3 sm:space-y-4">
                            <p class="text-xl sm:text-2xl md:text-5xl font-bold tracking-tight leading-snug md:leading-tight">
                                <span v-if="details?.firstName" class="capitalize" v-html="`${details?.firstName}, ` || ''" /> almost there! To finalise your loan application for £1,000 we just need a
                                few more details.
                            </p>
                            <p class="text-sm sm:text-lg md:text-xl leading-snug md:leading-normal">
                                All that's left to do is enter your current employer's details and your national insurance number to confirm you're over 18+ before we can make a decision on your loan.
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
                this.$router.push({ name: 'decision-id', params: { id: data.id } });
            } else {
                this.$router.push({ name: 'decision-id', params: { id: data.id } });
            }
        },
    },
};
</script>
