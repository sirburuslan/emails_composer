/**
 * @class Checkbox
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Checkbox option
 */

// Import the Classes
import { AbstractOptions } from "../../../classes/classes.index.js";

// Import types
import {
    params_type,
    option_checkbox_type, 
    option_property_type, 
    events_type 
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Checkbox
    export class Checkbox extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_checkbox_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_checkbox_type): {template: string} {

            // Checked option
            let checked: string = (parseInt(option.value) > 0)?' checked':'';

            // Get iframe
            let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Verify if iframe exists
            if ( iframe ) {

                // Get content document
                let iframeDocument: Document | null = iframe.contentDocument;

                // Check if iframeDocument is not null
                if ( iframeDocument !== null ) {
                    
                    // Get the template
                    let template: Element | null = iframeDocument.getElementsByClassName('ec-composer-template')[0];

                    // Check for google analytics
                    if ( template.getAttribute('data-google-analytics') ) {

                        // Set check value
                        checked = (parseInt(template.getAttribute('data-google-analytics')!) > 0)?' checked':'';

                    }

                }

            }

            // Unique checkbox id
            let unique_id: number = Math.random();

            return {

                template: '<div>'
                    + '<h3>'
                        + option.text.label
                    + '</h3>'
                    + '<p>'
                        + option.text.description
                    + '</p>'                                        
                + '</div>'
                + '<div>'
                    + '<div class="ec-option-checkbox">'
                        + '<input type="checkbox" id="ec-option-checkbox-' + unique_id + '"' + checked + ' />'
                        + '<label for="ec-option-checkbox-' + unique_id + '"></label>'
                    + '</div>'  
                + '</div>'

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_checkbox_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_checkbox_type): option_property_type {
            return;
        }

        /**
         * Provides the supported events for a template
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (): events_type | undefined => {

            return [{
                action: 'change',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if is the settings modal exists
                        if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') ) {
                            e.preventDefault();

                            // Get iframe
                            let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Verify if iframe exists
                            if ( iframe ) {

                                // Get content document
                                let iframeDocument: Document | null = iframe.contentDocument;

                                // Check if iframeDocument is not null
                                if ( iframeDocument !== null ) {
                                    
                                    // Get the template
                                    let template: Element | null = iframeDocument.getElementsByClassName('ec-composer-template')[0];

                                    // Set utm source
                                    template.setAttribute('data-google-analytics', (target as HTMLInputElement).checked?'1':'0');

                                }

                            }

                        }

                    }

                },
                capture: false

            }];

        };

    }

}