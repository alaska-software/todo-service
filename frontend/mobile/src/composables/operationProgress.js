/**
 * Composable useOperationProgress()
 * Simple operation progress state management for async operations
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

import {computed, ref} from "vue";

/**
 * Creates a simple operation progress state tracker.
 * @example
 * const { isRunning, isDone } = useOperationProgress();
 * isRunning.value = true;  // mark operation as started
 * isRunning.value = false; // mark operation as finished
 */
export function useOperationProgress() {
    const isRunning = ref(false);
    const isDone = computed(() => !isRunning.value);

    return {
        isRunning,
        isDone
    }
}
