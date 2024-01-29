/**
 * @class Direction
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Direction option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    show_message,
    update_property_value,
} from '../../../inc/inc.index.js';

// Import types
import {
    params_type,
    option_selector_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Direction
    export class Direction extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_selector_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_selector_type): {template: string} {

            // Items container
            let items: string = '<ul class="ec-option-selector-items">';

            // Verify if the option has items
            if ( option.items.length > 0 ) {

                // List the items
                for ( let item of option.items ) {

                    // Add item to the list
                    items += '<li>'
                        + '<a href="#" data-item="' + item.item_id + '">'
                            + item.item_name
                        + '</a>'
                    + '</li>';  

                }

            }

            // Close the list
            items += '</ul>';

            // Value container
            let value: string = option.value;

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {

                // Replace value
                value = option.custom;

            }

            // Verify if the menu is vertical
            if ( value === 'column' ) {

                // Replace the value
                value = params.words('vertical');

            } else if ( value === 'row' ) {

                // Replace the value
                value = params.words('horizontal');

            }

            // Prepare the item selector
            let selector: string = '<div class="ec-option-selector-dropdown">'
                + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                    + '<span>'
                        + value
                    + '</span>'
                    + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                + '</button>'
                + '<div class="ec-option-selector-menu">'
                    + items
                + '</div>'
            + '</div>';

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
                    + '<div class="ec-option-selector">'
                        + selector
                    + '</div>'
                + '</div>'

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_selector_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_selector_type): option_property_type {

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

                    // Save target
                    let target = e.target as Element;

                    // Check if the click is on the selector
                    if ( target.closest('.ec-option-selector-items') ) {
                        e.preventDefault();

                        // Get the selected item
                        let selected: string | null = target.textContent;

                        // Get the item's ID
                        let item_id: number | string | null = target.getAttribute('data-item');

                        // Verify if selected exists
                        if ( selected && item_id ) {

                            // Set selected text
                            target.closest('.ec-option-selector-dropdown')!.querySelector('.ec-button > span:first-child')!.textContent = selected;

                            // Get the option name
                            let option_name: string | null | undefined = target.closest('.ec-display-flex')?.getAttribute('data-option');

                            // Get the element's name
                            let element_name: string = target.closest('.ec-display-flex')?.getAttribute('data-element')?target.closest('.ec-display-flex')?.getAttribute('data-element') as string:'';

                            // Check if font exists
                            if ( option_name ) {

                                // Get the device type
                                let device = target!.closest('.ec-sections')!.getAttribute('data-scope') as string;

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

                                                // Get property
                                                let property: option_property_type = this.get_property(Resources.Options.Direction.saved_options[option_name + '_' + element_name]);    

                                                // Set property name
                                                let property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                // Update a property value
                                                let style_content: string = update_property_value(sheet, element_id, element_name, property_name, item_id, device);

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

                            }

                        }

                    }

                },
                capture: false
            }];

        };

    }

}