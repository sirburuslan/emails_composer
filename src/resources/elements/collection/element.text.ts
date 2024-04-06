/**
 * @class Text
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains the text element
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
    export class Text implements InterfaceElements.Interfaces.Elements {

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

            return '<a href="#" class="ec-element" data-name="text">'
                + params.icons('text')
                + '<div>'
                    + params.words('text')
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

            return '<div class="ec-element-content-data" contenteditable="true">'
                + '<p>'
                    + params.words('this_text_model')
                + '</p>'
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

            return {
                desktop: [

                    {
    
                        title: params.words('ai_assistant'),
                        list: [{
                            name: 'ai',
                            template: 'ai',
                            value: 'chatgpt'
                        }],
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
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_top'),
                                    description: params.words('padding_top_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_right',
                                template: 'number',
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_right'),
                                    description: params.words('padding_right_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_bottom',
                                template: 'number',
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_bottom'),
                                    description: params.words('padding_bottom_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_left',
                                template: 'number',
                                value: 7,
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
                        collapsed: true
    
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
                                    label: params.words('color_text'),
                                    description: params.words('color_text_description')                              
                                },
                                element: ''
    
                            }, {
                                name: '--text-link-color',
                                template: 'color',
                                value: '#12130f',
                                text: {
                                    label: params.words('color_link'),
                                    description: params.words('color_link_description')                              
                                },
                                element: 'a'
    
                            }, {
                                name: '--text-link-shadow-color',
                                template: 'color',
                                value: '#12130f',
                                text: {
                                    label: params.words('color_link_border'),
                                    description: params.words('color_link_border_description')                              
                                },
                                element: 'a'
    
                            } 
    
                        ],
                        collapsed: false
    
                    }
    
                ],
                mobile: [

                    {
    
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
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_top'),
                                    description: params.words('padding_top_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_right',
                                template: 'number',
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_right'),
                                    description: params.words('padding_right_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_bottom',
                                template: 'number',
                                value: 7,
                                unit: 'px',
                                text: {
                                    label: params.words('padding_bottom'),
                                    description: params.words('padding_bottom_description')                              
                                },
                                element: ''
                        
                            }, {
                                name: 'padding_left',
                                template: 'number',
                                value: 7,
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
                        collapsed: true
    
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
                                    label: params.words('color_text'),
                                    description: params.words('color_text_description')                              
                                },
                                element: ''
    
                            }, {
                                name: '--text-link-color',
                                template: 'color',
                                value: '#12130f',
                                text: {
                                    label: params.words('color_link'),
                                    description: params.words('color_link_description')                              
                                },
                                element: 'a'
    
                            }, {
                                name: '--text-link-shadow-color',
                                template: 'color',
                                value: '#12130f',
                                text: {
                                    label: params.words('color_link_border'),
                                    description: params.words('color_link_border_description')                              
                                },
                                element: 'a'
    
                            } 
    
                        ],
                        collapsed: false
    
                    }
    
                ]
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

            styles += `\n.ec-element-content[data-id="${element_id}"] .ec-element-content-data ul, .ec-element-content[data-id="${element_id}"] .ec-element-content-data ol {`;
            styles += `\n    margin: 0;`;
            styles += `\n    padding: 15px 30px;`;
            styles += `\n}`;
            styles += `\n.ec-element-content[data-id="${element_id}"] .ec-element-content-data ul li, .ec-element-content[data-id="${element_id}"] .ec-element-content-data ol li {`;
            styles += `\n    padding: 0 0 10px;`;
            styles += `\n}`;
            styles += `\n.ec-element-content[data-id="${element_id}"] .ec-element-content-data a {`;
            styles += `\n    text-decoration: none;`;
            styles += `\n    color: var(--text-link-color);`;
            styles += `\n    box-shadow: 0 1px 0 0 var(--text-link-shadow-color);`;        
            styles += `\n}`;

            return styles;

        }

    }

}