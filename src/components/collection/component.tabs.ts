/**
 * @class Tabs
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the emails composer tabs in the main menu
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import the types
import {
    params_type, 
    events_type 
} from '../../resources/types/types.index.js';

// Components
export namespace Components {

    // Tabs
    export class Tabs implements InterfaceComponents.Interfaces.Components {

        get_events(params: params_type): events_type {

            return [

                {
                    action: 'click',
                    element: '.ec-composer-nav .ec-composer-nav-link',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        let target: EventTarget | null = e.target;

                        // We need to check if the target is a html element
                        if ( target instanceof HTMLElement ) {

                            // Get the parent
                            let nav = target.closest('.ec-composer-nav') as Element;

                            // Check for active tab
                            if ( nav.getElementsByClassName('ec-composer-nav-link').length > 0 ) {

                                // Get the href link of the tab
                                let href_link: string | null = target.getAttribute('href');

                                // Check if the tab has a link
                                if ( href_link ) {

                                    // Search for tab id
                                    if ( params.selector!.querySelector(href_link) ) {

                                        // Get the previous active tab link which should be hidden
                                        let old_href_link: string | null = nav.getElementsByClassName('ec-composer-nav-link-active')[0]?.getAttribute('href');

                                        // Check if old href link exists if is not null
                                        if ( old_href_link ) {

                                            // Add hide tab class
                                            params.selector!.querySelector(old_href_link)!.classList.add('ec-tab-hide');

                                        }

                                        // Add start tab class
                                        params.selector!.querySelector(href_link)!.classList.add('ec-tab-start');

                                        // Set pause
                                        setTimeout((): void => {

                                            // Remove the active link
                                            Array.from(nav.getElementsByClassName('ec-composer-nav-link')).forEach((element: any) => {
                                                element.classList.remove('ec-composer-nav-link-active'); 
                                            });

                                            // Check if the target and href link is not null
                                            if ( (target instanceof HTMLElement) && href_link ) {

                                                // Add active class
                                                target.classList.add('ec-composer-nav-link-active');

                                                // Get all tabs because we need to hide them
                                                let all_tabs: HTMLCollectionOf<Element> = params.selector!.querySelector(href_link)!.closest('.ec-tabs')!.getElementsByClassName('ec-tab');
                                                    
                                                // Check now if all tabs is a list with the wanted value
                                                if ( all_tabs ) {

                                                    // Remove the show class
                                                    Array.from(all_tabs).forEach((element: any) => {
                                                        element.classList.remove('ec-tab-show', 'ec-tab-hide', 'ec-tab-start'); 
                                                    });

                                                }

                                                // Add show class
                                                params.selector!.querySelector(href_link)!.classList.add('ec-tab-show');                            
                                                
                                                // Check if the main parent has the .ec-composer-main-hide-panel class
                                                if ( params.selector.getElementsByClassName('ec-composer-main')[0].classList.contains('ec-composer-main-hide-panel') ) {

                                                    // Add first the .ec-composer-main-show-panel class to show the panel
                                                    params.selector.getElementsByClassName('ec-composer-main')[0].classList.add('ec-composer-main-show-panel');

                                                    // Next set a pause before remove the .ec-composer-main-hide-panel class
                                                    setTimeout((): void => {

                                                        // Remove the .ec-composer-main-hide-panel class
                                                        params.selector.getElementsByClassName('ec-composer-main')[0].classList.remove('ec-composer-main-hide-panel');

                                                        // Remove the .ec-composer-main-show-panel class
                                                        params.selector.getElementsByClassName('ec-composer-main')[0].classList.remove('ec-composer-main-show-panel');

                                                    }, 300);

                                                }

                                            }

                                        }, 100);

                                    }

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