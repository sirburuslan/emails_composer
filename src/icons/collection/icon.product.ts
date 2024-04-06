/**
 * @file Product
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-08
 *
 * This file contains the product icon
 */

// Import icons interface
import { InterfaceIcons } from '../../classes/classes.index.js';

// Icons
const product: InterfaceIcons.Interfaces.Icons = {

    get_icon: (extra: {icon_class: string | undefined}): string => {

        // Set class
        const icon_class = (typeof extra.icon_class !== 'undefined')?' ' + extra.icon_class:'';

        return '<span class="material-symbols-sharp' + icon_class + '">'
            + 'gallery_thumbnail'
        + '</span>';

    }

}

// Export 
export default product;