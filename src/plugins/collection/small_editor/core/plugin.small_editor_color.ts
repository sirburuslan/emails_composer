/**
 * @class Color
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains the methods to change the text color
 */

// Import inc
import {
    show_message,
    get_word
} from '../../../../inc/inc.index.js';

// Import types
import { params_type } from '../../../../resources/types/types.index.js';

// Import plugins
import Plugins from '../../../plugins.index.js';

// Small Editor Core Color
export namespace PluginsSmallEditorCore {

    // Export the Color class
    export class Color {

        /*---------------------- METODS TO APPLY COLOR ------------------------*/

        /**
         * Change Text Color
         * 
         * @param MouseEvent e
         * @param params_type params
         * @param string color
         */
        change_text_color = (e: MouseEvent, params: params_type, color: string): void => {

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

                    // Save target
                    const target = e.target as Element;

                    // Init small editor
                    const small_editor = new Plugins.Small_editor();

                    // Get range
                    const range: Range = selection.getRangeAt(0);

                    // Get the parent element
                    let parent_element: Element | null = range.startContainer.parentElement;

                    // Check if parent element exists
                    if ( parent_element && parent_element.closest('.ec-element-content-data') ) {

                        // List the childrens
                        for ( const child of parent_element.closest('.ec-element-content-data')!.children ) {

                            // Check if parent element was found
                            if ( small_editor.children_list(child).indexOf(parent_element) > -1 ) {

                                // Replace the parent element
                                parent_element = child;

                                break;

                            }

                        }

                        // Apply the tags
                        small_editor.apply_tags(params, range, 'text-color', {'style': `color:${color};`});

                    }

                }

            }

        }

    }

}