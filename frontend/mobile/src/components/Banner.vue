<template>
    <q-banner class="bg-grey-3">
        <template v-slot:avatar>
            <q-icon :name="iconName" :color="iconColor"/>
        </template>
        {{ message }}
        <template v-slot:action>
            <q-btn v-if="buttonLabel" color="blue-10" :label="buttonLabel" no-caps @click="buttonCallback"/>
        </template>
    </q-banner>
</template>

<script setup>
/**
 * Custom component that represents a banner displaying a message (e.g. an error, an info notice, or an empty-state hint)
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
const props = defineProps({
    iconName: {
        type: String,
        default: "info"
    },
    iconColor: {
        type: String,
        default: "blue-10"
    },
    message: {
        type: String,
        required: true
    },
    buttonLabel: {
        type: String,
        required: false
    },
    buttonCallback: {
        type: Function,
        required: false
    }
});
</script>
