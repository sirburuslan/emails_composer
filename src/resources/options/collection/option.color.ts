/**
 * @class Color
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Color option
 */

// Import the Options Abstract
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";   

// Import inc
import {
    show_message,
    update_property_value
} from '../../../inc/inc.index.js';

// Import types
import {
    params_type,
    option_property_type,
    option_color_type,
    events_type
} from '../../types/types.index.js';

// Import plugins
import Plugins from '../../../plugins/plugins.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Color
    export class Color extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_color_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_color_type): {template: string} {

            // Prepare the value
            let value: string = (typeof option.value === 'string')?option.value:'#FFFFFF';

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {
                
                // Initialize the Color class
                const color = new Plugins.Color();

                // Set validation rules
                const is_valid: any = option.custom.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
                
                // Verify if the rgba is valid
                if ( is_valid ) {

                    // Extract the rgba
                    const [, r, g, b, a] = is_valid.map(Number);

                    // Convert to hex color
                    const hex: string = color.convert_rgb_to_hex(r, g, b, a || 1);
                    
                    // Verify if hex exists
                    if ( hex ) {

                        // Set value
                        value = hex;

                    }
                    
                }

            }

            // Set the element
            const element: string = (option.element !== '')?' data-element="' + option.element + '"':'';

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
                    + '<div class="ec-button-color"' + element + '>'
                        + '<button type="button" style="--bgcolor: ' + value + ';" data-color="' + value + '"></button>'
                    + '</div>'
                + '</div>'
                
            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_color_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_color_type): option_property_type {

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
         * @param params_type params
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (params: params_type): events_type | undefined => {

            // Create the events
            return [{
                action: 'mousedown',
                target: (e: MouseEvent): void => {

                    // Save target
                    const target = e.target as HTMLElement;

                    // Check for target
                    if ( target !== null ) {

                        // Verify if mouse is over ec-color-opacity-filter
                        if ( target.closest('.ec-button-color') && target.closest('.ec-composer-options-list') && !target.closest('.ec-option-social') ) {
                            e.preventDefault();

                            // Add color box
                            new Plugins.Color().add_color_box(e, params);

                            // Check if is in the elements options
                            if ( target.closest('.ec-composer-element-options') && target.closest('.ec-composer-element-options') ) {

                                // Get the element's ID
                                const element_id: string | null = target.closest('.ec-composer-element-options')!.getAttribute('data-element');

                                // Get iframe
                                const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    const iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get the active elements
                                        const elements: HTMLCollectionOf<Element> = iframeDocument.getElementsByClassName('ec-element-content-active');

                                        // Check if active elements exists
                                        if ( elements.length > 0 ) {

                                            // Set a pause
                                            setTimeout((): void => {

                                                // Monitor the color change
                                                Classes.Observer.monitor_element('option_color', target, {attributes: true}, (mutations: MutationRecord[]) => {

                                                    // List the mutations
                                                    for (const mutation of mutations) {

                                                        // Verify if the change is for data-color
                                                        if (mutation.attributeName === 'data-color') {

                                                            // Get target
                                                            const mutation_target = (mutation.target.nodeName === '#text')?mutation.target.parentElement:mutation.target as HTMLElement;

                                                            // Get the device type
                                                            const device = mutation_target!.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                                            // Get the option name
                                                            const option_name: string | null | undefined = mutation_target?.closest('li')?.getAttribute('data-option');

                                                            // Get the element's name
                                                            const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                                            // Check if option name exists
                                                            if ( option_name ) {

                                                                // Get property
                                                                const property: option_property_type = this.get_property(Resources.Options.Color.saved_options[option_name + '_' + element_name]); 

                                                                // Get color
                                                                const color = target.getAttribute('data-color') as string;

                                                                // Get the style tag
                                                                const style: HTMLStyleElement | null = iframeDocument!.head.querySelector('style[data-element="' + element_id + '"]');

                                                                // Check if style exists
                                                                if ( style !== null ) {

                                                                    // Get the sheet
                                                                    const sheet: CSSStyleSheet | null = style.sheet;

                                                                    // Set property name
                                                                    const property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                                    // Set the element name
                                                                    const element_name: string | null = target.closest('.ec-button-color')!.getAttribute('data-element')?target.closest('.ec-button-color')!.getAttribute('data-element'):'';

                                                                    // Update a property value
                                                                    const style_content: string = update_property_value(sheet, element_id!, element_name!, property_name, color, device);

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

                                                });

                                            }, 300);

                                        }

                                    }

                                }

                            } else if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') ) {

                                // Get iframe
                                const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    const iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Set a pause
                                        setTimeout((): void => {

                                            // Monitor the color change
                                            Classes.Observer.monitor_element('option_color', target, {attributes: true}, (mutations: MutationRecord[]) => {

                                                // List the mutations
                                                for (const mutation of mutations) {

                                                    // Verify if the change is for data-color
                                                    if (mutation.attributeName === 'data-color') {

                                                        // Get target
                                                        const mutation_target = (mutation.target.nodeName === '#text')?mutation.target.parentElement:mutation.target as HTMLElement;

                                                        // Get the device type
                                                        const device = mutation_target!.closest('.ec-sections')!.getAttribute('data-scope') as string;

                                                        // Get the option name
                                                        const option_name: string | null | undefined = mutation_target?.closest('li')?.getAttribute('data-option');

                                                        // Get the element's name
                                                        const element_name: string = target.closest('li')?.getAttribute('data-element')?target.closest('li')?.getAttribute('data-element') as string:'';

                                                        // Check if option name exists
                                                        if ( option_name ) {

                                                            // Get property
                                                            const property: option_property_type = this.get_property(Resources.Options.Color.saved_options[option_name + '_' + element_name]); 

                                                            // Get color
                                                            const color = target.getAttribute('data-color') as string;

                                                            // Get the style tag
                                                            const style: HTMLStyleElement | null = iframeDocument!.head.querySelector('style[data-scope="default"]');

                                                            // Check if style exists
                                                            if ( style !== null ) {

                                                                // Get the sheet
                                                                const sheet: CSSStyleSheet | null = style.sheet;

                                                                // Set property name
                                                                const property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                                // Update a property value
                                                                const style_content: string = update_property_value(sheet, '', element_name!, property_name, color, device);

                                                                // Set style
                                                                style.innerHTML = style_content;

                                                                // Verify if element name is .ec-composer-template
                                                                if ( element_name === '.ec-composer-template' ) {

                                                                    // Set background color
                                                                    (params.selector.getElementsByClassName('ec-composer-container')[0] as HTMLElement).style.backgroundColor = color;

                                                                }

                                                                // Init the backup class
                                                                const backup = new Classes.Backup();

                                                                // Save backup
                                                                backup.update_default_css(this.params, style_content);

                                                            }

                                                        }

                                                    }

                                                }

                                            });

                                        }, 300);

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