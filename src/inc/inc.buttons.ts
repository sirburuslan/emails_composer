/**
 * @file Buttons
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file contains some functions to create the buttons for contents and elements
 */

// Import inc
import {
    get_icon,
    get_word
} from '../inc/inc.index.js';

/**
 * Get the structure buttons
 * 
 * @return string response
 */
export const get_structure_buttons = (): string => {

    // Buttons container
    let buttons: string = '';

    // Create the move button
    let mbutton: any = document.createElement('button');

    // Set type
    mbutton.setAttribute('type', 'button');

    // Set class
    mbutton.classList.add('ec-composer-template-content-move-button');

    // Set icon
    mbutton.innerHTML = get_icon('drag');

    // Add move button to the buttons list
    buttons += mbutton.outerHTML;

    // Create a group with buttons
    let gbuttons: any = document.createElement('div');

    // Set buttons
    gbuttons.classList.add('ec-composer-template-content-buttons-group');

    // Create the new content button
    let ncontent: any = document.createElement('button');

    // Set type
    ncontent.setAttribute('type', 'button');

    // Set class
    ncontent.classList.add('ec-composer-template-content-new-button');

    // Set icon
    ncontent.innerHTML = get_icon('add_circle');        
    
    // Add button to the group
    gbuttons.innerHTML = ncontent.outerHTML;

    // Create the save content button
    let scontent: any = document.createElement('button');

    // Set type
    scontent.setAttribute('type', 'button');

    // Set class
    scontent.classList.add('ec-composer-template-content-save-button');

    // Set icon
    scontent.innerHTML = get_icon('save');        
    
    // Add button to the group
    gbuttons.innerHTML += scontent.outerHTML;

    // Create the delete content button
    let dcontent: any = document.createElement('button');

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

    return buttons;

}

/**
 * Get the element buttons
 * 
 * @return string response
 */
export const get_element_buttons = (): string => {

    // Buttons container
    let buttons: string = '';

    // Create a group with buttons
    let gbuttons: HTMLElement = document.createElement('div');

    // Set buttons
    gbuttons.classList.add('ec-composer-element-buttons-group');

    // Create the move button
    let mbutton: HTMLElement = document.createElement('button');

    // Set type
    mbutton.setAttribute('type', 'button');

    // Set class
    mbutton.classList.add('ec-composer-element-move-button');

    // Set icon
    mbutton.innerHTML = get_icon('drag');

    // Add move button to the buttons list
    gbuttons.innerHTML += mbutton.outerHTML;

    // Create the clone button
    let clone: HTMLElement = document.createElement('button');

    // Set type
    clone.setAttribute('type', 'button');

    // Set class
    clone.classList.add('ec-composer-element-clone-button');

    // Set icon
    clone.innerHTML = get_icon('backup_table');        
    
    // Add button to the group
    gbuttons.innerHTML += clone.outerHTML;

    // Create the delete element button
    let delement: HTMLElement = document.createElement('button');

    // Set type
    delement.setAttribute('type', 'button');

    // Set class
    delement.classList.add('ec-composer-element-delete-button');

    // Set icon
    delement.innerHTML = get_icon('trash');        
    
    // Add button to the group
    gbuttons.innerHTML += delement.outerHTML;

    // Add group to the buttons
    buttons += gbuttons.outerHTML;

    return buttons;

}

/**
 * Get the placeholder
 * 
 * @return string response
 */
export const get_placeholder = (): string => {

    // Create placeholder
    let placeholder: any = document.createElement('a');

    // Set href
    placeholder.setAttribute('href', '#');

    // Set class
    placeholder.classList.add('ec-composer-template-cell-placeholder');

    // Create text
    let text: any = document.createElement('span');

    // Add class
    text.classList.add('ec-composer-template-cell-placeholder-text');

    // Set text
    text.innerText = get_word('drag_elements_here');

    // Add icon in the placeholder
    placeholder.innerHTML = '<span>'
        + get_icon('place_item', {'icon_class': 'ec-composer-template-cell-placeholder-icon'})
        + text.outerHTML
    + '</span>';

    // Return placeholder
    return placeholder.outerHTML;

}