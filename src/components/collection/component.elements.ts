/**
 * @class Elements
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class hanles the events for the elements and manages the elements
 */

// Import inc
import {
    move_element,
    reset_elements
} from '../../inc/inc.index.js';

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import plugins
import Plugins from '../../plugins/plugins.index.js';

// Components
export namespace Components {

    // Elements
    export class Elements implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'mousedown',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {

                        // Enable/disable editor's buttons by caret position
                        new Plugins.Small_editor().get_styles(e, params);

                    },
                    capture: false

                }, {
                    action: 'mousedown',
                    element: '.ec-element',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Check if the mouse is pressed
                        if ( e.buttons === 1 ) {

                            // Save target
                            let target: any = e.target;

                            // List all elements
                            Array.from(params.selector.getElementsByClassName('ec-element')).map((element): void => {

                                // Remove the temp classes
                                (element as Element).classList.remove('ec-element-temp', 'ec-element-temp-show');

                            });

                            // Set temp class
                            target.classList.add('ec-element-temp');   

                            // Clone element
                            let element: any = target.cloneNode(true);

                            // Get client rect of the cloned element
                            let cloned: DOMRect = target.getBoundingClientRect();

                            // Set ec-element-drag-active class
                            element.classList.add('ec-element-drag-active');
                            
                            // Get the top position
                            let top: number = (e.clientY - cloned.y);

                            // Get the left position
                            let left: number = (e.clientX - cloned.x);

                            // Set top
                            element.setAttribute('data-top', top);

                            // Set left
                            element.setAttribute('data-left', left);
                            
                            // Set width
                            element.style.width = cloned.width + 'px';

                            // Set height
                            element.style.height = cloned.height + 'px';

                            // Set top position
                            element.style.top = (e.clientY - top) + 'px';
                            
                            // Set left position
                            element.style.left = (e.clientX - left) + 'px';

                            // Append element
                            target.closest('.ec-composer').insertAdjacentElement('beforeend', element);

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'mousemove',
                    target: (e: MouseEvent): void => {
                        
                        // Verify if the mouse is pressed
                        if ( e.buttons === 1 ) {

                            // Check if ec-element-drag-active exists
                            if ( params.selector.getElementsByClassName('ec-element-drag-active').length > 0 ) {
                                e.preventDefault();

                                // Move element
                                move_element(params.selector, e.clientY, e.clientX, params.icons('unfold_less'));

                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'mouseup',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Reset elements
                        reset_elements(params);

                    },
                    capture: false

                }
                
            ];

        }

    }

}