/**
 * @file Code
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used for the code editor
 */

/**
 * Generates the index lines
 * 
 * @param Element | undefined | null selector
 * @param string location
 */
const show_index = (selector: Element | undefined | null): void => {

    // Verify if selector exists
    if ( typeof selector !== 'undefined' && selector ) {

        // All lines
        let all_lines: number = selector!.querySelectorAll('.ec-composer-code-editor-line').length;

        // Check if lines missing
        if ( all_lines < 1 ) {

            // New line
            let new_line: string = '<div class="ec-composer-code-editor-line"></div>';

            // Add line
            selector.querySelector('.ec-composer-code-lines')!.innerHTML = new_line;

            // Call again the lines
            all_lines = selector!.querySelectorAll('.ec-composer-code-editor-line')!.length;

        }

        // Index lines
        let lines: string = '';

        // Number for index
        let number: number = 1;

        // List the lines
        do {

            // Get height
            let height: number = (selector!.querySelectorAll('.ec-composer-code-editor-line')[(number - 1)] as HTMLElement).offsetHeight;

            // Set line
            lines += '<div class="ec-composer-code-editor-line-index" style="height: ' + height + 'px;">'
                + number
            + '</div>';

            // Increase number
            number++;

        } while ( number < (all_lines + 1) );

        // Set index lines
        selector!.querySelector('.ec-composer-code-index')!.innerHTML = lines;

    }

}

/**
 * Sanitize code
 * 
 * @param string code
 * 
 * @returns string with sanitized code
 */
const sanitize_code = (code: string): string => {

    // Remove &nbsp;
    code = code.replaceAll('    ', '').replaceAll(' ', ' ');
  
    // Remove any dangerous elements and attributes
    code = code.replace(/<script>/gi, '');
    code = code.replace(/<style>/gi, '');
    code = code.replace(/onload/gi, '');

    return code;

}

// Export functions
export {show_index, sanitize_code};