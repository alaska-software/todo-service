/**
 * Service DataService
 * Consists of stateless logic and has functions hat send HTTP requests and receive responses from the backend.
 * @author Alaska Software Inc. (c) 2022-2023. All rights reserved.
 */
import axios from "axios";
import {ERROR_MESSAGES} from "@/constants/messages.js";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9100/",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const API_ENDPOINTS = {
    TODO_ITEMS: 'todoitems',
    TODO_ITEM: (id) => `todoitems/${id}`
};

/**
 * Generic API call wrapper with error handling
 * @param {Function} operation - The async operation to execute
 * @param {string} errorContext - Error message context
 * @returns {Promise<{result: any, error: string|null}>}
 */
async function callApi(operation, errorContext) {
    try {
        const response = await operation();
        return createResult(response.data.result, null);
    } catch (error) {
        const errorMessage = handleError(error, errorContext);
        return createResult(null, errorMessage);
    }
}

export async function getTodoItems() {
    return callApi(
        () => axiosInstance.get(API_ENDPOINTS.TODO_ITEMS),
        ERROR_MESSAGES.LOAD_ITEMS
    );
}

export async function deleteTodoItemById(id) {
    return callApi(
        () => axiosInstance.delete(API_ENDPOINTS.TODO_ITEM(id)),
        ERROR_MESSAGES.DELETE_ITEM(id)
    );
}

export async function updateTodoItem(todoItem) {
    return callApi(
        () => {
            return axiosInstance.put(API_ENDPOINTS.TODO_ITEM(todoItem.id), todoItem);
        },
        ERROR_MESSAGES.UPDATE_ITEM(todoItem.id)
    );
}

export async function createTodoItem(todoItem) {
    return callApi(
        () => {
            return axiosInstance.post(API_ENDPOINTS.TODO_ITEMS, todoItem);
        },
        ERROR_MESSAGES.CREATE_ITEM
    );
}

function handleError(error, logErrorMessage) {
    console.error(logErrorMessage);
    let message;
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("HTTP code: ", error.response.status);
        console.error("Response data: ", error.response.data);
        message = "Error: " + ((error.response.data.error) ? error.response.data.error : getErrorMessageByHttpCode(error.response.status));
    } else if (error.request) {
        // The request was made but no response was received (e.g. network timeout or backend unreachable)
        console.error("No response: ", error.request);
        message = logErrorMessage;
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Invalid request: ', error.message);
        message = logErrorMessage;
    }
    console.error(error.config);
    return message;
}

function getErrorMessageByHttpCode(httpCode) {
    return HTTP_ERROR_MESSAGES[httpCode] || HTTP_ERROR_MESSAGES.DEFAULT;
}

function createResult(result, error) {
    return {
        result: result,
        error: error
    }
}
