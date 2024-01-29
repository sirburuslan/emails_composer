/**
 * @class Structures
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles some events for the email composer structures(rows in the template)
 */

// Import inc
import {
    move_structure,
    reset_structures
} from '../../inc/inc.index.js';

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Components
export namespace Components {

    // Structures
    export class Structures implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'mousedown',
                    element: '.ec-sections .ec-rows > .ec-row',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Check if the mouse is pressed
                        if ( e.buttons === 1 ) {

                            // Save target
                            let target = e.target as Element;

                            // Set temp class
                            target.classList.add('ec-row-temp');   

                            // Clone structure
                            let structure = target.cloneNode(true) as HTMLElement;

                            // Get client rect of the cloned structure
                            let cloned: DOMRect = target.getBoundingClientRect();

                            // Set ec-row-drag-active class
                            structure.classList.add('ec-row-drag-active');
                            
                            // Get the top position
                            let top: number = (e.clientY - cloned.y);

                            // Get the left position
                            let left: number = (e.clientX - cloned.x);

                            // Set top
                            structure.setAttribute('data-top', top.toString());

                            // Set left
                            structure.setAttribute('data-left', left.toString());
                            
                            // Set width
                            structure.style.width = cloned.width + 'px';

                            // Set height
                            structure.style.height = cloned.height + 'px';

                            // Set top position
                            structure.style.top = (e.clientY - top) + 'px';
                            
                            // Set left position
                            structure.style.left = (e.clientX - left) + 'px';

                            // Append structure
                            target.closest('.ec-composer')!.insertAdjacentElement('beforeend', structure);

                            // Get iframe
                            let iframe: HTMLIFrameElement = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                            // Get all lines
                            let lines: HTMLCollectionOf<Element> = iframe.contentWindow!.document.getElementsByClassName('ec-composer-template-content-line');

                            // List the lines
                            for ( let line of lines ) {

                                // Create a div for drop locations
                                let drops: any = document.createElement('div');

                                // Add ec-composer-template-content-line-drop class
                                drops.classList.add('ec-composer-template-content-line-drop');

                                // Add icon
                                drops.innerHTML = params.icons('unfold_less');

                                // Insert drop
                                line.insertAdjacentElement('afterend', drops);

                            }

                            // Create a div for drop locations
                            let drops: Element = document.createElement('div');

                            // Add ec-composer-template-content-line-drop class
                            drops.classList.add('ec-composer-template-content-line-drop');

                            // Add icon
                            drops.innerHTML = params.icons('unfold_less');

                            // Add drops
                            iframe.contentWindow!.document.getElementsByClassName('ec-composer-template')[0].insertAdjacentElement('afterbegin', drops);

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'mousemove',
                    target: (e: any): void => {

                        // Verify if the mouse is pressed
                        if ( e.buttons === 1 ) {

                            // Check if ec-row-drag-active exists
                            if ( params.selector.getElementsByClassName('ec-row-drag-active').length > 0 ) {
                                e.preventDefault();

                                // Move structure
                                move_structure(params.selector, e.clientY, e.clientX, params.icons('unfold_less'));

                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'mouseup',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Reset structures
                        reset_structures(params);

                    },
                    capture: false

                }
                
            ];

        }

    }

}