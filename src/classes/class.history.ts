/**
 * @class History
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * I'm using this class to read the history
 */

// Import the classes
import Classes from "../classes/classes.index.js";

// Import types
import { params_type } from '../resources/types/types.index.js';

// Import inc
import {
    get_date, 
    get_time, 
    show_message, 
    get_structure_buttons, 
    get_element_buttons, 
    get_placeholder,
    get_styles
} from '../inc/inc.index.js';

// Class Namespace
export namespace Class {

    // History
    export class History {

        /**
         * Get history all with limited number of updates by day
         * 
         * @param params_type params
         * @param number page
         * @param number limit
         */
        async get_history_all(params: params_type, page: number = 1, limit: number = 10): Promise<void> {

            // Init http request
            const http_send = new Classes.Https();

            // Get the history records
            const get_history = await http_send.get(params.options('api_url') + 'api/get_history_all/' + params.template_id + '/' + page + '/' + limit);

            // Check if success exists
            if ( get_history.success ) {

                // Get data
                const data = get_history.data as string[];

                // Get total records
                const thistory = data?.length;

                // History container
                let history = '';

                // List the history records
                for ( let h = 0; h < thistory; h++ ) {

                    // Check if h is greater than 9 and stop
                    if ( h > 9 ) {
                        break;
                    }

                    // Updates container
                    let updates: string = '';

                    // Total updates
                    const tupdates: number = data[h][1].length;

                    // List the updates
                    for ( let u = 0; u < tupdates; u++ ) {

                        // Only 4 results
                        if ( u > 3 ) {
                            break;
                        }

                        // Active class
                        const active: string = (u < 1 && h < 1)?' ec-history-record-active':'';

                        // Restore button container
                        let restore_button: string = '<button type="button" class="ec-button ec-history-restore-button">'
                            + params.words('restore')
                            + '<div>'
                                + params.icons('backup_restore')
                            + '</div>'
                        + '</button>';

                        // Verify if is the first record
                        if (u < 1 && h < 1) {

                            // Reset restore button
                            restore_button = '';

                        }

                        // Add update to the container
                        updates += '<li class="ec-history-record' + active + '">'
                            + '<div class="ec-grid" data-time="' + data[h][1][u] + '">'
                                + '<div class="ec-grid-column-7">'
                                    + '<span>'
                                        + get_time(params, data[h][1][u])
                                    + '</span>'
                                + '</div>'
                                + '<div class="ec-grid-column-5">'
                                    + restore_button
                                + '</div>'
                            + '</div>'
                        + '</li>';

                    }

                    // Load more container
                    let load_more: string = '';

                    // Verify if total is greater than 4
                    if ( tupdates > 4 ) {

                        // Set more
                        load_more = '<li class="ec-history-navigation">'
                            + '<div class="ec-loading-navigation-button">'
                                + '<a href="#" data-page="4">'
                                    + params.icons('south')
                                    + params.words('load_more')
                                + '</a>'
                            + '</div>'
                        + '</li>';

                    }

                    // Add history to the container
                    history += '<div class="ec-block ec-history-component" data-history="' + data[h][1][0] + '">'
                        + '<div class="ec-block-body ec-scrollbar-container">'
                            + '<div class="ec-history-records">'
                                + '<h3 class="ec-history-title">'
                                    + '<span>'
                                        + get_date(params, data[h][1][0])
                                    + '</span>'
                                + '</h3>'
                                + '<ul class="ec-history-records-preview">'
                                    + updates
                                    + load_more                                                                                                           
                                + '</ul>'                                
                            + '</div>'
                        + '</div>'
                    + '</div>';

                }

                setTimeout(() => {

                    // Get the section footer with pagination
                    const section_footer: HTMLElement = params.selector.getElementsByClassName('ec-section-history')[0].getElementsByClassName('ec-section-footer')[0] as HTMLElement;

                    // Get the button for pagination
                    const pagination_button = section_footer.getElementsByClassName('ec-loading-button')[0] as HTMLElement;

                    // Disable button animation
                    section_footer.getElementsByTagName('a')[0].classList.remove('ec-load-more-active');

                    // Check if thistory is greater than 10
                    if ( thistory > 10 ) {

                        // Show pagination
                        pagination_button.style.display = 'block';

                        // Set page
                        section_footer.getElementsByTagName('a')[0].setAttribute('data-page', (page + 1).toString());

                    } else {

                        // Hide pagination
                        pagination_button.style.display = 'none';

                    }

                    // Check if page is greater than 1
                    if ( page > 1 ) {

                        // Display the history
                        params.selector.getElementsByClassName('ec-section-history')[0].getElementsByClassName('ec-section-body')[0].innerHTML += history;

                    } else {

                        // Display the history
                        params.selector.getElementsByClassName('ec-section-history')[0].getElementsByClassName('ec-section-body')[0].innerHTML = history;

                    }

                }, 1000);

            } else {

                // Show error message
                show_message(params.words('error_name') + ': ' + get_history.message);

            }

        }

        /**
         * Get history updates by date
         * 
         * @param params_type params
         * @param number date
         * @param number page
         * @param number limit
         */
        async get_history_by_date(params: params_type, date: number, page: number = 0, limit: number = 4): Promise<void> {

            // Init http request
            const http_send = new Classes.Https();

            // Get the history records
            const get_history = await http_send.get(params.options('api_url') + 'api/get_history_by_date/' + params.template_id  + '/' + date + '/' + page + '/' + limit);

            // Check if success exists
            if ( get_history.success ) {

                // Get data
                const data = get_history.data as string[];

                // Updates container
                let updates: string = '';

                // Total updates
                const tupdates: number = data.length;

                // List the updates
                for ( let u = 0; u < tupdates; u++ ) {

                    // Only 4 results
                    if ( u > 3 ) {
                        break;
                    }

                    // Add update to the container
                    updates += '<li class="ec-history-record">'
                        + '<div class="ec-grid" data-time="' + data[u] + '">'
                            + '<div class="ec-grid-column-7">'
                                + '<span>'
                                    + get_time(params, data[u])
                                + '</span>'
                            + '</div>'
                            + '<div class="ec-grid-column-5">'
                                + '<button type="button" class="ec-button ec-history-restore-button">'
                                    + params.words('restore')
                                    + '<div>'
                                        + params.icons('backup_restore')
                                    + '</div>'
                                + '</button>'
                            + '</div>'
                        + '</div>'
                    + '</li>';

                }

                // Verify if total is greater than 4
                if ( tupdates > 4 ) {

                    // Insert page
                    params.selector.querySelector('.ec-section-history .ec-history-component[data-history="' + date + '"] .ec-history-navigation a')!.setAttribute('data-page', (page + 4).toString());

                } else {

                    // Get pagination
                    const pagination: HTMLElement | null = params.selector.querySelector('.ec-section-history .ec-history-component[data-history="' + date + '"] .ec-history-navigation');

                    // Check if pagination is not null
                    if ( pagination !== null ) {

                        // Hide pagination
                        pagination.style.display = 'none';

                    }

                }

                // Display the history
                params.selector.querySelector('.ec-section-history .ec-history-component[data-history="' + date + '"] .ec-history-navigation')!.insertAdjacentHTML('beforebegin', updates);

            } else {

                // Show error message
                show_message(params.words('error_name') + ': ' + get_history.message);

            }

        }

        /**
         * Get last saved history
         * 
         * @param params_type params
         * @param string iframe
         */
        async get_history_recent(params: params_type, iframe: string): Promise<void> {

            // Init http request
            const http_send = new Classes.Https();

            // Get the history records
            const get_history = await http_send.get(params.options('api_url') + 'api/get_history_recent/' + params.template_id);

            // Check if success exists
            if ( get_history.success ) {

                // Verify if html exists
                if ( typeof get_history.data !== 'undefined' ) {

                    // Prepare the data
                    const content = get_history.data as {name?: string, html?: string, css?: {content: string, elements?: Array<{element_id: string, content: string}>} };

                    // Get iframe for template
                    const itemplate = params.selector!.getElementsByClassName(iframe)[0] as HTMLIFrameElement;

                    // Get content document
                    const idocument: Document | null = itemplate.contentDocument;

                    // Verify if template's name exists
                    if (typeof content.name !== 'undefined') {

                        // Set template's name
                        params.selector!.getElementsByClassName('ec-composer-name-text')[0].textContent = content.name;

                    }

                    // Verify if html exists
                    if ( (typeof content.html !== 'undefined') && (idocument !== null) ) {
                    
                        // Get the iframe body
                        const body: Element = idocument.body;

                        // Verify if content.html is <div class="ec-composer-template"></div>
                        if ( content.html === '<div class="ec-composer-template"></div>' ) {

                            // Set default content
                            content.html = `<div class="ec-composer-template">
                                <div class="ec-composer-template-content-line">
                                    <table class="ec-composer-template-content">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="ec-composer-template-row">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div class="ec-composer-template-cell"></div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>`;

                        }

                        // Empty the content
                        body.innerHTML = '';

                        // Append template container
                        body.innerHTML = content.html.replaceAll('<div class="ec-composer-template-cell"></div>', '<div class="ec-composer-template-cell">' + get_placeholder() + '</div>');

                        // Check if ec-composer-template exists
                        if ( body.getElementsByClassName('ec-composer-template').length > 0 ) {

                            // Get template
                            const template = body.getElementsByClassName('ec-composer-template')[0] as HTMLElement;

                            // Add ec-composer-template-editor class
                            template.classList.add('ec-composer-template-editor');

                            // Add transform
                            template.style.cssText = `
                                transform: scaleY(0);
                            `;
                            
                            // Set pause
                            setTimeout((): void => {

                                // Add transform
                                template.style.cssText = `
                                    transform: scaleY(1);
                                    transform-origin: top !important;
                                `;

                            }, 300);

                        }

                        // Get structures buttons
                        const structure_buttons: string = get_structure_buttons();
                        
                        // Get all structures
                        const structures: HTMLCollectionOf<Element> = body.getElementsByClassName('ec-composer-template-content-line');

                        // Verify if structures exists
                        if ( structures.length > 0 ) {

                            // List the structures
                            Array.from(structures).map((structure: Element): void => {

                                // Add buttons
                                structure.insertAdjacentHTML('afterbegin', structure_buttons);

                            });

                        }

                        // Get elements buttons
                        const elements_buttons: string = get_element_buttons();

                        // Get all elements
                        const elements: HTMLCollectionOf<Element> = body.getElementsByClassName('ec-element-content');

                        // Verify if elements exists
                        if ( elements.length > 0 ) {

                            // List the elements
                            Array.from(elements).map((element: Element): void => {

                                // Add buttons
                                element.insertAdjacentHTML('beforeend', elements_buttons);

                            });

                        }

                        // Get all texts cells
                        const texts: NodeListOf<Element> = body.querySelectorAll('.ec-element-content[data-name="text"]');

                        // Verify if texts exists
                        if ( texts.length > 0 ) {

                            // List the texts
                            Array.from(texts).map((text: Element): void => {

                                // Add contenteditable
                                text.getElementsByClassName('ec-element-content-data')[0].setAttribute('contenteditable', 'true');

                            });

                        }

                        // Init the backup
                        new Classes.Backup().save_html_update(params);

                    }

                    // Elements id container
                    const elements_id: string[] = [];
                    
                    // Verify if CSS exists
                    if ( (typeof content.css !== 'undefined') && (idocument !== null) ) {

                        // Verify if elements exists
                        if ( (typeof content.css.elements !== 'undefined') && (content.css.elements.length > 0) ) {

                            // Elements styles container
                            let elements_styles: string = '';

                            // List the elements
                            for ( const element of content.css.elements ) {

                                // Set id
                                elements_id.push(element.element_id);

                                // Create style
                                const style: HTMLElement = document.createElement('style');

                                // Add element's id
                                style.setAttribute('data-element', element.element_id);

                                // Prepare the style 
                                let css_style: string = '';

                                // Append properties
                                css_style += element.content;

                                // Add content
                                style.innerHTML = css_style;

                                // Add element
                                elements_styles += style.outerHTML;

                            }

                            // Append styles
                            idocument.head.innerHTML += elements_styles;

                        }

                        // Verify if content exists
                        if ( (typeof content.css.content !== 'undefined') && content.css.content ) {

                            // Check for default styles
                            if ( idocument.head.querySelector('style[data-scope="default"]') ) {

                                // Replace styles
                                idocument.head.querySelector('style[data-scope="default"]')!.innerHTML = content.css.content;

                                // Properties list
                                const properties_list: {[key: string]: {[key: string]: number | string}} = {};

                                // Get default's style
                                const default_styles: Element | null | undefined = idocument.head.querySelector('style[data-scope="default"]');

                                // Verify if default's style exists
                                if ( (typeof default_styles !== 'undefined') && default_styles ) {

                                    // Get the sheet
                                    const sheet: CSSStyleSheet | null = (default_styles as HTMLStyleElement).sheet;

                                    // Check if sheet exists
                                    if ( sheet !== null ) {

                                        // Verify if rules exists
                                        if ( sheet.cssRules.length > 0 ) {

                                            // List all rules
                                            for ( const rule of sheet.cssRules ) {

                                                // Check if media exists
                                                if ( typeof (rule as CSSMediaRule).media === 'undefined' ) {

                                                    // Get style
                                                    const style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                                                    // List the properties
                                                    for ( const property of (rule as CSSStyleRule).style ) {

                                                        // Verify if element's name is already saved
                                                        if ( typeof properties_list[(rule as CSSStyleRule).selectorText] !== 'undefined' ) {

                                                            // Save style
                                                            properties_list[(rule as CSSStyleRule).selectorText][property] = style.getPropertyValue(property);

                                                        } else {

                                                            // Save style
                                                            properties_list[(rule as CSSStyleRule).selectorText] = {
                                                                [property]: style.getPropertyValue(property)
                                                            };

                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                }

                                // Verify if the property .ec-composer-template exists
                                if ( typeof properties_list['.ec-composer-template'] !== 'undefined' ) {

                                    // Verify if background-color exists
                                    if ( typeof properties_list['.ec-composer-template']['background-color'] !== 'undefined' ) {

                                        // Set background color
                                        (params.selector.getElementsByClassName('ec-composer-container')[0] as HTMLElement).style.backgroundColor = properties_list['.ec-composer-template']['background-color'] as string;

                                        // Verify if the preview is showed
                                        if ( params.selector.getElementsByClassName('ec-composer-preview')[0].classList.contains('ec-composer-preview-show') ) {

                                            // Get background's color
                                            let background = properties_list['.ec-composer-template']['background-color'] as string;

                                            // Verify if background is transparent
                                            if ( background === 'transparent' ) {

                                                // Replace the background color
                                                background = '#7a7a7b';

                                            }

                                            // Set background color
                                            (params.selector.getElementsByClassName('ec-composer-preview')[0] as HTMLElement).style.backgroundColor = background;
                                            
                                        }

                                    }

                                }

                            }

                        } else {

                            // Replace styles
                            idocument.head.querySelector('style[data-scope="default"]')!.innerHTML = get_styles('default');

                            // Set background's color
                            const background = '#7a7a7b';

                            // Set background color in template
                            (params.selector.getElementsByClassName('ec-composer-container')[0] as HTMLElement).style.backgroundColor = background;

                            // Set background color in preview
                            (params.selector.getElementsByClassName('ec-composer-preview')[0] as HTMLElement).style.backgroundColor = background;

                        }

                    }

                    // Create styles
                    new Classes.Styles().create_styles(params, iframe, elements_id);

                }
                
            } else {

                // Show error message
                show_message(params.words('error_name') + ': ' + get_history.message);

            }

        }

        /**
         * Record history record by time
         * 
         * @param params_type params
         * @param number time
         */
        async restore_history_record(params: params_type, time: number): Promise<void> {

            // Init http request
            const http_send = new Classes.Https();

            // Restore and get the history record
            const get_history = await http_send.get(params.options('api_url') + 'api/restore_history_record/' + params.template_id  + '/' + time);

            // Check if success exists
            if ( get_history.success ) {

                // Remove the ec-history-restore-active-button class
                params.selector!.getElementsByClassName('ec-history-restore-active-button')[0].classList.remove('ec-history-restore-active-button');

                // Get last saved change
                this.get_history_recent(params, 'ec-composer-template-container');
                
                // Get all history
                new Classes.History().get_history_all(params);

                // Verify if html exists
                /*if ( typeof get_history.data !== 'undefined' ) {

                    // Prepare the data
                    const content = get_history.data as {html?: string };

                    // Verify if html exists
                    if ( typeof content.html !== 'undefined' ) {

                        // Get iframe for template
                        const itemplate = params.selector!.getElementsByClassName('ec-composer-template-container')[0] as HTMLIFrameElement;

                        // Get content document
                        const idocument: Document | null = itemplate.contentDocument;

                        // Check if idocument is not null
                        if ( idocument ) {

                            // Get the iframe body
                            const body: Element = idocument.body;

                            // Empty the content
                            body.innerHTML = '';

                            // Append template container
                            body.innerHTML = content.html.replaceAll('<div class="ec-composer-template-cell"></div>', '<div class="ec-composer-template-cell">' + get_placeholder() + '</div>');

                            // Check if ec-composer-template exists
                            if ( body.getElementsByClassName('ec-composer-template').length > 0 ) {

                                // Get template
                                const template = body.getElementsByClassName('ec-composer-template')[0] as HTMLElement;

                                // Add transform
                                template.style.cssText = `
                                    transform: scaleY(0);
                                `;
                                
                                // Set pause
                                setTimeout((): void => {

                                    // Add transform
                                    template.style.cssText = `
                                        transform: scaleY(1);
                                        transform-origin: top !important;
                                    `;

                                }, 300);

                            }

                            // Remove the ec-composer-container-preview class from the composer container
                            params.selector.getElementsByClassName('ec-composer-container')[0].classList.remove('ec-composer-container-preview');

                            // Remove the ec-composer-template-preview class
                            body.classList.remove('ec-composer-template-preview');

                            // Get structures buttons
                            const structure_buttons: string = get_structure_buttons();

                            // Get all structures
                            const structures: HTMLCollectionOf<Element> = body.getElementsByClassName('ec-composer-template-content-line');

                            // Verify if structures exists
                            if ( structures.length > 0 ) {

                                // List the structures
                                Array.from(structures).map((structure: Element): void => {

                                    // Add buttons
                                    structure.insertAdjacentHTML('afterbegin', structure_buttons);

                                });

                            }

                            // Get elements buttons
                            const elements_buttons: string = get_element_buttons();

                            // Get all elements
                            const elements: HTMLCollectionOf<Element> = body.getElementsByClassName('ec-element-content');

                            // Verify if elements exists
                            if ( elements.length > 0 ) {

                                // List the elements
                                Array.from(elements).map((element: Element): void => {

                                    // Add buttons
                                    element.insertAdjacentHTML('beforeend', elements_buttons);

                                });

                            }

                            // Get all texts cells
                            const texts: NodeListOf<Element> = body.querySelectorAll('.ec-element-content[data-name="text"]');

                            // Verify if texts exists
                            if ( texts.length > 0 ) {

                                // List the texts
                                Array.from(texts).map((text: Element): void => {

                                    // Add contenteditable
                                    text.getElementsByClassName('ec-element-content-data')[0].setAttribute('contenteditable', 'true');

                                });

                            }

                        }

                        // Init the backup
                        new Classes.Backup().save_html_update(params);

                        // Get all history
                        new Classes.History().get_history_all(params);

                    }

                }*/
                
            } else {

                // Remove the ec-history-restore-active-button class
                params.selector!.getElementsByClassName('ec-history-restore-active-button')[0].classList.remove('ec-history-restore-active-button');

                // Show error message
                show_message(params.words('error_name') + ': ' + get_history.message);

            }

        }

    }

}