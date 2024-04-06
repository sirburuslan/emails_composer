/**
 * @file Icons
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains a function to read the icons
 */

// Import icons
import icons from './../icons/icons.index.js';

/**
 * Get an icon
 * 
 * @param string icon
 * @param object extra
 * 
 * @return string response
 */
export const get_icon = (icon: string, extra?: object): string => {

    // Verify if icon exists
    if ( icons.hasOwnProperty(icon) ) {

        // Get icon
        const icon_obj: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(icons, icon);

        // Check if icon_obj exists and has the value property
        if (icon_obj && icon_obj.value && typeof icon_obj.value.get_icon === 'function') {

            // Call the get_icon function
            return icon_obj.value.get_icon(extra);

        } else {

            // Handle case where icon_obj or get_icon is not valid
            return '';
            
        }

    } else {

        return '';

    }

}