/**
 * @class Helvetica
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-16
 *
 * This class creates the Helvetica font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Helvetica implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Helvetica',
                slug: 'helvetica',
                link: '',
                property: 'Helvetica, Arial, sans-serif',
                weight: [
                    100,
                    400,
                    500,
                    700,
                    900
                ]
            }

        };

    }

}