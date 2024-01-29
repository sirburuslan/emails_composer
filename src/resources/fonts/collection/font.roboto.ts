/**
 * @class Roboto
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the roboto font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Roboto implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Roboto',
                slug: 'roboto',
                link: 'family=Roboto:wght@100;300;400;500;700;900',
                property: '\'Roboto\', sans-serif',
                weight: [
                    100,
                    300,
                    400,
                    500,
                    700,
                    900
                ]
            }

        };

    }

}