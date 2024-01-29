/**
 * @file Elements
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Elements tab
 */

// Export the elements
export function elements(params: any): string {

    return '<div role="ec-tab" class="ec-tab ec-tab-show" id="ec-tab-elements-' + params.template_id + '"></div>';

}