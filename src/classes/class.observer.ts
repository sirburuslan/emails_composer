/**
 * @class Observer
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class monitors the changes and creates backups
 */

// Class Namespace
export namespace Class {

    // Timer
    export class Observer {

        // Monitored elements
        static elements: {[key: string]: MutationObserver} | null = null;

        /**
         * Monitor and element
         * 
         * @param string monitor_id
         * @param Element element
         * @param object attributes
         */
        static monitor_element(monitor_id: string, element: Element, attributes: {[key: string]: boolean}, callback: (mutationsList: MutationRecord[]) => void) {

            // Verify if the element is monitored
            if ( Observer.elements && (typeof Observer.elements![monitor_id] !== 'undefined') ) {

                // Disconnect monitor
                Observer.elements![monitor_id].disconnect();

            }

            // Create a new MutationObserver instance
            Observer.elements! = {
                [monitor_id]: new MutationObserver(callback)
            };
            
            // Monitor the element
            Observer.elements![monitor_id].observe(element, attributes);

        }

    }

}