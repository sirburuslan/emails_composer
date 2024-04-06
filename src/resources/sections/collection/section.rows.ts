/**
 * @file Rows
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the html code for the rows section
 */

// Import sections interface
import { InterfaceSections } from '../../../classes/classes.index.js';

// Sections
const sections: InterfaceSections.Interfaces.Sections = {

    get_section: (params: any): string => {

        // Section container
        let section = '<div class="ec-sections">';

        // Set actions buttons
        section += '<div class="ec-section-actions">'
            + '<button type="button" class="ec-section-action-hide-button">'
                + params.icons('close', {'icon_class': 'ec-section-action-hide-icon'})
                + '<span class="ec-section-action-hide-text">'
                    + params.words('close')
                + '</span>'
            + '</button>'
        + '</div>';

        // Check if the general rows are allowed
        if ( params.options('builder')?.resources?.rows?.sections?.general?.enabled ) {

            // Show class
            let show = params.options('builder')?.resources?.rows?.sections?.general?.show?' ec-section-show':'';

            // Prepare the rows
            const rows: string = '<div class="ec-row">'
                + '<div class="ec-row-columns-one" data-format="1">'
                    + '<div></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-row">'
                + '<div class="ec-row-columns-two" data-format="2">'
                    + '<div></div>'
                    + '<div></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-row">'
                + '<div class="ec-row-columns-three" data-format="3">'
                    + '<div></div>'
                    + '<div></div>'
                    + '<div></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-row">'
                + '<div class="ec-row-columns-four" data-format="4">'
                    + '<div></div>'
                    + '<div></div>'
                    + '<div></div>'
                    + '<div></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-row">'
                + '<div class="ec-row-columns-two-2" data-format="5">'
                    + '<div></div>'
                    + '<div></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-row">'
                + '<div class="ec-row-columns-two-3" data-format="6">'
                    + '<div></div>'
                    + '<div></div>'
                + '</div>'
            + '</div>';

            // Verify if are required only rows
            if ( typeof params.only_rows === 'number' ) {

                // Return only rows
                return rows;

            }

            // Add general rows section
            section += '<div class="ec-section' + show + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button">'
                        + params.icons('low_priority', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('structures')
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<div class="ec-rows">'
                        + rows
                    + '</div>'
                + '</div>'
            + '</div>';

        }

        // Close section
        section += '</div>';

        return section;

    }

}

// Export 
export default sections;