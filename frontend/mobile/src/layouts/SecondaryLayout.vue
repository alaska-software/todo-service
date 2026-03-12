<template>
    <q-layout view="hHh Lpr lff">
        <q-header elevated>
            <q-toolbar class="bg-blue-10">
                <q-btn
                    flat dense round
                    icon="arrow_back"
                    to="/"/>
                <q-toolbar-title>
                    {{ title }}
                </q-toolbar-title>
                <q-btn
                    v-if="button?.icon && button?.callback"
                    flat round dense
                    :icon="button.icon"
                    :disable="button.disable"
                    @click="button.callback"/>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page class="q-ma-sm">
                <slot/>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup>
/**
 * Secondary Layout
 * Consists of a header, that has a back button navigating to the Index page and a custom button with passed callback, as well as a slot for a wrapped page.
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    button: {
        type: Object,
        default: null
    }
});
</script>
