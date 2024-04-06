/**
 * @file Media
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the functions to read and manage the media's files
 */

// Import inc
import {
    show_message
} from './inc.index.js';

// Import the types
import { params_type } from "../resources/types/types.index.js";

/**
 * Format the file size
 * 
 * @param number size
 * 
 * @returns string
 */
export const format_file_size = (size: number): string => {

    // Set 1 kilobyte size
    const kilobyte: number = 1024;

    // Set 1 megabyte size
    const megabyte: number = kilobyte * 1024;

    // Set 1 kilobyte size
    const gigabyte: number = megabyte * 1024;

    // Verify if the size is less than 1 kb
    if (size < kilobyte) {

        return size + ' B';

    } else if (size < megabyte) {

        return (size / kilobyte).toFixed(2) + ' KB';

    } else if (size < gigabyte) {

        return (size / megabyte).toFixed(2) + ' MB';

    } else {

        return (size / gigabyte).toFixed(2) + ' GB';

    }

}

/**
 * Get the images by page
 * 
 * @param params_type params
 * @param number page
 * 
 * @returns void
 */
export const get_images = async (params: params_type, page: number): Promise<void> => {

    // Get the search
    const search = params.selector.querySelector('.ec-option-media .ec-search-input') as HTMLInputElement;

    // Get the search value
    const search_value = search.value;

    // Prepare the post's fields
    const post_fields: { page: number; search?: string } = {
        page: page,
        search: search_value
    };

    // Prepare the request parameters
    const request_params: {[key: string]: string | {
        [key: string]: string
    }} = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post_fields)
    };

    // Get the response
    const response = await fetch(params.options('api_url') + 'api/get_images', request_params);

    // Verify if the response is failed
    if (!response.ok) {

        // Handle different error statuses
        if (response.status === 404) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('resource_not_found'));

        } else if (response.status === 500) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('internal_server_error'));            
            
        } else {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('unknown_error_occurred'));             
            
        }

        return;
        
    }

    // Turn response into json
    const json = await response.json();

    // Verify if images exists
    if ( (typeof json.images !== 'undefined') && (json.images.length > 0) ) {

        // Image id container
        let image_id: number = 0;

        // Get iframe
        const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

        // Verify if iframe exists
        if ( iframe ) {

            // Get content document
            const iframeDocument: Document | null = iframe.contentDocument;

            // Check if iframeDocument is not null
            if ( iframeDocument !== null ) {

                // Get the image
                const image: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data img');

                // Verify if image exists
                if ( image && image.getAttribute('data-id') ) {

                    // Replace the image's id
                    image_id = parseInt(image.getAttribute('data-id')!);

                }

            }

        }

        // Remove the class ec-media-images-not-found
        params.selector.querySelector('.ec-media-images')!.classList.remove('ec-media-images-not-found');

        // Preview container
        const preview: string[] = [];

        // Images counter
        let c: number = 0;

        // Get the gallery parent
        const gallery: NodeListOf<Element> = params.selector.querySelectorAll('.ec-media-images .ec-media-images-list-two-columns > div')

        // List the images
        for ( const image of json.images ) {

            // Selected class
            const selected_class: string = (image.id === image_id)?' class="ec-media-image-selected"':'';

            // Verify if preview contains more than 2 items
            if ( (preview.length < 3) && (json.page! < 2) ) {

                // Add preview item
                preview.push('<li>'
                    + '<a href="' + params.options('share_url') + image.original + '"' + selected_class + ' data-id="' + image.id + '">'
                        + '<img src="' + params.options('share_url') + image.thumbnail + '" alt="' + image.name + '">'
                        + params.icons('task_alt')
                    + '</a>'
                + '</li>');

            }

            // Create image
            const image_single: string = '<a href="' + params.options('share_url') + image.original + '"' + selected_class + ' data-id="' + image.id + '">'
                + '<img src="' + params.options('share_url') + image.thumbnail + '" alt="' + image.name + '">'
                + params.icons('task_alt')
            + '</a>';
            
            // Verify if c is divisible by 2
            if (c % 2 === 0) {

                // Add image
                gallery[0].insertAdjacentHTML('beforeend', image_single);

            } else {

                // Add image
                gallery[1].insertAdjacentHTML('beforeend', image_single);

            }

            // Increase counter
            c++;

        }

        // Verify if the gallery is showed
        if ( !params.selector.querySelector('.ec-media-images')?.classList.contains('ec-media-images-preview') && !params.selector.querySelector('.ec-media-images')?.classList.contains('ec-media-images-all') ) {

            // Add preview
            params.selector.querySelector('.ec-media-images')!.classList.add('ec-media-images-preview');

        }

        // Verify if are listed the first images
        if (json.page! < 2) {

            // Add preview
            params.selector.querySelector('.ec-media-images > ul')!.innerHTML = preview.join('');

        }

        // Remove the ec-load-more-active class
        params.selector.querySelector('.ec-media-images .ec-loading-button > a')!.classList.remove('ec-load-more-active');

        // Set page for the loading button
        params.selector.querySelector('.ec-media-images .ec-loading-button')!.setAttribute('data-page', (json.page! + 1).toString());

        // Verify if there are more than 9 images
        if ( json.images.length > 9 ) {

            // Remove the ec-loading-disabled-button class
            params.selector.querySelector('.ec-media-images .ec-loading-button')!.classList.remove('ec-loading-disabled-button');                

        } else {

            // Add the ec-loading-disabled-button class
            params.selector.querySelector('.ec-media-images .ec-loading-button')!.classList.add('ec-loading-disabled-button');

        }

    } else {

        // Verify if images exists
        if ( params.selector.querySelectorAll('.ec-media-images .ec-media-images-list-two-columns a')!.length < 1 ) {

            // Remove the class ec-media-images-preview and ec-media-images-all
            params.selector.querySelector('.ec-media-images')!.classList.remove('ec-media-images-preview', 'ec-media-images-all');

            // Add the class ec-media-images-not-found
            params.selector.querySelector('.ec-media-images')!.classList.add('ec-media-images-not-found');

        }

    }
    
};

/**
 * Get the icons by page
 * 
 * @param params_type params
 * @param number page
 * 
 * @returns void
 */
export const get_icons = async (params: params_type, page: number): Promise<void> => {

    // Prepare the fields
    const fields: { page: number; search?: string } = {
        page: page,
        search: (params.selector.querySelector('.ec-option-icons .ec-search-input') as HTMLInputElement).value
    };

    // Create the parameters
    const request_params: {[key: string]: string | {
        [key: string]: string
    }} = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(fields),
    };

    // Make the fetch request
    const response = await fetch(params.options('api_url') + 'api/get_icons', request_params);

    // Verify if the response is failed
    if (!response.ok) {

        // Handle different error statuses
        if (response.status === 404) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('resource_not_found'));

        } else if (response.status === 500) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('internal_server_error'));            
            
        } else {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('unknown_error_occurred'));             
            
        }

        return;
        
    }

    // Process the response
    const json = await response.json();

    // Verify if icons exists
    if ( (typeof json.icons !== 'undefined') && (json.icons.length > 0) ) {

        // Remove the class ec-media-icons-not-found
        params.selector.querySelector('.ec-media-icons')!.classList.remove('ec-media-icons-not-found');

        // Preview container
        const preview: string[] = [];

        // Icons container
        let icons: string = '';

        // Icons counter
        let c: number = 0;

        // List the icons
        for ( const icon of json.icons ) {

            // Sizes container
            let sizes: string = '';

            // Verify if the icon has sizes
            if ( icon.sizes.length > 0 ) {

                // List the sizes
                for ( const size of icon.sizes ) {

                    // Add size to the container
                    sizes += '<li>'
                        + '<a href="#" data-size="' + size.size + '">'
                            + size.size + 'px'
                        + '</a>'
                    + '</li>';

                }

            }

            // Verify if preview contains more than 3 items
            if ( (preview.length < 4) && (json.page! < 2) ) {

                // Add preview item
                preview.push('<li data-icon="' + icon.icon_id + '">'
                    + '<div class="ec-option-selector-dropdown">'
                        + '<a href="#" class="ec-button ec-option-icons-sizes-button">'
                            + params.icons('file_download')
                        + '</a>'
                        + '<div class="ec-option-selector-menu">'
                            + '<ul class="ec-sizes">'
                                + sizes
                            + '</ul>'
                        + '</div>'
                    + '</div>'
                    + '<img src="' + icon.cover + '" alt="' + icon.icon_id + '">'
                + '</li>');

            }

            // Add icon to the container
            icons += '<li data-icon="' + icon.icon_id + '">'
                + '<div class="ec-option-selector-dropdown">'
                    + '<a href="#" class="ec-button ec-option-icons-sizes-button">'
                        + params.icons('file_download')
                    + '</a>'
                    + '<div class="ec-option-selector-menu">'
                        + '<ul class="ec-sizes">'
                            + sizes
                        + '</ul>'
                    + '</div>'
                + '</div>'
                + '<img src="' + icon.cover + '" alt="' + icon.icon_id + '">'
            + '</li>';

            // Increase counter
            c++;

        }

        // Get the gallery parent
        const gallery: NodeListOf<Element> = params.selector.querySelectorAll('.ec-media-icons .ec-media-icons-list-all > ul');

        // Append icons
        gallery[0].insertAdjacentHTML('beforeend', icons);

        // Verify if the gallery is showed
        if ( !params.selector.querySelector('.ec-media-icons')?.classList.contains('ec-media-icons-preview') && !params.selector.querySelector('.ec-media-icons')?.classList.contains('ec-media-icons-all') ) {

            // Add preview
            params.selector.querySelector('.ec-media-icons')!.classList.add('ec-media-icons-preview');

        }

        // Verify if are listed the first images
        if (json.page! < 2) {

            // Add preview
            params.selector.querySelector('.ec-media-icons > ul')!.innerHTML = preview.join('');

        }

        // Remove the ec-load-more-active class
        params.selector.querySelector('.ec-media-icons .ec-loading-button > a')!.classList.remove('ec-load-more-active');

        // Set page for the loading button
        params.selector.querySelector('.ec-media-icons .ec-loading-button')!.setAttribute('data-page', (json.page! + 1).toString());

        // Verify if there are more than 9 images
        if ( json.icons.length > 9 ) {

            // Remove the ec-loading-disabled-button class
            params.selector.querySelector('.ec-media-icons .ec-loading-button')!.classList.remove('ec-loading-disabled-button');                

        } else {

            // Add the ec-loading-disabled-button class
            params.selector.querySelector('.ec-media-icons .ec-loading-button')!.classList.add('ec-loading-disabled-button');

        }

    } else {

        // Verify if images exists
        if ( params.selector.querySelectorAll('.ec-media-icons .ec-media-icons-list-all a')!.length < 1 ) {

            // Remove the class ec-media-icons-preview and ec-media-icons-all
            params.selector.querySelector('.ec-media-icons')!.classList.remove('ec-media-icons-preview', 'ec-media-icons-all');

            // Add the class ec-media-icons-not-found
            params.selector.querySelector('.ec-media-icons')!.classList.add('ec-media-icons-not-found');

        }

    }

};

/**
 * Get the icon by id
 * 
 * @param params_type params
 * @param string icon_id
 * @param string size
 * 
 * @returns void
 */
export const download_icon = async (params: params_type, icon_id: string, size: string): Promise<void> => {

    // Prepare the fields
    const fields: {icon_id: string, size: string} = {
        icon_id: icon_id,
        size: size
    };

    // Prepare the request
    const request_params: {[key: string]: string | {
        [key: string]: string
    }} = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fields)
    };

    // Get the response
    const response = await fetch(params.options('api_url') + 'api/get_icon', request_params);

    // Verify if the response is failed
    if (!response.ok) {

        // Handle different error statuses
        if (response.status === 404) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('resource_not_found'));

        } else if (response.status === 500) {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('internal_server_error'));            
            
        } else {

            // Show error message
            show_message(params.words('error_name') + ': ' + params.words('unknown_error_occurred'));             
            
        }

        return;
        
    }

    // Process the response
    const json: {success: boolean, message: string, file_name?: string, file_path?: string} = await response.json();

    // Verify if file name exists in the data and the icon was downloaded
    if ( json.success && (typeof json.file_name !== 'undefined') ) {

        setTimeout(() => {

            // Create the image
            const image: HTMLImageElement = document.createElement('img');

            // Set src
            image.src = params.options('share_url') + json.file_path!;

            // Set alt
            image.alt = json.file_name as string;

            // Get iframe
            const iframe: HTMLIFrameElement = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

            // Verify if iframe exists
            if ( iframe ) {

                // Get content document
                const iframeDocument: Document | null = iframe.contentDocument;

                // Check if iframeDocument is not null
                if ( iframeDocument !== null ) {

                    // Get content's data
                    const content_data: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data .ec-element-image');

                    // Verify if content data exists
                    if ( content_data ) {

                        // Add image
                        content_data.replaceChildren(image);

                        // Remove the ec-element-cover class
                        content_data.classList.remove('ec-element-cover');

                    }

                }

            }

        }, 300);



    } else {

        // Show error message
        show_message(params.words('error_name') + ': ' + json.message);
        
    }

};
