/**
 * @file Ai
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-03
 *
 * This file contains the functions for the Ai option
 */

// Import the types
import { params_type } from "../resources/types/types.index.js";

/**
 * Get ai content response
 * 
 * @param params_type params
 */
export const get_ai_content = async (params: params_type): Promise<void> => {

    // Display the search animation
    params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-search');

    // Remove the show error message class
    params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-error-message'); 

    // Display the response
    params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-suggestions');

    // Get the service
    const service = params.selector.querySelector('.ec-option-ai .ec-button-service')!.getAttribute('data-service');

    // Get the command
    const command = params.selector.querySelector('.ec-option-ai .ec-textarea') as HTMLInputElement;

    // Prepare the post's fields
    const post_fields: {
        service: string,
        command: string        
    } = {
        service: service?service:'',
        command: command.value
    };

    // Prepare the request parameters
    const request_params: {[key: string]: string | {
        [key: string]: string
    }} = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post_fields)
    };

    // Get the response
    const response = await fetch(params.options('api_url') + 'api/get_ai_content', request_params);

    // Verify if the response is failed
    if (!response.ok) {

        // Hide the search animation
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-search');

        // Add the show error class
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-error'); 
        
        // Set a pause
        setTimeout((): void => {

            // Remove the show error class
            params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-error'); 

            // Add the show error message class
            params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-error-message');            
            
        }, 300);

        // Handle different error statuses
        if (response.status === 404) {

            // Set the message
            params.selector.getElementsByClassName('ec-ai-message')[0].innerHTML = params.words('resource_not_found');

        } else if (response.status === 500) {

            // Set the message
            params.selector.getElementsByClassName('ec-ai-message')[0].innerHTML = params.words('internal_server_error');  
            
        } else {

            // Set the message
            params.selector.getElementsByClassName('ec-ai-message')[0].innerHTML = params.words('unknown_error_occurred');       
            
        }

        return;
        
    }

    // Turn response into json
    const json = await response.json();

    // Verify if the response is positive
    if ( json.success ) {

        // Hide the search animation
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-search');

        // Set the response
        params.selector.getElementsByClassName('ec-ai-response')[0].innerHTML = json.response;

        // Display the response
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-suggestions');

        // Add the show response class
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-response'); 
        
        // Set a pause
        setTimeout((): void => {

            // Remove the show response class
            params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-response'); 
            
        }, 300);

    } else {

        // Hide the search animation
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-search');

        // Set the message
        params.selector.getElementsByClassName('ec-ai-message')[0].innerHTML = json.message;    

        // Remove the suggestions
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-suggestions');

        // Add the show error class
        params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-error'); 
        
        // Set a pause
        setTimeout((): void => {

            // Remove the show error class
            params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.remove('ec-show-error'); 

            // Add the show error message class
            params.selector.querySelector('.ec-composer-options-list > li[data-option="ai"] .ec-block-body')?.classList.add('ec-show-error-message');            
            
        }, 300);

    }
    
};