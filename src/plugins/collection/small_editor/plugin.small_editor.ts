/**
 * @class Small_editor
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class formats the texts
 */

// Import components interface
import Classes from '../../../classes/classes.index.js';

// Import inc
import {
    get_element_options,
    show_message
} from '../../../inc/inc.index.js';

// Import the fonts
import * as fonts from '../../../resources/fonts/fonts.index.js';

// Import types
import {
    params_type, 
    options_type, 
    font_type 
} from '../../../resources/types/types.index.js';

// Import elements
import elements from '../../../resources/elements/elements.index.js';

// Import plugins
import PluginsList from '../../plugins.index.js';

// Import the Small Editor Core Plugin class
import PluginsSmallEditorCore from './core/plugin.small_editor_index.js';

// Namespace
export namespace Plugins {

    // Class
    export class Small_editor {

        // Allowed text align directions
        text_align_directions: string[] = [
            'left',
            'center',
            'right',
            'justify'
        ];

        // Save range
        range: Range | undefined;

        // Save tag
        tag: string = '';

        // Save tag preferences
        tag_preferences: {[key: string]: string | number} | null = null;

        // Counters for characters
        counters: {[key: string]: number} = {
            selected: 0,
            start: 0,
            end: 0,
            start_complete: 0,
            end_complete: 0,
            tag_childs: 0,
            add_tag: 0,
            remove_tag: 0,
            is_parent: 0
        };

        // Contents
        contents: {[key: string]: string} = {
            before: '',
            selected: '',
            after: '',
            tag_start: '',
            tag_end: ''
        };

        // Nodes
        nodes: {[key: string]: Element | null | undefined} = {}

        // Allowed custom tags
        custom_tags: string[] = ['font-family', 'font-size', 'font-weight', 'text-color'];

        /*---------------------- METODS FOR FORMATING A SELECTION ------------------------*/

        /**
         * Align text
         * 
         * @param HTMLElement target
         * @param string direction
         */
        text_align = (target: HTMLElement, direction: string): void => {

            // Check if the direction is allowed
            if ( this.text_align_directions.includes(direction) ) {

                // Align text
                target.style.textAlign = direction;

            }

        }

        /**
         * Get all childrens
         * 
         * @param Element parent
         * @param string result
         * 
         * @returns Array<Element> childrens
         */
        children_list = (parent: Element, result: Array<Element> = []): Array<Element> => {

            // Check if parent has childrens
            if (parent.children && parent.children.length > 0) {

                // List the childrens
                for (const child of parent.children) {

                        // Add child to result
                        result.push(child);

                        // Get all childrens
                        this.children_list(child, result);

                }

            }

            return result;

        }

        /**
         * Get all childNodes
         * 
         * @param Node parent
         * @param string result
         * 
         * @returns Array<Node> childNodes
         */
        nodes_list = (parent: Node, result: Array<Node> = []): Array<Node> => {

            // Check if parent has nodes
            if (parent.childNodes && parent.childNodes.length > 0) {

                // List the nodes
                for (const child of parent.childNodes) {

                        // Add child to result
                        result.push(child);

                        // Get all childNodes
                        this.nodes_list(child, result);

                }

            }

            return result;

        }

        /**
         * Apply tags
         * 
         * @param params_type params
         * @param Range range
         * @param string tag
         * @param object preferences
         * 
         * @returns void
         */
        apply_tags = (params: params_type, range: Range, tag: string, preferences?: {[key: string]: string | number}): void => {

            // Set range
            this.range = range;

            // Save tag
            this.tag = tag;

            // Check if the tag has preferences
            if ( preferences ) {

                // Set tag's preferences
                this.tag_preferences = preferences;

            }

            // Get template
            const template: Element | null = range.startContainer.parentElement!.closest('.ec-composer-template');

            // Check if template is not null
            if ( template ) {

                // Verify if no content is selected
                if ( range.toString().length > 0 ) {

                    // Get content
                    this.extract_selected(range.startContainer.parentElement!.closest('.ec-element-content-data')!, '');

                    // Get before code
                    const before: string = this.contents.before;

                    // Get selected code
                    const selected: string = '<sup data-content="ec-small-editor-temp-selection-start"></sup>' + this.contents.selected + '<sup data-content="ec-small-editor-temp-selection-end"></sup>';

                    // Get after code
                    const after: string = this.contents.after;  
                  
                    // Load dom parser
                    const dom_parser: DOMParser = new DOMParser();

                    // Prepare the nodes
                    const content_nodes: Document = dom_parser.parseFromString(before + '' + selected + '' + after, 'text/html');
                    
                    // Get the start element
                    const start_element: HTMLElement | null = content_nodes.querySelector('sup[data-content="ec-small-editor-temp-selection-start"]');

                    // Get the end element
                    const end_element: HTMLElement | null = content_nodes.querySelector('sup[data-content="ec-small-editor-temp-selection-end"]');

                    // Save tag start
                    this.contents.tag_start = 'ec-small-editor-temp-selection-start';

                    // Save tag end
                    this.contents.tag_end = 'ec-small-editor-temp-selection-end';            

                    // Get closest start tag
                    let closest_start_tag: Element | null | undefined = start_element?.closest(tag);

                    // Get closest end tag
                    let closest_end_tag: Element | null | undefined = end_element?.closest(tag);
                    
                    // Verify if we have a custom tag
                    if ( this.custom_tags.includes(this.tag) ) {

                        // Verify if styles are same
                        if ( !(preferences && preferences['style'] && ((preferences['style'] as string).slice(0, -1) === closest_end_tag?.getAttribute('style'))) ) {

                            closest_end_tag = null;

                        } else if ( !(preferences && preferences['style'] && ((preferences['style'] as string).slice(0, -1) === closest_start_tag?.getAttribute('style'))) ) {

                            closest_start_tag = null;

                        }

                    }

                    // Save node
                    this.nodes = {
                        start: closest_start_tag,
                        end: closest_end_tag
                    };
                    
                    // Define ready code
                    let ready_code: string;

                    // Verify if the tag should be removed
                    if ( closest_start_tag ) {

                        // Get ready to use code
                        ready_code = this.remove_tag(content_nodes.getElementsByTagName('body')[0], '');
                        
                        // Verify if is a custom tag
                        if ( this.custom_tags.includes(tag) && preferences && preferences['style'] ) {

                            // Verify if the font was changed
                            if ( closest_start_tag.getAttribute('style') + ';' !== preferences['style'] ) {

                                // Load dom parser
                                const dom_parser: DOMParser = new DOMParser();

                                // Prepare the nodes
                                const content: Document = dom_parser.parseFromString(ready_code, 'text/html');
                                
                                // Get the content data
                                const content_data: Element = content.getElementsByClassName('ec-element-content-data')[0];

                                // Add custom tags
                                ready_code = this.add_tag(content_data, '');                             

                            }

                        }

                    } else {
                        
                        // Get ready to use code
                        ready_code = this.add_tag(content_nodes.getElementsByTagName('body')[0], '');

                    }

                    // Check if tag is a
                    if ( (tag === 'a') && preferences && preferences['href'] ) {

                        // Set href
                        const href: string = ' href="' + preferences['href'] + '"';

                        // Replace same tag
                        ready_code = ready_code.split('</' + tag + '><' + tag + href + '>').join('');
                        ready_code = ready_code.split('<' + tag + href + '></' + tag + '>').join('');

                    } else if ( this.custom_tags.includes(tag) && preferences && preferences['style'] ) {

                        // Load dom parser
                        const dom_parser: DOMParser = new DOMParser();

                        // Prepare the nodes
                        const content: Document = dom_parser.parseFromString(ready_code, 'text/html');
                        
                        // Get the content data
                        const content_data: Element = content.getElementsByClassName('ec-element-content-data')[0];

                        // Remove joined custom tags
                        ready_code = this.remove_custom_tags(content_data, '');

                    } else {

                        // Replace same tag
                        ready_code = ready_code.split('</' + tag + '><' + tag + '>').join('');
                        ready_code = ready_code.split('<' + tag + '></' + tag + '>').join('');

                    }
            
                    // Prepare the nodes
                    const content: Document = dom_parser.parseFromString(ready_code, 'text/html');

                    // Check if content data exists
                    if ( content.getElementsByClassName('ec-element-content-data').length > 0 ) {

                        // Replace text
                        range.startContainer.parentElement!.closest('.ec-element-content-data')!.innerHTML = content.getElementsByClassName('ec-element-content-data')[0].innerHTML;

                    }

                    // Get iframe for template
                    const itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                    // Get the sup start html element which should be replaced with a marker
                    const sup_start: Element | null = template.querySelector('sup[data-content="ec-small-editor-temp-selection-start"]');

                    // Get the sup end html element which should be replaced with a marker
                    let sup_end: Element | null = template.querySelector('sup[data-content="ec-small-editor-temp-selection-end"]');

                    // Check if sup_end is null
                    if ( !sup_end ) {

                        // Filter the text nodes
                        const texts: Node[] = Array.from(this.nodes_list(template.querySelector('.ec-element-content-data')!)).filter(node => node.nodeName === '#text');

                        // First we should verify if text nodes exists
                        if ( texts.length > 0 ) {

                            // Last text in the created array
                            const last: Node = texts[(texts.length - 1)];

                            // Get the node parent
                            const node_parent: HTMLElement | null = last.parentElement;
                            
                            // Create a sup
                            const sup: Element = document.createElement('sup');

                            // Add data content
                            sup.setAttribute('data-content', this.contents.tag_end);

                            // Clone last
                            const clast: Node = last.cloneNode(true);

                            // Insert sup
                            node_parent!.replaceChild(sup, last);

                            // Insert before
                            node_parent!.insertBefore(clast, sup);

                            // Search again for sup
                            sup_end = template.querySelector('sup[data-content="ec-small-editor-temp-selection-end"]');

                        }

                    }

                    // Next step is to verify if sup_start and sub_end is not null
                    if ( sup_start && sup_end ) {

                        // Get content window
                        const cwindow: Window | null = itemplate.contentWindow;

                        // Create a node start for the new range
                        const node_start: Text = document.createTextNode('');

                        // Create a node end for the new range
                        const node_end: Text = document.createTextNode('');

                        // Add node start to the sup start
                        sup_start.parentElement!.insertBefore(node_start, sup_start);

                        // Add node end to the sup end
                        sup_end.parentElement!.insertBefore(node_end, sup_end);

                        // Create a new Range object
                        const new_range: Range = document.createRange();

                        // Set range start by using the new created text node
                        new_range.setStart(sup_start.parentElement!.childNodes[Array.from(sup_start.parentElement!.childNodes).indexOf(node_start)], 0);

                        // Set range end by using the new created text node
                        new_range.setEnd(sup_end.parentElement!.childNodes[Array.from(sup_end.parentElement!.childNodes).indexOf(node_end)], 0);

                        // Create a new Selection object
                        const selection: Selection | null = cwindow!.getSelection();

                        // Verify if the selection is not null
                        if ( selection ) {

                            // Remove all ranges
                            selection.removeAllRanges();

                            // Add the newly created range to the selection
                            selection.addRange(new_range);
            
                            // Remove the sup start
                            sup_start.remove();
            
                            // Remove the sup end
                            sup_end.remove();

                        }

                    }

                } else {

                    // Get the parent element from the range object
                    const parent_element: HTMLElement | null = range.startContainer.parentElement;

                    // Verify if the parent element is not null
                    if ( parent_element !== null ) {

                        // Check if is inside content data
                        if ( parent_element.closest('.ec-element-content-data') ) {

                            // Make the content data active
                            (parent_element.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                        } else {

                            // Make the content data active
                            (parent_element.getElementsByClassName('ec-element-content-data')[0] as HTMLInputElement)!.focus();
                            
                        }

                    }

                }

            }

        }

        /**
         * Extract selected code
         * 
         * @param NodeListOf<Node> parent
         * @param string list
         * 
         * @returns string
         */
        extract_selected = (parent: Node, list: string): string => {

            // Check if parent is null
            if ( !parent ) {
                return list;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Get html node
                const html_node = parent as HTMLElement;

                // Node container
                let node_string: string = html_node.outerHTML.split('>').shift() + '>';

                // Node end html
                const node_end: string = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                // Check if start is not complete
                if ( this.counters.start_complete < 1 ) {

                    // Add before contents
                    this.contents.before += node_string;

                }

                // Check if end is not complete
                if ( this.counters.end_complete > 0 ) {

                    // Add selected contents
                    this.contents.selected += node_string;

                }

                // Check if is after code
                if ( (this.counters.start_complete > 0) && ( this.counters.end_complete < 1 ) ) {

                    // Add after contents
                    this.contents.after += node_string;

                } 

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Check if is the node is selected
                    if ( node.isSameNode(this.range!.startContainer) ) {

                        // Enable start
                        this.counters.start = 1;

                    }
                    
                    // Check if is the node is selected
                    if ( node.isSameNode(this.range!.endContainer) ) {
                        
                        // Enable end
                        this.counters.end = 1;
                    
                    }
                    
                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Text container
                        let text: string = '';

                        // List characters
                        for ( var t = 0; t < node.textContent!.length; t++ ) {

                            // Verify if start is enabled
                            if ( this.counters.start > 0 ) {

                                // Check if t is startoffset
                                if ( t === this.range?.startOffset ) {

                                    // Disable start
                                    this.counters.start = 0;

                                    // Disable start complete
                                    this.counters.start_complete = 1;                                    

                                    // Enable end complete
                                    this.counters.end_complete = 1;

                                }

                            }
                            
                            // Verify if end is enabled
                            if ( this.counters.end > 0 ) {

                                // Check if t is endoffset
                                if ( t === this.range?.endOffset ) {

                                    // Disable end
                                    this.counters.end = 0;

                                    // Mark as end complete
                                    this.counters.end_complete = 0;

                                } else if ( t === (node.textContent!.length - 1) ) {

                                    // Disable end
                                    this.counters.end = 0;

                                    // Mark as end complete
                                    this.counters.end_complete = 0;

                                    // Add selected contents
                                    this.contents.selected += node.textContent![t];
                                    continue;                                    
                                    
                                }

                            }

                            // Check if start is not complete
                            if ( this.counters.start_complete < 1 ) {

                                // Add before contents
                                this.contents.before += node.textContent![t];

                            }

                            // Check if end is not complete
                            if ( this.counters.end_complete > 0 ) {

                                // Add selected contents
                                this.contents.selected += node.textContent![t];
                                continue;

                            }

                            // Check if is after code
                            if ( (this.counters.start_complete > 0) && ( this.counters.end_complete < 1 ) ) {

                                // Add after contents
                                this.contents.after += node.textContent![t];

                            } 

                            // Set text
                            text += node.textContent![t];

                        }

                        // Add node to the list
                        node_string += text;

                    } else {
                        
                        // Check if node name is BR
                        if ( node.nodeName === 'BR' ) {

                            // Check if start is not complete
                            if ( this.counters.start_complete < 1 ) {

                                // Add before contents
                                this.contents.before += '<br />';

                            }

                            // Check if end is not complete
                            if ( this.counters.end_complete > 0 ) {

                                // Add selected contents
                                this.contents.selected += '<br />';

                            }

                            // Check if is after code
                            if ( (this.counters.start_complete > 0) && ( this.counters.end_complete < 1 ) ) {

                                // Add after contents
                                this.contents.after += '<br />';

                            }

                        } else {

                            // Check if node is an element node
                            if (node.nodeType === Node.ELEMENT_NODE) {

                                // Create element from node
                                const element = node as HTMLElement;
                                
                                // Check if the tag is empty
                                if ( element.childNodes.length < 1 ) {
    
                                    // Set html
                                    node_string += (element.outerHTML === '<p></p>')?'<p><br></p>':element.outerHTML;

                                }

                            }
                            
                            // Process the children
                            node_string += this.extract_selected(node, '');

                        }

                    }

                }

                // Check if start is not complete
                if ( this.counters.start_complete < 1 ) {

                    // Add before contents
                    this.contents.before += node_end;

                }

                // Check if end is not complete
                if ( this.counters.end_complete > 0 ) {

                    // Add selected contents
                    this.contents.selected += node_end;

                }

                // Check if is after code
                if ( (this.counters.start_complete > 0) && ( this.counters.end_complete < 1 ) ) {

                    // Add after contents
                    this.contents.after += node_end;

                }                

                // Set node end to string
                node_string += node_end;

                // Add node_string to list
                list += node_string;

            }
            
            // Return list
            return list;

        }

        /**
         * Remove tag
         * 
         * @param NodeListOf<Node> parent
         * @param string list
         * @param object params
         * 
         * @returns string
         */
        remove_tag = (parent: Node, list: string, params?: {[key: string]: string | number}): string => {
            
            // Check if parent is null
            if ( !parent ) {
                return list;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Get html node
                const html_node = parent as HTMLElement;

                // Node container
                let node_string: string = '';

                // Node end html
                let node_end: string = '';

                // Check if is the requested tag
                if ( (html_node !== this.nodes!.start) && (html_node !== this.nodes!.end) && (parent.nodeName !== 'BODY') ) {

                    // Verify if tags childs should be catched
                    if ( this.counters.tag_childs > 0 ) {

                        // Verify if is not the node name requested
                        if (parent.nodeName !== this.tag.toUpperCase()) {

                            // Add tag
                            node_string = html_node.outerHTML.split('>').shift() + '>';

                            // Add tag
                            node_end = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                        }

                    } else {

                        // Add tag
                        node_string = html_node.outerHTML.split('>').shift() + '>';

                        // Add tag
                        node_end = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                    }

                } else if (html_node === this.nodes!.start) {

                    // Enable add tag
                    this.counters.add_tag = 1;

                }

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Text node
                        let text_node: string = '';

                        // Verify if tag should be added
                        if (this.counters.add_tag > 0) {
                            
                            // Check if the tag is a
                            if ( (this.tag === 'a') && this.tag_preferences && (typeof this.tag_preferences.href !== 'undefined') ) {

                                // Set href
                                const href: string = ' href="' + this.tag_preferences.href + '"';

                                // Set html
                                text_node = '<' + this.tag + href + '>' + node.textContent! + '</' + this.tag + '>';

                            } else if ( this.custom_tags.includes(this.tag) && this.tag_preferences && (typeof this.tag_preferences.style !== 'undefined') ) {

                                // Set style
                                let style: string = ' style="' + this.tag_preferences.style + '"';

                                // Check if params exists
                                if ( params && params[this.tag] ) {

                                    // Replace style
                                    style = ' style="' + params[this.tag] + '"';

                                }

                                // Set html
                                text_node = '<' + this.tag + style + '>' + node.textContent! + '</' + this.tag + '>';

                            } else {

                                // Set html
                                text_node = '<' + this.tag + '>' + node.textContent! + '</' + this.tag + '>';

                            }

                        } else if ( this.counters.remove_tag > 0 ) {

                            // Check if the tag is a
                            if ( (this.tag === 'a') && this.tag_preferences && (typeof this.tag_preferences.href !== 'undefined') ) {

                                // Set href
                                const href: string = ' href="' + this.tag_preferences.href + '"';

                                // Set html
                                text_node = '<' + this.tag + href + '>' + node.textContent! + '</' + this.tag + '>';

                            } else if ( this.custom_tags.includes(this.tag) && this.tag_preferences && (typeof this.tag_preferences.style !== 'undefined') ) {

                                // Set style
                                let style: string = ' style="' + this.tag_preferences.style + '"';

                                // Check if params exists
                                if ( params && params[this.tag] ) {

                                    // Replace style
                                    style = ' style="' + params[this.tag] + '"';

                                }

                                // Set html
                                text_node = '<' + this.tag + style + '>' + node.textContent! + '</' + this.tag + '>';

                            } else {

                                // Set html
                                text_node = '<' + this.tag + '>' + node.textContent! + '</' + this.tag + '>';

                            }
                            
                        } else {

                            // Set text
                            text_node = node.textContent!;

                        }

                        // Add node to the list
                        node_string += text_node;

                    } else {

                        // Get tag
                        const tag = node as HTMLElement;

                        // Check if start sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_start) {

                            // Catch the childrens of the selected tag
                            this.counters.tag_childs = 1;

                            // Disable add tag
                            this.counters.add_tag = 0;

                            // Set a temporary tag to mark the start of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-start"></sup>';

                        }
                        
                        // Check if end sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_end) {
                            
                            // stop catching of the childrens of the selected tag
                            this.counters.tag_childs = 0;
                            
                            // Check if the sup tag is inside the selected tag
                            if ( tag.closest(this.tag) ) {

                                // Check if the tag is a
                                if ( (this.tag === 'a') && this.tag_preferences && (typeof this.tag_preferences.href !== 'undefined') ) {

                                    // Disable remove tag
                                    this.counters.remove_tag = 1;

                                } else if ( this.custom_tags.includes(this.tag) && this.tag_preferences && (typeof this.tag_preferences.style !== 'undefined') ) {

                                    // Disable remove tag
                                    this.counters.remove_tag = 1;

                                } else {

                                    // Disable remove tag
                                    this.counters.remove_tag = 1;

                                }

                            }

                            // Set a temporary tag to mark the end of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-end"></sup>';

                        }

                        // Parameters
                        const params: {[key: string]: string | number} = {};

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;

                            // Verify if style exists
                            if ( element.getAttribute('style') ) {

                                // Set tag
                                params[element.nodeName.toLocaleLowerCase()] = element.getAttribute('style') as string;

                            }

                        }

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;
                     
                            // Check if the tag is empty
                            if ( element.childNodes.length < 1 ) {

                                // Set html
                                node_string += element.outerHTML;

                            }

                        }

                        // Process the children
                        node_string += this.remove_tag(node, '', params);

                    }

                } 

                // Verify if end tag is enabled and node_end is empty
                if ( (this.counters.remove_tag > 0) && !node_end ) {

                    // Disable tag end marker
                    this.counters.remove_tag = 0;

                }

                // Set node end to string
                node_string += node_end;

                // Add node_string to list
                list += node_string;

            }

            // Return list
            return list;

        }

        /**
         * Add tag
         * 
         * @param NodeListOf<Node> parent
         * @param string list
         * @param object params
         * 
         * @returns string
         */
        add_tag = (parent: Node, list: string, params?: {[key: string]: string | number}): string => {

            // Check if parent is null
            if ( !parent ) {
                return list;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Get html node
                const html_node = parent as HTMLElement;

                // Node container
                let node_string: string = '';

                // Node start html
                let node_start: string = '';

                // Node end html
                let node_end: string = '';

                // Check if is the requested tag
                if ( (parent.nodeName !== 'BODY') || (this.counters.add_tag < 1 && parent.nodeName !== this.tag.toUpperCase()) ) {

                    // Add tag
                    node_start = html_node.outerHTML.split('>').shift() + '>';

                    // Add tag
                    node_end = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                }
                
                if ( parent.nodeName === this.tag.toUpperCase() ) {

                    // Enable the is parent option for the childs
                    this.counters.is_parent = 1;

                }

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Text node
                        let text_node: string = '';

                        // Verify if tag should be added
                        if ( this.counters.add_tag > 0 ) {

                            // Check if this tag is required tag and has a parent with required tag
                            if ( this.counters.is_parent > 0 ) {

                                // Set text
                                text_node = node.textContent!;

                            } else {

                                // Check if the tag is a
                                if ( (this.tag === 'a') && this.tag_preferences && (typeof this.tag_preferences.href !== 'undefined') ) {

                                    // Set href
                                    const href: string = ' href="' + this.tag_preferences.href + '"';

                                    // Set html
                                    text_node = '<' + this.tag + href + '>' + node.textContent! + '</' + this.tag + '>';

                                } else if ( this.custom_tags.includes(this.tag) && this.tag_preferences && (typeof this.tag_preferences.style !== 'undefined') ) {

                                    // Set style
                                    let style: string = ' style="' + this.tag_preferences.style + '"';

                                    // Check if params exists
                                    if ( params && params[this.tag] ) {

                                        // Replace style
                                        style = ' style="' + params[this.tag] + '"';

                                    }

                                    // Set html
                                    text_node = '<' + this.tag + style + '>' + node.textContent! + '</' + this.tag + '>';

                                } else {

                                    // Set html
                                    text_node = '<' + this.tag + '>' + node.textContent! + '</' + this.tag + '>';

                                }

                            }

                        } else {

                            // Set text
                            text_node = node.textContent!;

                        }

                        // Add node to the list
                        node_string += text_node;

                    } else {

                        // Get tag
                        const tag = node as HTMLElement;

                        // Check if start sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_start) {

                            // Enable add tag
                            this.counters.add_tag = 1;

                            // Set a temporary tag to mark the start of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-start"></sup>';

                        }  
                        
                        // Check if end sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_end) {

                            // Disable tag
                            this.counters.add_tag = 0;

                            // Set a temporary tag to mark the end of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-end"></sup>';

                        }

                        // Parameters
                        const params: {[key: string]: string | number} = {};

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;

                            // Verify if style exists
                            if ( element.getAttribute('style') ) {

                                // Set tag
                                params[element.nodeName.toLocaleLowerCase()] = element.getAttribute('style') as string;

                            }

                        }

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;
                            
                            // Check if the tag is empty
                            if ( element.childNodes.length < 1 ) {

                                // Set html
                                node_string += element.outerHTML;

                            }

                        }

                        // Process the children
                        node_string += this.add_tag(node, '', params);

                    }

                }

                // Verify if is the parent required tag
                if ( (parent.nodeName === this.tag.toUpperCase()) && (this.counters.is_parent > 0) ) {
                    this.counters.is_parent = 0;
                }

                // Add node_string to list
                list += node_start + node_string + node_end;

            }

            // Return list
            return list;

        }

        /**
         * Remove custom tags
         * 
         * @param NodeListOf<Node> parent
         * @param string list
         * 
         * @returns string
         */
        remove_custom_tags = (parent: Node, list: string, params?: {start: number, end: number}): string => {

            // Check if parent is null
            if ( !parent ) {
                return list;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Get html node
                const html_node = parent as HTMLElement;

                // Node container
                let node_string: string = !params?.start?html_node.outerHTML.split('>').shift() + '>':'';

                // Node end html
                let node_end: string = !params?.end?'<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1):'';

                // Custom tag
                let custom: number = 0;

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Set end
                        custom = 0;

                        // Add node to the list
                        node_string += node.textContent;

                    } else {

                        // Parameters for tags
                        const params: {start: number, end: number} = {start: 0, end: 0};

                        // Check if custom tag is 1
                        if ( custom < 1 ) {

                            // Check if node is an element node
                            if (node.nodeType === Node.ELEMENT_NODE) {

                                // Create element from node
                                const element = node as HTMLElement;

                                // Get the next sibling
                                const next_sibling: Element | null = element.nextElementSibling;

                                // Check if style exists
                                if ( next_sibling && element.getAttribute('style') ) {

                                    // Current style
                                    const cstyle: string = element.getAttribute('style')?.replaceAll(';', '')?element.getAttribute('style')!.replaceAll(';', ''):'';

                                    // Next style
                                    const nstyle: string = next_sibling.getAttribute('style')?.replaceAll(';', '')?next_sibling.getAttribute('style')!.replaceAll(';', ''):'';

                                    // Verify if the style and tags are same
                                    if ( (element.nodeName === next_sibling.nodeName) && (cstyle === nstyle) ) {

                                        // Set custom tag
                                        custom = 1;

                                        // Disable end
                                        params.end = 1;

                                    }

                                }

                            }

                        } else {

                            // Set end
                            custom = 0;

                            // Disable start
                            params.start = 1;

                        }

                        // Get tag
                        const tag = node as HTMLElement;

                        // Check if start sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_start) {

                            // Set a temporary tag to mark the start of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-start"></sup>';

                        }
                        
                        // Check if end sup exists
                        if (tag.getAttribute('data-content') === this.contents.tag_end) {

                            // Set a temporary tag to mark the end of the selection
                            //node_string += '<sup data-content="ec-small-editor-temp-selection-end"></sup>';

                        }

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;
                            
                            // Check if the tag is empty
                            if ( element.childNodes.length < 1 ) {

                                // Set html
                                node_string += element.outerHTML;

                            }

                        }

                        // Process the children
                        node_string += this.remove_custom_tags(node, '', params);

                    }

                }

                // Set node end to string
                node_string += node_end;

                // Add node_string to list
                list += node_string;

            }

            // Return list
            return list;

        }

        /*---------------------- METODS FOR START FORMATING ------------------------*/

        /**
         * Auto format the text
         * 
         * @param KeyboardEvent e
         * @param params_type params
         */
        format = (e: KeyboardEvent, params: params_type): void => {

            // Get the editor
            const editor: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-small-text-editor');

            // Get iframe for template
            const itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Get content window
            const cwindow: Window | null = itemplate.contentWindow;

            // Create a new Selection object
            const selection: Selection | null = cwindow!.getSelection();

            // Remove selections in the iframe
            if ( selection && (selection.rangeCount > 0) ) {

                // Save target
                let target = e.target as Element;

                // Check if the click is inside the text element
                if ( target.closest('.ec-element-content-data') ) {

                    // Get range
                    const range: Range = selection.getRangeAt(0);

                    // Elements list
                    let elements: Element | null = null;

                    // Create a text node
                    const text: Text = document.createTextNode((e as unknown as InputEvent).data as string);

                    // Nodes which should be ended
                    const end_list: Array<Node> = [];

                    // Get the italic button
                    const italic = editor[0].getElementsByClassName('ec-ste-format-italic-button')[0] as Element;

                    // Check if the button is active
                    if ( italic.classList.contains('ec-ste-active-button') ) {

                        // Verify if italic exists
                        if ( !range.commonAncestorContainer.parentElement!.closest('i') && (range.commonAncestorContainer.nodeName !== 'I') ) {

                            // Create the italic element
                            elements = document.createElement('i');

                            // Append text
                            elements.appendChild(text);

                        }                     

                    } else {

                        // Verify if closes I exists
                        if ( range.commonAncestorContainer.parentElement!.closest('i') ) {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement!.closest('i') as Node);

                        } else if (range.commonAncestorContainer.nodeName === 'I') {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement as Node);

                        }

                    }

                    // Get the underlined button
                    const underlined = editor[0].getElementsByClassName('ec-ste-format-underlined-button')[0] as Element;

                    // Check if the button is active
                    if ( underlined.classList.contains('ec-ste-active-button') ) {

                        // Verify if underline exists
                        if ( !range.commonAncestorContainer.parentElement!.closest('u') && (range.commonAncestorContainer.nodeName !== 'U') ) {

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create u element
                                const u: Element = document.createElement('u');

                                // Append elements to u
                                u.appendChild(elements);
                                
                                // Replace elements
                                elements = u;

                            } else {

                                // Create the underline element
                                elements = document.createElement('u');

                                // Append text
                                elements.appendChild(text);

                            }

                        }                  

                    } else {

                        // Verify if closes U exists
                        if ( range.commonAncestorContainer.parentElement!.closest('u') ) {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement!.closest('u') as Node);

                        } else if (range.commonAncestorContainer.nodeName === 'U') {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement as Node);

                        }

                    }  
                    
                    // Get the strikethrough button
                    const strikethrough = editor[0].getElementsByClassName('ec-ste-format-strikethrough-button')[0] as Element;

                    // Check if the button is active
                    if ( strikethrough.classList.contains('ec-ste-active-button') ) {

                        // Verify if strikethrough exists
                        if ( !range.commonAncestorContainer.parentElement!.closest('s') && (range.commonAncestorContainer.nodeName !== 'S') ) {

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create s element
                                const s: Element = document.createElement('s');

                                // Append elements to s
                                s.appendChild(elements);  
                                
                                // Replace elements
                                elements = s;

                            } else {

                                // Create the strikethrough element
                                elements = document.createElement('s');

                                // Append text
                                elements.appendChild(text);

                            }

                        }                    

                    } else {

                        // Verify if closes S exists
                        if ( range.commonAncestorContainer.parentElement!.closest('s') ) {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement!.closest('s') as Node);

                        } else if (range.commonAncestorContainer.nodeName === 'S') {

                            // Save the node
                            end_list!.push(range.commonAncestorContainer.parentElement as Node);

                        }

                    }

                    // Get the node
                    const node: Node = range.commonAncestorContainer;

                    // Check if node is an element node
                    if (node.nodeType === Node.ELEMENT_NODE) {

                        // Add node as target
                        target = node as Element;

                    } else {

                        // Add parent as target
                        target = node.parentElement as Element;                        

                    }

                    // Get the properties
                    const properties: CSSStyleDeclaration = window.getComputedStyle(target);

                    // Get the font name
                    const font_name: string = properties.fontFamily;

                    // Get the selected font name
                    const selected_font: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                    // Get the fonts list
                    const fonts_list: font_type[] = Object.values(fonts);

                    // Check if the font exists
                    const font: font_type | undefined = fonts_list.find(item => item.name === selected_font);

                    // Check if font exists
                    if ( typeof font !== 'undefined' ) {

                        // Check if font is different
                        if (font.property.replaceAll("'", '').replaceAll('"', "") !== font_name.replaceAll("'", '').replaceAll('"', "")) {

                            // Get the font family
                            const font_family: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-family');

                            // Verify if font tag exists
                            if ( font_family ) {

                                // Save the node for ending
                                end_list!.push(font_family);

                            }

                            // Get the CustomElementRegistry
                            const customElementRegistry: CustomElementRegistry = window.customElements;                                

                            // Verify if custom element is defined
                            if ( customElementRegistry.get('font-family') ) {

                                // Register a custom element
                                customElementRegistry.define('font-family', Classes.Custom);

                            }

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create a new element
                                const new_font_family: HTMLElement = document.createElement('font-family');

                                // Set style
                                new_font_family.setAttribute('style', `font-family:${font.property};`);

                                // Append elements to font family
                                new_font_family.appendChild(elements);  
                                
                                // Replace elements
                                elements = new_font_family;

                            } else {

                                // Create a new element
                                elements = document.createElement('font-family');

                                // Set style
                                elements.setAttribute('style', `font-family:${font.property};`);

                                // Append text
                                elements.appendChild(text);

                            }

                        }

                    }

                    // Get the font family
                    /*const font_family: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-family');

                    // Verify if font tag exists
                    if ( font_family ) {

                        // Get the properties
                        const properties: CSSStyleDeclaration = window.getComputedStyle(font_family);

                        // Get the font name
                        const font_name: string = properties.fontFamily;

                        // Get the selected font name
                        const selected_font: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                        // Get the fonts list
                        const fonts_list: font_type[] = Object.values(fonts);

                        // Check if the font exists
                        const font: font_type | undefined = fonts_list.find(item => item.name === selected_font);

                        // Check if font exists
                        if ( typeof font !== 'undefined' ) {

                            // Check if font is different
                            if (font.property.replaceAll("'", '').replaceAll('"', "") !== font_name.replaceAll("'", '').replaceAll('"', "")) {

                                // Save the node for ending
                                end_list!.push(font_family);

                                // Get the CustomElementRegistry
                                const customElementRegistry: CustomElementRegistry = window.customElements;                                

                                // Verify if custom element is defined
                                if ( customElementRegistry.get('font-family') ) {

                                    // Register a custom element
                                    customElementRegistry.define('font-family', Classes.Custom);

                                }

                                // Verify if elements is not null
                                if ( elements ) {

                                    // Create a new element
                                    const new_font_family: HTMLElement = document.createElement('font-family');

                                    // Set style
                                    new_font_family.setAttribute('style', `font-family:${font.property};`);

                                    // Append elements to font family
                                    new_font_family.appendChild(elements);  
                                    
                                    // Replace elements
                                    elements = new_font_family;

                                } else {

                                    // Create a new element
                                    elements = document.createElement('font-family');

                                    // Set style
                                    elements.setAttribute('style', `font-family:${font.property};`);

                                    // Append text
                                    elements.appendChild(text);

                                }

                            }

                        }

                    } else {

                        // Get the selected font name
                        const selected_font: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                        // Get the fonts list
                        const fonts_list: font_type[] = Object.values(fonts);

                        // Check if the font exists
                        const font: font_type | undefined = fonts_list.find(item => item.name === selected_font);

                        // Check if font exists
                        if ( font ) {

                            // Get the CustomElementRegistry
                            const customElementRegistry: CustomElementRegistry = window.customElements;                                

                            // Verify if custom element is defined
                            if ( customElementRegistry.get('font-family') ) {

                                // Register a custom element
                                customElementRegistry.define('font-family', Classes.Custom);

                            }

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create a new element
                                const new_font_family: HTMLElement = document.createElement('font-family');

                                // Set style
                                new_font_family.setAttribute('style', `font-family:${font.property};`);

                                // Append elements to font family
                                new_font_family.appendChild(elements);  
                                
                                // Replace elements
                                elements = new_font_family;

                            } else {

                                // Create a new element
                                elements = document.createElement('font-family');

                                // Set style
                                elements.setAttribute('style', `font-family:${font.property};`);

                                // Append text
                                elements.appendChild(text);

                            }

                        }

                    }*/

                    // Get the selected font weight
                    const selected_weight: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')?.textContent;

                    // Check if the weight was changed
                    if ( properties.fontWeight !== selected_weight ) {

                        // Get the font weight
                        const font_weight: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-weight');

                        // Verify if font tag exists
                        if ( font_weight ) {

                            // Save the node for ending
                            end_list!.push(font_weight);

                        }

                        // Get the CustomElementRegistry
                        const customElementRegistry: CustomElementRegistry = window.customElements;                                

                        // Verify if custom element is defined
                        if ( customElementRegistry.get('font-weight') ) {

                            // Register a custom element
                            customElementRegistry.define('font-weight', Classes.Custom);

                        }

                        // Verify if elements is not null
                        if ( elements ) {

                            // Create a new element
                            const new_font_weight: HTMLElement = document.createElement('font-weight');

                            // Set style
                            new_font_weight.setAttribute('style', `font-weight:${selected_weight};`);

                            // Append elements to font weight
                            new_font_weight.appendChild(elements);  
                            
                            // Replace elements
                            elements = new_font_weight;

                        } else {

                            // Create a new element
                            elements = document.createElement('font-weight');

                            // Set style
                            elements.setAttribute('style', `font-weight:${selected_weight};`);

                            // Append text
                            elements.appendChild(text);

                        }

                    }

                    // Get the font weight
                    /*const font_weight: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-weight');

                    // Verify if font tag exists
                    if ( font_weight ) {

                        // Get the properties
                        const properties: CSSStyleDeclaration = window.getComputedStyle(font_weight);

                        // Get the selected font weight
                        const selected_weight: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')?.textContent;

                        // Check if the weight was changed
                        if ( properties.fontWeight !== selected_weight ) {

                            // Save the node for ending
                            end_list!.push(font_weight);

                            // Get the CustomElementRegistry
                            const customElementRegistry: CustomElementRegistry = window.customElements;                                

                            // Verify if custom element is defined
                            if ( customElementRegistry.get('font-weight') ) {

                                // Register a custom element
                                customElementRegistry.define('font-weight', Classes.Custom);

                            }

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create a new element
                                const new_font_weight: HTMLElement = document.createElement('font-weight');

                                // Set style
                                new_font_weight.setAttribute('style', `font-weight:${selected_weight};`);

                                // Append elements to font weight
                                new_font_weight.appendChild(elements);  
                                
                                // Replace elements
                                elements = new_font_weight;

                            } else {

                                // Create a new element
                                elements = document.createElement('font-weight');

                                // Set style
                                elements.setAttribute('style', `font-weight:${selected_weight};`);

                                // Append text
                                elements.appendChild(text);

                            }

                        }

                    } else {

                        // Get the selected font weight
                        const selected_weight: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')?.textContent;

                        // Get the CustomElementRegistry
                        const customElementRegistry: CustomElementRegistry = window.customElements;                                

                        // Verify if custom element is defined
                        if ( customElementRegistry.get('font-weight') ) {

                            // Register a custom element
                            customElementRegistry.define('font-weight', Classes.Custom);

                        }

                        // Verify if elements is not null
                        if ( elements ) {

                            // Create a new element
                            const new_font_weight: HTMLElement = document.createElement('font-weight');

                            // Set style
                            new_font_weight.setAttribute('style', `font-weight:${selected_weight};`);

                            // Append elements to font weight
                            new_font_weight.appendChild(elements);  
                            
                            // Replace elements
                            elements = new_font_weight;

                        } else {

                            // Create a new element
                            elements = document.createElement('font-weight');

                            // Set style
                            elements.setAttribute('style', `font-weight:${selected_weight};`);

                            // Append text
                            elements.appendChild(text);

                        }

                    }*/

                    // Get the selected font size
                    const selected_size: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')?.textContent;

                    // Check if the size was changed
                    if ( properties.fontSize !== selected_size ) {

                        // Get the font size
                        const font_size: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-size');

                        // Verify if font tag exists
                        if ( font_size ) {

                            // Save the node for ending
                            end_list!.push(font_size);

                        }

                        // Get the CustomElementRegistry
                        const customElementRegistry: CustomElementRegistry = window.customElements;                                

                        // Verify if custom element is defined
                        if ( customElementRegistry.get('font-size') ) {

                            // Register a custom element
                            customElementRegistry.define('font-size', Classes.Custom);

                        }

                        // Verify if elements is not null
                        if ( elements ) {

                            // Create a new element
                            const new_font_size: HTMLElement = document.createElement('font-size');

                            // Set style
                            new_font_size.setAttribute('style', `font-size:${selected_size};`);

                            // Append elements to font size
                            new_font_size.appendChild(elements);  
                            
                            // Replace elements
                            elements = new_font_size;

                        } else {

                            // Create a new element
                            elements = document.createElement('font-size');

                            // Set style
                            elements.setAttribute('style', `font-size:${selected_size};`);

                            // Append text
                            elements.appendChild(text);

                        }

                    }

                    // Get the font size
                    /*const font_size: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'font-size');

                    // Verify if font tag exists
                    if ( font_size ) {

                        // Get the properties
                        const properties: CSSStyleDeclaration = window.getComputedStyle(font_size);

                        // Get the selected font size
                        const selected_size: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')?.textContent;

                        // Check if the size was changed
                        if ( properties.fontSize !== selected_size ) {

                            // Save the node for ending
                            end_list!.push(font_size);

                            // Get the CustomElementRegistry
                            const customElementRegistry: CustomElementRegistry = window.customElements;                                

                            // Verify if custom element is defined
                            if ( customElementRegistry.get('font-size') ) {

                                // Register a custom element
                                customElementRegistry.define('font-size', Classes.Custom);

                            }

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create a new element
                                const new_font_size: HTMLElement = document.createElement('font-size');

                                // Set style
                                new_font_size.setAttribute('style', `font-size:${selected_size};`);

                                // Append elements to font size
                                new_font_size.appendChild(elements);  
                                
                                // Replace elements
                                elements = new_font_size;

                            } else {

                                // Create a new element
                                elements = document.createElement('font-size');

                                // Set style
                                elements.setAttribute('style', `font-size:${selected_size};`);

                                // Append text
                                elements.appendChild(text);

                            }

                        }

                    } else {

                        // Get the selected font size
                        const selected_size: string | null | undefined = params.selector.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')?.textContent;

                        // Get the CustomElementRegistry
                        const customElementRegistry: CustomElementRegistry = window.customElements;                                

                        // Verify if custom element is defined
                        if ( customElementRegistry.get('font-size') ) {

                            // Register a custom element
                            customElementRegistry.define('font-size', Classes.Custom);

                        }

                        // Verify if elements is not null
                        if ( elements ) {

                            // Create a new element
                            const new_font_size: HTMLElement = document.createElement('font-size');

                            // Set style
                            new_font_size.setAttribute('style', `font-size:${selected_size};`);

                            // Append elements to font size
                            new_font_size.appendChild(elements);  
                            
                            // Replace elements
                            elements = new_font_size;

                        } else {

                            // Create a new element
                            elements = document.createElement('font-size');

                            // Set style
                            elements.setAttribute('style', `font-size:${selected_size};`);

                            // Append text
                            elements.appendChild(text);

                        }

                    }*/

                    // Get the text color
                    const rgba: string = properties.color;

                    // Initialize the Color class
                    const color = new PluginsList.Color();

                    // Set validation rules
                    const is_valid: any = rgba.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
                    
                    // Verify if the rgba is valid
                    if ( is_valid ) {

                        // Extract the rgba
                        const [, r, g, b, a] = is_valid.map(Number);

                        // Convert to hex color
                        const hex: string = color.convert_rgb_to_hex(r, g, b, a || 1);

                        // Get the selected text color
                        const selected_color: string | null | undefined = params.selector.querySelector('.ec-small-text-editor .ec-button-color button')?.getAttribute('data-color');
                        
                        // Verify if the color should be changed
                        if ( selected_color !== hex ) {

                            // Get the text color
                            const text_color: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'color');

                            // Verify if text color exists
                            if ( text_color ) {

                                // Save the node for ending
                                end_list!.push(text_color);

                            }

                            // Get the CustomElementRegistry
                            const customElementRegistry: CustomElementRegistry = window.customElements;                                

                            // Verify if custom element is defined
                            if ( customElementRegistry.get('text-color') ) {

                                // Register a custom element
                                customElementRegistry.define('text-color', Classes.Custom);

                            }

                            // Verify if elements is not null
                            if ( elements ) {

                                // Create a new element
                                const new_text_color: HTMLElement = document.createElement('text-color');

                                // Set style
                                new_text_color.setAttribute('style', `color:${selected_color};`);

                                // Append elements to text color
                                new_text_color.appendChild(elements);  
                                
                                // Replace elements
                                elements = new_text_color;

                            } else {

                                // Create a new element
                                elements = document.createElement('text-color');

                                // Set style
                                elements.setAttribute('style', `color:${selected_color};`);

                                // Append text
                                elements.appendChild(text);

                            }
                        
                        }
                        
                    }

                    // Get the text color
                    /*const text_color: Element | null = new PluginsSmallEditorCore.Font().get_styles(target, 'color');

                    // Verify if text color exists
                    if ( text_color ) {

                        // Get the properties
                        const properties: CSSStyleDeclaration = window.getComputedStyle(text_color);

                        // Get the text color
                        const rgba: string = properties.color;

                        // Initialize the Color class
                        const color = new PluginsList.Color();

                        // Set validation rules
                        const is_valid: any = rgba.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
                        
                        // Verify if the rgba is valid
                        if ( is_valid ) {

                            // Extract the rgba
                            const [, r, g, b, a] = is_valid.map(Number);

                            // Convert to hex color
                            const hex: string = color.convert_rgb_to_hex(r, g, b, a || 1);

                            // Get the selected text color
                            const selected_color: string | null | undefined = params.selector.querySelector('.ec-small-text-editor .ec-button-color button')?.getAttribute('data-color');
                            
                            // Verify if the color should be changed
                            if ( selected_color !== hex ) {

                                // Save the node for ending
                                end_list!.push(text_color);

                                // Get the CustomElementRegistry
                                const customElementRegistry: CustomElementRegistry = window.customElements;                                

                                // Verify if custom element is defined
                                if ( customElementRegistry.get('text-color') ) {

                                    // Register a custom element
                                    customElementRegistry.define('text-color', Classes.Custom);

                                }

                                // Verify if elements is not null
                                if ( elements ) {

                                    // Create a new element
                                    const new_text_color: HTMLElement = document.createElement('text-color');

                                    // Set style
                                    new_text_color.setAttribute('style', `color:${selected_color};`);

                                    // Append elements to text color
                                    new_text_color.appendChild(elements);  
                                    
                                    // Replace elements
                                    elements = new_text_color;

                                } else {

                                    // Create a new element
                                    elements = document.createElement('text-color');

                                    // Set style
                                    elements.setAttribute('style', `color:${selected_color};`);

                                    // Append text
                                    elements.appendChild(text);

                                }
                            
                            }
                            
                        }

                    } else {

                        // Get the selected text color
                        const selected_color: string | null | undefined = params.selector.querySelector('.ec-small-text-editor .ec-button-color button')?.getAttribute('data-color');

                        // Get the CustomElementRegistry
                        const customElementRegistry: CustomElementRegistry = window.customElements;                                

                        // Verify if custom element is defined
                        if ( customElementRegistry.get('text-color') ) {

                            // Register a custom element
                            customElementRegistry.define('text-color', Classes.Custom);

                        }

                        // Verify if elements is not null
                        if ( elements ) {

                            // Create a new element
                            const new_text_color: HTMLElement = document.createElement('text-color');

                            // Set style
                            new_text_color.setAttribute('style', `color:${selected_color};`);

                            // Append elements to text color
                            new_text_color.appendChild(elements);  
                            
                            // Replace elements
                            elements = new_text_color;

                        } else {

                            // Create a new element
                            elements = document.createElement('text-color');

                            // Set style
                            elements.setAttribute('style', `color:${selected_color};`);

                            // Append text
                            elements.appendChild(text);

                        }

                    }*/

                    // Get the parent element
                    let parent_element: Element | null = range.startContainer.parentElement;

                    // Check if parent element exists
                    if ( parent_element ) {

                        // List the childrens
                        for ( const child of target.closest('.ec-element-content-data')!.children ) {

                            // Check if parent element was found
                            if ( this.children_list(child).indexOf(parent_element) > -1 ) {

                                // Replace the parent element
                                parent_element = child;

                                break;

                            }

                        }
                       
                        // Check if end_list exists
                        if ( end_list.length > 0 ) {

                            // Get parent element nodes
                            const parent_element_nodes: Array<Node> | undefined = this.nodes_list(parent_element);   
                            
                            // Verify if nodes exists
                            if ( parent_element_nodes ) {

                                // Create a node start for the new range
                                const node_start: Text = document.createTextNode('');

                                // Insert the node start
                                range.insertNode(node_start);

                                // Last child
                                let last_child: Node | null = null;
                                
                                // List the nodes
                                for ( const node of parent_element_nodes ) {

                                    // Check if is last node
                                    if ( range.commonAncestorContainer.isSameNode(node) ) {

                                        // Set last child
                                        last_child = node;

                                    }                                

                                }
                                
                                // Verify if a selected child was selected
                                if ( last_child ) {

                                    // Get the parents
                                    const parents = this.prepare_tags(range.startContainer, parent_element, node_start, end_list);
                                    
                                    // Verify if parents is not null
                                    if ( parents ) {
                                        e.preventDefault();
                
                                        // Create a new Range object
                                        const new_range: Range = document.createRange();

                                        // Replace the childs
                                        parents.parent.replaceChildren(...parents.child);
              
                                        // Get the nodes
                                        let nodes: Array<Node> = this.nodes_list(parents.parent);

                                        // Check if elements exists
                                        if ( elements ) {

                                            // Replace node start
                                            nodes[Array.from(nodes).indexOf(node_start)].parentElement?.replaceChild(elements, node_start);

                                        } else {

                                            // Replace node start
                                            nodes[Array.from(nodes).indexOf(node_start)].parentElement?.replaceChild(text, node_start);

                                        }

                                        // List the paren't nodes
                                        for ( const node of parents.parent.parentElement!.childNodes ) {

                                            // Save node as child
                                            const child: Node = node;
    
                                            // Verify if the node is same as parent
                                            if ( node.isSameNode(parents.parent) ) {

                                                // List all childs
                                                while (child.firstChild) {

                                                    // Move the child before the node
                                                    parents.parent.parentElement!.insertBefore(child.firstChild, child);

                                                }
                                                
                                                // Remove the empty node
                                                parents.parent.parentElement!.removeChild(child);
                                                break;
                                              
                                            }

                                        }

                                        // Restart the nodes list
                                        nodes = this.nodes_list(parent_element);

                                        // Set range start by using the new created text node
                                        new_range.setStart(nodes[Array.from(nodes).indexOf(text)], text.length);
                
                                        // Verify if the selection is not null
                                        if ( selection ) {
                
                                            // Remove all ranges
                                            selection.removeAllRanges();
                
                                            // Add the newly created range to the selection
                                            selection.addRange(new_range);
                
                                            // Make active the content editable editor
                                            (parent_element.closest('.ec-element-content-data') as HTMLInputElement)!.focus();
                
                                        }
                
                                    }

                                }

                            }

                        } else if ( elements ) {
                            e.preventDefault();

                            // Replace range with created elements
                            range.insertNode(elements);

                            // Create a new Range object
                            const new_range: Range = document.createRange();

                            // Get the nodes
                            const nodes: Array<Node> = this.nodes_list(parent_element);

                            // Set range start by using the new created text node
                            new_range.setStart(nodes[Array.from(nodes).indexOf(text)], text.length);

                            // Verify if the selection is not null
                            if ( selection && target.parentElement ) {

                                // Remove all ranges
                                selection.removeAllRanges();

                                // Add the newly created range to the selection
                                selection.addRange(new_range);

                                // Make active the content editable editor
                                (parent_element.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                            }

                        }

                    }

                }

            }

        }

        /**
         * Prepare the selected text by adding tags
         * 
         * @param Node node where is the active range
         * @param Element until the parents should be collected
         * @param Text node_start is a marker
         * @param Array<Node> end_list
         * 
         * @returns object | null
         */
        prepare_tags = (node: Node, until: Element, node_start: Text, end_list: Array<Node>): { parent: Element, child: NodeListOf<ChildNode> } | null => {

            // Response container
            let response: {
                parent: Element,
                child: NodeListOf<ChildNode>
            } | null = null;

            // Total ends
            let total_ends: number = end_list.length;   
            
            // Tags to start all elements
            const tags_to_start: string[] = [];            

            // Tags to end all elements
            const tags_to_end: string[] = [];

            // Tags to start only unclosed elements
            const tags_to_start_2: string[] = [];            

            // Tags to end only unclosed elements
            const tags_to_end_2: string[] = [];
          
            // Start with the given element
            let currentElement = node.parentElement;

            // First parent of all content
            let first_parent: Element | null = null;
            
            // Traverse the DOM hierarchy until we reach the top
            while (currentElement) {

                // Verify if the tag should be just ended
                if ( end_list.indexOf(currentElement as Node) > -1 ) {
                    
                    // Decrease the array with ends tags
                    total_ends--;

                } else {

                    // Add tag to start all elements
                    tags_to_start_2.push(currentElement.outerHTML.split('>').shift() + '>');                

                    // Add tag to end all elements
                    tags_to_end_2.push('<' + currentElement.outerHTML.split('<').slice(-1)[0]);

                }
                
                // Add tag to start all elements
                tags_to_start.push(currentElement.outerHTML.split('>').shift() + '>');                

                // Add tag to end all elements
                tags_to_end.push('<' + currentElement.outerHTML.split('<').slice(-1)[0]);

                // Check if is the end
                if ( currentElement.parentElement!.isSameNode(until) ) {
                    first_parent = currentElement;
                    break;
                }                
          
                // Replace the current element
                currentElement = currentElement.parentElement;

            }

            // Check if first parent exists
            if ( first_parent ) {

                // Verify if after the node start exists text
                const text_after_range: Boolean = this.is_end(first_parent as Node, node_start, 0, false);

                // If text exists should be created new tags
                if ( text_after_range ) {

                    // Generate unique ID
                    const unique_id: string = 'ec-small-editor-temp-' + this.generate_unique_id();

                    // Create sup
                    const sup: Element = document.createElement('sup');

                    // Set data content
                    sup.setAttribute('data-content', unique_id);

                    // Turn nodes to string
                    const nodes_to_string: string = this.turn_nodes_to_text(first_parent, node_start, '', tags_to_end.join('') + tags_to_start_2.reverse().join('') + sup.outerHTML + tags_to_end_2.join('') + tags_to_start.reverse().join(''));

                    // Load dom parser
                    const dom_parser: DOMParser = new DOMParser();

                    // Prepare the nodes
                    const content_nodes: Document = dom_parser.parseFromString(nodes_to_string, 'text/html');

                    // Add node start to content nodes
                    content_nodes.getElementsByTagName('body')[0].appendChild(node_start);

                    // Get sup in the response
                    const sup_el: Element | null = content_nodes.querySelector('sup[data-content="' + unique_id + '"]');

                    // Check if sup exists
                    if ( sup_el ) {

                        // Replace sup
                        sup_el.replaceWith(node_start); 

                        // Add first parent to the response
                        response = {
                            parent: first_parent,
                            child: content_nodes.getElementsByTagName('body')[0].childNodes
                        };

                    }

                } else {

                    // Generate unique ID
                    const unique_id: string = 'ec-small-editor-temp-' + this.generate_unique_id();

                    // Create sup
                    const sup: Element = document.createElement('sup');

                    // Set data content
                    sup.setAttribute('data-content', unique_id);

                    // Turn nodes to string
                    const nodes_to_string: string = this.turn_nodes_to_text(first_parent, node_start, '', '');

                    // Load dom parser
                    const dom_parser: DOMParser = new DOMParser();

                    // Prepare the nodes
                    const content_nodes: Document = dom_parser.parseFromString(nodes_to_string + tags_to_start_2.reverse().join('') + sup.outerHTML + tags_to_end_2.join(''), 'text/html');

                    // Add node start to content nodes
                    content_nodes.getElementsByTagName('body')[0].appendChild(node_start);

                    // Get sup in the response
                    const sup_el: Element | null = content_nodes.querySelector('sup[data-content="' + unique_id + '"]');

                    // Check if sup exists
                    if ( sup_el ) {

                        // Replace sup
                        sup_el.replaceWith(node_start); 

                        // Add first parent to the response
                        response = {
                            parent: first_parent,
                            child: content_nodes.getElementsByTagName('body')[0].childNodes
                        };

                    }

                }

            }

            return response;

        }

        /**
         * Verify if after the range exists text
         * 
         * @param Node parent when the selection starts
         * @param Text node_start is a marker
         * @param number marker for checking if text exists
         * @param Boolean exists is used as response
         * 
         * @returns Boolean
         */
        is_end = (parent: Node, node_start: Text, marker: number, exists: Boolean): Boolean => {

            // Check if parent is null
            if ( !parent ) {
                return exists;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Verify if is the sup marker
                        if ( node.isSameNode(node_start) ) {

                            marker = 1;
                        }

                        // Verify if marker is enabled and if text exists
                        if ( (marker > 0) && (node.textContent!.length > 0) ) {

                            // Set true about text after range
                            exists = true;

                        }

                    } else {

                        // Process the children
                        exists = this.is_end(node, node_start, marker, exists);

                    }

                }

            }

            return exists;

        }

        /**
         * Turn nodes to text
         * 
         * @param Node parent when the selection starts
         * @param Text node_start is a marker
         * @param string html with response
         * @param string tags to add in the text
         * 
         * @returns string with text
         */
        turn_nodes_to_text = (parent: Node, node_start: Text, html: string, tags: string): string => {

            // Check if parent is null
            if ( !parent ) {
                return html;
            }

            // Verify if node list exists
            if ( parent.childNodes.length > 0 ) {

                // Get html node
                const html_node = parent as HTMLElement;

                // Node container
                let node_string: string = html_node.outerHTML.split('>').shift() + '>';

                // Node end html
                const node_end: string = '<' + html_node.outerHTML.slice(html_node.outerHTML.lastIndexOf('<') + 1);

                // List the nodes
                for ( const node of parent.childNodes ) {

                    // Verify if is text
                    if ( node.nodeName === '#text' ) {

                        // Check if is node start
                        if ( node_start.isSameNode(node) && (tags.length > 0) ) {

                            // Set tags
                            node_string += tags;

                        } else {

                            // Add node to the list
                            node_string += node.textContent;

                        }

                    } else {

                        // Check if node is an element node
                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Create element from node
                            const element = node as HTMLElement;
                            
                            // Check if the tag is empty
                            if ( element.childNodes.length < 1 ) {

                                // Set html
                                node_string += element.outerHTML;

                            }

                        }

                        // Process the children
                        node_string += this.turn_nodes_to_text(node, node_start, '', tags);

                    }

                }


                // Set node end to string
                node_string += node_end;

                // Add node_string to list
                html += node_string;

            }

            return html;

        }

        /*---------------------- METODS FOR ADDING/REMOVING LISTS ------------------------*/

        /**
         * Add or remove lists
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        list = (e: MouseEvent, params: params_type): void => {

            // Get iframe for template
            const itemplate = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Get content window
            const cwindow: Window | null = itemplate.contentWindow;

            // Create a new Selection object
            const selection: Selection | null = cwindow!.getSelection();

            // Remove selections in the iframe
            if ( selection && (selection.rangeCount > 0) ) {

                // Get range
                const range: Range = selection.getRangeAt(0);

                // Get target
                const target = e.target as HTMLElement;

                // Get range parent element
                let parent_element: HTMLElement | null = range.commonAncestorContainer.parentElement;

                // Verify if the range is inside the paragraph
                if ( (range.commonAncestorContainer.nodeName === 'P') || (parent_element && (parent_element.closest('p') || parent_element.nodeName === 'P') ) ) {

                    // Add the ec-ste-active-button class
                    target.classList.add('ec-ste-active-button');

                    // Get the paragraph
                    const p = (range.commonAncestorContainer.nodeName === 'P')?range.commonAncestorContainer as Element:parent_element!.closest('p') as Element || parent_element as Element;

                    // Create a node start for the new range
                    const node_start: Text = document.createTextNode('');

                    // Insert the node start
                    range.insertNode(node_start);

                    // Create ul or ol
                    const parent: Element = target.classList.contains('ec-ste-list-bulleted-button')?document.createElement('ul'):document.createElement('ol');

                    // Create a li
                    const li: HTMLLIElement = document.createElement('li');

                    // Append paragraph to li
                    li.replaceChildren(...p.childNodes);

                    // Append as child to the parent
                    parent.appendChild(li);

                    // Replace paragraph
                    p.replaceWith(parent);

                    // Get the nodes of the parent
                    const nodes: Array<Node> = this.nodes_list(parent);

                    // Create a new Range object
                    const new_range: Range = document.createRange();

                    // Set range start by using the new created text node
                    new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                    // Verify if the selection is not null
                    if ( selection && target.parentElement ) {

                        // Remove all ranges
                        selection.removeAllRanges();

                        // Add the newly created range to the selection
                        selection.addRange(new_range);

                        // Make active the content editable editor
                        (parent.closest('.ec-element-content-data') as HTMLInputElement)!.focus();

                    }

                } else if ( parent_element && parent_element.closest('li') ) {

                    // Check if ul or ol list is selected
                    if ( target.classList.contains('ec-ste-list-bulleted-button') || target.classList.contains('ec-ste-list-numbered-button') ) {

                        // Verify if closest ec-ste-active-button class exists
                        if ( target.classList.contains('ec-ste-active-button') ) {

                            // Verify if the ul list has only one item
                            if ( (parent_element.closest('ul') && parent_element.closest('ul')!.childNodes.length < 2) || (parent_element.closest('ol') && parent_element.closest('ol')!.childNodes.length < 2) ) {

                                // Remove the ec-ste-active-button class
                                target.classList.remove('ec-ste-active-button');

                                // Get the ul
                                const ul: HTMLElement | null = parent_element.closest('ul')?parent_element.closest('ul'):parent_element.closest('ol');

                                // Get the li item
                                const li: HTMLElement | null = parent_element.closest('li');

                                // Verify if li is not null
                                if ( ul && li ) {

                                    // Get content data
                                    const content_data = (ul.closest('.ec-element-content-data') as HTMLInputElement);

                                    // Get the parent element
                                    let parent_element: Element | null = range.startContainer.parentElement;

                                    // Create a node start for the new range
                                    const node_start: Text = document.createTextNode('');

                                    // Insert the node start
                                    range.insertNode(node_start);

                                    // Create a paragraph
                                    const p: HTMLElement = document.createElement('p');

                                    // Append the li nodes to paragraph
                                    p.replaceChildren(...li.childNodes);

                                    // Replace paragraph
                                    ul.replaceWith(p);

                                    // Check if parent element exists
                                    if ( parent_element ) {

                                        // List the childrens
                                        for ( const child of content_data!.children ) {

                                            // Check if parent element was found
                                            if ( this.nodes_list(child).indexOf(node_start) > -1 ) {

                                                // Replace the parent element
                                                parent_element = child;

                                                break;

                                            }

                                        }

                                    }
                                    
                                    // Get the nodes of the parent
                                    const nodes: Array<Node> = this.nodes_list(p);

                                    // Create a new Range object
                                    const new_range: Range = document.createRange();

                                    // Set range start by using the new created text node
                                    new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                    // Verify if the selection is not null
                                    if ( selection ) {

                                        // Remove all ranges
                                        selection.removeAllRanges();

                                        // Add the newly created range to the selection
                                        selection.addRange(new_range);

                                        // Make active the content editable editor
                                        content_data!.focus();

                                    }

                                }

                            } else {

                                // Remove the ec-ste-active-button class
                                target.classList.remove('ec-ste-active-button');

                                // Get the ul
                                const ul: HTMLElement | null = parent_element.closest('ul')?parent_element.closest('ul'):parent_element.closest('ol');

                                // Get the li item
                                const li: HTMLElement | null = parent_element.closest('li');

                                // Verify if li is not null
                                if ( ul && li ) {

                                    // Create a node start for the new range
                                    const node_start: Text = document.createTextNode('');

                                    // Insert the node start
                                    range.insertNode(node_start);

                                    // Get content data
                                    const content_data = (ul.closest('.ec-element-content-data') as HTMLInputElement);

                                    // Get total child nodes
                                    const tnodes: number = ul.childNodes.length;

                                    // Clone ul
                                    const cloned_ul: Node = ul.cloneNode(true);

                                    // List the child
                                    Array.from(cloned_ul.childNodes).map(() => {
                                        cloned_ul.childNodes[0].remove();
                                    });

                                    // This is a container to save the ul items before paragraph
                                    const before_ul_empty = cloned_ul as HTMLUListElement;

                                    // This is a container to save the ul items after paragraph
                                    const after_ul_empty = cloned_ul.cloneNode(true) as HTMLUListElement;

                                    // Create the before list with li items
                                    const before_li: DocumentFragment = new DocumentFragment();

                                    // Create the after list with li items
                                    const after_li: DocumentFragment = new DocumentFragment();

                                    // Selected li
                                    const sel_index: number = Array.prototype.indexOf.call(Array.from(ul.getElementsByTagName('li')), li);

                                    // Create a paragraph
                                    const p: HTMLElement = document.createElement('p');

                                    // Li index
                                    let index: number = 0;

                                    // List the childrens
                                    for ( let c = 0; c < tnodes; c++ ) {

                                        // Check if child is same as li
                                        if ( c === sel_index ) {

                                            // Increase index
                                            index++;

                                            // Append the li nodes to paragraph
                                            p.replaceChildren(...ul.childNodes[0].childNodes);

                                            // Remove child
                                            ul.removeChild(ul.childNodes[0]);

                                        } else {

                                            // Verify if index is 0 and the item should be added in the before ul list
                                            if ( index < 1 ) {

                                                // Append li item
                                                before_li.appendChild(ul.childNodes[0]);

                                            } else {

                                                // Append li item
                                                after_li.appendChild(ul.childNodes[0]);

                                            }

                                        }


                                    }
                                    
                                    // Check if before_li is not empty
                                    if ( before_li.childElementCount > 0 ) {
                                        
                                        // Append before li
                                        before_ul_empty.append(before_li);

                                        // Insert before ul
                                        content_data.insertBefore(before_ul_empty, ul);
                                        
                                    }

                                    // Insert before ul
                                    content_data.insertBefore(p, ul);

                                    // Check if after_li is not empty
                                    if ( after_li.childElementCount > 0 ) {
                                        
                                        // Append after li
                                        after_ul_empty.append(after_li);

                                        // Insert before ul
                                        content_data.insertBefore(after_ul_empty, ul);

                                    }

                                    // Remove ul
                                    content_data.removeChild(ul);

                                    // Check if parent element exists
                                    if ( parent_element ) {

                                        // List the childrens
                                        for ( const child of content_data!.children ) {

                                            // Check if parent element was found
                                            if ( this.nodes_list(child).indexOf(node_start) > -1 ) {

                                                // Replace the parent element
                                                parent_element = child as HTMLElement;

                                                break;

                                            }

                                        }

                                    }
                                    
                                    // Get the nodes of the parent
                                    const nodes: Array<Node> = this.nodes_list(p);

                                    // Create a new Range object
                                    const new_range: Range = document.createRange();

                                    // Set range start by using the new created text node
                                    new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                    // Verify if the selection is not null
                                    if ( selection ) {

                                        // Remove all ranges
                                        selection.removeAllRanges();

                                        // Add the newly created range to the selection
                                        selection.addRange(new_range);

                                        // Make active the content editable editor
                                        content_data!.focus();

                                    }

                                }

                            }

                        } else {

                            // Remove the ec-ste-active-button class
                            target.closest('.ec-ste-group-buttons')!.getElementsByClassName('ec-ste-active-button')[0].classList.remove('ec-ste-active-button')

                            // Add the ec-ste-active-button class
                            target.classList.add('ec-ste-active-button');
                            
                            // Create a node start for the new range
                            const node_start: Text = document.createTextNode('');

                            // Insert the node start
                            range.insertNode(node_start);

                            // Check if closest parent is ul
                            if ( parent_element.closest('ul') ) {

                                // Select the <ul> element you want to convert
                                const ul: HTMLUListElement | null = parent_element.closest('ul');

                                // Verify if ul exists
                                if (ul) {

                                    // Get content data
                                    const content_data = (ul.closest('.ec-element-content-data') as HTMLInputElement);

                                    // Create a new <ol> element
                                    const ol: HTMLOListElement = document.createElement('ol');

                                    // Get all li nodes
                                    const li: NodeListOf<HTMLLIElement> = ul.querySelectorAll('li');

                                    // List all ul items
                                    li.forEach((item) => {

                                        // Append li to ol
                                        ol.appendChild(item);

                                    });

                                    // Replace the <ul> element with the <ol> element
                                    ul.replaceWith(ol);

                                    // Get the nodes of the parent
                                    const nodes: Array<Node> = this.nodes_list(ol);

                                    // Create a new Range object
                                    const new_range: Range = document.createRange();

                                    // Set range start by using the new created text node
                                    new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                    // Verify if the selection is not null
                                    if ( selection ) {

                                        // Remove all ranges
                                        selection.removeAllRanges();

                                        // Add the newly created range to the selection
                                        selection.addRange(new_range);

                                        // Make active the content editable editor
                                        content_data!.focus();

                                    }

                                }

                            } else {

                                // Select the <ol> element
                                const ol: HTMLOListElement | null = parent_element.closest('ol');

                                // Verify if ol exists
                                if ( ol ) {

                                    // Get content data
                                    const content_data = (ol.closest('.ec-element-content-data') as HTMLInputElement);

                                    // Create a new <ul> element
                                    const ul: HTMLUListElement = document.createElement('ul');

                                    // Get all li nodes
                                    const li: NodeListOf<HTMLLIElement> = ol.querySelectorAll('li');

                                    // List all ol items
                                    li.forEach((item) => {

                                        // Append li to ul
                                        ul.appendChild(item);

                                    });

                                    // Replace the <ol> element with the <ul> element
                                    ol.replaceWith(ul);

                                    // Get the nodes of the parent
                                    const nodes: Array<Node> = this.nodes_list(ul);

                                    // Create a new Range object
                                    const new_range: Range = document.createRange();

                                    // Set range start by using the new created text node
                                    new_range.setStart(nodes[Array.from(nodes).indexOf(node_start)], 0);

                                    // Verify if the selection is not null
                                    if ( selection ) {

                                        // Remove all ranges
                                        selection.removeAllRanges();

                                        // Add the newly created range to the selection
                                        selection.addRange(new_range);

                                        // Make active the content editable editor
                                        content_data!.focus();

                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

        /*---------------------- METHODS TO IDENTIFY STYLES ------------------------*/

        /**
         * Get styles and enable/disable buttons
         * 
         * @param KeyboardEvent | MouseEvent e
         * @param params_type params
         */
        get_styles = (e: KeyboardEvent | MouseEvent, params: params_type): void => {
            
            // Save target
            const target = e.target as Element;

            // Check for target
            if ( target !== null ) {

                // Check if the click is inside the text element
                if ( target.closest('.ec-element-content-data') ) {
                   
                    // Get element
                    const element: HTMLElement | null = target.closest('.ec-element-content');

                    // Get the element's id
                    const element_id: string | null | undefined = element?.getAttribute('data-id');                                

                    // Get the element's name
                    const element_name: string | null | undefined = element?.getAttribute('data-name');

                    // Check if name exists
                    if ( typeof element_name === 'string' ) {

                        // Select text tools editor
                        const tools_editor: Element = params.selector.getElementsByClassName('ec-small-text-editor')[0];

                        // Verify if the element's ID is already present
                        if ( params.selector.getElementsByClassName('ec-composer-element-options')[0].getAttribute('data-element') !== element_id ) {

                            // Check if element's name is text
                            if ( (element_name === 'text') && !tools_editor.classList.contains('ec-ste-show') ) {

                                // Add ec-small-text-editor class to the text editor
                                tools_editor.classList.add('ec-ste-show');

                            } else if ( (element_name !== 'text') && tools_editor.classList.contains('ec-ste-show') ) {

                                // Remove ec-small-text-editor class to the text editor
                                tools_editor.classList.remove('ec-ste-show');

                            }                        

                        }

                        // Check if the small editor tools are showed
                        if ( (element_name === 'text') && tools_editor.classList.contains('ec-ste-show') ) {

                            // Get iframe
                            const iframe = params.selector.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                            // Get content window
                            const cwindow: Window | null = iframe.contentWindow;

                            // Check if cwindow exists
                            if ( cwindow ) {
                                
                                // Check if the click was done inside ec-element-content-data
                                if ( target.closest('.ec-element-content-data') ) {

                                    // Remove the active class
                                    params.selector.getElementsByClassName('ec-ste-active-button')[0]?.classList.remove('ec-ste-active-button');

                                    // Get the styles
                                    const styles: CSSStyleDeclaration = window.getComputedStyle(target);
                                    
                                    // Check if styles is not null
                                    if ( styles ) {

                                        // Get the textAlign
                                        const text_align: string = styles.textAlign;

                                        // Check if the direction is allowed
                                        if ( this.text_align_directions.includes(text_align) ) {

                                            // Add the ec-ste-active-button class
                                            params.selector.querySelector('.ec-ste-align-button[data-direction="' + text_align + '"]')!.classList.add('ec-ste-active-button');

                                        }

                                        // Get the font style
                                        const font_style: string = styles.fontStyle; 

                                        // Verify if text is italic
                                        if ( (font_style === 'italic') || target?.closest('i') ) {

                                            // Add the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-italic-button')[0].classList.add('ec-ste-active-button');

                                        } else {

                                            // Remove the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-italic-button')[0].classList.remove('ec-ste-active-button');                                                        

                                        }

                                        // Get the text decoration
                                        const text_decoration: string = styles.textDecoration;
                                        
                                        // Verify if text is underline
                                        if ( (text_decoration.search('underline') > -1) || target?.closest('u') ) {

                                            // Add the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-underlined-button')[0].classList.add('ec-ste-active-button');

                                        } else {

                                            // Remove the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-underlined-button')[0].classList.remove('ec-ste-active-button');                                                        

                                        }                                        

                                        // Check if the text has the strikethrough tag
                                        if ( target?.closest('s') ) {

                                            // Add the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-strikethrough-button')[0].classList.add('ec-ste-active-button');

                                        } else {

                                            // Remove the ec-ste-active-button class
                                            params.selector.getElementsByClassName('ec-ste-format-strikethrough-button')[0].classList.remove('ec-ste-active-button');                                                        

                                        }

                                        // Set a pause
                                        setTimeout((): void => {

                                            // Create a new Selection object
                                            const selection: Selection | null = cwindow!.getSelection();

                                            // Remove selections in the iframe
                                            if ( selection && (selection.rangeCount > 0) ) {

                                                // Get range
                                                const range: Range = selection.getRangeAt(0);

                                                // Default styles container
                                                let styles: CSSStyleDeclaration | null = null;

                                                // Check if a near paragraph exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('p') ) {

                                                    // Get the styles
                                                    styles = window.getComputedStyle(range.commonAncestorContainer.parentElement!.closest('p') as Element);                                                    

                                                } else if (range.commonAncestorContainer.nodeName === 'P') {

                                                    // Get the styles
                                                    styles = window.getComputedStyle(range.commonAncestorContainer.parentElement as Element);   

                                                } else if ( range.commonAncestorContainer.parentElement!.closest('li') ) {

                                                    // Get the styles
                                                    styles = window.getComputedStyle(range.commonAncestorContainer.parentElement!.closest('li') as Element);                                                    

                                                } else if (range.commonAncestorContainer.nodeName === 'LI') {

                                                    // Get the styles
                                                    styles = window.getComputedStyle(range.commonAncestorContainer.parentElement as Element);   

                                                }

                                                // Check if styles is not null
                                                if ( styles ) {

                                                    // Get the textAlign
                                                    const text_align: string = styles.textAlign;

                                                    // Check if the direction is allowed
                                                    if ( this.text_align_directions.includes(text_align) ) {

                                                        // Add the ec-ste-active-button class
                                                        params.selector.querySelector('.ec-ste-align-button[data-direction="' + text_align + '"]')!.classList.add('ec-ste-active-button');

                                                    }

                                                }
                                        
                                                // Verify if italic exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('i') || (range.commonAncestorContainer.nodeName === 'I') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-format-italic-button')[0].classList.add('ec-ste-active-button');

                                                } 
                                                
                                                // Verify if underlined exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('u') || (range.commonAncestorContainer.nodeName === 'U') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-format-underlined-button')[0].classList.add('ec-ste-active-button');

                                                } 
                                                
                                                // Verify if strikethrough exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('s') || (range.commonAncestorContainer.nodeName === 'S') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-format-strikethrough-button')[0].classList.add('ec-ste-active-button');

                                                }

                                                // Check if ul exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('ul') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-list-bulleted-button')[0].classList.add('ec-ste-active-button');                                                    
                                                    
                                                } else {

                                                    // Remove the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-list-bulleted-button')[0].classList.remove('ec-ste-active-button');  
                                                    
                                                }

                                                // Check if ol exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('ol') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-list-numbered-button')[0].classList.add('ec-ste-active-button');                                                    
                                                    
                                                } else {

                                                    // Remove the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-list-numbered-button')[0].classList.remove('ec-ste-active-button');  
                                                    
                                                }  
                                                
                                                // Check if a exists
                                                if ( range.commonAncestorContainer.parentElement!.closest('a') || (range.commonAncestorContainer.nodeName === 'A') ) {

                                                    // Add the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-add-link-button')[0].classList.add('ec-ste-active-button');

                                                    // Check if is a click
                                                    if ( e.type === 'mousedown' ) {

                                                        // Show box
                                                        new PluginsSmallEditorCore.Link().add_box(e as MouseEvent, params);

                                                    } else {

                                                        // Verify if the link box was already added
                                                        if ( params.selector.getElementsByClassName('ec-ste-link-box').length > 0 ) {

                                                            // Remove link box
                                                            params.selector.getElementsByClassName('ec-ste-link-box')[0].remove();

                                                        }

                                                    }
                                                    
                                                } else {

                                                    // Remove the ec-ste-active-button class
                                                    params.selector.getElementsByClassName('ec-ste-add-link-button')[0].classList.remove('ec-ste-active-button');  
                                                    
                                                } 
                                                
                                                // Auto select font and color
                                                new PluginsSmallEditorCore.Font().identify_font(e, params);

                                            }

                                        }, 100);

                                    }

                                }

                            }

                        }

                        // Get the namespace
                        const name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, 'ResourcesElements' + element_name.charAt(0).toUpperCase() + element_name.substring(1))?.value.Resources.Elements;

                        // Verify if the element exists
                        if ( typeof name_space !== 'undefined' ) {

                            // Get the namespace
                            const name_space: {[key: string]: any} = Object.getOwnPropertyDescriptor(elements, 'ResourcesElements' + element_name.charAt(0).toUpperCase() + element_name.substring(1))?.value.Resources.Elements;

                            // Get key
                            const key = Object.keys(name_space)[0] as string;

                            // Get the element class
                            const element_class = new name_space[key]();

                            // Get the element's options
                            const element_options: options_type = element_class.get_options(params);
                            
                            // Verify if the element has options
                            if ( element_options ) {

                                // Verify if options for desktop exists
                                if ( element_options.desktop.length > 0 ) {

                                    // Desktop elements
                                    const desktop_elements: string[] = [];

                                    // List the options groups
                                    for ( const group of element_options.desktop ) {

                                        // Check if the option has element
                                        if ( group.list.length > 0 ) {

                                            // List the options
                                            for ( const option of group.list ) {

                                                // Verify if the option has element
                                                if ( option.element && (desktop_elements.indexOf(option.element) < 0) ) {

                                                    // Add element to the desktop elements
                                                    desktop_elements.push(option.element);

                                                }

                                            }

                                        }

                                    }

                                    // Desktop properties list
                                    const desktop_properties_list: {[key: string]: {[key: string]: number | string}} = {};

                                    // Mobile properties list
                                    const mobile_properties_list: {[key: string]: {[key: string]: number | string}} = {};

                                    // Get iframe for template
                                    const iframe_template: HTMLCollectionOf<Element> = params.selector.getElementsByClassName('ec-composer-template-container');

                                    // Check if iframe exists
                                    if ( iframe_template[0] instanceof HTMLIFrameElement ) {

                                        // Get the iframe document
                                        const idocument: Document | null = iframe_template[0].contentDocument;

                                        // Check if document is not null
                                        if ( idocument !== null ) {

                                            // Get element's style
                                            const element_style: Element | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                            // Verify if element's style exists
                                            if ( (typeof element_style !== 'undefined') && element_style ) {

                                                // Get the style tag
                                                const style: HTMLStyleElement | null | undefined = iframe_template[0].contentDocument?.head.querySelector('style[data-element="' + element_id + '"]');

                                                // Check if style exists
                                                if ( (typeof style !== 'undefined') && style ) {

                                                    // Get the sheet
                                                    const sheet: CSSStyleSheet | null = style.sheet;

                                                    // Check if sheet exists
                                                    if ( sheet !== null ) {
                                                        
                                                        // Verify if rules exists
                                                        if ( sheet.cssRules.length > 0 ) {

                                                            // List all rules
                                                            for ( const rule of sheet.cssRules ) {

                                                                // Check if media exists
                                                                if ( typeof (rule as CSSMediaRule).media !== 'undefined' ) {

                                                                    // Verify if is a mobile view
                                                                    if ( (rule as CSSMediaRule).conditionText.replaceAll(' ', '').search('(max-width:600px)') > -1 ) {

                                                                        // Verify if rules exists
                                                                        if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                                                            // List all rules
                                                                            for ( const media_rule of (rule as CSSMediaRule).cssRules ) {

                                                                                // Check if is the element's selector
                                                                                if ( (media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data' ) {

                                                                                    // Get style
                                                                                    const style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                                                                    // List the properties
                                                                                    for ( const property of (media_rule as CSSStyleRule).style ) {
                                                                                        
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

                                                                } else {
                                                                    
                                                                    // Check if is the element's selector
                                                                    if ( (rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data' ) {

                                                                        // Get style
                                                                        const style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                                                                        // List the properties
                                                                        for ( const property of (rule as CSSStyleRule).style ) {

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

                                                                    // Verify if desktop elements exists
                                                                    if ( desktop_elements.length > 0 ) {

                                                                        // List the elements
                                                                        for ( const element_name of desktop_elements ) {

                                                                            if ( ((rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name) ) {

                                                                                // Get style
                                                                                const style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                                                                                // List the properties
                                                                                for ( const property of (rule as CSSStyleRule).style ) {

                                                                                    // Verify if element's name is already saved
                                                                                    if ( typeof desktop_properties_list[element_name] !== 'undefined' ) {

                                                                                        // Save style
                                                                                        desktop_properties_list[element_name][property] = style.getPropertyValue(property);

                                                                                    } else {

                                                                                        // Save style
                                                                                        desktop_properties_list[element_name] = {
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

                                    // Verify if the element's ID is already present
                                    if ( params.selector.getElementsByClassName('ec-composer-element-options')[0].getAttribute('data-element') !== element_id ) {

                                        // Get the options class
                                        const options_class: Element = params.selector.getElementsByClassName('ec-composer-element-options')[0];                                        

                                        // Verify if the ec-composer-element-options-show class exists
                                        if ( options_class.classList.contains('ec-composer-element-options-show') ) {

                                            // Remove the ec-composer-element-options-show class
                                            options_class.classList.remove('ec-composer-element-options-show');

                                            // Add the ec-composer-element-options-hide class
                                            options_class.classList.add('ec-composer-element-options-hide');

                                        }

                                        // Set pause
                                        setTimeout((): void => {

                                            // Remove the ec-composer-element-options-hide class
                                            options_class.classList.remove('ec-composer-element-options-hide');
                                            
                                            // Add ec-composer-element-options-show class
                                            options_class.classList.add('ec-composer-element-options-show');

                                            // Remove ec-template-code-hide-button class
                                            params.selector.getElementsByClassName('ec-template-code-button')[0].classList.remove('ec-template-code-hide-button');    
                                            
                                            // Remove ec-composer-container-template-and-code class
                                            params.selector.getElementsByClassName('ec-composer-container')[0].classList.remove('ec-composer-container-template-and-code'); 

                                            // Check if ec-element-content-active exists
                                            if ( target.closest('.ec-composer-template')!.getElementsByClassName('ec-element-content-active').length > 0 ) {

                                                // Get active class
                                                const active: Element = target.closest('.ec-composer-template')!.getElementsByClassName('ec-element-content-active')[0];

                                                // Remove ec-element-content-active class
                                                active.classList.remove('ec-element-content-active');

                                            }

                                            // Add element id
                                            options_class.setAttribute('data-element', element_id!);
                                            
                                            // Add ec-element-content-active class
                                            target.closest('.ec-element-content')!.classList.add('ec-element-content-active');
                                            
                                            // Get html for options
                                            const desktop_html: string | undefined = get_element_options(element_options, desktop_properties_list, params, 'desktop');

                                            // Check if html exists
                                            if ( typeof desktop_html !== 'undefined' ) {

                                                // Set sections
                                                params.selector.querySelector('.ec-composer-element-options .ec-sections[data-scope="desktop"]')!.innerHTML = desktop_html;

                                            }

                                            // Get html for options
                                            const mobile_html: string | undefined = get_element_options(element_options, mobile_properties_list, params, 'mobile');

                                            // Check if html exists
                                            if ( typeof mobile_html !== 'undefined' ) {

                                                // Set sections
                                                params.selector.querySelector('.ec-composer-element-options .ec-sections[data-scope="mobile"]')!.innerHTML = mobile_html;

                                            }

                                        }, 100);                                        

                                    }

                                }

                            } else {

                                // Show error message
                                show_message(params.words('error_name') + ': ' + params.words('no_element_options_found'));

                            }

                        } else {

                            // Show error message
                            show_message(params.words('error_name') + ': ' + params.words('no_element_found'));

                        }

                    } else {

                        // Show error message
                        show_message(params.words('error_name') + ': ' + params.words('no_element_found'));

                    }

                }

            }

        }
        
        /*---------------------- GENERAL METHODS ------------------------*/

        /**
         * Generate unique ID
         * 
         * @returns string with id
         */
        generate_unique_id = (): string => {

            // Convert timestamp to base36
            const unique_string: string = Date.now().toString(36); 

            // Get random
            const random_string: string = Math.random().toString(36);

            // Return text
            return `${unique_string}-${random_string}`;

        }

        /**
         * Close unclosed tags
         * 
         * @param string content
         * 
         * @returns string content
         */
        close_tags = (content: string): string => {

            // Replace br
            content = content.replaceAll('<br>', '<br />');

            return content;

        }

    }

}