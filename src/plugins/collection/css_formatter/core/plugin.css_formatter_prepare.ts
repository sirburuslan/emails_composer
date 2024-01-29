/**
 * @class Prepare
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class removes the unnecessary characters from the code
 */

// Css Formatter
export namespace CssFormatter {

    // Prepare the code
    export class Prepare {

        /**
         * Prepare the code
         * 
         * @param string css code
         * 
         * @returns string
         */
        code(css: string): string {

            // Define fcode
            let fcode: string = css;

            // Remove multiple empty spaces
            fcode = fcode.split('    ').join('');
            fcode = fcode.replaceAll('  ', ' ');
            fcode = fcode.replaceAll(/[\n\r]/g, "");

            // Search for {
            if ( fcode.search('{') > -1 ) {
                fcode = fcode.replaceAll('{ ', '{');
                fcode = fcode.replaceAll(' {', '{');
            }

            // Search for }
            if ( fcode.search('}') > -1 ) {
                fcode = fcode.replaceAll('  }', '}');
                fcode = fcode.replaceAll(' }', '}');
                fcode = fcode.replaceAll('} ', '}');
            }    

            // Search for :
            if ( fcode.search(':') > -1 ) {
                fcode = fcode.replaceAll(': ', ':');
                fcode = fcode.replaceAll(' :', ':');
            }

            // Search for *
            if ( fcode.split('*').length > 0 ) {
                fcode = fcode.replaceAll('* ', '*');
                fcode = fcode.replaceAll(' *', '*');
            }            
            
            return fcode;

        }

    }

}