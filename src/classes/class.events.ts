/**
 * @class Events
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * The goal of this class is to register events listeners
 */

// Class Namespace
export namespace Class {

    // Events
    export class Events {

        // Scheduled events
        static events_list: Array<{node: any, action: string, target: any, iframe: string, capture: boolean}> | null = null;

        /**
         * Add event
         * 
         * @param any node
         * @param string action
         * @param any target
         * @param string iframe
         * @param boolean capture
         */
        addEventListener(node: any, action: string, target: any, iframe: string, capture: boolean = false) {

            // Verify if events is null
            if ( !Events.events_list ) {

                // Save event
                Events.events_list = [{node, action, target, iframe, capture}];

            } else {

                // Save event
                Events.events_list.push({node, action, target, iframe, capture});

            }

            // Check if the node is empty
            if ( !node ) {

                // Verify if iframe exists
                if ( iframe ) {

                    // Get iframe
                    const iframes: any = document.querySelectorAll(iframe);

                    // Verify if iframe exists
                    if ( typeof iframes !== 'undefined' ) {

                        // Register event
                        iframes[0].contentWindow.addEventListener(action, target, capture);

                    }

                } else {

                    // Register event
                    document!.addEventListener(action, target, capture); 

                }

            } else {

                // Get all nodes
                const all_nodes = node.length;

                // List the nodes
                for ( var a = 0; a < all_nodes; a++ ) {

                    // Register event
                    node[a]!.addEventListener(action, target, capture);

                }

            }

        }

        /**
         * Dispatch event
         * 
         * @param any node
         * @param string action
         */
        dispatchEvent(node: any, action: string) {

            // Run event
            node.dispatchEvent(new Event(action));

        }

        /**
         * Remove event
         * 
         * @param any node
         * @param string action
         * @param string target
         * @param boolean capture
         */
        removeEventListener(node: any, action: string, target: string, capture: boolean = false) {

            // Delete event listener
            node.removeEventListener(action, target, capture);

        }

    }

}