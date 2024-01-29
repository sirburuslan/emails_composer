/**
 * @class Builder
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class runs the emails composer
 */

// Import controllers
import Controllers from './../controllers/controllers.index.js';

// Core
export namespace Core {

    // Builder
    export class Builder {

        // Element
        element: string = '';

        // Controller
        controller;

        /**
         * Constructor
         * 
         * @param string element
         */
        constructor (element: string) {

            // Save element
            this.element = element;

            // Save the controller
            this.controller = new Controllers.Builder(element);

        }

        /**
         * Run builder
         */
        run_builder(): void {

            // Initialize
            this.controller.initialize();

            // Setup
            this.controller.setup();

        }

    }

}