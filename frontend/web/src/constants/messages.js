/**
 * Error and notification message constants
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

export const ERROR_MESSAGES = {
    LOAD_ITEMS: 'Error while loading todo items. Check the connection with the backend.',
    DELETE_ITEM: (id) => `Error while deleting the todo item #${id}`,
    UPDATE_ITEM: (id) => `Error while updating the todo item #${id}`,
    CREATE_ITEM: 'Error while creating a todo item'
};

export const UI_MESSAGES = {
    NO_TODO_ITEMS: 'No todo items found.',
    LOADING_TODO_ITEMS: 'Loading todo items. Please wait.',
    TOAST_SUMMARY_ERROR: 'Error',
    TOAST_SUMMARY_SAVED: 'Todo item saved!',
    TOAST_SUMMARY_CREATED: 'Todo item created!',
    TOAST_SUMMARY_DELETED: 'Todo item deleted!'
};

export const DIALOG_MESSAGES = {
    EDIT_TODO_ITEM: 'Edit Todo Item',
    NEW_TODO_ITEM: 'New Todo Item'
};

export const VALIDATION_MESSAGES = {
    DESCRIPTION_REQUIRED: 'Description is required.',
    STATE_REQUIRED: 'State is required.',
    PRIORITY_REQUIRED: 'Priority is required.'
};

export const CONFIRM_MESSAGES = {
    DELETE_TODO_ITEM: (todoItemText) =>
        `Would you like to delete the todo item?\n"${todoItemText?.substring(0, 50) || ''}..."`
};

export const HTTP_ERROR_MESSAGES = {
    400: 'Missing/empty input data',
    401: 'User is not authenticated',
    403: 'User has no permission to execute',
    404: 'Required resource was not found',
    500: 'Internal server error',
    DEFAULT: 'Unknown error'
};
