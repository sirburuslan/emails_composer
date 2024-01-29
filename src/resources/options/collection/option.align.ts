/**
 * @class Align
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Align option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    show_message,
    update_property_value
} from '../../../inc/inc.index.js';

// Import types
import { 
    params_type, 
    option_align_type, 
    option_property_type, 
    events_type 
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Align
    export class Align extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_align_type): {template: string} {

            // Left align active class
            let left: string = (option.value === 'left')?' ec-option-align-active-button':'';

            // Center align active class
            let center: string = (option.value === 'center')?' ec-option-align-active-button':'';

            // Right align active class
            let right: string = (option.value === 'right')?' ec-option-align-active-button':'';

            // Justify align active class
            let justify: string = (option.value === 'justify')?' ec-option-align-active-button':'';

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {

                // Replace left with left align active class
                left = (option.custom === 'left')?' ec-option-align-active-button':'';

                // Center align active class
                center = (option.custom === 'center')?' ec-option-align-active-button':'';

                // Right align active class
                right = (option.custom === 'right')?' ec-option-align-active-button':'';

                // Justify align active class
                justify = (option.custom === 'justify')?' ec-option-align-active-button':'';

            }
            
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
                    + '<div class="ec-option-align">'
                        + '<button type="button" class="ec-button ec-option-align-button' + left + '" data-direction="left">'
                            + params.icons('format_align_left')
                        + '</button>'
                        + '<button type="button" class="ec-button ec-option-align-button' + center + '" data-direction="center">'
                            + params.icons('format_align_center')
                        + '</button>'
                        + '<button type="button" class="ec-button ec-option-align-button' + right + '" data-direction="right">'
                            + params.icons('format_align_right')
                        + '</button>'
                        + '<button type="button" class="ec-button ec-option-align-button' + justify + '" data-direction="justify">'
                            + params.icons('format_align_justify')
                        + '</button>'
                    + '</div>'
                + '</div>'

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_align_type): option_property_type {

            // Verify if option.name exists
            if ( typeof option.name === 'undefined' ) {

                // Show error message
                show_message(params.words('error_name') + ': ' + params.words('option_invalid_parameters'));

            } else {

                // Create the property
                let property: option_property_type = {
                    element_name: (typeof option.element === 'string')?option.element:''
                };

                // Set name
                property[option.name] = option.value;

                return property;

            }

        }

        /**
         * Provides the supported events for a template
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (): events_type | undefined => {

            return [{
                action: 'click',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-align exists
                        if ( target.closest('.ec-option-align') ) {

                            // Remove the ec-option-align-active-button class
                            target.closest('.ec-option-align')!.getElementsByClassName('ec-option-align-active-button')[0].classList.remove('ec-option-align-active-button')

                            // Add the ec-option-align-active-button class
                            target.classList.add('ec-option-align-active-button');

                            // Get the option name
                            let option_name: string | null | undefined = target.closest('li')?.getAttribute('data-option');

                            // Get the element's name
                            let element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                            // Check if option name exists
                            if ( option_name ) {

                                // Get the device type
                                let device = target.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                // Get property
                                let property: option_property_type = this.get_property(Resources.Options.Align.saved_options[option_name + '_' + element_name]);                                        

                                // Verify if the option is saved
                                if ( (typeof Resources.Options.Align.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                    // Get the element's id
                                    let element_id: string | null | undefined = target.closest('.ec-composer-element-options')?.getAttribute('data-element');

                                    // Check if element's id exists
                                    if ( element_id ) {

                                        // Get iframe
                                        let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                        // Verify if iframe exists
                                        if ( iframe ) {

                                            // Get content document
                                            let iframeDocument: Document | null = iframe.contentDocument;

                                            // Check if iframeDocument is not null
                                            if ( iframeDocument !== null ) {

                                                // Get the style tag
                                                let style: HTMLStyleElement | null = iframeDocument.head.querySelector('style[data-element="' + element_id + '"]');

                                                // Check if style exists
                                                if ( style !== null ) {

                                                    // Get the sheet
                                                    let sheet: CSSStyleSheet | null = style.sheet;

                                                    // Set property name
                                                    let property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                    // Update a property value
                                                    let style_content: string = update_property_value(sheet, element_id, element_name, property_name, target.getAttribute('data-direction')!, device);

                                                    // Set style
                                                    style.innerHTML = style_content;

                                                    // Init the backup class
                                                    let backup = new Classes.Backup();

                                                    // Save backup
                                                    backup.update_css_element_id(element_id!, this.params, style_content);

                                                }

                                            }

                                        }

                                    }

                                } else {

                                    // Show error message
                                    show_message(this.params.words('error_name') + ': ' + this.params.words('option_not_found'));
                                    
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