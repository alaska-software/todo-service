<script setup>
import { computed } from 'vue';

const props = defineProps({
    value: {
        type: [String, Number],
        required: false
    },
    options: {
        type: Array,
        required: true
    },
    dictionary: {
        type: Object,
        required: true
    },
    rounded: {
        type: Boolean,
        default: false
    }
});

const option = computed(() => {
    if (props.value == null) return null;
    return props.options.find(x => x.id === props.value);
});

const attributes = computed(() => {
    if (props.value == null) return {};
    return props.dictionary.getAttributesById(props.value);
});

const name = computed(() => option.value?.name || '');
</script>

<template>
    <Tag v-if="value != null"
         :value="name"
         :severity="attributes.color"
         :icon="attributes.icon"
         :rounded="rounded" />
</template>
