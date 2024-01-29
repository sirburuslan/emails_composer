/**
 * @class Social
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Social option
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

// Import plugins
import Plugins from '../../../plugins/plugins.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Social
    export class Social extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_align_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_align_type): {template: string} {

            // Networks list
            let networks: Array<{network_name: string, network_id: number | string, network_icon: number | string}> = [];

            // Append Facebook
            networks.push({
                network_name: 'Facebook',
                network_id: 'facebook',
                network_icon: params.icons('facebook')
            });

            // Append Instagram
            networks.push({
                network_name: 'Instagram',
                network_id: 'instagram',
                network_icon: params.icons('instagram')
            });

            // Append Linkedin
            networks.push({
                network_name: 'Linkedin',
                network_id: 'linkedin',
                network_icon: params.icons('linkedin')
            });

            // Append Pinterest
            networks.push({
                network_name: 'Pinterest',
                network_id: 'pinterest',
                network_icon: params.icons('pinterest')
            });

            // Append TikTok
            networks.push({
                network_name: 'TikTok',
                network_id: 'tiktok',
                network_icon: params.icons('tiktok')
            });

            // Append Twitter
            networks.push({
                network_name: 'Twitter',
                network_id: 'twitter',
                network_icon: params.icons('twitter')
            });

            // Append Whatsapp
            networks.push({
                network_name: 'Whatsapp',
                network_id: 'whatsapp',
                network_icon: params.icons('whatsapp')
            });

            // Append Youtube
            networks.push({
                network_name: 'Youtube',
                network_id: 'youtube',
                network_icon: params.icons('youtube')
            });

            // Group the networks
            let grouped_networks: {[key: string]: string} = {};  

            // Networks html container
            let networks_html: string = '';

            // List the networks
            for ( let network of networks ) {

                // Add network html
                networks_html += '<li>'
                    + '<a href="#" data-network="' + network.network_id + '">'
                        + network.network_name
                    + '</a>'
                + '</li>';

                // Add to grouped networks
                grouped_networks[network.network_id] = network.network_name;

            }

            // Unique checkbox id
            let unique_id: number = Math.random();

            // Items container
            let items: string = '';

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
                                let network_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                // Verify if the item's link exists
                                if ( network_link.length < 1 ) {
                                    continue;
                                }

                                // Get href
                                let href: string | null = network_link[0].getAttribute('href');

                                // Get the path
                                let path: string | null = (network_link[0].getElementsByTagName('path').length > 0)?network_link[0].getElementsByTagName('path')[0].getAttribute('fill'):null;

                                // Get the color
                                let color: string | null = (path)?path:'#000000';

                                // Add item
                                items += '<li data-index="' + count + '">'
                                    + '<div class="ec-w-100 ec-mt-1">'
                                        + '<div class="ec-option-selector">'
                                            + '<div class="ec-option-selector-dropdown">'
                                                + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                                                    + '<span>'
                                                        + grouped_networks[network_link[0].getAttribute('data-network')!]
                                                    + '</span>'
                                                    + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                                                + '</button>'
                                                + '<div class="ec-option-selector-menu">'
                                                    + '<ul class="ec-networks">'
                                                        + networks_html
                                                    + '</ul>'
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="ec-display-flex ec-justify-content-space-between">'                                    
                                            + '<div class="ec-display-flex ec-justify-content-space-between ec-option-url-group">'
                                                + '<input type="text" value="' + href + '" class="ec-social-item-url" id="ec-social-item-url-' + count + '-' + unique_id + '-input">'
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
                                            + '<div class="ec-button-color">'
                                                + '<button type="button" style="--bgcolor: ' + color + ';" data-color="' + color + '"></button>'
                                            + '</div>'
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

                template: '<div class="ec-block ec-option-social">'
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
         * @params params_type global prameters
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (params: params_type): events_type | undefined => {

            return [{
                action: 'input',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-social exists
                        if ( target.closest('.ec-option-social') ) {
                            e.preventDefault();

                            // Verify if the item url should be edited
                            if ( target.classList.contains('ec-social-item-url') ) {

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
                                    Classes.Timer.schedule_event('edit_social_item_url', (): void => {

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

                                                                    // Update the social item href
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
                action: 'mousedown',
                target: (e: MouseEvent): void => {

                    // Save target
                    let target = e.target as HTMLElement;

                    // Check for target
                    if ( target !== null ) {

                        // Verify if mouse is over ec-color-opacity-filter
                        if ( target.closest('.ec-button-color') && target.closest('.ec-option-social') ) {
                            e.preventDefault();

                            // Add color box
                            new Plugins.Color().add_color_box(e, params);

                            // Get iframe
                            let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Verify if iframe exists
                            if ( iframe ) {

                                // Get content document
                                let iframeDocument: Document | null = iframe.contentDocument;

                                // Check if iframeDocument is not null
                                if ( iframeDocument !== null ) {

                                    // Get the active elements
                                    let elements: HTMLCollectionOf<Element> = iframeDocument.getElementsByClassName('ec-element-content-active');

                                    // Check if active elements exists
                                    if ( elements.length > 0 ) {

                                        // Set a pause
                                        setTimeout((): void => {

                                            // Monitor the color change
                                            Classes.Observer.monitor_element('option_color', target, {attributes: true}, (mutations: MutationRecord[]) => {

                                                // List the mutations
                                                for (let mutation of mutations) {

                                                    // Verify if the change is for data-color
                                                    if (mutation.attributeName === 'data-color') {

                                                        // Get target
                                                        let mutation_target = (mutation.target.nodeName === '#text')?mutation.target.parentElement:mutation.target as HTMLElement;

                                                        // Get the li index
                                                        let li_index: string | null = mutation_target!.closest('li')!.getAttribute('data-index');

                                                        // Verify if the li index exists
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
                                                                                let network_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                                                // Verify if the item's link exists
                                                                                if ( network_link.length < 1 ) {
                                                                                    continue;
                                                                                }

                                                                                // Get the path
                                                                                let path: HTMLCollectionOf<Element> = network_link[0].getElementsByTagName('path');

                                                                                // Verify if path exists
                                                                                if ( path.length > 0 ) {

                                                                                    // Verify if is the li which should be deleted
                                                                                    if ( parseInt(li_index!) === count ) {

                                                                                        // Set color
                                                                                        path[0].setAttribute('fill', mutation_target!.getAttribute('data-color')!);

                                                                                    }

                                                                                    // Increase the counter
                                                                                    count++;

                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }

                                                            }

                                                        }

                                                    }

                                                }

                                            });

                                        }, 300);

                                    }

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

                        // Check if ec-networks exists
                        if ( target.closest('.ec-networks') && (target.nodeName === 'A') ) {
                            e.preventDefault();

                            // Get the selected network
                            let network: string | null = target.getAttribute('data-network');

                            // Verify if network exists
                            if ( network && params.icons(network) ) {

                                // Get the selected color
                                let selected_color: string | null = target.closest('.ec-networks')!.closest('li')!.querySelector('.ec-button-color > button')!.getAttribute('data-color');

                                // Prepare the icon
                                let icon: string = params.icons(network);

                                // Get iframe
                                let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    let iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get the active elements
                                        let elements: HTMLCollectionOf<Element> = iframeDocument.getElementsByClassName('ec-element-content-active');

                                        // Check if active elements exists
                                        if ( elements.length > 0 ) {

                                            // Get the li index
                                            let li_index: string | null = target.closest('.ec-networks')!.closest('li')!.getAttribute('data-index');

                                            // Verify if the li index exists
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
                                                                    let network_link: HTMLCollectionOf<Element> = (item as Element).getElementsByTagName('a');

                                                                    // Verify if the item's link exists
                                                                    if ( network_link.length < 1 ) {
                                                                        continue;
                                                                    }

                                                                    // Verify if is the li which should be deleted
                                                                    if ( parseInt(li_index!) === count ) {

                                                                        // Replace icon
                                                                        network_link[0].innerHTML = icon;

                                                                        // Get the path
                                                                        let path: HTMLCollectionOf<Element> = network_link[0].getElementsByTagName('path');

                                                                        // Verify if path exists
                                                                        if ( path.length > 0 ) {

                                                                            // Set color
                                                                            path[0].setAttribute('fill', selected_color!);

                                                                        }

                                                                    }

                                                                    // Increase the counter
                                                                    count++;

                                                                }

                                                            }

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }

                            } else {

                                // Show error message
                                show_message(params.words('error_name') + ': ' + params.words('network_was_not_found'));
                                
                            }

                        } else if ( target.classList.contains('ec-delete-item') && (target.closest('.ec-display-flex')?.getAttribute('data-option') === 'social') ) {
                            e.preventDefault();

                            // Get the list parent
                            let ul: Element | null = target.closest('ul');

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
                            if ( ul!.querySelectorAll('li[data-index]').length > 0 ) {

                                // Counter for items
                                let count: number = 1;

                                // List the items
                                for ( let item of ul!.querySelectorAll('li[data-index]') ) {

                                    // Update the data-index
                                    item.setAttribute('data-index', count.toString());

                                    // Increase the counter
                                    count++;

                                }

                            }

                        } else if ( target.classList.contains('ec-clone-item') && (target.closest('.ec-display-flex')!.getAttribute('data-option') === 'social') ) {
                            e.preventDefault();

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
                            if ( ul!.querySelectorAll('li[data-index]').length > 0 ) {

                                // Counter for items
                                let count: number = 1;

                                // List the items
                                for ( let item of ul!.querySelectorAll('li[data-index]') ) {

                                    // Update the data-index
                                    item.setAttribute('data-index', count.toString());

                                    // Increase the counter
                                    count++;

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