/**
 * @class Video
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the video element
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
    export class Video implements InterfaceElements.Interfaces.Elements {

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

            return '<a href="#" class="ec-element" data-name="video">'
                + params.icons('video_library')
                + '<div>'
                    + params.words('video')
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
                + '<a href="#" class="ec-element-image ec-element-cover">'
                    + params.icons('video')
                + '</a>'
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

            return {
                desktop: [{
    
                    title: params.words('url'),
                    list: [

                        {
                            name: 'url',
                            template: 'link',
                            value: '#',
                            text: {
                                label: params.words('url_video'),
                                description: params.words('url_video_description')                              
                            },
                            element: 'a'

                        }

                    ],
                    collapsed: true

                }, {
    
                    title: params.words('cover'),
                    list: [{
                        name: 'images',
                        template: 'images',
                        has_link: true,
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
    
                    title: params.words('width'),
                    list: [

                        {
                            name: 'max_width',
                            template: 'number',
                            value: 100,
                            unit: '%',
                            text: {
                                label: params.words('max_width'),
                                description: params.words('max_width_description')                              
                            },
                            element: 'img'

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('radius'),
                    list: [

                        {
                            name: 'border_top_left_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_left_radius'),
                                description: params.words('border_top_left_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_top_right_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_right_radius'),
                                description: params.words('border_top_right_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_bottom_right_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_right_radius'),
                                description: params.words('border_bottom_right_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_bottom_left_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_left_radius'),
                                description: params.words('border_bottom_left_radius_description')                              
                            },
                            element: 'img'
                    
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
                                label: params.words('image_position'),
                                description: params.words('image_position_description')                              
                            },
                            element: 'a'
                    
                        }

                    ],
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
    
                    title: params.words('width'),
                    list: [

                        {
                            name: 'max_width',
                            template: 'number',
                            value: 100,
                            unit: '%',
                            text: {
                                label: params.words('max_width'),
                                description: params.words('max_width_description')                              
                            },
                            element: 'img'

                        }

                    ],
                    collapsed: false

                }, {

                    title: params.words('radius'),
                    list: [

                        {
                            name: 'border_top_left_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_left_radius'),
                                description: params.words('border_top_left_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_top_right_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_top_right_radius'),
                                description: params.words('border_top_right_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_bottom_right_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_right_radius'),
                                description: params.words('border_bottom_right_radius_description')                              
                            },
                            element: 'img'
                    
                        }, {
                            name: 'border_bottom_left_radius',
                            template: 'number',
                            value: 0,
                            unit: 'px',
                            text: {
                                label: params.words('border_bottom_left_radius'),
                                description: params.words('border_bottom_left_radius_description')                              
                            },
                            element: 'img'
                    
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
                                label: params.words('image_position'),
                                description: params.words('image_position_description')                              
                            },
                            element: 'a'
                    
                        }

                    ],
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

            return styles;

        }

    }

}