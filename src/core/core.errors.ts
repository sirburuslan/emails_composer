/**
 * @class Errors
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class creates a custom error class
 */

// Core
export namespace Core {

    // Errors
    export class Errors extends Error {

        /**
         * Custom the default error
         * 
         * @param string message contains the message
         */
        constructor(message: string) {

            // Get parent constructor
            super(message);

        }

    }

}