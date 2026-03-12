<template>
    <Dialog :visible="visible" @update:visible="emit('update:visible', $event)"
            header="Confirm Delete" modal>
        <div class="flex items-center gap-3">
            <i class="pi pi-exclamation-triangle text-3xl"/>
            <span>{{ CONFIRM_MESSAGES.DELETE_TODO_ITEM(item?.text) }}</span>
        </div>
        <template #footer>
            <Button label="Cancel" severity="secondary" @click="$emit('cancel')"/>
            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="$emit('confirm')"/>
        </template>
    </Dialog>
</template>

<script setup>
import {CONFIRM_MESSAGES} from '@/constants/messages.js';

defineProps({
    visible: Boolean,
    item: Object
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);
</script>
