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

// Html Formatter
export namespace HtmlFormatter {

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
            let splits: string[] = fcode.split("\r\n");
            
            // Open container
            let open: string = '';

            // Total splits
            let total_splits: number = splits.length;

            // Lines counter
            let l: number = 1;

            // List the splits
            do {

                // Add line
                open += this.add_line(splits[(l - 1)].replaceAll('<span class="ec-code-whitespace"> </span>', '<span class="ec-code-whitespace">&nbsp;</span>'));

                // Incease counter
                l++;

            } while(l < total_splits);

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

            return '<div class="ec-composer-code-editor-line">'
                + '<div class="ec-composer-code-editor-line-code">'
                    + value
                + '</div>'                                
            + '</div>';

        }

    }

}