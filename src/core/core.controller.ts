/**
 * @class Controller
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class prepares the emails composer before run
 */

// Import inc
import {
    update_options,
    show_message,
    get_word,
    get_instance,
    save_instance,
    run_builder
} from '../inc/inc.index.js';

// Core
export namespace Core {

    // Controller
    export class Controller {

        // Default
        constructor(ec_element: string, updated_options: object) {

            // Check if ec_element exists
            if ( typeof ec_element === 'undefined' ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('no_container_provided'));

            } else if ( typeof ec_element !== 'string' ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('no_container_provided'));
                
            } else if ( !ec_element ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('the_container_not_found'));

            }

            // Get the element
            const element = document.querySelectorAll(ec_element);

            // Verify if the element exists
            if ( element.length < 1 ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('the_container_not_found'));

            } else if ( element.length > 1 ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('the_container_duplicates'));

            }
            
            // Get element instance
            const instance = get_instance(ec_element);

            // Verify if the instance for this element is saved
            if ( typeof instance !== 'undefined' ) {

                // Show error message
                show_message(get_word('error_name') + ': ' + get_word('the_instance_already_registered'));

            }

            // Check if updated_options is defined
            if ( typeof updated_options !== 'undefined' ) {

                // Check if updated options exists
                if ( Object.keys(updated_options).length > 0 ) {

                    // Update options
                    this.update_options(updated_options);

                }

            }

            // Save instance
            save_instance(ec_element);

            // Run builder
            run_builder(ec_element);

        }

        /**
         * Replace the options
         * 
         * @param object updated_options
         */
        update_options(updated_options: object): void {

            // Replace
            update_options(updated_options);

        }

    }   

}

