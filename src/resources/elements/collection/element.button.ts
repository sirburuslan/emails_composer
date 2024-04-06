/**
 * @class Button
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains the element's button which could be used in the templates
 */

// Import elements interface
import { InterfaceElements } from '../../../classes/classes.index.js';

// Import the fonts
import * as fonts from '../../../resources/fonts/fonts.index.js';

// Import types
import { 
    events_type, 
    options_type, 
    font_type 
} from '../../../resources/types/types.index.js';

// Namespace
export namespace Resources.Elements {

    // Class
    export class Button implements InterfaceElements.Interfaces.Elements {

        /**
         * Gets the element's info
         * 
         * @param any parameters
         * 
         * @returns object
         */
        get_info = (params: any): object => {

            return {
                category: 'general'
            };

        }        

        /**
         * Gets the element's icon
         * 
         * @param any parameters
         * 
         * @returns string with icon
         */
        get_element = (params: any): string => {

            return '<a href="#" class="ec-element" data-name="button">'
                + params.icons('button')
                + '<div>'
                    + params.words('button')
                + '</div>'
            + '</a>';

        }

        /**
         * Gets the element's content
         * 
         * @param any parameters
         * 
         * @returns string with content
         */
        get_content = (params: any): string => {

            return '<div class="ec-element-content-data">'
                + '<a href="#">'
                    + params.words('button')
                + '</a>'
            + '</div>';

        }   
        
        /**
         * Gets the element's events
         * 
         * @param any parameters
         * 
         * @returns array with events
         */
        get_events = (params: any): events_type => {

            return [];

        } 
        
        /**
         * Gets the element's options
         * 
         * @param any parameters
         * 
         * @returns array with options
         */
        get_options = (params: any): options_type => {

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

            // Styles container
            const styles: Array<{item_id: number | string, item_name: number | string}> = [{
                item_id: 'solid',
                item_name: 'Solid'
            }, {
                item_id: 'dashed',
                item_name: 'Dashed'
            }, {
                item_id: 'dotted',
                item_name: 'Dotted'
            }, {
                item_id: 'double',
                item_name: 'Double'
            }, {
                item_id: 'groove',
                item_name: 'Groove'
            }];

            return {
                desktop: [{
    
                    title: params.words('content'),
                    list: [

                        {
                            name: 'text',
                            template: 'text',
                            value: params.words('button'),
                            text: {
                                label: params.words('text'),
                                description: params.words('text_button_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'url',
                            template: 'link',
                            value: '#',
                            text: {
                                label: params.words('url_button'),
                                description: params.words('url_button_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: true

                },
                {
    
                    title: params.words('margin'),
                    list: [

                        {
                            name: 'margin_top',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_top'),
                                description: params.words('margin_top_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_right',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_right'),
                                description: params.words('margin_right_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_bottom',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_bottom'),
                                description: params.words('margin_bottom_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_left',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_left'),
                                description: params.words('margin_left_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('padding'),
                    list: [

                        {
                            name: 'padding_top',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_left'),
                                description: params.words('padding_left_description')                              
                            },
                            element: 'a'
                    
                        }
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('border'),
                    list: [

                        {
                            name: 'outline_width',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_width'),
                                description: params.words('border_width_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'outline_style',
                            template: 'selector',
                            value: 'solid',
                            text: {
                                label: params.words('border_style'),
                                description: params.words('border_style_description')                              
                            },
                            element: 'a',
                            items: styles
                    
                        }                     
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('radius'),
                    list: [

                        {
                            name: 'border_top_left_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_left_radius'),
                                description: params.words('border_top_left_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_top_right_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_right_radius'),
                                description: params.words('border_top_right_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_bottom_right_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_right_radius'),
                                description: params.words('border_bottom_right_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_bottom_left_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_left_radius'),
                                description: params.words('border_bottom_left_radius_description')                              
                            },
                            element: 'a'
                    
                        }  
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('width'),
                    list: [

                        {
                            name: 'width',
                            template: 'number',
                            value: 80,
                            unit: '%',
                            text: {
                                label: params.words('button_width'),
                                description: params.words('button_width_description')                              
                            },
                            element: 'a'
                    
                        }                      
                    
                    ],
                    collapsed: false

                }, {
    
                    title: params.words('position'),
                    list: [

                        {
                            name: 'text_align',
                            template: 'position',
                            value: 'center',
                            text: {
                                label: params.words('button_position'),
                                description: params.words('button_position_description')                              
                            },
                            element: ''
                    
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
                            element: 'a'
                    
                        }, {
                            name: 'letter_spacing',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('letter_spacing'),
                                description: params.words('letter_spacing_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'text_align',
                            template: 'align',
                            value: 'center',
                            text: {
                                label: params.words('text_align'),
                                description: params.words('text_align_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'font_family',
                            template: 'font',
                            value: selected_font,
                            text: {
                                label: params.words('font_family'),
                                description: params.words('font_family_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'font_size',
                            template: 'selector',
                            value: '14px',
                            text: {
                                label: params.words('font_size'),
                                description: params.words('font_size_description')                              
                            },
                            element: 'a',
                            items: sizes
                    
                        }, {
                            name: 'font_weight',
                            template: 'selector',
                            value: '400',
                            text: {
                                label: params.words('font_weight'),
                                description: params.words('font_weight_description')                              
                            },
                            items: weights,
                            element: 'a'
                    
                        }
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'color',
                            template: 'color',
                            value: '#FFFFFD',
                            text: {
                                label: params.words('button_color_text'),
                                description: params.words('button_color_text_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'outline_color',
                            template: 'color',
                            value: '#8db79d',
                            text: {
                                label: params.words('button_color_border'),
                                description: params.words('button_color_border_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'background_color',
                            template: 'color',
                            value: '#8db79d',
                            text: {
                                label: params.words('button_color_background'),
                                description: params.words('button_color_background_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'background_color',
                            template: 'color',
                            value: '#FFFFFC',
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
    
                    title: params.words('margin'),
                    list: [

                        {
                            name: 'margin_top',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_top'),
                                description: params.words('margin_top_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_right',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_right'),
                                description: params.words('margin_right_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_bottom',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_bottom'),
                                description: params.words('margin_bottom_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'margin_left',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('margin_left'),
                                description: params.words('margin_left_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('padding'),
                    list: [

                        {
                            name: 'padding_top',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 7,
                            unit: 'px',
                            text: {
                                label: params.words('padding_left'),
                                description: params.words('padding_left_description')                              
                            },
                            element: 'a'
                    
                        }
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('border'),
                    list: [

                        {
                            name: 'outline_width',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_width'),
                                description: params.words('border_width_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'outline_style',
                            template: 'selector',
                            value: 'solid',
                            text: {
                                label: params.words('border_style'),
                                description: params.words('border_style_description')                              
                            },
                            element: 'a',
                            items: styles
                    
                        }                     
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('radius'),
                    list: [

                        {
                            name: 'border_top_left_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_left_radius'),
                                description: params.words('border_top_left_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_top_right_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_right_radius'),
                                description: params.words('border_top_right_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_bottom_right_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_right_radius'),
                                description: params.words('border_bottom_right_radius_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'border_bottom_left_radius',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_left_radius'),
                                description: params.words('border_bottom_left_radius_description')                              
                            },
                            element: 'a'
                    
                        }  
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('width'),
                    list: [

                        {
                            name: 'width',
                            template: 'number',
                            value: 100,
                            unit: '%',
                            text: {
                                label: params.words('button_width'),
                                description: params.words('button_width_description')                              
                            },
                            element: 'a'
                    
                        }                      
                    
                    ],
                    collapsed: false

                }, {
    
                    title: params.words('position'),
                    list: [

                        {
                            name: 'text_align',
                            template: 'position',
                            value: 'center',
                            text: {
                                label: params.words('button_position'),
                                description: params.words('button_position_description')                              
                            },
                            element: ''
                    
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
                            element: 'a'
                    
                        }, {
                            name: 'letter_spacing',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('letter_spacing'),
                                description: params.words('letter_spacing_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'text_align',
                            template: 'align',
                            value: 'center',
                            text: {
                                label: params.words('text_align'),
                                description: params.words('text_align_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'font_family',
                            template: 'font',
                            value: selected_font,
                            text: {
                                label: params.words('font_family'),
                                description: params.words('font_family_description')                              
                            },
                            element: 'a'
                    
                        }, {
                            name: 'font_size',
                            template: 'selector',
                            value: '14px',
                            text: {
                                label: params.words('font_size'),
                                description: params.words('font_size_description')                              
                            },
                            element: 'a',
                            items: sizes
                    
                        }, {
                            name: 'font_weight',
                            template: 'selector',
                            value: '400',
                            text: {
                                label: params.words('font_weight'),
                                description: params.words('font_weight_description')                              
                            },
                            items: weights,
                            element: 'a'
                    
                        }
                    
                    ],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'color',
                            template: 'color',
                            value: '#FFFFFD',
                            text: {
                                label: params.words('button_color_text'),
                                description: params.words('button_color_text_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'outline_color',
                            template: 'color',
                            value: '#8db79d',
                            text: {
                                label: params.words('button_color_border'),
                                description: params.words('button_color_border_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'background_color',
                            template: 'color',
                            value: '#8db79d',
                            text: {
                                label: params.words('button_color_background'),
                                description: params.words('button_color_background_description')                              
                            },
                            element: 'a'

                        }, {
                            name: 'background_color',
                            template: 'color',
                            value: '#FFFFFC',
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