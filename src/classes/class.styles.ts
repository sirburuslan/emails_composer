/**
 * @class Styles
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class creates styles the html read in the History class
 */

// Import types
import { 
    params_type, 
    options_type, 
    option_property_type, 
    element_options_type 
} from '../resources/types/types.index.js';

// Import inc
import { 
    get_element_by_name, 
    prepare_styles 
} from '../inc/inc.index.js';

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
    Checkbox,
    Ai
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
    checkbox: Checkbox,
    ai: Ai
};

// Class Namespace
export namespace Class {

    // Styles
    export class Styles {

        /**
         * Generate styles for html
         * 
         * @param params_type params
         * @param string iframe
         * @param string[] elements_id?
         */
        create_styles(params: params_type, iframe: string, elements_id?: string[]) {

            // Get iframe for template
            let itemplate = params.selector!.getElementsByClassName(iframe) as HTMLCollectionOf<HTMLIFrameElement>;
            
            // Check if iframe exists
            if ( itemplate.length > 0 ) {

                // Get content of the document
                let content: Document | null = itemplate[0].contentDocument;

                // Check if content exists
                if ( content ) {

                    // Get the body
                    let body: HTMLElement = content?.body;

                    // Get the template
                    let template: HTMLCollectionOf<Element> = body.getElementsByClassName('ec-composer-template');

                    // Get all elements
                    let elements: HTMLCollectionOf<Element> = template[0].getElementsByClassName('ec-element-content');

                    // Verify if elements exists
                    if ( elements.length > 0 ) {

                        // List the elements
                        for ( let element_single of elements ) {

                            // Get the element's id
                            let element_id: string | null = element_single.getAttribute('data-id');
                            
                            // Get the element's name
                            let element_name: string | null = element_single.getAttribute('data-name');

                            // Check if id and name exists
                            if ( (element_id === null) || (element_name === null) ) {
                                continue;
                            }

                            // Check if element id should be excluded
                            if ( elements_id?.includes(element_id) ) {
                                continue;
                            }

                            // Get element's class by name
                            let element: {[key: string]: any} | undefined = get_element_by_name(element_name, params);

                            // Check if element is not undefined
                            if ( typeof element !== 'undefined' ) {

                                // Get the element's options
                                let element_options: options_type = element.get_options(params);

                                // Get the element's styles
                                let element_styles: string = element.get_styles(element_id);

                                // Verify if the element has options
                                if ( element_options.desktop.length > 0 ) {

                                    // Properties container
                                    let properties: Array<{[key: string]: string | number, element_name: string}> = [];

                                    // List the sections
                                    for ( let option of element_options.desktop ) {

                                        // Verify if options exists
                                        if ( option.list.length > 0 ) {

                                            // List the options
                                            for ( let list of option.list ) {

                                                // Get the option template
                                                let template: string = list.template;

                                                // Get the css property
                                                let css_property: option_property_type = new types[template](params).get_property(list);

                                                // Check if css property exists
                                                if ( typeof css_property !== 'undefined' ) {

                                                    // Add element name
                                                    css_property['element_name'] = list.element as string;

                                                    // Add property to the properties
                                                    properties.push(css_property);

                                                }

                                            }

                                        }

                                    }

                                    // Check if properties exists
                                    if ( properties.length > 0 ) {

                                        // Get the styles
                                        let styles: string | undefined = prepare_styles(element_id, properties, element_styles);

                                        // Verify if styles exists
                                        if ( typeof styles !== 'undefined' ) {

                                            // Append styles
                                            content.head.innerHTML += styles;

                                        }

                                    }

                                }

                                // Verify if the element has options
                                if ( element_options.mobile.length > 0 ) {

                                    // Properties container
                                    let properties: Array<{[key: string]: string | number, element_name: string}> = [];

                                    // List the sections
                                    for ( let option of element_options.mobile ) {

                                        // Verify if options exists
                                        if ( option.list.length > 0 ) {

                                            // List the options
                                            for ( let list of option.list ) {

                                                // Get the option template
                                                let template: string = list.template;

                                                // Get the css property
                                                let css_property: option_property_type = new types[template](params).get_property(list);

                                                // Check if css property exists
                                                if ( typeof css_property !== 'undefined' ) {

                                                    // Add element name
                                                    css_property['element_name'] = list.element as string;

                                                    // Add property to the properties
                                                    properties.push(css_property);

                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    }

}