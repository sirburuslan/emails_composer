/**
 * @file Image Left
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file contains the image left icon
 */

// Import icons interface
import { InterfaceIcons } from '../../classes/classes.index.js';

// Icons
const image_left: InterfaceIcons.Interfaces.Icons = {

    get_icon: (extra: {icon_class: string | undefined}): string => {

        // Set class
        const icon_class = (typeof extra.icon_class !== 'undefined')?' ' + extra.icon_class:'';

        return '<span class="material-symbols-sharp' + icon_class + '">'
            + 'format_image_left'
        + '</span>';

    }

}

// Export 
export default image_left;