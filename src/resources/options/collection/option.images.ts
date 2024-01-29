/**
 * @class Images
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the Images option
 */

// Import the Classes
import Classes, {AbstractOptions} from "../../../classes/classes.index.js";

// Import inc
import {
    format_file_size,
    get_images
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

    // Export the class Images
    export class Images extends AbstractOptions.Abstracts.Options {

        /**
         * Prepare an option template
         * 
         * @param params_type params
         * @param option_images_type option
         * 
         * @returns {template: string} | undefined as response
         */
        prepare_template(params: params_type, option: option_images_type): {template: string} {

            // Set link option
            let has_link: string = option.has_link?' data-link="1"':' data-link="0"';

            // Unique checkbox id
            let unique_id: number = Date.now();

            return {

                template: '<div class="ec-w-100">'
                    + '<div>'
                        + '<div class="ec-block ec-option-media"' + has_link + '>'
                            + '<div class="ec-block-header">'
                                + '<div class="ec-search">'
                                    + '<input type="text" placeholder="' + params.words('search_for_images') + '" class="ec-search-input" id="ec-composer-search-images-' + unique_id + '-input">'
                                    + '<a href="#">'
                                        + params.icons('autorenew', {'icon_class': 'ec-load-more-icon'})
                                        + params.icons('cancel', {'icon_class': 'ec-cancel-icon'})
                                    + '</a>'
                                    + '<div class="ec-search-buttons">'
                                        + '<button type="button" class="ec-search-button ec-search-upload-media-section ec-search-active-button" data-target="#ec-search-upload-media-section-' + unique_id + '">'
                                            + params.icons('backup', {'icon_class': 'ec-image-upload-icon'})
                                        + '</button>'
                                        + '<button type="button" class="ec-search-button ec-search-list-media-section" data-target="#ec-search-list-media-section-' + unique_id + '">'
                                            + params.icons('image_search', {'icon_class': 'ec-image-search-icon'})
                                        + '</button>'
                                    + '</div>'
                                + '</div>'
                            + '</div>'
                            + '<div class="ec-block-body ec-scrollbar-container">'
                                + '<div class="ec-search-sections">'
                                    + '<div class="ec-search-section ec-search-section-show" id="ec-search-upload-media-section-' + unique_id + '">'
                                        + '<div class="ec-media-upload-box">'
                                            + '<h3 class="ec-media-title">'
                                                + '<span>'
                                                    + params.words('upload')
                                                + '</span>'
                                            + '</h3>'
                                            + '<div class="ec-media-upload-box-drop-area">'
                                                + '<div class="ec-media-upload-box-drop-area-start ec-media-upload-box-drop-area-show">'
                                                    + '<div class="ec-media-upload-box-icon-box">'
                                                        + '<div class="ec-media-upload-box-icon">'
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
                                                + '<div class="ec-media-upload-box-drop-area-drop">'
                                                    + '<div class="ec-media-upload-box-icon-box">'
                                                        + '<div class="ec-media-upload-box-icon">'
                                                            + params.icons('cloud_queue')
                                                        + '</div>'
                                                    + '</div>'                                        
                                                + '</div>'
                                            + '</div>'
                                        + '</div>'
                                        + '<div class="ec-media-uploaded-files">'
                                            + '<h3 class="ec-media-title">'
                                                + '<span>'
                                                    + params.words('files')
                                                + '</span>'
                                            + '</h3>'
                                            + '<ul class="ec-media-uploaded-files-list"></ul>'
                                        + '</div>'
                                    + '</div>'
                                    + '<div class="ec-search-section" id="ec-search-list-media-section-' + unique_id + '">'
                                        + '<div class="ec-media-images ec-media-images-preview">'
                                            + '<h3 class="ec-media-title">'
                                                + '<span>'
                                                    + params.words('gallery')
                                                + '</span>'
                                                + '<a href="#">'
                                                    + params.words('show_all')
                                                + '</a>'
                                            + '</h3>'
                                            + '<p>'
                                                + params.words('no_images_were_found')
                                            + '</p>'
                                            + '<ul></ul>'
                                            + '<div class="ec-media-images-list">'
                                                + '<div class="ec-media-images-list-two-columns">'
                                                    + '<div>'                                       
                                                    + '</div>'
                                                    + '<div>'
                                                    + '</div>'
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
                                    + '<input type="file" class="ef-files" id="ec-composer-images-' + unique_id + '-input" multiple />'
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
                action: 'dragover',
                target: (e: Event): void => {
                    e.preventDefault();

                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-media-upload-box-drop-area') ) {

                        // Remove the class ec-media-upload-box-drop-area-show from ec-media-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-start')[0].classList.remove('ec-media-upload-box-drop-area-show');

                        // Add the class ec-media-upload-box-drop-area-show to ec-media-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-drop')[0].classList.add('ec-media-upload-box-drop-area-show');

                    } else if ( (target !== null) && target.closest('.ec-option-media') ) {

                        // Remove the class ec-media-upload-box-drop-area-show from ec-media-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-drop')[0].classList.remove('ec-media-upload-box-drop-area-show');

                        // Add the class ec-media-upload-box-drop-area-show to ec-media-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-start')[0].classList.add('ec-media-upload-box-drop-area-show');

                    }

                },
                capture: false

            }, {
                action: 'dragleave',
                target: (e: Event): void => {
                    e.preventDefault();

                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-option-media') && !target.closest('.ec-media-upload-box-drop-area') ) {

                        // Remove the class ec-media-upload-box-drop-area-show from ec-media-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-drop')[0].classList.remove('ec-media-upload-box-drop-area-show');

                        // Add the class ec-media-upload-box-drop-area-show to ec-media-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-start')[0].classList.add('ec-media-upload-box-drop-area-show');

                    }

                },
                capture: false

            }, {
                action: 'drop',
                target: (e: Event): void => {
                    e.preventDefault();

                    // Get target
                    let target = e.target as HTMLInputElement;
                    
                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-option-media') ) {

                        // Remove the class ec-media-upload-box-drop-area-show from ec-media-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-drop')[0].classList.remove('ec-media-upload-box-drop-area-show');

                        // Add the class ec-media-upload-box-drop-area-show to ec-media-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-media-upload-box-drop-area-start')[0].classList.add('ec-media-upload-box-drop-area-show');

                        // Verify if files were dropped
                        if ( (e as DragEvent).dataTransfer!.files.length > 0 ) {

                            // Set the files
                            (target.closest('.ec-option-media')!.getElementsByClassName('ef-files')[0] as HTMLInputElement).files = (e as DragEvent).dataTransfer!.files;

                            // Run change
                            (target.closest('.ec-option-media')!.getElementsByClassName('ef-files')[0] as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

                        }

                    }

                },
                capture: false

            }, {
                action: 'input',
                target: (e: Event): void => {

                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-option-media') ) {

                        // Verify if is the search input
                        if ( target.classList.contains('ec-search-input') ) {

                            // Remove ec-search-complete class
                            target.closest('.ec-search')!.classList.remove('ec-search-complete');

                            // Add ec-search-active class
                            target.closest('.ec-search')!.classList.add('ec-search-active');

                            // Schedule event
                            Classes.Timer.schedule_event('search_images', (): void => {

                                // Remove ec-search-active class
                                target.closest('.ec-search')!.classList.remove('ec-search-active'); 

                                // Verify if value is empty
                                if ( (target as HTMLInputElement).value.length > 0 ) {

                                    // Add ec-search-complete class
                                    target.closest('.ec-search')!.classList.add('ec-search-complete');   

                                }

                                // Remove the images
                                params.selector.querySelector('.ec-option-media .ec-media-images > ul')!.innerHTML = '';
                                params.selector.querySelectorAll('.ec-option-media .ec-media-images-list-two-columns > div')[0].innerHTML = '';
                                params.selector.querySelectorAll('.ec-option-media .ec-media-images-list-two-columns > div')[1].innerHTML = '';

                                // Remove the show section class from upload box
                                params.selector.querySelector('.ec-option-media .ec-search-upload-media-section')!.classList.remove('ec-search-section-show');

                                // Add the show section class to the gallery
                                params.selector.querySelector('.ec-option-media .ec-search-list-media-section')!.classList.add('ec-search-section-show');

                                // Get the stored images
                                get_images(params, 1);                                

                            }, 1000);

                        }

                    }

                },
                capture: false

            }, {
                action: 'change',
                target: (e: Event): void => {
                    
                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-option-media') ) {

                        // Verify if files exists
                        if ( (target.files !== null) && (target.files!.length > 0) ) {

                            // Add uploaded images the the box
                            target.closest('.ec-option-media')!.getElementsByClassName('ec-media-uploaded-files-list')[0].innerHTML = '';

                            // Hide the files
                            target.closest('.ec-option-media')!.getElementsByClassName('ec-media-uploaded-files')[0].classList.remove('ec-media-uploaded-files-show'); 

                            // Uploaded images container
                            let uploaded_images: string = '';

                            // Index
                            let index: number = 0;

                            // List images
                            for ( let image of target.files ) {

                                // Add image to the uploaded list
                                uploaded_images += '<li class="ec-media-uploaded-file ec-media-uploaded-file-uploading" data-file="' + image.lastModified + '_' + image.size + '">'
                                    + '<div class="ec-grid">'
                                        + '<div class="ec-grid-column-11">'
                                            + '<div class="ec-media-uploaded-file-icon">'
                                                + params.icons('upload_file')
                                            + '</div>'
                                            + '<div class="ec-media-uploaded-file-info">'
                                                + '<h4>'
                                                    + image.name
                                                + '</h4>'
                                                + '<h6>'
                                                    + '<span class="ec-media-uploaded-done">0</span> / <span class="ec-media-upload-total" data-total="' + image.size + '">' + format_file_size(image.size) + '</span>'
                                                + '</h6>'
                                                + '<div class="ec-media-uploaded-file-loading-progress">'
                                                    + '<div class="ec-media-uploaded-file-loading-progress-bar"></div>'
                                                + '</div>'
                                            + '</div>'                                                        
                                        + '</div>'
                                        + '<div class="ec-grid-column-1">'
                                            + '<div class="ec-media-uploaded-percentage"></div>'
                                        + '</div>'
                                    + '</div>'                                    
                                + '</li>';

                                // Init the form data
                                let form = new FormData();

                                // Append file name
                                form.append('file_name', image.lastModified + '_' + image.size);

                                // Apend image
                                form.append('file', image);

                                // Init the HTTP Request class
                                let http: XMLHttpRequest = new XMLHttpRequest();
                        
                                // Set the url and method
                                http.open('POST', params.options('base_url') + 'api/upload_image', true);
                        
                                // Track progress with the onprogress event
                                http.upload.onprogress = function(this: {file_name: string}, e: any) {

                                    // Check if the size could be readed
                                    if (e.lengthComputable) {

                                        // Calculate the percentage
                                        let percent: number = (e.loaded / e.total) * 100;

                                        // Get total file size
                                        let file_size: string | null = target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + this.file_name + '"] .ec-media-upload-total')!.getAttribute('data-total');

                                        // Check if file size exists
                                        if ( file_size ) {

                                            // Calculate upload size
                                            let uploaded_size: number = (percent / 100) * parseInt(file_size);

                                            // Display the upload done
                                            target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + this.file_name + '"] .ec-media-uploaded-done')!.textContent = format_file_size(uploaded_size);   
                                            
                                        }

                                        // Display the percentage
                                        target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + this.file_name + '"] .ec-media-uploaded-percentage')!.textContent = percent.toFixed(0) + '%';                                        

                                        // Get progress width
                                        let progress_width: number = (target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + this.file_name + '"] .ec-media-uploaded-file-loading-progress') as HTMLElement).clientWidth;

                                        // Calculate progress bar width
                                        let progress_bar: number = (percent / 100) * progress_width;

                                        // Set progress bar width
                                        (target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + this.file_name + '"] .ec-media-uploaded-file-loading-progress-bar') as HTMLElement).style.width = progress_bar.toFixed(0) + 'px';

                                    }

                                }.bind({
                                    file_name: image.lastModified + '_' + image.size
                                });
                        
                                // Handle the completion of the upload
                                http.onload = function() {

                                    // Verify if the response is successfully
                                    if (http.status >= 200 && http.status < 300) {

                                        // Turn response to json
                                        let data: {success: boolean, message: string, file_name: string} = JSON.parse(http.response);

                                        // Verify if file name exists in the data and the file wasn't uploaded
                                        if ( typeof data.file_name !== 'undefined' ) {

                                            // Remove the class ec-media-uploaded-file-uploading
                                            target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + data.file_name + '"]')?.classList.add('ec-media-uploaded-file-uploading');                                        

                                            // Display the message
                                            target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + data.file_name + '"] h6')!.textContent = data.message;

                                            // Remove the images
                                            params.selector.querySelector('.ec-option-media .ec-media-images > ul')!.innerHTML = '';
                                            params.selector.querySelectorAll('.ec-option-media .ec-media-images-list-two-columns > div')[0].innerHTML = '';
                                            params.selector.querySelectorAll('.ec-option-media .ec-media-images-list-two-columns > div')[1].innerHTML = '';

                                        } else {

                                            // Add the class ec-media-uploaded-file-failed
                                            target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + data.file_name + '"]')?.classList.add('ec-media-uploaded-file-failed');

                                            // Display the error message
                                            target.closest('.ec-option-media')!.querySelector('.ec-media-uploaded-file[data-file="' + data.file_name + '"] h6')!.textContent = data.message;

                                        }

                                    } else {
                                        console.error('Upload failed with status ' + http.status);
                                    }

                                };
                        
                                // Handle errors during the upload
                                http.onerror = function() {
                                    console.error('There was an error with the XMLHttpRequest');
                                };
                        
                                // Send the FormData with the file
                                http.send(form);

                                // Increase index
                                index++;

                            }
                            
                            // Add uploaded images the the box
                            target.closest('.ec-option-media')!.getElementsByClassName('ec-media-uploaded-files-list')[0].innerHTML = uploaded_images;

                            // Show the uploaded files
                            target.closest('.ec-option-media')!.getElementsByClassName('ec-media-uploaded-files')[0].classList.add('ec-media-uploaded-files-show');                            

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
                    if ( (target !== null) && target.closest('.ec-option-media') ) {

                        // Check if is not input
                        if (target.nodeName !== 'INPUT') {
                            e.preventDefault();
                        }

                        // Check if ec-search-button exists
                        if ( target.closest('.ec-search-button') ) {

                            // Search for tab id
                            if ( target.closest('.ec-option-media')!.querySelector(target.getAttribute('data-target')!) ) {

                                // Add hide tab class
                                target.closest('.ec-option-media')!.querySelector(target.closest('.ec-option-media')!.getElementsByClassName('ec-search-active-button')[0].getAttribute('data-target')!)!.classList.add('ec-search-section-hide');

                                // Add start tab class
                                target.closest('.ec-option-media')!.querySelector(target.getAttribute('data-target')!)!.classList.add('ec-search-section-start');

                                // Set pause
                                setTimeout((): void => {

                                    // Remove the active link
                                    Array.from(target.closest('.ec-option-media')!.getElementsByClassName('ec-search-button')).forEach((element: Element) => {
                                        element.classList.remove('ec-search-active-button'); 
                                    });

                                    // Add active class
                                    target.classList.add('ec-search-active-button');
                                        
                                    // Remove the show class
                                    Array.from(target.closest('.ec-option-media')!.querySelector(target.getAttribute('data-target')!)!.closest('.ec-search-sections')!.getElementsByClassName('ec-search-section')).forEach((element: Element) => {
                                        element.classList.remove('ec-search-section-show', 'ec-search-section-hide', 'ec-search-section-start'); 
                                    });

                                    // Add show class
                                    target.closest('.ec-option-media')!.querySelector(target.getAttribute('data-target')!)!.classList.add('ec-search-section-show'); 

                                    // Verify if the target is the images gallery
                                    if ( target.getAttribute('data-target')!.substring(0, 30) === '#ec-search-list-media-section-' ) {

                                        // Verify if images exists
                                        if ( target.closest('.ec-option-media')!.querySelectorAll(target.getAttribute('data-target')! + ' .ec-media-images-list-two-columns a').length < 1 ) {

                                            // Get the stored images
                                            get_images(params, 1);

                                        }

                                    }
                                    
                                }, 100);

                            }

                        } else if ( target.closest('.ec-media-title') && (target.nodeName === 'A') ) {

                            // Check if the class ec-media-images-all exists
                            if ( target.closest('.ec-media-images')!.classList.contains('ec-media-images-all') ) {
                                
                                // Add ec-media-images-all-hide class
                                target.closest('.ec-media-images')!.classList.add('ec-media-images-all-hide');

                                // Set a pause
                                setTimeout(function () {

                                    // Remove the ec-media-images-all-hide class
                                    target.closest('.ec-media-images')!.classList.remove('ec-media-images-all-hide'); 

                                    // Remove the ec-media-images-all class
                                    target.closest('.ec-media-images')!.classList.remove('ec-media-images-all');

                                    // Add the ec-media-images-preview class
                                    target.closest('.ec-media-images')!.classList.add('ec-media-images-preview');

                                }, 300);

                            } else {          

                                // Add ec-media-images-all-show class
                                target.closest('.ec-media-images')!.classList.add('ec-media-images-all-show');

                                // Set a pause
                                setTimeout(function () {

                                    // Remove the ec-media-images-all-show class
                                    target.closest('.ec-media-images')!.classList.remove('ec-media-images-all-show'); 

                                    // Remove the ec-media-images-preview class
                                    target.closest('.ec-media-images')!.classList.remove('ec-media-images-preview');

                                    // Add the ec-media-images-all class
                                    target.closest('.ec-media-images')!.classList.add('ec-media-images-all');

                                }, 300);

                            }

                        } else if ( target.closest('.ec-media-upload-box') && (target.nodeName === 'A') ) {

                            // Select a file
                            (target.closest('.ec-option-media')!.getElementsByClassName('ef-files')[0] as HTMLElement).click();

                        } else if ( target.closest('.ec-loading-button') ) {

                            // Add the ec-load-more-active class
                            target!.classList.add('ec-load-more-active')

                            // Set a pause
                            setTimeout((): void => {

                                // Get the stored images
                                get_images(params, parseInt(target.closest('.ec-loading-button')!.getAttribute('data-page') as string));

                            }, 1000);

                        } else if ( target.closest('.ec-search-complete') && (target.nodeName === 'A') ) {

                            // Remove ec-search-complete class
                            target.closest('.ec-search')!.classList.remove('ec-search-complete');

                            // Remove ec-search-active class
                            target.closest('.ec-search')!.classList.remove('ec-search-active');

                            // Reset search
                            (params.selector.querySelector('.ec-option-media .ec-search-input') as HTMLInputElement).value = '';

                            // Get the stored images
                            get_images(params, 1);

                        } else if ( target.closest('.ec-media-images') && (target.nodeName === 'A') ) {

                            // Verify if the image is selected
                            if ( target.classList.contains('ec-media-image-selected') ) {

                                // List the images
                                Array.from(target.closest('.ec-media-images')!.getElementsByTagName('a')).map(image => {

                                    // Remove the ec-media-image-selected class
                                    image.classList.remove('ec-media-image-selected');

                                });

                                // Get the element's name
                                let element_name: string = target.closest('.ec-display-flex')?.getAttribute('data-element')?target.closest('.ec-display-flex')?.getAttribute('data-element') as string:'';

                                // Get iframe
                                let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    let iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get content's data
                                        let content_data: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                        // Verify if content data exists
                                        if ( content_data ) {

                                            // Verify if element name is 
                                            if ( element_name === '.ec-element-image' ) {

                                                // Add the ec-element-cover class
                                                content_data.getElementsByClassName('ec-element-image')[0].classList.add('ec-element-cover');

                                                // Create the image cover
                                                let image_cover: Element = document.createElement('div');

                                                // Add html
                                                image_cover.innerHTML = (iframeDocument.querySelector('.ec-element-content-active')!.getAttribute('data-name') === 'video')?params.icons('video'):params.icons('image');

                                                // Add image
                                                content_data.getElementsByClassName('ec-element-image')[0].replaceChildren(image_cover.firstChild!);

                                            }

                                        }

                                    }

                                }

                            } else {

                                // List the images
                                Array.from(target.closest('.ec-media-images')!.getElementsByTagName('a')).map(image => {

                                    // Verify if the data id should be selected
                                    if ( image.getAttribute('data-id') === target.getAttribute('data-id')! ) {

                                        // Add the class ec-media-image-selected
                                        image.classList.add('ec-media-image-selected');

                                    } else {

                                        // Remove the ec-media-image-selected class
                                        image.classList.remove('ec-media-image-selected');

                                    }

                                });

                                // Get the element's name
                                let element_name: string = target.closest('.ec-display-flex')?.getAttribute('data-element')?target.closest('.ec-display-flex')?.getAttribute('data-element') as string:'';

                                // Create the image
                                let image: HTMLImageElement = document.createElement('img');

                                // Set src
                                image.src = target.getAttribute('href') as string;

                                // Set alt
                                image.alt = target.getElementsByTagName('img')[0].getAttribute('alt') as string;

                                // Set image's id as attribute
                                image.setAttribute('data-id', target.getAttribute('data-id')!);

                                // Get iframe
                                let iframe: HTMLIFrameElement = this.params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                                // Verify if iframe exists
                                if ( iframe ) {

                                    // Get content document
                                    let iframeDocument: Document | null = iframe.contentDocument;

                                    // Check if iframeDocument is not null
                                    if ( iframeDocument !== null ) {

                                        // Get content's data
                                        let content_data: Element | null = iframeDocument.querySelector('.ec-element-content-active .ec-element-content-data');

                                        // Verify if content data exists
                                        if ( content_data ) {

                                            // Verify if element name is 
                                            if ( element_name === '.ec-element-image' ) {

                                                // Add image
                                                content_data.getElementsByClassName('ec-element-image')[0].replaceChildren(image);

                                                // Remove the ec-element-cover class
                                                content_data.getElementsByClassName('ec-element-image')[0].classList.remove('ec-element-cover');

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                },
                capture: false

            }];

        };

    }

}