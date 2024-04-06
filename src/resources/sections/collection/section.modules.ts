/**
 * @file Modules
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the html code for the modules section
 */

// Import sections interface
import Classes, { InterfaceSections } from '../../../classes/classes.index.js';

// Sections
const sections: InterfaceSections.Interfaces.Sections = {

    get_section: (params: any): string => {

        // Categories container
        let categories: string = '';
        
        // Initialize the Modules class
        const modules = new Classes.Modules();

        // Get the categories list
        const categories_list: Array<{ name: string, slug: string }> = modules.get_modules_categories(params);

        // Verify if categories exists
        if ( categories_list.length > 0 ) {

            // List the categories
            for ( const category of categories_list ) {

                // Add category to the container
                categories += '<li>'
                    + '<a href="#" data-id="' + category.slug + '">'
                        + category.name
                    + '</a>'
                + '</li>';

            }

        }

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

        // Check if the general modules are allowed
        if ( params.options('builder')?.resources?.modules?.sections?.general?.enabled ) {

            // Show class
            const show = params.options('builder')?.resources?.modules?.sections?.general?.show?' ec-section-show':'';

            // Add general modules section
            section += '<div class="ec-section' + show + '">'
                + '<div class="ec-section-header">'
                    + '<button type="button">'
                        + params.icons('modules_section', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('modules')
                        + '</span>'
                        + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                    + '</button>'
                + '</div>'
                + '<div class="ec-section-body">'
                    + '<div class="ec-block ec-modules-component">'
                        + '<div class="ec-block-header">'
                            + '<div class="ec-search ec-search-personal">'
                                + '<div class="ec-search-personal-search">'
                                    + '<input type="text" class="ec-search-input ec-search-personal-modules" placeholder="' + params.words('search_for_modules') + '" id="ec-search-my-modules-section-' + params.template_id + '-input">'
                                    + '<a href="#">'
                                        + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                        + params.icons('cancel', {'icon_class': 'ec-cancel-icon'})
                                    + '</a>'
                                + '</div>'
                                + '<div class="ec-search-default-search">'
                                    + '<input type="text" class="ec-search-input ec-search-default-modules" placeholder="' + params.words('search_for_modules') + '" id="ec-search-default-modules-section-' + params.template_id + '-input">'
                                    + '<a href="#">'
                                        + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                        + params.icons('cancel', {'icon_class': 'ec-cancel-icon'})
                                    + '</a>'
                                + '</div>'
                                + '<div class="ec-search-buttons">'
                                    + '<button type="button" class="ec-search-button ec-search-active-button" data-target="#ec-search-my-modules-section-' + params.template_id + '">'
                                        + params.icons('person_pin_circle')
                                    + '</button>'
                                    + '<button type="button" class="ec-search-button" data-target="#ec-search-modules-section-' + params.template_id + '">'
                                        + params.icons('new_label')
                                    + '</button>'
                                + '</div>'
                            + '</div>'                            
                        + '</div>'
                        + '<div class="ec-block-body">'
                            + '<div class="ec-search-sections">'
                                + '<div class="ec-search-section ec-search-section-show" id="ec-search-my-modules-section-' + params.template_id + '" loading="lazy">'
                                    + '<div class="ec-modules-list">'
                                        + '<div class="ec-modules"></div>'
                                        + '<div class="ec-no-modules-found">'
                                            + '<p>'
                                                + params.words('no_modules_were_found')
                                            + '</p>'                                        
                                        + '</div>'
                                        + '<div class="ec-loading-button">'
                                            + '<a href="#">'
                                                + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                                + params.words('load_more')
                                            + '</a>'
                                        + '</div>' 
                                    + '</div>'
                                + '</div>'
                                + '<div class="ec-search-section" id="ec-search-modules-section-' + params.template_id + '">'
                                    + '<div class="ec-option-selector">'
                                        + '<div class="ec-option-selector-dropdown">'
                                            + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                                                + '<span>'
                                                    + params.words('categories')
                                                + '</span>'
                                                + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                                            + '</button>'
                                            + '<div class="ec-option-selector-menu">'
                                                + '<ul class="ec-categories">'
                                                    + categories
                                                + '</ul>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="ec-modules-list">'
                                        + '<div class="ec-modules"></div>'
                                        + '<div class="ec-no-modules-found">'
                                            + '<p>'
                                                + params.words('no_modules_were_found')
                                            + '</p>'                                        
                                        + '</div>'
                                        + '<div class="ec-loading-button">'
                                            + '<a href="#">'
                                                + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                                + params.words('load_more')
                                            + '</a>'
                                        + '</div>' 
                                    + '</div>'                            
                                + '</div>'
                            + '</div>'
                        + '</div>'
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