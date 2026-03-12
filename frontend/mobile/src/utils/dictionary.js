/**
 * Dictionary utilities for todo item states and priorities
 * Maps state and priority IDs to their display attributes (colors, icons)
 * @copyright Alaska Software Inc. (c) 2026. All rights reserved.
 */

// State display attributes: color and icon for each state
const STATE_ATTRIBUTES = {
    "NE": {id: "NE", color: "blue-5", icon: "content_paste"},
    "PE": {id: "PE", color: "orange-5", icon: "pending_actions"},
    "IP": {id: "IP", color: "blue-5", icon: "rowing"},
    "DO": {id: "DO", color: "green-5", icon: "task_alt"},
    "UN": {id: "UN", color: "grey-5", icon: "help_outline"}
};

// Priority display attributes: color for each priority
const PRIORITY_ATTRIBUTES = {
    "A+": {id: "A+", color: "red-5"},
    "AA": {id: "AA", color: "orange-5"},
    "BB": {id: "BB", color: "green-5"},
    "CC": {id: "CC", color: "blue-5"},
    "C-": {id: "C-", color: "blue-5"},
    "UN": {id: "UN", color: "grey-5"}
};

/**
 * Gets the display attributes for a given state ID
 *
 * @param {string} stateId - The state ID (e.g., "NE", "PE", "IP", "DO")
 * @return {Object} An object with id, color, and icon. Returns "UN" (unknown) if state not found
 */
export function getStateAttributes(stateId) {
    return STATE_ATTRIBUTES[stateId] || STATE_ATTRIBUTES["UN"];
}

/**
 * Gets the display attributes for a given priority ID
 *
 * @param {string} priorityId - The priority ID (e.g., "A+", "AA", "BB", "CC", "C-")
 * @return {Object} An object with id and color. Returns "UN" (unknown) if priority not found
 */
export function getPriorityAttributes(priorityId) {
    return PRIORITY_ATTRIBUTES[priorityId] || PRIORITY_ATTRIBUTES["UN"];
}
