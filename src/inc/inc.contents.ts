/**
 * @file Contents
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used for the template contents
 */

// Import inc
import {
    get_word,
    get_icon
} from '../inc/inc.index.js';

// Import types
import { params_type } from '../resources/types/types.index.js';

/**
 * Create content
 * 
 * @param number format
 * 
 * @return HTMLTableElement response
 */
const create_content = (format: number = 1): HTMLTableElement => {

    // Create table
    const table: HTMLTableElement = document.createElement('table');

    // Set table's class
    table.classList.add('ec-composer-template-row');

    // Create a row
    const row: HTMLTableRowElement = table.insertRow(0);

    // Create cell
    const cell: HTMLDivElement = document.createElement('div');

    // Add class
    cell.classList.add('ec-composer-template-cell');

    // Create placeholder
    const placeholder: Element = document.createElement('a');

    // Set href
    placeholder.setAttribute('href', '#');

    // Set class
    placeholder.classList.add('ec-composer-template-cell-placeholder');

    // Create text
    const text: HTMLSpanElement = document.createElement('span');

    // Add class
    text.classList.add('ec-composer-template-cell-placeholder-text');

    // Set text
    text.innerText = get_word('drag_elements_here');

    // Add icon in the placeholder
    placeholder.innerHTML = '<span>'
        + get_icon('place_item', {'icon_class': 'ec-composer-template-cell-placeholder-icon'})
        + text.outerHTML
    + '</span>';

    // Set placeholder
    cell.innerHTML = placeholder.outerHTML;

    // Prepare the table
    if ( format === 1 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

    } else if ( format === 2 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(1).innerHTML = cell.outerHTML;

    } else if ( format === 3 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(1).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(2).innerHTML = cell.outerHTML;        


    } else if ( format === 4 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(1).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(2).innerHTML = cell.outerHTML; 
        
        // Insert ceil
        row.insertCell(3).innerHTML = cell.outerHTML;         

    } else if ( format === 5 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(1).innerHTML = cell.outerHTML;

        // Set width
        row.cells[1].style.width = '75%';

    } else if ( format === 6 ) {

        // Insert ceil
        row.insertCell(0).innerHTML = cell.outerHTML;

        // Insert ceil
        row.insertCell(1).innerHTML = cell.outerHTML;

        // Set width
        row.cells[0].style.width = '75%';

    } else if ( format === 7 ) {

        // Insert ceil
        row.classList.add('ec-composer-template-module-placeholder');

    }

    return table;

}

/**
 * Get content for template
 * 
 * @param object params
 * 
 * @return HTMLDivElement response
 */
const get_content = (params: {format: number}): HTMLDivElement => {

    /*---------------------- CREATE CONTENT ------------------------*/

    // Prepare the format
    const format: number = (typeof params.format === 'number')?params.format:1;

    // Create content
    const content: HTMLTableElement = create_content(format);

    /*---------------------- CREATE BUTTONS ------------------------*/ 
    
    // Buttons container
    let buttons: string = '';

    // Create the move button
    const mbutton: Element = document.createElement('button');

    // Set type
    mbutton.setAttribute('type', 'button');

    // Set class
    mbutton.classList.add('ec-composer-template-content-move-button');

    // Set icon
    mbutton.innerHTML = get_icon('drag');

    // Add move button to the buttons list
    buttons += mbutton.outerHTML;

    // Create a group with buttons
    const gbuttons: Element = document.createElement('div');

    // Set buttons
    gbuttons.classList.add('ec-composer-template-content-buttons-group');

    // Create the new content button
    const ncontent: HTMLButtonElement = document.createElement('button');

    // Set type
    ncontent.setAttribute('type', 'button');

    // Set class
    ncontent.classList.add('ec-composer-template-content-new-button');

    // Set icon
    ncontent.innerHTML = get_icon('add_circle');        
    
    // Add button to the group
    gbuttons.innerHTML = ncontent.outerHTML;

    // Create the save content button
    const scontent: HTMLButtonElement = document.createElement('button');

    // Set type
    scontent.setAttribute('type', 'button');

    // Set class
    scontent.classList.add('ec-composer-template-content-save-button');

    // Set icon
    scontent.innerHTML = get_icon('save');        
    
    // Add button to the group
    gbuttons.innerHTML += scontent.outerHTML;

    // Create the delete content button
    const dcontent: HTMLButtonElement = document.createElement('button');

    // Set type
    dcontent.setAttribute('type', 'button');

    // Set class
    dcontent.classList.add('ec-composer-template-content-delete-button');

    // Set icon
    dcontent.innerHTML = get_icon('trash');        
    
    // Add button to the group
    gbuttons.innerHTML += dcontent.outerHTML;

    // Add group to the buttons
    buttons += gbuttons.outerHTML;

    /*---------------------- CREATE LINES ------------------------*/        

    // Create border for content
    const cline = document.createElement('div');

    // Add class
    cline.classList.add('ec-composer-template-content-line');

    /*---------------------- CREATE TABLE ------------------------*/

    // Create the table element
    const table: HTMLTableElement = document.createElement('table');

    // Set table's class
    table.classList.add('ec-composer-template-content');

    // Create the table body
    const tbody: HTMLTableSectionElement = table.createTBody();
    
    // Create row
    tbody.insertRow(0).insertCell(0).innerHTML = content.outerHTML;

    // Add content in the line
    cline.innerHTML = buttons + table.outerHTML;

    // Set content line
    return cline;

}

/**
 * Resets the contents
 * 
 * @param params_type params
 */
const reset_contents = (params: params_type): void => {

    // Get iframe
    const iframe: HTMLCollectionOf<Element> = document.getElementsByClassName('ec-composer-template-container-active');

    // Verify if a drag active content exists
    if ( iframe.length > 0 ) {

        // Iframe document
        const iframe_document: Document = (iframe[0] as HTMLIFrameElement).contentWindow!.document;

        // Verify if the class ec-composer-template-content-line-drag-active exists
        if ( iframe_document.getElementsByClassName('ec-composer-template-content-line-drag-active').length > 0 ) {

            // Verify if the class ec-composer-template-content-line-drop-active exists
            if ( iframe_document.getElementsByClassName('ec-composer-template-content-line-drop-active').length > 0 ) {

                // Add ec-composer-template-content-line-temp class
                iframe_document.getElementsByClassName('ec-composer-template-content-line-temp')[0].classList.add('ec-composer-template-content-line-temp-show');

                // Save the show temp element
                const temp_show: Element = iframe_document.getElementsByClassName('ec-composer-template-content-line-temp-show')[0];

                // Set pause
                setTimeout((): void => {

                    // Remove the class ec-composer-template-content-line-temp-show class
                    temp_show.classList.remove('ec-composer-template-content-line-temp-show');

                }, 300);

                // Add line after drop
                iframe_document.getElementsByClassName('ec-composer-template-content-line-drop-active')[0].insertAdjacentElement('afterend', iframe_document.getElementsByClassName('ec-composer-template-content-line-temp')[0]);

            }
            
            // Remove the class ec-composer-template-content-line-temp
            iframe_document.getElementsByClassName('ec-composer-template-content-line-temp')[0].classList.remove('ec-composer-template-content-line-temp');

            // Verify if ec-composer-template-content-line-drop exists
            if ( iframe_document.getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {
                
                // List the drops
                Array.from(iframe_document.getElementsByClassName('ec-composer-template-content-line-drop')).map((item: Element): void => {
                    item.remove();
                });

            }

            // Remove drag active
            iframe_document.getElementsByClassName('ec-composer-template-content-line-drag-active')[0].remove();

        } else if ( iframe_document.getElementsByClassName('ec-composer-element-drag-active').length > 0 ) {

            // Get temp
            const temp: Element = iframe_document.getElementsByClassName('ec-element-content-temp')[0];

            // Save cell
            const cell: Element | null = temp.closest('.ec-composer-template-cell');

            // Save drop active
            const drop_active: HTMLCollectionOf<Element> = iframe_document.getElementsByClassName('ec-composer-template-cell-drop-active');

            // Verify if drop is active
            if ( drop_active.length > 0 ) {

                // Verify if there is a placeholder
                if ( drop_active[0].closest('.ec-composer-template-cell')!.getElementsByClassName('ec-composer-template-cell-placeholder').length > 0 ) {

                    // Remove the placeholder
                    drop_active[0].closest('.ec-composer-template-cell')!.getElementsByClassName('ec-composer-template-cell-placeholder')[0].remove();

                }

                // Add line after drop
                drop_active[0].insertAdjacentElement('afterend', temp);

            }

            // Remove the temp class
            temp.classList.remove('ec-element-content-temp');

            // List the drops
            Array.from(iframe_document.getElementsByClassName('ec-composer-template-cell-drop')).map((drop: Element): void => {
                drop.remove();
            });

            // Remove the drag
            iframe_document.getElementsByClassName('ec-composer-element-drag-active')[0].remove();

            // Verify if is the last element
            if ( cell && cell.getElementsByClassName('ec-element-content').length < 1 ) {

                // Create placeholder
                const placeholder: HTMLAnchorElement = document.createElement('a');

                // Set href
                placeholder.setAttribute('href', '#');

                // Set placeholder class
                placeholder.classList.add('ec-composer-template-cell-placeholder');

                // Set animation class
                placeholder.classList.add('ec-show-content');                                    

                // Create text
                const text: HTMLSpanElement = document.createElement('span');

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
                    cell!.getElementsByClassName('ec-composer-template-cell-placeholder')[0].classList.remove('ec-show-content');
                    
                }, 300);

            }

        }

        // Remove the ec-composer-template-container-active class
        iframe[0].classList.remove('ec-composer-template-container-active');

    }

}

// Export functions
export {create_content, get_content, reset_contents};