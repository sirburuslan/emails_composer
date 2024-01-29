/**
 * @class Builder
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Runs the composer with all dependencies
 */

// Import events class
import Classes from '../classes/classes.index.js';

// Import components
import Components from '../components/components.index.js';

// Import inc
import {
    get_option,
    show_message,
    get_word,
    get_icon,
    get_section,
    get_styles,
    get_content,
    get_template,
    get_fonts_link
} from '../inc/inc.index.js';

// Import types
import {
    params_type,
    builder_options_type
} from '../../src/resources/types/types.index.js';

// Import views
import {
    header,
    menu,
    element,
    body
} from '../views/views.index.js';

// Import tabs
import {
    modules,
    elements,
    history,
    rows
} from '../views/tabs/tabs.index.js';

// Import plugins
import Plugins from '../plugins/plugins.index.js';

// Controllers
export namespace Controllers {

    // Builder
    export class Builder {

        // Element
        element: string = '';

        /**
         * Constructor
         * 
         * @param string element
         */
        constructor (element: string) {

            // Save element
            this.element = element;

        }

        // Initialize
        initialize(): void {

            // Verify if the header tag exists
            if ( document.getElementsByTagName('head').length < 1 ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('no_head_tag_found'));

            } else {

                // Get the builder options
                let builder_options: builder_options_type = get_option('builder');

                // Check if options exists
                if ( typeof builder_options !== 'boolean' ) {

                    // Check for css
                    if ( typeof builder_options.css === 'object' ) {

                        // Check for css hrefs
                        if ( builder_options.css.length > 0 ) {

                            // List the hrefs
                            for ( let css of builder_options.css ) {

                                // Check if href is already added
                                if ( !document.querySelector('link[href="' + css.href + '"]') ) {

                                    // Create the link
                                    let css_link = document.createElement('link');

                                    // Set url
                                    css_link.setAttribute('href', css.href);

                                    // Set rel
                                    css_link.setAttribute('rel', 'stylesheet');

                                    // Add link to the page
                                    document.getElementsByTagName('head')[0].append(css_link);

                                }

                            }

                        }

                    }

                }

                // Default css url
                let default_css_url = get_option('base_url') + 'public/styles/css/main.css?ver=1';

                // Get the css link
                let css_link = document.querySelector('link[href="' + default_css_url + '"]');

                // Verify if the css link already exists
                if ( !css_link ) {

                    // Create the link
                    let link = document.createElement('link');

                    // Set url
                    link.setAttribute('href', default_css_url);

                    // Set rel
                    link.setAttribute('rel', 'stylesheet');

                    // Set id
                    link.setAttribute('id', 'ec-composer-css-link');

                    // Add link to the page
                    document.getElementsByTagName('head')[0].append(link);

                }

            }

        }

        // Setup
        setup(): void {

            // Get the builder options
            let builder_options: builder_options_type = get_option('builder');

            // Select the element
            let selector = document.querySelector<HTMLElement>(this.element);

            // Set overflow
            selector!.style.overflow = 'hidden';

            // Builder container
            let container = '<div class="ec-composer"></div>';

            // Set container
            selector!.innerHTML = container;

            // Check if the animation should be displayed
            if ( builder_options?.start?.animation ) {

                // Display the loading
                new Plugins.StartLoading().get_content(selector);

            }

            // Generate an unique ID
            let template_id: string = '';

            // Verify if a default template's id exists
            if ( builder_options.template_id ) {

                // Replace the template's id
                template_id = builder_options.template_id;
                
                // Load template
                this.template(template_id, false);

            } else {

                // Replace the template's id
                template_id = this.uniqueid();
                
                // Save template
                this.template(template_id, true);
                
            }

            // Set pause
            setTimeout(() => {

                // View params
                let view_params: params_type = {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon,
                    selector: selector as HTMLElement
                };

                // Prepare the builder
                let builder = '';

                // Add header to the builder
                builder += header(view_params);

                // Add the menu to the builder
                builder += menu(view_params);

                // Add the element to the builder
                builder += element(view_params);                    

                // Add the body to the builder
                builder += body(view_params);                   

                // Display the builder
                selector!.querySelector('.ec-composer')!.innerHTML += builder;

                // Get iframe for template
                let itemplate: any = selector!.getElementsByClassName('ec-composer-template-container');

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
                        itemplate[0].contentDocument.head.innerHTML += css_link.outerHTML;

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
                    itemplate[0].contentDocument.head.innerHTML += link.outerHTML;

                }

                // Append styles
                itemplate[0].contentDocument.head.innerHTML += get_styles('template');

                // Append styles
                itemplate[0].contentDocument.head.innerHTML += get_styles('library');

                // Append styles
                itemplate[0].contentDocument.head.innerHTML += get_styles('default');

                // Append template container
                itemplate[0].contentDocument.body.innerHTML = '<div class="ec-composer-template"></div>';

                // Append table
                itemplate[0].contentDocument.body.getElementsByClassName('ec-composer-template')[0].innerHTML = get_content({
                    'format': 1
                }).outerHTML;

            }, 300);

            // Set pause
            setTimeout(() => {

                // Prepare the tabs
                let tabs = '';

                // Add elements tab to the builder
                tabs += elements({
                    template_id: template_id
                });     
                
                // Add rows tab to the builder
                tabs += rows({
                    template_id: template_id
                }); 

                // Add modules tab to the builder
                tabs += modules({
                    template_id: template_id
                });
                
                // Add history tab to the builder
                tabs += history({
                    template_id: template_id
                });

                // Display the tabs
                selector!.querySelector('.ec-tabs')!.innerHTML += tabs;

            }, 700);
            
            // Set pause
            setTimeout(() => {

                // Add elements section
                selector!.querySelector('#ec-tab-elements-' + template_id)!.innerHTML += get_section('elements', {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon,
                    selector: selector
                });

                // Add rows section
                selector!.querySelector('#ec-tab-rows-' + template_id)!.innerHTML += get_section('rows', {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon
                });

                // Display the rows in the modal
                selector!.querySelector('.ec-composer-modal[data-scope="ec-composer-rows-modal"] .ec-composer-modal-body .ec-rows')!.innerHTML += get_section('rows', {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon,
                    only_rows: 1
                });                    

                // Add modules section
                selector!.querySelector('#ec-tab-modules-' + template_id)!.innerHTML += get_section('modules', {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon
                });

                // Add history section
                selector!.querySelector('#ec-tab-history-' + template_id)!.innerHTML += get_section('history', {
                    template_id: template_id,
                    options: get_option,
                    words: get_word,
                    icons: get_icon
                });

                // Get components
                let components_list = Object.keys(Components);
                
                // Verify if components exists
                if ( components_list.length > 0 ) {

                    // List the components
                    for ( let component of components_list ) {

                        // Component class
                        let component_class: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(Components, component);

                        // Get the events
                        let component_events = new component_class!.value().get_events({
                            options: get_option,
                            words: get_word,
                            icons: get_icon,
                            selector: selector,
                            template_id: template_id
                        });
                        
                        // Verify if events exists
                        if ( component_events.length > 0 ) {

                            // List the events
                            for ( let event of component_events ) {

                                // Check if the event has valid parameters
                                if ( (typeof event.capture === 'boolean') && (typeof event.target === 'function') && (typeof event.action === 'string') ) {

                                    // Set iframe
                                    let iframe: string = (typeof event.iframe !== 'undefined')?event.iframe:'';

                                    // Verify if element exists
                                    if ( typeof event.element === 'string' ) {

                                        // Register event
                                        new Classes.Events().addEventListener(selector!.querySelectorAll(event.element), event.action, event.target, iframe, event.capture);

                                    } else {

                                        // Register event
                                        new Classes.Events().addEventListener('', event.action, event.target, iframe, event.capture);
                                        
                                    }

                                }

                            }

                        }

                    }

                }

            }, 1000);

        }

        /**
         * Generate unique id
         * 
         * @returns unique id
         */        
        uniqueid(): string {

            // String
            let allowed: string = 'abcdefghijklmnopqrstuvwxyz';

            // Total characters
            let tchars = allowed.length;

            // First number
            let first_number: number = Math.floor(Math.random() * tchars);

            // First char
            let first_char: string = allowed.slice(first_number, (first_number + 1));

            // Second number
            let second_number: number = Math.floor(Math.random() * tchars);

            // Second char
            let second_char: string = allowed.slice(second_number, (second_number + 1));

            return first_char + second_char + Date.now();

        }

        /**
         * Save a template
         * 
         * @param string template_id
         * @param boolean create
         */
        template(template_id: string, create: boolean): void {  

            // Set element
            let element: string = this.element;

            // Select the element
            let selector = document.querySelector(element) as HTMLElement;
            
            // Create params
            let params: params_type = {
                options: get_option,
                selector: selector,
                words: get_word,
                icons: get_icon,
                template_id: template_id
            };

            // Init http request
            let http_send = new Classes.Https();

            // Check if selector is not undefined
            if ( selector !== undefined ) {

                // Set pause
                setTimeout((): void => {    
                    
                    // Verify if the template should be created
                    if ( create ) {

                        // Init the backup
                        new Classes.Backup().save_html_update(params);

                        // Create template
                        let send_request = new Promise((resolve, reject): void => {

                            // Get the template's content
                            let template_html: string = get_template(params);

                            // Set template
                            let template: {
                                template_id: string,
                                html: string,
                                css: string,
                                library: string
                            } = {
                                template_id: template_id,
                                html: template_html,
                                css: get_styles('default').replace('<style data-scope="default">', '').replace('</style>', ''),
                                library: get_styles('library').replace('<style>', '').replace('</style>', '')
                            };

                            // Send a create template request
                            let response = http_send.post(get_option('base_url') + 'api/create_template', template);

                            // Return response
                            resolve(response);

                        });

                        // Process the responsez
                        send_request.then(response => {

                            // Verify if the response is positive
                            if ( (response as {success: boolean}).success ) {

                                // Init the backup
                                new Classes.Backup().save_html_update(params);

                                // Get all history
                                new Classes.History().get_history_all(params);

                                // Get last saved change
                                new Classes.History().get_history_recent(params, 'ec-composer-template-container');  

                            }

                        });                    

                        // Process the error
                        send_request.catch(error => {

                            // Return error
                            show_message(error);

                        });

                    } else {

                        // Init the backup
                        new Classes.Backup().save_html_update(params);

                        // Get all history
                        new Classes.History().get_history_all(params);

                        // Get last saved change
                        new Classes.History().get_history_recent(params, 'ec-composer-template-container');  

                    }

                }, 500);

            }
            
        }

    }   

}