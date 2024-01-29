/**
 * @class Sections
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the emails composer sections
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import types
import { params_type } from '../../resources/types/types.index.js';

// Components
export namespace Components {

    // Sections
    export class Sections implements InterfaceComponents.Interfaces.Components {

        get_events(params: params_type): any {

            return [

                {
                    action: 'click',
                    target: (e: MouseEvent): void => {

                        // Target
                        let target = e.target as HTMLElement;
                        
                        // Check if target is valid
                        if ( target instanceof HTMLElement ) {

                            // Check if is inside the header section
                            if ( target.closest('.ec-section-header') ) {

                                // Save section
                                let section: HTMLElement | null = target.closest('.ec-section');

                                // Check if section is not null
                                if ( section !== null ) {

                                    // Get the section body
                                    let section_body: HTMLElement | null = section.querySelector('.ec-section-body');

                                    // Check for the ec-section-show class
                                    if ( section!.classList.contains('ec-section-show') ) {

                                        // Add active class
                                        section!.classList.add('ec-section-active');

                                        // Get first child
                                        let first_child = section_body?.firstChild as HTMLElement;

                                        // Set height
                                        section_body!.style.height = first_child.offsetHeight + 'px';
                                        
                                        // Set pause
                                        setTimeout(() => {

                                            // Set height
                                            section_body!.style.height = '0';

                                            // Remove the ec-section-show class
                                            section!.classList.remove('ec-section-show');

                                        }, 10);

                                        // Set pause
                                        setTimeout(() => {

                                            // Remove active class
                                            section!.classList.remove('ec-section-active');

                                        }, 300);

                                    } else {

                                        // Set height
                                        section_body!.style.height = '0';
                                        
                                        // Add the ec-section-show class
                                        section!.classList.add('ec-section-show');

                                        // Get first child
                                        let first_child = section_body?.firstChild as HTMLElement;

                                        // Set height
                                        section_body!.style.height = first_child.offsetHeight + 'px';

                                        // Set pause
                                        setTimeout(() => {

                                            // Set auto height
                                            section_body!.style.height = 'auto';

                                        }, 300);

                                    }

                                }

                            }

                        }

                    },
                    capture: false
                },
                {
                    action: 'click',
                    element: '.ec-composer .ec-section-action-hide-button',
                    target: (e: MouseEvent): void => {

                        // Target
                        let target = e.target as HTMLElement;
                        
                        // Check if target is valid
                        if ( target instanceof HTMLElement ) {

                            // Get the .ec-composer-main class which is the parent of the panel
                            let composer_main: HTMLElement | null = target.closest('.ec-composer-main');

                            // Verify if composer_main is instance of the html element
                            if ( composer_main instanceof HTMLElement ) {

                                // Add the .ec-composer-main-hide-panel class to hide the panel
                                composer_main.classList.add('ec-composer-main-hide-panel');

                                // Hide the link for the tab when the panel is hidden
                                params.selector!.getElementsByClassName('ec-composer-nav-link-active')[0].classList.remove('ec-composer-nav-link-active');

                            }

                        }

                    },
                    capture: false
                }
                
            ];

        }

    }

}