/**
 * @class Modules
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * The goal of this class is to create and manage de modules
 */

// Import components interface
import Classes from '../classes/classes.index.js';

// Import the incs
import { 
    show_modal_message,
    get_structure_buttons,
    get_element_buttons,
    remove_buttons, 
    show_message 
} from '../inc/inc.index.js';

// Import the types
import { 
    params_type, 
    module_type 
} from '../resources/types/types.index.js';

// Class Namespace
export namespace Class {

    // Modules
    export class Modules {

        /**
         * Get the categories
         * 
         * @param params_type params
         * 
         * @returns array with the modules categories
         */
        get_modules_categories(params: params_type): Array<{ name: string, slug: string }> {

            return [{
                name: params.words('header'),
                slug: 'header'
            }, {
                name: params.words('footer'),
                slug: 'footer'
            }, {
                name: params.words('social'),
                slug: 'social'
            }, {
                name: params.words('buttons'),
                slug: 'buttons'
            }, {
                name: params.words('gallery'),
                slug: 'gallery'
            }, {
                name: params.words('uncategorized'),
                slug: 'uncategorized'
            }];

        }

        /**
         * Create a module
         * 
         * @param params_type params
         * @param module_type module
         */
        async create_module(params: params_type, module: module_type): Promise<void> {

            // Create the fields
            const fields: { module: module_type } = {
                module: module
            };

            // Create the request params
            const request_params: {[key: string]: string | {
                [key: string]: string
            }} = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fields)
            };

            // Execute request
            const response = await fetch(params.options('api_url') + 'api/create_module', request_params);

            // Verify if the response is failed
            if (!response.ok) {

                // Handle different error statuses
                if (response.status === 404) {

                    // Show error message
                    show_modal_message(params, 'error', params.words('error_name') + ': ' + params.words('resource_not_found'));

                } else if (response.status === 500) {

                    // Show error message
                    show_modal_message(params, 'error', params.words('error_name') + ': ' + params.words('internal_server_error'));            
                    
                } else {

                    // Show error message
                    show_modal_message(params, 'error', params.words('error_name') + ': ' + params.words('unknown_error_occurred'));             
                    
                }

                return;
                
            }

            // Process the response
            const json: {success: boolean, message: string} = await response.json();

            // Remove the class ec-save-module-button
            params.selector.querySelector('.ec-composer-modal-show')!.getElementsByClassName('ec-save-module-button')[0].classList.remove('ec-saving-module-button');

            // Verify if the module was created
            if ( json.success ) {

                // Show success message
                show_modal_message(params, 'success', json.message);   
                
                // Get the create module modal
                const create_module: Element | null = params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]');

                // Empty the name
                (create_module!.getElementsByClassName('ec-menu-module-name')[0] as HTMLInputElement).value = '';

                // Empty the description
                (create_module!.getElementsByClassName('ec-menu-module-description')[0] as HTMLInputElement).value = '';

                // Hide the new module extra fields
                create_module!.getElementsByClassName('ec-module-advanced-fields')[0].classList.remove('ec-module-advanced-fields-expanded');

                // Reset the categories
                create_module!.getElementsByClassName('ec-module-category-button')[0].removeAttribute('data-id');
                create_module!.querySelectorAll('.ec-module-category-button > span')[0].textContent = params.words('uncategorized');

                // Add show modal class
                create_module!.classList.add('ec-composer-modal-show');  
                
                // Hide the upload list
                create_module!.classList.add('ec-composer-modal-show'); 

                // Empty the upload list
                create_module!.getElementsByClassName('ec-cover-uploaded-files')[0].classList.remove('ec-cover-uploaded-files-show');

                // Remove the class ec-save-module-button
                create_module!.getElementsByClassName('ec-save-module-button')[0].classList.remove('ec-saving-module-button');

                // Empty the modules list
                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules')!.innerHTML = '';

                // Load the modules
                this.get_modules(params, 'personal', 1);

            } else {

                // Show error message
                show_modal_message(params, 'error', json.message); 

            }

        }

        /**
         * Get the modules list
         * 
         * @param params_type params 
         * @param string type 
         * @param number page 
         */
        async get_modules(params: params_type, type: string, page: number): Promise<void> {

            // Prepare the fields
            const fields: { type: string, page: number, category?: string, search?: string } = {
                type: type,
                page: page,
                search: (type === 'personal')?(params.selector.querySelector('.ec-modules-component .ec-search-personal-modules') as HTMLInputElement).value:(params.selector.querySelector('.ec-modules-component .ec-search-default-modules') as HTMLInputElement).value
            };

            // Verify if the type if default
            if (type === 'default') {

                // Get the category
                const category: string | null = params.selector.querySelector('.ec-option-selector-dropdown .ec-button')!.getAttribute('data-id');

                // Verify if a category is selected
                if ( category ) {

                    // Set category
                    fields['category'] = category;

                }

            }

            // Create the request parameters
            const request_params: {[key: string]: string | {
                [key: string]: string
            }} = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            };

            // Get the response
            const response = await fetch(params.options('api_url') + 'api/get_modules', request_params);

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

                // No modules were found
                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules-list')!.classList.add('ec-no-modules-message');

                return;
                
            }

            // Process the response
            const json = await response.json();

            // Check if type is personal
            if (type === 'personal') {

                // Remove the ec-load-more-active class
                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-loading-button > a')!.classList.remove('ec-load-more-active');

                // Verify if modules exists
                if ( (typeof json.modules !== 'undefined') && (json.modules.length > 0) ) {

                    // Remove the modules were found message
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules-list')!.classList.remove('ec-no-modules-message');

                    // Modules list container
                    let modules_list: string = '';

                    // List the modules
                    for ( const module of json.modules ) {

                        // Add module to the modules list
                        modules_list += '<a href="#" class="ec-module" data-module="' + module.id + '">'
                            + '<img src="' + params.options('share_url') + module.cover + '" alt="' + module.name + '">'
                            + '<div>'
                                + module.name
                            + '</div>'
                        + '</a>';

                    }

                    // Append modules
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules')!.insertAdjacentHTML('beforeend', modules_list);

                    // Set page for the loading button
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-loading-button')!.setAttribute('data-page', (json.page! + 1).toString());

                    // Verify if there are 10 modules
                    if ( json.modules.length > 9 ) {

                        // Remove the ec-loading-disabled-button class
                        params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-loading-button')!.classList.remove('ec-loading-disabled-button');                

                    } else {

                        // Add the ec-loading-disabled-button class
                        params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-loading-button')!.classList.add('ec-loading-disabled-button');

                    }

                } else {

                    // No modules were found
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules-list')!.classList.add('ec-no-modules-message');

                }

            } else {

                // Remove the ec-load-more-active class
                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-loading-button > a')!.classList.remove('ec-load-more-active');

                // Verify if modules exists
                if ( (typeof json.modules !== 'undefined') && (json.modules.length > 0) ) {

                    // Remove the modules were found message
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules-list')!.classList.remove('ec-no-modules-message');

                    // Modules list container
                    let modules_list: string = '';

                    // List the modules
                    for ( const module of json.modules ) {

                        // Add module to the modules list
                        modules_list += '<a href="#" class="ec-module" data-module="' + module.id + '">'
                            + '<img src="' + params.options('share_url') + module.cover + '" alt="' + module.name + '">'
                            + '<div>'
                                + module.name
                            + '</div>'
                        + '</a>';

                    }

                    // Append modules
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules')!.insertAdjacentHTML('beforeend', modules_list);

                    // Set page for the loading button
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-loading-button')!.setAttribute('data-page', (json.page! + 1).toString());

                    // Verify if there are 10 modules
                    if ( json.modules.length > 9 ) {

                        // Remove the ec-loading-disabled-button class
                        params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-loading-button')!.classList.remove('ec-loading-disabled-button');                

                    } else {

                        // Add the ec-loading-disabled-button class
                        params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-loading-button')!.classList.add('ec-loading-disabled-button');

                    }

                } else {

                    // No modules were found
                    params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules-list')!.classList.add('ec-no-modules-message');

                }

            }

        }

        /**
         * Get a module and add it in the template
         * 
         * @param params 
         * @param module_id
         * @param module_type
         */
        async get_module(params: params_type, module_id: string, module_type: string): Promise<void> {

            // Prepare the fields
            const fields: {module_id: string, module_type: string} = {
                module_id: module_id,
                module_type: module_type
            };

            // Prepare the request parameters
            const request_params: {[key: string]: string | {
                [key: string]: string
            }} = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            };

            // Request the module
            const response = await fetch(params.options('api_url') + 'api/get_module', request_params);

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

            // Process the response
            const json: {success: boolean, message?: string, html?: string, css?: string} = await response.json();

            // Verify if the module was created
            if ( json.success ) {

                // JSON HTML container
                let json_html: string | undefined = json.html;

                // Replace the unclosed br
                json_html = json_html!.replaceAll('<br>', '<br />');

                // Replace the unclosed img
                json_html = json_html!.replaceAll(/<img(.*?)>/g, '<img$1/>');                

                // Parse HTML to DOM
                const html: Document = new DOMParser().parseFromString(json_html, "text/xml");

                // Get the elements ids from html
                const html_elements: HTMLCollectionOf<Element> = html.getElementsByClassName('ec-element-content');

                // Elements ids container
                const elements_ids: string[] = [];

                // Verify if html elements exists
                if ( html_elements.length > 0 ) {

                    // Index counter
                    let index: number = 0;

                    // List the elements
                    for ( const element of html_elements ) {

                        // Create a id for the element
                        const element_id: string = 'ec-element-' + index + '-' + Date.now();

                        // Add element's id to elements_ids
                        elements_ids.push(element_id);

                        // Replace element's id in html
                        json.html = json.html!.replaceAll(element.getAttribute('data-id')!, element_id);

                        // Replace element's id in css
                        json.css = json.css!.replaceAll(element.getAttribute('data-id')!, element_id);

                        // Increase the index
                        index++;

                    }

                }

                // Get iframe for template
                const itemplate = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                // Get content document
                const idocument: Document | null = itemplate.contentDocument;

                // Check if idocument is not null
                if ( idocument ) {

                    // Verify if elements_ids is not empty
                    if ( elements_ids.length > 0 ) {

                        // Get the module's placeholder
                        const module_placeholder: HTMLCollectionOf<Element> = idocument.getElementsByClassName('ec-composer-template-module-placeholder');

                        // Verify if module placeholder exists
                        if ( module_placeholder.length > 0 ) {

                            // Get structures buttons
                            const structure_buttons: string = get_structure_buttons();                            

                            // Replace the module placeholder
                            module_placeholder[0].closest('.ec-composer-template-content-line')!.outerHTML = json.html!.replace('ec-composer-template-content-line', 'ec-composer-template-content-line ec-composer-template-content-line-temp-show');

                            // Insert the buttons
                            idocument!.getElementsByClassName('ec-composer-template-content-line-temp-show')[0]!.insertAdjacentHTML('afterbegin', structure_buttons);

                            // Set pause
                            setTimeout((): void => { 
                                
                                // Remove the ec-composer-template-content-line-temp-show class
                                idocument!.getElementsByClassName('ec-composer-template-content-line-temp-show')[0].classList.remove('ec-composer-template-content-line-temp-show');

                            }, 300);

                            // Append styles
                            idocument.head.innerHTML += json.css;       

                        }

                        // Get the element buttons
                        const element_buttons: string = get_element_buttons();

                        // CSS Elements
                        let css_elements: {[key: string]: string} | null = null;

                        // List the elements ids
                        for ( const element_id of elements_ids ) {

                            // Get the style tag
                            const style: HTMLStyleElement | null = idocument.head.querySelector('style[data-element="' + element_id + '"]');

                            // Check if style exists
                            if ( style !== null ) {

                                // Verify if css elements is not empty
                                if ( css_elements !== null ) {

                                    // Add styles
                                    css_elements![element_id] = style.innerText;
                                    
                                } else {

                                    // Add styles
                                    css_elements = {
                                        [element_id]: style.innerText
                                    };

                                }

                            }

                            // Insert the element's buttons
                            idocument!.querySelector('.ec-element-content[data-id="' + element_id + '"]')!.insertAdjacentHTML('afterbegin', element_buttons);

                        }

                        // Verify if css elements is not empty
                        if ( css_elements !== null ) {

                            // Init the backup class
                            const backup = new Classes.Backup();

                            // Save backup
                            backup.save_module(params, css_elements, remove_buttons(idocument.getElementsByClassName('ec-composer-template')[0].outerHTML));

                        }

                    }

                }

            } else {

                // Show error message
                show_message(params.words('error_name') + ': ' + json.message);
                
            }

        }

    }

}