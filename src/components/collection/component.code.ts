/**
 * @class Code
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class contains the methods for the code editor
 */

// Import components interface
import Classes, { InterfaceComponents } from '../../classes/classes.index.js';                     

// Import inc
import {
    get_element_options
} from '../../inc/inc.index.js';

// Import types
import { 
    options_type, 
    params_type, 
    events_type 
} from '../../resources/types/types.index.js';

// Import elements
import elements from '../../resources/elements/elements.index.js';

// Import inc
import {
    get_styles,
    show_index,
    sanitize_code
} from '../../inc/inc.index.js';

// Import plugins
import Plugins from '../../plugins/plugins.index.js';

// Components
export namespace Components {

    // Code
    export class Code implements InterfaceComponents.Interfaces.Components {

        // Caret position
        _caret_position: number = 0;

        // Selector
        _selector: any = {};

        // Selection
        _selection: any = {};

        // History
        _history: any = {};

        // Default classes
        _classes: string[] = [
            'ec-code-template-main',
            'ec-code-template-header',
            'ec-code-template-body',
            'ec-code-template-footer'
        ];

        // Text counter
        _text_count: number = 0;

        /**
         * Get the events for registration
         * 
         * @param params_type params
         */
        get_events(params: params_type): events_type {

            // Save the selector
            this._selector = params.selector;

            return [
                
                {
                    action: 'mousemove',
                    element: '.ec-composer .ec-template-resize-code-button',
                    target: (e: MouseEvent): void => {
                        
                        // Verify if e.buttons is 1
                        if ( e.buttons === 1 ) {

                            // Get the container
                            let container: Element = params.selector.getElementsByClassName('ec-composer-container')[0];

                            // Get the container rect
                            let container_rect: DOMRect = container.getBoundingClientRect();

                            // Get the client top position
                            let client_y: number = (e.clientY > -1)?(e.clientY - container_rect.y):0;

                            // Get the difference
                            let difference: number = container_rect.height - (client_y - 94);

                            // Check if the difference is greather than 199 px
                            if ( difference > 199 ) {

                                // Change the template height
                                (container.getElementsByClassName('ec-composer-template-container')[0] as HTMLElement).style.height = (client_y - 124) + 'px';                            

                                // Change the code height
                                (container.getElementsByClassName('ec-composer-code-container')[0] as HTMLElement).style.height = difference + 'px';

                            }

                        }

                    },
                    capture: false

                }, {
                    action: 'mousedown',
                    iframe: '.ec-composer-element-html-container',
                    target: (e: KeyboardEvent): void => {

                        // Remove the ec-composer-editor-active class
                        params.selector.getElementsByClassName('ec-composer-element-css-container')[0].classList.remove('ec-composer-editor-active');                        

                        // Add the ec-composer-editor-active class
                        params.selector.getElementsByClassName('ec-composer-element-html-container')[0].classList.add('ec-composer-editor-active');

                    },
                    capture: false

                }, {
                    action: 'mousedown',
                    iframe: '.ec-composer-element-css-container',
                    target: (e: KeyboardEvent): void => {

                        // Remove the ec-composer-editor-active class
                        params.selector.getElementsByClassName('ec-composer-element-html-container')[0].classList.remove('ec-composer-editor-active');                        

                        // Add the ec-composer-editor-active class
                        params.selector.getElementsByClassName('ec-composer-element-css-container')[0].classList.add('ec-composer-editor-active');

                    },
                    capture: false

                }, {
                    action: 'keydown',
                    iframe: '.ec-composer-element-html-container',
                    target: (e: KeyboardEvent): void => {

                        // Check if the key is enter
                        if ( e.key.toLowerCase() === 'enter' ) {

                            // Enter method to catch the enter events
                            this._enter(params);

                        } else if ( e.ctrlKey && (e.code === 'KeyZ') ) {
                            e.preventDefault();
                        } else if ( e.ctrlKey && (e.code === 'KeyY') ) {
                            e.preventDefault();
                        } else if ( e.ctrlKey && (e.code === 'KeyV') ) {
                            e.preventDefault();
                        } else if ( e.key.toLowerCase() === 'backspace' ) {

                            // Catch the backspace key press
                            this._delete(params);
                        
                        } else {

                            // Catch the content deletion when is pressed any key and the content is selected
                            this._delete2(params);                            

                        }

                    },
                    capture: false

                }, {
                    action: 'keydown',
                    iframe: '.ec-composer-element-css-container',
                    target: (e: KeyboardEvent): void => {

                        // Check if the key is enter
                        if ( e.key.toLowerCase() === 'enter' ) {

                            // Enter method to catch the enter events
                            this._enter(params);

                        } else if ( e.ctrlKey && (e.code === 'KeyZ') ) {
                            e.preventDefault();
                        } else if ( e.ctrlKey && (e.code === 'KeyY') ) {
                            e.preventDefault();
                        } else if ( e.ctrlKey && (e.code === 'KeyV') ) {
                            e.preventDefault();
                        } else if ( e.key.toLowerCase() === 'backspace' ) {

                            // Catch the backspace key press
                            this._delete(params);
                        
                        } else {

                            // Catch the content deletion when is pressed any key and the content is selected
                            this._delete2(params);   

                        }

                    },
                    capture: false

                }, {
                    action: 'input',
                    iframe: '.ec-composer-element-html-container',
                    target: (e: InputEvent): void => {
                        e.preventDefault();

                        // Detect changes done
                        this._input(e, params);

                    },
                    capture: false
                }, {
                    action: 'input',
                    iframe: '.ec-composer-element-css-container',
                    target: (e: InputEvent): void => {
                        e.preventDefault();

                        // Detect changes done
                        this._input(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer .ec-template-code-button',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Save target
                        let target = e.target as HTMLElement;

                        // Get iframe for template
                        let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                        // Check if iframe exists
                        if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                            // Get the iframe document
                            let idocument: Document | null = iframe_template[0].contentDocument;

                            // Check if document is not null
                            if ( idocument !== null ) {

                                // Get the element's ID
                                let element_id: string | null | undefined = idocument.querySelector('.ec-element-content-active')?.getAttribute('data-id');

                                // Verify if element's ID exists
                                if ( typeof element_id === 'string' ) {

                                    // Set element's ID
                                    target.closest('.ec-composer-container')!.getElementsByClassName('ec-composer-code-container')[0].setAttribute('data-element', element_id);

                                    // Get the element content
                                    let element_content: Element | null = idocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                    // Check if content exists
                                    if ( element_content ) {

                                        // Add ec-template-code-active-button class
                                        target.classList.add('ec-template-code-active-button');

                                        // Add ec-composer-container-template-and-code class
                                        target.closest('.ec-composer-container')!.classList.add('ec-composer-container-template-and-code');

                                        // Add ec-composer-container-template-and-code-show class
                                        target.closest('.ec-composer-container')!.classList.add('ec-composer-container-template-and-code-show');

                                        // Format html code class
                                        let format_html_code = new Plugins.HtmlFormatter();

                                        // Get the iframe for html code
                                        let iframe_html: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-html-container');

                                        // Check if iframe exists
                                        if ( iframe_html[0] instanceof HTMLIFrameElement ) {

                                            // Get the iframe document
                                            let idocument_html: Document | null = iframe_html[0].contentDocument;

                                            // Check if document is not null
                                            if ( idocument_html !== null ) {

                                                // Append styles
                                                idocument_html.head.innerHTML += get_styles('html');

                                                // Append default container
                                                idocument_html.body.innerHTML = `<div class="ec-composer-code-editor" data-type="html">
                                                    <div class="ec-composer-code-index"></div>
                                                    <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                </div>`;

                                                // Format the code
                                                format_html_code.format({lines: true, spaces: true}, element_content.innerHTML)

                                                .then((html: string): void => {

                                                    // Get lines box
                                                    let clines: Element | null = idocument_html!.body.querySelector('.ec-composer-code-lines');

                                                    // Display the html
                                                    clines!.innerHTML = html;

                                                    // Display the index
                                                    show_index(idocument_html!.body);

                                                    // Get the index
                                                    let index: Element = idocument_html!.getElementsByClassName('ec-composer-code-index')[0];

                                                    // Get the lines
                                                    let lines: Element = idocument_html!.getElementsByClassName('ec-composer-code-lines')[0];

                                                    // Scroll the lines
                                                    index.addEventListener('scroll', function () {
                                                        lines.scrollTop = index.scrollTop;
                                                    });
                                                    
                                                    // Scroll the index
                                                    lines.addEventListener('scroll', function () {
                                                        index.scrollTop = lines.scrollTop;
                                                    });

                                                })
                                                
                                                .catch((error: string): void => {

                                                    // Display error in console
                                                    console.error(error);

                                                });

                                            }

                                        }

                                        // Set pause
                                        setTimeout(() => {

                                            // Remove ec-template-code-active-button class
                                            target.classList.remove('ec-template-code-active-button');

                                            // Add hide class
                                            target.classList.add('ec-template-code-hide-button');

                                        }, 300);

                                        // Set pause
                                        setTimeout(() => {

                                            // Remove ec-composer-container-template-and-code-show class
                                            target.closest('.ec-composer-container')!.classList.remove('ec-composer-container-template-and-code-show');

                                        }, 1000);                                    

                                        // Verify if the class ec-composer-code-show is missing
                                        if ( target.closest('.ec-composer-container')!.getElementsByClassName('ec-composer-code-show').length < 1 ) {

                                            // Add active class
                                            target.closest('.ec-composer-container')!.querySelector('.ec-composer-code-container > .ec-composer-code-header .ec-composer-code-tab:nth-child(1)')!.classList.add('ec-composer-code-active-tab');
                                            target.closest('.ec-composer-container')!.querySelector('.ec-composer-code-container > .ec-composer-code-body .ec-composer-code-html')!.classList.add('ec-composer-code-show');    

                                        }

                                    }

                                    // Get element's style
                                    let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                    // Verify if element's style exists
                                    if ( (typeof element_style !== 'undefined') && element_style ) {

                                        // Format css code class
                                        let format_css_code = new Plugins.CssFormatter();
                                        
                                        // Format the code
                                        format_css_code.format({lines: true, spaces: true}, element_style.innerHTML)

                                        .then((html: string): void => {

                                            // Get the iframe for css code
                                            let iframe_css: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-element-css-container');

                                            // Check if iframe exists
                                            if ( iframe_css[0] instanceof HTMLIFrameElement ) {

                                                // Get the iframe document
                                                let idocument_css: Document | null = iframe_css[0].contentDocument;

                                                // Check if document is not null
                                                if ( idocument_css !== null ) {

                                                    // Append styles
                                                    idocument_css.head.innerHTML += get_styles('css');

                                                    // Append default container
                                                    idocument_css.body.innerHTML = `<div class="ec-composer-code-editor" data-type="css">
                                                        <div class="ec-composer-code-index"></div>
                                                        <div class="ec-composer-code-lines" contenteditable="true"></div>
                                                    </div>`;

                                                    // Get lines box
                                                    let clines: Element | null = idocument_css!.body.querySelector('.ec-composer-code-lines');

                                                    // Display the html
                                                    clines!.innerHTML = html;

                                                    // Display the index
                                                    show_index(idocument_css!.body);

                                                    // Get the index
                                                    let index: Element = idocument_css!.getElementsByClassName('ec-composer-code-index')[0];

                                                    // Get the lines
                                                    let lines: Element = idocument_css!.getElementsByClassName('ec-composer-code-lines')[0];

                                                    // Scroll the lines
                                                    index.addEventListener('scroll', function () {
                                                        lines.scrollTop = index.scrollTop;
                                                    });
                                                    
                                                    // Scroll the index
                                                    lines.addEventListener('scroll', function () {
                                                        index.scrollTop = lines.scrollTop;
                                                    });

                                                }

                                            }

                                        })
                                        
                                        .catch((error: string): void => {

                                            // Display error in console
                                            console.error(error);

                                        });

                                    }

                                }

                            }

                        }

                    },
                    capture: false
                }, {
                    action: 'paste',
                    iframe: '.ec-composer-element-html-container',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Paste content
                        this._paste(e, params);

                    },
                    capture: false
                }, {
                    action: 'paste',
                    iframe: '.ec-composer-element-css-container',
                    target: (e: MouseEvent): void => {
                        e.preventDefault();

                        // Paste content
                        this._paste(e, params);

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer .ec-template-hide-code-button',
                    target: (e: any): void => {
                        e.preventDefault();

                        // Save target
                        let target: any = e.target;

                        // Add ec-composer-container-template-and-code-hide class
                        target.closest('.ec-composer-container')!.classList.add('ec-composer-container-template-and-code-hide');

                        // Remove ec-template-code-hide-button class
                        this._selector?.querySelector('.ec-composer .ec-template-code-button').classList.remove('ec-template-code-hide-button');

                        // Remove ec-composer-container-template-and-code class
                        target.closest('.ec-composer-container').classList.remove('ec-composer-container-template-and-code');

                        // Set pause
                        setTimeout(() => {

                            // Remove ec-composer-container-template-and-code-hide class
                            target.closest('.ec-composer-container')!.classList.remove('ec-composer-container-template-and-code-hide');

                        }, 1000);  
                        
                        // Change the template height
                        target.closest('.ec-composer-container').getElementsByClassName('ec-composer-template-container')[0].removeAttribute('style');                            

                        // Change the code height
                        target.closest('.ec-composer-container').getElementsByClassName('ec-composer-code-container')[0].removeAttribute('style');

                    },
                    capture: false
                }, {
                    action: 'click',
                    element: '.ec-composer .ec-composer-code-container .ec-composer-code-header .ec-composer-code-tab',
                    target: (e: any): void => {
                        e.preventDefault();
                        
                        // Get the target.
                        let target: any = e.target;

                        // Get the tab id
                        let tab_id: string = target.getAttribute('data-tab');

                        // Check if the link has active class
                        if ( target.classList.contains('ec-composer-code-active-tab') ) {

                            // Remove the active class
                            target.classList.remove('ec-composer-code-active-tab');
                            target.closest('.ec-composer-code-container').getElementsByClassName('ec-composer-code-' + tab_id)[0].classList.remove('ec-composer-code-show');

                        } else {

                            // Add the active class
                            target.classList.add('ec-composer-code-active-tab');
                            target.closest('.ec-composer-code-container').getElementsByClassName('ec-composer-code-' + tab_id)[0].classList.add('ec-composer-code-show');

                        }

                        // Verify if the class ec-composer-code-show is missing
                        if ( target.closest('.ec-composer-code-container').getElementsByClassName('ec-composer-code-show').length < 1 ) {

                            // Remove ec-template-code-hide-button class
                            this._selector?.querySelector('.ec-composer .ec-template-code-button').classList.remove('ec-template-code-hide-button');

                            // Remove ec-composer-container-template-and-code class
                            target.closest('.ec-composer-container').classList.remove('ec-composer-container-template-and-code');      

                        }
                        
                    },
                    capture: false
                    
                }
                
            ];

        }

        /**
         * Process line
         * 
         * @param params_type params
         * @param number spaces_before
         */
        _process_line = (params: any, spaces_before: number = 0): void => {
            
            // Line container
            let line: HTMLElement | null = null;

            // Get iframe
            let iframe = params.selector.getElementsByClassName('ec-composer-editor-active')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = iframe.contentWindow;

            // Check if cwindow exists
            if ( cwindow ) {

                // Get selection
                let selection: Selection | null = cwindow.getSelection();

                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Get range
                    let range: Range = selection.getRangeAt(0);

                    // Check if closest element is a line
                    if ( range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line') ) {

                        // Set line
                        line = range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line');

                    } else if ( range.commonAncestorContainer.parentElement?.className === 'ec-composer-code-editor-line' ) {

                        // Set line
                        line = range.commonAncestorContainer.parentElement;                        

                    } else if ( (range.commonAncestorContainer.parentElement?.className === 'ec-composer-code-lines') && (range.commonAncestorContainer.parentElement.getElementsByClassName('ec-composer-code-editor-line').length > 0) ) {

                        // Check if is line
                        if ( (range.commonAncestorContainer as HTMLElement).className === 'ec-composer-code-editor-line' ) {

                            // Set line
                            line = (range.commonAncestorContainer as HTMLElement);

                            // Create line code
                            let line_code: Element = document.createElement('div');

                            // Set class
                            line_code.classList.add('ec-composer-code-editor-line-code');

                            // Set html
                            line!.innerHTML = line_code.outerHTML;

                        } else {

                            // Set line
                            line = range.commonAncestorContainer.parentElement.getElementsByClassName('ec-composer-code-editor-line')[0] as HTMLElement;

                        }

                    } else if ( (range.commonAncestorContainer.parentElement?.className === 'ec-composer-code-editor') && (range.commonAncestorContainer.parentElement.getElementsByClassName('ec-composer-code-lines').length > 0) ) {

                        // Create div
                        let div: HTMLElement = document.createElement('div');

                        // Add ec-composer-code-editor-line class
                        div.classList.add('ec-composer-code-editor-line');

                        // Append div
                        range.commonAncestorContainer.parentElement.getElementsByClassName('ec-composer-code-lines')[0].appendChild(div);

                        // Set line
                        line = range.commonAncestorContainer.parentElement.getElementsByClassName('ec-composer-code-editor-line')[0] as HTMLElement;

                    }
                    
                    // Check if line is not null
                    if ( line ) {
                        
                        // Create a node start for the new range
                        let node_start: Text = document.createTextNode('');

                        // Insert the node start
                        range.insertNode(node_start);

                        // Create a sup element
                        let sup: HTMLElement = document.createElement('sup');

                        // Set data content
                        sup.setAttribute('data-content', 'ec-composer-code-editor-caret');

                        // Insert the node start
                        range.insertNode(node_start);

                        // Replace node start
                        node_start.replaceWith(sup);

                        // Get html from line
                        let line_html: string = line.innerHTML.replace('<div class="ec-composer-code-editor-line-code">', '').replace('</div>', '');
                        
                        // Format the string
                        this._format_string(line_html, line.closest('.ec-composer-code-editor')!.getAttribute('data-type')!, (html) => {
                            
                            // Create line code
                            let line_code: Element = document.createElement('div');

                            // Set class
                            line_code.classList.add('ec-composer-code-editor-line-code');

                            // Add html to line code
                            line_code.innerHTML = (spaces_before > 0)?'<span class="ec-code-whitespace">&nbsp;</span>'.repeat(spaces_before) + html:html;

                            // Set html
                            line!.innerHTML = line_code.outerHTML;
                            
                            // Check if caret exists
                            if ( line!.querySelector('sup[data-content="ec-composer-code-editor-caret"]') ) {

                                // Replace caret
                                line!.querySelector('sup[data-content="ec-composer-code-editor-caret"]')!.replaceWith(node_start);

                                // Get all line nodes
                                let nodes: Array<Node> = this._nodes_list(line!);

                                // Create a new Range object
                                let new_range: Range = document.createRange();

                                // Set range start by using the new created text node
                                new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                // Set range end by using the new created text node
                                new_range.setEnd(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                // Verify if the selection is not null
                                if ( selection ) {

                                    // Remove all ranges
                                    selection.removeAllRanges();

                                    // Add the newly created range to the selection
                                    selection.addRange(new_range);

                                }

                            }

                            // Get the code editor
                            let editor: Element | null = line!.closest('.ec-composer-code-editor');

                            // Get the element's ID
                            let element_id: string | null = params.selector.getElementsByClassName('ec-composer-code-container')[0].getAttribute('data-element');

                            // Verify if element id exists
                            if ( element_id ) {

                                // Set the editor mode class
                                params.selector.getElementsByClassName('ec-composer-code-container')[0].classList.add('ec-composer-editor-mode');
                                
                                // Schedule event
                                Classes.Timer.schedule_event('update_html', (): void => {

                                    // Remove the editor mode class
                                    params.selector.getElementsByClassName('ec-composer-code-container')[0].classList.remove('ec-composer-editor-mode');

                                }, 5000);

                                // Check if is the html editor
                                if ( editor!.getAttribute('data-type') === 'html' ) {

                                    // Sanitize the html code
                                    let html_code: string = (line!.closest('.ec-composer-code-lines')! as HTMLElement).innerText;

                                    // Get iframe for template
                                    let iframe_template: HTMLCollectionOf<HTMLIFrameElement> = params.selector.getElementsByClassName('ec-composer-template-container');

                                    // Check if iframe exists
                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                        // Get the iframe document
                                        let idocument: Document | null = iframe_template[0].contentDocument;

                                        // Check if document is not null
                                        if ( idocument !== null ) {

                                            // Display html
                                            idocument.querySelector('.ec-element-content-active .ec-element-content-data')!.innerHTML = sanitize_code(html_code)

                                        }

                                    }

                                } else {

                                    // Sanitize the css code
                                    let css_code: string = line!.closest('.ec-composer-code-lines')!.textContent!;

                                    // Get iframe for template
                                    let iframe_template: HTMLCollectionOf<HTMLIFrameElement> = params.selector.getElementsByClassName('ec-composer-template-container');

                                    // Check if iframe exists
                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                        // Get the iframe document
                                        let idocument: Document | null = iframe_template[0].contentDocument;

                                        // Check if document is not null
                                        if ( idocument !== null ) {

                                            // Get element's style
                                            let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                            // Verify if element's style exists
                                            if ( (typeof element_style !== 'undefined') && element_style ) {

                                                // Append styles
                                                element_style.innerHTML = sanitize_code(css_code);
                                                
                                                // Init the backup class
                                                let backup = new Classes.Backup();

                                                // Save backup
                                                backup.update_css_element_id(element_id, params, element_style.textContent!);

                                                setTimeout(() => {

                                                    // Get the element's name
                                                    let element_name: string | null | undefined = idocument!.querySelector('.ec-element-content-active')?.getAttribute('data-name');

                                                    // Get the namespace
                                                    let name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, 'ResourcesElements' + element_name!.charAt(0).toUpperCase() + element_name!.substring(1))?.value.Resources.Elements;

                                                    // Get key
                                                    let key = Object.keys(name_space)[0] as string;

                                                    // Get the element class
                                                    let element_class = new name_space[key]();

                                                    // Get the element's options
                                                    let element_options: options_type = element_class.get_options(params);

                                                    // Verify if the element has options
                                                    if ( element_options.desktop.length > 0 ) {

                                                        // Desktop properties list
                                                        let desktop_properties_list: {[key: string]: {[key: string]: number | string}} = {};

                                                        // Get iframe for template
                                                        let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                                        // Check if iframe exists
                                                        if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                                            // Get the iframe document
                                                            let idocument: Document | null = iframe_template[0].contentDocument;

                                                            // Check if document is not null
                                                            if ( idocument !== null ) {

                                                                // Get element's style
                                                                let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                                // Verify if element's style exists
                                                                if ( (typeof element_style !== 'undefined') && element_style ) {

                                                                    // Get the style tag
                                                                    let style: HTMLStyleElement | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                                    // Check if style exists
                                                                    if ( (typeof style !== 'undefined') && style ) {

                                                                        // Get the sheet
                                                                        let sheet: CSSStyleSheet | null = style.sheet;

                                                                        // Check if sheet exists
                                                                        if ( sheet !== null ) {
                                                                            
                                                                            // Verify if rules exists
                                                                            if ( sheet.cssRules.length > 0 ) {

                                                                                // List all rules
                                                                                for ( let rule of sheet.cssRules ) {

                                                                                    // Check if media exists
                                                                                    if ( typeof (rule as CSSMediaRule).media === 'undefined' ) {

                                                                                        // Check if is the element's selector
                                                                                        if ( (rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"]' ) {

                                                                                            // Get style
                                                                                            let style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                                                                                            // List the properties
                                                                                            for ( let property of (rule as CSSStyleRule).style ) {

                                                                                                // Verify if element's name is already saved
                                                                                                if ( typeof desktop_properties_list['desktop'] !== 'undefined' ) {

                                                                                                    // Save style
                                                                                                    desktop_properties_list['desktop'][property] = style.getPropertyValue(property);

                                                                                                } else {

                                                                                                    // Save style
                                                                                                    desktop_properties_list['desktop'] = {
                                                                                                        [property]: style.getPropertyValue(property)
                                                                                                    };

                                                                                                }                                     

                                                                                            }

                                                                                        }

                                                                                    }

                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }

                                                            }

                                                        }

                                                        // Get html for options
                                                        let html: string | undefined = get_element_options(element_options, desktop_properties_list, params, 'desktop');

                                                        // Check if html exists
                                                        if ( typeof html !== 'undefined' ) {

                                                            // Set sections
                                                            params.selector.getElementsByClassName('ec-sections')[0].innerHTML = html;

                                                        }

                                                    }

                                                    // Verify if the element has options
                                                    if ( element_options.mobile.length > 0 ) {

                                                        // Mobile properties list
                                                        let mobile_properties_list: {[key: string]: {[key: string]: number | string}} = {};

                                                        // Get iframe for template
                                                        let iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                                        // Check if iframe exists
                                                        if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                                            // Get the iframe document
                                                            let idocument: Document | null = iframe_template[0].contentDocument;

                                                            // Check if document is not null
                                                            if ( idocument !== null ) {

                                                                // Get element's style
                                                                let element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                                // Verify if element's style exists
                                                                if ( (typeof element_style !== 'undefined') && element_style ) {

                                                                    // Get the style tag
                                                                    let style: HTMLStyleElement | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                                    // Check if style exists
                                                                    if ( (typeof style !== 'undefined') && style ) {

                                                                        // Get the sheet
                                                                        let sheet: CSSStyleSheet | null = style.sheet;

                                                                        // Check if sheet exists
                                                                        if ( sheet !== null ) {
                                                                            
                                                                            // Verify if rules exists
                                                                            if ( sheet.cssRules.length > 0 ) {

                                                                                // List all rules
                                                                                for ( let rule of sheet.cssRules ) {

                                                                                    // Check if media exists
                                                                                    if ( typeof (rule as CSSMediaRule).media !== 'undefined' ) {

                                                                                        // Verify if is a mobile view
                                                                                        if ( (rule as CSSMediaRule).conditionText.replaceAll(' ', '').search('(max-width:600px)') > -1 ) {

                                                                                            // Verify if rules exists
                                                                                            if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                                                                                // List all rules
                                                                                                for ( let media_rule of (rule as CSSMediaRule).cssRules ) {

                                                                                                    // Check if is the element's selector
                                                                                                    if ( (media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"]' ) {

                                                                                                        // Get style
                                                                                                        let style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                                                                                        // List the properties
                                                                                                        for ( let property of (media_rule as CSSStyleRule).style ) {
                                                                                                            
                                                                                                            // Verify if element's name is already saved
                                                                                                            if ( typeof mobile_properties_list['mobile'] !== 'undefined' ) {

                                                                                                                // Save style
                                                                                                                mobile_properties_list['mobile'][property] = style.getPropertyValue(property);

                                                                                                            } else {

                                                                                                                // Save style
                                                                                                                mobile_properties_list['mobile'] = {
                                                                                                                    [property]: style.getPropertyValue(property)
                                                                                                                };

                                                                                                            }                                    

                                                                                                        }

                                                                                                    }

                                                                                                }

                                                                                            }

                                                                                        }

                                                                                    }

                                                                                }

                                                                            }

                                                                        }

                                                                    }

                                                                }

                                                            }

                                                        }

                                                        // Get html for options
                                                        let html: string | undefined = get_element_options(element_options, mobile_properties_list, params, 'mobile');

                                                        // Check if html exists
                                                        if ( typeof html !== 'undefined' ) {

                                                            // Set sections
                                                            params.selector.getElementsByClassName('ec-sections')[1].innerHTML = html;

                                                        }

                                                    }

                                                }, 5000);

                                            }

                                        }

                                    }
                                    
                                }

                            }

                            // Display the index
                            show_index(editor);

                        });

                    }

                }

            }

        }


        replaceStr(str: any) {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        /**
         * Remove custom tags
         * 
         * @param NodeListOf<Node> parent
         * @param string list
         * 
         * @returns string
         */
        remove_custom_tags = (parent: Node, list: string): string => {

            // Check if parent is null
            if ( !parent ) {
                return list;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Node container
                let node_string: string = '';

                // List the nodes
                for ( let node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Add node to the list
                        node_string += node.textContent;

                    } else {

                        // Process the children
                        node_string += this.remove_custom_tags(node, list);

                    }

                }

                list += node_string;

            }

            // Return list
            return list;

        }

        /**
         * Enter content
         * 
         * @param params_type params
         */
        _enter = (params: any): void => {

            // Get iframe
            let iframe = params.selector.getElementsByClassName('ec-composer-editor-active')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = iframe.contentWindow;

            // Check if cwindow exists
            if ( cwindow ) {

                // Get selection
                let selection: Selection | null = cwindow.getSelection();

                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Get range
                    let range: Range = selection.getRangeAt(0);

                    // Get the lines
                    let llines: HTMLCollectionOf<Element> | undefined = range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-lines')?.getElementsByClassName('ec-composer-code-editor-line');

                    // Check if lines exists
                    if ( typeof llines !== 'undefined' ) {

                        // Line index
                        let line_index: number = Array.from(llines).indexOf.call(llines, range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line')!);

                        // Space before
                        let before: {spaces: number, complete: number} = (typeof llines[line_index] !== 'undefined')?this._space_before(llines[line_index].getElementsByClassName('ec-composer-code-editor-line-code')[0].childNodes):{spaces: 0, complete: 0};

                        // Verify if closed tags are more than open
                        if ( llines[line_index].outerHTML.split('ec-code-tag-start-open').length > llines[line_index].outerHTML.split('ec-code-tag-end-open').length ) {
                            before.spaces = before.spaces + 4;
                        }

                        // Check if is css editor
                        if ( llines[line_index].closest('.ec-composer-code-editor')?.getAttribute('data-type') === 'css' ) {

                            // Check if next line should have spaces
                            if ( Array.from(llines[line_index].getElementsByClassName('ec-composer-code-editor-line-code')[0].childNodes).find(child => (child.nodeType === Node.ELEMENT_NODE) && ['ec-code-css-curly-bracket-open', 'ec-code-whitespace'].includes((child as Element).className)) ) {

                                // Check if the line contains ec-code-css-curly-bracket-open
                                if ( (before.spaces > 3) && llines[line_index].getElementsByClassName('ec-composer-code-editor-line-code')[0].innerHTML.indexOf('ec-code-css-curly-bracket-open') > 0 ) {

                                    // Add default space
                                    before = {spaces: 8, complete: 1};                                    

                                } else {

                                    // Add default space
                                    before = (before.spaces > 4)?{spaces: 8, complete: 1}:{spaces: 4, complete: 1};

                                }

                            }

                        }

                        // Set pause
                        setTimeout((): void => {

                            // Process a line
                            this._process_line(params, before.spaces);

                        }, 1);

                    } else if ( range.commonAncestorContainer.parentElement?.className === 'ec-composer-code-editor' ) {

                        // Set pause
                        setTimeout(() => {

                            // Display the index
                            show_index(range.commonAncestorContainer.parentElement);

                        }, 1);

                    }

                }

            }

        }

        /**
         * Detect changes done
         * 
         * @param InputEvent e
         * @param params_type params
         */
        _input = (e: InputEvent, params: any): void => {

            // Check if is a new paragraph
            if (e.inputType === 'insertParagraph') {

                // Get target
                let target = e.target as Element;

                // Check if class name is ec-composer-code-lines
                if ( target.className === 'ec-composer-code-lines' ) {

                    // Set pause
                    setTimeout((): void => {

                        // Get the index
                        let index: Element = target.closest('.ec-composer-code-editor')!.getElementsByClassName('ec-composer-code-index')[0];

                        // Get the lines
                        let lines: Element = target;

                        // Scroll the index
                        index.scrollTop = lines.scrollTop;

                    }, 100);

                }

            }

            // Check if input type is deleteContentBackward
            if ( (e.inputType === 'deleteContentBackward') || (e.inputType === 'insertParagraph') || (e.inputType === 'insertFromPaste') ) {
                return;
            }

            // Set pause
            setTimeout((): void => {

                // Process a line
                this._process_line(params);

            }, 1);

        }

        /**
         * Delete content
         * 
         * @param params_type params
         */
        _delete = (params: any): void => {

            // Get iframe
            let iframe = params.selector.getElementsByClassName('ec-composer-editor-active')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = iframe.contentWindow;

            // Check if cwindow exists
            if ( cwindow ) {

                // Get selection
                let selection: Selection | null = cwindow.getSelection();
                
                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Get range
                    let range: Range = selection.getRangeAt(0);

                    // Check if are selected multiple lines
                    if ( range.startContainer.parentElement!.getBoundingClientRect().y !== range.endContainer.parentElement!.getBoundingClientRect().y ) {
                        
                        // Set pause
                        setTimeout((): void => {
                            
                            // Reset lines
                            this._reset_lines(range);

                        }, 10);                                          

                    }
                    
                }

            }

            // Set pause
            setTimeout((): void => {

                // Process a line
                this._process_line(params);

            }, 1);

        }

        /**
         * Delete content when it is selected
         * 
         * @param params_type params
         */
        _delete2 = (params: any): void => {

            // Get iframe
            let iframe = params.selector.getElementsByClassName('ec-composer-editor-active')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = iframe.contentWindow;

            // Check if cwindow exists
            if ( cwindow ) {

                // Get selection
                let selection: Selection | null = cwindow.getSelection();

                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Get range
                    let range: Range = selection.getRangeAt(0);
                    
                    // Check if are selected multiple lines
                    if ( range.startContainer.parentElement!.getBoundingClientRect().y !== range.endContainer.parentElement!.getBoundingClientRect().y ) {

                        // Set pause
                        setTimeout((): void => {
                            
                            // Reset lines
                            this._reset_lines(range);

                        }, 10);                                          

                    }
                    
                }

            }

        }

        /**
         * Paste content
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        _paste = (e: MouseEvent, params: any): void => {

            // Get iframe
            let iframe = params.selector.getElementsByClassName('ec-composer-editor-active')[0] as HTMLIFrameElement;

            // Get content window
            let cwindow: Window | null = iframe.contentWindow;

            // Get the clipboard data
            let clipboard: DataTransfer | null = (e as unknown as ClipboardEvent).clipboardData;

            // Check if cwindow exists
            if ( cwindow && clipboard ) {

                // Get selection
                let selection: Selection | null = cwindow.getSelection();

                // Remove selections in the iframe
                if ( selection && (selection.rangeCount > 0) ) {

                    // Get range
                    let range: Range = selection.getRangeAt(0);

                    // Get the line
                    let line: Element | null = range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line');

                    // Verify if line code is not null
                    if ( line ) {

                        // Create a text node
                        let text_node = document.createTextNode(clipboard.getData('text'));

                        // Insert the node start
                        range.insertNode(text_node);

                        // Remove all ranges
                        selection!.removeAllRanges();

                        // Get the line code
                        let line_code: HTMLCollectionOf<Element> = line.getElementsByClassName('ec-composer-code-editor-line-code');

                        // Check if line code exists
                        if ( line_code.length > 0 ) {

                            // Verify if is the html editor
                            if ( line_code[0].closest('.ec-composer-code-editor')!.getAttribute('data-type') === 'html' ) {

                                // Format html code class
                                let format_html_code = new Plugins.HtmlFormatter();

                                // Editor parameters
                                let params: {lines: boolean, spaces: boolean} = {
                                    lines: false,
                                    spaces: false
                                }
                            
                                // Format the code
                                format_html_code.format(params, this._html_to_plain(line_code[0].innerHTML))

                                .then((html: string): void => {
                                    
                                    // Display html
                                    line_code[0].innerHTML = html;

                                })
                                
                                .catch((error: string): void => {

                                    // Display error in console
                                    console.error(error);

                                });

                            } else {

                                // Format css code class
                                let format_css_code: any = new Plugins.CssFormatter();

                                // Editor parameters
                                let params: {lines: boolean, spaces: boolean} = {
                                    lines: false,
                                    spaces: false
                                }
                                                                    
                                // Format the code
                                format_css_code.format(params, this._html_to_plain(line_code[0].innerHTML))

                                .then((html: string): void => {
                                    
                                    // Display html
                                    line_code[0].innerHTML = html;

                                })
                                
                                .catch((error: string): void => {

                                    // Display error in console
                                    console.error(error);

                                });

                            }

                        }

                    }

                }

            }

        }

        /**
         * Reset lines
         * 
         * @param Range range
         */
        _reset_lines = (range: Range): void => {

            // Get the lines
            let llines: HTMLCollectionOf<Element> = range.commonAncestorContainer.parentElement!.getElementsByClassName('ec-composer-code-editor-line');

            // Line container
            let line: HTMLElement | null = null;

            // Check if closest element is a line
            if ( range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line') ) {

                // Set line
                line = range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor-line');

            } else if ( range.commonAncestorContainer.parentElement?.className === 'ec-composer-code-editor-line' ) {

                // Set line
                line = range.commonAncestorContainer.parentElement;                        

            }
            
            // Verify if lines exists
            if ( llines.length > 0 ) {

                // List the lines
                for ( let lline of llines ) {

                    // Check if is the current line
                    if ( line && (line.isSameNode(lline)) ) {
                        continue;
                    }

                    // Check if ec-composer-code-editor-line-code is missing
                    if ( lline.childNodes[0].nodeName !== 'DIV' ) {
                        lline.remove();
                    } else {

                        // Check if the line code is empty
                        if ( (lline.childNodes[0].childNodes.length === 1) && !lline.childNodes[0].childNodes[0].textContent ) {
                            lline.remove();
                        }

                    }

                }

                // Display the index
                show_index(range.commonAncestorContainer.parentElement!.closest('.ec-composer-code-editor'));

            }

        }

        /**
         * Get all childNodes
         * 
         * @param Node parent
         * @param Array result
         * 
         * @returns Array<Node> childNodes
         */
        _nodes_list = (parent: Node, result: Array<Node> = []): Array<Node> => {

            // Check if parent has nodes
            if (parent.childNodes && parent.childNodes.length > 0) {

                // List the nodes
                for (let child of parent.childNodes) {

                        // Add child to result
                        result.push(child);

                        // Get all childNodes
                        this._nodes_list(child, result);

                }

            }

            return result;

        }

        /**
         * Gets the number of spaces before the caret
         * 
         * @param NodeList childrens
         * 
         * @returns an object with number of spaces
         */
        _space_before(childrens: NodeListOf<Node>): {spaces: number, complete: number} {

            // Space before
            let before: {spaces: number, complete: number} = {spaces: 0, complete: 0}

            // Get the childrens
            Array.from(childrens).map((child: Node): void => {

                // Verify if is ec-composer-code-editor-caret
                if ( (child.nodeType === Node.ELEMENT_NODE) && (before.complete < 1) ) {

                    if (((child as Element).className === 'ec-code-whitespace')) {
                        if ((child as Element).querySelector('sup[data-content="ec-composer-code-editor-caret"]')) before.complete = 1;
                        before.spaces++;
                    } else {
                        before.complete = 1;
                    }

                }

            });

            return before;

        }

        /**
         * Converts the special characters to html
         * 
         * @param string html
         * 
         * @returns string with html code
         */
        _to_html(html: string): string {

            html = html.replace(/&gt;/g, '>');
            html = html.replace(/&lt;/g, '<');
            html = html.replace(/&quot;/g, '"');
            html = html.replace(/&apos;/g, "'");
            html = html.replace(/&amp;/g, '&');

            return html;

        }

        /**
         * Removes html from string
         * 
         * @param string html
         * 
         * @returns plain text
         */
        _html_to_plain(html: string): string {

            // Create a div
            let div: any = document.createElement('div');
        
            // Set html to div
            div.innerHTML = html;
        
            // Return the text
            return div.textContent || div.innerText || '';
        }

        /**
         * Formats a string
         * 
         * @param string html
         * @param string type
         * @param function func
         * 
         * @returns string with the formated content
         */
        _format_string(html: string, type: string, func: (html: string) => void): string {
            
            // Get caret
            let caret: string | undefined = html.split('<sup data-content="ec-composer-code-editor-caret"></sup>').shift();
            
            // Get caret position
            let caret_pos: number | undefined = 0;

            // Verify if caret exists
            if ( typeof caret !== 'undefined' ) {

                // Create a div
                let div: Element = document.createElement('div');

                // Set content
                div.textContent = caret;

                // Set caret position
                caret_pos = this._html_to_plain(div.textContent)?.length;

            }
           
            // Turn html to plain text
            let plain_text: string = this._html_to_plain(html);

            // Verify if is a css code
            if (type === 'css') {

                // Check if there is a space at the begin
                if ( (plain_text.length > 4) && !plain_text.substring(0, 4).trim() && (plain_text.substring(4, 5) === '}') ) {

                    // Increase the caret position
                    caret_pos = 1;
                    

                }

            }
            
            // Format html or css code class
            let format_html_code = (type === 'html')?new Plugins.HtmlFormatter():new Plugins.CssFormatter();

            // Editor parameters
            let params: {lines: boolean, spaces: boolean} = {
                lines: false,
                spaces: false
            }
            
            // Format the code
            format_html_code.format(params, plain_text)

            .then((html: string): void => {
                
                // Check if html is empty
                if ( !html ) {
                    
                    // Add empty spaces
                    html = html + '<sup data-content="ec-composer-code-editor-caret"></sup><br>';

                    // Display html
                    func(html);                

                } else {

                    // Load dom parser
                    let dom_parser: DOMParser = new DOMParser();

                    // Turn html to nodes
                    let nodes_list: Document = dom_parser.parseFromString(html, 'text/html');

                    // Reset text counter
                    this._text_count = 0;

                    // Add caret in the html
                    let new_html: string = this._add_caret(nodes_list.getElementsByTagName('body')[0], caret_pos!, '');

                    // Display html
                    func(new_html);

                }

            })
            
            .catch((error: string): void => {

                // Display error in console
                console.error(error);

            });
        
            // Return the text
            return html;
        }

        /**
         * Add caret to the content
         * 
         * @param Node parent
         * @param number caret_pos
         * @param string content
         * 
         * @returns string with the content
         */
        _add_caret(parent: Node, caret_pos: number, content: string) {

            // Check if parent is null
            if ( !parent ) {
                return content;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Node container
                let node_string: string = '';

                // Node end html
                let node_end: string = '';

                // Get html node
                let html_node = parent as HTMLElement;

                // Exclude body
                if (parent.nodeName !== 'BODY') {

                    // Add tag
                    node_string = html_node.outerHTML.split('>').shift() + '>';

                    // Add tag
                    node_end = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                }

                // List the nodes
                for ( let node of parent.childNodes ) {
                 
                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Characters container
                        let characters: string = '';

                        // List characters
                        for ( var t = 0; t < node.textContent!.length; t++ ) {

                            // Check if caret_pos is 0
                            if ( caret_pos === 0 ) {

                                // Check if text is equal to caret_pos
                                if ( caret_pos === this._text_count ) {
                                    characters += '<sup data-content="ec-composer-code-editor-caret"></sup>';
                                }   

                            }

                            // Set text
                            characters += node.textContent![t];
                            
                            // Increase text
                            this._text_count++;

                            // Check if caret_pos is not 0
                            if ( caret_pos !== 0 ) {

                                // Check if text is equal to caret_pos
                                if ( caret_pos === this._text_count ) {
                                    characters += '<sup data-content="ec-composer-code-editor-caret"></sup>';
                                }   

                            }                            

                        }

                        // Add node to the list
                        node_string += characters;

                    } else {
                        
                        // Process the children
                        node_string += this._add_caret(node, caret_pos, content);

                    }

                }

                // Set node end to string
                node_string += node_end;

                // Add node string to content
                content += node_string;

            }
            
            // Return list
            return content;

        }

    }

}