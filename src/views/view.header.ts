/**
 * @file Header
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the Header view
 */

// Import all types
import { params_type } from '../resources/types/types.index.js';

// Export header
export function header(params: params_type): string {

    return '<nav class="ec-composer-header ec-position-absolute ec-topbar-position">'
        + '<div class="ec-display-flex ec-justify-content-space-between">'
            + '<div class="ec-display-flex">'
                + '<div class="ec-composer-mode">'
                    + '<input type="radio" name="ec-composer-mode-option-' + params.template_id + '" value="0" id="ec-composer-mode-' + params.template_id + '-0" class="ec-composer-mode-0" checked>'
                    + '<label for="ec-composer-mode-' + params.template_id + '-0">'
                        + '<span class="ec-composer-mode-text">'
                            + params.words('editor')
                        + '</span>'
                        + '<span class="ec-composer-mode-icon">'
                            + params.icons('edit_square')
                        + '</span>'
                    + '</label>'
                    + '<input type="radio" name="ec-composer-mode-option-' + params.template_id + '" value="1" id="ec-composer-mode-' + params.template_id + '-1" class="ec-composer-mode-1">'
                    + '<label for="ec-composer-mode-' + params.template_id + '-1">'
                        + '<span class="ec-composer-mode-text">'
                            + params.words('preview')
                        + '</span>'
                        + '<span class="ec-composer-mode-icon">'
                            + params.icons('frame_inspect')
                        + '</span>'
                    + '</label>'
                    + '<div class="ec-composer-mode-active"></div>'
                + '</div>'
            + '</div>'
            + '<div class="ec-display-flex">'
                + '<div class="ec-composer-name">'
                    + '<div class="ec-composer-name-text" contenteditable="true">'
                        + params.words('template')
                    + '</div>'
                    + '<button type="button" class="ec-composer-name-icon">'
                        + params.icons('edit_square', {'icon_class': 'ec-composer-edit-name-icon'})
                        + params.icons('save', {'icon_class': 'ec-composer-unsaved-changes-name-icon'})
                        + params.icons('check', {'icon_class': 'ec-composer-updated-success-name-icon'})
                        + params.icons('close', {'icon_class': 'ec-composer-updated-error-name-icon'})
                    + '</button>'
                + '</div>'
            + '</div>'
            + '<div class="ec-display-flex">'
                + '<div class="ec-group ec-mr-5 ec-header-buttons">'
                    + '<button type="button" class="ec-button ec-save-settings-button">'
                        + params.icons('settings')
                    + '</button>'
                    + '<button type="button" class="ec-button ec-save-export-button">'
                        + params.icons('upgrade')
                    + '</button>'
                + '</div>'
                + '<button type="button" class="ec-button ec-templates-button">'
                    + params.icons('templates')
                    + '<span class="ec-save-module-text">'
                        + params.words('templates')
                    + '</span>'
                + '</button>'
            + '</div>'
        + '</div>'
    + '</nav>';

}