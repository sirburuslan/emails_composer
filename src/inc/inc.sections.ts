/**
 * @file Sections
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions to read the sections in the emails composer
 */

// Import sections
import sections from './../resources/sections/sections.index.js';

/**
 * Get sections
 * 
 * @param string section
 * @param object params
 * 
 * @return string response
 */
export const get_section = (section: string, params: any): string => {

    // Verify if sections exists
    if ( sections ) {

        // Sections list
        let sections_list: string = '';

        // Key the keys
        let sections_keys: string[] = Object.keys(sections);

        // Total sections
        let total_sections: number = sections_keys.length;

        // Counter
        let i: number = 0;

        // List the sections
        do {

            // Check if is the required section
            if ( section !== sections_keys[i] ) {

                // Increase i
                i++;
                
                continue;

            }

            // Add section to the list
            sections_list += Object.getOwnPropertyDescriptor(sections, sections_keys[i])?.value.get_section(params);            

            // Increase i
            i++;

        } while ( i < total_sections );

        return sections_list;

    } else {

        return '';

    }

}