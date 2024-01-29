/**
 * @class Notosans
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Noto Sans font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Notosans implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Noto Sans',
                slug: 'notosans',
                link: 'family=Noto+Sans:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;1,100',
                property: '\'Noto Sans\', sans-serif',
                weight: [
                    100,
                    200,
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