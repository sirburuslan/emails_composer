/**
 * @class Menu
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Menu option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    show_message,
    is_url_valid
} from '../../../inc/inc.index.js';

// Import types
import {
    params_type,
    option_align_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Menu
    export class Menu extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_align_type): {template: string} {

            // Items container
            let items: string = '';

            // Unique checkbox id
            let unique_id: number = Math.random();

            // Get iframe
            let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Verify if iframe exists
            if ( iframe ) {

                // Get content document
                let iframeDocument: Document | null = iframe.contentDocument;

                // Check if iframeDocument is not null
                if ( iframeDocument !== null ) {
                    
                    // Get the list
                    let list: HTMLElement | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ul');

                    // Verify if list exists
                    if ( list ) {

                        // Get the list items
                        let list_items: NodeListOf<Node> = list.childNodes;

                        // Verify if nodes exists
                        if ( list_items.length > 0 ) {

                            // Counter
                            let count: number = 1;

                            // List the list items
                            for ( let item of list_items ) {

                                // Check if is LI
                                if ( item.nodeName !== 'LI' ) {
                                    continue;
                                }

                                // Get the item's link
                                let item_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                // Verify if the item's link exists
                                if ( item_link.length < 1 ) {
                                    continue;
                                }

                                // Get href
                                let href: string | null = item_link[0].getAttribute('href');

                                // Get text
                                let text: string | null = item_link[0].textContent;

                                // Add item
                                items += '<li data-index="' + count + '">'
                                    + '<div class="ec-w-100">'
                                        + '<div>'
                                            + '<h3>'
                                                + count + '# ' + params.words('menu_item')
                                            + '</h3>'
                                            + '<p>'
                                                + params.words('menu_item_description')
                                            + '</p>'
                                        + '</div>'
                                        + '<div class="ec-option-text">'
                                            + '<input type="text" value="' + text + '" class="ec-menu-item-text" id="ec-menu-item-text-' + count + unique_id + '-input">'
                                        + '</div>'
                                        + '<div class="ec-display-flex ec-justify-content-space-between ec-option-url-group">'
                                            + '<input type="text" value="' + href + '" class="ec-menu-item-url" id="ec-menu-item-url-' + count + unique_id + '-input">'
                                            + '<button type="button">'
                                                + params.icons('autorenew', {'icon_class': 'ec-option-url-group-checking-icon'})
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('check', {'icon_class': 'ec-option-url-group-success-icon'})
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('close', {'icon_class': 'ec-option-url-group-failed-icon'})
                                            + '</button>'                                                                                     
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="ec-mt-2 ec-right">'
                                        + '<a href="#" class="ec-delete-item">'
                                            + params.words('delete_it')
                                        + '</a>'
                                        + '<a href="#" class="ec-clone-item">'
                                            + params.words('clone')
                                        + '</a>'
                                    + '</div>'
                                + '</li>';

                                // Increase the counter
                                count++;

                            }

                        }

                    }

                }

            }

            return {

                template: '<div class="ec-block ec-option-menu">'
                    + '<div class="ec-block-body ec-scrollbar-container">'
                        + '<ul>'
                            + items
                        + '</ul>'
                    + '</div>'
                + '</div>'

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_align_type): option_property_type {
            return;
        }

        /**
         * Provides the supported events for a template
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (): events_type | undefined => {

            return [{
                action: 'input',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-menu exists
                        if ( target.closest('.ec-option-menu') ) {
                            e.preventDefault();

                            // Verify if the item text should be edited
                            if ( target.classList.contains('ec-menu-item-text') ) {

                                // Get the li text
                                let li_text: string | null = (target as HTMLInputElement).value;

                                // Get the li index
                                let li_index: string | null = target.closest('li')!.getAttribute('data-index');

                                // Verify if the li index exists
                                if ( li_index ) {

                                    // Schedule event
                                    Classes.Timer.schedule_event('edit_menu_item_text', (): void => {

                                        // Get iframe
                                        let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                        // Verify if iframe exists
                                        if ( iframe ) {

                                            // Get content document
                                            let iframeDocument: Document | null = iframe.contentDocument;

                                            // Check if iframeDocument is not null
                                            if ( iframeDocument !== null ) {
                                                
                                                // Get the list
                                                let list: HTMLElement | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ul');

                                                // Verify if list exists
                                                if ( list ) {

                                                    // Get the list items
                                                    let list_items: NodeListOf<Node> = list.childNodes;

                                                    // Verify if nodes exists
                                                    if ( list_items.length > 0 ) {

                                                        // Counter
                                                        let count: number = 1;

                                                        // List the list items
                                                        for ( let item of list_items ) {

                                                            // Check if is LI
                                                            if ( item.nodeName !== 'LI' ) {
                                                                continue;
                                                            }

                                                            // Get the item's link
                                                            let item_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                            // Verify if the item's link exists
                                                            if ( item_link.length < 1 ) {
                                                                continue;
                                                            }

                                                            // Verify if is the li which should be deleted
                                                            if ( parseInt(li_index!) === count ) {

                                                                // Update the menu item text
                                                                item_link[0].textContent = li_text;

                                                                break;

                                                            }

                                                            // Increase the counter
                                                            count++;

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }, 1000);                                    

                                }

                            } else if ( target.classList.contains('ec-menu-item-url') ) {

                                // Get the li url
                                let li_url: string | null = (target as HTMLInputElement).value;

                                // Get the li index
                                let li_index: string | null = target.closest('li')!.getAttribute('data-index');

                                // Add the ec-option-url-group-active-button class
                                target.closest('.ec-option-url-group')?.getElementsByTagName('button')[0].classList.add('ec-option-url-group-active-button');

                                // Remove the ec-option-url-group-active-button class
                                target.closest('.ec-option-url-group')?.getElementsByTagName('button')[1].classList.remove('ec-option-url-group-active-button');

                                // Remove the ec-option-url-group-active-button class
                                target.closest('.ec-option-url-group')?.getElementsByTagName('button')[2].classList.remove('ec-option-url-group-active-button');

                                // Verify if the li index exists
                                if ( li_index ) {

                                    // Schedule event
                                    Classes.Timer.schedule_event('edit_menu_item_url', (): void => {

                                        // Remove the ec-option-url-group-active-button class
                                        target.closest('.ec-option-url-group')!.getElementsByTagName('button')[0].classList.remove('ec-option-url-group-active-button');

                                        // Get iframe
                                        let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                        // Verify if iframe exists
                                        if ( iframe ) {

                                            // Get content document
                                            let iframeDocument: Document | null = iframe.contentDocument;

                                            // Check if iframeDocument is not null
                                            if ( iframeDocument !== null ) {
                                                
                                                // Get the list
                                                let list: HTMLElement | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ul');

                                                // Verify if list exists
                                                if ( list ) {

                                                    // Get the list items
                                                    let list_items: NodeListOf<Node> = list.childNodes;

                                                    // Verify if nodes exists
                                                    if ( list_items.length > 0 ) {

                                                        // Counter
                                                        let count: number = 1;

                                                        // List the list items
                                                        for ( let item of list_items ) {

                                                            // Check if is LI
                                                            if ( item.nodeName !== 'LI' ) {
                                                                continue;
                                                            }

                                                            // Get the item's link
                                                            let item_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                            // Verify if the item's link exists
                                                            if ( item_link.length < 1 ) {
                                                                continue;
                                                            }

                                                            // Verify if is the li which should be deleted
                                                            if ( parseInt(li_index!) === count ) {

                                                                // Verify if the url is valid
                                                                if ( is_url_valid(li_url!) ) {

                                                                    // Add the ec-option-url-group-active-button class
                                                                    target.closest('.ec-option-url-group')!.getElementsByTagName('button')[1].classList.add('ec-option-url-group-active-button');

                                                                    // Update the menu item href
                                                                    item_link[0].setAttribute('href', li_url!);

                                                                } else {

                                                                    // Add the ec-option-url-group-active-button class
                                                                    target.closest('.ec-option-url-group')!.getElementsByTagName('button')[2].classList.add('ec-option-url-group-active-button');
                        
                                                                }

                                                                break;

                                                            }

                                                            // Increase the counter
                                                            count++;

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }, 1000);                                    

                                }

                            }

                        }

                    }

                },
                capture: false

            }, {
                action: 'click',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-menu exists
                        if ( target.closest('.ec-option-menu') ) {
                            e.preventDefault();

                            // Get the list parent
                            let ul: Element | null = target.closest('ul');

                            // Verify if the item should be deleted
                            if ( target.classList.contains('ec-delete-item') ) {

                                // Get the li index
                                let li_index: string | null = target.closest('li')!.getAttribute('data-index');

                                // Verify if li index is not null
                                if ( li_index ) {

                                    // Get iframe
                                    let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                    // Verify if iframe exists
                                    if ( iframe ) {

                                        // Get content document
                                        let iframeDocument: Document | null = iframe.contentDocument;

                                        // Check if iframeDocument is not null
                                        if ( iframeDocument !== null ) {
                                            
                                            // Get the list
                                            let list: HTMLElement | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ul');

                                            // Verify if list exists
                                            if ( list ) {

                                                // Get the list items
                                                let list_items: NodeListOf<Node> = list.childNodes;

                                                // Verify if nodes exists
                                                if ( list_items.length > 0 ) {

                                                    // Counter
                                                    let count: number = 1;

                                                    // List the list items
                                                    for ( let item of list_items ) {

                                                        // Check if is LI
                                                        if ( item.nodeName !== 'LI' ) {
                                                            continue;
                                                        }

                                                        // Get the item's link
                                                        let item_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                        // Verify if the item's link exists
                                                        if ( item_link.length < 1 ) {
                                                            continue;
                                                        }

                                                        // Verify if is the li which should be deleted
                                                        if ( parseInt(li_index) === count ) {

                                                            // Remove item
                                                            (item as Element).remove();
                                                            break;

                                                        }

                                                        // Increase the counter
                                                        count++;

                                                    }

                                                }

                                            }

                                        }

                                    }
                                    
                                }

                                // Remove the item
                                target.closest('li')!.remove();

                                // Verify if the list has items
                                if ( ul!.getElementsByTagName('li') ) {

                                    // Counter for items
                                    let count: number = 1;

                                    // List the items
                                    for ( let item of ul!.getElementsByTagName('li') ) {

                                        // Update the data-index
                                        item.setAttribute('data-index', count.toString());

                                        // Replace the text in the header
                                        item.getElementsByTagName('h3')[0].textContent = count + '#' + item.getElementsByTagName('h3')[0].textContent!.split('#').slice(-1)[0];

                                        // Increase the counter
                                        count++;

                                    }

                                }

                            } else if ( target.classList.contains('ec-clone-item') && (target.closest('.ec-display-flex')!.getAttribute('data-option') === 'menu') ) {

                                // Get the list parent
                                let ul: Element | null = target.closest('ul');

                                // Get the item
                                let item: Element | null = target.closest('li');

                                // Clone the item
                                let cloned_item = item!.cloneNode(true) as Element;

                                // Append cloned item
                                item!.insertAdjacentElement('afterend', cloned_item);

                                // Get the li index
                                let li_index: string | null = target.closest('li')!.getAttribute('data-index');

                                // Verify if li index is not null
                                if ( li_index ) {

                                    // Get iframe
                                    let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                    // Verify if iframe exists
                                    if ( iframe ) {

                                        // Get content document
                                        let iframeDocument: Document | null = iframe.contentDocument;

                                        // Check if iframeDocument is not null
                                        if ( iframeDocument !== null ) {
                                            
                                            // Get the list
                                            let list: HTMLElement | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ul');

                                            // Verify if list exists
                                            if ( list ) {

                                                // Get the list items
                                                let list_items: NodeListOf<Node> = list.childNodes;

                                                // Verify if nodes exists
                                                if ( list_items.length > 0 ) {

                                                    // Counter
                                                    let count: number = 1;

                                                    // List the list items
                                                    for ( let item of list_items ) {

                                                        // Check if is LI
                                                        if ( item.nodeName !== 'LI' ) {
                                                            continue;
                                                        }

                                                        // Get the item's link
                                                        let item_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                        // Verify if the item's link exists
                                                        if ( item_link.length < 1 ) {
                                                            continue;
                                                        }

                                                        // Verify if is the li which should be deleted
                                                        if ( parseInt(li_index) === count ) {

                                                            // Clone the item
                                                            let cloned_item = (item as Element)!.cloneNode(true) as Element;

                                                            // Append cloned item
                                                            (item as Element)!.insertAdjacentElement('afterend', cloned_item);

                                                            break;

                                                        }

                                                        // Increase the counter
                                                        count++;

                                                    }

                                                }

                                            }

                                        }

                                    }
                                    
                                }

                                // Verify if the list has items
                                if ( ul!.getElementsByTagName('li') ) {

                                    // Counter for items
                                    let count: number = 1;

                                    // List the items
                                    for ( let item of ul!.getElementsByTagName('li') ) {

                                        // Update the data-index
                                        item.setAttribute('data-index', count.toString());

                                        // Replace the text in the header
                                        item.getElementsByTagName('h3')[0].textContent = count + '#' + item.getElementsByTagName('h3')[0].textContent!.split('#').slice(-1)[0];

                                        // Increase the counter
                                        count++;

                                    }

                                }

                            }

                        }

                    }

                },
                capture: false

            }];

        };

    }

}