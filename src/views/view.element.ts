/**
 * @file Element
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Element view
 */

// Import all types
import { params_type } from '../resources/types/types.index.js';

// Export element
export function element(params: params_type): string {

    return '<section class="ec-composer-element-options ec-position-absolute ec-position-left">'
        + '<div class="ec-composer-element-options-area">'
            + '<div class="ec-composer-element-options-area-header ec-display-flex ec-justify-content-space-between">'
                + '<a href="#" class="ec-composer-element-options-cancel">'
                    + params.icons('arrow_back')
                    + params.words('go_back')
                + '</a>'
                + '<div class="ec-composer-element-options-tabs">'
                    + '<input type="radio" name="ec-composer-element-options-tab-' + params.template_id + '" value="0" id="ec-composer-element-options-tab-' + params.template_id + '-0" class="ec-composer-element-options-tab-0" checked />'
                    + '<label for="ec-composer-element-options-tab-' + params.template_id + '-0">'
                        + params.icons('desktop')
                    + '</label>'
                    + '<input type="radio" name="ec-composer-element-options-tab-' + params.template_id + '" value="1" id="ec-composer-element-options-tab-' + params.template_id + '-1" class="ec-composer-element-options-tab-1" />'
                    + '<label for="ec-composer-element-options-tab-' + params.template_id + '-1">'
                        + params.icons('phone')
                    + '</label>'
                    + '<div class="ec-composer-element-options-tab-active"></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-composer-element-options-area-body">'
                + '<div class="ec-sections ec-sections-show" data-scope="desktop"></div>'
                + '<div class="ec-sections" data-scope="mobile"></div>'
            + '</div>'
        + '</section>';

    /*return '<section class="ec-composer-element-options ec-position-absolute ec-position-left">'
        + '<div class="ec-composer-element-options-area">'
            + '<div class="ec-composer-element-options-area-header ec-display-flex ec-justify-content-space-between">'
                + '<a href="#" class="ec-composer-element-options-cancel">'
                    + params.icons('arrow_back')
                    + params.words('go_back')
                + '</a>'
                + '<div class="ec-composer-element-options-tabs">'
                    + '<input type="radio" name="ec-composer-element-options-tab-' + params.template_id + '" value="0" id="ec-composer-element-options-tab-' + params.template_id + '-0" class="ec-composer-element-options-tab-0" checked />'
                    + '<label for="ec-composer-element-options-tab-' + params.template_id + '-0">'
                        + params.icons('desktop')
                    + '</label>'
                    + '<input type="radio" name="ec-composer-element-options-tab-' + params.template_id + '" value="1" id="ec-composer-element-options-tab-' + params.template_id + '-1" class="ec-composer-element-options-tab-1" />'
                    + '<label for="ec-composer-element-options-tab-' + params.template_id + '-1">'
                        + params.icons('phone')
                    + '</label>'
                    + '<div class="ec-composer-element-options-tab-active"></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-composer-element-options-area-body">'
                + '<div class="ec-sections">'
                    + '<div class="ec-section ec-section-show">'
                        + '<div class="ec-section-header">'
                            + '<button type="button" class="ec-justify-content-space-between">'
                                + '<span>'
                                    + params.words('background')
                                + '</span>'
                                + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-section-body">'
                            + '<ul class="ec-composer-options-list">'
                                + '<li class="ec-display-flex ec-justify-content-space-between">'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Background Color'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Change the background color. '
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-color">'
                                            + '<button type="button" style="--bgcolor: #2984ff;" data-color="#2984ff"></button>'
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'
                                + '<li class="ec-display-flex ec-justify-content-space-between">'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Shadow'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Enable the font shadow. '
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-checkbox">'
                                            + '<input type="checkbox" id="ec-option-checkbox-' + params.template_id + '" />'
                                            + '<label for="ec-option-checkbox-' + params.template_id + '"></label>'
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'
                            + '</ul>'
                        + '</div>'
                    + '</div>'
                    + '<div class="ec-section ec-section-show">'
                        + '<div class="ec-section-header">'
                            + '<button type="button" class="ec-justify-content-space-between">'
                                + '<span>'
                                    + params.words('background')
                                + '</span>'
                                + params.icons('expand_more', {'icon_class': 'ec-section-header-dropdown-icon'})
                            + '</button>'
                        + '</div>'
                        + '<div class="ec-section-body">'
                            + '<ul class="ec-composer-options-list">'
                                + '<li class="ec-display-flex ec-justify-content-space-between">'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Align'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Align text in the cell. '
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-buttons-group">'
                                            + '<button type="button">'
                                                + params.icons('align_justify_flex_start')
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('align_justify_center')
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('align_justify_flex_end')
                                            + '</button>'
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'
                                + '<li class="ec-display-flex ec-justify-content-space-between">'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Size'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Increase or decrease the text size. '
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-input-buttons-group">'
                                            + '<button type="button">'
                                                + params.icons('remove')
                                            + '</button>'
                                            + '<input type="number" value="12">'
                                            + '<button type="button">'
                                                + params.icons('add')
                                            + '</button>'
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'
                                + '<li>'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Url'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Url for the Youtube video. '
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-url-group">'
                                            + '<input type="text" placeholder="Enter a url ...">'
                                            + '<button type="button">'
                                                + params.icons('autorenew', {'icon_class': 'ec-option-url-group-checking-icon'})
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('check', {'icon_class': 'ec-option-url-group-success-icon'})
                                            + '</button>'
                                            + '<button type="button">'
                                                + params.icons('close', {'icon_class': 'ec-option-url-group-failed-icon'})
                                            + '</button>'                                                                                     
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'
                                + '<li>'
                                    + '<div>'
                                        + '<h3>'
                                            + 'Alt Text'
                                        + '</h3>'
                                        + '<p>'
                                            + 'Alternate text for the video.'
                                        + '</p>'                                        
                                    + '</div>'
                                    + '<div>'
                                        + '<div class="ec-option-text">'
                                            + '<input type="text" placeholder="Enter a alt text ...">'                             
                                        + '</div>'  
                                    + '</div>'                                    
                                + '</li>'                                                         
                            + '</ul>'
                        + '</div>'
                    + '</div>'
                + '</div>'
            + '</div>'
        + '</div>'
    + '</section>';*/

}