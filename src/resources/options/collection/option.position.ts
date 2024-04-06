/**
 * @class Position
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Position option
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

    // Export the class Position
    export class Position extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_align_type): {template: string} {

            // Reset value
            option.value = option.value.replace('start', 'left').replace('end', 'right');

            // Left align active class
            let left: string = (option.value === 'left')?' ec-option-position-active-button':'';

            // Center align active class
            let center: string = (option.value === 'center')?' ec-option-position-active-button':'';

            // Right align active class
            let right: string = (option.value === 'right')?' ec-option-position-active-button':'';

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {

                // Reset custom
                option.custom = option.custom.replace('start', 'left').replace('end', 'right');

                // Replace left with left align active class
                left = (option.custom === 'left')?' ec-option-position-active-button':'';

                // Center align active class
                center = (option.custom === 'center')?' ec-option-position-active-button':'';

                // Right align active class
                right = (option.custom === 'right')?' ec-option-position-active-button':'';

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
                    + '<div class="ec-option-position">'
                        + '<button type="button" class="ec-button ec-option-position-button' + left + '" data-direction="left">'
                            + params.icons('align_justify_flex_start')
                        + '</button>'
                        + '<button type="button" class="ec-button ec-option-position-button' + center + '" data-direction="center">'
                            + params.icons('align_justify_center')
                        + '</button>'
                        + '<button type="button" class="ec-button ec-option-position-button' + right + '" data-direction="right">'
                            + params.icons('align_justify_flex_end')
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
                const property: option_property_type = {
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
                    const target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-position exists
                        if ( target.closest('.ec-option-position') ) {

                            // Remove the ec-option-position-active-button class
                            target.closest('.ec-option-position')!.getElementsByClassName('ec-option-position-active-button')[0].classList.remove('ec-option-position-active-button')

                            // Add the ec-option-position-active-button class
                            target.classList.add('ec-option-position-active-button');

                            // Get the option name
                            const option_name: string | null | undefined = target.closest('li')?.getAttribute('data-option');

                            // Get the element's name
                            const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                            // Check if option name exists
                            if ( option_name ) {

                                // Check if is in the elements options
                                if ( target.closest('.ec-composer-element-options') ) {

                                    // Get the device type
                                    const device = target.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                    // Get property
                                    const property: option_property_type = this.get_property(Resources.Options.Position.saved_options[option_name + '_' + element_name]);                                        

                                    // Verify if the option is saved
                                    if ( (typeof Resources.Options.Position.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                        // Get the element's id
                                        const element_id: string | null | undefined = target.closest('.ec-composer-element-options')?.getAttribute('data-element');

                                        // Check if element's id exists
                                        if ( element_id ) {

                                            // Get iframe
                                            const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                            // Verify if iframe exists
                                            if ( iframe ) {

                                                // Get content document
                                                const iframeDocument: Document | null = iframe.contentDocument;

                                                // Check if iframeDocument is not null
                                                if ( iframeDocument !== null ) {

                                                    // Get the style tag
                                                    const style: HTMLStyleElement | null = iframeDocument.head.querySelector('style[data-element="' + element_id + '"]');

                                                    // Check if style exists
                                                    if ( style !== null ) {

                                                        // Get the sheet
                                                        const sheet: CSSStyleSheet | null = style.sheet;

                                                        // Set property name
                                                        const property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                        // Update a property value
                                                        const style_content: string = update_property_value(sheet, element_id, element_name, property_name, target.getAttribute('data-direction')!, device);

                                                        // Set style
                                                        style.innerHTML = style_content;

                                                        // Init the backup class
                                                        const backup = new Classes.Backup();

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

                                } else if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') ) {

                                    // Get property
                                    const property: option_property_type = this.get_property(Resources.Options.Position.saved_options[option_name + '_' + element_name]);                                        

                                    // Verify if the option is saved
                                    if ( (typeof Resources.Options.Position.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                        // Get iframe
                                        const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                        // Verify if iframe exists
                                        if ( iframe ) {

                                            // Get content document
                                            const iframeDocument: Document | null = iframe.contentDocument;

                                            // Check if iframeDocument is not null
                                            if ( iframeDocument !== null ) {

                                                // Get the style tag
                                                const style: HTMLStyleElement | null = iframeDocument.head.querySelector('style[data-scope="default"]');

                                                // Check if style exists
                                                if ( style !== null ) {

                                                    // Get the sheet
                                                    const sheet: CSSStyleSheet | null = style.sheet;

                                                    // Set property name
                                                    const property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                    // Update a property value
                                                    const style_content: string = update_property_value(sheet, '', element_name, property_name, target.getAttribute('data-direction')!, '');

                                                    // Set style
                                                    style.innerHTML = style_content;

                                                    // Init the backup class
                                                    const backup = new Classes.Backup();

                                                    // Save backup
                                                    backup.update_default_css(this.params, style_content);

                                                    // Remove the class ec-composer-template-left, ec-composer-template-center and ec-composer-template-right
                                                    iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.remove('ec-composer-template-left');
                                                    iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.remove('ec-composer-template-center');
                                                    iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.remove('ec-composer-template-right');

                                                    // Verify if direction is left
                                                    if ( target.getAttribute('data-direction')! === 'left' ) {

                                                        // Add class ec-composer-template-left
                                                        iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.add('ec-composer-template-left');

                                                    } else if ( target.getAttribute('data-direction')! === 'center' ) {

                                                        // Add class ec-composer-template-center
                                                        iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.add('ec-composer-template-center');

                                                    } else if ( target.getAttribute('data-direction')! === 'right' ) {

                                                        // Add class ec-composer-template-right
                                                        iframeDocument.getElementsByClassName('ec-composer-template')[0].classList.add('ec-composer-template-right');

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

                    }

                },
                capture: false

            }];

        };

    }

}