<template>
    <div class="relative w-full block">
        <ValidationProvider :ref="id" name="reg" rules="required" v-slot="{ errors }" tag="div">
            <div class="relative">
                <input
                    @input="$emit('input', $event.target.value)"
                    :id="id"
                    :name="name"
                    :type="type"
                    class="form-control form-control-lg text-2xl lg:text-2xl rounded-lg uppercase lg:h-[4.5rem] h-16 pl-4 text-left lg:pl-6 font-extrabold"
                    :class="{ hasErrors: errors.length > 0 }"
                    :placeholder="placeholder"
                    :value="innerValue"
                    v-bind="$attrs"
                />
                <button @click.prevent="findVehicle" class="btn bg-primary-500  absolute w-auto right-2 top-2 bottom-2 leading-none font-semibold text-xl px-4 lg:px-5">Search</button>
            </div>
            <!-- <FormUIValidationError v-if="errors.length > 0" :text="errors[0]" /> -->
        </ValidationProvider>
    </div>
</template>

<script>
import global from './mixins/global';
export default {
    inheritAttrs: false,
    mixins: [global],
    props: {
        caseId: {
            type: String,
            default: null,
        },
        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            vrm: '',
        };
    },
    created() {
        this.vrm = this.value;
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
    methods: {
        async findVehicle() {
            let vrm = await this.$api.get('/vrm', {
                vrm: this.innerValue,
            });
            switch (vrm.status) {
                case 200:
                    if (vrm.data.status !== 'Success') {
                        this.$toast.show({
                            type: 'info',
                            title: 'Error',
                            message: 'Could not find vehicle',
                        });
                        return;
                    }
                    this.$store.dispatch('lead/addVehicle', {
                        id: this.caseId,
                        data: vrm.data,
                    });
                    break;
                default:
                    this.$toast.show({
                        type: 'info',
                        title: 'Error',
                        message: 'Could not find vehicle',
                    });
                    break;
            }
            return;
        },
    },
};
</script>
