/**
 * @class Link
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Link option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    is_url_valid
} from '../../../inc/inc.index.js';

// Import types
import {
    params_type,
    option_link_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Link
    export class Link extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_link_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_link_type): {template: string} {

            // Default value
            let value: string = option.value;

            // Get iframe
            const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Verify if iframe exists
            if ( iframe ) {

                // Get content document
                const iframeDocument: Document | null = iframe.contentDocument;

                // Check if iframeDocument is not null
                if ( iframeDocument !== null ) {

                    // Verify if the element is not empty
                    if ( option.element ) {

                        // Get the element
                        const element: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ' + option.element);

                        // Verify if element is not null
                        if ( element ) {

                            // Replace value
                            value = element.getAttribute('href') as string;

                        }    
                        
                    } else {

                        // Get the element
                        const element: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data');

                        // Verify if element is not null
                        if ( element ) {

                            // Replace value
                            value = element.getAttribute('href') as string;

                        } 

                    }

                }

            }

            // Set the element
            const element: string = (option.element !== '')?' data-element="' + option.element + '"':'';

            // Unique checkbox id
            const unique_id: number = Math.random();

            return {

                template: '<div class="ec-w-100">'
                    + '<div>'
                        + '<h3>'
                            + option.text.label
                        + '</h3>'
                        + '<p>'
                            + option.text.description
                        + '</p>'                                        
                    + '</div>'
                    + '<div>'
                        + '<div class="ec-display-flex ec-justify-content-space-between ec-option-url-group"' + element + '>'
                            + '<input type="text" value="' + value + '" id="ec-composer-url-' + unique_id + '-input">'
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
                + '</div>'  

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_link_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_link_type): option_property_type {
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
                target: (e: KeyboardEvent): void => {

                    // Get target
                    const target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-option-url-group exists
                        if ( target.closest('.ec-option-url-group') ) {

                            // Add the ec-option-url-group-active-button class
                            target.closest('.ec-option-url-group')?.getElementsByTagName('button')[0].classList.add('ec-option-url-group-active-button');

                            // Remove the ec-option-url-group-active-button class
                            target.closest('.ec-option-url-group')?.getElementsByTagName('button')[1].classList.remove('ec-option-url-group-active-button');

                            // Remove the ec-option-url-group-active-button class
                            target.closest('.ec-option-url-group')?.getElementsByTagName('button')[2].classList.remove('ec-option-url-group-active-button');

                            // Schedule event
                            Classes.Timer.schedule_event('update_url', (): void => {

                                // Remove the ec-option-url-group-active-button class
                                target.closest('.ec-option-url-group')?.getElementsByTagName('button')[0].classList.remove('ec-option-url-group-active-button');

                                // Get the option url
                                const option_url: HTMLElement | null = target.closest('.ec-option-url-group');

                                // Get input
                                const input: HTMLCollectionOf<HTMLInputElement> | undefined = option_url!.getElementsByTagName('input');

                                // Check if input is not undefined
                                if ( input !== undefined ) {

                                    // Get value
                                    const value: string | undefined = input[0].value;

                                    // Check if value exists
                                    if ( value !== undefined ) {

                                        // Verify if the url is valid
                                        if ( is_url_valid(value) ) {

                                            // Add the ec-option-url-group-active-button class
                                            target.closest('.ec-option-url-group')?.getElementsByTagName('button')[1].classList.add('ec-option-url-group-active-button');

                                            // Get the option name
                                            const option_name: string | null | undefined = option_url!.closest('li')?.getAttribute('data-option');

                                            // Check if option name exists
                                            if ( option_name ) {

                                                // Get the element's id
                                                const element_id: string | null | undefined = target.closest('.ec-composer-element-options')?.getAttribute('data-element');

                                                // Check if element's id exists
                                                if ( element_id ) {

                                                    // Get iframe
                                                    const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                                    // Verify if iframe exists
                                                    if ( iframe ) {

                                                        // Get content document
                                                        const iframeDocument: Document | null = iframe.contentDocument;

                                                        // Check if iframeDocument is not null
                                                        if ( iframeDocument !== null ) {

                                                            // Set the element name
                                                            const element_name: string | null = target.closest('.ec-option-url-group')!.getAttribute('data-element')?target.closest('.ec-option-url-group')!.getAttribute('data-element'):'';

                                                            // Verify if the element is not empty
                                                            if ( element_name ) {

                                                                // Get the element
                                                                const element: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data ' + element_name);

                                                                // Verify if element is not null
                                                                if ( element ) {

                                                                    // Replace value
                                                                    element.setAttribute('href', (target as HTMLInputElement).value);

                                                                }    
                                                                
                                                            } else {

                                                                // Get the element
                                                                const element: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                                                // Verify if element is not null
                                                                if ( element ) {

                                                                    // Replace value
                                                                    element.setAttribute('href', (target as HTMLInputElement).value);

                                                                } 

                                                            }

                                                        }

                                                    }

                                                }

                                            }

                                        } else {

                                            // Add the ec-option-url-group-active-button class
                                            target.closest('.ec-option-url-group')?.getElementsByTagName('button')[2].classList.add('ec-option-url-group-active-button');

                                        }

                                    }

                                }

                            }, 1000);

                        }

                    }

                },
                capture: false

            }];

        };

    }

}