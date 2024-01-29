/**
 * @class Prepare
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class removes unnecessary characters from the code
 */

// Html Formatter
export namespace HtmlFormatter {

    // Prepare the code
    export class Prepare {

        /**
         * Prepare the code
         * 
         * @param string html code
         * 
         * @returns string
         */
        code(html: string): string {

            // Define fcode
            let fcode: string = html;

            // Search for <
            if ( fcode.search('< ') > -1 ) {
                fcode = fcode.replaceAll('< ', '<');
            }

            // Search for >
            if ( fcode.search(' >') > -1 ) {
                fcode = fcode.replaceAll(' >', '>');
            }    

            // Search for <
            if ( fcode.search(' <') > -1 ) {
                fcode = fcode.replaceAll(' <', '<');
            }

            // Search for br
            if ( fcode.search('<br>') > -1 ) {
                fcode = fcode.replaceAll('<br>', '<br />');
            }
            
            // Search for br
            if ( fcode.search('<br >') > -1 ) {
                fcode = fcode.replaceAll('<br >', '<br />');
            }

            // Search for hr
            if ( fcode.search('<hr>') > -1 ) {
                fcode = fcode.replaceAll('<hr>', '<hr />');
            }
            
            // Search for hr
            if ( fcode.search('<hr >') > -1 ) {
                fcode = fcode.replaceAll('<hr >', '<hr />');
            }

            // Remove break lines
            fcode = fcode.replaceAll("\r", '');
            fcode = fcode.replaceAll("\n", '');

            return fcode;

        }

    }

}