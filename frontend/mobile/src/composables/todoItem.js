/**
 * Composable useTodoItem()
 * Encapsulates state and logic needed to manipulate a todo item.
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

import {computed, onBeforeMount, ref} from "vue";
import {useOperationProgress} from "src/composables/operationProgress.js";
import * as dataService from "src/services/dataService";

export function useTodoItem(id) {
    const todoItem = ref({});
    const errorMessage = ref("");
    const {isDone, isRunning} = useOperationProgress();
    const states = ref([]);
    const priorities = ref([]);
    const isNew = computed(() => id === 0);

    /**
     * Deletes the current todo item
     */
    const deleteTodoItem = async () => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.deleteTodoItemById(id);
            errorMessage.value = envelope.error || "";
        } finally {
            isRunning.value = false;
        }
    }

    /**
     * Loads a todo item from the backend
     */
    const loadTodoItem = async () => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.getTodoItemById(id);
            errorMessage.value = envelope.error || "";

            if (envelope.result) {
                todoItem.value = envelope.result.data;
                states.value = envelope.result.dictionaries.states;
                priorities.value = envelope.result.dictionaries.priorities;
            }
        } finally {
            isRunning.value = false;
        }
    }

    /**
     * Saves the todo item (creates new or updates existing)
     */
    const saveTodoItem = async () => {
        // If it's a new item, create it; otherwise update it
        if (isNew.value) {
            await createTodoItem();
        } else {
            await updateTodoItem();
        }
    }

    /**
     * Updates an existing todo item
     */
    const updateTodoItem = async () => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.updateTodoItem(todoItem.value);
            errorMessage.value = envelope.error || "";

            if (envelope.result) {
                todoItem.value = envelope.result;
            }
        } finally {
            isRunning.value = false;
        }
    }

    /**
     * Creates a new todo item
     */
    const createTodoItem = async () => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.createTodoItem(todoItem.value);
            errorMessage.value = envelope.error || "";

            if (envelope.result) {
                todoItem.value = envelope.result;
            }
        } finally {
            isRunning.value = false;
        }
    }

    // onBeforeMount is a Vue lifecycle hook that runs before the component's DOM is created
    onBeforeMount(async () => {
        await loadTodoItem();
    });

    return {
        todoItem,
        errorMessage,
        states,
        priorities,
        isNew,
        isDone,
        isRunning,
        load: loadTodoItem,
        remove: deleteTodoItem,
        save: saveTodoItem
    }
}
