/**
 * @class Lines
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates lines for a code
 */

// Css Formatter
export namespace CssFormatter {

    // Add lines
    export class Lines {

        /**
         * Add lines
         * 
         * @param string fcode contains the formatted code
         * 
         * @returns string
         */
        add_lines(fcode: string): string {

            // Split the code
            let splits: any = fcode.split("\r\n");
            
            // Open container
            let open: string = '';

            // List the splits
            for ( let split of splits ) {

                // Check if split has a property
                if ( (split.indexOf('ec-code-css-text') > -1) && (split.indexOf('ec-code-css-dots') > -1) && (split.indexOf('ec-code-css-end') > -1) && (split.indexOf('ec-code-css-curly-bracket-open') < 0) ) {

                    // Set space after dots
                    split = split.replace('<span class="ec-code-css-dots">:</span>', '<span class="ec-code-css-dots">: </span>');

                }

                // Add line
                open += this.add_line(split);

            }

            return open;

        }

        /**
         * Add a line
         * 
         * @param string value with line content
         * 
         * @returns string
         */
        add_line(value: string): string {

            // Check if value exists
            if ( value.length < 1 ) {
                return '';
            }
            
            return '<div class="ec-composer-code-editor-line">'
                + '<div class="ec-composer-code-editor-line-code">'
                    + value
                + '</div>'                                
            + '</div>';

        }

    }

}