/**
 * @class CssFormatter
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class formats the css codes
 */

// Import dependencies
import { 
    CssFormatterPrepare, 
    CssFormatterSpaces, 
    CssFormatterLines 
} from "./core/plugin.css_formatter_index.js";

// Plugins
export namespace Plugins {

    // Css Formatter
    export class CssFormatter {

        // Params
        _params: {lines: boolean, spaces: boolean} | null = null;

        // Index option
        _index: number = 0;

        // Formatted code
        _fcode: string = '';

        // Counts
        _counts: {[key: string]: {[key: string]: number}} = {
            comment: {
                open: 0
            },
            text: {
                open: 0
            }
        };

        // Characters
        _characters: string[] = [];

        /**
         * Format css code
         * 
         * @param object params
         * @param string css
         * 
         * @returns promise string
         */
        format(params: {lines: boolean, spaces: boolean}, css: string): Promise<string> {

            // Set params
            this._params = params;

            // Before edit css
            const before_css: string = css;      

            // Verify if the spaces parameter exists
            if ( typeof this._params.spaces !== 'undefined' ) {

                // Check if spaces are enabled
                if ( this._params.spaces ) {

                    // Prepare the code
                    css = new CssFormatterPrepare.CssFormatter.Prepare().code(css);    

                    // Apply spaces
                    css = new CssFormatterSpaces.CssFormatter.Spaces().add_spaces(css);

                } else {

                    // Check if there is a space at the begin
                    if ( (css.length > 4) && !css.substring(0, 8).trim() ) {

                        // Set spaces
                        css = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + css.slice(8);

                    } else if ( (css.length > 3) && !css.substring(0, 4).trim() ) {

                        // Set spaces
                        css = (css.substring(4, 5) === '}')?css.slice(4):'&nbsp;&nbsp;&nbsp;&nbsp;' + css.slice(4);

                    }

                }

            }
            
            // Split the characters
            this._characters = css.split("");
      
            // Total characters
            const tcharacters: number = this._characters.length;

            // Verify if characters exists
            if ( tcharacters > 0 ) {
                
                // List the characters
                for ( let c: number = 0; c < tcharacters; c++ ) {

                    // Check if is break line
                    if ( (this._characters[this._index] === "\r") || (this._characters[this._index] === "\n") ) {
                        
                        // Close spans
                        this._close_span(); 

                        // Set char
                        this._fcode += this._characters[this._index];
                    
                        // Increase index
                        this._index++;

                        continue;
                        
                    }

                    // Process char
                    if ( this._check_comment() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_comment2() ) {
                            
                        // Increase c
                        c = c + 1;

                        // Increase index
                        this._index = this._index + 2;
                        
                    } else if ( this._check_whitespace() ) {
                            
                        // Increase c
                        c = c + 5;

                        // Increase index
                        this._index = this._index + 6;
                        
                    } else if ( this._check_curly() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_round() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_dots() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_end() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_at() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else if ( this._check_media() ) {
                            
                        // Increase c
                        c = c + 4;

                        // Increase index
                        this._index = this._index + 5;
                        
                    } else if ( this._check_import() ) {
                            
                        // Increase c
                        c = c + 5;

                        // Increase index
                        this._index = this._index + 6;
                        
                    } else if ( this._check_root() ) {
                            
                        // Increase c
                        c = c + 3;

                        // Increase index
                        this._index = this._index + 4;
                        
                    } else if ( this._check_variable() ) {
                            
                        // Increase c
                        c = c + 1;

                        // Increase index
                        this._index = this._index + 2;
                        
                    } else if ( this._check_text() ) {
                            
                        // Increase index
                        this._index++;
                        
                    } else {

                        // Set char
                        this._fcode += this._characters[this._index];
                    
                        // Increase index
                        this._index++;
                        
                    }

                }

            }

            // Verify if the spaces parameter is not required
            if ( (typeof this._params.spaces === 'undefined') || !this._params.spaces ) {

                // Check if split has a property
                if ( (this._fcode.indexOf('ec-code-css-text') > -1) && (this._fcode.indexOf('ec-code-css-dots') > -1) && (this._fcode.indexOf('ec-code-css-end') > -1) && (this._fcode.indexOf('ec-code-css-curly-bracket-open') < 0) && (before_css.indexOf(': ') > -1) ) {

                    // Set space after dots
                    //this._fcode = this._fcode.replaceAll('<span class="ec-code-css-dots">:</span>', '<span class="ec-code-css-dots">: </span>');

                } else if ( before_css.indexOf(': ') > -1 ) {

                    // Set space after dots
                    //this._fcode = this._fcode.replaceAll('<span class="ec-code-css-dots">:</span>', '<span class="ec-code-css-dots">: </span>');
                    
                }

            }
            
            // Verify if the lines parameter exists
            if ( typeof this._params.lines !== 'undefined' ) {

                // Check if lines are disabled
                if ( !this._params.lines ) {

                    // Return success code
                    return new Promise((resolve: (value: string) => void, reject: (value: string) => void): void => {

                        // Set formatted code
                        resolve(this._fcode);

                    });                  

                }

            }
         
            // Add lines
            const ready_code = new CssFormatterLines.CssFormatter.Lines().add_lines(this._fcode);

            // Return success code
            return new Promise((resolve: (value: string) => void, reject: (value: string) => void): void => {

                // Set formatted code
                resolve(ready_code);

            });

        }

        /*---------------------- COMMENTS ------------------------*/

        /**
         * Check if char is comment
         * 
         * @returns boolean
         */
        _check_comment(): boolean {

            // Response
            let response: boolean = false;

            // Verify if the comment is open
            if ( this._counts.comment.open > 0 ) {

                // Set char
                this._fcode += this._characters[this._index];

                // Turn response true
                response = true;

                // Verify if the current char is slash
                if ( this._characters[this._index] === '/' ) {

                    // Verify if previous char exists
                    if ( typeof this._characters[(this._index - 1)] !== 'undefined' ) {

                        // Verify if the previous char is *
                        if ( this._characters[(this._index - 1)] === '*' ) {

                            // Disable the comment
                            this._counts.comment.open = 0;

                            // Close comment
                            this._fcode += '</span>';

                        }

                    }

                }

            } else if ( this._characters[this._index] === '/' ) {

                // Verify if next char exists
                if ( typeof this._characters[(this._index + 1)] !== 'undefined' ) {

                    // Verify if the next char is *
                    if ( this._characters[(this._index + 1)] === '*' ) {

                        // Enable the comment
                        this._counts.comment.open = 1;

                        // Open comment
                        this._fcode += '<span class="ec-code-css-comment">';                

                        // Set char
                        this._fcode += this._characters[this._index];

                        // Turn response true
                        response = true;

                    }

                }

            }

            return response;

        }

        /**
         * Check if char is comment
         * 
         * @returns boolean
         */
        _check_comment2(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is /
            if ( (this._characters[this._index] === '/') && (typeof this._characters[(this._index + 1)] !== 'undefined') && (this._characters[(this._index + 1)] === '/') ) {

                // Close spans
                this._close_span();

                // Set variable tag
                this._fcode += '<span class="ec-code-css-comment2">'
                    + this._characters[this._index] + this._characters[(this._index + 1)]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- WHITE SPACES ------------------------*/

        /**
         * Check if char is whitespace
         * 
         * @returns boolean
         */
        _check_whitespace(): boolean {

            // Response
            let response: boolean = false;

            // Verify if the char is a curly bracket
            if ( 
                (typeof this._characters[(this._index + 1)] !== 'undefined' ) &&
                (typeof this._characters[(this._index + 2)] !== 'undefined' ) &&
                (typeof this._characters[(this._index + 3)] !== 'undefined' ) &&
                (typeof this._characters[(this._index + 4)] !== 'undefined' ) &&
                (typeof this._characters[(this._index + 5)] !== 'undefined' ) &&
                this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] + this._characters[(this._index + 4)] + this._characters[(this._index + 5)] === '&nbsp;' ) {

                // Set whitespace tag
                this._fcode += '<span class="ec-code-whitespace">'
                    + '&nbsp;'
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- BRACKETS ------------------------*/

        /**
         * Check if char is bracket
         * 
         * @returns boolean
         */
        _check_curly(): boolean {

            // Response
            let response: boolean = false;

            // Verify if the char is a bracket
            if ( ['{', '}'].includes(this._characters[this._index]) ) {

                // Close spans
                this._close_span(); 

            }

            // Verify if the char is a curly bracket
            if ( this._characters[this._index] === '{' ) {

                // Set char
                this._fcode += '<span class="ec-code-css-curly-bracket-open">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            } else if ( this._characters[this._index] === '}' ) {

                // Set char
                this._fcode += '<span class="ec-code-css-curly-bracket-close">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /**
         * Check if char is round bracket
         * 
         * @returns boolean
         */
        _check_round(): boolean {

            // Response
            let response: boolean = false;

            // Verify if the char is a bracket
            if ( ['(', ')'].includes(this._characters[this._index]) ) {

                // Close spans
                this._close_span(); 

            }

            // Verify if the char is a round bracket
            if ( this._characters[this._index] === '(' ) {

                // Set char
                this._fcode += '<span class="ec-code-css-round-bracket-open">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            } else if ( this._characters[this._index] === ')' ) {

                // Set char
                this._fcode += '<span class="ec-code-css-round-bracket-close">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- DOTS ------------------------*/

        /**
         * Check if char is .
         * 
         * @returns boolean
         */
        _check_dot(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is .
            if ( this._characters[this._index] === '.' ) {

                // Set dot tag
                this._fcode += '<span class="ec-code-css-selector-dot">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /**
         * Check if char is :
         * 
         * @returns boolean
         */
        _check_dots(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is :
            if ( this._characters[this._index] === ':' ) {

                // Close spans
                this._close_span(); 

                // Set dots tag
                this._fcode += '<span class="ec-code-css-dots">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- ENDS ------------------------*/

        /**
         * Check if char is ;
         * 
         * @returns boolean
         */
        _check_end(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is ;
            if ( this._characters[this._index] === ';' ) {

                // Close spans
                this._close_span();

                // Set end tag
                this._fcode += '<span class="ec-code-css-end">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- ATS ------------------------*/

        /**
         * Check if char is @
         * 
         * @returns boolean
         */
        _check_at(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is ;
            if ( this._characters[this._index] === '@' ) {

                // Close spans
                this._close_span();

                // Set at tag
                this._fcode += '<span class="ec-code-css-at">'
                    + this._characters[this._index]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- RULES ------------------------*/

        /**
         * Check if char is media
         * 
         * @returns boolean
         */
        _check_media(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is ;
            if ( (typeof this._characters[(this._index - 1)] !== 'undefined') && (this._characters[(this._index - 1)] === '@') ) {

                // Check if the word is media
                if ( 
                    (typeof this._characters[(this._index + 1)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 2)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 3)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 4)] !== 'undefined' ) &&
                    this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] + this._characters[(this._index + 4)] === 'media' ) {

                    // Close spans
                    this._close_span();

                    // Set media tag
                    this._fcode += '<span class="ec-code-css-media">'
                        + this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] + this._characters[(this._index + 4)]
                    + '</span>';

                    // Turn response true
                    response = true;

                }

            }

            return response;

        }

        /**
         * Check if char is import
         * 
         * @returns boolean
         */
        _check_import(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is ;
            if ( (typeof this._characters[(this._index - 1)] !== 'undefined') && (this._characters[(this._index - 1)] === '@') ) {

                // Check if the word is import
                if ( 
                    (typeof this._characters[(this._index + 1)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 2)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 3)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 4)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 5)] !== 'undefined' ) &&
                    this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] + this._characters[(this._index + 4)] + this._characters[(this._index + 5)] === 'import' ) {

                    // Close spans
                    this._close_span();

                    // Set import tag
                    this._fcode += '<span class="ec-code-css-import">'
                        + this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] + this._characters[(this._index + 4)] + this._characters[(this._index + 5)]
                    + '</span>';

                    // Turn response true
                    response = true;

                }

            }

            return response;

        }

        /**
         * Check if char is root
         * 
         * @returns boolean
         */
        _check_root(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is ;
            if ( (typeof this._characters[(this._index - 1)] !== 'undefined') && (this._characters[(this._index - 1)] === ':') ) {

                // Check if the word is root
                if ( 
                    (typeof this._characters[(this._index + 1)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 2)] !== 'undefined' ) &&
                    (typeof this._characters[(this._index + 3)] !== 'undefined' ) &&
                    this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)] === 'root' ) {

                    // Close spans
                    this._close_span();

                    // Set root tag
                    this._fcode += '<span class="ec-code-css-root">'
                        + this._characters[this._index] + this._characters[(this._index + 1)] + this._characters[(this._index + 2)] + this._characters[(this._index + 3)]
                    + '</span>';

                    // Turn response true
                    response = true;

                }

            }

            return response;

        }

        /*---------------------- VARIABLES ------------------------*/

        /**
         * Check if char is variable
         * 
         * @returns boolean
         */
        _check_variable(): boolean {

            // Response
            let response: boolean = false;

            // Check if the char is -
            if ( (this._characters[this._index] === '-') && (typeof this._characters[(this._index + 1)] !== 'undefined') && (this._characters[(this._index + 1)] === '-') ) {

                // Close spans
                this._close_span();

                // Set variable tag
                this._fcode += '<span class="ec-code-css-variable">'
                    + this._characters[this._index] + this._characters[(this._index + 1)]
                + '</span>';

                // Turn response true
                response = true;

            }

            return response;

        }        

        /*---------------------- TEXTS ------------------------*/

        /**
         * Check if char is text
         * 
         * @returns boolean
         */
        _check_text(): boolean {

            // Response
            let response: boolean = false;

            // Verify if the text is open
            if ( this._counts.text.open > 0 ) {

                // Set char
                this._fcode += this._characters[this._index];

                // Turn response true
                response = true;

            } else {

                // Enable the text
                this._counts.text.open = 1;

                // Open text
                this._fcode += '<span class="ec-code-css-text">';                

                // Set char
                this._fcode += this._characters[this._index];

                // Turn response true
                response = true;

            }

            return response;

        }

        /*---------------------- SOME HELPERS ------------------------*/

        /**
         * Close span
         */
        _close_span(): void {

            // Verify if the comment is open
            if ( this._counts.comment.open > 0 ) {

                // Disable text
                this._counts.comment.open = 0;                

                // Close span
                this._fcode += '</span>';   

            }

            // Verify if the text is open
            if ( this._counts.text.open > 0 ) {

                // Disable text
                this._counts.text.open = 0;                

                // Close span
                this._fcode += '</span>';   

            }            
            
        }

    }

}