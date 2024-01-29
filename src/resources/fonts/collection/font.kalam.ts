/**
 * @class Kalam
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the kalam font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Kalam implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Kalam',
                slug: 'kalam',
                link: 'family=Kalam:wght@300;400;700',
                property: '\'Kalam\', sans-serif',
                weight: [
                    300,
                    400,
                    700
                ]
            }

        };

    }

}