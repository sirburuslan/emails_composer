/**
 * @class Spacer
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class adds spaces in the templates
 */

// Import elements interface
import { InterfaceElements } from '../../../classes/classes.index.js';

// Import types
import { 
    params_type, 
    events_type, 
    options_type 
} from '../../../resources/types/types.index.js';

// Namespace
export namespace Resources.Elements {

    // Class
    export class Spacer implements InterfaceElements.Interfaces.Elements {

        /**
         * Gets the element's info
         * 
         * @param params_type parameters
         * 
         * @returns object
         */
        get_info = (params: params_type): object => {

            return {
                category: 'general'
            };

        }        

        /**
         * Gets the element's icon
         * 
         * @param params_type parameters
         * 
         * @returns string with icon
         */
        get_element = (params: params_type): string => {

            return '<a href="#" class="ec-element" data-name="spacer">'
                + params.icons('spacer')
                + '<div>'
                    + params.words('spacer')
                + '</div>'
            + '</a>';

        }

        /**
         * Gets the element's content
         * 
         * @param params_type parameters
         * 
         * @returns string with content
         */
        get_content = (params: params_type): string => {

            return '<div class="ec-element-content-data"></div>';

        }   
        
        /**
         * Gets the element's events
         * 
         * @param params_type parameters
         * 
         * @returns array with events
         */
        get_events = (params: params_type): events_type => {

            return [];

        } 
        
        /**
         * Gets the element's options
         * 
         * @param params_type parameters
         * 
         * @returns array with options
         */
        get_options = (params: params_type): options_type => {

            return {
                desktop: [{
    
                    title: params.words('height'),
                    list: [

                        {
                            name: 'height',
                            template: 'number',
                            value: 30,
                            unit: 'px',
                            text: {
                                label: params.words('divider_height'),
                                description: params.words('divider_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'background_color',
                            template: 'color',
                            value: 'transparent',
                            text: {
                                label: params.words('column_color_background'),
                                description: params.words('column_color_background_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }],
                mobile: [{
    
                    title: params.words('height'),
                    list: [

                        {
                            name: 'height',
                            template: 'number',
                            value: 30,
                            unit: 'px',
                            text: {
                                label: params.words('divider_height'),
                                description: params.words('divider_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'background_color',
                            template: 'color',
                            value: 'transparent',
                            text: {
                                label: params.words('column_color_background'),
                                description: params.words('column_color_background_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }]
            };

        }
        
        /**
         * Gets the element's styles
         * 
         * @param string element_id
         * 
         * @returns string with styles
         */
        get_styles = (element_id: string): string => {
            
            // Styles container
            const styles = ``;

            return styles;

        }

    }

}