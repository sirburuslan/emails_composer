/**
 * @file Arrow Right Alt
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the arrow right alt icon
 */

// Import icons interface
import { InterfaceIcons } from '../../classes/classes.index.js';

// Icons
const arrow_right_alt: InterfaceIcons.Interfaces.Icons = {

    get_icon: (extra: {icon_class: string | undefined}): string => {

        // Set class
        const icon_class = (typeof extra.icon_class !== 'undefined')?' ' + extra.icon_class:'';

        return '<span class="material-symbols-sharp' + icon_class + '">'
            + 'arrow_right_alt'
        + '</span>';

    }

}

// Export 
export default arrow_right_alt;