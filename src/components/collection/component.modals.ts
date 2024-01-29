/**
 * @class Modals
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class manages events for the emails composer modals
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Components
export namespace Components {

    // Modals
    export class Modals implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'click',
                    target: (e: MouseEvent): void => {

                        // Get the target
                        let target = e.target as Element;

                        // Verify if the click is in a modal
                        if ( target.closest('.ec-composer-shadow') ) {

                            // Check for the class ec-composer-modal-select-dropdown-show
                            if ( target.closest('.ec-composer-shadow')!.getElementsByClassName('ec-composer-modal-select-dropdown-show').length > 0 ) {

                                // Remove the class ec-composer-modal-select-dropdown-show
                                target.closest('.ec-composer-shadow')!.getElementsByClassName('ec-composer-modal-select-dropdown-show')[0].classList.remove('ec-composer-modal-select-dropdown-show');

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer .ec-template-hide-modal-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get the target
                        let target = e.target as Element;

                        // Add hide shadow class
                        params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-hide');

                        // Get the modal
                        let modal: Element | null = target.closest('.ec-composer-modal');

                        // Verify if modal is not null
                        if ( modal ) {

                            // Add hide modal class
                            modal.classList.add('ec-composer-modal-hide');    

                            // Set pause
                            setTimeout((): void => {

                                // Remove hide shadow class
                                params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.remove('ec-composer-shadow-hide');

                                // Remove hide modal class
                                modal!.classList.remove('ec-composer-modal-hide');  

                                // Remove show shadow class
                                params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.remove('ec-composer-shadow-show');

                                // Remove show modal class
                                modal!.classList.remove('ec-composer-modal-show');  

                            }, 300);

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer-modal .ec-composer-modal-select-dropdown .ec-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get the target
                        let target = e.target as Element;

                        // Set a pause
                        setTimeout((): void => {

                            // Add the ec-option-selector-dropdown-show class
                            target.closest('.ec-composer-modal-select-dropdown')!.classList.add('ec-composer-modal-select-dropdown-show');

                        }, 100);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer-modal .ec-composer-modal-select-dropdown .ec-composer-modal-select-menu a',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get the target
                        let target = e.target as Element;

                        // Get the dropdown
                        let dropdown: Element | null = target.closest('.ec-composer-modal-select-dropdown');

                        // Set the selected id
                        dropdown!.getElementsByClassName('ec-button')[0].setAttribute('data-id', target.getAttribute('data-id')!);

                        // Set the text
                        dropdown!.getElementsByTagName('span')[0].textContent = target.textContent;             

                    },
                    capture: false
                }
                
            ];

        }

    }

}