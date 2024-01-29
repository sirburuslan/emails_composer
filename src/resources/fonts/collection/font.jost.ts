/**
 * @class Jost
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-10
 *
 * This class creates the Jost font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Jost implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Jost',
                slug: 'jost',
                link: 'family=Jost:ital,wght@0,100..900;1,100..900',
                property: '\'Jost\', \'Helvetica Neue\', Helvetica, Arial, sans-serif',
                weight: [
                    100,
                    200,
                    300,
                    400,
                    500,
                    600,
                    700,
                    800,
                    900
                ]
            }

        };

    }

}