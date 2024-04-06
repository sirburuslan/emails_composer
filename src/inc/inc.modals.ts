/**
 * @file Modals
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used in the emails composer modals
 */

// Import types
import { params_type } from '../resources/types/types.index.js';

/**
 * Display the messages in the modal
 * 
 * @param params_type params
 * @param string type,
 * @param string message
 */
export const show_modal_message = (params: params_type, type: string, message: string ): void => {

    // Get the open modal
    const modal: Element | null = params.selector.querySelector('.ec-composer-modal-show');

    // Verify if the message field exists
    if ( modal!.getElementsByClassName('ec-composer-modal-message').length > 0 ) {

        // Add message
        modal!.getElementsByClassName('ec-composer-modal-message')[0].innerHTML = message;

        // Verify if the type is for success message
        if ( type === 'success' ) {

            // Add the show message class
            modal!.getElementsByClassName('ec-composer-modal-message')[0].classList.add('ec-composer-modal-message-success', 'ec-composer-modal-message-success-show');

            // Wait
            setTimeout((): void => {

                // Remove the class ec-composer-modal-message-success-show
                modal!.getElementsByClassName('ec-composer-modal-message')[0].classList.remove('ec-composer-modal-message-success-show');
                
            }, 300);

        } else {

            // Add the show message class
            modal!.getElementsByClassName('ec-composer-modal-message')[0].classList.add('ec-composer-modal-message-error', 'ec-composer-modal-message-error-show');

            // Wait
            setTimeout((): void => {

                // Remove the class ec-composer-modal-message-error-show
                modal!.getElementsByClassName('ec-composer-modal-message')[0].classList.remove('ec-composer-modal-message-error-show');
                
            }, 300);

        }

    }

}