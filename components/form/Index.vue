<template>
    <div>
        <ValidationObserver v-slot="{  }" :ref="id">
            <form @submit.prevent="save">
                <slot v-bind:busy="busy"></slot> 
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
    props: {
        submit: Function,
        valid: Function,
        invalid: Function,
    },
    data() {
        return {
            id: uuidv4(),
            busy: false,
        };
    },

    methods: {
        async validCheck() {
            return await this.$refs[this.id].validate();
        },

        async save() {
            let isValid = await this.$refs[this.id].validate();

            if (isValid) {
                if (this.valid) {
                    this.valid();
                }
                if (this.submit) {
                    this.busy = true;
                    await this.submit();
                    this.busy = false;
                }
            } else {
                const el = document.querySelector('.hasErrors:first-of-type');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' }); // Boolean parameter
                }

                if (this.invalid) {
                    this.invalid();
                }
            }
        },
        setErrors(errors) {
            this.$refs[this.id].setErrors(errors);
        },
    },
};
</script>
