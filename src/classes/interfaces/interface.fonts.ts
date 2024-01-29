/**
 * @interface Fonts
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an interface with rules to build the fonts
 */


// Import types
import { font_type } from '../../resources/types/types.index.js';

// Interfaces
export namespace Interfaces {

    // Interface for fonts
    export interface Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info: () => font_type;

    }

}