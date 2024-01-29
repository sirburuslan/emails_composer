/**
 * @class List
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the List option
 */

// Import the Classes
import { AbstractOptions } from "../../../classes/classes.index.js";

// Import types
import { 
    params_type,
    option_list_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class List
    export class List extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_list_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_list_type): {template: string} {

            // Items container
            let items: string = '';

            // Unique checkbox id
            let unique_id: number = Math.random();

            // Verify if the option has items
            if ( option.items.length > 0 ) {

                // Values container
                let values: {[key: string]: string | number | ((key: string) => string) } = {
                    get_value: (key: string): string => {
                        return values.hasOwnProperty(key)?' value="' + values[key] + '"':'';
                    }
                };

                // Get iframe
                let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                // Verify if iframe exists
                if ( iframe ) {

                    // Get content document
                    let iframeDocument: Document | null = iframe.contentDocument;

                    // Check if iframeDocument is not null
                    if ( iframeDocument !== null ) {
                        
                        // Get the template
                        let template: Element | null = iframeDocument.getElementsByClassName('ec-composer-template')[0];

                        // Check for utm source
                        if ( template.getAttribute('data-utm-source') ) {

                            // Set utm source
                            values['utm_source'] = template.getAttribute('data-utm-source') as string;

                        }
                        
                        // Check for utm medium
                        if ( template.getAttribute('data-utm-medium') ) {

                            // Set utm medium
                            values['utm_medium'] = template.getAttribute('data-utm-medium') as string;

                        }
                        
                        // Check for utm campaign
                        if ( template.getAttribute('data-utm-campaign') ) {

                            // Set utm campaign
                            values['utm_campaign'] = template.getAttribute('data-utm-campaign') as string;

                        }
                        
                        // Check for utm term
                        if ( template.getAttribute('data-utm-term') ) {

                            // Set utm term
                            values['utm_term'] = template.getAttribute('data-utm-term') as string;

                        }
                        
                        // Check for utm content
                        if ( template.getAttribute('data-utm-content') ) {

                            // Set utm content
                            values['utm_content'] = template.getAttribute('data-utm-content') as string;

                        }

                    }

                }

                // List the items
                for ( let item of option.items ) {

                    // Add item
                    items += '<li data-name="' + item.name + '">'
                        + '<div class="ec-w-100">'
                            + '<div>'
                                + '<h3>'
                                    + item.label
                                + '</h3>'
                                + '<p>'
                                    + item.description
                                + '</p>'
                            + '</div>'
                            + '<div class="ec-option-text">'
                                + '<input type="text" placeholder="' + item.placeholder + '"' + (values as {get_value: ((key: string) => string)}).get_value(item.name) + ' class="ec-menu-item-text" id="ec-composer-menu-' + item.name + '-' + unique_id + '-input">'
                            + '</div>'
                    + '</li>';

                }

            }

            return {

                template: '<div class="ec-block ec-option-list">'
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
         * @param option_list_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_list_type): option_property_type {
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

                        // Check if is the settings modal exists
                        if ( target.closest('.ec-composer-modal[data-scope="ec-composer-settings-modal"]') ) {
                            e.preventDefault();

                            // Get iframe
                            let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Verify if iframe exists
                            if ( iframe ) {

                                // Get content document
                                let iframeDocument: Document | null = iframe.contentDocument;

                                // Check if iframeDocument is not null
                                if ( iframeDocument !== null ) {
                                    
                                    // Get the template
                                    let template: Element | null = iframeDocument.getElementsByClassName('ec-composer-template')[0];

                                    // Get closest li and verify if is utm_source
                                    if ( target.closest('li')!.getAttribute('data-name') === 'utm_source' ) {

                                        // Set utm source
                                        template.setAttribute('data-utm-source', (target as HTMLInputElement).value);

                                    } else if ( target.closest('li')!.getAttribute('data-name') === 'utm_medium' ) {

                                        // Set utm medium
                                        template.setAttribute('data-utm-medium', (target as HTMLInputElement).value);

                                    } else if ( target.closest('li')!.getAttribute('data-name') === 'utm_campaign' ) {

                                        // Set utm campaign
                                        template.setAttribute('data-utm-campaign', (target as HTMLInputElement).value);

                                    } else if ( target.closest('li')!.getAttribute('data-name') === 'utm_term' ) {

                                        // Set utm term
                                        template.setAttribute('data-utm-term', (target as HTMLInputElement).value);

                                    } else if ( target.closest('li')!.getAttribute('data-name') === 'utm_content' ) {

                                        // Set utm content
                                        template.setAttribute('data-utm-content', (target as HTMLInputElement).value);

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