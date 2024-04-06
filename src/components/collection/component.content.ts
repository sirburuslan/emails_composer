/**
 * @class Content
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for contents and manages the content
 */

// Import inc
import {
    get_content,
    reset_contents,
    move_element,
    reset_elements,
    move_structure,
    reset_structures,
    unselect_element
} from '../../inc/inc.index.js';

// Import components interface
import Classes, { InterfaceComponents } from '../../classes/classes.index.js';

// Components
export namespace Components {

    // Content
    export class Content implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [

                {
                    action: 'mousedown',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {

                        // Save target
                        const target: any = e.target;

                        // Get iframe
                        const iframe: HTMLCollectionOf<HTMLIFrameElement> = params.selector.getElementsByClassName('ec-composer-template-container');

                        // Get content window
                        const cwindow: Window | null = iframe[0].contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Remove selections in the iframe
                            if (cwindow.getSelection) {
                                cwindow.getSelection()!.removeAllRanges();
                            }

                        }

                        // Verify if was clicked the move button
                        if ( target.closest('.ec-composer-template-content-move-button') ) {
                            e.preventDefault();

                            // Get all lines
                            const lines: any = target.closest('.ec-composer-template').getElementsByClassName('ec-composer-template-content-line');
                            
                            // Total lines
                            const tlines: number = lines.length;

                            // List the lines
                            for ( let c: number = 0; c < tlines; c++ ) {

                                // Create a div for drop locations
                                const drops: any = document.createElement('div');

                                // Add ec-composer-template-content-line-drop class
                                drops.classList.add('ec-composer-template-content-line-drop');

                                // Add icon
                                drops.innerHTML = params.icons('unfold_less');

                                // Insert drop
                                lines[c].insertAdjacentElement('afterend', drops);

                            }

                            // Get the line
                            const line: any = target.closest('.ec-composer-template-content-line');                         

                            // Clone the line
                            const cline: any = line.cloneNode(true);

                            // Set temp class
                            line.classList.add('ec-composer-template-content-line-temp');   

                            // Set top
                            cline.setAttribute('data-top', (e.clientY - line.getBoundingClientRect().y));

                            // Add ec-composer-template-content-line-drag-active class
                            cline.classList.add('ec-composer-template-content-line-drag-active');

                            // Set opacity
                            cline.style.opacity = 0;
                            
                            // Append the cloned line
                            target.closest('.ec-composer-template').appendChild(cline);

                            // Check if iframe exists
                            if ( iframe[0] instanceof HTMLIFrameElement ) {

                                // Check if ec-element-content-active exists
                                if ( cwindow!.document.getElementsByClassName('ec-element-content-active').length > 0 ) {

                                    // Get active class
                                    const active: Element = cwindow!.document.getElementsByClassName('ec-element-content-active')[0];

                                    // Remove ec-element-content-active class
                                    active.classList.remove('ec-element-content-active');

                                }

                                // Add ec-composer-template-container-active class to the iframe
                                iframe[0].classList.add('ec-composer-template-container-active');

                                // Create a div for drop locations
                                const drops: any = document.createElement('div');

                                // Add ec-composer-template-content-line-drop class
                                drops.classList.add('ec-composer-template-content-line-drop');

                                // Add icon
                                drops.innerHTML = params.icons('unfold_less');

                                // Add drops
                                cwindow!.document.getElementsByClassName('ec-composer-template')[0].insertAdjacentElement('afterbegin', drops);

                            }
                            
                        } else if ( target.closest('.ec-composer-element-move-button') ) {
                            e.preventDefault();

                            // Check if drops exists
                            if ( target.closest('.ec-composer-template').getElementsByClassName('ec-composer-template-cell-drop').length < 1 ) {

                                // Get all cells
                                const cells: any = target.closest('.ec-composer-template').querySelectorAll('.ec-composer-template .ec-composer-template-cell');

                                // Verify if cells exists
                                if ( cells.length > 0 ) {

                                    // Total cells
                                    const tcells: number = cells.length;

                                    // List the cells
                                    for ( let c: number = 0; c < tcells; c++ ) {

                                        // Create a div for drop locations
                                        const drops: any = document.createElement('div');

                                        // Add ec-composer-template-cell-drop class
                                        drops.classList.add('ec-composer-template-cell-drop');

                                        // Add icon
                                        drops.innerHTML = params.icons('unfold_less');

                                        // Insert drop
                                        cells[c].insertAdjacentElement('afterBegin', drops);

                                    }

                                }

                                // Get all contents
                                const contents: any = target.closest('.ec-composer-template').querySelectorAll('.ec-composer-template .ec-element-content');
                                
                                // Verify if contents exists
                                if ( contents.length > 0 ) {

                                    // Total contents
                                    const tcontents: number = contents.length;

                                    // List the contents
                                    for ( let  co: number = 0; co < tcontents; co++ ) {

                                        // Create a div for drop locations
                                        const drops: any = document.createElement('div');

                                        // Add ec-composer-template-cell-drop class
                                        drops.classList.add('ec-composer-template-cell-drop');

                                        // Add icon
                                        drops.innerHTML = params.icons('unfold_less');

                                        // Insert drop
                                        contents[co].insertAdjacentElement('afterEnd', drops);

                                    }

                                }

                            }

                            // Get the element
                            const element: any = target.closest('.ec-element-content');

                            // Clone the element
                            const celement: any = element.cloneNode(true);

                            // Set temp class
                            element.classList.add('ec-element-content-temp');

                            // Get de element rect
                            const element_rect: DOMRect = element.getBoundingClientRect();

                            // Set top
                            celement.setAttribute('data-top', (e.clientY - element_rect.y));

                            // Set left
                            celement.setAttribute('data-left', (e.clientX - element_rect.x));                            

                            // Add ec-composer-element-drag-active class
                            celement.classList.add('ec-composer-element-drag-active');

                            // Set opacity
                            celement.style.opacity = 0;

                            // Set width
                            celement.style.width = element_rect.width;

                            // Set height
                            celement.style.height = element_rect.height;                            
                            
                            // Append the cloned element
                            target.closest('body').appendChild(celement);

                            // Check if iframe exists
                            if ( iframe[0] instanceof HTMLIFrameElement ) {

                                // Check if ec-element-content-active exists
                                if ( cwindow!.document.getElementsByClassName('ec-element-content-active').length > 0 ) {

                                    // Get active class
                                    const active: Element = cwindow!.document.getElementsByClassName('ec-element-content-active')[0];

                                    // Remove ec-element-content-active class
                                    active.classList.remove('ec-element-content-active');

                                }

                                // Add ec-composer-template-container-active class to the iframe
                                iframe[0].classList.add('ec-composer-template-container-active');                                

                            }

                        }

                        // Verify if is the buttons groups
                        if ( target.closest('.ec-composer-element-buttons-group') || target.closest('.ec-composer-template-content-buttons-group') || target.closest('.ec-composer-template-content-move-button') ) {

                            // Check if the ec-element-content-active class exists
                            if ( target.closest('.ec-composer-template').getElementsByClassName('ec-element-content-active').length > 0 ) {

                                // Unselect the element
                                unselect_element(params);

                            }

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'mousemove',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {

                        // Check if the button is pressed
                        if ( e.buttons === 1 ) {

                            // Save target
                            const target = e.target as HTMLElement;

                            // Check if target is valid
                            if ( target ) {

                                // Get the iframe body
                                const iframe_body = target.closest('body') as HTMLElement;

                                // Verify if a drag active content exists
                                if ( iframe_body?.getElementsByClassName('ec-composer-template-content-line-drag-active').length > 0 ) {
                                    e.preventDefault();

                                    // Get line
                                    const line = iframe_body?.getElementsByClassName('ec-composer-template-content-line-drag-active') as HTMLCollectionOf<HTMLElement>;

                                    // Check if line exists
                                    if ( line.length > 0 ) {

                                        // Get top
                                        const top: string | null = line[0]!.getAttribute('data-top');

                                        // Check if top is not null
                                        if ( top !== null ) {

                                            // Dragged line position
                                            const drag_line: number = ((e.clientY - parseInt(top)) + iframe_body?.scrollTop);

                                            // Set position
                                            line[0]!.style.top = drag_line + 'px';

                                            // Set opacity
                                            line[0]!.style.opacity = '0.3';

                                            // Verify if ec-composer-template-content-line-drop exists
                                            if ( iframe_body?.getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {

                                                // List the drops
                                                Array.from(iframe_body?.getElementsByClassName('ec-composer-template-content-line-drop')).map((item: any): void => {
                                                    item.classList.remove('ec-composer-template-content-line-drop-active');
                                                });

                                                // Found marker
                                                let found: number = 0;
                                                
                                                // List the drops
                                                Array.from(iframe_body?.getElementsByClassName('ec-composer-template-content-line-drop')).forEach((element: any): void => {

                                                    // Verify if found is 1
                                                    if ( found > 0 ) return;

                                                    // Check if dragged line is over a drop line
                                                    if ( (line[0].getBoundingClientRect().y <= element.getBoundingClientRect().y) && ((line[0].getBoundingClientRect().y + line[0].getBoundingClientRect().height) >= element.getBoundingClientRect().y) ) {
                                                        
                                                        // Set drop active
                                                        element.classList.add('ec-composer-template-content-line-drop-active');
                                                        
                                                        // Increase found
                                                        found++;

                                                    }

                                                });

                                            }

                                        }

                                    }

                                } else if ( params.selector.getElementsByClassName('ec-element-drag-active').length > 0 ) {

                                    // Get iframe
                                    const iframe: any = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                                    // Get bounding client rect
                                    const client_rect: DOMRect = iframe.getBoundingClientRect();

                                    // Move element
                                    move_element(params.selector, (client_rect.y + e.clientY), (client_rect.x + e.clientX), params.icons('unfold_less'));

                                } else if ( params.selector.getElementsByClassName('ec-row-drag-active').length > 0 ) {

                                    // Get iframe
                                    const iframe: any = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                                    // Get bounding client rect
                                    const client_rect: DOMRect = iframe.getBoundingClientRect();

                                    // Move structure
                                    move_structure(params.selector, (client_rect.y + e.clientY), (client_rect.x + e.clientX), params.icons('unfold_less'));

                                } else if ( iframe_body?.getElementsByClassName('ec-composer-element-drag-active').length > 0 ) {
                                    e.preventDefault();

                                    // Get bounding client rect
                                    const body_rect: DOMRect = iframe_body.getBoundingClientRect();

                                    // Get element
                                    const element: any = iframe_body?.getElementsByClassName('ec-composer-element-drag-active')[0];

                                    // Dragged element top position
                                    const drag_top: number = ((e.clientY - parseInt(element.getAttribute('data-top'))) + iframe_body?.scrollTop);

                                    // Dragged element left position
                                    const drag_left: number = ((e.clientX - parseInt(element.getAttribute('data-left'))) + iframe_body?.scrollLeft);

                                    // Set top position
                                    element!.style.top = drag_top + 'px';

                                    // Set left position
                                    element!.style.left = drag_left + 'px';

                                    // Set opacity
                                    element!.style.opacity = '0.3';

                                    // Get the element rect
                                    const element_rect: DOMRect = element.getBoundingClientRect();
                                    
                                    // Verify if ec-composer-template-cell-drop exists
                                    if ( iframe_body?.getElementsByClassName('ec-composer-template-cell-drop').length > 0 ) {

                                        // List the drops
                                        Array.from(iframe_body?.getElementsByClassName('ec-composer-template-cell-drop')).map((drop: any): void => {
                                            drop.classList.remove('ec-composer-template-cell-drop-active');
                                        });

                                        // Found marker
                                        let found: number = 0;
                                        
                                        // List the drops
                                        Array.from(iframe_body?.getElementsByClassName('ec-composer-template-cell-drop')).forEach((drop: any): void => {

                                            // Verify if found is 1
                                            if ( found > 0 ) return;

                                            // Get the drop client rect
                                            const drop_rect: DOMRect = drop.getBoundingClientRect();

                                            // Check if dragged element is over a drop
                                            if ( (element_rect.y <= (body_rect.x + drop_rect.y)) && ((element_rect.y + element_rect.height) >= (body_rect.x + drop_rect.y)) && ((body_rect.x + drop_rect.x) <= e.clientX) && (e.clientX <= (body_rect.x + drop_rect.x + drop_rect.width)) ) {
                                            
                                                // Set drop active
                                                drop.classList.add('ec-composer-template-cell-drop-active');
                                                
                                                // Increase found
                                                found++;

                                            }

                                        });

                                        // List the placeholders
                                        Array.from(iframe_body?.getElementsByClassName('ec-composer-template-cell-placeholder')).forEach((placeholder: any): void => {

                                            // Verify if found is 1
                                            if ( found > 0 ) return;

                                            // Get the placeholder client rect
                                            const placeholder_rect: DOMRect = placeholder.getBoundingClientRect();

                                            // Check if dragged element is over a placeholder
                                            if ( (element_rect.y >= placeholder_rect.y) && ((element_rect.y + element_rect.height) >= placeholder_rect.y) && ((body_rect.x + placeholder_rect.x) <= e.clientX) && (e.clientX <= (body_rect.x + placeholder_rect.x + placeholder_rect.width)) ) {
                                            
                                                // Set placeholder active
                                                placeholder.closest('.ec-composer-template-cell').getElementsByClassName('ec-composer-template-cell-drop')[0].classList.add('ec-composer-template-cell-drop-active');
                                                
                                                // Increase found
                                                found++;

                                            }

                                        });                                    

                                    }

                                }

                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'mouseup',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Reset contents
                        reset_contents(params);

                        // Reset elements
                        reset_elements(params);

                        // Reset structures
                        reset_structures(params);

                    },
                    capture: false

                }, {
                    action: 'mouseup',
                    element: '.ec-composer',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Reset contents
                        reset_contents(params);

                    },
                    capture: false

                }, {
                    action: 'click',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        const target: any = e.target;

                        // Verify if was clicked the new button
                        if ( target.closest('.ec-composer-template-content-new-button') ) {

                            // Add ec-composer-template-content-line-active class
                            target.closest('.ec-composer-template-content-line').classList.add('ec-composer-template-content-line-active');

                            // Add show shadow class
                            params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-show');

                            // Add show modal class
                            params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-rows-modal"]').classList.add('ec-composer-modal-show');                            

                        } else if ( target.closest('.ec-composer-template-content-save-button') ) {

                            // List all lines
                            Array.from(target.closest('.ec-composer-template').getElementsByClassName('ec-composer-template-content-line')).map(line => {

                                // Remove the class ec-composer-template-content-line-selected
                                (line as HTMLElement).classList.remove('ec-composer-template-content-line-selected');

                            });

                            // Add the class ec-composer-template-content-line-selected
                            target.closest('.ec-composer-template-content-line').classList.add('ec-composer-template-content-line-selected');

                            // Add show shadow class
                            params.selector!.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-show');

                            // Get the create module modal
                            const create_module: Element | null = params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]');

                            // Empty the name
                            (create_module!.getElementsByClassName('ec-menu-module-name')[0] as HTMLInputElement).value = '';

                            // Empty the description
                            (create_module!.getElementsByClassName('ec-menu-module-description')[0] as HTMLInputElement).value = '';

                            // Hide the new module extra fields
                            create_module!.getElementsByClassName('ec-module-advanced-fields')[0].classList.remove('ec-module-advanced-fields-expanded');

                            // Reset the categories
                            create_module!.getElementsByClassName('ec-module-category-button')[0].removeAttribute('data-id');
                            create_module!.querySelectorAll('.ec-module-category-button > span')[0].textContent = params.words('uncategorized');

                            // Add show modal class
                            create_module!.classList.add('ec-composer-modal-show');

                            // Empty the upload list
                            create_module!.getElementsByClassName('ec-cover-uploaded-files')[0].classList.remove('ec-cover-uploaded-files-show');

                            // Remove the class ec-save-module-button
                            create_module!.getElementsByClassName('ec-save-module-button')[0].classList.remove('ec-saving-module-button');
                            
                            // Remove the class ec-composer-modal-message-success and ec-composer-modal-message-error
                            create_module!.getElementsByClassName('ec-composer-modal-message')[0].classList.remove('ec-composer-modal-message-success', 'ec-composer-modal-message-error');

                        } else if ( target.closest('.ec-composer-template-content-delete-button') ) {

                            // Add hide class
                            target.closest('.ec-composer-template-content-line').classList.add('ec-hide-content');

                            // Set pause
                            setTimeout((): void => {

                                // Remove the content
                                target.closest('.ec-composer-template-content-line').remove();     

                            }, 300);

                        } else if ( target.closest('.ec-composer-element-clone-button') ) {

                            // Get the element html
                            const element_html: string = target.closest('.ec-element-content').getElementsByClassName('ec-element-content-data')[0].outerHTML;

                            // Get the element's ID
                            const element_id: string = target.closest('.ec-element-content').getAttribute('data-id');

                            // Create a id for the element
                            const new_element_id: string = 'ec-element-' + Date.now();

                            // Get iframe
                            const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Verify if iframe exists
                            if ( iframe ) {

                                // Get content document
                                const iframeDocument: Document | null = iframe.contentDocument;

                                // Check if iframeDocument is not null
                                if ( iframeDocument !== null ) {

                                    // Get the style tag
                                    const style: HTMLStyleElement | null = iframeDocument.head.querySelector('style[data-element="' + element_id + '"]');

                                    // Verify if the tag style exists
                                    if ( style ) {

                                        // Replace the element id in html
                                        const new_style: string = style.outerHTML.replaceAll(element_id, new_element_id);

                                        // Append styles
                                        style.insertAdjacentHTML('afterend', new_style);

                                        // Set a pause
                                        setTimeout((): void => {

                                            // Init the backup class
                                            const backup = new Classes.Backup();

                                            // Save backup
                                            backup.update_css_element_id(new_element_id, params, style!.innerHTML.replaceAll(element_id, new_element_id), false);

                                        }, 1000);

                                    }                                        

                                }

                            }

                            /*---------------------- CREATE BUTTONS ------------------------*/ 
                            
                            // Buttons container
                            let buttons: string = '';

                            // Create a group with buttons
                            const gbuttons: HTMLElement = document.createElement('div');

                            // Set buttons
                            gbuttons.classList.add('ec-composer-element-buttons-group');

                            // Create the move button
                            const mbutton: HTMLElement = document.createElement('button');

                            // Set type
                            mbutton.setAttribute('type', 'button');

                            // Set class
                            mbutton.classList.add('ec-composer-element-move-button');

                            // Set icon
                            mbutton.innerHTML = params.icons('drag');

                            // Add move button to the buttons list
                            gbuttons.innerHTML += mbutton.outerHTML;

                            // Create the clone button
                            const clone: HTMLElement = document.createElement('button');

                            // Set type
                            clone.setAttribute('type', 'button');

                            // Set class
                            clone.classList.add('ec-composer-element-clone-button');

                            // Set icon
                            clone.innerHTML = params.icons('backup_table');        
                            
                            // Add button to the group
                            gbuttons.innerHTML += clone.outerHTML;

                            // Create the delete element button
                            const delement: HTMLElement = document.createElement('button');

                            // Set type
                            delement.setAttribute('type', 'button');

                            // Set class
                            delement.classList.add('ec-composer-element-delete-button');

                            // Set icon
                            delement.innerHTML = params.icons('trash');        
                            
                            // Add button to the group
                            gbuttons.innerHTML += delement.outerHTML;

                            // Add group to the buttons
                            buttons += gbuttons.outerHTML;

                            /*---------------------- CREATE ELEMENT CONTENT ------------------------*/

                            // Create new div
                            const div: HTMLElement = document.createElement('div');

                            // Set element content
                            div.innerHTML = '<div class="ec-element-content" data-id="' + new_element_id + '" data-name="' + target.closest('.ec-element-content').getAttribute('data-name') + '">'
                                + element_html
                                + buttons
                            + '</div>';

                            // Add line after drop
                            target.closest('.ec-element-content').insertAdjacentElement('afterend', div.firstChild);

                        } else if ( target.closest('.ec-composer-element-delete-button') ) {

                            // Save the cell
                            const cell: HTMLElement = target.closest('.ec-composer-template-cell');

                            // Add hide class
                            target.closest('.ec-element-content').classList.add('ec-hide-content');

                            // Set pause
                            setTimeout((): void => {

                                // Get the element's ID
                                const element_id: string = target.closest('.ec-element-content').getAttribute('data-id');

                                // Remove the content
                                target.closest('.ec-element-content').remove();

                                // Get iframe
                                const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    const iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get the style tag
                                        const style: HTMLStyleElement | null = iframeDocument.head.querySelector('style[data-element="' + element_id + '"]');

                                        // Verify if the tag style exists
                                        if ( style ) {

                                            // Remove the style
                                            style.remove();

                                        }                                        

                                    }

                                }

                                // Verify if is the last element
                                if ( cell.getElementsByClassName('ec-element-content').length < 1 ) {

                                    // Create placeholder
                                    const placeholder: HTMLElement = document.createElement('a');

                                    // Set href
                                    placeholder.setAttribute('href', '#');

                                    // Set placeholder class
                                    placeholder.classList.add('ec-composer-template-cell-placeholder');

                                    // Set animation class
                                    placeholder.classList.add('ec-show-content');                                    

                                    // Create text
                                    const text: HTMLElement = document.createElement('span');

                                    // Add class
                                    text.classList.add('ec-composer-template-cell-placeholder-text');

                                    // Set text
                                    text.innerText = params.words('drag_elements_here');

                                    // Add icon in the placeholder
                                    placeholder.innerHTML = '<span>'
                                        + params.icons('place_item', {'icon_class': 'ec-composer-template-cell-placeholder-icon'})
                                        + text.outerHTML
                                    + '</span>';

                                    // Display placeholder
                                    cell.innerHTML = placeholder.outerHTML;

                                    // Set pause
                                    setTimeout((): void => {

                                        // Remove the animation class
                                        cell.getElementsByClassName('ec-composer-template-cell-placeholder')[0].classList.remove('ec-show-content');
                                        
                                    }, 300);

                                    // Check if the ec-element-content-active exists
                                    if ( target.closest('.ec-element-content-active') ) {

                                        // Get options
                                        const options: HTMLElement = params.selector.getElementsByClassName('ec-composer-element-options')[0];

                                        // Remove the ec-composer-element-options-show class
                                        options.classList.remove('ec-composer-element-options-show');

                                        // Add the ec-composer-element-options-hide class
                                        options.classList.add('ec-composer-element-options-hide');

                                        // Check if ec-ste-show exists
                                        if ( params.selector.getElementsByClassName('ec-ste-show').length > 0 ) {

                                            // Hide small text editor
                                            params.selector.getElementsByClassName('ec-ste-show')[0].classList.remove('ec-ste-show');

                                        }

                                        // Add ec-template-code-hide-button class
                                        params.selector.getElementsByClassName('ec-template-code-button')[0].classList.add('ec-template-code-hide-button');

                                        // Remove ec-composer-container-template-and-code class
                                        params.selector.getElementsByClassName('ec-composer-container')[0].classList.remove('ec-composer-container-template-and-code');
                                        
                                        // Remove style from ec-composer-code-container
                                        params.selector.getElementsByClassName('ec-composer-code-container')[0].removeAttribute('style');

                                        // Remove style from ec-composer-template-container
                                        params.selector.getElementsByClassName('ec-composer-template-container')[0].removeAttribute('style');  

                                    }

                                }

                            }, 300);

                        }

                        // Verify if the link box was already added
                        if ( params.selector.getElementsByClassName('ec-ste-link-box').length > 0 ) {

                            // Remove link box
                            params.selector.getElementsByClassName('ec-ste-link-box')[0].remove();

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer-modal .ec-row > div',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get iframe
                        const iframe: any = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                        // Save target
                        const target = e.target as HTMLElement;

                        // Check if target exists
                        if ( target instanceof HTMLElement ) {

                            // Get the format
                            const format: string | null = target.getAttribute('data-format');

                            // Verify if format
                            if ( format !== null ) {

                                // Element
                                const element: any = get_content({
                                    'format': ['1', '2', '3', '4', '5', '6'].includes(format)?parseInt(format):1
                                });

                                // Set class
                                element.classList.add('ec-show-content');

                                // Append instructures
                                iframe.contentWindow.document.getElementsByClassName('ec-composer-template-content-line-active')[0].insertAdjacentElement('afterend', element);

                                // Remove ec-composer-template-content-line-active class
                                iframe.contentWindow.document.getElementsByClassName('ec-composer-template-content-line-active')[0].classList.remove('ec-composer-template-content-line-active');

                                // Add hide shadow class
                                params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.add('ec-composer-shadow-hide');

                                // Add hide modal class
                                params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-rows-modal"]').classList.add('ec-composer-modal-hide');    

                                // Set pause
                                setTimeout((): void => {

                                    // Remove hide shadow class
                                    params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.remove('ec-composer-shadow-hide');

                                    // Remove hide modal class
                                    params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-rows-modal"]').classList.remove('ec-composer-modal-hide');  

                                    // Remove show shadow class
                                    params.selector.getElementsByClassName('ec-composer-shadow')[0].classList.remove('ec-composer-shadow-show');

                                    // Remove show modal class
                                    params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-rows-modal"]').classList.remove('ec-composer-modal-show'); 
                                    
                                    // Remove the ec-show-content class
                                    iframe.contentWindow.document.getElementsByClassName('ec-show-content')[0].classList.remove('ec-show-content');

                                }, 300);

                            }

                        }

                    },
                    capture: false
                }           
                
            ];

        }

    }

}