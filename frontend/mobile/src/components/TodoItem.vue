<template>
    <q-item clickable v-ripple @click="emitSelect" v-touch-hold.mouse="emitTouchHold">
        <q-item-section avatar>
            <q-icon :color="stateAttributes.color" :name="stateAttributes.icon"/>
        </q-item-section>
        <q-item-section>
            <q-item-label :class="{'text-strike' : todoItem.state === 'DO'}">{{ todoItem.text }}</q-item-label>
            <q-item-label caption>Created at: {{ formatDate(todoItem.created) }}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <q-chip :color="priorityAttributes.color" text-color="white" outline square>
                {{ todoItem.priority }}
            </q-chip>
        </q-item-section>
    </q-item>
</template>

<script setup>
/**
 * Custom component that represents a todo item as a list item
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
import {formatDate} from 'src/utils/formatter'
import {getPriorityAttributes, getStateAttributes} from 'src/utils/dictionary'
import {computed} from "vue";

const props = defineProps({
    todoItem: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(["select", "touchHold"]);

const stateAttributes = computed(() => {
    return getStateAttributes(props.todoItem.state);
})
const priorityAttributes = computed(() => {
    return getPriorityAttributes(props.todoItem.priority);
})

/**
 * Sends the custom event Select to a parent component
 */
const emitSelect = () => {
    emit("select", props.todoItem);
}

/**
 * Sends the custom event touchHold to a parent component
 */
const emitTouchHold = () => {
    emit("touchHold", props.todoItem);
}
</script>
