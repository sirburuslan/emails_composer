/**
 * @class Social
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains the social icons which could be used in the templates
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
    export class Social implements InterfaceElements.Interfaces.Elements {

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

            return '<a href="#" class="ec-element" data-name="social">'
                + params.icons('share')
                + '<div>'
                    + params.words('social')
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
                + '<ul class="ec-display-flex ec-no-list-bullets">'
                    + '<li>'
                        + '<a href="#" data-network="facebook">'
                            + params.icons('facebook')
                        + '</a>'
                    + '</li>'
                    + '<li>'
                        + '<a href="#" data-network="instagram">'
                            + params.icons('instagram')
                        + '</a>'
                    + '</li>'
                    + '<li>'
                        + '<a href="#" data-network="linkedin">'
                            + params.icons('linkedin')
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

            return {
                desktop: [{
    
                    title: params.words('networks'),
                    list: [

                        {
                            name: 'social',
                            template: 'social'

                        }

                    ],
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
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 6,
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
    
                    title: params.words('size'),
                    list: [

                        {
                            name: 'width',
                            template: 'number',
                            value: 24,
                            unit: 'px',
                            text: {
                                label: params.words('icon_width'),
                                description: params.words('icon_width_description')                              
                            },
                            element: 'svg'

                        }, {
                            name: 'height',
                            template: 'number',
                            value: 24,
                            unit: 'px',
                            text: {
                                label: params.words('icon_height'),
                                description: params.words('icon_height_description')                              
                            },
                            element: 'svg'

                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('space'),
                    list: [
                        
                        {
                            name: 'column_gap',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('icons_space'),
                                description: params.words('icons_space_description')                              
                            },
                            element: 'ul'

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
                                label: params.words('icons_position'),
                                description: params.words('icons_position_description')                              
                            },
                            element: '.ec-display-flex'
                    
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
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_top'),
                                description: params.words('padding_top_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_right',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_right'),
                                description: params.words('padding_right_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_bottom',
                            template: 'number',
                            value: 6,
                            unit: 'px',
                            text: {
                                label: params.words('padding_bottom'),
                                description: params.words('padding_bottom_description')                              
                            },
                            element: ''
                    
                        }, {
                            name: 'padding_left',
                            template: 'number',
                            value: 6,
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
    
                    title: params.words('size'),
                    list: [

                        {
                            name: 'width',
                            template: 'number',
                            value: 24,
                            unit: 'px',
                            text: {
                                label: params.words('icon_width'),
                                description: params.words('icon_width_description')                              
                            },
                            element: 'svg'

                        }, {
                            name: 'height',
                            template: 'number',
                            value: 24,
                            unit: 'px',
                            text: {
                                label: params.words('icon_height'),
                                description: params.words('icon_height_description')                              
                            },
                            element: 'svg'

                        }

                    ],
                    collapsed: false

                }, {
    
                    title: params.words('space'),
                    list: [
                        
                        {
                            name: 'column_gap',
                            template: 'number',
                            value: 5,
                            unit: 'px',
                            text: {
                                label: params.words('icons_space'),
                                description: params.words('icons_space_description')                              
                            },
                            element: 'ul'

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
                                label: params.words('icons_position'),
                                description: params.words('icons_position_description')                              
                            },
                            element: '.ec-display-flex'
                    
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