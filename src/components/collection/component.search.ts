/**
 * @class Search
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the emails composer search
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Components
export namespace Components {

    // Search
    export class Search implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'click',
                    element: '.ec-search .ec-search-button',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Save target
                        let target: any = e.target;

                        // Get the parent
                        let nav = target.closest('.ec-search');

                        // Check for active tab
                        if ( nav.getElementsByClassName('ec-search-active-button').length > 0 ) {

                            // Search for tab id
                            if ( params.selector!.querySelector(target.getAttribute('data-target')) ) {

                                // Add hide tab class
                                params.selector!.querySelector(nav.getElementsByClassName('ec-search-active-button')[0].getAttribute('data-target')).classList.add('ec-search-section-hide');

                                // Add start tab class
                                params.selector!.querySelector(target.getAttribute('data-target')).classList.add('ec-search-section-start');

                                // Set pause
                                setTimeout((): void => {

                                    // Remove the active link
                                    Array.from(nav.getElementsByClassName('ec-search-button')).forEach((element: any) => {
                                        element.classList.remove('ec-search-active-button'); 
                                    });

                                    // Add active class
                                    target.classList.add('ec-search-active-button');
                                        
                                    // Remove the show class
                                    Array.from(params.selector!.querySelector(target.getAttribute('data-target')).closest('.ec-search-sections').getElementsByClassName('ec-search-section')).forEach((element: any) => {
                                        element.classList.remove('ec-search-section-show', 'ec-search-section-hide', 'ec-search-section-start'); 
                                    });

                                    // Add show class
                                    params.selector!.querySelector(target.getAttribute('data-target')).classList.add('ec-search-section-show');                            
                                    
                                }, 100);

                            }

                        }

                    },
                    capture: false
                }
                
            ];

        }

    }

}