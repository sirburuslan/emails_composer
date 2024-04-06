/**
 * @class Font
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Font option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    show_message,
    update_property_value,
    get_all_fonts
} from '../../../inc/inc.index.js';

// Import the fonts
import * as fonts from '../../../resources/fonts/fonts.index.js';

// Import types
import {
    params_type,
    option_font_type,
    option_property_type,
    events_type,
    font_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Font
    export class Font extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_font_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_font_type): {template: string} {

            // Selected font family
            let font_family: string = params.words('font_family');

            // Verify if custom exists
            if ( typeof option.custom === 'string' ) {

                // Get the fonts list
                const fonts_list: font_type[] = Object.values(fonts);

                // Check if the font exists
                const font: font_type | undefined = fonts_list.find(item => item.property.replaceAll('"', '').replaceAll("'", '') === (option.custom as string).replaceAll('"', '').replaceAll("'", ''));

                // Verify if font exists
                if ( typeof font !== 'undefined' ) {

                    // Set font's family
                    font_family = font!.name;

                    // Set a pause
                    setTimeout((): void => {

                        // Get the weight option
                        const font_weight: Element | null = params.selector.querySelector('.ec-composer-options-list li[data-option="font_weight"]');

                        // Verify if the font weight exists
                        if ( font_weight ) {

                            // Items container
                            let items: string = '';

                            // List the weights
                            for ( const weight of font!.weight ) {

                                // Add item to the list
                                items += '<li>'
                                    + '<a href="#" data-item="' + weight + '">'
                                        + weight
                                    + '</a>'
                                + '</li>';  

                            }

                            // Add font's weight options
                            font_weight.getElementsByClassName('ec-option-selector-items')[0].innerHTML = items;

                        }

                    }, 300);

                }

            } else if ( option.value !== '' ) {

                // Get the fonts list
                const fonts_list: font_type[] = Object.values(fonts);

                // Check if the font exists
                const font: font_type | undefined = fonts_list.find(item => item.slug === option.value);

                // Verify if font exists
                if ( typeof font !== 'undefined' ) {

                    // Set font's family
                    font_family = font!.name;

                }

            }

            // Prepare the font selector
            const selector: string = '<div class="ec-option-selector-dropdown">'
                + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                    + '<span>'
                        + font_family
                    + '</span>'
                    + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                + '</button>'
                + '<div class="ec-option-selector-menu">'
                    + get_all_fonts()
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
         * @param option_font_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_font_type): option_property_type {

            // Verify if option.name exists
            if ( typeof option.name === 'undefined' ) {

                // Show error message
                show_message(params.words('error_name') + ': ' + params.words('option_invalid_parameters'));

            } else {

                // Create the property
                const property: option_property_type = {
                    element_name: (typeof option.element === 'string')?option.element:''
                };

                // Selected font family
                let font_family: string = '';

                // Verify if font exists in option
                if ( option.value !== '' ) {

                    // Get the fonts list
                    const fonts_list: font_type[] = Object.values(fonts);

                    // Check if the font exists
                    const font: font_type | undefined = fonts_list.find(item => item.slug === option.value);

                    // Verify if font exists
                    if ( typeof font!.name !== 'undefined' ) {

                        // Set font's family
                        font_family = font!.property;

                    }

                }

                // Set name
                property[option.name] = font_family;

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
                    const target = e.target as Element;

                    // Check if the click is on the selector
                    if ( target.closest('.ec-option-selector-dropdown') && target.classList.contains('ec-button') ) {
                        e.preventDefault();

                        // Get the dropdown
                        const dropdown: Element | null = target.closest('.ec-option-selector-dropdown');

                        // Check if dropdown exists
                        if ( dropdown ) {

                            // Set pause
                            setTimeout((): void => {

                                // Add ec-option-selector-dropdown-show class
                                dropdown?.classList.add('ec-option-selector-dropdown-show');

                            }, 100);

                        }

                    } else if ( target.closest('.ec-option-selector-menu') && target.closest('.ec-fonts') ) {
                        e.preventDefault();

                        // Get the selected item
                        const selected: string | null = target.textContent;

                        // Verify if selected exists
                        if ( selected ) {

                            // Set selected text
                            target.closest('.ec-option-selector-dropdown')!.querySelector('.ec-button > span:first-child')!.textContent = selected;

                            // Get the selected font's slug
                            const selected_font: string | null | undefined = target.getAttribute('data-font');

                            // Get the fonts list
                            const fonts_list: font_type[] = Object.values(fonts);

                            // Check if the font exists
                            const font: font_type | undefined = fonts_list.find(item => item.slug === selected_font);

                            // Get the option name
                            const option_name: string | null | undefined = target.closest('.ec-display-flex')?.getAttribute('data-option');

                            // Get the element's name
                            const element_name: string = target.closest('.ec-display-flex')?.getAttribute('data-element')?target.closest('.ec-display-flex')?.getAttribute('data-element') as string:'';

                            // Check if font exists
                            if ( (typeof font !== 'undefined') && option_name ) {

                                // Get the device type
                                const device = target!.closest('.ec-sections')!.getAttribute('data-scope') as string;

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

                                                // Get property
                                                const property: option_property_type = this.get_property(Resources.Options.Font.saved_options[option_name + '_' + element_name]);    

                                                // Set property name
                                                const property_name: string = (Object.keys(property!)[0] === 'element_name')?Object.keys(property!)[1].replaceAll('_', '-'):Object.keys(property!)[0].replaceAll('_', '-');

                                                // Update a property value
                                                const style_content: string = update_property_value(sheet, element_id, element_name, property_name, font.property, device);

                                                // Set style
                                                style.innerHTML = style_content;

                                                // Init the backup class
                                                const backup = new Classes.Backup();

                                                // Save backup
                                                backup.update_css_element_id(element_id!, this.params, style_content);

                                                // Get the weight option
                                                const font_weight: Element | null = target.closest('.ec-composer-options-list')!.querySelector('li[data-option="font_weight"]');

                                                // Verify if the font weight exists
                                                if ( font_weight ) {

                                                    // Items container
                                                    let items: string = '';

                                                    // List the weights
                                                    for ( const weight of font.weight ) {

                                                        // Add item to the list
                                                        items += '<li>'
                                                            + '<a href="#" data-item="' + weight + '">'
                                                                + weight
                                                            + '</a>'
                                                        + '</li>';  

                                                    }

                                                    // Add font's weight options
                                                    font_weight.getElementsByClassName('ec-option-selector-items')[0].innerHTML = items;

                                                }

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