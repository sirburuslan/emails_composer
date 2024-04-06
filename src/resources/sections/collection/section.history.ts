/**
 * @file History
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the html code for the history section
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

        // Check if the general history are allowed
        if ( params.options('builder')?.resources?.history?.sections?.general?.enabled ) {

            // Show class
            const show = params.options('builder')?.resources?.history?.sections?.general?.show?' ec-section-show':'';

            // Add general history section
            section += '<div class="ec-section ec-section-history' + show + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button">'
                        + params.icons('history_section', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('history')
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body"></div>'
                + '<div class="ec-section-footer">'
                    + '<div class="ec-loading-button">'
                        + '<a href="#">'
                            + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                            + params.words('load_more')
                        + '</a>'
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