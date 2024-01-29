/**
 * @file History
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the History tab
 */

// Export the history
export function history(params: any): string {

    return '<div role="ec-tab" class="ec-tab" id="ec-tab-history-' + params.template_id + '"></div>';

}