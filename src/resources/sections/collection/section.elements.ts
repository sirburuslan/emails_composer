/**
 * @file Elements
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the html code for the elements section
 */

// Import required classes
import Classes, { InterfaceSections } from '../../../classes/classes.index.js';

// Import elements
import elements from './../../../resources/elements/elements.index.js';

// Import templates for elements options
import * as templates from './../../../resources/options/options.index.js';

// Import types
import {
    events_type,
    event_type,
    params_type,
    element_options_type 
} from './../../types/types.index.js';

// Sections
const sections: InterfaceSections.Interfaces.Sections = {

    get_section: (params: any): string => {

        // Section container
        let section = '<div class="ec-sections">';

        // Set actions buttons
        section += '<div class="ec-section-actions">'
            + '<button type="button" class="ec-section-action-hide-button">'
                + params.icons('close', {'icon_class': 'ec-section-action-hide-icon'})
                + '<span class="ec-section-action-hide-text">'
                    + params.words('close')
                + '</span>'
            + '</button>'
        + '</div>';

        // General elements list
        let general_elements_list = '';

        // Advanced elements list
        let advanced_elements_list = '';

        // Key the keys
        const elements_keys = Object.keys(elements);

        // Total elements
        const total_elements = elements_keys.length;

        // List the elements
        for ( var f = 0; f < total_elements; f++ ) {

            // Get the namespace
            const name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, elements_keys[f])?.value.Resources.Elements;

            // Get key
            const key = Object.keys(name_space)[0] as string;

            // Get the element class
            const element_class = new name_space[key]();

            // Get element
            const get_element: string = element_class.get_element(params);

            // Get info
            const get_info: {[key: string]: any} = element_class.get_info(params);

            // Check if category is general
            if ( get_info.category === 'general' ) {

                // Add element to the list
                general_elements_list += get_element;

            } else {

                // Add element to the list
                advanced_elements_list += get_element;

            }

        }

        // Check if the general elements are allowed
        if ( params.options('builder')?.resources?.elements?.sections?.general?.enabled ) {

            // Show class
            const show = params.options('builder')?.resources?.elements?.sections?.general?.show?' ec-section-show':'';

            // Add general elements section
            section += '<div class="ec-section' + show + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button">'
                        + params.icons('elements_section', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('elements')
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<div class="ec-elements">'
                        + general_elements_list
                    + '</div>'
                + '</div>'
            + '</div>';

        }

        // Check if the advanced elements are allowed
        if ( params.options('builder')?.resources?.elements?.sections?.advanced?.enabled ) {

            // Show class
            const show = params.options('builder')?.resources?.elements?.sections?.advanced?.show?' ec-section-show':'';

            // Add advanced elements section
            section += '<div class="ec-section' + show + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button">'
                        + params.icons('elements_section_advanced', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('advanced')
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<div class="ec-elements">'
                        + advanced_elements_list
                    + '</div>'
                + '</div>'
            + '</div>';

        }

        // Close section
        section += '</div>';

        // Set pause
        setTimeout((): void => {

            // Check if elements exists
            if ( Object.keys(elements).length > 0 ) {

                // List the elements
                for ( const element of Object.keys(elements) ) {

                    // Get the namespace
                    const name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, element)?.value.Resources.Elements;

                    // Get key
                    const key = Object.keys(name_space)[0] as string;

                    // Get the element class
                    const element_class = new name_space[key]();

                    // Get element's events
                    const element_events: events_type | undefined = element_class.get_events(params);
                    
                    // Check if events exists
                    if ( typeof element_events !== 'undefined' ) {

                        // List the events
                        for ( const event of element_events ) {

                            // Verify if event is not null
                            if ( !event ) {
                                continue;
                            }

                            // Check if iframe exists
                            const iframe: string = (typeof event.iframe !== 'undefined')?event.iframe:'';

                            // Verify if element exists
                            if ( typeof event.element === 'string' ) {

                                // Register event
                                new Classes.Events().addEventListener(params.selector!.querySelectorAll(event.element), event.action, event.target, iframe, event.capture);

                            } else {

                                // Register event
                                new Classes.Events().addEventListener('', event.action, event.target, iframe, event.capture);
                                
                            }                            

                        }

                    }                    

                }

            }

            // Check if templates exists
            if ( Object.keys(templates).length > 0 ) {

                // List the templates
                for ( const template of Object.keys(templates) ) {

                    // Get the elements options class
                    const the_options_class: element_options_type = Object.getOwnPropertyDescriptor(templates, template)?.value;
                    
                    // Get the events
                    const template_events: events_type | undefined = new the_options_class(params).get_events(params);

                    // Verify if events types exists
                    if ( template_events !== undefined ) {

                        // List the events
                        for ( const event of template_events ) {

                            // Check if iframe exists
                            const iframe: string = (typeof event.iframe !== 'undefined')?event.iframe:'';

                            // Verify if element exists
                            if ( typeof event.element === 'string' ) {

                                // Register event
                                new Classes.Events().addEventListener(params.selector!.querySelectorAll(event.element), event.action, event.target, iframe, event.capture);

                            } else {

                                // Register event
                                new Classes.Events().addEventListener('', event.action, event.target, iframe, event.capture);
                                
                            }

                        }

                    }

                }

            }

        }, 200);

        return section;

    }

}

// Export 
export default sections;