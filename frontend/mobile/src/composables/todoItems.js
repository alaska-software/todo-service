/**
 * Composable useTodoItems()
 * Encapsulates state and logic needed to manipulate todo items.
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

import {onBeforeMount, ref} from "vue";
import {useOperationProgress} from "src/composables/operationProgress.js";
import * as dataService from "src/services/dataService";

export function useTodoItems() {
    const todoItems = ref([]);
    const errorMessage = ref("");
    const {isDone, isRunning} = useOperationProgress();

    /**
     * Loads all todo items from the backend
     */
    const loadTodoItems = async () => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.getTodoItems();
            errorMessage.value = envelope.error || "";

            if (envelope.result) {
                todoItems.value = envelope.result.data;
                todoItems.value.sort((a, b) => b.state.localeCompare(a.state));
            }
        } finally {
            isRunning.value = false;
        }
    }

    /**
     * Deletes a todo item by id
     * @param {number} id - The id of the todo item to delete
     */
    const deleteTodoItem = async (id) => {
        isRunning.value = true;
        errorMessage.value = "";

        try {
            const envelope = await dataService.deleteTodoItemById(id);
            errorMessage.value = envelope.error || "";

            // If deletion was successful, reload the list
            if (!envelope.error) {
                await loadTodoItems();
            }
        } finally {
            isRunning.value = false;
        }
    }

    // onBeforeMount is a Vue lifecycle hook that runs before the component's DOM is created
    onBeforeMount(async () => {
        await loadTodoItems();
    })

    return {
        todoItems,
        errorMessage,
        isDone,
        isRunning,
        load: loadTodoItems,
        remove: deleteTodoItem
    }
}
