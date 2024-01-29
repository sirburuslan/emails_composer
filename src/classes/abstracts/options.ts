/**
 * @class Options
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an abstract class which provides rules to the options classes
 */

// Import types
import {
    params_type,
    option_number_type,
    option_selector_type,
    option_font_type,
    option_align_type,
    option_property_type,
    option_images_type,
    option_menu_type,
    option_icons_type, 
    option_list_type, 
    option_checkbox_type, 
    option_ai_type, 
    events_type
} from '../../resources/types/types.index.js';

// Abstracts
export namespace Abstracts {

    export abstract class Options {

        // Saved options
        public static saved_options: {[key: string]: option_number_type} = {};

        // Save the parameters
        public params: params_type;

        /**
         * Abstract Constructor
         * 
         * @param params_type params
         */        
        constructor (params: params_type) {
            this.params = params;
        }

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_number_type | option_selector_type | option_font_type option
         * 
         * @returns {template: string} | undefined as response
         */
        abstract prepare_template(params: params_type, option: option_number_type | option_selector_type | option_font_type | option_align_type | option_images_type | option_menu_type | option_icons_type | option_list_type | option_checkbox_type | option_ai_type): {template: string} | undefined;

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_number_type | option_selector_type | option_font_type option
         * 
         * @returns option_property_type as response
         */
        abstract prepare_property(params: params_type, option: option_number_type | option_selector_type | option_font_type | option_align_type | option_images_type | option_menu_type | option_icons_type | option_list_type | option_checkbox_type | option_ai_type): option_property_type;
        
        /**
         * Provides the supported events for a template
         * 
         * @returns events_type as response
         */        
        abstract get_events(params: params_type): events_type | undefined;

        /**
         * Get an option template
         * 
         * @param option_number_type option
         * 
         * @returns string | undefined with response
         */        
        get_option = (option: option_number_type): string | undefined => {

            // Prepare the option
            let obj: {template: string} | undefined = this.prepare_template(this.params, option);

            // Check if obj is not undefined
            if ( (typeof obj !== 'undefined') && (obj.template !== 'undefined') ) {

                // Element target
                let element: string = option?.element?' data-element="' + option?.element + '"':'';                

                // Save option
                Options.saved_options[option.name + '_' + element.replace(' data-element="', '').replace('"', '')] = option;

                return '<li class="ec-display-flex ec-justify-content-space-between" data-option="' + option.name + '"' + element + '>'
                    + obj.template                               
                + '</li>';

            }

        };

        /**
         * Get a css propery
         * 
         * @param option_number_type option
         * 
         * @returns option_property_type as response
         */        
        get_property = (option: option_number_type): option_property_type => {

            // Prepare the option
            return  this.prepare_property(this.params, option);

        };        

    }

}