/**
 * @file Body
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Body view
 */

// Import the classes
import Classes from '../classes/classes.index.js';

// Import incs
import {
    get_all_fonts, 
    get_text_sizes
} from '../inc/inc.index.js';

// Import all types
import { params_type } from '../resources/types/types.index.js';

// Export body
export function body(params: params_type): string {

    // Categories container
    let categories: string = '';
    
    // Initialize the Modules class
    let modules = new Classes.Modules();

    // Get the categories list
    let categories_list: Array<{ name: string, slug: string }> = modules.get_modules_categories(params);

    // Verify if categories exists
    if ( categories_list.length > 0 ) {

        // List the categories
        for ( let category of categories_list ) {

            // Add category to the container
            categories += '<li>'
                + '<a href="#" data-id="' + category.slug + '">'
                    + category.name
                + '</a>'
            + '</li>';

        }

    }

    return '<main class="ec-composer-main">'
        + '<div class="ec-composer-panel">'
            + '<div class="ec-tabs"></div>'
        + '</div>'
        + '<div class="ec-composer-container ec-scrollbar-container">'
            + '<div class="ec-small-text-editor">'
                + '<div class="ec-display-flex ec-justify-content-space-between">'
                    + '<div class="ec-display-flex ec-justify-content-start">'
                        + '<div class="ec-ste-group-buttons">'
                            + '<button type="button" class="ec-button ec-ste-align-button" data-direction="left">'
                                + params.icons('format_align_left')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-ste-align-button" data-direction="center">'
                                + params.icons('format_align_center')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-ste-align-button" data-direction="right">'
                                + params.icons('format_align_right')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-ste-align-button" data-direction="justify">'
                                + params.icons('format_align_justify')
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-ste-group-buttons">'
                            + '<button type="button" class="ec-button ec-ste-format-italic-button">'
                                + params.icons('format_italic')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-ste-format-underlined-button">'
                                + params.icons('format_underlined')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-ste-format-strikethrough-button">'
                                + params.icons('format_strikethrough_s')
                            + '</button>'  
                        + '</div>'
                        + '<div class="ec-ste-group-buttons">'
                            + '<button type="button" class="ec-button ec-ste-list-bulleted-button">'
                                + params.icons('format_list_bulleted', {'icon_class': 'ec-ste-list-icon'})
                            + '</button>'                 
                            + '<button type="button" class="ec-button ec-ste-list-numbered-button">'
                                + params.icons('format_list_numbered', {'icon_class': 'ec-ste-list-icon'})
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-ste-group-buttons">'
                            + '<button type="button" class="ec-button ec-ste-add-link-button">'
                                + params.icons('link')
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-ste-expand-more-group-buttons">'
                            + '<button type="button" class="ec-button ec-ste-expand-all-button">'
                                + params.icons('ungroup')
                            + '</button>'
                        + '</div>'
                    + '</div>'  
                    + '<div class="ec-display-flex ec-justify-content-end">'
                        + '<div class="ec-ste-dropdown" data-scope="fonts">'
                            + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                                + '<span>'
                                    + params.words('font_family')
                                + '</span>' 
                                + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                            + '</button>'
                            + '<div class="ec-ste-menu">'
                                + get_all_fonts()
                            + '</div>'
                        + '</div>'
                        + '<div class="ec-ste-dropdown" data-scope="text-weight">'
                            + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                                + '<span>'
                                    + params.words('weight')
                                + '</span>'                            
                                + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                            + '</button>'
                            + '<div class="ec-ste-menu">'
                                + '<ul class="ec-ste-text-weights"></ul>'
                            + '</div>'
                        + '</div>'
                        + '<div class="ec-ste-dropdown" data-scope="text-size">'
                            + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between">'
                                + '<span>'
                                    + params.words('size')
                                + '</span>'                           
                                + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                            + '</button>'
                            + '<div class="ec-ste-menu">'
                                + get_text_sizes()
                            + '</div>'
                        + '</div>'
                        + '<div class="ec-button-color">'
                            + '<button type="button" style="--bgcolor: #2984ff;" data-color="#2984ff"></button>'
                        + '</div>' 
                    + '</div>'
                + '</div>'
            + '</div>'        
            + '<iframe class="ec-composer-template-container" frameborder="0" sandbox="allow-same-origin allow-modals"></iframe>'
            + '<div class="ec-preview-word">'
                + params.words('preview')
            + '</div>'
            + '<div class="ec-composer-code-container">'
                + '<div class="ec-composer-code-header">'
                    + '<div class="ec-display-flex ec-justify-content-space-between">'
                        + '<div class="ec-display-flex">'
                            + '<button type="button" class="ec-button ec-composer-code-tab ec-composer-code-active-tab" data-tab="html">'
                                + params.words('html')
                            + '</button>'
                            + '<button type="button" class="ec-button ec-composer-code-tab ec-composer-code-active-tab" data-tab="css">'
                                + params.words('css')
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-display-flex">'
                            + '<button type="button" class="ec-button ec-template-resize-code-button">'
                                + params.icons('drag')
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-display-flex">'
                            + '<button type="button" class="ec-button ec-template-hide-code-button">'
                                + params.icons('close', {'icon_class': 'ec-close-icon'})
                            + '</button>'
                        + '</div>'
                    + '</div>'
                + '</div>'
                + '<div class="ec-composer-code-body">'
                    + '<div class="ec-composer-code-html ec-composer-code-show">'
                        + '<iframe class="ec-composer-element-html-container" frameborder="0" sandbox="allow-same-origin allow-modals"></iframe>'
                        + '<div class="ec-composer-reload-html-icon">'
                            + params.icons('autorenew', {'icon_class': 'ec-composer-reload-html-loading-icon'})
                        + '</div>' 
                    + '</div>'
                    + '<div class="ec-composer-code-css ec-composer-code-show">'
                        + '<iframe class="ec-composer-element-css-container" frameborder="0" sandbox="allow-same-origin allow-modals"></iframe>'
                        + '<div class="ec-composer-reload-css-icon">'
                            + params.icons('autorenew', {'icon_class': 'ec-composer-reload-css-loading-icon'})
                        + '</div>'
                    + '</div>'                    
                + '</div>'
            + '</div>'
            + '<div class="ec-composer-code-class-dropdown"></div>'
            + '<div class="ec-composer-code-contextmenu">'
                + '<a href="#" class="ec-composer-code-contextmenu-cut">'
                    + params.words('cut')
                + '</a>'
                + '<a href="#" class="ec-composer-code-contextmenu-copy">'
                    + params.words('copy')
                + '</a>'
                + '<a href="#" class="ec-composer-code-contextmenu-paste">'
                    + params.words('paste')
                + '</a>'                                
            + '</div>'
            + '<a href="#" class="ec-template-code-button ec-template-code-hide-button">'
                + params.icons('frame_source')
            + '</a>'
        + '</div>'
        + '<div class="ec-composer-shadow">'
            + '<div class="ec-composer-modal ec-composer-modal-medium" data-scope="ec-composer-rows-modal">'
                + '<div class="ec-composer-modal-header ec-display-flex ec-justify-content-space-between">'
                    + '<h3 class="ec-display-flex ec-justify-content-start">'
                        + params.icons('low_priority', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('structures')
                        + '</span>'
                    + '</h3>'
                    + '<button type="button" class="ec-button ec-template-hide-modal-button">'
                        + params.icons('close', {'icon_class': 'ec-close-icon'})
                    + '</button>'
                + '</div>' 
                + '<div class="ec-composer-modal-body">'
                    + '<div class="ec-rows"></div>'
                + '</div>'                     
            + '</div>'
            + '<div class="ec-composer-modal ec-composer-modal-large" data-scope="ec-composer-create-module-modal">'
                + '<div class="ec-composer-modal-header ec-display-flex ec-justify-content-space-between">'
                    + '<h3 class="ec-display-flex ec-justify-content-start">'
                        + params.icons('new_window', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('create_module')
                        + '</span>'
                    + '</h3>'
                    + '<button type="button" class="ec-button ec-template-hide-modal-button">'
                        + params.icons('close', {'icon_class': 'ec-close-icon'})
                    + '</button>'
                + '</div>' 
                + '<div class="ec-composer-modal-body">'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12">'
                            + '<div class="ec-composer-modal-text-field">'
                                + '<h3>'
                                    + params.words('name')
                                    + params.icons('asterisk', {'icon_class': 'ec-composer-modal-required-icon'})
                                + '</h3>'
                                + '<input type="text" placeholder="' + params.words('enter_module_name') + '" class="ec-menu-module-name ec-mb-1" id="ec-menu-module-name-' + params.template_id + '">'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12 ec-module-advanced-fields">'
                            + '<div class="ec-grid ec-mt-3">'
                                + '<div class="ec-grid-column-12">'
                                    + '<div class="ec-composer-modal-select-field">'
                                        + '<h3>'
                                            + params.words('category')
                                        + '</h3>'
                                        + '<div class="ec-composer-modal-select-dropdown">'
                                            + '<button type="button" class="ec-button ec-display-flex ec-justify-content-space-between ec-module-category-button">'
                                                + '<span>'
                                                    + params.words('uncategorized')
                                                + '</span>'
                                                + params.icons('expand_more', {'icon_class': 'ec-dropdown-icon'})
                                            + '</button>'
                                            + '<div class="ec-composer-modal-select-menu">'
                                                + '<ul>'
                                                    + categories
                                                + '</ul>'
                                            + '</div>'
                                        + '</div>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                            + '<div class="ec-grid ec-mt-3">'
                                + '<div class="ec-grid-column-12">'
                                    + '<div class="ec-composer-modal-textarea-field">'
                                        + '<h3>'
                                            + params.words('description')
                                        + '</h3>'
                                        + '<textarea placeholder="' + params.words('enter_module_description') + '" class="ec-menu-module-description" id="ec-menu-module-description-' + params.template_id + '"></textarea>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                            + '<div class="ec-grid ec-mt-3">'
                                + '<div class="ec-grid-column-12">'
                                    + '<div class="ec-composer-modal-upload-field">'
                                        + '<h3>'
                                            + params.words('cover')
                                            + params.icons('asterisk', {'icon_class': 'ec-composer-modal-required-icon'})
                                        + '</h3>'
                                        + '<div class="ec-cover-upload-box">'
                                            + '<div class="ec-cover-upload-box-drop-area">'
                                                + '<div class="ec-cover-upload-box-drop-area-start ec-cover-upload-box-drop-area-show">'
                                                    + '<div class="ec-cover-upload-box-icon-box">'
                                                        + '<div class="ec-cover-upload-box-icon">'
                                                            + params.icons('cloud_upload')
                                                        + '</div>'
                                                    + '</div>'
                                                    + '<h6>'
                                                        + params.words('drag_and_drop_files')
                                                    + '</h6>'
                                                    + '<p>'
                                                        + params.words('supported_upload_format')
                                                    + '</p>'                                                
                                                + '</div>'
                                                + '<div class="ec-cover-upload-box-drop-area-drop">'
                                                    + '<div class="ec-cover-upload-box-icon-box">'
                                                        + '<div class="ec-cover-upload-box-icon">'
                                                            + params.icons('cloud_queue')
                                                        + '</div>'
                                                    + '</div>'                                        
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="ec-block-footer ec-display-none">'
                                            + '<form method="post" enctype="multipart/form-data">'
                                                + '<input type="file" class="ec-file" multiple />'
                                            + '</form>'
                                        + '</div>'
                                        + '<div class="ec-cover-uploaded-files ec-mb-1">'
                                            + '<h3 class="ec-media-title">'
                                                + '<span>'
                                                    + params.words('files')
                                                + '</span>'
                                            + '</h3>'
                                            + '<ul class="ec-cover-uploaded-files-list"></ul>'
                                        + '</div>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
                + '<div class="ec-composer-modal-footer">'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12">'
                            + '<button type="button" class="ec-button ec-save-module-button">'
                                + params.icons('save', {'icon_class': 'ec-default-icon'})
                                + params.icons('autorenew', {'icon_class': 'ec-loading-icon'})
                                + params.words('save')
                            + '</button>'
                        + '</div>'
                    + '</div>'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12">'
                            + '<div class="ec-composer-modal-message"></div>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-composer-modal ec-composer-modal-large" data-scope="ec-composer-settings-modal">'
                + '<div class="ec-composer-modal-header ec-display-flex ec-justify-content-space-between">'
                    + '<h3 class="ec-display-flex ec-justify-content-start">'
                        + params.icons('settings', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('settings')
                        + '</span>'
                    + '</h3>'
                    + '<button type="button" class="ec-button ec-template-hide-modal-button">'
                        + params.icons('close', {'icon_class': 'ec-close-icon'})
                    + '</button>'
                + '</div>' 
                + '<div class="ec-composer-modal-body">'
                    + '<div class="ec-sections"></div>'
                + '</div>'                     
            + '</div>'
            + '<div class="ec-composer-modal ec-composer-modal-large" data-scope="ec-composer-export-modal">'
                + '<div class="ec-composer-modal-header ec-display-flex ec-justify-content-space-between">'
                    + '<h3 class="ec-display-flex ec-justify-content-start">'
                        + params.icons('upgrade', {'icon_class': 'ec-section-header-icon'})
                        + '<span>'
                            + params.words('export_template')
                        + '</span>'
                    + '</h3>'
                    + '<button type="button" class="ec-button ec-template-hide-modal-button">'
                        + params.icons('close', {'icon_class': 'ec-close-icon'})
                    + '</button>'
                + '</div>' 
                + '<div class="ec-composer-modal-body">'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12">'
                            + '<ul>'
                                + '<li>'
                                    + '<div>'
                                        + '<h3>'
                                            + params.words('html_css')
                                        + '</h3>'
                                        + '<p>'
                                            + params.words('html_css_description')
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<button type="button" class="ec-button ec-save-download-html-button">'
                                            + params.icons('download', {'icon_class': 'ec-download-icon'})
                                            + params.icons('autorenew', {'icon_class': 'ec-loading-icon'})
                                            + '<span class="ec-save-module-text">'
                                                + params.words('download')
                                            + '</span>'
                                        + '</button>'
                                    + '</div>'
                                + '</li>'
                            + '</ul>'
                        + '</div>'
                    + '</div>'
                + '</div>'
                + '<div class="ec-composer-modal-footer">'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-12">'
                            + '<div class="ec-m-0 ec-composer-modal-message"></div>'
                        + '</div>'
                    + '</div>'                    
                + '</div>'                                  
            + '</div>'
        + '</div>'
        + '<div class="ec-composer-save-changes-modal ec-display-flex ec-justify-content-start">'
            + '<div class="ec-composer-save-changes-icon ec-composer-save-changes-saving-icon">'
                + params.icons('autorenew', {'icon_class': 'ec-section-saving-changes-loading-icon'})
                + params.icons('check', {'icon_class': 'ec-section-saving-changes-success-icon'})
                + params.icons('close', {'icon_class': 'ec-section-saving-changes-failed-icon'})
            + '</div>'
            + '<div>'
                + '<p>'
                    + params.words('saving_changes')
                + '</p>'
            + '</div>'
        + '</div>'
        + '<div class="ec-composer-preview"></div>'
    + '</main>';

}