/**
 * @file Structures
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the functions for structures moving and resseting
 */

// Import inc
import {
    get_content
} from '../inc/inc.index.js';

/**
 * Move structure
 * 
 * @param any selector
 * @param number clientY
 * @param number clientX
 * @param string drop_icon
 */
const move_structure = (selector: any, clientY: number, clientX: number, drop_icon: string): void => {

    // Get structure
    const structure: HTMLElement|null = selector.getElementsByClassName('ec-row-drag-active')[0];
                                    
    // Get top
    const top: number = (clientY - parseInt(structure?.getAttribute('data-top')!));

    // Get left
    const left: number = (clientX - parseInt(structure?.getAttribute('data-left')!));

    // Set top position
    structure!.style.top = top + 'px';

    // Set left position
    structure!.style.left = left + 'px';

    // Get iframe
    const iframe: HTMLIFrameElement | null = selector.getElementsByClassName('ec-composer-template-container')[0];

    // Get iframe client rect
    const iframe_rect: DOMRect | undefined = iframe?.getBoundingClientRect();

    // Verify if a drag active content exists
    if ( (selector.getElementsByClassName('ec-row-drag-active').length > 0) && (iframe instanceof HTMLIFrameElement) ) {

        // Get line
        const line: HTMLElement = selector.getElementsByClassName('ec-row-drag-active')[0];

        // Get iframe body
        const iframe_body: HTMLCollectionOf<HTMLBodyElement> | undefined = iframe?.contentWindow!.document.getElementsByTagName('body');

        // Check if iframe body exists
        if ( iframe_body ) {

            // Check if iframe_body has the ec-composer-template-preview class
            if ( iframe_body[0].classList.contains('ec-composer-template-preview') ) {
                return;
            }

            // Dragged line position
            const drag_line: number = (clientY - parseInt(line?.getAttribute('data-top')!));

            // Set position
            line!.style.top = drag_line + 'px';

            // Set opacity
            line!.style.opacity = '0.3';

            // Get line position
            const line_position: DOMRect = line.getBoundingClientRect();

            // Calculate line top
            const line_top: number = line_position.y;

            // Calculate line height
            const line_height: number = line_position.height;        

            // Verify if ec-composer-template-content-line-drop exists
            if ( iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {

                // List the drops
                Array.from(iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop')).map((item: Element): void => {
                    item.classList.remove('ec-composer-template-content-line-drop-active');
                });
                
                // List the drops
                Array.from(iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop')).forEach((element: Element): void => {
                 
                    // Get element position
                    const element_position: DOMRect = element.getBoundingClientRect();

                    // Get element top
                    const element_top: number = (iframe_rect instanceof DOMRect)?(iframe_rect.y + element_position.y):0;

                    // Check if dragged line is over a drop line
                    if ( (line_top <= element_top) && ((line_top + line_height) >= element_top) ) {
                      
                        // Set drop active
                        element.classList.add('ec-composer-template-content-line-drop-active');
                        
                        return;

                    } else if ( !element.nextElementSibling ) {

                        // Check if the line is below the drop
                        if ( ((line_top - element_top) > -1) && ((line_top - element_top) < 300) ) {

                            // Set drop active
                            element.classList.add('ec-composer-template-content-line-drop-active');
                            
                            return;
                            
                        }

                    }

                });

            }
            
        }

    }

}

/**
 * Resets the structures
 * 
 * @param any params
 */
const reset_structures = (params: any): void => {

    // Check if ec-row-drag-active exists
    if ( params.selector.getElementsByClassName('ec-row-drag-active').length > 0 ) {

        // Get iframe
        const iframe: HTMLIFrameElement = params.selector.getElementsByClassName('ec-composer-template-container')[0];

        // Get iframe body
        const iframe_body: HTMLCollectionOf<HTMLBodyElement> | undefined = iframe?.contentWindow!.document.getElementsByTagName('body');

        // Check if iframe body exists
        if ( iframe_body ) {

            // Get child
            const iframe_body_child: HTMLElement = iframe_body[0];

            // Check if drop active exists
            if ( iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop-active').length > 0 ) {

                // Get line
                const new_line: any = get_content({
                    'format': ['1', '2', '3', '4', '5', '6'].includes(params.selector.getElementsByClassName('ec-row-drag-active')[0].querySelector('div[data-format]').getAttribute('data-format'))?parseInt(params.selector.getElementsByClassName('ec-row-drag-active')[0].querySelector('div[data-format]').getAttribute('data-format')):1
                });

                // Set class
                new_line.classList.add('ec-show-content');

                // Append in structures
                iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop-active')[0].insertAdjacentElement('afterend', new_line);

                // Set pause
                setTimeout((): void => { 
                    
                    // Remove the ec-show-content class
                    iframe_body_child.getElementsByClassName('ec-show-content')[0].classList.remove('ec-show-content');

                }, 300);

            }

            // Remove the temporary class
            params.selector.getElementsByClassName('ec-row-temp')[0].classList.remove('ec-row-temp');
                    
            // Remove the row
            params.selector.getElementsByClassName('ec-row-drag-active')[0].remove();

            // Verify if ec-composer-template-content-line-drop exists
            if ( iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {
                
                // List the drops
                Array.from(iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop')).map((item: Element): void => {
                    item.remove();
                });

            }

        }

    }

}

// Export functions
export {move_structure, reset_structures};