import { v4 as uuidv4 } from 'uuid';
export default {
    inheritAttrs: false,
    props: {
        optional: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        rules: {
            type: [String, Object],
            default: 'required',
        },
        name: {
            type: String,
            default: null,
        },
        vid: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        value: {
            type: [String, Boolean, Number],
            default: null,
        },
        placeholder: {
            type: String,
            default: '',
        },
        helper: {
            type: String,
            default: '',
        },
        inputClass: {
            type: String,
            default: null,
        },
        hideErrorLabel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            id: uuidv4(),
        };
    },
};
