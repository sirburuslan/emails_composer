/**
 * @class Icons
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Icons option
 */

// Import the Classes
import Classes, { AbstractOptions } from "../../../classes/classes.index.js";

// Import inc
import {
    get_icons,
    download_icon
} from '../../../inc/inc.index.js';

// Import types
import {
    params_type,
    option_images_type,
    option_property_type,
    events_type
} from '../../types/types.index.js';

// Export the namespace Options
export namespace Resources.Options {

    // Export the class Icons
    export class Icons extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_images_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_images_type): {template: string} {

            // Set pause
            setTimeout((): void => {

                // Get the icons
                get_icons(params, 1);

            }, 300);

            // Unique checkbox id
            let unique_id: number = Math.random();

            return {

                template: '<div class="ec-w-100">'
                    + '<div>'
                        + '<div class="ec-block ec-option-icons">'
                            + '<div class="ec-block-header">'
                                + '<div class="ec-search">'
                                    + '<input type="text" placeholder="' + params.words('search_for_icons') + '" class="ec-w-100 ec-search-input" id="ec-composer-search-icons-' + unique_id + '-input">'
                                    + '<a href="#">'
                                        + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                        + params.icons('cancel', {'icon_class': 'ec-cancel-icon'})
                                    + '</a>'
                                + '</div>'
                            + '</div>'
                            + '<div class="ec-block-body ec-scrollbar-container">'
                                + '<div class="ec-search-sections">'
                                    + '<div class="ec-search-section ec-search-section-show" id="ec-search-list-media-section-' + params.template_id + '">'
                                        + '<div class="ec-media-icons ec-media-icons-preview">'
                                            + '<h3 class="ec-media-title">'
                                                + '<span>'
                                                    + params.words('gallery')
                                                + '</span>'
                                                + '<a href="#">'
                                                    + params.words('show_all')
                                                + '</a>'
                                            + '</h3>'
                                            + '<p>'
                                                + params.words('no_icons_were_found')
                                            + '</p>'
                                            + '<ul></ul>'
                                            + '<div class="ec-media-icons-list">'
                                                + '<div class="ec-media-icons-list-all">'
                                                    + '<ul></ul>'
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
                            + '<div class="ec-block-footer ec-display-none">'
                                + '<form method="post" enctype="multipart/form-data">'
                                    + '<input type="file" class="ef-files" id="ec-composer-icons-' + unique_id + '-input" multiple />'
                                + '</form>'
                            + '</div>'
                        + '</div>'
                    + '</div>' 
                + '</div>'  

            };

        }

        /**
         * Prepare a property from the option's value
         * 
         * @param params_type params
         * @param option_images_type option
         * 
         * @returns option_property_type as response
         */
        prepare_property(params: params_type, option: option_images_type): option_property_type {
            return;
        }

        /**
         * Provides the supported events for a template
         * 
         * @returns events_type | undefined as response
         */        
        get_events = (params: params_type): events_type | undefined => {

            return [{
                action: 'input',
                target: (e: Event): void => {

                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-option-icons') ) {

                        // Verify if is the search input
                        if ( target.classList.contains('ec-search-input') ) {

                            // Remove ec-search-complete class
                            target.closest('.ec-search')!.classList.remove('ec-search-complete');

                            // Add ec-search-active class
                            target.closest('.ec-search')!.classList.add('ec-search-active');

                            // Schedule event
                            Classes.Timer.schedule_event('search_icons', (): void => {

                                // Remove ec-search-active class
                                target.closest('.ec-search')!.classList.remove('ec-search-active'); 

                                // Verify if value is empty
                                if ( (target as HTMLInputElement).value.length > 0 ) {

                                    // Add ec-search-complete class
                                    target.closest('.ec-search')!.classList.add('ec-search-complete');   

                                }

                                // Remove the images
                                params.selector.querySelector('.ec-option-icons .ec-media-icons > ul')!.innerHTML = '';
                                params.selector.querySelectorAll('.ec-option-icons .ec-media-icons-list-all > ul')[0].innerHTML = '';

                                // Get the icons
                                get_icons(params, 1);                                

                            }, 1000);

                        }

                    }

                },
                capture: false

            }, {
                action: 'click',
                target: (e: MouseEvent): void => {

                    // Get target
                    let target = e.target as HTMLElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Verify if the click is inside the icons option
                        if ( target.closest('.ec-option-icons') ) {

                            // Check if is not input
                            if (target.nodeName !== 'INPUT') {
                                e.preventDefault();
                            }

                            // Verify if the user wants to see all images
                            if ( target.closest('.ec-media-title') && (target.nodeName === 'A') ) {

                                // Check if the class ec-media-icons-all exists
                                if ( target.closest('.ec-media-icons')!.classList.contains('ec-media-icons-all') ) {
                                    
                                    // Add ec-media-icons-all-hide class
                                    target.closest('.ec-media-icons')!.classList.add('ec-media-icons-all-hide');
    
                                    // Set a pause
                                    setTimeout(function () {
    
                                        // Remove the ec-media-icons-all-hide class
                                        target.closest('.ec-media-icons')!.classList.remove('ec-media-icons-all-hide'); 
    
                                        // Remove the ec-media-icons-all class
                                        target.closest('.ec-media-icons')!.classList.remove('ec-media-icons-all');
    
                                        // Add the ec-media-icons-preview class
                                        target.closest('.ec-media-icons')!.classList.add('ec-media-icons-preview');
    
                                    }, 300);
    
                                } else {          
    
                                    // Add ec-media-icons-all-show class
                                    target.closest('.ec-media-icons')!.classList.add('ec-media-icons-all-show');
    
                                    // Set a pause
                                    setTimeout(function () {
    
                                        // Remove the ec-media-icons-all-show class
                                        target.closest('.ec-media-icons')!.classList.remove('ec-media-icons-all-show'); 
    
                                        // Remove the ec-media-icons-preview class
                                        target.closest('.ec-media-icons')!.classList.remove('ec-media-icons-preview');
    
                                        // Add the ec-media-icons-all class
                                        target.closest('.ec-media-icons')!.classList.add('ec-media-icons-all');
    
                                    }, 300);
    
                                }
    
                            } else if ( target.closest('.ec-loading-button') ) {

                                // Add the ec-load-more-active class
                                target!.classList.add('ec-load-more-active')
    
                                // Set a pause
                                setTimeout((): void => {
    
                                    // Get the icons
                                    get_icons(params, parseInt(target.closest('.ec-loading-button')!.getAttribute('data-page') as string));
    
                                }, 1000);
    
                            } else if ( target.closest('.ec-search-complete') && (target.nodeName === 'A') ) {

                                // Remove ec-search-complete class
                                target.closest('.ec-search')!.classList.remove('ec-search-complete');

                                // Remove ec-search-active class
                                target.closest('.ec-search')!.classList.remove('ec-search-active');

                                // Reset search
                                (params.selector.querySelector('.ec-option-icons .ec-search-input') as HTMLInputElement).value = '';

                                // Get the icons
                                get_icons(params, 1);

                            } else if ( target.closest('.ec-sizes') && (target.nodeName === 'A') ) {

                                // Get icon's id
                                let icon_id: string | null = target.closest('.ec-sizes')!.closest('li')!.getAttribute('data-icon');

                                // Get size's id
                                let size: string | null = target.getAttribute('data-size');

                                // Download the icon
                                download_icon(params, icon_id!, size!);

                            }

                        }

                    }
                    
                },
                capture: false

            }];

        };

    }

}