<script setup>
import {ref, watch} from 'vue';
import {DIALOG_MESSAGES, VALIDATION_MESSAGES} from '@/constants/messages.js';

const props = defineProps({
    visible: Boolean,
    item: Object,
    states: Array,
    priorities: Array,
});

const emit = defineEmits(['update:visible', 'save']);

const errors = ref({text: false, state: false, priority: false});

const validate = () => {
    errors.value = {
        text: !props.item.text?.trim(),
        state: props.item.state == null,
        priority: props.item.priority == null,
    };
    return !errors.value.text && !errors.value.state && !errors.value.priority;
};

const onSave = () => {
    if (validate()) emit('save');
};

watch(() => props.visible, () => {
    errors.value = {text: false, state: false, priority: false};
});
</script>

<template>
    <Dialog :visible="visible" @update:visible="emit('update:visible', $event)"
            :header="item.id > 0 ? DIALOG_MESSAGES.EDIT_TODO_ITEM : DIALOG_MESSAGES.NEW_TODO_ITEM" modal>
        <div class="flex flex-col gap-4 pt-2">
            <div class="flex flex-col gap-1">
                <label for="item-text">Description</label>
                <Textarea id="item-text" v-model="item.text" class="w-full" autofocus autoResize
                          :class="errors.text ? 'p-invalid' : ''" rows="3"/>
                <small v-if="errors.text" class="text-red-500">{{ VALIDATION_MESSAGES.DESCRIPTION_REQUIRED }}</small>
            </div>
            <div class="flex flex-col gap-1">
                <label>State</label>
                <SelectButton v-model="item.state" :options="states" option-value="id" option-label="name"
                              class="w-fit"
                              :class="errors.state ? 'border border-red-500 rounded' : ''"/>
                <small v-if="errors.state" class="text-red-500">{{ VALIDATION_MESSAGES.STATE_REQUIRED }}</small>
            </div>
            <div class="flex flex-col gap-1">
                <label>Priority</label>
                <SelectButton v-model="item.priority" :options="priorities" option-value="id" option-label="name"
                              class="w-fit"
                              :class="errors.priority ? 'border border-red-500 rounded' : ''"/>
                <small v-if="errors.priority" class="text-red-500">{{ VALIDATION_MESSAGES.PRIORITY_REQUIRED }}</small>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" severity="secondary" @click="emit('update:visible', false)"/>
            <Button label="Save" icon="pi pi-check" @click="onSave"/>
        </template>
    </Dialog>
</template>
