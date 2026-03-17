import {date} from "quasar";

/**
 * Formats the given ISO date string into a specific format.
 * The output format is "DD.MM.YYYY HH:mm".
 *
 * @param {string} isoDate - The ISO 8601 date string to be formatted.
 * @return {string} The formatted date string in the "DD.MM.YYYY HH:mm" format.
 */
export function formatDate(isoDate) {
    return date.formatDate(Date.parse(isoDate), "DD.MM.YYYY HH:mm");
}
