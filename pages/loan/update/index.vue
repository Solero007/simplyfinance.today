<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-accent-900 relative">
            <!-- <div class="absolute inset-0 -z-0 after:bg-black after:absolute after:inset-0 after:opacity-70 after:sm:opacity-0">
                <img src="https://uktaxreclaim-98axs.ondigitalocean.app/images/hero-2.webp" class="object-center object-cover w-full h-full" alt="" />
            </div> -->
            <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-4xl lg:max-w-6xl">
                        <div class="space-y-3 sm:space-y-4">
                            <p class="text-xl sm:text-2xl md:text-5xl font-bold tracking-tight leading-snug md:leading-tight">
                                <span v-if="details?.firstName" class="capitalize" v-html="`${details?.firstName}, ` || ''" /> we have an update about your recent loan application.
                            </p>
                            <p class="text-sm sm:text-lg md:text-xl leading-snug md:leading-normal">
                                Thank you for your <span class="underline underline-offset-2 font-bold">recent application</span>. We have continued to search the market and have found more offers for
                                you.
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
                                <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Your Loan Offers <small class="text-slate-500">(2)</small></p>
                            </div>
                            <div>
                                <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                            </div>
                        </div>
                        <div>
                            <nuxt-link to="/loan/update/decision" class="btn-submit w-full block text-center">View My Offer</nuxt-link>
                        </div>
                    </div>
                    <div class="container flex justify-center">
                        <div class="text-center text-black/90 text-sm leading-tight md:max-w-2xl">
                            <p>By clicking <b>"view offers"</b> you agree to be contacted by Duke Leads - FZCO via SMS in relation to loan and claim products</p>
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
    name: 'IndexPage',
    computed: {
        ...mapFields('client', ['details', 'details.nationalInsurance', 'details.selfEmployed']),
        ...mapFields('claim/wfh', ['isSameCompany']),
        ...mapMultiRowFields('claim/wfh', ['claims']),
    }, 
    created() {}, 
};
</script>
