/**
 * @class Opensans
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the open sans font support
 */

// Import fonts interface
import { InterfaceFonts } from '../../../classes/classes.index.js';

// Import types
import { font_type } from '../../types/types.index.js';

// Namespace
export namespace Resources.Fonts {

    // Class
    export class Opensans implements InterfaceFonts.Interfaces.Fonts {

        /**
         * Gets the font's info
         * 
         * @returns font_type with font's information
         */
        get_info = (): font_type => {

            return {
                name: 'Open Sans',
                slug: 'opensans',
                link: 'family=Open+Sans:wght@300;400;500;600;700;800',
                property: '\'Open Sans\', sans-serif',
                weight: [
                    300,
                    400,
                    500,
                    600,
                    700,
                    800
                ]
                
            }

        };

    }

}