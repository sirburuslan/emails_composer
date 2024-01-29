/**
 * @class Instances
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class creates an instance with the emails composer options
 */

// Import interfaces
import { Interfaces } from '../classes/interfaces/interface.instances.js';

// Core
export namespace Core {

    // Instances
    export class Instances {

        // Instances list
        static instances_list: Interfaces.Instances = {};

        /**
         * Save an instance
         * 
         * @param string instance
         */
        static save_instance(instance: string): void {

            // Save instance
            this.instances_list[instance] = {
                element: {}
            };

        }

        /**
         * Get an instance
         * 
         * @param string element
         */
        static get_instance(element: string): any {

            // Check if option exists
            return (typeof this.instances_list.hasOwnProperty(element) !== 'undefined')?this.instances_list[element]:false;

        }

    }

}