/**
 * @class Backup
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class creates automatically backups for changes
 */

// Import the classes
import Classes from "../classes/classes.index.js";

// Import types
import { params_type } from '../resources/types/types.index.js';

// Import inc
import {
    show_index,
    remove_buttons,
    show_message
} from '../inc/inc.index.js';

// Import plugins
import Plugins from '../plugins/plugins.index.js';

// Class Namespace
export namespace Class {

    // Backup
    export class Backup {

        // Observer container
        _observer: any;

        // Removed content marker
        static _removed: number = 0;

        /**
         * Check for html updates and save them
         * 
         * @param params_type params
         */
        async save_html_update(params: params_type): Promise<void> {

            // Check if observer is active
            if ( this._observer ) {
                
                // Disconext observer
                this._observer.disconnect();

            }

            // Init http request
            let http_send = new Classes.Https();

            // Save this context
            let $this = this;

            // Get iframe
            let iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Verify if iframe exists
            if ( iframe ) {

                // Get content document
                let iframeDocument: Document | null = iframe.contentDocument;

                // Get html
                let html = iframeDocument?.getElementsByClassName('ec-composer-template');

                // Verify if html is not undefined
                if ( html !== undefined ) {
                    
                    // Verify if html has elements
                    if ( html.length > 0 ) {

                        // Select the target node that you want to observe for changes
                        let target_node: HTMLElement | null = html[0].closest('.ec-composer-template');

                        // Options for the observer (specify what types of mutations to observe)
                        let config = { attributes: true, childList: true, subtree: true, characterData: true };

                        // Create an observer instance linked to the callback function
                        this._observer = new MutationObserver((mutations_list: MutationRecord[]): void => {

                            // List the mutations
                            for ( let mutation of mutations_list ) {

                                // Get the mutation target
                                let mutation_target = mutation.target as Element;

                                // Verify if any content was removed
                                if ( (typeof mutation_target.classList !== 'undefined') && (mutation_target.classList.contains('ec-hide-content') || mutation_target.classList.contains('ec-composer-template-content-line')) ) {

                                    // Set removed marker
                                    Backup._removed = 1;

                                } else if ( mutation.nextSibling ) {

                                    // Check if was dropped an element
                                    if ( (mutation.nextSibling as Element).classList[0] === 'ec-composer-template-cell-drop' ) {

                                        console.log(84);

                                        // Set removed marker
                                        Backup._removed = 1;

                                    }

                                }

                                // Check if attributeName is contenteditable
                                if ( mutation.attributeName === 'contenteditable' ) {
                                    continue;
                                }

                                // Check if classes exists
                                if ( typeof mutation_target.classList !== 'undefined' ) {

                                    // Avoid changes for the container
                                    if ( mutation_target.classList.contains('ec-composer-template') && ((mutation.type !== 'attributes') || (mutation.attributeName === 'style')) ) {
                                        continue;
                                    }                                  

                                    // Avoid changes for lines
                                    if ( mutation_target.classList.contains('ec-composer-template-content-line-active') ) {
                                        continue;
                                    } 

                                    // Avoid changes for line drops
                                    if ( mutation_target.classList.contains('ec-composer-template-content-line-drop') ) {
                                        continue;
                                    }

                                    // Avoid changes for cell drops
                                    if ( mutation_target.classList.contains('ec-composer-template-cell-drop') ) {
                                        continue;
                                    } 
                                   
                                    // Avoid changes for hide structure
                                    if ( mutation_target.classList.contains('ec-hide-content') && !mutation_target.classList.contains('ec-composer-template-content-line') ) {
                                        continue;
                                    } 
                                   
                                    // Avoid changes for content line
                                    if ( mutation_target.classList.contains('ec-element-content') ) {
                                        continue;
                                    } 
                                   
                                    // Avoid changes for placeholder
                                    if ( mutation_target.classList.contains('ec-composer-template-cell-placeholder') ) {
                                        continue;
                                    } 

                                    // Avoid changes for selected line
                                    if ( mutation_target.classList.contains('ec-composer-template-content-line-selected') && !mutation_target.classList.contains('ec-hide-content') ) {
                                        continue;
                                    } 

                                }  

                                // Verify if added nodes exists
                                if ( mutation.addedNodes.length > 0 ) {

                                    // Check if added content is not text
                                    if ( mutation.addedNodes[0].toString() !== '[object Text]' ) {
                        
                                        // Verify if change is ec-composer-template-content-line
                                        if ( (mutation.addedNodes[0] as Element).classList[0] === 'ec-composer-template-content-line' ) {
                                            continue;
                                        }
                                        
                                        // Verify if change is ec-composer-template-content-line-drop
                                        if ( (mutation.addedNodes[0] as Element).classList[0] === 'ec-composer-template-content-line-drop' ) {
                                            continue;
                                        }                                        

                                        // Verify if change is ec-composer-template-cell-drop
                                        if ( (mutation.addedNodes[0] as Element).classList[0] === 'ec-composer-template-cell-drop' ) {
                                            continue;
                                        }

                                        // Verify if change is ec-composer-template-content-line-selected
                                        if ( (mutation.addedNodes[0] as Element).classList[0] === 'ec-composer-template-content-line-selected' ) {
                                            continue;
                                        }                                        

                                    }

                                }

                                // Verify if removed nodes exists
                                if ( mutation.removedNodes.length > 0 ) {

                                    // Check if removed content is not text
                                    if ( mutation.removedNodes[0].toString() !== '[object Text]' ) {

                                        // Verify if change is ec-composer-template-content-line-drop
                                        if ( (mutation.removedNodes[0] as Element).classList[0] === 'ec-composer-template-content-line-drop' ) {
                                            continue;
                                        }
                                        
                                        // Verify if change is ec-composer-template-cell-drop
                                        if ( (mutation.removedNodes[0] as Element).classList[0] === 'ec-composer-template-cell-drop' ) {
                                            continue;
                                        }
                                        
                                        // Verify if change is ec-composer-template-cell-placeholder
                                        if ( (mutation.removedNodes[0] as Element).classList[0] === 'ec-composer-template-cell-placeholder' ) {
                                            continue;
                                        } 

                                        // Verify if change is ec-composer-template-content-line-selected
                                        if ( (mutation.removedNodes[0] as Element).classList[0] === 'ec-composer-template-content-line-selected' ) {
                                            continue;
                                        }                                        

                                    }

                                }
                                
                                // Verify if html is not undefined
                                if ( typeof html !== 'undefined' ) {

                                    // Schedule event
                                    Classes.Timer.schedule_event('update_html', (): void => {

                                        // Show the animation
                                        $this.saving_animation(params, 'show');

                                        // Verify if any content was removed
                                        if ( Backup._removed > 0 ) {

                                            // Mark removed as processed
                                            Backup._removed = 0;

                                            // Elements ids container
                                            let elements_ids: string[] = [];

                                            // Get the elements
                                            let elements: HTMLCollectionOf<Element> = target_node!.getElementsByClassName('ec-element-content');

                                            // Verify if elements exists
                                            if ( elements.length > 0 ) {

                                                // List the elements
                                                for ( let element of elements ) {

                                                    // Get element's id
                                                    let element_id: string | null = element.getAttribute('data-id');

                                                    // Verify if element's id exists
                                                    if ( !element_id ) {
                                                        continue;
                                                    }

                                                    // Save element's id
                                                    elements_ids.push(element_id);

                                                }

                                            }

                                            // Get content
                                            let content: string = target_node!.outerHTML;

                                            // Remove the class ec-composer-template-editor
                                            content = content.replaceAll('ec-composer-template-editor', '');

                                            // Define template data
                                            let template_data: {content: string, elements_ids: string[]} = {
                                                content: remove_buttons(content),
                                                elements_ids: elements_ids
                                            };
                                            
                                            // Prepare update
                                            let update: {template_id: string, template: {content: string, elements_ids: string[]}} = {
                                                template_id: params.template_id as string,
                                                template: template_data
                                            };

                                            // Send a create update request
                                            let send_request = http_send.put(params.options('base_url') + 'api/create_update', update);

                                            // Process the response
                                            send_request.then((response: {success: boolean, message: string}): void => {

                                                // Check if the template was created
                                                if ( response.success ) {

                                                    // Get all history
                                                    new Classes.History().get_history_all(params);

                                                    // Set a pause
                                                    setTimeout((): void => {

                                                        // Show success icon
                                                        $this.saving_animation(params, 'success');  

                                                    }, 1000);

                                                    // Verify if is not the editor mode class
                                                    if ( params.selector!.getElementsByClassName('ec-composer-editor-mode').length < 1 ) {

                                                        // Verify if the code editor is open
                                                        if ( params.selector!.getElementsByClassName('ec-composer-container')[0].classList.contains('ec-composer-container-template-and-code') ) {

                                                            // Add class ec-composer-reload-html-active-icon
                                                            params.selector!.getElementsByClassName('ec-composer-reload-html-icon')[0].classList.add('ec-composer-reload-html-active-icon');

                                                            // Set a pause
                                                            setTimeout((): void => {

                                                                // Remove class ec-composer-reload-html-active-icon
                                                                params.selector!.getElementsByClassName('ec-composer-reload-html-icon')[0].classList.remove('ec-composer-reload-html-active-icon');

                                                                // Get iframe for template
                                                                let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                                                // Check if iframe exists
                                                                if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                                                    // Get the iframe document
                                                                    let idocument: Document | null = iframe_template[0].contentDocument;

                                                                    // Check if document is not null
                                                                    if ( idocument !== null ) {

                                                                        // Get the element content
                                                                        let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                                                        // Check if content exists
                                                                        if ( element_content ) {

                                                                            // Set options
                                                                            let options: {lines: boolean, spaces: boolean} = {
                                                                                lines: true,
                                                                                spaces: true
                                                                            };

                                                                            // Format html code class
                                                                            let format_html_code = new Plugins.HtmlFormatter();

                                                                            // Get the iframe for html code
                                                                            let iframe_html: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-html-container');

                                                                            // Check if iframe exists
                                                                            if ( iframe_html[0] instanceof HTMLIFrameElement ) {

                                                                                // Get the iframe document
                                                                                let idocument_html: Document | null = iframe_html[0].contentDocument;

                                                                                // Check if document is not null
                                                                                if ( idocument_html !== null ) {

                                                                                    // Append default container
                                                                                    idocument_html.body.innerHTML = `<div class="ec-composer-code-editor" data-type="html">
                                                                                        <div class="ec-composer-code-index"></div>
                                                                                        <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                                                    </div>`;

                                                                                    // Format the code
                                                                                    format_html_code.format(options, element_content.innerHTML)

                                                                                    .then((html: string): void => {

                                                                                        // Get lines box
                                                                                        let clines: Element | null = idocument_html!.body.querySelector('.ec-composer-code-lines');

                                                                                        // Display the html
                                                                                        clines!.innerHTML = html;

                                                                                        // Display the index
                                                                                        show_index(idocument_html!.body);

                                                                                    })
                                                                                    
                                                                                    .catch((error: string): void => {

                                                                                        // Display error in console
                                                                                        console.error(error);

                                                                                    });

                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }

                                                            }, 1000);

                                                        }

                                                    }

                                                } else {

                                                    // Show error message
                                                    show_message(params.words('error_name') + ': ' + response.message);

                                                    // Set a pause
                                                    setTimeout((): void => {

                                                        // Show error icon
                                                        $this.saving_animation(params, 'error');   

                                                    }, 1000);

                                                }

                                                // Set a pause
                                                setTimeout((): void => {

                                                    // Hide the animation
                                                    $this.saving_animation(params, 'hide');

                                                }, 2000);

                                                // Decode response
                                                let obj_data = response as {success: boolean, message: string};

                                                // Check if the template was created
                                                if ( !obj_data.success ) {

                                                    // Show error message
                                                    show_message(obj_data.message);

                                                }

                                            });

                                            // Process the error
                                            send_request.catch(error => {

                                                // Set a pause
                                                setTimeout((): void => {

                                                    // Show error icon
                                                    $this.saving_animation(params, 'error'); 

                                                }, 1000);

                                                // Set a pause
                                                setTimeout((): void => {

                                                    // Hide the animation
                                                    $this.saving_animation(params, 'hide');

                                                }, 2000);

                                                // Return error
                                                show_message(error);

                                            });

                                        } else {

                                            // Get target
                                            let target = (mutation_target.nodeName === '#text')?mutation_target.parentElement:mutation_target;

                                            // Get closest div
                                            let div: HTMLDivElement | null = target!.closest('div');

                                            // Check if div is not null
                                            if ( div !== null ) {

                                                // Define html data
                                                let html_data: {index?: number, structure?: number, content: string};

                                                // Check if ec-composer-template-content exists in the div
                                                if ( (div.innerHTML.split('ec-composer-template-content').length > 1) && !(mutation_target.classList.contains('ec-hide-content') && mutation_target.classList.contains('ec-composer-template-content-line') ) ) {
                                                    
                                                    // Get the lines
                                                    let lines: HTMLCollectionOf<Element> = html![0].getElementsByClassName('ec-composer-template-content-line');

                                                    // Get index of the div
                                                    let structure: number = Array.prototype.indexOf.call(lines, div.closest('.ec-composer-template-content-line'));

                                                    // Check if structure exists
                                                    if ( structure > -1 ) {

                                                        // Get content
                                                        let content: string = div.outerHTML;

                                                        // Remove the class ec-composer-template-editor
                                                        content = content.replaceAll('ec-composer-template-editor', '');

                                                        // Create html
                                                        html_data = {
                                                            structure: structure,
                                                            content: remove_buttons(content)
                                                        };

                                                    } else {

                                                        // Get content
                                                        let content: string = target_node!.outerHTML;

                                                        // Remove the class ec-composer-template-editor
                                                        content = content.replaceAll('ec-composer-template-editor', '');

                                                        // Create html
                                                        html_data = {
                                                            structure: structure,
                                                            content: remove_buttons(content)
                                                        };
                                                        
                                                    }

                                                } else {

                                                    // Find all divs
                                                    let divs: HTMLCollectionOf<HTMLDivElement> = html![0].getElementsByTagName('div');

                                                    // Get index of the div
                                                    let index: number = Array.prototype.indexOf.call(divs, div);

                                                    // Ready index
                                                    let ready_index: number = 0;
                                                    
                                                    // List divs
                                                    for ( let i = 0; i < index; i++ ) {

                                                        // Verify if the div has the ec-composer-template-content-buttons-group class
                                                        if ( divs[i].classList.contains('ec-composer-template-content-buttons-group') ) {
                                                            continue;
                                                        }

                                                        // Verify if the div has the ec-composer-element-buttons-group class
                                                        if ( divs[i].classList.contains('ec-composer-element-buttons-group') ) {
                                                            continue;
                                                        }                                            

                                                        // Increase ready index
                                                        ready_index++;

                                                    }

                                                    // Get content
                                                    let content: string = div.innerHTML;

                                                    // Remove the class ec-composer-template-editor
                                                    content = content.replaceAll('ec-composer-template-editor', '');

                                                    // Create html
                                                    html_data = {
                                                        index: ready_index,
                                                        content: ((typeof mutation_target.classList !== 'undefined') && mutation_target.classList.contains('ec-hide-content') && mutation_target.classList.contains('ec-composer-template-content-line'))?'':remove_buttons(content)
                                                    };

                                                }

                                                // Prepare update
                                                let update: {template_id: string, html?: {index?: number, structure?: number, content: string}} = {
                                                    template_id: params.template_id as string,
                                                    html: html_data
                                                };

                                                // Send a create update request
                                                let send_request = http_send.put(params.options('base_url') + 'api/create_update', update);

                                                // Process the response
                                                send_request.then((response: {success: boolean, message: string}): void => {

                                                    // Check if the template was created
                                                    if ( response.success ) {

                                                        // Get all history
                                                        new Classes.History().get_history_all(params);

                                                        // Set a pause
                                                        setTimeout((): void => {

                                                            // Show success icon
                                                            $this.saving_animation(params, 'success');  

                                                        }, 1000);

                                                        // Verify if is not the editor mode class
                                                        if ( params.selector!.getElementsByClassName('ec-composer-editor-mode').length < 1 ) {

                                                            // Verify if the code editor is open
                                                            if ( params.selector!.getElementsByClassName('ec-composer-container')[0].classList.contains('ec-composer-container-template-and-code') ) {

                                                                // Add class ec-composer-reload-html-active-icon
                                                                params.selector!.getElementsByClassName('ec-composer-reload-html-icon')[0].classList.add('ec-composer-reload-html-active-icon');

                                                                // Set a pause
                                                                setTimeout((): void => {

                                                                    // Remove class ec-composer-reload-html-active-icon
                                                                    params.selector!.getElementsByClassName('ec-composer-reload-html-icon')[0].classList.remove('ec-composer-reload-html-active-icon');

                                                                    // Get iframe for template
                                                                    let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                                                    // Check if iframe exists
                                                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                                                        // Get the iframe document
                                                                        let idocument: Document | null = iframe_template[0].contentDocument;

                                                                        // Check if document is not null
                                                                        if ( idocument !== null ) {

                                                                            // Get the element content
                                                                            let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                                                            // Check if content exists
                                                                            if ( element_content ) {

                                                                                // Set options
                                                                                let options: {lines: boolean, spaces: boolean} = {
                                                                                    lines: true,
                                                                                    spaces: true
                                                                                };

                                                                                // Format html code class
                                                                                let format_html_code = new Plugins.HtmlFormatter();

                                                                                // Get the iframe for html code
                                                                                let iframe_html: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-html-container');

                                                                                // Check if iframe exists
                                                                                if ( iframe_html[0] instanceof HTMLIFrameElement ) {

                                                                                    // Get the iframe document
                                                                                    let idocument_html: Document | null = iframe_html[0].contentDocument;

                                                                                    // Check if document is not null
                                                                                    if ( idocument_html !== null ) {

                                                                                        // Append default container
                                                                                        idocument_html.body.innerHTML = `<div class="ec-composer-code-editor" data-type="html">
                                                                                            <div class="ec-composer-code-index"></div>
                                                                                            <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                                                        </div>`;

                                                                                        // Format the code
                                                                                        format_html_code.format(options, element_content.innerHTML)

                                                                                        .then((html: string): void => {

                                                                                            // Get lines box
                                                                                            let clines: Element | null = idocument_html!.body.querySelector('.ec-composer-code-lines');

                                                                                            // Display the html
                                                                                            clines!.innerHTML = html;

                                                                                            // Display the index
                                                                                            show_index(idocument_html!.body);

                                                                                        })
                                                                                        
                                                                                        .catch((error: string): void => {

                                                                                            // Display error in console
                                                                                            console.error(error);

                                                                                        });

                                                                                    }

                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }, 1000);

                                                            }

                                                        }

                                                    } else {

                                                        // Show error message
                                                        show_message(params.words('error_name') + ': ' + response.message);

                                                        // Set a pause
                                                        setTimeout((): void => {

                                                            // Show error icon
                                                            $this.saving_animation(params, 'error');   

                                                        }, 1000);

                                                    }

                                                    // Set a pause
                                                    setTimeout((): void => {

                                                        // Hide the animation
                                                        $this.saving_animation(params, 'hide');

                                                    }, 2000);

                                                    // Decode response
                                                    let obj_data = response as {success: boolean, message: string};

                                                    // Check if the template was created
                                                    if ( !obj_data.success ) {

                                                        // Show error message
                                                        show_message(obj_data.message);

                                                    }

                                                });

                                                // Process the error
                                                send_request.catch(error => {

                                                    // Set a pause
                                                    setTimeout((): void => {

                                                        // Show error icon
                                                        $this.saving_animation(params, 'error'); 

                                                    }, 1000);

                                                    // Set a pause
                                                    setTimeout((): void => {

                                                        // Hide the animation
                                                        $this.saving_animation(params, 'hide');

                                                    }, 2000);

                                                    // Return error
                                                    show_message(error);

                                                });

                                            } 

                                        }

                                    });

                                }                               
                
                            }
                
                        });

                        // Start observing the target node for configured mutations
                        this._observer.observe(target_node, config);

                    }

                }

            }

        }

        /**
         * Update the default css
         * 
         * @param params_type params
         * @param string content
         */
        async update_default_css(params: params_type, content: string): Promise<void> {

            // Schedule event
            Classes.Timer.schedule_event('update_css', (): void => {
            
                // Init http request
                let http_send = new Classes.Https();

                // Save this context
                let $this = this;
                
                // Show the animation
                $this.saving_animation(params, 'show');

                // Prepare update
                let update: {template_id: string, css: {content: string}} = {
                    template_id: params.template_id as string,
                    css: {
                        content: content
                    }
                };

                // Send a create update request
                let send_request = http_send.put(params.options('base_url') + 'api/create_update', update);

                // Process the response
                send_request.then((response: {success: boolean, message: string}): void => {

                    // Check if the template was created
                    if ( response.success ) {

                        // Get all history
                        new Classes.History().get_history_all(params);

                        // Set a pause
                        setTimeout((): void => {

                            // Show success icon
                            $this.saving_animation(params, 'success');

                            // Verify if the code editor is open
                            if ( ( params.selector!.getElementsByClassName('ec-composer-editor-mode').length < 1 ) && params.selector!.getElementsByClassName('ec-composer-container')[0].classList.contains('ec-composer-container-template-and-code') ) {

                                // Add class ec-composer-reload-css-active-icon
                                params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.add('ec-composer-reload-css-active-icon');

                                // Set a pause
                                setTimeout((): void => {

                                    // Remove class ec-composer-reload-css-active-icon
                                    params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.remove('ec-composer-reload-css-active-icon');

                                    // Get iframe for template
                                    let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                    // Check if iframe exists
                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                        // Get the iframe document
                                        let idocument: Document | null = iframe_template[0].contentDocument;

                                        // Check if document is not null
                                        if ( idocument !== null ) {

                                            // Get the element content
                                            let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                            // Check if content exists
                                            if ( element_content ) {

                                                // Get the element's ID
                                                let element_id: string | null | undefined = element_content.closest('.ec-element-content-active')?.getAttribute('data-id');

                                                // Verify if element's ID exists
                                                if ( typeof element_id === 'string' ) {

                                                    // Get element's style
                                                    let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                    // Verify if element's style exists
                                                    if ( (typeof element_style !== 'undefined') && element_style ) {

                                                        // Set options
                                                        let options: {lines: boolean, spaces: boolean} = {
                                                            lines: true,
                                                            spaces: true
                                                        };

                                                        // Format css code class
                                                        let format_css_code = new Plugins.CssFormatter();
                                                        
                                                        // Format the code
                                                        format_css_code.format(options, element_style.innerHTML)

                                                        .then((html: string): void => {

                                                            // Get the iframe for css code
                                                            let iframe_css: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-css-container');

                                                            // Check if iframe exists
                                                            if ( iframe_css[0] instanceof HTMLIFrameElement ) {

                                                                // Get the iframe document
                                                                let idocument_css: Document | null = iframe_css[0].contentDocument;

                                                                // Check if document is not null
                                                                if ( idocument_css !== null ) {

                                                                    // Append default container
                                                                    idocument_css.body.innerHTML = `<div class="ec-composer-code-editor" data-type="css">
                                                                        <div class="ec-composer-code-index"></div>
                                                                        <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                                    </div>`;

                                                                    // Get lines box
                                                                    let clines: Element | null = idocument_css!.body.querySelector('.ec-composer-code-lines');

                                                                    // Display the html
                                                                    clines!.innerHTML = html;

                                                                    // Display the index
                                                                    show_index(idocument_css!.body);

                                                                }

                                                            }

                                                        })
                                                        
                                                        .catch((error: string): void => {

                                                            // Display error in console
                                                            console.error(error);

                                                        });

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }, 1000);

                            }

                        }, 1000);

                    } else {

                        // Show error message
                        show_message(params.words('error_name') + ': ' + response.message);

                        // Set a pause
                        setTimeout((): void => {

                            // Show error icon
                            $this.saving_animation(params, 'error');   

                        }, 1000);

                    }

                    // Set a pause
                    setTimeout((): void => {

                        // Hide the animation
                        $this.saving_animation(params, 'hide');

                    }, 2000);

                    // Decode response
                    let obj_data = response as {success: boolean, message: string};

                    // Check if the template was created
                    if ( !obj_data.success ) {

                        // Show error message
                        show_message(obj_data.message);

                    }
            
                });

                // Process the error
                send_request.catch(error => {

                    // Set a pause
                    setTimeout((): void => {

                        // Show error icon
                        $this.saving_animation(params, 'error'); 

                    }, 1000);

                    // Set a pause
                    setTimeout((): void => {

                        // Hide the animation
                        $this.saving_animation(params, 'hide');

                    }, 2000);

                    // Return error
                    show_message(error);

                });

            });

        }

        /**
         * Update a CSS ID styles by element id
         * 
         * @param string element_id
         * @param params_type params
         * @param string content
         * @param boolean animation
         */
        async update_css_element_id(element_id: string, params: params_type, content: string, animation: boolean = true): Promise<void> {

            // Schedule event
            Classes.Timer.schedule_event('update_css', (): void => {
            
                // Init http request
                let http_send = new Classes.Https();

                // Save this context
                let $this = this;

                // Check if animation should be showed
                if ( animation ) {

                    // Show the animation
                    $this.saving_animation(params, 'show');

                }

                // Prepare update
                let update: {template_id: string, element_id: string, css: {content: string}} = {
                    template_id: params.template_id as string,
                    element_id: element_id,
                    css: {
                        content: content
                    }
                };

                // Send a create update request
                let send_request = http_send.put(params.options('base_url') + 'api/create_update', update);

                // Process the response
                send_request.then((response: {success: boolean, message: string}): void => {

                    // Check if the template was created
                    if ( response.success ) {

                        // Get all history
                        new Classes.History().get_history_all(params);

                        // Set a pause
                        setTimeout((): void => {

                            // Check if animation should be showed
                            if ( animation ) {

                                // Show success icon
                                $this.saving_animation(params, 'success');

                            }

                            // Verify if the code editor is open
                            if ( ( params.selector!.getElementsByClassName('ec-composer-editor-mode').length < 1 ) && params.selector!.getElementsByClassName('ec-composer-container')[0].classList.contains('ec-composer-container-template-and-code') ) {

                                // Add class ec-composer-reload-css-active-icon
                                params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.add('ec-composer-reload-css-active-icon');

                                // Set a pause
                                setTimeout((): void => {

                                    // Remove class ec-composer-reload-css-active-icon
                                    params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.remove('ec-composer-reload-css-active-icon');

                                    // Get iframe for template
                                    let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                    // Check if iframe exists
                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                        // Get the iframe document
                                        let idocument: Document | null = iframe_template[0].contentDocument;

                                        // Check if document is not null
                                        if ( idocument !== null ) {

                                            // Get the element content
                                            let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                            // Check if content exists
                                            if ( element_content ) {

                                                // Get the element's ID
                                                let element_id: string | null | undefined = element_content.closest('.ec-element-content-active')?.getAttribute('data-id');

                                                // Verify if element's ID exists
                                                if ( typeof element_id === 'string' ) {

                                                    // Get element's style
                                                    let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                    // Verify if element's style exists
                                                    if ( (typeof element_style !== 'undefined') && element_style ) {

                                                        // Set options
                                                        let options: {lines: boolean, spaces: boolean} = {
                                                            lines: true,
                                                            spaces: true
                                                        };

                                                        // Format css code class
                                                        let format_css_code = new Plugins.CssFormatter();
                                                        
                                                        // Format the code
                                                        format_css_code.format(options, element_style.innerHTML)

                                                        .then((html: string): void => {

                                                            // Get the iframe for css code
                                                            let iframe_css: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-css-container');

                                                            // Check if iframe exists
                                                            if ( iframe_css[0] instanceof HTMLIFrameElement ) {

                                                                // Get the iframe document
                                                                let idocument_css: Document | null = iframe_css[0].contentDocument;

                                                                // Check if document is not null
                                                                if ( idocument_css !== null ) {

                                                                    // Append default container
                                                                    idocument_css.body.innerHTML = `<div class="ec-composer-code-editor" data-type="css">
                                                                        <div class="ec-composer-code-index"></div>
                                                                        <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                                    </div>`;

                                                                    // Get lines box
                                                                    let clines: Element | null = idocument_css!.body.querySelector('.ec-composer-code-lines');

                                                                    // Display the html
                                                                    clines!.innerHTML = html;

                                                                    // Display the index
                                                                    show_index(idocument_css!.body);

                                                                }

                                                            }

                                                        })
                                                        
                                                        .catch((error: string): void => {

                                                            // Display error in console
                                                            console.error(error);

                                                        });

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }, 1000);

                            }

                        }, 1000);

                    } else {

                        // Show error message
                        show_message(params.words('error_name') + ': ' + response.message);

                        // Check if animation should be showed
                        if ( animation ) {

                            // Set a pause
                            setTimeout((): void => {

                                // Show error icon
                                $this.saving_animation(params, 'error');   

                            }, 1000);

                        }

                    }

                    // Check if animation should be showed
                    if ( animation ) {

                        // Set a pause
                        setTimeout((): void => {

                            // Hide the animation
                            $this.saving_animation(params, 'hide');

                        }, 2000);

                    }

                    // Decode response
                    let obj_data = response as {success: boolean, message: string};

                    // Check if the template was created
                    if ( !obj_data.success ) {

                        // Show error message
                        show_message(obj_data.message);

                    }
            
                });

                // Process the error
                send_request.catch(error => {

                    // Check if animation should be showed
                    if ( animation ) {

                        // Set a pause
                        setTimeout((): void => {

                            // Show error icon
                            $this.saving_animation(params, 'error'); 

                        }, 1000);

                        // Set a pause
                        setTimeout((): void => {

                            // Hide the animation
                            $this.saving_animation(params, 'hide');

                        }, 2000);

                    }

                    // Return error
                    show_message(error);

                });

            });

        }

        /**
         * Save a module
         * 
         * @param params_type params
         * @param object elements
         * @param string html
         */
        async save_module(params: params_type, elements: {[key: string]: string}, html: string): Promise<void> {
            
            // Init http request
            let http_send = new Classes.Https();

            // Save this context
            let $this = this;
            
            // Show the animation
            $this.saving_animation(params, 'show');

            // Prepare update
            let update: {template_id: string, css: {elements: {[key: string]: string}}, html: {content: string}} = {
                template_id: params.template_id as string,
                css: {
                    elements: elements
                },
                html: {
                    content: html
                }
            };

            // Send a create update request
            let send_request = http_send.put(params.options('base_url') + 'api/create_update', update);

            // Process the response
            send_request.then((response: {success: boolean, message: string}): void => {

                // Check if the template was created
                if ( response.success ) {

                    // Get all history
                    new Classes.History().get_history_all(params);

                    // Set a pause
                    setTimeout((): void => {

                        // Show success icon
                        $this.saving_animation(params, 'success');

                        // Verify if the code editor is open
                        if ( ( params.selector!.getElementsByClassName('ec-composer-editor-mode').length < 1 ) && params.selector!.getElementsByClassName('ec-composer-container')[0].classList.contains('ec-composer-container-template-and-code') ) {

                            // Add class ec-composer-reload-css-active-icon
                            params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.add('ec-composer-reload-css-active-icon');

                            // Set a pause
                            setTimeout((): void => {

                                // Remove class ec-composer-reload-css-active-icon
                                params.selector!.getElementsByClassName('ec-composer-reload-css-icon')[0].classList.remove('ec-composer-reload-css-active-icon');

                                // Get iframe for template
                                let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                // Check if iframe exists
                                if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                    // Get the iframe document
                                    let idocument: Document | null = iframe_template[0].contentDocument;

                                    // Check if document is not null
                                    if ( idocument !== null ) {

                                        // Get the element content
                                        let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                        // Check if content exists
                                        if ( element_content ) {

                                            // Get the element's ID
                                            let element_id: string | null | undefined = element_content.closest('.ec-element-content-active')?.getAttribute('data-id');

                                            // Verify if element's ID exists
                                            if ( typeof element_id === 'string' ) {

                                                // Get element's style
                                                let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                // Verify if element's style exists
                                                if ( (typeof element_style !== 'undefined') && element_style ) {

                                                    // Set options
                                                    let options: {lines: boolean, spaces: boolean} = {
                                                        lines: true,
                                                        spaces: true
                                                    };

                                                    // Format css code class
                                                    let format_css_code = new Plugins.CssFormatter();
                                                    
                                                    // Format the code
                                                    format_css_code.format(options, element_style.innerHTML)

                                                    .then((html: string): void => {

                                                        // Get the iframe for css code
                                                        let iframe_css: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-css-container');

                                                        // Check if iframe exists
                                                        if ( iframe_css[0] instanceof HTMLIFrameElement ) {

                                                            // Get the iframe document
                                                            let idocument_css: Document | null = iframe_css[0].contentDocument;

                                                            // Check if document is not null
                                                            if ( idocument_css !== null ) {

                                                                // Append default container
                                                                idocument_css.body.innerHTML = `<div class="ec-composer-code-editor" data-type="css">
                                                                    <div class="ec-composer-code-index"></div>
                                                                    <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                                </div>`;

                                                                // Get lines box
                                                                let clines: Element | null = idocument_css!.body.querySelector('.ec-composer-code-lines');

                                                                // Display the html
                                                                clines!.innerHTML = html;

                                                                // Display the index
                                                                show_index(idocument_css!.body);

                                                            }

                                                        }

                                                    })
                                                    
                                                    .catch((error: string): void => {

                                                        // Display error in console
                                                        console.error(error);

                                                    });

                                                }

                                            }

                                        }

                                    }

                                }

                            }, 1000);

                        }

                    }, 1000);

                } else {

                    // Show error message
                    show_message(params.words('error_name') + ': ' + response.message);

                    // Set a pause
                    setTimeout((): void => {

                        // Show error icon
                        $this.saving_animation(params, 'error');   

                    }, 1000);

                }

                // Set a pause
                setTimeout((): void => {

                    // Hide the animation
                    $this.saving_animation(params, 'hide');

                }, 2000);

                // Decode response
                let obj_data = response as {success: boolean, message: string};

                // Check if the template was created
                if ( !obj_data.success ) {

                    // Show error message
                    show_message(obj_data.message);

                }
        
            });

            // Process the error
            send_request.catch(error => {

                // Set a pause
                setTimeout((): void => {

                    // Show error icon
                    $this.saving_animation(params, 'error'); 

                }, 1000);

                // Set a pause
                setTimeout((): void => {

                    // Hide the animation
                    $this.saving_animation(params, 'hide');

                }, 2000);

                // Return error
                show_message(error);

            });

        }

        /**
         * Load the saving animation
         * 
         * @param params_type params
         * @param string type
         */
        private saving_animation(params: params_type, type: string): void {

            // Get the ec-composer-save-changes-modal
            let save_changes_modal: HTMLCollectionOf<Element> = params.selector!.getElementsByClassName('ec-composer-save-changes-modal');

            // Verify if modal exists
            if ( save_changes_modal.length > 0 ) {

                // Get the save changes icon
                let save_changes_icon: Element = params.selector!.getElementsByClassName('ec-composer-save-changes-icon')[0];

                // Check if type is show
                if ( type === 'show' ) {

                    // Remove the class
                    save_changes_modal[0].classList.remove('ec-composer-save-changes-hide-modal');

                    // Remove the loading module
                    save_changes_modal[0].classList.remove('ec-composer-save-changes-active-modal');

                    // Remove the ec-composer-save-changes-success-icon class
                    save_changes_icon.classList.remove('ec-composer-save-changes-success-icon');

                    // Remove the ec-composer-save-changes-failed-icon class
                    save_changes_icon.classList.remove('ec-composer-save-changes-failed-icon');

                    // Add the ec-composer-save-changes-saving-icon class
                    save_changes_icon.classList.add('ec-composer-save-changes-saving-icon');     

                    // Display the loading module
                    save_changes_modal[0].classList.add('ec-composer-save-changes-active-modal');

                } else if ( type === 'success' ) {

                    // Remove the ec-composer-save-changes-saving-icon class
                    save_changes_icon.classList.remove('ec-composer-save-changes-saving-icon');

                    // Add the ec-composer-save-changes-success-icon class
                    save_changes_icon.classList.add('ec-composer-save-changes-success-icon');

                } else if ( type === 'error' ) {

                    // Remove the ec-composer-save-changes-saving-icon class
                    save_changes_icon.classList.remove('ec-composer-save-changes-saving-icon');

                    // Add the ec-composer-save-changes-failed-icon class
                    save_changes_icon.classList.add('ec-composer-save-changes-failed-icon');

                } else if ( type === 'hide' ) {

                    // Hide the loading module
                    save_changes_modal[0].classList.add('ec-composer-save-changes-hide-modal');                

                    // Set pause
                    setTimeout((): void => {

                        // Remove the class
                        save_changes_modal[0].classList.remove('ec-composer-save-changes-hide-modal');

                        // Remove the loading module
                        save_changes_modal[0].classList.remove('ec-composer-save-changes-active-modal');

                        // Remove the ec-composer-save-changes-success-icon class
                        save_changes_icon.classList.remove('ec-composer-save-changes-success-icon');

                        // Remove the ec-composer-save-changes-failed-icon class
                        save_changes_icon.classList.remove('ec-composer-save-changes-failed-icon');

                        // Add the ec-composer-save-changes-saving-icon class
                        save_changes_icon.classList.add('ec-composer-save-changes-saving-icon');                    

                    }, 300);

                }

            }

        }

    }

}