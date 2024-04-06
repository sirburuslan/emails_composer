/**
 * @file Templates
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions for the emails composer templates
 */

// Import inc
import { 
    get_structure_buttons, 
    get_element_buttons, 
    get_placeholder, 
    show_message } from '../inc/inc.index.js';

// Import types
import { 
    params_type, 
    options_template_type, 
    element_options_type 
} from '../resources/types/types.index.js';

// Import the options structures
import {
    Color,
    Number,
    Selector,
    Font,
    Align,
    Position,
    Text,
    Link,
    Images,
    Direction,
    Menu,
    Social,
    Icons,
    List,
    Checkbox
} from "../resources/options/options.index.js";

// All types for options
const types: {[key: string]: element_options_type} = {
    color: Color,
    number: Number,
    selector: Selector,
    font: Font,
    align: Align,
    position: Position,
    text: Text,
    link: Link,
    images: Images,
    direction: Direction,
    menu: Menu,
    social: Social,
    icons: Icons,
    list: List,
    checkbox: Checkbox
};

/**
 * Remove the buttons from the template
 * 
 * @param string html
 * 
 * @return string response
 */
export const remove_buttons = (html: string): string => {

    // Remove the structure buttons
    html = html.split(get_structure_buttons()).join('');

    // Remove the element buttons
    html = html.split(get_element_buttons()).join('');    

    // Remove the placeholders
    html = html.split(get_placeholder()).join('');

    // Remove the active class
    html = html.replace(' ec-element-content-active', '');    

    return html;

}

/**
 * Remove the javascript from the template
 * 
 * @param string html
 * 
 * @return string response
 */
const remove_javascript = (html: string): string => {

    // Prepare regex
    const reg = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

    // Apply and return
    return html.replace(reg, '');

}

/**
 * Get the template
 * 
 * @param params_type params
 * 
 * @return string response
 */
export const get_template = (params: params_type): string => {

    // Get iframe
    const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

    // Verify if iframe exists
    if ( iframe ) {

        // Get content document
        const iframeDocument: Document | null = iframe.contentDocument;

        // Get html
        const html: HTMLCollectionOf<Element> | undefined = iframeDocument?.getElementsByClassName('ec-composer-template');

        // Verify if html is not undefined
        if ( html !== undefined ) {

            // Verify if html has elements
            if ( html.length > 0 ) {

                // Return the template
                return remove_javascript(remove_buttons(html[0].outerHTML));

            }

        }

    }

    return '';

}

/**
 * Generates html for the template options
 * 
 * @param options_template_type options
 * @param object properties_list
 * @param params_type params
 * 
 * @returns string with content
 */
export const get_template_options = (options: options_template_type, properties_list: {[key: string]: {[key: string]: number | string}}, params: params_type): string | undefined => {

    // Check if options exists
    if ( options.length > 0 ) {

        // Sections container
        let sections: string = '';

        // List the sections
        for ( const option of options ) {
            
            // Options container
            let options_list: string = '';

            // Verify if options exists
            if ( option.list.length > 0 ) {

                // List the options
                for ( const list of option.list ) {

                    // Check if template exists
                    if ( typeof list.template === 'undefined' ) {
                        continue;
                    }

                    // Check if option has element
                    if ( list.element && (typeof properties_list[list.element] !== 'undefined') && (typeof properties_list[list.element][list.name.replaceAll('_', '-')] !== 'undefined') ) {

                        // Set custom
                        list['custom'] = properties_list[list.element][list.name.replaceAll('_', '-')];  

                    }

                    // Get the option template
                    const template: string = list.template;

                    // Get the option
                    const the_option: string | undefined = new types[template](params).get_option(list);

                    // Check if option exists
                    if ( the_option ) {

                        // Add option to the list
                        options_list += the_option;

                    }

                }

            }

            // Showed container
            let showed_section: string = '';

            // Verify if the section is collapsed
            if ( (typeof option.collapsed !== 'undefined') && (option.collapsed === true) ) {

                // Set show class
                showed_section = ' ec-section-show';

            }

            // Add section to the container
            sections += '<div class="ec-section' + showed_section + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button" class="ec-justify-content-space-between">'
                        + '<span>'
                            + option.title
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<ul class="ec-composer-options-list">'
                        + options_list
                    + '</ul>'
                + '</div>'
            + '</div>';

        }

        return sections;

    } else {

        // Show error message
        show_message(params.words('error_name') + ': ' + params.words('no_element_options_found'));
        
    }

}