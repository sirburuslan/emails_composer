/**
 * @file Rows
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Rows tab
 */

// Export the rows
export function rows(params: any): string {

    return '<div role="ec-tab" class="ec-tab" id="ec-tab-rows-' + params.template_id + '"></div>';

}