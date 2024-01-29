/**
 * @class Link
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class adds links in the text
 */

// Import types
import { params_type } from '../../../../resources/types/types.index.js';

// Import plugins
import Plugins from '../../../plugins.index.js';

// Small Editor Core Link
export namespace PluginsSmallEditorCore {

    // Export the Link class
    export class Link {

        /*---------------------- METODS TO ADD THE LINK BOX ------------------------*/

        /**
         * Add Box
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        add_box = (e: MouseEvent, params: params_type): void => {
            e.preventDefault();

            // Set a pause
            setTimeout((): void => {

                // Get iframe for template
                let itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                // Get iframe position
                let itemplate_position: DOMRect = itemplate.getBoundingClientRect();

                // Get content window
                let cwindow: Window | null = itemplate.contentWindow;

                // Create a new Selection object
                let selection: Selection | null = cwindow!.getSelection();

                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Save target
                    let target = e.target as Element;

                    // Check if the click is inside the text element
                    if ( target.closest('.ec-element-content-data') ) {

                        // Get range
                        let range: Range = selection.getRangeAt(0);

                        // Get the range position
                        let range_pos: DOMRect = range.getBoundingClientRect();

                        // Get a
                        let a: HTMLElement | null = (range.commonAncestorContainer.parentElement!.nodeName === 'A')?range.commonAncestorContainer.parentElement:range.commonAncestorContainer.parentElement!.closest('a');

                        // Verify if the link box was already added
                        if ( params.selector.getElementsByClassName('ec-ste-link-box').length < 1 ) {

                            // Verify if link exists
                            if ( a ) {

                                // Get href
                                let href: string | null = a!.getAttribute('href');

                                // Create the link box
                                let link_box: string = `<div class="ec-ste-link-box">
                                    <div class="ec-display-flex ec-justify-content-start">
                                        <input type="text" value="${href}" placeholder="${params.words('enter_url')}" maxlength="1000">
                                        <div class="ec-ste-link-box-group-buttons">
                                            <button type="button" class="ec-button ec-ste-link-update-button">${params.icons('link_add')}</button>
                                            <button type="button" class="ec-button ec-ste-link-remove-button">${params.icons('link_off')}</button>
                                        </div>
                                    </div>
                                </div>`;

                                // Append link box
                                params.selector.getElementsByClassName('ec-composer')[0].insertAdjacentHTML('beforeend', link_box);

                            }

                        }

                        // Get the link box element
                        let link_box_el = params.selector.getElementsByClassName('ec-ste-link-box')[0] as HTMLElement;

                        // Verify if there is the space to show the link box
                        if ( itemplate_position.width > (range_pos.x + 260) ) {

                            // Calculate the top position
                            let top: number = itemplate_position.y + range_pos.y + range_pos.height + 10;

                            // Calculate the left position
                            let left: number = itemplate_position.x + range_pos.x - 15;

                            // Set link box position
                            link_box_el.style.cssText = `top: ${top}px;left: ${left}px;--link-box-angle-left: 7px;`;

                            // Verify if the link was found
                            if ( a && typeof a.getAttribute('href') ) {

                                // Set link as value
                                link_box_el.getElementsByTagName('input')[0].value = a.getAttribute('href') as string;

                            }

                        }

                        // Verify if link exists
                        if ( a ) {

                            // Create a new Range object
                            let new_range: Range = document.createRange();

                            // Set start range
                            new_range.setStartBefore(a.childNodes[0]);   
                            
                            // Set end range
                            new_range.setEndAfter(a.childNodes[(a.childNodes.length - 1)]);   

                            // Verify if the selection is not null
                            if ( selection && target.parentElement ) {

                                // Remove all ranges
                                selection.removeAllRanges();

                                // Add the newly created range to the selection
                                selection.addRange(new_range);

                                // Make active the content editable editor
                                (a.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                            }

                        }

                    }

                }

            }, 300);
            
        }

        /**
         * Update the url in a link
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        update = (e: MouseEvent, params: params_type): void => {

            // Get iframe for template
            let itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = itemplate.contentWindow;

            // Create a new Selection object
            let selection: Selection | null = cwindow!.getSelection();

            // Remove selections in the iframe
            if ( selection && (selection.rangeCount > 0) ) {

                // Get range
                let range: Range = selection.getRangeAt(0);

                // Get the a
                let a: Node = range.commonAncestorContainer;

                // Check if a is an element node
                if (a.nodeType === Node.ELEMENT_NODE) {

                    // Save target
                    let target = e.target as Element;

                    // Create element from node
                    let element = a as HTMLElement;

                    // Get value
                    let value: string = new Plugins.Sanitizer().sanitize_url(target.closest('.ec-display-flex')!.getElementsByTagName('input')[0].value);
                    
                    // Verify if value exists
                    if ( value ) {

                        // Update href
                        element.setAttribute('href', value);

                    }

                    // Remove link box
                    params.selector.getElementsByClassName('ec-ste-link-box')[0].remove();

                }

            }

        }

        /**
         * Remove a link
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        remove = (e: MouseEvent, params: params_type): void => {

            // Get iframe for template
            let itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = itemplate.contentWindow;

            // Create a new Selection object
            let selection: Selection | null = cwindow!.getSelection();

            // Remove selections in the iframe
            if ( selection && (selection.rangeCount > 0) ) {

                // Get range
                let range: Range = selection.getRangeAt(0);

                // Get the a
                let a: Node = range.commonAncestorContainer;

                // Check if a is an element node
                if (a.nodeType === Node.ELEMENT_NODE) {

                    // Create element from node
                    let element = a as HTMLElement;

                    // Get all element's childnodes
                    let enodes: NodeListOf<Node> = element.childNodes;

                    // Replace a
                    element.replaceWith(...enodes);

                    // Remove link box
                    params.selector.getElementsByClassName('ec-ste-link-box')[0].remove();

                    // Remove the ec-ste-active-button class
                    params.selector.getElementsByClassName('ec-ste-add-link-button')[0].classList.remove('ec-ste-active-button');                    

                }

            }

        }

    }

}