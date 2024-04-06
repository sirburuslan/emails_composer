/**
 * @class Menu
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the menu element which could be used in the tempates
 */

// Import elements interface
import { InterfaceElements } from '../../../classes/classes.index.js';

// Import the fonts
import * as fonts from '../../../resources/fonts/fonts.index.js';

// Import types
import { 
    params_type, 
    events_type, 
    font_type, 
    options_type 
} from '../../../resources/types/types.index.js';

// Namespace
export namespace Resources.Elements {

    // Class
    export class Menu implements InterfaceElements.Interfaces.Elements {

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

            return '<a href="#" class="ec-element" data-name="menu">'
                + params.icons('menu')
                + '<div>'
                    + params.words('menu')
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

            return '<div class="ec-element-content-data">'
                + '<ul class="ec-display-flex">'
                    + '<li>'
                        + '<a href="#">'
                            + params.words('item') + ' 1'
                        + '</a>'
                     + '</li>'
                    + '<li>'
                        + '<a href="#">'
                            + params.words('item') + ' 2'
                        + '</a>'
                    + '</li>'
                    + '<li>'
                        + '<a href="#">'
                            + params.words('item') + ' 3'
                        + '</a>'
                    + '</li>'
                + '</ul>'
            + '</div>';

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

            // Sizes container
            const sizes: Array<{item_id: number | string, item_name: number | string}> = [];

            // Get the fonts list
            const fonts_list: font_type[] = Object.values(fonts);

            // Selected font
            const selected_font: string = 'lato';

            // Check if the font exists
            const font: font_type | undefined = fonts_list.find(item => item.slug === selected_font);

            // Weights container
            const weights: Array<{item_id: number | string, item_name: number | string}> = [];

            // Verify if font exists
            if ( typeof font !== 'undefined' ) {

                // List the weights
                for ( const weight of font.weight ) {

                    // Add weight to the list
                    weights.push({
                        item_id: weight,
                        item_name: weight
                    });

                }

            }

            // List the sizes
            for ( let s = 7; s < 99; s++ ) {

                // Add size to the list
                sizes.push({
                    item_id: s + 'px',
                    item_name: s + 'px'
                });

            }

            // Directions container
            const directions: Array<{item_id: number | string, item_name: number | string}> = [{
                item_id: 'column',
                item_name: params.words('vertical')
            }, {
                item_id: 'row',
                item_name: params.words('horizontal')
            }];          

            return {
                desktop: [{
    
                    title: params.words('menu'),
                    list: [

                        {
                            name: 'menu',
                            template: 'menu'
                        }

                    ],
                    collapsed: true

                }, {
    
                    title: params.words('direction'),
                    list: [

                        {
                            name: 'flex_direction',
                            template: 'direction',
                            value: 'column',
                            text: {
                                label: params.words('menu_direction'),
                                description: params.words('menu_direction_description')                            
                            },
                            items: directions,
                            element: 'ul'
                    
                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('space'),
                    list: [

                        {
                            name: 'row_gap',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('vertical_space_items'),
                                description: params.words('vertical_space_items_description')                              
                            },
                            element: 'ul'

                        }, {
                            name: 'column_gap',
                            template: 'number',
                            value: 50,
                            unit: 'px',
                            text: {
                                label: params.words('horizontal_space_items'),
                                description: params.words('horizontal_space_items_description')                              
                            },
                            element: 'ul'

                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('margin'),
                    list: [

                        {
                            name: 'margin_top',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_top'),
                                description: params.words('margin_top_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_right',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_right'),
                                description: params.words('margin_right_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_bottom',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_bottom'),
                                description: params.words('margin_bottom_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_left',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_left'),
                                description: params.words('margin_left_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('padding'),
                    list: [

                        {
                            name: 'padding_top',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_left'),
                                description: params.words('padding_left_description')                              
                            },
                            element: ''
                    
                        }
                    
                    ],
                    collapsed: false

                }, {
    
                    title: params.words('position'),
                    list: [

                        {
                            name: 'align_self',
                            template: 'position',
                            value: 'center',
                            text: {
                                label: params.words('menu_position'),
                                description: params.words('menu_position_description')                              
                            },
                            element: '.ec-display-flex'
                    
                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('text'),
                    list: [

                        {
                            name: 'line_height',
                            template: 'number',
                            value: 22,
                            unit: 'px',
                            text: {
                                label: params.words('line_height'),
                                description: params.words('line_height_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'letter_spacing',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('letter_spacing'),
                                description: params.words('letter_spacing_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'text_align',
                            template: 'align',
                            value: 'left',
                            text: {
                                label: params.words('text_align'),
                                description: params.words('text_align_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'font_family',
                            template: 'font',
                            value: selected_font,
                            text: {
                                label: params.words('font_family'),
                                description: params.words('font_family_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'font_size',
                            template: 'selector',
                            value: '14px',
                            text: {
                                label: params.words('font_size'),
                                description: params.words('font_size_description')                              
                            },
                            items: sizes,
                            element: ''
                    
                        }, {
                            name: 'font_weight',
                            template: 'selector',
                            value: '400',
                            text: {
                                label: params.words('font_weight'),
                                description: params.words('font_weight_description')                              
                            },
                            items: weights,
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
                            value: '#FFFFFF',
                            text: {
                                label: params.words('color_background'),
                                description: params.words('color_background_description')                              
                            },
                            element: ''

                        }, {
                            name: 'color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_bullets'),
                                description: params.words('color_bullets_description')                              
                            },
                            element: 'li'

                        }, {
                            name: 'color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_text'),
                                description: params.words('color_text_description')                              
                            },
                            element: 'a'

                        }, {
                            name: '--menu-link-shadow-color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_border'),
                                description: params.words('color_border_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: false

                }],
                mobile: [{
    
                    title: params.words('direction'),
                    list: [

                        {
                            name: 'flex_direction',
                            template: 'direction',
                            value: 'column',
                            text: {
                                label: params.words('menu_direction'),
                                description: params.words('menu_direction_description')                            
                            },
                            items: directions,
                            element: 'ul'
                    
                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('space'),
                    list: [

                        {
                            name: 'row_gap',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('vertical_space_items'),
                                description: params.words('vertical_space_items_description')                              
                            },
                            element: 'ul'

                        }, {
                            name: 'column_gap',
                            template: 'number',
                            value: 50,
                            unit: 'px',
                            text: {
                                label: params.words('horizontal_space_items'),
                                description: params.words('horizontal_space_items_description')                              
                            },
                            element: 'ul'

                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('margin'),
                    list: [

                        {
                            name: 'margin_top',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_top'),
                                description: params.words('margin_top_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_right',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_right'),
                                description: params.words('margin_right_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_bottom',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_bottom'),
                                description: params.words('margin_bottom_description')                              
                            },
                            element: ''

                        }, {
                            name: 'margin_left',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('margin_left'),
                                description: params.words('margin_left_description')                              
                            },
                            element: ''

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('padding'),
                    list: [

                        {
                            name: 'padding_top',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 10,
                            unit: 'px',
                            text: {
                                label: params.words('padding_left'),
                                description: params.words('padding_left_description')                              
                            },
                            element: ''
                    
                        }
                    
                    ],
                    collapsed: false

                }, {
    
                    title: params.words('position'),
                    list: [

                        {
                            name: 'align_self',
                            template: 'position',
                            value: 'center',
                            text: {
                                label: params.words('menu_position'),
                                description: params.words('menu_position_description')                              
                            },
                            element: '.ec-display-flex'
                    
                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('text'),
                    list: [

                        {
                            name: 'line_height',
                            template: 'number',
                            value: 22,
                            unit: 'px',
                            text: {
                                label: params.words('line_height'),
                                description: params.words('line_height_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'letter_spacing',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('letter_spacing'),
                                description: params.words('letter_spacing_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'text_align',
                            template: 'align',
                            value: 'left',
                            text: {
                                label: params.words('text_align'),
                                description: params.words('text_align_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'font_family',
                            template: 'font',
                            value: selected_font,
                            text: {
                                label: params.words('font_family'),
                                description: params.words('font_family_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'font_size',
                            template: 'selector',
                            value: '14px',
                            text: {
                                label: params.words('font_size'),
                                description: params.words('font_size_description')                              
                            },
                            items: sizes,
                            element: ''
                    
                        }, {
                            name: 'font_weight',
                            template: 'selector',
                            value: '400',
                            text: {
                                label: params.words('font_weight'),
                                description: params.words('font_weight_description')                              
                            },
                            items: weights,
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
                            value: '#FFFFFF',
                            text: {
                                label: params.words('color_background'),
                                description: params.words('color_background_description')                              
                            },
                            element: ''

                        }, {
                            name: 'color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_bullets'),
                                description: params.words('color_bullets_description')                              
                            },
                            element: 'li'

                        }, {
                            name: 'color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_text'),
                                description: params.words('color_text_description')                              
                            },
                            element: 'a'

                        }, {
                            name: '--menu-link-shadow-color',
                            template: 'color',
                            value: '#12130f',
                            text: {
                                label: params.words('color_border'),
                                description: params.words('color_border_description')                              
                            },
                            element: 'a'

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
            let styles = ``;

            styles += `\n.ec-element-content[data-id="${element_id}"] .ec-element-content-data ul li a {`;
            styles += `\n    text-decoration: none;`;
            styles += `\n    box-shadow: 0 1px 0 0 var(--menu-link-shadow-color);`;
            styles += `\n}`;

            return styles;

        }

    }

}