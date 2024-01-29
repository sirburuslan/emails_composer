/**
 * @class Amatic
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Amatic font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Amatic implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Amatic SC',
                slug: 'amatic',
                link: 'family=Amatic+SC:wght@400;700',
                property: '\'Amatic SC\', sans-serif',
                weight: [
                    400,
                    700
                ]
            }

        };

    }

}