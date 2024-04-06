/**
 * @class Product
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains the element's product which could be used in the templates
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
    export class Product implements InterfaceElements.Interfaces.Elements {

        /**
         * Gets the element's info
         * 
         * @param any parameters
         * 
         * @returns object
         */
        get_info = (params: any): object => {

            return {
                category: 'advanced'
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

            return '<a href="#" class="ec-element" data-name="product">'
                + params.icons('product')
                + '<div>'
                    + params.words('product')
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
                + '<a href="#" class="ec-element-product">'
                    + '<div class="ec-element-product-image">'
                        + '<span class="ec-element-image ec-element-cover">'
                            + params.icons('image')
                        + '</span>'
                    + '</div>'
                    + '<div class="ec-element-product-description">'
                        + '<h4 contenteditable="true">'
                            + params.words('product')
                        + '</h4>'
                        + '<h5 contenteditable="true">'
                            + params.words('product_short_description')
                        + '</h5>'
                        + '<h6 contenteditable="true">'
                            + params.words('product_size')
                        + '</h6>'
                        + '<p contenteditable="true">'
                            + params.words('product_quantity')
                        + '</p>'                                                                      
                    + '</div>'
                    + '<div class="ec-element-product-price">'
                        + '<h3 contenteditable="true">'
                            + params.words('product_price')
                        + '</h3>'          
                    + '</div>'
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
            const product_name_selected_font: string = 'jost';

            // Check if the font exists
            const font: font_type | undefined = fonts_list.find(item => item.slug === product_name_selected_font);

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
                desktop: [{
    
                    title: params.words('url'),
                    list: [

                        {
                            name: 'url',
                            template: 'link',
                            value: '#',
                            text: {
                                label: params.words('url_product'),
                                description: params.words('url_product_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: true

                }, {
    
                    title: params.words('images'),
                    list: [{
                        name: 'images',
                        template: 'images',
                        has_link: false,
                        element: '.ec-element-image'

                    }],
                    collapsed: true

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
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 0,
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

                    title: params.words('product_name'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '15px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h4'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '500',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h4'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#0e0b00',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h4'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_description'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '14px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h5'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h5'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#12130f',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h5'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_size_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '13px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h6'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h6'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#29292A',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h6'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_quantity_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '13px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'p'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'p'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#29292A',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'p'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_price_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 80,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'center',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '15px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h3'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '500',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h3'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#12130f',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h3'

                    }],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'background_color',
                            template: 'color',
                            value: '#FFFFFC',
                            text: {
                                label: params.words('column_color_background'),
                                description: params.words('column_color_background_description')                              
                            },
                            element: ''

                        }, {
                            name: 'border_color',
                            template: 'color',
                            value: '#edefec',
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
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 0,
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

                    title: params.words('product_name'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h4'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '15px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h4'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '500',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h4'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#0e0b00',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h4'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_description'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h5'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '14px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h5'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h5'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#12130f',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h5'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_size_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h6'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '13px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h6'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h6'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#29292A',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h6'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_quantity_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 20,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'left',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'p'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '13px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'p'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '400',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'p'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#29292A',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'p'

                    }],
                    collapsed: false

                }, {

                    title: params.words('product_price_category'),
                    list: [{
                        name: 'line_height',
                        template: 'number',
                        value: 80,
                        unit: 'px',
                        text: {
                            label: params.words('line_height'),
                            description: params.words('line_height_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'letter_spacing',
                        template: 'number',
                        value: 0,
                        unit: 'px',
                        text: {
                            label: params.words('letter_spacing'),
                            description: params.words('letter_spacing_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'text_align',
                        template: 'align',
                        value: 'center',
                        text: {
                            label: params.words('text_align'),
                            description: params.words('text_align_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'font_family',
                        template: 'font',
                        value: product_name_selected_font,
                        text: {
                            label: params.words('font_family'),
                            description: params.words('font_family_description')                              
                        },
                        element: 'h3'
                
                    }, {
                        name: 'font_size',
                        template: 'selector',
                        value: '15px',
                        text: {
                            label: params.words('font_size'),
                            description: params.words('font_size_description')                              
                        },
                        items: sizes,
                        element: 'h3'
                
                    }, {
                        name: 'font_weight',
                        template: 'selector',
                        value: '500',
                        text: {
                            label: params.words('font_weight'),
                            description: params.words('font_weight_description')                              
                        },
                        items: weights,
                        element: 'h3'
                
                    }, {
                        name: 'color',
                        template: 'color',
                        value: '#12130f',
                        text: {
                            label: params.words('color_text'),
                            description: params.words('color_text_description')                              
                        },
                        element: 'h3'

                    }],
                    collapsed: false

                }, {

                    title: params.words('colors'),
                    list: [
                        
                        {
                            name: 'background_color',
                            template: 'color',
                            value: '#FFFFFC',
                            text: {
                                label: params.words('column_color_background'),
                                description: params.words('column_color_background_description')                              
                            },
                            element: ''

                        }, {
                            name: 'border_color',
                            template: 'color',
                            value: '#edefec',
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
            const styles = ``;

            return styles;

        }

    }

}