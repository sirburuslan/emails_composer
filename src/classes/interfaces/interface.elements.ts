/**
 * @interface Elements
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an interface with rules to build the elements
 */


// Import types
import {
    events_type,
    options_type
} from '../../resources/types/types.index.js';

// Interfaces
export namespace Interfaces {

    // Interface for elements
    export interface Elements {

        /**
         * Gets the element's icon
         * 
         * @param any parameters
         * 
         * @returns string with icon
         */
        get_element: (params: any) => string;

        /**
         * Gets the element's content
         * 
         * @param any parameters
         * 
         * @returns string with content
         */
        get_content: (params: any) => string;   
        
        /**
         * Gets the element's events
         * 
         * @param any parameters
         * 
         * @returns array with events
         */
        get_events: (params: any) => events_type;
        
        /**
         * Gets the element's options
         * 
         * @param any parameters
         * 
         * @returns array with options
         */
        get_options: (params: any) => options_type;

    }

}