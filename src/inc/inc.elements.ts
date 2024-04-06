/**
 * @file Elements
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used for the template's elements
 */

// Import the Classes
import Classes from "../classes/classes.index.js";

// Import inc
import {
    show_message,
    prepare_styles
} from '../inc/inc.index.js';

// Import types
import { 
    options_type, 
    option_property_type, 
    params_type, 
    element_options_type 
} from './../resources/types/types.index.js';

// Import elements
import elements from './../resources/elements/elements.index.js';

// Import the options structures
import {
    Color,
    Number,
    Selector,
    Font,
    Align,
    Position,
    Text,
    Link,
    Images,
    Direction,
    Menu,
    Social,
    Icons,
    List,
    Checkbox,
    Ai
} from "../resources/options/options.index.js";

// All types for options
const types: {[key: string]: element_options_type} = {
    color: Color,
    number: Number,
    selector: Selector,
    font: Font,
    align: Align,
    position: Position,
    text: Text,
    link: Link,
    images: Images,
    direction: Direction,
    menu: Menu,
    social: Social,
    icons: Icons,
    list: List,
    checkbox: Checkbox,
    ai: Ai
};

/**
 * Get element by name
 * 
 * @param string name
 * @param any params
 * 
 * @returns object with element class
 */
const get_element_by_name = (name: string, params: params_type): {[key: string]: any} | undefined => {

    // Get the namespace
    const name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, 'ResourcesElements' + name.charAt(0).toUpperCase() + name.substring(1))?.value.Resources.Elements;

    // Verify if the element exists
    if ( typeof name_space !== 'undefined' ) {

        // Get key
        const key = Object.keys(name_space)[0] as string;

        // Get the element class
        return new name_space[key]();

    } else {

        // Show error message
        show_message(params.words('error_name') + ': ' + params.words('no_element_found'));

    }

}

/**
 * Generates html for the element options
 * 
 * @param object properties_list
 * @param options_type options
 * @param params_type params
 * 
 * @returns string with content
 */
const get_element_options = (options: options_type, properties_list: {[key: string]: {[key: string]: number | string}}, params: params_type, device: string): string | undefined => {

    // Get the options by device
    const options_by_device = (device === 'desktop')?options.desktop:options.mobile;

    // Check if options exists
    if ( options_by_device.length > 0 ) {

        // Sections container
        let sections: string = '';

        // List the sections
        for ( const option of options_by_device ) {
            
            // Options container
            let options_list: string = '';

            // Verify if options exists
            if ( option.list.length > 0 ) {

                // List the options
                for ( const list of option.list ) {

                    // Check if template exists
                    if ( typeof list.template === 'undefined' ) {
                        continue;
                    }

                    // Check if option has element
                    if ( list.element && (typeof properties_list[list.element] !== 'undefined') && (typeof properties_list[list.element][list.name.replaceAll('_', '-')] !== 'undefined') ) {

                        // Set custom
                        list['custom'] = properties_list[list.element][list.name.replaceAll('_', '-')];  

                    } else if ( !list.element && (typeof properties_list[device] !== 'undefined') && (typeof properties_list[device][list.name.replaceAll('_', '-')] !== 'undefined') ) {

                        // Set custom
                        list['custom'] = properties_list[device][list.name.replaceAll('_', '-')];  

                    }

                    // Get the option template
                    const template: string = list.template;

                    // Get the option
                    const the_option: string | undefined = new types[template](params).get_option(list);

                    // Check if option exists
                    if ( the_option ) {

                        // Add option to the list
                        options_list += the_option;

                    }

                }

            }

            // Showed container
            let showed_section: string = '';

            // Verify if the section is collapsed
            if ( (typeof option.collapsed !== 'undefined') && (option.collapsed === true) ) {

                // Set show class
                showed_section = ' ec-section-show';

            }

            // Add section to the container
            sections += '<div class="ec-section' + showed_section + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button" class="ec-justify-content-space-between">'
                        + '<span>'
                            + option.title
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<ul class="ec-composer-options-list">'
                        + options_list
                    + '</ul>'
                + '</div>'
            + '</div>';

        }

        return sections;

    } else {

        // Show error message
        show_message(params.words('error_name') + ': ' + params.words('no_element_options_found'));
        
    }

}

/**
 * Move element
 * 
 * @param any selector
 * @param number clientY
 * @param number clientX
 * @param string drop_icon
 */
const move_element = (selector: any, clientY: number, clientX: number, drop_icon: string): void => {

    // Get element
    const element: any = selector.getElementsByClassName('ec-element-drag-active')[0];
                                    
    // Get top
    let top: number = (clientY - parseInt(element.getAttribute('data-top')));

    // Get left
    const left: number = (clientX - parseInt(element.getAttribute('data-left')));

    // Set top position
    element.style.top = top + 'px';

    // Set left position
    element.style.left = left + 'px';

    // Get iframe
    const iframe: HTMLIFrameElement = selector.getElementsByClassName('ec-composer-template-container')[0];

    // Get the document from iframe
    const idocument: Document | null = iframe.contentDocument;

    // Check if idocument is not null
    if ( !idocument ) {
        return;
    }

    // Check if iframe_body has the ec-composer-template-preview class
    if ( idocument.body.classList.contains('ec-composer-template-preview') ) {
        return;
    }

    // Get bounding client rect
    const client_rect: DOMRect = iframe.getBoundingClientRect();

    // Verify if the mouse is over iframe
    if ( (clientX >= client_rect.x) && (clientX <= (client_rect.x + client_rect.width)) && (clientY >= client_rect.y) && (clientY <= (client_rect.y + client_rect.height)) ) {

        // Check if the drops were already added
        if ( idocument.getElementsByClassName('ec-composer-template-cell-drop').length < 1 ) {

            // Get all cells
            const cells: any = idocument.querySelectorAll('.ec-composer-template .ec-composer-template-cell');

            // Verify if cells exists
            if ( cells.length > 0 ) {

                // Total cells
                const tcells: number = cells.length;

                // List the cells
                for ( let c: number = 0; c < tcells; c++ ) {

                    // Create a div for drop locations
                    const drops: Element = document.createElement('div');

                    // Add ec-composer-template-cell-drop class
                    drops.classList.add('ec-composer-template-cell-drop');

                    // Add icon
                    drops.innerHTML = drop_icon;

                    // Insert drop
                    cells[c].insertAdjacentElement('afterBegin', drops);

                }

            }

            // Get all contents
            const contents: any = idocument.querySelectorAll('.ec-composer-template .ec-element-content');
            
            // Verify if contents exists
            if ( contents.length > 0 ) {

                // Total contents
                const tcontents: number = contents.length;

                // List the contents
                for ( let co: number = 0; co < tcontents; co++ ) {

                    // Create a div for drop locations
                    const drops: Element = document.createElement('div');

                    // Add ec-composer-template-cell-drop class
                    drops.classList.add('ec-composer-template-cell-drop');

                    // Add icon
                    drops.innerHTML = drop_icon;

                    // Insert drop
                    contents[co].insertAdjacentElement('afterEnd', drops);

                    // Increase the counter
                    co++;

                }

            }

        } else {

            // List the drops
            Array.from(idocument.getElementsByClassName('ec-composer-template-cell-drop')).map((item: any): void => {
                item.classList.remove('ec-composer-template-cell-drop-active');
            });

            // Found marker
            let found: number = 0;

            // Next marker
            let next: number = 0;

            // List the drops
            Array.from(idocument.getElementsByClassName('ec-composer-template-cell-drop')).forEach((element: any): void => {

                // Verify if found is 1
                if ( found > 0 ) return;

                // Get the cell rect
                let cell_rect: DOMRect = element.closest('.ec-composer-template-cell').getBoundingClientRect();

                // Check if next sibling exists
                if ( element.nextElementSibling ) {

                    // Check if the cell has no placeholder
                    if ( !element.nextElementSibling.classList.contains('ec-composer-template-cell-placeholder') ) {

                        // Get the cell rect
                        cell_rect = element.nextElementSibling.getBoundingClientRect();

                    }

                }
                
                // Check if mouse at the end of cell
                if ( ((((client_rect.y + cell_rect.y) + cell_rect.height) - top) > -1) && ((((client_rect.y + cell_rect.y) + cell_rect.height) - top) < 21) && (next < 1)  && (left >= (client_rect.x + cell_rect.x)) && (left <= ((client_rect.x + cell_rect.x) + cell_rect.width)) ) {

                    // Increase next
                    next++;
                    
                    return;

                } else if ( ((((client_rect.y + cell_rect.y) + cell_rect.height) - top) > -1) && ((((client_rect.y + cell_rect.y) + cell_rect.height) - top) < 21) && (next < 1) && ((left + 103.69) <= ((client_rect.x + cell_rect.x) + cell_rect.width)) ) {

                    // Increase next
                    next++;
                    
                    return;                    

                }
 
                // Verify if next exists
                if ( next > 0 ) {
                    top = top - 20;
                }

                // Check if dragged line is over a drop line
                if ( (top >= (client_rect.y + cell_rect.y)) && (top <= ((client_rect.y + cell_rect.y) + cell_rect.height)) && (left >= (client_rect.x + cell_rect.x)) && (left <= ((client_rect.x + cell_rect.x) + cell_rect.width)) ) {

                    // Set drop active
                    element.classList.add('ec-composer-template-cell-drop-active');
                    
                    // Increase found
                    found++;

                    // Reset next
                    if ( next > 0 ) next--;

                } else if ( (top >= (client_rect.y + cell_rect.y)) && (top <= ((client_rect.y + cell_rect.y) + cell_rect.height)) && ((left + 103.69) >= (client_rect.x + cell_rect.x)) && ((left + 103.69) <= ((client_rect.x + cell_rect.x) + cell_rect.width)) ) {

                    // Set drop active
                    element.classList.add('ec-composer-template-cell-drop-active');
                    
                    // Increase found
                    found++;

                    // Reset next
                    if ( next > 0 ) next--;

                } else if ((top <= (client_rect.y + cell_rect.y)) && ((left + 103.69) >= (client_rect.x + cell_rect.x)) && ((left + 103.69) <= ((client_rect.x + cell_rect.x) + cell_rect.width))) {

                    // Set drop active
                    element.classList.add('ec-composer-template-cell-drop-active');
                    
                    // Increase found
                    found++;

                    // Reset next
                    if ( next > 0 ) next--;

                } else if ( !element.nextElementSibling ) {

                    // Check if idocument is not null
                    if ( idocument !== null ) {

                        // Get line
                        const line: any = element.closest('.ec-composer-template-content-line');

                        // Get all lines
                        const lines: any = idocument.getElementsByClassName('ec-composer-template-content-line');

                        // Check if is the last line
                        if ( (lines.length - 1) === Array.from(lines).indexOf.call(lines, line) ) {

                            // Check if the mouse is below the template
                            if ( ((top + 77) >= (client_rect.y + cell_rect.y)) && ((left + 103.69) >= (client_rect.x + cell_rect.x)) && ((left + 103.69) <= ((client_rect.x + cell_rect.x) + cell_rect.width)) ) {

                                // Set drop active
                                element.classList.add('ec-composer-template-cell-drop-active');
                                
                                // Increase found
                                found++;

                                // Reset next
                                if ( next > 0 ) next--;

                            }

                        }

                    }

                }

            });

        }

    }

}

/**
 * Resets the elements
 * 
 * @param any params_type
 */
const reset_elements = (params: params_type): void => {

    // Check if ec-element-drag-active exists
    if ( params.selector.getElementsByClassName('ec-element-drag-active').length > 0 ) {
                
        // Remove the element
        params.selector.getElementsByClassName('ec-element-drag-active')[0].remove();

        // Get iframe
        const iframe: HTMLIFrameElement | null = params.selector.querySelector('.ec-composer-template-container');

        // Add ec-element-temp class
        params.selector.getElementsByClassName('ec-element-temp')[0].classList.add('ec-element-temp-show');

        // Save the show temp element
        const temp_show: Element = params.selector.getElementsByClassName('ec-element-temp-show')[0];

        // Save drop active
        const drop_active: HTMLCollectionOf<Element> =  iframe!.contentWindow!.document.getElementsByClassName('ec-composer-template-cell-drop-active');

        // check if active drops exists
        if ( drop_active.length > 0 ) {

            // Get element's class by name
            const element = get_element_by_name(temp_show.getAttribute('data-name')!, params);

            // Check if element exists
            if ( typeof element !== 'undefined' ) {

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

                // Return content
                const element_content: string = element.get_content(params);

                // Create a id for the element
                const element_id: string = 'ec-element-' + Date.now();

                // Create new div
                const div: Element = document.createElement('div');

                // Set element content
                div.innerHTML = '<div class="ec-element-content" data-id="' + element_id + '" data-name="' + temp_show.getAttribute('data-name') + '">'
                    + element_content
                    + buttons
                + '</div>';

                // Add line after drop
                drop_active[0].insertAdjacentElement('afterend', div.firstElementChild!);

                /*---------------------- CREATE ELEMENT STYLES ------------------------*/ 

                // Get the element's options
                const element_options: options_type = element.get_options(params);

                // Get the element's styles
                const element_styles: string = element.get_styles(element_id);

                // Verify if the element has options
                if ( element_options.desktop.length > 0 ) {

                    // Properties container
                    const properties: Array<{[key: string]: string | number}> = [];

                    // List the sections
                    for ( const element_option of element_options.desktop ) {

                        // Verify if options exists
                        if ( element_option.list.length > 0 ) {

                            // List the options
                            for ( const list of element_option.list ) {

                                // Get the option template
                                const template: string = list.template;

                                // Get the css property
                                const css_property: option_property_type = new types[template](params).get_property(list);

                                // Check if css property exists
                                if ( typeof css_property !== 'undefined' ) {

                                    // Add property to the properties
                                    properties.push(css_property);

                                }

                            }

                        }

                    }

                    // Check if properties exists
                    if ( properties.length > 0 ) {

                        // Get the styles
                        const styles: string | undefined = prepare_styles(element_id, properties, element_styles);

                        // Verify if styles exists
                        if ( typeof styles !== 'undefined' ) {

                            // Get iframe
                            const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Verify if iframe exists
                            if ( iframe ) {

                                // Get content document
                                const iframeDocument: Document | null = iframe.contentDocument;

                                // Check if iframeDocument is not null
                                if ( iframeDocument !== null ) {

                                    // Append styles
                                    iframeDocument.head.innerHTML += styles;  
                                    
                                    // Set a pause
                                    setTimeout((): void => {

                                        // Get the style tag
                                        const style: HTMLStyleElement | null = iframeDocument!.head.querySelector('style[data-element="' + element_id + '"]');

                                        // Check if style exists
                                        if ( style !== null ) {

                                            // Init the backup class
                                            const backup = new Classes.Backup();

                                            // Save backup
                                            backup.update_css_element_id(element_id!, params, style.innerHTML, false);

                                        }

                                    }, 1000);

                                }

                            }

                        }

                    }

                }

            }

            // Check if the cell has placeholder
            if ( drop_active[0].closest('.ec-composer-template-cell')!.getElementsByClassName('ec-composer-template-cell-placeholder').length > 0 ) {

                // Remove the placeholder
                drop_active[0].closest('.ec-composer-template-cell')!.getElementsByClassName('ec-composer-template-cell-placeholder')[0].remove();

            }

        }

        // Verify if ec-composer-template-cell-drop exists
        if ( iframe!.contentWindow!.document.getElementsByClassName('ec-composer-template-cell-drop').length > 0 ) {
            
            // List the drops
            Array.from(iframe!.contentWindow!.document.getElementsByClassName('ec-composer-template-cell-drop')).map((item: Element): void => {
                item.remove();
            });

        }

    }

}

/**
 * Unselect an element
 * 
 * @param params_type params
 */
const unselect_element = (params: params_type): void => {

    // Get iframe
    const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

    // Get the document from iframe
    const idocument: Document | null = iframe.contentDocument;

    // Remove the mobile class from iframe
    iframe.closest('.ec-composer-container')!.classList.remove('ec-composer-template-mobile');

    // Uncheck the mobile view
    (params.selector.querySelectorAll('.ec-composer-element-options-tabs > input[type="radio"]')[0] as HTMLInputElement).checked = true;

    // Hide the mobile options if are showed
    params.selector.getElementsByClassName('ec-composer-element-options-area-body')[0].classList.remove('ec-composer-element-mobile-options');

    // Check if ec-element-content-active exists
    if ( idocument!.getElementsByClassName('ec-element-content-active').length > 0 ) {

        // Get active class
        const active: Element = idocument!.getElementsByClassName('ec-element-content-active')[0];

        // Remove ec-element-content-active class
        active.classList.remove('ec-element-content-active');

        // Get options
        const options: Element = params.selector.getElementsByClassName('ec-composer-element-options')[0];

        // Remove the element's id from the options settings
        options.removeAttribute('data-element');

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

        // Set a pause
        setTimeout(() => {

            // Remove the ec-composer-element-options-hide class
            options.classList.remove('ec-composer-element-options-hide');

        }, 300);

    }

}

// Export functions
export {
    get_element_by_name,
    get_element_options,
    move_element,
    reset_elements,
    unselect_element
};