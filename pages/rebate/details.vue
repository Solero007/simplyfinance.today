<template>
    <main class="bg-gradient-to-b from-white to-slate-100 pb-12">
        <section class="bg-black relative">
            <!-- <div class="absolute inset-0 -z-0 after:bg-black after:absolute after:inset-0 after:opacity-70 after:sm:opacity-0">
                <img src="https://theaccountancycloud.com/assets/images/sos-header-bg.webp" class="object-center object-cover w-full h-full" alt="" />
            </div> -->
            <div class="container text-center pt-6 pb-24 md:pt-14 md:pb-32 relative z-0 text-white">
                <div class="flex justify-center">
                    <div class="w-full sm:max-w-4xl lg:max-w-5xl">
                        <div class="space-y-3 sm:space-y-4">
                            <div class="space-y-4 sm:space-y-2">
                                <div class="space-y-1">
                                    <p class="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug md:leading-tight">
                                        <span class="capitalize" v-html="details.firstName" />, please confirm your details
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="md:container">
                <Form ref="start" name="start" key="start" v-slot="{ busy }" :submit="submit">
                    <div class="flex justify-center items-center space-y-5 flex-col">
                        <div class="card-form">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Your Details</p>
                                </div>
                                <div>
                                    <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                                </div>
                            </div>

                            <div class="space-y-6">
                                <FormRadioBtn :options="titles" label="Title" vid="title" name="title" v-model="title">
                                    <template v-slot="data">
                                        <span class="flex items-center">
                                            <span class="flex flex-col">
                                                <span class="capitalize"> {{ data.option.text }} </span>
                                            </span>
                                        </span>
                                    </template>
                                </FormRadioBtn>
                                <div class="grid sm:grid-cols-2 gap-4">
                                    <FormTextbox label="First name" rules="required|min:2|isProfanity" name="First name" v-model="firstName" />
                                    <FormTextbox label="Last name" rules="required|min:2|isProfanity" name="Last name" v-model="lastName" />
                                </div>
                                <FormTextbox label="Email" rules="required|min:2|isProfanity" name="Email" v-model="email" />
                                <FormTextbox label="Mobile" rules="required|min:2|isProfanity" name="Mobile" v-model="mobile" />
                            </div>
                        </div>

                        <div class="card-form">
                            <div class="flex gap-4 justify-between items-center sm:items-start">
                                <div>
                                    <p class="font-bold text-accent-900 text-xl sm:text-xl md:text-2xl">Your Address</p>
                                </div>
                                <div>
                                    <img src="https://app.loancircle.co.uk/images/le.png" class="w-[50px]" alt="" />
                                </div>
                            </div>

                            <div class="space-y-6">
                                <FormAddress  />
                                <FormSubmitButton :busy="busy"> Get Decision </FormSubmitButton>
                            </div>
                        </div>
                        <div class="container flex justify-center">
                            <div class="text-center text-black/90 text-sm leading-tight md:max-w-2xl">
                                <p>By clicking <b>"Get Decision"</b> you agree to be contacted by Get A Loan Today via SMS in relation to loan and claim products</p>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    </main>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'IndexPage',
    computed: {
        ...mapFields('client', ['details', 'details.title', 'details.firstName', 'details.lastName', 'details.email', 'details.mobile']),
    },
    data() {
        return {
            titles: [
                { text: 'Mr', value: 'mr' },
                { text: 'Mrs', value: 'mrs' },
                { text: 'Miss', value: 'miss' },
                { text: 'Ms', value: 'ms' },
            ],
        };
    },
    methods: {
        async submit() {
            this.$nuxt.$emit('loader', true);
            setTimeout(async () => {
                try {
                    const result = await this.$store.dispatch('client/submitClient');
                    switch (result.status) {
                        case 200:
                            if (result.data?.selfEmployed) {
                                this.$router.push({ name: 'decision-self-id', params: { id: result.data.id } });
                            } else {
                                this.$router.push({ name: 'decision-update-id', params: { id: result.data.id } });
                            }

                            break;
                        default:
                            break;
                    }
                    this.$nuxt.$emit('loader', false);
                } catch (error) {
                    console.log(error);
                    this.$nuxt.$emit('loader', false);
                }
            }, 5000);
        },
    },
};
</script>
