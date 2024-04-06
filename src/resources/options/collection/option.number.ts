/**
 * @class Number
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Number option
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
    option_number_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace the Options
export namespace Resources.Options {

    // Export the class Number
    export class Number extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_number_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_number_type): {template: string} {

            // Prepare the value
            let value: string | number = ((typeof option.value === 'string') || (typeof option.value === 'number'))?option.value:0;

            // Prepare the unit
            let unit: string | number = ((typeof option.unit === 'string') || (typeof option.unit === 'number'))?' ' + params.words('unit') + ': ' + option.unit:'';

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {

                // Verify if custom is a number
                if ( (option.custom as string).replace(/[\D]+/g, "") !== '' ) {

                    // Replace value
                    value = (option.custom as string).replace(/[\D]+/g, "");

                    // Check if unit exists
                    if ( (option.custom as string).replace(value, '') ) {

                        // Replace unit
                        unit = ' ' + params.words('unit') + ': ' + (option.custom as string).replace(value, '');

                    }

                }

            }

            // Unique checkbox id
            const unique_id: number = Math.random();

            return {

                template: '<div>'
                    + '<h3>'
                        + option.text.label
                    + '</h3>'
                    + '<p>'
                        + option.text.description
                        + unit
                    + '</p>'                                        
                + '</div>'
                + '<div>'
                    + '<div class="ec-option-input-buttons-group">'
                        + '<button type="button" class="ec-option-input-button-decrease">'
                            + params.icons('remove')
                        + '</button>'
                        + '<input type="number" value="' + value + '" id="ec-composer-number-' + unique_id + '-input">'
                        + '<button type="button" class="ec-option-input-button-increase">'
                            + params.icons('add')
                        + '</button>'
                    + '</div>'
                + '</div>'

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_number_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_number_type): option_property_type {

            // Verify if option.name exists
            if ( typeof option.name === 'undefined' ) {

                // Show error message
                show_message(params.words('error_name') + ': ' + params.words('option_invalid_parameters'));

            } else {

                // Create the property
                const property: option_property_type = {
                    element_name: (typeof option.element === 'string')?option.element:''
                };

                // Set unit
                const unit: string = (typeof option.unit !== 'undefined')?option.unit:'';

                // Set name
                property[option.name] = option.value + unit;

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
                action: 'input',
                target: (e: MouseEvent): void => {

                    // Get target
                    const target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if is in the elements options
                        if ( target.closest('.ec-composer-element-options') && target.closest('.ec-option-input-buttons-group') && (target.getAttribute('type') === 'number') ) {

                            // Get the buttons group
                            const buttons_group: HTMLElement | null = target.closest('.ec-option-input-buttons-group');

                            // Get input
                            const input: HTMLCollectionOf<HTMLInputElement> | undefined = buttons_group?.getElementsByTagName('input');

                            // Check if input is not undefined
                            if ( input !== undefined ) {

                                // Get value
                                const value: string | undefined = input[0].value;

                                // Check if value exists
                                if ( value !== undefined ) {

                                    // Get the option name
                                    const option_name: string | null | undefined = buttons_group?.closest('li')?.getAttribute('data-option');

                                    // Get the element's name
                                    const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                    // Check if option name exists
                                    if ( option_name ) {

                                        // Get the device type
                                        const device = buttons_group?.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                        // Get property
                                        const property: option_property_type = this.get_property(Resources.Options.Number.saved_options[option_name + '_' + element_name]);                                        

                                        // Verify if the option is saved
                                        if ( (typeof Resources.Options.Number.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                            // Get the element's id
                                            const element_id: string | null | undefined = target.closest('.ec-composer-element-options')?.getAttribute('data-element');

                                            // Turn value to number
                                            const anumber: number = parseInt(value);

                                            // Get the unit
                                            const aunit: string = value.replace(anumber.toString(), '')?value.replace(anumber.toString(), ''):Resources.Options.Number.saved_options[option_name + '_' + element_name].unit;

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
                                                            const style_content: string = update_property_value(sheet, element_id, element_name, property_name, anumber + aunit, device);

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

                                    }

                                }

                            }

                        } else if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') ) {

                            // Get the buttons group
                            const buttons_group: HTMLElement | null = target.closest('.ec-option-input-buttons-group');

                            // Get input
                            const input: HTMLCollectionOf<HTMLInputElement> | undefined = buttons_group?.getElementsByTagName('input');

                            // Check if input is not undefined
                            if ( input !== undefined ) {

                                // Get value
                                const value: string | undefined = input[0].value;

                                // Check if value exists
                                if ( value !== undefined ) {

                                    // Get the option name
                                    const option_name: string | null | undefined = buttons_group?.closest('li')?.getAttribute('data-option');

                                    // Get the element's name
                                    const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                    // Check if option name exists
                                    if ( option_name ) {

                                        // Get the device type
                                        const device = '';

                                        // Get property
                                        const property: option_property_type = this.get_property(Resources.Options.Number.saved_options[option_name + '_' + element_name]);                                        

                                        // Verify if the option is saved
                                        if ( (typeof Resources.Options.Number.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                            // Turn value to number
                                            const anumber: number = parseInt(value);

                                            // Get the unit
                                            const aunit: string = value.replace(anumber.toString(), '')?value.replace(anumber.toString(), ''):Resources.Options.Number.saved_options[option_name + '_' + element_name].unit;

                                            // Verify if the number should be increased
                                            if ( target.classList.contains('ec-option-input-button-increase') ) {

                                                // New value
                                                const new_value: number = anumber;
                                                
                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            } else {

                                                // New value
                                                const new_value: number = anumber;

                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            }

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
                                                        const style_content: string = update_property_value(sheet, '', element_name, property_name, anumber + aunit, device);

                                                        // Set style
                                                        style.innerHTML = style_content;

                                                        // Init the backup class
                                                        const backup = new Classes.Backup();

                                                        // Save backup
                                                        backup.update_default_css(this.params, style_content);

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

                    }

                },
                capture: false

            }, {
                action: 'click',
                target: (e: MouseEvent): void => {

                    // Get target
                    const target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if is in the elements options
                        if ( target.closest('.ec-composer-element-options') && target.closest('.ec-option-input-buttons-group') && (target.nodeName === 'BUTTON') ) {

                            // Get the buttons group
                            const buttons_group: HTMLElement | null = target.closest('.ec-option-input-buttons-group');

                            // Get input
                            const input: HTMLCollectionOf<HTMLInputElement> | undefined = buttons_group?.getElementsByTagName('input');

                            // Check if input is not undefined
                            if ( input !== undefined ) {

                                // Get value
                                const value: string | undefined = input[0].value;

                                // Check if value exists
                                if ( value !== undefined ) {

                                    // Get the option name
                                    const option_name: string | null | undefined = buttons_group?.closest('li')?.getAttribute('data-option');

                                    // Get the element's name
                                    const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                    // Check if option name exists
                                    if ( option_name ) {

                                        // Get the device type
                                        const device = buttons_group?.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                        // Get property
                                        const property: option_property_type = this.get_property(Resources.Options.Number.saved_options[option_name + '_' + element_name]);                                        

                                        // Verify if the option is saved
                                        if ( (typeof Resources.Options.Number.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                            // Get the element's id
                                            const element_id: string | null | undefined = target.closest('.ec-composer-element-options')?.getAttribute('data-element');

                                            // Turn value to number
                                            let anumber: number = parseInt(value);

                                            // Get the unit
                                            const aunit: string = value.replace(anumber.toString(), '')?value.replace(anumber.toString(), ''):Resources.Options.Number.saved_options[option_name + '_' + element_name].unit;

                                            // Verify if the number should be increased
                                            if ( target.classList.contains('ec-option-input-button-increase') ) {

                                                // New value
                                                const new_value: number = anumber = (anumber + 1);
                                                
                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            } else {

                                                // New value
                                                const new_value: number = anumber = (anumber - 1);

                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            }

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
                                                            const style_content: string = update_property_value(sheet, element_id, element_name, property_name, anumber + aunit, device);

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

                                    }

                                }

                            }

                        } else if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') && (target.nodeName === 'BUTTON') ) {

                            // Get the buttons group
                            const buttons_group: HTMLElement | null = target.closest('.ec-option-input-buttons-group');

                            // Get input
                            const input: HTMLCollectionOf<HTMLInputElement> | undefined = buttons_group?.getElementsByTagName('input');

                            // Check if input is not undefined
                            if ( input !== undefined ) {

                                // Get value
                                const value: string | undefined = input[0].value;

                                // Check if value exists
                                if ( value !== undefined ) {

                                    // Get the option name
                                    const option_name: string | null | undefined = buttons_group?.closest('li')?.getAttribute('data-option');

                                    // Get the element's name
                                    const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                    // Check if option name exists
                                    if ( option_name ) {

                                        // Get the device type
                                        const device = '';

                                        // Get property
                                        const property: option_property_type = this.get_property(Resources.Options.Number.saved_options[option_name + '_' + element_name]);                                        

                                        // Verify if the option is saved
                                        if ( (typeof Resources.Options.Number.saved_options[option_name + '_' + element_name] !== 'undefined') && (property !== undefined) && (property !== null) ) {

                                            // Turn value to number
                                            let anumber: number = parseInt(value);

                                            // Get the unit
                                            const aunit: string = value.replace(anumber.toString(), '')?value.replace(anumber.toString(), ''):Resources.Options.Number.saved_options[option_name + '_' + element_name].unit;

                                            // Verify if the number should be increased
                                            if ( target.classList.contains('ec-option-input-button-increase') ) {

                                                // New value
                                                const new_value: number = anumber = (anumber + 1);
                                                
                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            } else {

                                                // New value
                                                const new_value: number = anumber = (anumber - 1);

                                                // Save new value
                                                Resources.Options.Number.saved_options[option_name + '_' + element_name].value = new_value;

                                                // Increase the number
                                                input[0].value = new_value.toString();

                                            }

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
                                                        const style_content: string = update_property_value(sheet, '', element_name, property_name, anumber + aunit, device);

                                                        // Set style
                                                        style.innerHTML = style_content;

                                                        // Init the backup class
                                                        const backup = new Classes.Backup();

                                                        // Save backup
                                                        backup.update_default_css(this.params, style_content);

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

                    }

                },
                capture: false

            }];

        };

    }

}