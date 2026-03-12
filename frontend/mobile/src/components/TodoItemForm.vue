<template>
    <q-form ref="formRef" class="q-mt-lg">
        <div class="row">
            <q-input v-model="todoItem.text"
                     ref="text"
                     lazy-rules
                     :rules="[val => val && val.length > 0 || 'Please type something']"
                     outlined
                     clearable autogrow
                     maxlength="512"
                     class="q-mb-lg full-width"
                     label="Description*"
                     hint="Write what is to be done"/>
        </div>
        <div class="row">
            <span class="text-subtitle1">State</span>
            <q-btn-toggle v-model="todoItem.state"
                          toggle-color="blue-10"
                          class="q-mb-lg full-width"
                          no-caps spread
                          :options="stateOptions" @click="setChanged">
            </q-btn-toggle>
        </div>
        <div class="row">
            <span class="text-subtitle1">Priority</span>
            <q-btn-toggle v-model="todoItem.priority"
                          toggle-color="orange-10"
                          class="q-mb-lg full-width"
                          no-caps spread
                          :options="priorityOptions" @click="setChanged"/>
        </div>
        <div class="row justify-between">
            <div class="column text-subtitle1">Created at:</div>
            <div class="column">{{ formatDate(todoItem.created) }}</div>
        </div>
        <div class="row justify-between q-pb-md">
            <div class="column text-subtitle1">Changed at:</div>
            <div class="column">{{ formatDate(todoItem.changed) }}</div>
        </div>
    </q-form>
</template>

<script setup>
/**
 * Custom component that represents a form containing data of a single todo item to modify
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */
import {formatDate} from "../utils/formatter";
import {onMounted, ref} from "vue";
import {getStateAttributes} from 'src/utils/dictionary'

const props = defineProps({
    todoItem: {
        type: Object,
        required: true
    },
    states: {
        type: Array,
        required: true
    },
    priorities: {
        type: Array,
        required: true
    }
});

onMounted(() => {
    createStateOptions();
    createPriorityOptions();
})

const stateOptions = ref([]);
const priorityOptions = ref([]);

const formRef = ref(null);

const validateTodoItem = async () => {
    return await formRef.value.validate();
}
const createStateOptions = () => {
    props.states.forEach(x => {
        const newItem = {
            value: x.id,
            label: x.name,
            icon: getStateAttributes(x.id).icon
        }
        stateOptions.value.push(newItem);
    })
}

const createPriorityOptions = () => {
    props.priorities.forEach(x => {
        const newItem = {
            value: x.id,
            label: x.id + " " +  x.name,
        }
        priorityOptions.value.push(newItem);
    });
}

const setChanged = () => {
    props.todoItem.changed = new Date();
}

//Expose methods to parent components
defineExpose({
    validateTodoItem
})
</script>
