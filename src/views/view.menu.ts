/**
 * @file Menu
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Menu view
 */

// Import all types
import { params_type } from '../resources/types/types.index.js';

// Export menu
export function menu(params: params_type): string {

    return '<aside class="ec-composer-menu ec-position-absolute ec-position-left">'
        + '<ul class="ec-composer-nav">'
            + '<li class="ec-composer-nav-item">'
                + '<a href="#ec-tab-elements-' + params.template_id + '" class="ec-composer-nav-link ec-composer-nav-link-active" data-scope="elements">'
                    + params.icons('layers')
                + '</a>'
            + '</li>'
            + '<li class="ec-composer-nav-item">'
                + '<a href="#ec-tab-rows-' + params.template_id + '" class="ec-composer-nav-link" data-scope="structures">'
                    + params.icons('design_services')
                + '</a>'
            + '</li>'
            + '<li class="ec-composer-nav-item">'
                + '<a href="#ec-tab-modules-' + params.template_id + '" class="ec-composer-nav-link" data-scope="modules">'
                    + params.icons('dashboard_customize')
                + '</a>'
            + '</li>'
            + '<li class="ec-composer-nav-item">'
                + '<a href="#ec-tab-history-' + params.template_id + '" class="ec-composer-nav-link" data-scope="history">'
                    + params.icons('history')
                + '</a>'
            + '</li>'                                                                         
        + '</ul>'
    + '</aside>';

}