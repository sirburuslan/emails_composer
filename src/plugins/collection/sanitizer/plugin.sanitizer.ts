/**
 * @class Sanitizer
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class sanitizes different kind of code
 */

// Import inc
import {
    show_message,
    get_word
} from '../../../inc/inc.index.js';

// Export the plugin namespace
export namespace Plugins {

    // Export the Sanitizer class
    export class Sanitizer {

        /**
         * Santize url
         * 
         * @param string url
         * 
         * @returns string with url
         */
        sanitize_url = (url: string): string => {

            try {

                // Parse the input as a URL
                let parse_url = new URL(url);
            
                // Allowed protocols
                let protocols: string[] = ['http:', 'https:'];

                // Verify if the protocol is allowed
                if (!protocols.includes(parse_url.protocol)) {
                  throw new Error(get_word('invalid_protocol'));
                }
            
                // If the URL is valid, return it
                return parse_url.toString();

              } catch (error: any) {

                    // Show error message
                    show_message(get_word('error_name') + ': ' + error.message);

                    return '';
                
              }

        }

    }

}