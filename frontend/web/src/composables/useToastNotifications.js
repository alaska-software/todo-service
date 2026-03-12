import {useToast} from 'primevue/usetoast';
import {UI_MESSAGES} from '@/constants/messages.js';

export function useToastNotifications() {
    const toast = useToast();

    const showError = (detail) => toast.add({
        severity: 'error',
        summary: UI_MESSAGES.TOAST_SUMMARY_ERROR,
        detail,
        life: 4000
    });

    const showSuccess = (summary, detail) => toast.add({
        severity: 'success',
        summary,
        detail,
        life: 3000
    });

    const showInfo = (summary, detail) => toast.add({
        severity: 'info',
        summary,
        detail,
        life: 3000
    });

    return {showError, showSuccess, showInfo};
}