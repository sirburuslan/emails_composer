/**
 * @class History
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the history and allows to read and restore the backups
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import the classes
import Classes from "../../classes/classes.index.js";

// Components
export namespace Components {

    // History
    export class History implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'click',
                    target: (e: any): void => {

                        // Save target
                        let target: HTMLElement = e.target;

                        // Verify if closest .ec-loading-navigation-button exists
                        if ( target.closest('.ec-loading-navigation-button') ) {
                            e.preventDefault();

                            // Get the history
                            let history: string | null | undefined = target.closest('.ec-history-component')?.getAttribute('data-history');

                            // Get the page
                            let page: string | null | undefined = target.closest('a')?.getAttribute('data-page');

                            // Check if page is not null
                            if ( (typeof history === 'string') && (typeof page === 'string') ) {

                                // Get history for date
                                new Classes.History().get_history_by_date(params, parseInt(history), parseInt(page), 4);

                            }

                        } else if ( target.closest('.ec-history-record') ) {
                            e.preventDefault();

                            // Verify if the update should be restored
                            if ( target.classList.contains('ec-history-restore-button') ) {

                                // Get the time
                                const time: string | null | undefined = target.closest('.ec-grid')?.getAttribute('data-time');

                                // Verify if the time is string
                                if ( typeof time === 'string' ) {

                                    // Add ec-history-restore-active-button class
                                    target.classList.add('ec-history-restore-active-button');

                                    // Set a pause
                                    setTimeout((): void => {

                                        // Restore history record
                                        new Classes.History().restore_history_record(params, parseInt(time));  

                                    }, 1000);

                                }

                            }

                        } else if ( target.closest('.ec-section-history') ) {
                            e.preventDefault();

                            // Check if ec-loading-button class exists
                            if ( target.closest('.ec-loading-button') ) {

                                // Enable button animation
                                target.classList.add('ec-load-more-active');

                                // Get the page
                                let page: string | null = target.getAttribute('data-page');

                                // Check if page exists
                                if ( page ) {

                                    // Get history all
                                    new Classes.History().get_history_all(params, parseInt(page), 10);                                      

                                }

                            }

                        }

                    },
                    capture: false
                }     
                
            ];

        }

    }

}