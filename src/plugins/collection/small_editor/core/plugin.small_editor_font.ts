/**
 * @class Font
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class applies fonts to a text
 */

// Import inc
import {
    show_message,
    get_word
} from '../../../../inc/inc.index.js';

// Import the fonts
import * as fonts from '../../../../resources/fonts/fonts.index.js';

// Import types
import { 
    font_type, 
    params_type 
} from '../../../../resources/types/types.index.js';

// Import plugins
import Plugins from '../../../plugins.index.js';

// Small Editor Core Font
export namespace PluginsSmallEditorCore {

    // Export the Font class
    export class Font {

        /*---------------------- METODS TO APPLY FONT ------------------------*/

        /**
         * Change Font Family
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        change_font_family = (e: MouseEvent, params: params_type): void => {

            // Save target
            const target = e.target as Element;

            // Get the font
            const font: string | null = target.getAttribute('data-font');

            // Check if font exists
            if ( font ) {

                // Get index
                const index: number = Object.keys(fonts).indexOf(font);

                // Verify if index exists
                if ( typeof index !== 'number' ) {

                    // Show error message
                    show_message(get_word('error_name') + ': ' + get_word('no_font_found'));
                    return;

                }

                // Get the font parameters
                const font_params: font_type = Object.values(fonts)[index];

                // Get the weights
                const weights: number[] = font_params.weight;

                // Weights list
                let weights_list: string = '';

                // Verify if weights exists
                if ( weights.length > 0 ) {

                    // List the weights
                    for ( const weight of weights ) {

                        // Add weight
                        weights_list += '<li>'
                            + '<a href="#" data-weight="' + weight + '">'
                                + weight
                            + '</a>'
                        + '</li>';

                    }

                }

                // Set font name
                target.closest('.ec-ste-dropdown')!.getElementsByTagName('span')[0]!.textContent = font_params.name;

                // Display the weights
                target.closest('.ec-small-text-editor')!.getElementsByClassName('ec-ste-text-weights')[0].innerHTML = weights_list;

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

                        // Select the text editor
                        const text_editor: Element = params.selector.getElementsByClassName('ec-small-text-editor')[0];

                        // Get the font name
                        const font_name: string | null | undefined = text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                        // Get the fonts list
                        const fonts_list: font_type[] = Object.values(fonts);

                        // Check if the font exists
                        const font: font_type | undefined = fonts_list.find(item => item.name === font_name);

                        // Check if font exists
                        if ( font ) {

                            // Init small editor
                            const small_editor = new Plugins.Small_editor();

                            // Get range
                            const range: Range = selection.getRangeAt(0);

                            // Apply the tags
                            small_editor.apply_tags(params, range, 'font-family', {'style': `font-family:${font.property};`});

                        }

                    }

                }

            }

        }

        /**
         * Change Font Size
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        change_font_size = (e: MouseEvent, params: params_type): void => {

            // Save target
            const target = e.target as Element;

            // Get the size
            const size: string | null = target.getAttribute('data-size');

            // Check if size exists
            if ( size ) {

                // Set text size
                target.closest('.ec-ste-dropdown')!.getElementsByTagName('span')[0]!.textContent = size;

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

                        // Select the text editor
                        const text_editor: Element = params.selector.getElementsByClassName('ec-small-text-editor')[0];

                        // Get the font name
                        const font_name: string | null | undefined = text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                        // Get the fonts list
                        const fonts_list: font_type[] = Object.values(fonts);

                        // Check if the font exists
                        const font: font_type | undefined = fonts_list.find(item => item.name === font_name);

                        // Check if font exists
                        if ( font ) {

                            // Init small editor
                            const small_editor = new Plugins.Small_editor();

                            // Get range
                            const range: Range = selection.getRangeAt(0);

                            // Apply the tags
                            small_editor.apply_tags(params, range, 'font-size', {'style': `font-size:${size};`});

                        }

                    }

                }

            }

        }

        /**
         * Change Font Weight
         * 
         * @param MouseEvent e
         * @param params_type params
         */
        change_font_weight = (e: MouseEvent, params: params_type): void => {

            // Save target
            const target = e.target as Element;

            // Get the weight
            const weight: string | null = target.getAttribute('data-weight');

            // Check if weight exists
            if ( weight ) {

                // Set text weight
                target.closest('.ec-ste-dropdown')!.getElementsByTagName('span')[0]!.textContent = weight;

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

                        // Select the text editor
                        const text_editor: Element = params.selector.getElementsByClassName('ec-small-text-editor')[0];

                        // Get the font name
                        const font_name: string | null | undefined = text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')?.textContent;

                        // Get the fonts list
                        const fonts_list: font_type[] = Object.values(fonts);

                        // Check if the font exists
                        const font: font_type | undefined = fonts_list.find(item => item.name === font_name);

                        // Check if font exists
                        if ( font ) {

                            // Init small editor
                            const small_editor = new Plugins.Small_editor();

                            // Get range
                            const range: Range = selection.getRangeAt(0);

                            // Apply the tags
                            small_editor.apply_tags(params, range, 'font-weight', {'style': `font-weight:${weight};`});

                        }

                    }

                }

            }

        }

        /*---------------------- METODS TO IDENTIFY FONT ------------------------*/

        /**
         * Identify Font
         * 
         * @param KeyboardEvent | MouseEvent e
         * @param params_type params
         */
        identify_font = (e: KeyboardEvent | MouseEvent, params: params_type): void => {
            
            // Save target
            let target = e.target as Element;

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

            }

            // Select the text editor
            const text_editor: Element = params.selector.getElementsByClassName('ec-small-text-editor')[0];

            // Get the properties
            const properties: CSSStyleDeclaration = window.getComputedStyle(target);

            // Get the font name
            const font_name: string = properties.fontFamily;

            // Get the fonts list
            const fonts_list: font_type[] = Object.values(fonts);

            // Check if the font exists
            const font: font_type | undefined = fonts_list.find(item => item.property.replaceAll("'", "").replaceAll('"', '') === font_name.replaceAll("'", "").replaceAll('"', ''));

            // Check if font exists
            if ( font ) {

                // Set font name
                text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')!.textContent = font.name;

                // Get the weights
                const weights: number[] = font.weight;

                // Weights list
                let weights_list: string = '';

                // Verify if weights exists
                if ( weights.length > 0 ) {

                    // List the weights
                    for ( const weight of weights ) {

                        // Add weight
                        weights_list += '<li>'
                            + '<a href="#" data-weight="' + weight + '">'
                                + weight
                            + '</a>'
                        + '</li>';

                    }

                }

                // Display the weights
                params.selector.getElementsByClassName('ec-ste-text-weights')[0].innerHTML = weights_list;

            }
            
            // Get the font tag
            /*const font_family: Element | null = this.get_styles(target, 'font-family');

            // Verify if font tag exists
            if ( font_family ) {

                // Get the properties
                const properties: CSSStyleDeclaration = window.getComputedStyle(font_family);

                // Get the font name
                const font_name: string = properties.fontFamily;

                // Get the fonts list
                const fonts_list: font_type[] = Object.values(fonts);

                // Check if the font exists
                const font: font_type | undefined = fonts_list.find(item => item.property.replaceAll("'", "").replaceAll('"', '') === font_name.replaceAll("'", "").replaceAll('"', ''));

                // Check if font exists
                if ( font ) {

                    // Set font name
                    text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')!.textContent = font.name;

                    // Get the weights
                    const weights: number[] = font.weight;

                    // Weights list
                    const weights_list: string = '';

                    // Verify if weights exists
                    if ( weights.length > 0 ) {

                        // List the weights
                        for ( const weight of weights ) {

                            // Add weight
                            weights_list += '<li>'
                                + '<a href="#" data-weight="' + weight + '">'
                                    + weight
                                + '</a>'
                            + '</li>';

                        }

                    }

                    // Display the weights
                    params.selector.getElementsByClassName('ec-ste-text-weights')[0].innerHTML = weights_list;

                }

            } else {

                // Get the fonts list
                const fonts_list: font_type[] = Object.values(fonts);

                // Check if the font exists
                const font: font_type | undefined = fonts_list.find(item => item.slug === 'lato');

                // Check if font exists
                if ( font ) {

                    // Get the weights
                    const weights: number[] = font.weight;

                    // Weights list
                    const weights_list: string = '';

                    // Verify if weights exists
                    if ( weights.length > 0 ) {

                        // List the weights
                        for ( const weight of weights ) {

                            // Add weight
                            weights_list += '<li>'
                                + '<a href="#" data-weight="' + weight + '">'
                                    + weight
                                + '</a>'
                            + '</li>';

                        }

                    }

                    // Display the weights
                    params.selector.getElementsByClassName('ec-ste-text-weights')[0].innerHTML = weights_list;

                }

                // Set font name
                text_editor.querySelector('.ec-ste-dropdown[data-scope="fonts"] span')!.textContent = 'Lato';

                // Set font size
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')!.textContent = '14px';

                // Set font weight
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')!.textContent = '400';

            }*/

            // Set font size
            text_editor.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')!.textContent = properties.fontSize;

            // Get the font size
            /*const font_size: Element | null = this.get_styles(target, 'font-size');
            
            // Verify if font size exists
            if ( font_size ) {

                // Get the properties
                const properties: CSSStyleDeclaration = window.getComputedStyle(font_size);

                // Set font size
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')!.textContent = properties.fontSize;

            } else {

                // Set font size
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-size"] span')!.textContent = '14px';

            }*/

            // Set font weight
            text_editor.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')!.textContent = properties.fontWeight;

            // Get the font weight
            /*const font_weight: Element | null = this.get_styles(target, 'font-weight');
            
            // Verify if font weight exists
            if ( font_weight ) {

                // Get the properties
                const properties: CSSStyleDeclaration = window.getComputedStyle(font_weight);

                // Set font weight
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')!.textContent = properties.fontWeight;

            } else {

                // Set font weight
                text_editor.querySelector('.ec-ste-dropdown[data-scope="text-weight"] span')!.textContent = '400';

            }*/

            // Get the text color
            const rgba: string = properties.color;

            // Initialize the Color class
            const color = new Plugins.Color();

            // Set validation rules
            const is_valid: any = rgba.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
            
            // Verify if the rgba is valid
            if ( is_valid ) {

                // Extract the rgba
                const [, r, g, b, a] = is_valid.map(Number);

                // Convert to hex color
                const hex: string = color.convert_rgb_to_hex(r, g, b, a || 1);

                // Change the button color
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].setAttribute('data-color', hex);
                
            } else {

                // Change the button color
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].style.setProperty('--bgcolor', '#12130f');
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].setAttribute('data-color', '#12130f');

            }

            // Get the text color
            /*const text_color: Element | null = this.get_styles(target, 'color');
            
            // Verify if text color exists
            if ( text_color ) {

                // Get the properties
                const properties: CSSStyleDeclaration = window.getComputedStyle(text_color);

                // Get the text color
                const rgba: string = properties.color;

                // Initialize the Color class
                const color = new Plugins.Color();

                // Set validation rules
                const is_valid: any = rgba.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
                
                // Verify if the rgba is valid
                if ( is_valid ) {

                    // Extract the rgba
                    const [, r, g, b, a] = is_valid.map(Number);

                    // Convert to hex color
                    const hex: string = color.convert_rgb_to_hex(r, g, b, a || 1);

                    // Change the button color
                    params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].style.setProperty('--bgcolor', hex);
                    params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].setAttribute('data-color', hex);
                    
                }

            } else {

                // Change the button color
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].style.setProperty('--bgcolor', '#12130f');
                params.selector.querySelector('.ec-small-text-editor .ec-button-color')!.getElementsByTagName('button')[0].setAttribute('data-color', '#12130f');
                
            }*/

        }

        /**
         * Get styles
         * 
         * @param Element target
         * @param string name
         * 
         * @returns Element | null
         */
        get_styles = (target: Element, name: string | number): Element | null => {
            
            // Current target
            let current = target as HTMLElement;
            
            // Get target
            while (current) {

                // Get the style
                const style: any = current?.style;

                // Check if the current element has the desired style property
                if ( style && current.style && style.getPropertyValue(name) ) {
                    return current;
                }
            
                // Move up to the parent element
                current = current?.parentElement as HTMLElement;

            }
          
            // If no matching element is found
            return null;

        }

    }

}