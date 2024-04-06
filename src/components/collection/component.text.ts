/**
 * @class Text
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the text element
 */

// Import components interface
import { InterfaceComponents } from '../../classes/classes.index.js';

// Import types
import {
    params_type, 
    events_type 
} from '../../resources/types/types.index.js';

// Import plugins
import Plugins from '../../plugins/plugins.index.js';

// Import the Small Editor Core Plugin class
import PluginsSmallEditorCore from '../../plugins/collection/small_editor/core/plugin.small_editor_index.js';

// Components
export namespace Components {

    // Text
    export class Text implements InterfaceComponents.Interfaces.Components {

        get_events(params: params_type): events_type {

            return [
                {
                    action: 'keydown',
                    iframe: '.ec-composer-template-container',
                    target: (e: KeyboardEvent): void => {

                        // Save target
                        const target = e.target as HTMLElement;

                        // Check if was pressed the Enter key
                        if (e.key === 'Enter') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Get all children
                                const childrens: HTMLCollection | undefined = target.closest('.ec-element-content-data')?.children;

                                // Check if childrens exists
                                if ( childrens ) {

                                    // List the childrens
                                    for ( const children of childrens ) {

                                        // Verify if nodename is DIV
                                        if ( children.nodeName === 'DIV' ) {

                                            // Create a paragraph
                                            const paragraph: HTMLParagraphElement = document.createElement('p');

                                            // Set html
                                            paragraph.innerHTML = children.innerHTML;

                                            // Replace child
                                            children.replaceWith(paragraph);

                                        }

                                    }

                                }

                            }

                        } else if (e.key === 'Backspace') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Verify if childnodes exists
                                if ( target.closest('.ec-element-content-data')!.childNodes.length < 1 ) {
                                    e.preventDefault();
                                }                                
                                
                                // Get paragraphs
                                const paragraphs: HTMLCollectionOf<HTMLParagraphElement> = target.closest('.ec-element-content-data')!.getElementsByTagName('p');

                                // Check if there is no paragraphs
                                if ( paragraphs.length < 1 ) {

                                    // Create a paragraph
                                    const paragraph: HTMLParagraphElement = document.createElement('p');

                                    // Set html
                                    paragraph.innerHTML = (target.closest('.ec-element-content-data')!.innerHTML.length < 1)?'<br>':target.closest('.ec-element-content-data')!.innerHTML;

                                    // Replace child
                                    target.closest('.ec-element-content-data')!.appendChild(paragraph);

                                }

                            }

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data[contenteditable="true"]') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Enable/disable editor's buttons by caret position
                                new Plugins.Small_editor().get_styles(e, params);

                            }                            

                        } else if (e.key === 'ArrowUp') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data[contenteditable="true"]') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Enable/disable editor's buttons by caret position
                                new Plugins.Small_editor().get_styles(e, params);

                            }

                        } else if (e.key === 'ArrowRight') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data[contenteditable="true"]') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Enable/disable editor's buttons by caret position
                                new Plugins.Small_editor().get_styles(e, params);

                            }

                        } else if (e.key === 'ArrowDown') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data[contenteditable="true"]') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Enable/disable editor's buttons by caret position
                                new Plugins.Small_editor().get_styles(e, params);

                            }

                        } else if (e.key === 'ArrowLeft') {

                            // Check if ec-element-content-data class exists
                            if ( target.closest('.ec-element-content-data[contenteditable="true"]') && (target.closest('.ec-element-content')!.getAttribute('data-name') === 'text') ) {

                                // Enable/disable editor's buttons by caret position
                                new Plugins.Small_editor().get_styles(e, params);

                            }

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'beforeinput',
                    iframe: '.ec-composer-template-container',
                    target: (e: KeyboardEvent): void => {

                        // Verify if is insert text event
                        if ( ((e as unknown as InputEvent).inputType === 'insertText') || ((e as unknown as InputEvent).inputType === 'insertFromPaste') ) {

                            // Check if before input is inside the text
                            if ( (e.target as HTMLElement).closest('.ec-element-content')!.getAttribute('data-name') === 'text' ) {                            

                                // Verify if paragraph or li exists
                                if ( !(e.target as HTMLElement)!.closest('p') && !(e.target as HTMLElement)!.closest('li') ) {

                                    // Get iframe
                                    const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                    // Get content window
                                    const cwindow: Window | null = iframe.contentWindow;

                                    // Check if cwindow exists
                                    if ( cwindow ) {

                                        // Get selection
                                        const selection: Selection | null = cwindow.getSelection();

                                        // Remove selections in the iframe
                                        if ( selection && (selection.rangeCount > 0) ) {

                                            // Get range
                                            const range: Range = selection.getRangeAt(0);

                                            // Check if range is not inside the paragraph
                                            if ( (range.startContainer.parentElement?.nodeName !== 'P') && (range.startContainer.nodeName !== 'P') && !range.startContainer.parentElement?.closest('p') && (range.startContainer.parentElement?.nodeName !== 'LI') && (range.startContainer.nodeName !== 'LI') && !range.startContainer.parentElement?.closest('li') ) {
                                                
                                                // Create a paragraph
                                                const p: HTMLParagraphElement = document.createElement('p');

                                                // Create br
                                                const br: HTMLBRElement = document.createElement('br');

                                                // Insert br in the paragraph
                                                p.appendChild(br);

                                                // Delete the contents
                                                range.deleteContents();

                                                // Add paragraph in the node
                                                range.insertNode(p);

                                                // Create a new range
                                                const new_range: Range = document.createRange();

                                                // Set the range start to the beginning of the paragraph
                                                new_range.setStart(p, 0);

                                                // Collapse the range
                                                new_range.collapse(true);

                                                // Remove the old selection
                                                selection.removeAllRanges();

                                                // Set the new range
                                                selection.addRange(new_range);

                                            }

                                        }

                                    }

                                }

                                // Auto format the text in real time
                                new Plugins.Small_editor().format(e, params);

                            }

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'input',
                    target: (e: KeyboardEvent): void => {
                        
                        // Save target
                        const target = e.target as HTMLElement;

                        // Check for target
                        if ( target !== null ) {
                            
                            // Check if is the color input class
                            if ( target.closest('.ec-color-input') ) {

                                // Get hex color
                                const hex: string = (target as HTMLInputElement).value;

                                // Verify if hex is value
                                if ( new Plugins.Color().is_hex_valid(hex) ) {

                                    // Change the button color
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                }

                            }

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'mousedown',
                    target: (e: MouseEvent): void => {

                        // Save target
                        const target = e.target as HTMLElement;

                        // Check for target
                        if ( target !== null ) {

                            // Verify if mouse is over ec-color-opacity-filter
                            if ( target.closest('.ec-color-opacity-filter') ) {

                                // Check if the mouse is pressed
                                if ( e.buttons === 1 ) {

                                    // Add active class
                                    target.closest('.ec-color-opacity-filter')!.classList.add('ec-color-opacity-filter-active');

                                }

                            } else if ( target.closest('.ec-color-gradient-filter') ) {
                                e.preventDefault();

                                // Initialize the Color class
                                const color = new Plugins.Color();

                                // Get the filter color
                                color.get_filter_color(e, params, (hex: string): void => {

                                    // Change the button color
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                    // Change text color
                                    new PluginsSmallEditorCore.Color().change_text_color(e, params, hex);

                                });

                            } else if ( target.closest('.ec-color-gradient-selector') ) {
                                e.preventDefault();

                                // Initialize the Color class
                                const color = new Plugins.Color();

                                // Get the gradient color
                                color.get_gradient_color(e, params, (hex: string): void => {

                                    // Change the button color
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                    // Change text color
                                    new PluginsSmallEditorCore.Color().change_text_color(e, params, hex);

                                });                            

                            }

                        }

                    },
                    capture: false
                    
                }, {
                    action: 'mousedown',
                    iframe: '.ec-composer-template-container',
                    target: (e: MouseEvent): void => {

                        // Check if the class ec-ste-dropdown-show exists
                        if ( params.selector.getElementsByClassName('ec-ste-dropdown-show').length > 0 ) {
                            e.preventDefault();

                            // Remove the ec-ste-dropdown-show class
                            params.selector.getElementsByClassName('ec-ste-dropdown-show')[0].classList.remove('ec-ste-dropdown-show');

                        }

                        // Check if the class ec-option-selector-dropdown-show exists
                        if ( params.selector.getElementsByClassName('ec-option-selector-dropdown-show').length > 0 ) {
                            e.preventDefault();

                            // Remove the ec-option-selector-dropdown-show class
                            params.selector.getElementsByClassName('ec-option-selector-dropdown-show')[0].classList.remove('ec-option-selector-dropdown-show');

                        }                        

                        // Initialize the Color class
                        const color = new Plugins.Color();

                        // Remove dropdown
                        color.remove_dropdown(e, params);

                    },
                    capture: false
                    
                }, {
                    action: 'mousemove',
                    target: (e: MouseEvent): void => {

                        // Check if the mouse is pressed
                        if ( e.buttons === 1 ) {

                            // Save target
                            const target = e.target as HTMLElement;

                            // Check for target
                            if ( target !== null ) {

                                // Check if ec-color-opacity-filter-active exists
                                if ( params.selector.getElementsByClassName('ec-color-opacity-filter-active').length > 0 ) {
                                    e.preventDefault();

                                    // Initialize the Color class
                                    const color = new Plugins.Color();

                                    // Change the opacity
                                    color.create_opacity(e, params, (hex: string): void => {

                                        // Change the button color
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                        // Change text color
                                        new PluginsSmallEditorCore.Color().change_text_color(e, params, hex);

                                    });

                                } else if ( target.closest('.ec-color-gradient-filter') ) {
                                    e.preventDefault();

                                    // Initialize the Color class
                                    const color = new Plugins.Color();

                                    // Get the filter color
                                    color.get_filter_color(e, params, (hex: string): void => {

                                        // Change the button color
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                        // Change text color
                                        new PluginsSmallEditorCore.Color().change_text_color(e, params, hex);

                                    });
        
                                } else if ( target.closest('.ec-color-gradient-selector') ) {
                                    e.preventDefault();

                                    // Initialize the Color class
                                    const color = new Plugins.Color();
        
                                    // Get the gradient color
                                    color.get_gradient_color(e, params, (hex: string): void => {

                                        // Change the button color
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                        params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                        // Change text color
                                        new PluginsSmallEditorCore.Color().change_text_color(e, params, hex);

                                    });                            
        
                                }

                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'click',
                    target: (e: any): void => {

                        // Save target
                        const target: Element = e.target;

                        // Check if the class ec-ste-dropdown-show exists
                        if ( params.selector.getElementsByClassName('ec-ste-dropdown-show').length > 0 ) {
                            e.preventDefault();

                            // Remove the ec-ste-dropdown-show class
                            params.selector.getElementsByClassName('ec-ste-dropdown-show')[0].classList.remove('ec-ste-dropdown-show');

                        }     
                        
                        // Check if the class ec-option-selector-dropdown-show exists
                        if ( params.selector.getElementsByClassName('ec-option-selector-dropdown-show').length > 0 ) {
                            e.preventDefault();

                            // Remove the ec-option-selector-dropdown-show class
                            params.selector.getElementsByClassName('ec-option-selector-dropdown-show')[0].classList.remove('ec-option-selector-dropdown-show');

                        }    

                        // Check if .ec-ste-text-weights class exists
                        if ( target.closest('.ec-ste-text-weights') ) {
                            e.preventDefault();

                            // Change font weight
                            new PluginsSmallEditorCore.Font().change_font_weight(e, params);

                        }

                        // Check if ec-color-box class exists
                        if ( params.selector.getElementsByClassName('ec-color-box').length > 0 ) {
                            e.preventDefault();

                            // Initialize the Color class
                            const color = new Plugins.Color();

                            // Remove dropdown
                            color.remove_dropdown(e, params);

                            // Verify if mouse is over ec-color-opacity-filter
                            if ( target.closest('.ec-color-opacity-filter') ) {

                                // Check if the mouse is pressed
                                if ( e.buttons === 1 ) {

                                    // Add active class
                                    target.closest('.ec-color-opacity-filter')!.classList.add('ec-color-opacity-filter-active');

                                }

                            } else if ( target.closest('.ec-color-gradient-filter') ) {

                                // Get the filter color
                                color.get_filter_color(e, params, (hex: string): void => {

                                    // Change the button color
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                });

                            } else if ( target.closest('.ec-color-gradient-selector') ) {

                                // Get the gradient color
                                color.get_gradient_color(e, params, (hex: string): void => {

                                    // Change the button color
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                                    params.selector.getElementsByClassName('ec-button-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', hex);

                                });                            

                            }

                        }

                        // Check if the click is inside the ec-ste-link-box
                        if ( target.closest('.ec-ste-link-box') ) {

                            // Check if the link should be updated
                            if ( target.closest('.ec-ste-link-update-button') ) {
                                
                                // Update href in a link
                                new PluginsSmallEditorCore.Link().update(e, params);

                            } else if ( target.closest('.ec-ste-link-remove-button') ) {
                                
                                // Remove a link
                                new PluginsSmallEditorCore.Link().remove(e, params);

                            }

                        } else {

                            // Verify if the link box was already added
                            if ( params.selector.getElementsByClassName('ec-ste-link-box').length > 0 ) {

                                // Remove link box
                                params.selector.getElementsByClassName('ec-ste-link-box')[0].remove();

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-align-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
                        
                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Get range
                                const range: Range = selection.getRangeAt(0);

                                // Get range parent element
                                const parent_element: HTMLElement | null = range.commonAncestorContainer.parentElement;

                                // Check if parent_element exists
                                if ( parent_element?.closest('.ec-element-content-data') ) {

                                    // Save target
                                    const target = e.target as Element;

                                    // Check if target exists
                                    if ( target ) {

                                        // Check if target has the ec-ste-active-button class
                                        if ( target.classList.contains('ec-ste-active-button') ) {

                                            // Remove the active class
                                            target.closest('.ec-ste-group-buttons')!.getElementsByClassName('ec-ste-active-button')[0]?.classList.remove('ec-ste-active-button');
                                            
                                            // Remove the text align option
                                            parent_element.style.removeProperty('text-align');

                                        } else {

                                            // Remove the active class
                                            target.closest('.ec-ste-group-buttons')!.getElementsByClassName('ec-ste-active-button')[0]?.classList.remove('ec-ste-active-button');

                                            // Add the ec-ste-active-button class
                                            target.classList.add('ec-ste-active-button');

                                            // Get the direction
                                            const direction: string | null = target.getAttribute('data-direction');

                                            // Check if direction is not null
                                            if ( direction ) {

                                                // Get the paragraph or li parent
                                                const parent = parent_element.closest('p')?parent_element.closest('p') as HTMLParagraphElement:parent_element.closest('li') as HTMLLIElement;

                                                // Align text to left
                                                new Plugins.Small_editor().text_align(parent, direction);

                                                // Make active the content editable editor
                                                (parent.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-format-italic-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get target
                        const target = e.target as HTMLElement;

                        // Verify if button is active
                        if ( target.classList.contains('ec-ste-active-button') ) {

                            // Remove the .ec-ste-active-button class
                            target.classList.remove('ec-ste-active-button');

                        } else {

                            // Add the .ec-ste-active-button class
                            target.classList.add('ec-ste-active-button');

                        }
                        
                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Init small editor
                                const small_editor = new Plugins.Small_editor();

                                // Get range
                                const range: Range = selection.getRangeAt(0);

                                // Apply the tags
                                small_editor.apply_tags(params, range, 'i');

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-format-underlined-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Get target
                        const target = e.target as HTMLElement;

                        // Verify if button is active
                        if ( target.classList.contains('ec-ste-active-button') ) {

                            // Remove the .ec-ste-active-button class
                            target.classList.remove('ec-ste-active-button');

                        } else {

                            // Add the .ec-ste-active-button class
                            target.classList.add('ec-ste-active-button');

                        }
                        
                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Init small editor
                                const small_editor = new Plugins.Small_editor();

                                // Get range
                                const range: Range = selection.getRangeAt(0);

                                // Apply the tags
                                small_editor.apply_tags(params, range, 'u');

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-format-strikethrough-button',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Get target
                        const target = e.target as HTMLElement;

                        // Verify if button is active
                        if ( target.classList.contains('ec-ste-active-button') ) {

                            // Remove the .ec-ste-active-button class
                            target.classList.remove('ec-ste-active-button');

                        } else {

                            // Add the .ec-ste-active-button class
                            target.classList.add('ec-ste-active-button');

                        }
                        
                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Init small editor
                                const small_editor = new Plugins.Small_editor();

                                // Get range
                                const range: Range = selection.getRangeAt(0);

                                // Apply the tags
                                small_editor.apply_tags(params, range, 's');

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-list-bulleted-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
                        
                        // Init small editor
                        const small_editor = new Plugins.Small_editor();

                        // Add or remove lists
                        small_editor.list(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-list-numbered-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
   
                        // Init small editor
                        const small_editor = new Plugins.Small_editor();

                        // Add or remove lists
                        small_editor.list(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-add-link-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();
   
                        // Get target
                        const target = e.target as HTMLElement;

                        // Verify if button is active
                        if ( target.classList.contains('ec-ste-active-button') ) {

                            // Remove the .ec-ste-active-button class
                            target.classList.remove('ec-ste-active-button');

                        } else {

                            // Add the .ec-ste-active-button class
                            target.classList.add('ec-ste-active-button');

                        }
                        
                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Init small editor
                                const small_editor = new Plugins.Small_editor();

                                // Get range
                                const range: Range = selection.getRangeAt(0);

                                // Apply the tags
                                small_editor.apply_tags(params, range, 'a', {'href': '#'});

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-dropdown .ec-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        const target = e.target as Element;

                        // Get the dropdown
                        const dropdown: Element | null = target.closest('.ec-ste-dropdown');

                        // Check if dropdown exists
                        if ( dropdown ) {

                            // Set pause
                            setTimeout((): void => {

                                // Add class
                                dropdown?.classList.add('ec-ste-dropdown-show');

                            }, 100);

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-dropdown .ec-fonts a',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Apply font family
                        new PluginsSmallEditorCore.Font().change_font_family(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-dropdown .ec-ste-text-sizes a',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Change font size
                        new PluginsSmallEditorCore.Font().change_font_size(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-button-color button[type="button"]',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Add color box
                        new Plugins.Color().add_color_box(e, params);

                        // Get iframe
                        const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content window
                        const cwindow: Window | null = iframe.contentWindow;

                        // Check if cwindow exists
                        if ( cwindow ) {

                            // Get selection
                            const selection: Selection | null = cwindow.getSelection();

                            // Remove selections in the iframe
                            if ( selection && (selection.rangeCount > 0) ) {

                                // Get range
                                const range: Range = selection.getRangeAt(0);
                                
                                // Make active the content editable editor
                                (range.commonAncestorContainer.parentElement!.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-small-text-editor .ec-ste-expand-all-button',
                    target: (e: MouseEvent): void => {

                        // Save target
                        const target = e.target as Element;

                        // Verify if the .ec-composer-container class is expanded for the small text editor
                        if ( target.closest('.ec-composer-container')?.classList.contains('ec-small-text-editor-expanded') ) {

                            // Remove from the .ec-composer-container a class to minimize .ec-small-text-editor
                            target.closest('.ec-composer-container')?.classList.remove('ec-small-text-editor-expanded');

                        } else {

                            // Add to the .ec-composer-container a class the expand .ec-small-text-editor
                            target.closest('.ec-composer-container')?.classList.add('ec-small-text-editor-expanded');

                        }

                    },
                    capture: false
                }
                
            ];

        }

    }

}