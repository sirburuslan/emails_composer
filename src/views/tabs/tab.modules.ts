/**
 * @file Modules
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Modules tab
 */

// Export the modules
export function modules(params: any): string {

    return '<div role="ec-tab" class="ec-tab" id="ec-tab-modules-' + params.template_id + '"></div>';

}