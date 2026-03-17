<template>
    <secondary-layout :title="isNew ? 'New todo item' : 'Todo Item #' + id"
                      :button="{ icon: 'save', callback: saveTodoItem, disable: isRunning || !!errorMessage }">

        <banner v-if="showError"
                :message="errorMessage" :icon-color="'orange-10'" :icon-name="'sentiment_very_dissatisfied'"
                :button-label="'Reload'" :button-callback="load"/>

        <q-inner-loading :showing="showLoading" color="blue-10"/>

        <todo-item-form v-if="showContent" ref="todoItemFormRef"
                        :todo-item="todoItem" :states="states" :priorities="priorities"/>

        <!-- Floating action button for delete action -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="delete" :disable="isNew || isRunning || !!errorMessage"
                   color="negative" @click="deletionDialog = true"/>
        </q-page-sticky>
    </secondary-layout>

    <q-dialog v-model="deletionDialog">
        <!--The component confirm-dialog is a custom component that asks for deletion confirmation.-->
        <!--If user confirms the deletion, the method deleteTodoItem() is executed. -->
        <confirm-dialog :icon="'delete'" :yes-button-callback="deleteTodoItem"
                        :message="CONFIRM_MESSAGES.DELETE_TODO_ITEM(todoItem?.text)"/>
    </q-dialog>

</template>

<script setup>
/**
 * Todo item page
 * Represents a form where a new/existing todo item can be created/modified
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

import {useTodoItem} from "src/composables/todoItem";
import {useRouter} from "vue-router";
import TodoItemForm from "src/components/TodoItemForm.vue";
import ConfirmDialog from "src/components/ConfirmDialog.vue";
import Banner from "src/components/Banner.vue";
import SecondaryLayout from "src/layouts/SecondaryLayout.vue";
import {computed, ref} from "vue";
import {notify} from 'src/utils/notify';
import {CONFIRM_MESSAGES, UI_MESSAGES} from 'src/constants/messages';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const $router = useRouter();
const todoItemFormRef = ref(null);
const {
    todoItem,
    load,
    save,
    remove,
    isNew,
    errorMessage,
    isDone,
    isRunning,
    states,
    priorities
} = useTodoItem(props.id);
const deletionDialog = ref(false);

// Computed properties for clearer template conditions
const showError = computed(() => isDone.value && errorMessage.value);
const showLoading = computed(() => isRunning.value && !errorMessage.value);
const showContent = computed(() => isDone.value && !errorMessage.value);

/**
 * Navigates to the page Index
 */
const goToIndex = () => {
    $router.push({name: "index"});
}

/**
 * Validates input data and calls saving a todo item from the composable useTodoItem()
 */
const saveTodoItem = async () => {
    const valid = await todoItemFormRef.value.validateTodoItem();
    if (valid) {
        await save();
        notify(!!errorMessage.value, UI_MESSAGES.SAVED, errorMessage.value);
        if (!errorMessage.value) {
            goToIndex();
        }
    }
}

/**
 * Calls deleting a todo item from the composable useTodoItem()
 */
const deleteTodoItem = async () => {
    await remove();
    notify(!!errorMessage.value, UI_MESSAGES.DELETED, errorMessage.value);
    if (!errorMessage.value) {
        goToIndex();
    }
}


</script>
