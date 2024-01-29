/**
 * @class Modules
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class handles the events for the emails composer modules
 */

// Import components interface
import Classes, { InterfaceComponents } from '../../classes/classes.index.js';

// Import inc
import {
    format_file_size,
    get_content,
    remove_buttons
} from '../../inc/inc.index.js';

// Import the types
import { module_type } from '../../resources/types/types.index.js';

// Components
export namespace Components {

    // Modules
    export class Modules implements InterfaceComponents.Interfaces.Components {

        get_events(params: any): any {

            return [{
                action: 'dragover',
                target: (e: Event): void => {
                    e.preventDefault();

                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( (target !== null) && target.closest('.ec-cover-upload-box-drop-area') ) {

                        // Remove the class ec-cover-upload-box-drop-area-show from ec-cover-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-start')[0].classList.remove('ec-cover-upload-box-drop-area-show');

                        // Add the class ec-cover-upload-box-drop-area-show to ec-cover-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-drop')[0].classList.add('ec-cover-upload-box-drop-area-show');

                    } else if ( (target !== null) && target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]') ) {

                        // Remove the class ec-cover-upload-box-drop-area-show from ec-cover-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-drop')[0].classList.remove('ec-cover-upload-box-drop-area-show');

                        // Add the class ec-cover-upload-box-drop-area-show to ec-cover-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-start')[0].classList.add('ec-cover-upload-box-drop-area-show');

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
                    if ( (target !== null) && target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]') && !target.closest('.ec-cover-upload-box-drop-area') ) {

                        // Remove the class ec-cover-upload-box-drop-area-show from ec-cover-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-drop')[0].classList.remove('ec-cover-upload-box-drop-area-show');

                        // Add the class ec-cover-upload-box-drop-area-show to ec-cover-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-start')[0].classList.add('ec-cover-upload-box-drop-area-show');

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
                    if ( (target !== null) && target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]') ) {

                        // Remove the class ec-cover-upload-box-drop-area-show from ec-cover-upload-box-drop-area-drop
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-drop')[0].classList.remove('ec-cover-upload-box-drop-area-show');

                        // Add the class ec-cover-upload-box-drop-area-show to ec-cover-upload-box-drop-area-start
                        params.selector!.getElementsByClassName('ec-cover-upload-box-drop-area-start')[0].classList.add('ec-cover-upload-box-drop-area-show');

                        // Verify if files were dropped
                        if ( (e as DragEvent).dataTransfer!.files.length > 0 ) {

                            // Set the files
                            (params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-file') as HTMLInputElement).files = (e as DragEvent).dataTransfer!.files;

                            // Run change
                            (params.selector.querySelector('.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-file') as HTMLInputElement).dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));

                        }

                    }

                },
                capture: false

            }, {
                action: 'mousedown',
                target: (e: MouseEvent): void => {

                    // Check if the mouse is pressed
                    if ( e.buttons === 1 ) {

                        // Save target
                        let target = e.target as Element;

                        // Verify if is the class ec-module
                        if ( target.classList.contains('ec-module') ) {
                            e.preventDefault();

                            // List all modules
                            Array.from(params.selector.getElementsByClassName('ec-module')).map((module): void => {

                                // Remove the temp classes
                                (module as Element).classList.remove('ec-module-temp', 'ec-module-temp-show');

                            });

                            // Set temp class
                            target.classList.add('ec-module-temp');   

                            // Clone module
                            let module = target.cloneNode(true) as HTMLElement;

                            // Get client rect of the cloned module
                            let cloned: DOMRect = target.getBoundingClientRect();

                            // Set ec-module-drag-active class
                            module.classList.add('ec-module-drag-active');
                            
                            // Get the top position
                            let top: number = (e.clientY - cloned.y);

                            // Get the left position
                            let left: number = (e.clientX - cloned.x);

                            // Set top
                            module.setAttribute('data-top', top.toString());

                            // Set left
                            module.setAttribute('data-left', left.toString());
                            
                            // Set width
                            module.style.width = cloned.width + 'px';

                            // Set height
                            module.style.height = cloned.height + 'px';

                            // Set top position
                            module.style.top = (e.clientY - top) + 'px';
                            
                            // Set left position
                            module.style.left = (e.clientX - left) + 'px';
    
                            // Append module
                            target.closest('.ec-composer')!.insertAdjacentElement('beforeend', module);

                            // Get iframe
                            let iframe: HTMLIFrameElement = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                            // Get all lines
                            let lines: HTMLCollectionOf<Element> = iframe.contentWindow!.document.getElementsByClassName('ec-composer-template-content-line');

                            // List the lines
                            for ( let line of lines ) {

                                // Create a div for drop locations
                                let drops: any = document.createElement('div');

                                // Add ec-composer-template-content-line-drop class
                                drops.classList.add('ec-composer-template-content-line-drop');

                                // Add icon
                                drops.innerHTML = params.icons('unfold_less');

                                // Insert drop
                                line.insertAdjacentElement('afterend', drops);

                            }

                            // Create a div for drop locations
                            let drops: Element = document.createElement('div');

                            // Add ec-composer-template-content-line-drop class
                            drops.classList.add('ec-composer-template-content-line-drop');

                            // Add icon
                            drops.innerHTML = params.icons('unfold_less');

                            // Add drops
                            iframe.contentWindow!.document.getElementsByClassName('ec-composer-template')[0].insertAdjacentElement('afterbegin', drops);

                        }

                    }

                },
                capture: false
                
            }, {
                action: 'mousemove',
                target: (e: MouseEvent): void => {
                    
                    // Verify if the mouse is pressed
                    if ( e.buttons === 1 ) {

                        // Check if ec-module-drag-active exists
                        if ( params.selector.getElementsByClassName('ec-module-drag-active').length > 0 ) {
                            e.preventDefault();

                            // Get module
                            let module: HTMLElement = params.selector.getElementsByClassName('ec-module-drag-active')[0];
                                               
                            // Get top
                            let top: number = (e.clientY - parseInt(module.getAttribute('data-top')!));

                            // Get left
                            let left: number = (e.clientX - parseInt(module.getAttribute('data-left')!));

                            // Set top position
                            module.style.top = top + 'px';

                            // Set left position
                            module.style.left = left + 'px';

                            // Get iframe
                            let iframe: any = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                            // Get iframe client rect
                            let iframe_rect: DOMRect | undefined = iframe?.getBoundingClientRect();

                            // Verify if a drag active content exists
                            if ( iframe instanceof HTMLIFrameElement ) {

                                // Get line
                                let line: HTMLElement = params.selector.getElementsByClassName('ec-module-drag-active')[0];

                                // Get iframe body
                                let iframe_body: HTMLCollectionOf<HTMLBodyElement> | undefined = iframe?.contentWindow!.document.getElementsByTagName('body');

                                // Check if iframe body exists
                                if ( iframe_body ) {

                                    // Check if iframe_body has the ec-composer-template-preview class
                                    if ( iframe_body[0].classList.contains('ec-composer-template-preview') ) {
                                        return;
                                    }

                                    // Get line position
                                    let line_position: DOMRect = line.getBoundingClientRect();

                                    // Calculate line top
                                    let line_top: number = line_position.y;

                                    // Calculate line height
                                    let line_height: number = line_position.height;        

                                    // Verify if ec-composer-template-content-line-drop exists
                                    if ( iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {

                                        // List the drops
                                        Array.from(iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop')).map((item: Element): void => {
                                            item.classList.remove('ec-composer-template-content-line-drop-active');
                                        });

                                        // Found marker
                                        let found: number = 0;
                                        
                                        // List the drops
                                        Array.from(iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop')).forEach((element: Element): void => {
                                            
                                            // Verify if found is 1
                                            if ( found > 0 ) return;

                                            // Get element position
                                            let element_position: DOMRect = element.getBoundingClientRect();

                                            // Get element top
                                            let element_top: number = (iframe_rect instanceof DOMRect)?(iframe_rect.y + element_position.y):0;

                                            // Check if dragged line is over a drop line
                                            if ( (line_top <= element_top) && ((line_top + line_height) >= element_top) ) {
                                                
                                                // Set drop active
                                                element.classList.add('ec-composer-template-content-line-drop-active');

                                                // Increase found
                                                found++;
                                                
                                                return;

                                            } else if ( !element.nextElementSibling ) {

                                                // Check if the line is below the drop
                                                if ( ((line_top - element_top) > -1) && ((line_top - element_top) < 300) ) {

                                                    // Set drop active
                                                    element.classList.add('ec-composer-template-content-line-drop-active');

                                                    // Increase found
                                                    found++;
                                                    
                                                    return;
                                                    
                                                }

                                            }

                                        });

                                    }
                                    
                                }

                            }

                        }

                    }

                },
                capture: false

            }, {
                action: 'mouseup',
                target: (e: any): void => {
                    e.preventDefault();

                    // Check if ec-module-drag-active exists
                    if ( params.selector.getElementsByClassName('ec-module-drag-active').length > 0 ) {
                            
                        // Get iframe
                        let iframe: HTMLIFrameElement = params.selector.getElementsByClassName('ec-composer-template-container')[0];

                        // Get iframe body
                        let iframe_body: HTMLCollectionOf<HTMLBodyElement> | undefined = iframe?.contentWindow!.document.getElementsByTagName('body');

                        // Check if iframe body exists
                        if ( iframe_body ) {

                            // Get child
                            let iframe_body_child: HTMLElement = iframe_body[0];

                            // Check if drop active exists
                            if ( iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop-active').length > 0 ) {

                                // Get line
                                let new_line: Element = get_content({
                                    'format': 7
                                });

                                // Append in structures
                                iframe_body[0].getElementsByClassName('ec-composer-template-content-line-drop-active')[0].insertAdjacentElement('afterend', new_line);

                            }

                            // Verify if ec-composer-template-content-line-drop exists
                            if ( iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop').length > 0 ) {
                                
                                // List the drops
                                Array.from(iframe_body_child.getElementsByClassName('ec-composer-template-content-line-drop')).map((item: Element): void => {
                                    item.remove();
                                });

                            }

                            // Remove the module
                            params.selector.getElementsByClassName('ec-module-drag-active')[0].remove();

                            // Get the module's ID
                            let module_id: string = params.selector.getElementsByClassName('ec-module-temp')[0].getAttribute('data-module');

                            // Get the module's type
                            let module_type: string = (Array.prototype.indexOf.call(Array.from(params.selector.getElementsByClassName('ec-module-temp')[0].closest('.ec-search-sections').getElementsByClassName('ec-search-section')), params.selector.getElementsByClassName('ec-module-temp')[0].closest('.ec-search-section')) < 1)?'personal':'default';

                            // Remove the temporary class
                            params.selector.getElementsByClassName('ec-module-temp')[0].classList.remove('ec-module-temp');  
                            
                            // Get module by ID
                            new Classes.Modules().get_module(params, module_id, module_type);

                        }

                    }

                },
                capture: false

            }, {
                action: 'input',
                element: '.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-menu-module-name',
                target: (e: InputEvent): void => {
                    e.preventDefault();

                    // Get target
                    let target = e.target as HTMLInputElement;    

                    // Add the expand class
                    (target as Element).closest('.ec-composer-modal')!.getElementsByClassName('ec-module-advanced-fields')[0].classList.add('ec-module-advanced-fields-expand');

                    // Set a pause
                    setTimeout((): void => {

                        // Remove the expand class
                        (target as Element).closest('.ec-composer-modal')!.getElementsByClassName('ec-module-advanced-fields')[0].classList.remove('ec-module-advanced-fields-expand');
                        
                        // Add the expanded class
                        (target as Element).closest('.ec-composer-modal')!.getElementsByClassName('ec-module-advanced-fields')[0].classList.add('ec-module-advanced-fields-expanded');

                    }, 300);

                },
                capture: false
            }, {
                action: 'input',
                element: '.ec-modules-component .ec-search .ec-search-input',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Remove ec-search-complete class
                        target.closest('div')!.classList.remove('ec-search-complete');

                        // Add ec-search-active class
                        target.closest('div')!.classList.add('ec-search-active');

                        // Schedule event
                        Classes.Timer.schedule_event('search_images', (): void => {

                            // Remove ec-search-active class
                            target.closest('div')!.classList.remove('ec-search-active'); 

                            // Verify if value is empty
                            if ( (target as HTMLInputElement).value.length > 0 ) {

                                // Add ec-search-complete class
                                target.closest('div')!.classList.add('ec-search-complete');   

                            }

                            // Verify if is the personal tab
                            if ( target.classList.contains('ec-search-personal-modules') ) {

                                // Empty the modules list
                                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules')!.innerHTML = '';

                                // Load the modules
                                new Classes.Modules().get_modules(params, 'personal', 1);    

                            } else {

                                // Empty the modules list
                                params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules')!.innerHTML = '';

                                // Load the modules
                                new Classes.Modules().get_modules(params, 'default', 1);    

                            }

                        }, 1000);

                        
                    }

                },
                capture: false

            }, {
                action: 'change',
                element: '.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-file',
                target: (e: Event): void => {
                    
                    // Get target
                    let target = e.target as HTMLInputElement;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Get the create module modal
                        let create_module: Element | null = target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]');

                        // Verify if files exists
                        if ( (target.files !== null) && (target.files!.length > 0) ) {

                            // Add uploaded images the the box
                            create_module!.getElementsByClassName('ec-cover-uploaded-files-list')[0].innerHTML = '';

                            // Hide the files
                            create_module!.getElementsByClassName('ec-cover-uploaded-files')[0].classList.remove('ec-cover-uploaded-files-show'); 

                            // Uploaded images container
                            let uploaded_images: string = '';

                            // Index
                            let index: number = 0;

                            // List images
                            for ( let image of target.files ) {

                                // Add image to the uploaded list
                                uploaded_images += '<li class="ec-cover-uploaded-file ec-cover-uploaded-file-uploading" data-file="' + image.lastModified + '_' + image.size + '">'
                                    + '<div class="ec-grid">'
                                        + '<div class="ec-grid-column-11">'
                                            + '<div class="ec-cover-uploaded-file-icon">'
                                                + params.icons('upload_file')
                                            + '</div>'
                                            + '<div class="ec-cover-uploaded-file-info">'
                                                + '<h4>'
                                                    + image.name
                                                + '</h4>'
                                                + '<h6>'
                                                    + '<span class="ec-cover-uploaded-done">0</span> / <span class="ec-cover-upload-total" data-total="' + image.size + '">' + format_file_size(image.size) + '</span>'
                                                + '</h6>'
                                                + '<div class="ec-cover-uploaded-file-loading-progress">'
                                                    + '<div class="ec-cover-uploaded-file-loading-progress-bar"></div>'
                                                + '</div>'
                                            + '</div>'                                                        
                                        + '</div>'
                                        + '<div class="ec-grid-column-1">'
                                            + '<div class="ec-cover-uploaded-percentage"></div>'
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
                                http.open('POST', params.options('api_url') + 'api/upload_module_cover', true);
                        
                                // Track progress with the onprogress event
                                http.upload.onprogress = function(this: {file_name: string}, e: any) {

                                    // Check if the size could be readed
                                    if (e.lengthComputable) {

                                        // Calculate the percentage
                                        let percent: number = (e.loaded / e.total) * 100;

                                        // Get total file size
                                        let file_size: string | null = create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + this.file_name + '"] .ec-cover-upload-total')!.getAttribute('data-total');

                                        // Check if file size exists
                                        if ( file_size ) {

                                            // Calculate upload size
                                            let uploaded_size: number = (percent / 100) * parseInt(file_size);

                                            // Display the upload done
                                            create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + this.file_name + '"] .ec-cover-uploaded-done')!.textContent = format_file_size(uploaded_size);   
                                            
                                        }

                                        // Display the percentage
                                        create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + this.file_name + '"] .ec-cover-uploaded-percentage')!.textContent = percent.toFixed(0) + '%';                                        

                                        // Get progress width
                                        let progress_width: number = (create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + this.file_name + '"] .ec-cover-uploaded-file-loading-progress') as Element).clientWidth;

                                        // Calculate progress bar width
                                        let progress_bar: number = (percent / 100) * progress_width;

                                        // Set progress bar width
                                        (create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + this.file_name + '"] .ec-cover-uploaded-file-loading-progress-bar') as HTMLElement).style.width = progress_bar.toFixed(0) + 'px';

                                    }

                                }.bind({
                                    file_name: image.lastModified + '_' + image.size
                                });
                        
                                // Handle the completion of the upload
                                http.onload = function() {

                                    // Verify if the response is successfully
                                    if (http.status >= 200 && http.status < 300) {

                                        // Turn response to json
                                        let data: {success: boolean, message: string, file_name: string, original_name?: string} = JSON.parse(http.response);

                                        // Verify if file name exists in the data and the file wasn't uploaded
                                        if ( !data.success && (typeof data.file_name !== 'undefined') ) {

                                            // Remove the class ec-cover-uploaded-file-uploading
                                            create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + data.file_name + '"]')!.classList.add('ec-cover-uploaded-file-uploading');                                        

                                            // Add the class ec-cover-uploaded-file-failed
                                            create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + data.file_name + '"]')!.classList.add('ec-cover-uploaded-file-failed');

                                            // Display the error message
                                            create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + data.file_name + '"] h6')!.textContent = data.message;

                                        } else if ( typeof data.original_name !== 'undefined' ) {

                                            // Set the name
                                            create_module!.querySelector('.ec-cover-uploaded-file[data-file="' + data.file_name + '"]')!.setAttribute('data-name', data.original_name);

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

                                break;

                            }
                            
                            // Add uploaded images the the box
                            create_module!.getElementsByClassName('ec-cover-uploaded-files-list')[0].innerHTML = uploaded_images;

                            // Show the uploaded files
                            create_module!.getElementsByClassName('ec-cover-uploaded-files')[0].classList.add('ec-cover-uploaded-files-show');                            

                        }

                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-composer-menu a[data-scope="modules"]',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {
                        e.preventDefault();

                        // Verify if the modules should be loaded
                        if ( params.selector.querySelectorAll('.ec-modules-component .ec-search-sections > .ec-search-section')[0].getAttribute('loading') ) {

                            // Remove the loading attribute
                            params.selector.querySelectorAll('.ec-modules-component .ec-search-sections > .ec-search-section')[0].removeAttribute('loading');

                            // Load the modules
                            new Classes.Modules().get_modules(params, 'personal', 1);

                        }
                        
                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-cover-upload-box-drop-area a',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {
                        e.preventDefault();

                        // Get the create module modal
                        let create_module: Element | null = target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]');

                        // Trigger click
                        (create_module!.getElementsByClassName('ec-file')[0] as HTMLElement).click();
                        
                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-composer-modal[data-scope="ec-composer-create-module-modal"] .ec-save-module-button',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Remove the class ec-composer-modal-message-success and ec-composer-modal-message-error
                        target.closest('.ec-composer-modal-footer')!.getElementsByClassName('ec-composer-modal-message')[0].classList.remove('ec-composer-modal-message-success', 'ec-composer-modal-message-error');

                        // Get the create module modal
                        let create_module: Element | null = target.closest('.ec-composer-modal[data-scope="ec-composer-create-module-modal"]');

                        // Create the module's content
                        let module: module_type = {
                            name: (create_module!.getElementsByClassName('ec-menu-module-name')[0] as HTMLInputElement).value,
                            category: create_module!.getElementsByClassName('ec-module-category-button')[0].getAttribute('data-id'),
                            description: (create_module!.getElementsByClassName('ec-menu-module-description')[0] as HTMLInputElement).value
                        };

                        // Verify if a cover exists
                        if ( create_module!.getElementsByClassName('ec-cover-uploaded-file').length > 0 ) {

                            // Set cover
                            module['cover'] = create_module!.getElementsByClassName('ec-cover-uploaded-file')[0].getAttribute('data-name');


                        }

                        // Get iframe for template
                        let itemplate = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content document
                        let idocument: Document | null = itemplate.contentDocument;

                        // Check if idocument is not null
                        if ( idocument ) {

                            // Get the selected lines
                            let selected_lines: HTMLCollectionOf<Element> = idocument.getElementsByClassName('ec-composer-template-content-line-selected');

                            // Verify if selected lines exists
                            if ( selected_lines.length > 0 ) {

                                // Get the html content
                                module['html'] = remove_buttons(selected_lines[0].outerHTML);

                                // Styles container
                                module['css'] = '';

                                // Get the elements
                                let elements: HTMLCollectionOf<Element> = selected_lines[0].getElementsByClassName('ec-element-content');

                                // Verify if elements exists
                                if ( elements.length > 0 ) {

                                    // List the elements
                                    for ( let element of elements ) {

                                        // Get element's id
                                        let element_id: string | null = element.getAttribute('data-id');

                                        // Verify if element's id exists
                                        if ( !element_id ) {
                                            continue;
                                        }

                                        // Get the style tag
                                        let style: HTMLStyleElement | null = idocument.head.querySelector('style[data-element="' + element_id + '"]');

                                        // Verify if the tag style exists
                                        if ( style ) {

                                            // Add style to the container
                                            module['css'] += style.outerHTML.replaceAll(element_id, element_id);

                                        }

                                    }

                                }

                            }

                        }

                        // Add the ec-saving-module-button class
                        target.classList.add('ec-saving-module-button');

                        // Set a pause
                        setTimeout((): void => {

                            // Create the module
                            new Classes.Modules().create_module(params, module);

                        }, 1000);

                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-modules-component .ec-search-buttons .ec-search-button',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {

                        // Add hide tab class
                        target.closest('.ec-modules-component')!.querySelector(target.closest('.ec-modules-component')!.getElementsByClassName('ec-search-active-button')[0].getAttribute('data-target')!)!.classList.add('ec-search-section-hide');

                        // Add start tab class
                        target.closest('.ec-modules-component')!.querySelector(target.getAttribute('data-target')!)!.classList.add('ec-search-section-start');

                        // Set pause
                        setTimeout((): void => {

                            // Remove the active link
                            Array.from(target.closest('.ec-search-buttons')!.getElementsByClassName('ec-search-button')).forEach((element: Element) => {
                                element.classList.remove('ec-search-active-button'); 
                            });

                            // Add active class
                            target.classList.add('ec-search-active-button');

                            // Remove the show class
                            Array.from(target.closest('.ec-modules-component')!.getElementsByClassName('ec-search-section')).forEach((element: Element) => {
                                element.classList.remove('ec-search-section-show', 'ec-search-section-hide', 'ec-search-section-start'); 
                            });

                            // Add show class
                            target.closest('.ec-modules-component')!.querySelector(target.getAttribute('data-target')!)!.classList.add('ec-search-section-show'); 

                            // Verify if is the default tab
                            if ( target.closest('.ec-search')!.classList.contains('ec-search-default') ) {

                                // Remove the class ec-search-default
                                target.closest('.ec-search')!.classList.remove('ec-search-default');

                                // Add the class ec-search-personal
                                target.closest('.ec-search')!.classList.add('ec-search-personal');                                

                            } else {

                                // Remove the class ec-search-personal
                                target.closest('.ec-search')!.classList.remove('ec-search-personal');

                                // Add the class ec-search-default
                                target.closest('.ec-search')!.classList.add('ec-search-default');  

                                // Verify if modules exists
                                if ( target.closest('.ec-modules-component')!.querySelectorAll(target.getAttribute('data-target')! + ' .ec-modules .ec-module').length < 1 ) {

                                    // Get the default modules
                                    new Classes.Modules().get_modules(params, 'default', 1);

                                }

                            }
                            
                        }, 100);
                        
                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-modules-component .ec-search-sections > .ec-search-section .ec-loading-button',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {
                        e.preventDefault();

                        // Get the module's type
                        let module_type: string = (Array.prototype.indexOf.call(Array.from(target.closest('.ec-search-sections')!.getElementsByClassName('ec-search-section')), target.closest('.ec-search-section')) < 1)?'personal':'default';

                        // Add the ec-load-more-active class
                        target!.classList.add('ec-load-more-active')

                        // Set a pause
                        setTimeout((): void => {

                            // Create page
                            let page: number = target.closest('.ec-loading-button')!.getAttribute('data-page')?parseInt(target.closest('.ec-loading-button')!.getAttribute('data-page')!):1;

                            // Load the modules
                            new Classes.Modules().get_modules(params, module_type, page);

                        }, 1000);
                        
                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-modules-component .ec-search a',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {
                        e.preventDefault();

                        // Remove ec-search-complete class
                        target.closest('div')!.classList.remove('ec-search-complete');

                        // Remove ec-search-active class
                        target.closest('div')!.classList.remove('ec-search-active');

                        // Reset search
                        (target.closest('div')!.getElementsByClassName('ec-search-input')[0] as HTMLInputElement).value = '';

                        // Verify if is the personal tab
                        if ( target.closest('.ec-search')!.classList.contains('ec-search-personal') ) {

                            // Empty the modules list
                            params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:first-child .ec-modules')!.innerHTML = '';

                            // Load the modules
                            new Classes.Modules().get_modules(params, 'personal', 1);    

                        } else {

                            // Empty the modules list
                            params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules')!.innerHTML = '';

                            // Load the modules
                            new Classes.Modules().get_modules(params, 'default', 1);    

                        }
                        
                    }

                },
                capture: false

            }, {
                action: 'click',
                element: '.ec-modules-component .ec-categories a',
                target: (e: MouseEvent): void => {
                    
                    // Get target
                    let target = e.target as Element;

                    // Verify if target exists
                    if ( target !== null ) {
                        e.preventDefault();

                        // Get the Category ID
                        let category_id: string | null = target.getAttribute('data-id');

                        // Get the Category's name
                        let category_name: string | null = target.textContent;

                        // Verify if Category ID and Category's name is not null
                        if ( category_id && category_name ) {

                            // Set Category ID
                            target.closest('.ec-option-selector-dropdown')!.getElementsByClassName('ec-button')[0]!.setAttribute('data-id', category_id);

                            // Set Category Name
                            target.closest('.ec-option-selector-dropdown')!.querySelector('.ec-button > span')!.textContent = category_name;

                            // Empty the modules list
                            params.selector.querySelector('.ec-modules-component .ec-search-sections > .ec-search-section:last-child .ec-modules')!.innerHTML = '';

                            // Load the modules
                            new Classes.Modules().get_modules(params, 'default', 1);   

                        }
                        
                    }

                },
                capture: false

            }];

        }

    }

}