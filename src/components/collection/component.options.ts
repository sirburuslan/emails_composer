/**
 * @class Options
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-28
 *
 * This class handles some events for the elements options
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import the incs
import { unselect_element } from '../../inc/inc.index.js';

// Components
export namespace Components {

    // Options
    export class Options implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'change',
                    element: '.ec-composer .ec-composer-element-options-tabs input',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        const target = e.target as HTMLElement;

                        // Check if target is valid
                        if ( target ) {

                            // Check if the value is 1
                            if ( target.classList.contains('ec-composer-element-options-tab-1') ) {

                                // Add the ec-composer-template-mobile class
                                params.selector.getElementsByClassName('ec-composer-container')[0].classList.add('ec-composer-template-mobile');

                                // Enable the mobile view
                                target.closest('.ec-composer-element-options')!.getElementsByClassName('ec-composer-element-options-area-body')[0].classList.add('ec-composer-element-mobile-options');
                                
                                // Add margin left and right to the container
                                params.selector.getElementsByClassName('ec-composer-template-container')[0].style.marginRight = 'auto';
                                params.selector.getElementsByClassName('ec-composer-template-container')[0].style.marginLeft = 'auto';

                            } else {

                                // Remove the ec-composer-template-mobile class
                                params.selector.getElementsByClassName('ec-composer-container')[0].classList.remove('ec-composer-template-mobile');

                                // Disable the mobile view
                                target.closest('.ec-composer-element-options')!.getElementsByClassName('ec-composer-element-options-area-body')[0].classList.remove('ec-composer-element-mobile-options');

                                // Set pause
                                setTimeout((): void => {

                                    // Remove style
                                    params.selector.getElementsByClassName('ec-composer-template-container')[0].removeAttribute('style');
                                    
                                }, 300);

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer .ec-composer-element-options-cancel',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        const target = e.target as HTMLElement;

                        // Check if target is valid
                        if ( target ) {

                            // Unselect the element
                            unselect_element(params); 

                        }

                    },
                    capture: false
                }
                
            ];

        }

    }

}