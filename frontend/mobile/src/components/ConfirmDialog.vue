<template>
    <q-card>
        <q-card-section class="row">
            <div class="col-3">
                <q-avatar :icon="icon" color="primary" text-color="white"/>
            </div>
            <div class="col-9">
                <span>{{ message }}</span>
            </div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat label="No" color="primary" v-close-popup/>
            <q-btn flat label="Yes" color="primary" v-close-popup @click="yesButtonCallback"/>
        </q-card-actions>
    </q-card>
</template>

<script setup>
/**
 * Custom component that represents a confirmation dialog
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
const props = defineProps({
    icon: {
        type: String,
        default: "info"
    },
    message: {
        type: String,
        required: true
    },
    yesButtonCallback: {
        type: Function,
        default: () => {
        }
    }
});
</script>
