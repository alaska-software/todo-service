<template>
    <q-page padding>
        <q-pull-to-refresh
            @refresh="refreshTodoItems"
            scroll-target="#todo-item-list"
            color="blue-10">

            <banner v-if="showError"
                    :message="errorMessage" :icon-color="'orange-10'" :icon-name="'sentiment_very_dissatisfied'"
                    :button-label="'Reload'" :button-callback="load"/>

            <banner v-if="showEmpty"
                    :message="UI_MESSAGES.NO_TODO_ITEMS" :icon-name="'info'" :icon-color="'blue-10'"/>

            <list-skeleton v-if="showLoading"></list-skeleton>

            <q-list separator id="todo-item-list" v-if="showContent">
                <todo-item
                    v-for="todoItem in todoItems"
                    :key="todoItem.id"
                    :todo-item="todoItem"
                    @touch-hold="openDeletionDialog"
                    @select="editTodoItem"/>
            </q-list>
        </q-pull-to-refresh>

        <!-- Floating action button to create a new todo item -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="showContent">
            <q-btn fab icon="add" color="blue-10" @click="createTodoItem"/>
        </q-page-sticky>

        <q-dialog v-model="deletionDialog">
            <confirm-dialog :icon="'delete'" :yes-button-callback="deleteTodoItem"
                            :message="CONFIRM_MESSAGES.DELETE_TODO_ITEM(selectedTodoItem?.text)"/>
        </q-dialog>
    </q-page>
</template>

<script setup>
/**
 * Index page
 * Shows a todo item list. Users can refresh a todo item list, delete a todo item as well as create a new one.
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

import {computed, ref} from 'vue';
import TodoItem from 'src/components/TodoItem.vue'
import {useTodoItems} from 'src/composables/todoItems'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import ListSkeleton from 'src/components/ListSkeleton.vue'
import {useRouter} from "vue-router";
import {notify} from 'src/utils/notify'
import Banner from "src/components/Banner.vue";
import {CONFIRM_MESSAGES, UI_MESSAGES} from 'src/constants/messages';

const $router = useRouter();
const {todoItems, errorMessage, isDone, isRunning, load, remove} = useTodoItems();
const deletionDialog = ref(false);
const selectedTodoItem = ref(null);

// Computed properties for clearer template conditions
const showError = computed(() => isDone.value && errorMessage.value);
const showLoading = computed(() => isRunning.value && !errorMessage.value);
const showContent = computed(() => isDone.value && !errorMessage.value);
const showEmpty = computed(() => isDone.value && !errorMessage.value && todoItems.value.length === 0);

/**
 * The method calls loading todo items from the composable useTodoItems(). It is triggered on pull down gesture.
 * @param done - pull-to-refresh component's callback on finished loading
 */
const refreshTodoItems = async (done) => {
    await load();
    done();
}

/**
 * Navigates to the page TodoItem, where a new todo item can be saved
 */
const createTodoItem = () => {
    $router.push({name: "todo-item", params: {id: 0}});
}

/**
 * Navigates to the page TodoItem, where a passed todo item can be modified
 * @param todoItem todo item to modify
 */
const editTodoItem = (todoItem) => {
    $router.push({name: "todo-item", params: {id: todoItem.id}})
}

/**
 * Opens the deletion dialog for a passed todo item.
 * @param todoItem todo item to delete
 */
const openDeletionDialog = (todoItem) => {
    selectedTodoItem.value = todoItem;
    deletionDialog.value = true;
}

/**
 * Calls deletion from the composable useTodoItems()
 * and notifies a user whether the operation is successful or not
 */
const deleteTodoItem = async () => {
    await remove(selectedTodoItem.value.id);
    notify(!!errorMessage.value, UI_MESSAGES.DELETED, errorMessage.value);
    selectedTodoItem.value = null;
}
</script>
