import { Notify } from 'quasar'

/**
 * Displays a notification message based on whether there's an error
 *
 * @param {boolean} hasError - If true, shows error notification; otherwise shows success
 * @param {string} successMessage - The message to display on success
 * @param {string} errorMessage - The message to display on error
 */
export function notify(hasError, successMessage, errorMessage) {
    Notify.create({
        message: (hasError) ? errorMessage : successMessage,
        timeout: (hasError) ? 0 : 2000,
        icon: (hasError) ? "report_problem" : "info",
        color: (hasError) ? "orange-6" : "blue-6",
        actions: [{icon: 'close', color: 'white'}]
    })
}

export function notifySuccess(message) {
    notify(false, message, '');
}

export function notifyError(message) {
    notify(true, '', message);
}
