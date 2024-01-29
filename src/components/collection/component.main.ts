/**
 * @class Main
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the general events in the emails composer
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import the classes
import Classes from "../../classes/classes.index.js";

// Import core
import { CoreInstances } from '../../core/core.index.js';

// Import inc
import {
    get_option,
    get_styles,
    get_content,
    get_fonts_link,
    get_template_options,
    unselect_element,
    show_message
} from '../../inc/inc.index.js';

// Import the types
import {
    params_type,
    events_type,
    options_template_type,
    builder_options_type 
} from '../../resources/types/types.index.js';

// Components
export namespace Components {

    // Main
    export class Main implements InterfaceComponents.Interfaces.Components {

        get_events(params: params_type): events_type {

            return [

                {
                    action: 'focus',
                    element: '.ec-composer .ec-composer-name .ec-composer-name-text',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Add active class
                        (e.target as Element).closest('.ec-composer-name')!.classList.add('ec-composer-name-active');

                    },
                    capture: false

                }, {
                    action: 'focusout',
                    element: '.ec-composer .ec-composer-name .ec-composer-name-text',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Remove active class
                        (e.target as Element).closest('.ec-composer-name')!.classList.remove('ec-composer-name-active');

                    },
                    capture: false

                }, {
                    action: 'keyup',
                    element: '.ec-composer .ec-composer-name .ec-composer-name-text',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
                        
                        // Add unsaved changes class
                        (e.target as Element).closest('.ec-composer-name')!.classList.add('ec-composer-name-unsaved-changes');

                    },
                    capture: false

                }, {
                    action: 'change',
                    element: '.ec-composer .ec-composer-mode > input[type="radio"]',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
                        
                        // Verify if preview should be showed
                        if ( (e.target as HTMLInputElement).value === '1' ) {

                            // Empty the preview
                            params.selector.getElementsByClassName('ec-composer-preview')[0].innerHTML = '';

                            // Show the preview
                            params.selector.getElementsByClassName('ec-composer-preview')[0].classList.add('ec-composer-preview-show');

                            // Get the builder options
                            let builder_options: builder_options_type = get_option('builder');

                            // Get iframe for template
                            let itemplate: HTMLIFrameElement = document.createElement('iframe');

                            // Set class
                            itemplate.classList.add('ec-composer-template-preview');

                            // Set frameborder
                            itemplate.setAttribute('frameborder', '0');

                            // Set sandbox
                            itemplate.setAttribute('sandbox', 'allow-same-origin allow-modals');

                            // Insert iframe
                            params.selector.getElementsByClassName('ec-composer-preview')[0].appendChild(itemplate);

                            // Check for css
                            if ( typeof builder_options.css === 'object' ) {

                                // Check for css hrefs
                                if ( builder_options.css.length > 0 ) {

                                    // Create the link
                                    let css_link = document.createElement('link');

                                    // Set url
                                    css_link.setAttribute('href', builder_options.css[0].href);

                                    // Set rel
                                    css_link.setAttribute('rel', 'stylesheet');

                                    // Add link to the page
                                    itemplate.contentDocument!.head.innerHTML += css_link.outerHTML;

                                }

                            }
                            
                            // Get the fonts link
                            let fonts_link: string = get_fonts_link();

                            // Check if font exists
                            if ( fonts_link ) {

                                // Create a link
                                let link: HTMLLinkElement = document.createElement('link');

                                // Set href
                                link.setAttribute('href', fonts_link);

                                // Set rel
                                link.setAttribute('rel', 'stylesheet');

                                // Append link to the document
                                document.head.appendChild(link);

                                // Append link to iframe
                                itemplate.contentDocument!.head.innerHTML += link.outerHTML;

                            }

                            // Append styles
                            itemplate.contentDocument!.head.innerHTML += get_styles('template');

                            // Append styles
                            itemplate.contentDocument!.head.innerHTML += get_styles('library');

                            // Append styles
                            itemplate.contentDocument!.head.innerHTML += get_styles('default');

                            // Append template container
                            itemplate.contentDocument!.body.innerHTML = '<div class="ec-composer-template"></div>';

                            // Append table
                            itemplate.contentDocument!.body.getElementsByClassName('ec-composer-template')[0].innerHTML = get_content({
                                'format': 1
                            }).outerHTML;

                            // Get last saved change
                            new Classes.History().get_history_recent(params, 'ec-composer-template-preview');

                            // Set pause
                            setTimeout((): void => {

                                // Append table
                                itemplate.contentDocument!.body.getElementsByClassName('ec-composer-template')[0].classList.add('ec-disable-mouse');
                                
                            }, 300);

                        } else {

                            // Hide the preview
                            params.selector.getElementsByClassName('ec-composer-preview')[0].classList.remove('ec-composer-preview-show');

                        }

                    },
                    capture: false

                }, {
                    action: 'click',
                    element: '.ec-composer .ec-composer-name-icon',
                    target: async (e: MouseEvent): Promise<void> => {
                        e.preventDefault();

                        // Get the template's name
                        let template_name: string | null = (e.target as Element).closest('.ec-composer-name')!.getElementsByClassName('ec-composer-name-text')[0].textContent;

                        // Verify if template's name is not null
                        if ( template_name ) {

                            // Prepare the post's fields
                            let post_fields: {
                                template_id: string,
                                template_name: string
                            } = {
                                template_id: params.template_id as string,
                                template_name: template_name
                            };

                            // Prepare the request parameters
                            let request_params: {[key: string]: string | {
                                [key: string]: string
                            }} = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(post_fields)
                            };

                            // Get the response
                            let response = await fetch(params.options('api_url') + 'api/update_template_name', request_params);

                            // Verify if the response is failed
                            if (!response.ok) {

                                // Handle different error statuses
                                if (response.status === 404) {

                                    // Show error message
                                    show_message(params.words('error_name') + ': ' + params.words('resource_not_found'));

                                } else if (response.status === 500) {

                                    // Show error message
                                    show_message(params.words('error_name') + ': ' + params.words('internal_server_error'));            
                                    
                                } else {

                                    // Show error message
                                    show_message(params.words('error_name') + ': ' + params.words('unknown_error_occurred'));             
                                    
                                }

                                return;
                                
                            }

                            // Turn response into json
                            let json = await response.json();

                            // Remove unsaved changes class
                            (e.target as Element).closest('.ec-composer-name')!.classList.remove('ec-composer-name-unsaved-changes');

                            // Set a pause
                            setTimeout((): void => {

                                // Remove saved changes class
                                (e.target as Element).closest('.ec-composer-name')!.classList.remove('ec-composer-name-saved-changes'); 
                                
                                // Remove failed saved changes class
                                (e.target as Element).closest('.ec-composer-name')!.classList.remove('ec-composer-name-saved-failed-changes');                                 

                            }, 2000);                             

                            // Verify if the changes were saved
                            if ( json.success ) {

                                // Add success saved changes class
                                (e.target as Element).closest('.ec-composer-name')!.classList.add('ec-composer-name-saved-changes');

                            } else {

                                // Add failed saved changes class
                                (e.target as Element).closest('.ec-composer-name')!.classList.add('ec-composer-name-saved-failed-changes');                                

                                // Show error message
                                show_message(params.words('error_name') + ': ' + json.message);
                                
                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'click',
                    element: '.ec-composer .ec-save-settings-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Unselect the element
                        unselect_element(params);

                        // Verify if is enabled the preview mode
                        if ( params.selector.getElementsByClassName('ec-composer-preview')[0].classList.contains('ec-composer-preview-show') ) {

                            // Change to the editor mode
                            (params.selector.querySelectorAll('.ec-composer-mode input[type="radio"]')[0] as HTMLInputElement).click();

                        }

                        // Add show shadow class
                        params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-show');
                        
                        // Get the settings modal
                        let settings_modal: Element | null = params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-settings-modal"]');

                        // Add show modal class
                        settings_modal!.classList.add('ec-composer-modal-show');

                        // These are the default tempate's options
                        let default_options: options_template_type = [{
    
                            title: params.words('position'),
                            list: [{
                                name: 'text_align',
                                template: 'position',
                                value: 'center',
                                text: {
                                    label: params.words('template_position'),
                                    description: params.words('template_position_description')                              
                                },
                                element: 'td:has(.ec-composer-template-row)'
                        
                            }],
                            collapsed: true
        
                        }, {
    
                            title: params.words('margin'),
                            list: [{
                                name: 'padding_top',
                                template: 'number',
                                value: 0,
                                unit: 'px',
                                text: {
                                    label: params.words('margin_top'),
                                    description: params.words('margin_top_description')                              
                                },
                                element: '.ec-composer-template'
                        
                            }, {
                                name: 'padding_right',
                                template: 'number',
                                value: 0,
                                unit: 'px',
                                text: {
                                    label: params.words('margin_right'),
                                    description: params.words('margin_right_description')                              
                                },
                                element: '.ec-composer-template'
                        
                            }, {
                                name: 'padding_bottom',
                                template: 'number',
                                value: 0,
                                unit: 'px',
                                text: {
                                    label: params.words('margin_bottom'),
                                    description: params.words('margin_bottom_description')                              
                                },
                                element: '.ec-composer-template'
                        
                            }, {
                                name: 'padding_left',
                                template: 'number',
                                value: 0,
                                unit: 'px',
                                text: {
                                    label: params.words('margin_left'),
                                    description: params.words('margin_left_description')                              
                                },
                                element: '.ec-composer-template'
                        
                            }],
                            collapsed: false
        
                        }, {
    
                            title: params.words('width'),
                            list: [{
                                name: 'width',
                                template: 'number',
                                value: 950,
                                unit: 'px',
                                text: {
                                    label: params.words('width'),
                                    description: params.words('template_width_description')                              
                                },
                                element: '.ec-composer-template-row'
    
                            }],
                            collapsed: false
        
                        }, {

                            title: params.words('colors'),
                            list: [{
                                name: 'background_color',
                                template: 'color',
                                value: '#FFFFFC',
                                text: {
                                    label: params.words('color_background'),
                                    description: params.words('color_background_description')                              
                                },
                                element: '.ec-composer-template'
    
                            }, {
                                name: 'background_color',
                                template: 'color',
                                value: '#FFFFFC',
                                text: {
                                    label: params.words('template_color_background'),
                                    description: params.words('template_color_background_description')                              
                                },
                                element: '.ec-composer-template-row'
    
                            }],
                            collapsed: false
        
                        }, {

                            title: params.words('analytics'),
                            list: [{
                                    name: 'google_analytics',
                                    template: 'checkbox',
                                    value: 0,
                                    text: {
                                        label: params.words('google_analytics'),
                                        description: params.words('google_analytics_description')                              
                                    },
                                    element: ''
        
                                }, {
                                name: 'analytics',
                                template: 'list',
                                items: [{
                                    name: 'utm_source',
                                    label: params.words('utm_source'),
                                    description: params.words('utm_source_description'),
                                    placeholder: params.words('utm_enter_source') 

                                }, {
                                    name: 'utm_medium',
                                    label: params.words('utm_medium'),
                                    description: params.words('utm_medium_description'),
                                    placeholder: params.words('utm_enter_medium')  

                                }, {
                                    name: 'utm_campaign',
                                    label: params.words('utm_campaign'),
                                    description: params.words('utm_campaign_description'),
                                    placeholder: params.words('utm_enter_campaign') 

                                }, {
                                    name: 'utm_term',
                                    label: params.words('utm_term'),
                                    description: params.words('utm_term_description'),
                                    placeholder: params.words('utm_enter_term')

                                }, {
                                    name: 'utm_content',
                                    label: params.words('utm_content'),
                                    description: params.words('utm_content_description'),
                                    placeholder: params.words('utm_enter_content')

                                }]
    
                            }],
                            collapsed: false
        
                        }];

                        // Properties list
                        let properties_list: {[key: string]: {[key: string]: number | string}} = {};

                        // Get iframe for template
                        let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                        // Check if iframe exists
                        if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                            // Get the iframe document
                            let idocument: Document | null = iframe_template[0].contentDocument;

                            // Check if document is not null
                            if ( idocument !== null ) {

                                // Get default's style
                                let default_styles: HTMLStyleElement | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-scope="default"]');

                                // Verify if default's style exists
                                if ( (typeof default_styles !== 'undefined') && default_styles ) {

                                    // Get the sheet
                                    let sheet: CSSStyleSheet | null = default_styles.sheet;

                                    // Check if sheet exists
                                    if ( sheet !== null ) {
                                        
                                        // Verify if rules exists
                                        if ( sheet.cssRules.length > 0 ) {

                                            // List all rules
                                            for ( let rule of sheet.cssRules ) {

                                                // Check if media exists
                                                if ( typeof (rule as CSSMediaRule).media === 'undefined' ) {

                                                    // Get style
                                                    let style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                                                    // List the properties
                                                    for ( let property of (rule as CSSStyleRule).style ) {

                                                        // Verify if element's name is already saved
                                                        if ( typeof properties_list[(rule as CSSStyleRule).selectorText] !== 'undefined' ) {

                                                            // Save style
                                                            properties_list[(rule as CSSStyleRule).selectorText][property] = style.getPropertyValue(property);

                                                        } else {

                                                            // Save style
                                                            properties_list[(rule as CSSStyleRule).selectorText] = {
                                                                [property]: style.getPropertyValue(property)
                                                            };

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }

                            }

                        }

                        // Get the template's options
                        let template_options: string | undefined = get_template_options(default_options, properties_list, params);

                        // Verify if options exists
                        if ( typeof template_options !== 'undefined' ) {

                            // Display the template's options
                            params.selector.querySelector('.ec-composer .ec-composer-modal[data-scope="ec-composer-settings-modal"] .ec-composer-modal-body .ec-sections')!.innerHTML = template_options;

                        }

                    },
                    capture: false

                }, {
                    action: 'click',
                    element: '.ec-composer .ec-save-export-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Add show shadow class
                        params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-show');
                        
                        // Get the export modal
                        let export_modal: Element | null = params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-export-modal"]');

                        // Add show modal class
                        export_modal!.classList.add('ec-composer-modal-show');

                    },
                    capture: false

                }, {
                    action: 'click',
                    element: '.ec-composer .ec-templates-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Remove class ec-composer-show
                        params.selector.classList.remove('ec-composer-show');

                        // Set a pause
                        setTimeout((): void => {

                            // Empty the selector
                            params.selector.innerHTML = '';

                        }, 300);

                        // Get the saved events list
                        let events_list: Array<{node: any, action: string, target: any, iframe: string, capture: boolean}> | null = Classes.Events.events_list;

                        // Verify if events list exists
                        if ( events_list && (events_list.length > 0) ) {

                            // List the events list
                            for ( let event of events_list ) {

                                // Get the parameters
                                let {node, action, target, iframe, capture} = event;

                                // Check if the node is empty
                                if ( !node ) {

                                    // Verify if iframe exists
                                    if ( iframe ) {

                                        // Get iframe
                                        let iframes: any = document.querySelectorAll(iframe);

                                        // Verify if iframe exists
                                        if ( typeof iframes !== 'undefined' ) {

                                            // Register event
                                            iframes[0].contentWindow.removeEventListener(action, target, capture);

                                        }

                                    } else {

                                        // Register event
                                        document!.removeEventListener(action, target, capture); 

                                    }

                                } else {

                                    // Get all nodes
                                    let all_nodes = node.length;

                                    // List the nodes
                                    for ( var a = 0; a < all_nodes; a++ ) {

                                        // Register event
                                        node[a]!.removeEventListener(action, target, capture);

                                    }

                                }

                            }

                            // Empty the events
                            Classes.Events.events_list = null;

                        }

                        // Empty the instances
                        CoreInstances.Core.Instances.instances_list = {};

                    },
                    capture: false

                }, {
                    action: 'click',
                    element: '.ec-composer .ec-save-download-html-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get the target
                        let target = e.target as HTMLElement;

                        // Add show shadow class
                        target.classList.add('ec-save-download-active-button');

                        // Get the export module modal
                        let export_module: Element | null = params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-export-modal"]');

                        // Remove the class ec-composer-modal-message-error
                        export_module!.getElementsByClassName('ec-composer-modal-message')[0].classList.remove('ec-composer-modal-message-error');

                        // Prepare the request fields
                        let fields: {template_id?: string, format: string} = {
                            template_id: params.template_id,
                            format: 'html'
                        };

                        // Prepare the request parameters
                        let request_params: {[key: string]: string | {
                            [key: string]: string
                        }} = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(fields)
                        };

                        // Rest request
                        let request = fetch(params.options('api_url') + 'api/download_template', request_params);

                        // Process success response
                        request.then(response => {

                            // Return
                            return response.json();

                        }).then(response => {

                            // Remove ec-save-download-active-button
                            target.classList.remove('ec-save-download-active-button');

                            // Verify if response is false
                            if ( !response.success ) {

                                // Set message
                                export_module!.getElementsByClassName('ec-composer-modal-message')[0].textContent = response.message;

                                // Add ec-composer-modal-message-error
                                export_module!.getElementsByClassName('ec-composer-modal-message')[0].classList.add('ec-composer-modal-message-error');

                            } else {

                                document.location.href = params.options('share_url') + response.zip;

                            }

                        });

                        // Process error response
                        request.then(error => {
                            console.log(error);
                        });                        

                    },
                    capture: false

                }
                
            ];

        }

    }

}