/**
 * @class Ai
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-03
 *
 * This class creates the Ai option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import the incs
import { get_ai_content } from "../../../inc/inc.index.js";

// Import types
import {
    params_type, 
    option_link_type, 
    option_property_type, 
    events_type,
    ai_suggestion_type,
    ai_service_type
} from '../../types/types.index.js';

// Import all ai suggestions
import * as suggestions from "../../ai/suggestions/suggestions.index.js";

// Import all ai services
import * as services from "../../ai/services/services.index.js";

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Ai
    export class Ai extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_link_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_link_type): {template: string} {

            // Unique checkbox id
            const unique_id: number = Date.now();

            // Default ai selected service slug
            let ai_selected_service_slug: string = '';

            // Default ai selected service name
            let ai_selected_service_name: string = '';

            // Create the services list
            let all_services = '<ul class="ec-services">';

            // Check if ai services exists
            if ( services && (Object.keys(services).length > 0) ) {

                // List the services
                for ( const service of Object.keys(services) ) {

                    // Get the service's data
                    const service_data: ai_service_type = Object.getOwnPropertyDescriptor(services, service)?.value(params);

                    // Verify if no service is selected
                    if ( !ai_selected_service_slug ) {

                        // Set service slug
                        ai_selected_service_slug = service_data.slug;

                        // Set service name
                        ai_selected_service_name = service_data.name;

                    } else if ( option.value === service_data.slug ) {

                        // Set service slug
                        ai_selected_service_slug = service_data.slug;

                        // Set service name
                        ai_selected_service_name = service_data.name;

                    }

                    // Add service to the list
                    all_services += '<li>'
                        + '<a href="#" data-service="' + service_data.slug + '">'
                            + service_data.name
                        + '</a>'
                    + '</li>';

                }

            }

            // End the services list
            all_services += '</ul>';

            // Default ai suggestions
            let default_suggestions: string = '<ul class="ec-ai-default-suggestions">';

            // Check if ai suggestions exists
            if ( suggestions && (Object.keys(suggestions).length > 0) ) {

                // List the suggestions
                for ( const suggestion of Object.keys(suggestions) ) {
                    
                    // Get the suggestion's data
                    const suggestion_data: ai_suggestion_type = Object.getOwnPropertyDescriptor(suggestions, suggestion)?.value(params);

                    // Add suggestion to the list
                    default_suggestions += '<li>'
                        + '<a href="#" data-command="' + suggestion_data.command + '">'
                            + params.icons('search')
                            + suggestion_data.name
                        + '</a>'
                    + '</li>';

                }

            }

            // Close the ai suggestions
            default_suggestions += '</ul>';

            // Chat response
            const chat_response = `<div class="ec-ai-chat-response">
                <div class="ec-ai-response"></div>
                <div class="ec-ai-actions ec-right">
                    <a href="#" class="ec-insert-ai-response">
                        ${params.words('add_to_template')}
                        ${params.icons('arrow_right_alt')}
                    </a>
                </div>
            </div>`;

            // Chat error
            const chat_error = `<div class="ec-ai-chat-error">
                <div class="ec-ai-message"></div>
            </div>`;

            return {

                template: '<div class="ec-w-100">'
                    + '<div>'
                        + '<div class="ec-block ec-option-ai">'
                            + '<div class="ec-block-header">'
                                + '<div class="ec-text-composer">'
                                    + '<textarea placeholder="' + params.words('enter_a_prompt_here') + '" class="ec-textarea" id="ec-composer-prompt-ai-' + unique_id + '-textarea"></textarea>'
                                    + params.icons('autorenew', {'icon_class': 'ec-loading-icon'})
                                + '</div>'
                                + '<div class="ec-option-selector">'
                                    + '<div class="ec-option-selector-dropdown">'
                                        + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between ec-button-service" data-service="' + ai_selected_service_slug + '">'
                                            + '<span>'
                                                + ai_selected_service_name
                                            + '</span>'
                                            + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                                        + '</button>'
                                        + '<div class="ec-option-selector-menu">'
                                            + all_services
                                        + '</div>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                            + '<div class="ec-block-body ec-show-suggestions ec-scrollbar-container">'
                                + default_suggestions
                                + chat_response
                                + chat_error
                            + '</div>'
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
         * @param params_type params
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (params: params_type): events_type | undefined => {

            return [{
                action: 'input',
                target: (e: Event): void => {

                    // Get target
                    const target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-text-composer') ) {

                        // Schedule event
                        Classes.Timer.schedule_event('search_ai_content', (): void => {

                            // Get the command
                            const command = params.selector.querySelector('.ec-option-ai .ec-textarea') as HTMLInputElement;

                            // Verify if command is not empty
                            if ( command.value.trim() !== '' ) {

                                // Get ai content
                                get_ai_content(this.params);

                            } else {

                                // Remove the show error message class
                                params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-error-message'); 

                                // Add height to suggestions
                                params.selector.querySelector<HTMLElement>('.ec-composer-options-list > li[data-option="ai"] .ec-block-body .ec-ai-default-suggestions')!.style.height = '125px';

                                // Set pause
                                setTimeout((): void => {

                                    // Remove height from suggestions
                                    params.selector.querySelector<HTMLElement>('.ec-composer-options-list > li[data-option="ai"] .ec-block-body .ec-ai-default-suggestions')!.removeAttribute('style');

                                    // Display the search suggestions
                                    params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-suggestions');

                                }, 300);

                            }

                        }, 1000);

                    }

                },
                capture: false

            }, {
                action: 'click',
                target: (e: MouseEvent): void => {

                    // Get target
                    const target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Check if ec-ai-actions exists
                        if ( target.closest('.ec-ai-actions') ) {
                            e.preventDefault();

                            // Verify if is insert link
                            if ( target.closest('.ec-insert-ai-response') && (target.nodeName === 'A') ) {

                                // Get the response
                                const response: string | undefined = target.closest('.ec-ai-chat-response')?.getElementsByClassName('ec-ai-response')[0].innerHTML;

                                // Get iframe
                                const iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe && response ) {

                                    // Get content document
                                    const iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get the element
                                        const element: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                        // Verify if element is not null
                                        if ( element ) {

                                            // Insert html before the end of element data
                                            element.insertAdjacentHTML('beforeend', response);

                                        }

                                    }

                                }

                            }

                        } else if ( target.closest('.ec-ai-default-suggestions') && (target.nodeName === 'A') ) {
                            e.preventDefault();

                            // Get the command
                            const command: string | null = target.getAttribute('data-command');

                            // Verify if command exists
                            if ( command ) {

                                // Get the textarea
                                const textarea = target.closest('.ec-option-ai')?.getElementsByClassName('ec-textarea')[0] as HTMLInputElement;

                                // Enter the command in the textarea
                                textarea.value = command;

                                // Get ai content
                                get_ai_content(this.params);

                            }

                        } else if ( target.closest('.ec-services') ) {
                            e.preventDefault();

                            // Get the service slug
                            const service_slug: string | null = target.getAttribute('data-service');

                            // Verify if service slug exists
                            if ( service_slug ) {

                                // Get the service name
                                const service_name = target.textContent;

                                // Set service slug
                                target.closest('.ec-option-selector-dropdown')!.getElementsByClassName('ec-button')[0].setAttribute('data-service', service_slug);

                                // Set service text
                                target.closest('.ec-option-selector-dropdown')!.querySelectorAll('.ec-button > span')[0].textContent = service_name;

                                // Get ai content
                                get_ai_content(this.params);

                            }

                        }

                    }

                },
                capture: false

            }];

        };

    }

}