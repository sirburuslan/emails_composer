/**
 * @class HtmlFormatter
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class formats the html code
 */

// Import dependencies
import {
    HtmlFormatterLines,
    HtmlFormatterPrepare,
    HtmlFormatterVariables,
    HtmlFormatterSpaces 
} from "./core/plugin.html_formatter_index.js";

// Plugins
export namespace Plugins {

    // Html Formatter
    export class HtmlFormatter {

        // Params
        _params: {lines: boolean, spaces: boolean} | null = null;

        // Counts
        _counts: any | null = null;

        // Conditions
        _conditions: {[key: string]: string[]} | null = null;

        // Formatted code
        _fcode: string = '';

        // Continue option
        _continue: number = 0;

        // Index option
        _index: number = 0;

        /**
         * Format html code
         * 
         * @param object params
         * @param string html
         * 
         * @returns promise string
         */
        format(params: {lines: boolean, spaces: boolean}, html: string): Promise<string> {

            // Set params
            this._params = params;

            // Set counts
            this._counts = new HtmlFormatterVariables.HtmlFormatter.Variables().counts;

            // Set conditions
            this._conditions = new HtmlFormatterVariables.HtmlFormatter.Variables().conditions;

            // Prepare the code
            html = new HtmlFormatterPrepare.HtmlFormatter.Prepare().code(html);

            // Verify if the spaces parameter exists
            if ( typeof this._params.spaces !== 'undefined' ) {

                // Check if spaces are enabled
                if ( this._params.spaces ) {

                    // Apply spaces
                    html = new HtmlFormatterSpaces.HtmlFormatter.Spaces().add_spaces(html);                

                }

            }

            // Split the characters
            const characters: string[] = this._to_html(html).replaceAll(' &nbsp;', ' ').replaceAll('&nbsp;', ' ').split("");
            
            // Total characters
            const tcharacters: number = characters.length;

            // Verify if characters exists
            if ( tcharacters > 0 ) {
                
                // List the characters
                do {

                    // Verify if char exists
                    if ( characters[this._index] === '' ) {

                        // Increase index
                        this._index++;

                        continue;
                        
                    } else if ( (characters[this._index]?.charCodeAt(0) === 32) || (characters[this._index]?.charCodeAt(0) === 160) ) {

                        // Set white space
                        characters[this._index] = ' ';

                    }

                    // Stop continue
                    this._continue = 0;
                    
                    // Check if hidden comment is open
                    if ( this._is_hidden() ) {

                        // Create hidden comment
                        this._hidden_comment(characters);
                        
                    } else if ( ( this._conditions.tag_quotes.indexOf(characters[this._index]) > -1 ) && ( this._counts.tag.start.open > 0 ) ) {

                        // Add quotes to meta tag
                        this._tag_meta_value(characters[this._index]);

                    } else if ( characters[this._index] === '<' ) {

                        // Verify if tag start is open
                        if ( this._counts.tag.start.open > 0 ) {

                            // Set char
                            this._fcode += characters[this._index];

                        } else {

                            // Process tag left arrow
                            this._tag_arrow_left(characters);

                            // Check if continue is required
                            if ( this._continue > 0 ) {

                                // Stop continue
                                this._continue = 0;

                                // Increase index
                                this._index++;

                                continue;

                            }

                        }

                    } else if ( characters[this._index] === '>' ) {
   
                        // Process tag right arrow
                        this._tag_arrow_right(characters);

                    } else if ( characters[this._index] === '/' ) {

                        // Verify if the next character exists
                        if ( typeof characters[(this._index + 1)] !== 'undefined' ) {

                            // Check if is forward
                            if ( characters[(this._index + 1)] === '>' ) {

                                // Disable the start tag
                                this._counts.tag.start.open = 0;

                                // Set backward slash
                                this._fcode += '</span><span class="ec-code-tag-end-slash">'
                                    + characters[this._index]
                                + '</span>';  

                            } else {

                                // Disable the start tag
                                //this._counts.tag.start.open = 0;

                                // End tag
                                //this._counts.tag.end.open = 1;
                                
                                // Start tag name
                                //this._counts.tag.end.name.open = 1;

                                // Set backward slash
                                this._fcode += '</span><span class="ec-code-tag-meta-value-slash">'
                                    + characters[this._index]
                                + '</span>';
                                
                                // Verify if next tag is not /
                                if ( characters[(this._index + 1)] !== '/' ) {

                                    // Set meta value
                                    this._fcode += '<span class="ec-code-tag-meta-value">';

                                }

                            }

                        }

                    } else if ( characters[this._index] === ' ' ) {
                        
                        // (((this._counts.tag.start.open === 0) && (this._counts.tag.end.open === 0)) || ( this._counts.tag.meta.value > 0 ))
                        
                        // Verify if the tags are closed
                        if ( this._counts.tag.meta.value > 0 ) {

                            // Set text
                            this._fcode += characters[this._index];

                        } else {
                            
                            // Set white space
                            this._white_space(characters[this._index]);

                        }

                    } else if ( this._counts.tag.start.open > 0 ) {

                        // Verify if is slash
                        if ( characters[this._index] === '/' ) {

                            // Set backward slash
                            this._fcode += '</span><span class="ec-code-tag-end-slash">'
                                + characters[this._index]
                            + '</span>';  

                        } else if ( characters[this._index]?.trim() === '' ) {

                            // Set white space
                            this._white_space(characters[this._index]);
                            
                        } else {

                            // Set tag open
                            this._tag_open(characters[this._index]);

                        }

                    } else if ( this._counts.tag.end.open > 0 ) {

                        // Set tag close
                        this._tag_close(characters[this._index]);

                    } else if ( this._counts.tag.start.name.close > 0 ) {

                        // Set tag close
                        this._tag_close(characters[this._index]);                    

                    } else if ( characters[this._index]?.trim() ) {

                        // Verify if is the & parameter
                        if ( characters[this._index] === '&' ) {

                            // Verify next parameter exists
                            if ( (typeof characters[(this._index + 1)] !== 'undefined') && (typeof characters[(this._index + 2)] !== 'undefined') && (typeof characters[(this._index + 3)] !== 'undefined') && (typeof characters[(this._index + 4)] !== 'undefined') && (typeof characters[(this._index + 5)] !== 'undefined') ) {

                                // Verify if is &nbsp;
                                if ( characters[this._index] + characters[(this._index + 1)] + characters[(this._index + 2)] + characters[(this._index + 3)] + characters[(this._index + 4)] + characters[(this._index + 5)] === '&nbsp;' ) {

                                    // End String
                                    this._ends('string');
                                    
                                    // Start whitespace
                                    this._counts.whitespace = 1;

                                }

                            }

                        }

                        // Verify if is a white space
                        if ( this._counts.whitespace > 0 ) {

                            // Set char
                            this._fcode += characters[this._index]; 
                            
                            // Verify if current char is ;
                            if ( characters[this._index] === ';' ) {

                                // End whitespace
                                this._counts.whitespace = 0;

                            }

                        } else {

                            // Set text
                            this._string(characters[this._index]);

                        }
                        
                    } else {

                        // Set char
                        this._fcode += characters[this._index];

                    }
                    
                    // Increase index
                    this._index++;

                } while ( this._index < tcharacters );

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
            const ready_code = new HtmlFormatterLines.HtmlFormatter.Lines().add_lines(this._fcode);
            
            // Return success code
            return new Promise((resolve: (value: string) => void, reject: (value: string) => void): void => {

                // Set formatted code
                resolve(ready_code);

            });

        }

        /**
         * Prepare the tag arrow left
         * 
         * @param array characters with all characters
         */
        _tag_arrow_left(characters: string[]): void {

            // Check if tag is open
            if ( this._counts!.tag.start.open > 0 ) {

                // Set char
                this._fcode += '<span>'
                    + characters[this._index]
                + '</span>';

                // Run continue
                this._continue = 1;
                
            } else {

                // End String
                this._ends('string');

                // Verify if the next character exists
                if ( typeof characters[(this._index + 1)] !== 'undefined' ) {

                    // Check if is forward
                    if ( characters[(this._index + 1)] === '/' ) {

                        // Set end tag
                        this._fcode += '<span class="ec-code-tag-end-open">'
                            + characters[this._index]
                        + '</span>';

                        // Set backward slash
                        this._fcode += '<span class="ec-code-tag-end-slash">'
                            + characters[(this._index + 1)]
                        + '</span>';                                        

                        // Increase index
                        this._index = this._index + 1;

                        // End tag
                        this._counts.tag.end.open = 1;
                        
                        // Start tag name
                        this._counts.tag.end.name.open = 1;

                        // Run continue
                        this._continue = 1;

                    } else if ( characters[(this._index + 1)] === '!' ) {

                        // Verify if the next character exists
                        if ( typeof characters[(this._index + 2)] !== 'undefined' ) {

                            // Check if is forward
                            if ( characters[(this._index + 2)] === '-' ) {

                                // Set start hidden tag
                                this._fcode += '<span class="ec-code-hidden-comment-open">'
                                    + characters[this._index]
                                + '</span>';

                                // Set exclamation
                                this._fcode += '<span class="ec-code-hidden-comment-exclamation">'
                                    + characters[(this._index + 1)]
                                + '</span>';
                                
                                // Enable hidden comment
                                this._counts.hidden.comment.open = 1;

                                // Increase index
                                this._index = this._index + 1;

                                // Run continue
                                this._continue = 1;

                            }

                        }

                    }

                }                

            }

            // Check if run is disabled
            if ( this._continue < 1 ) {

                // Set start tag
                this._fcode += '<span class="ec-code-tag-start-open">'
                    + characters[this._index]
                + '</span>';

                // Start tag open
                this._counts.tag.start.open = 1;

                // Start tag name
                this._counts.tag.start.name.open = 1;

            }

        }

        /**
         * Prepare the tag arrow right
         * 
         * @param array characters with all characters
         */
        _tag_arrow_right(characters: string[]): void {

            // End String
            this._ends('string');

            // Verify if tag is close
            if ( this._counts.tag.start.name.close > 0 ) {

                // End tag
                this._counts.tag.end.open = 0;

                // Disable the tag close
                this._counts.tag.start.name.close = 0;
                
            }

            // Verify if the start tag is open
            if ( this._counts.tag.start.open > 0 ) {

                // Disable the start tag
                this._counts.tag.start.open = 0;

                // Set end tag name
                this._fcode += '</span>';    

            } 

            // Check if this._counts.tag.end.name.close is open
            if ( this._counts.tag.end.name.close > 0 ) {

                // Disable this._counts.tag.end.name.close
                this._counts.tag.end.name.close = 0;

                // Set end tag name
                this._fcode += '</span>';                                     

            }

            // Check if meta name is open
            if ( this._counts.tag.meta.name > 0 ) {

                // Set end meta name
                this._fcode += '</span>'; 

                // Disable tag meta name
                this._counts.tag.meta.name = 0;

            }

            // Check if meta value is open
            if ( this._counts.tag.meta.value > 0 ) {

                // Set end meta value
                this._fcode += '</span>'; 

                // Disable tag meta value
                this._counts.tag.meta.value = 0;

            }

            // Verify if tag is close
            if ( this._counts.tag.end.open > 0 ) {

                // End tag
                this._counts.tag.end.open = 0;

                // Disable the tag close
                this._counts.tag.start.name.close = 0;
                
            }

            // Set close tag
            this._fcode += '<span class="ec-code-tag-close">'
                + characters[this._index]
            + '</span>';

        }

        /**
         * Prepare the tag open
         * 
         * @param string char
         */
        _tag_open(char: string): void {

            // End String
            this._ends('string');

            // Check if this._counts.tag.start.open is open
            if ( this._counts.tag.start.name.open > 0 ) {

                // Set tag name
                this._fcode += '<span class="ec-code-tag-start-name">' + char;

                // Disable tag name
                this._counts.tag.start.name.open = 0;

                // Set close tag name
                this._counts.tag.start.name.close = 1;                                    

            } else if ( this._counts.tag.start.name.close > 0 ) {

                // Set value
                this._fcode += char;
                
            } else if ( char === '=' ) {

                // Set end meta name
                this._fcode += '</span>'; 

                // Set equal
                this._fcode += '<span class="ec-code-tag-meta-equal">'
                    + char
                + '</span>';

                // Disable tag meta name
                this._counts.tag.meta.name = 0;

                // Open tag meta value
                this._counts.tag.meta.value = 1;

                // Set equal
                this._counts.tag.meta.equal = 1;

                // Set tag meta value
                this._fcode += '<span class="ec-code-tag-meta-value">';

            } else if ( this._counts.tag.meta.value > 0 ) {

                // Set value
                this._fcode += char;

            } else if ( this._counts.tag.meta.name > 0 ) {

                // Set equal
                this._fcode += char;                                

            } else {

                // Set value
                this._fcode += '<span class="ec-code-tag-meta-name">' + char;

                // Set tag meta name
                this._counts.tag.meta.name = 1;

            }

        }

        /**
         * Init the meta value for tags
         * 
         * @param string character with current character
         */
        _tag_meta_value(character: string): void {

            // Check if meta value is open
            if ( (this._counts.tag.meta.value > 0) && (this._counts.tag.meta.open > 0) ) {

                // Set character
                this._fcode += character;

                // Disable tag meta open
                this._counts.tag.meta.open = 0;                              

                // Disable tag meta value
                this._counts.tag.meta.value = 0;

                // Set start tag name
                this._fcode += '</span>';

            } else {

                // Verify if equal is enabled
                if ( this._counts.tag.meta.equal > 0 ) {

                    // Disable
                    this._counts.tag.meta.equal = 0;

                    // Open meta value
                    this._counts.tag.meta.open = 1;

                } else {

                    // Set tag meta value
                    this._fcode += '<span class="ec-code-tag-meta-value">';

                    // Open meta value
                    this._counts.tag.meta.open = 1;

                    // Enable tag meta value
                    this._counts.tag.meta.value = 1;

                }

                // Set character
                this._fcode += character;
                
            }

        }

        /**
         * Prepare the tag close
         * 
         * @param string char
         */
        _tag_close(char: string): void {

            // End String
            this._ends('string');

            if ( this._counts.tag.end.name.open > 0 ) {

                // Set tag name
                this._fcode += '<span class="ec-code-tag-end-name">' + char;

                // Disable tag name
                this._counts.tag.end.name.open = 0;
                
                // Set close tag name
                this._counts.tag.end.name.close = 1;        

            } else if ( this._counts.tag.end.name.close > 0 ) {
                
                // Set value
                this._fcode += char;
                
            } else {

                // Set equal
                this._fcode += char; 

            }

        }

        /**
         * Apply the white space
         * 
         * @param string char
         */
        _white_space(char: string): void {

            // End String
            this._ends('string');
            
            // Check if this._counts.tag.start.name.close is open
            if ( this._counts.tag.start.name.close > 0 ) {

                // Set close tag name
                this._counts.tag.start.name.close = 0; 
                
                // Set end for tag name
                this._fcode += '</span>';

            }

            // Verify if meta name is open
            if ( this._counts.tag.meta.name > 0 ) {

                // Disable meta name
                this._counts.tag.meta.name = 0;

                // Set end meta name
                this._fcode += '</span>';   

            }

            // Check if meta value is open
            if ( this._counts.tag.meta.value > 0 ) {

                // Disable tag meta open
                this._counts.tag.meta.open = 0;                              

                // Disable tag meta value
                this._counts.tag.meta.value = 0;

                // Set end tag meta value
                this._fcode += '</span>';

            }

            // Check if this._counts.tag.end.name.close is open
            if ( this._counts.tag.end.name.close > 0 ) {

                // Disable this._counts.tag.end.name.close
                this._counts.tag.end.name.close = 0;

                // Set end tag name
                this._fcode += '</span>';                                     

            }

            // Set whitespace tag
            this._fcode += '<span class="ec-code-whitespace">'
                + '&nbsp;'
            + '</span>';
            
        }

        /**
         * Apply the string
         * 
         * @param string char
         */
        _string(char: string): void {

            // Check if this._counts.tag.start.name.close is open
            if ( this._counts.tag.start.name.close > 0 ) {

                // Set close tag name
                this._counts.tag.start.name.close = 0; 
                
                // Set end for tag name
                this._fcode += '</span>';

            }

            // Verify if meta name is open
            if ( this._counts.tag.meta.name > 0 ) {

                // Disable meta name
                this._counts.tag.meta.name = 0;

                // Set end meta name
                this._fcode += '</span>';   

            }

            // Check if meta value is open
            if ( this._counts.tag.meta.value > 0 ) {

                // Disable tag meta open
                this._counts.tag.meta.open = 0;                              

                // Disable tag meta value
                this._counts.tag.meta.value = 0;

                // Set start tag name
                this._fcode += '</span>';

            }

            if ( this._counts.string < 1 ) {

                // Set string
                this._fcode += '<span class="ec-code-string">';

                // Enable string
                this._counts.string = 1;

            }

            // Set char
            this._fcode += char; 

        }

        /**
         * Check if the hidden comment is proccessed
         * 
         * @returns boolean
         */
        _is_hidden(): boolean {

            // Verify if hidden comment is open
            if ( this._counts.hidden.comment.open > 0 ) {
                return true;
            } else {
                return false;
            }

        }

        /**
         * Create the hidden comment
         * 
         * @param array characters with all characters
         */
        _hidden_comment(characters: string[]): void {

            // End String
            this._ends('string');

            // Add tags by char type
            if ( characters[this._index] === '[' ) {
                
                // Check if next characters exists
                if ( (typeof characters[(this._index + 1)] !== 'undefined') && (typeof characters[(this._index + 2)] !== 'undefined') ) {

                    // Verify if if exists
                    if ( characters[(this._index + 1)] + characters[(this._index + 2)] === 'if' ) {

                        // End the text tag
                        this._hidden_comment_ends('text');

                        // Set condition open parenthese
                        this._fcode += '<span class="ec-code-hidden-comment-condition-parenthese">'
                            + characters[this._index]
                        + '</span>';

                        // Set condition if
                        this._fcode += '<span class="ec-code-hidden-comment-condition-rules">'
                            + characters[(this._index + 1)]
                            + characters[(this._index + 2)];
                        
                        // Enable hidden comment start condition
                        this._counts.hidden.comment.condition.start.open = 1;

                        // Increase index
                        this._index = this._index + 2;

                        // Run continue
                        this._continue = 1;

                    } else if ( characters[(this._index + 1)] + characters[(this._index + 2)] === 'en' ) {

                        // Set condition open parenthese
                        this._fcode += '<span class="ec-code-hidden-comment-condition-parenthese">'
                            + characters[this._index]
                        + '</span>';

                        // Set condition end
                        this._fcode += '<span class="ec-code-hidden-comment-condition-rules">'
                            + characters[(this._index + 1)]
                            + characters[(this._index + 2)];
                        
                        // Enable hidden comment end condition
                        this._counts.hidden.comment.condition.end.open = 1;

                        // Increase index
                        this._index = this._index + 2;

                        // Run continue
                        this._continue = 1;

                    }

                }

                // Check if continue is required
                if ( this._continue < 1 ) {

                    // Set character
                    this._fcode += characters[this._index];

                }

            } else if ( characters[this._index] === ']' ) {

                // Check if next character exists
                if ( (typeof characters[(this._index + 1)] !== 'undefined') ) {

                    // Verify if arrow right exists
                    if ( characters[(this._index + 1)] === '>' ) {

                        // End the condition start
                        this._hidden_comment_ends('condition_start');

                        // Set condition open parenthese
                        this._fcode += '<span class="ec-code-hidden-comment-condition-parenthese">'
                            + characters[this._index]
                        + '</span>';

                        // Set condition close
                        this._fcode += '<span class="ec-code-hidden-comment-close">'
                            + characters[(this._index + 1)]
                        + '</span>';

                        // Increase index
                        this._index = this._index + 1;

                        // Run continue
                        this._continue = 1;

                    } else if ( characters[(this._index + 1)] === '-' ) {

                        // End the condition end
                        this._hidden_comment_ends('condition_end');

                        // Set condition open parenthese
                        this._fcode += '<span class="ec-code-hidden-comment-condition-parenthese">'
                            + characters[this._index]
                        + '</span>';

                        // Set line
                        this._fcode += '<span class="ec-code-hidden-comment-line">'
                            + characters[(this._index + 1)]
                        + '</span>';

                        // Increase index
                        this._index = this._index + 1;

                        // Run continue
                        this._continue = 1;

                    }

                }

                // Check if continue is required
                if ( this._continue < 1 ) {

                    // Set character
                    this._fcode += characters[this._index];

                }
                
            } else if ( characters[this._index] === '<' ) {

                // End the text tag
                this._hidden_comment_ends('text');

                // Check if next character exists
                if ( (typeof characters[(this._index + 1)] !== 'undefined') && (typeof characters[(this._index + 2)] !== 'undefined') ) {

                    // Verify if exclamation exists
                    if ( characters[(this._index + 1)] + characters[(this._index + 2)] === '![' ) {

                        // Set start hidden tag
                        this._fcode += '<span class="ec-code-hidden-comment-open">'
                            + characters[this._index]
                        + '</span>';

                        // Set exclamation
                        this._fcode += '<span class="ec-code-hidden-comment-exclamation">'
                            + characters[(this._index + 1)]
                        + '</span>';

                        // Increase index
                        this._index = this._index + 1;

                        // Run continue
                        this._continue = 1;

                    } else if ( characters[(this._index + 1)] === '/' ) {

                        // Set end tag
                        this._fcode += '<span class="ec-code-hidden-comment-tag-end-open">'
                            + characters[this._index]
                        + '</span>';
    
                        // Set backward slash
                        this._fcode += '<span class="ec-code-hidden-comment-tag-end-slash">'
                            + characters[(this._index + 1)]
                        + '</span>';                                        
    
                        // Increase index
                        this._index = this._index + 1;
    
                        // End tag
                        this._counts.hidden.tag.end.open = 1;
                        
                        // Start tag name
                        this._counts.hidden.tag.end.name.open = 1;
    
                        // Run continue
                        this._continue = 1;
        
                    } else {

                        // Set start tag
                        this._fcode += '<span class="ec-code-hidden-comment-tag-start-open">'
                            + characters[this._index]
                        + '</span>';

                        // Start tag open
                        this._counts.hidden.tag.start.open = 1;

                        // Start tag name
                        this._counts.hidden.tag.start.name.open = 1;

                        // Run continue
                        this._continue = 1;

                    }

                }

                // Check if continue is required
                if ( this._continue < 1 ) {

                    // Set character
                    this._fcode += characters[this._index];

                }

            } else if ( characters[this._index] === '>' ) {

                // End the text tag
                this._hidden_comment_ends('text');

                // End the tag start
                this._hidden_comment_ends('tag_start'); 

                // End the tag name
                this._hidden_comment_ends('tag_name'); 

                // End the tag end
                this._hidden_comment_ends('tag_end'); 

                // End the meta name
                this._hidden_comment_ends('meta_name');
              
                // End the meta value
                this._hidden_comment_ends('meta_value');

                // Set close tag
                this._fcode += '<span class="ec-code-hidden-comment-tag-close">'
                    + characters[this._index]
                + '</span>';
                
            } else if ( (characters[this._index] === ' ') && (this._counts.hidden.comment.condition.start.open < 1) ) {

                // End the text tag
                this._hidden_comment_ends('text');

                // End the tag name
                this._hidden_comment_ends('tag_name');                

                // End the meta name
                this._hidden_comment_ends('meta_name');
              
                // End the meta value
                this._hidden_comment_ends('meta_value');

                // Set whitespace
                this._fcode += '<span class="ec-code-hidden-comment-whitespace">'
                    + characters[this._index]
                + '</span>';

            } else if ( this._counts.hidden.tag.start.name.open > 0 ) {

                // Set tag name
                this._fcode += '<span class="ec-code-hidden-comment-tag-start-name">' + characters[this._index];

                // Disable tag name
                this._counts.hidden.tag.start.name.open = 0;

                // Set close tag name
                this._counts.hidden.tag.start.name.close = 1;                                    

            } else if ( this._counts.hidden.tag.start.name.close > 0 ) {
                
                // Set value
                this._fcode += characters[this._index];
                
            } else if ( this._counts.hidden.tag.end.name.open > 0 ) {

                // Set tag name
                this._fcode += '<span class="ec-code-hidden-comment-tag-end-name">' + characters[this._index];

                // Disable tag name
                this._counts.hidden.tag.end.name.open = 0;
                
                // Set close tag name
                this._counts.hidden.tag.end.name.close = 1;        

            } else if ( this._counts.hidden.tag.end.name.close > 0 ) {
                
                // Set value
                this._fcode += characters[this._index];
                
            } else if ( (characters[this._index] === '=') && (this._counts.hidden.tag.start.open > 0) ) {

                // End the meta name
                this._hidden_comment_ends('meta_name');

                // Set end meta name
                this._fcode += '</span>'; 

                // Set equal
                this._fcode += '<span class="ec-code-hidden-comment-tag-meta-equal">'
                    + characters[this._index]
                + '</span>';

                // Disable tag meta name
                this._counts.hidden.tag.meta.name = 0;

                // Open tag meta value
                this._counts.hidden.tag.meta.value = 1;

                // Set equal
                this._counts.hidden.tag.meta.equal = 1;

                // Set tag meta value
                this._fcode += '<span class="ec-code-hidden-comment-tag-meta-value">';

            } else if ( this._counts.hidden.tag.meta.value > 0 ) {

                // Set value
                this._fcode += characters[this._index];

            } else if ( this._counts.hidden.tag.meta.name > 0 ) {

                // Set equal
                this._fcode += characters[this._index];                                

            } else if (this._counts.hidden.tag.start.open > 0) {

                // Set value
                this._fcode += '<span class="ec-code-hidden-comment-tag-meta-name">' + characters[this._index]; 

                // Set tag meta name
                this._counts.hidden.tag.meta.name = 1;
                
            } else if ( characters[this._index] === '-' ) {

                // Verify if the next character exists
                if ( typeof characters[(this._index + 1)] !== 'undefined' ) {
                    
                    // Check if next charcter is a right arrow
                    if ( characters[(this._index + 1)] === '>' ) {

                        // End the text tag
                        this._hidden_comment_ends('text');

                        // Set line
                        this._fcode += '<span class="ec-code-hidden-comment-line">'
                            + characters[this._index]
                        + '</span>';

                        // Set close
                        this._fcode += '<span class="ec-code-hidden-comment-close">'
                            + characters[(this._index + 1)]
                        + '</span>';
                        
                        // Disable hidden comment
                        this._counts.hidden.comment.open = 0;

                        // Increase index
                        this._index = this._index + 1;

                        // Run continue
                        this._continue = 1;

                    }

                }

                // Check if continue is required
                if ( this._continue < 1 ) {

                    // Verify if text is open
                    if ( this._counts.hidden.comment.text.open < 1 ) {

                        // Set line
                        this._fcode += '<span class="ec-code-hidden-comment-line">'
                            + characters[this._index]
                        + '</span>';

                    } else {

                        // Set text
                        this._fcode += characters[this._index];

                    }

                }

            } else {

                // Verify if condition is open
                if ( this._counts.hidden.comment.condition.start.open > 0 ) {

                    // Set character
                    this._fcode += characters[this._index];

                } else {

                    // Verify if text is open
                    if ( this._counts.hidden.comment.text.open < 1 ) {

                        // Start text
                        this._counts.hidden.comment.text.open = 1;

                        // Open text container
                        this._fcode += '<span class="ec-code-hidden-comment-text">'
                        
                    }

                    // Set character
                    this._fcode += characters[this._index];

                }

            }

        }

        /**
         * Close the open tags
         * 
         * @param string group to close
         */
        _ends(group: string): void {

            // End tags by group
            if ( group === 'string' ) {

                // Check if string is open
                if ( this._counts.string > 0 ) {

                    // Disable string open
                    this._counts.string = 0;

                    // Set start string
                    this._fcode += '</span>';

                }

            }

        }

        /**
         * Close the open tags
         * 
         * @param string group to close
         */
        _hidden_comment_ends(group: string): void {

            // End tags by group
            if ( group === 'text' ) {

                // Verify if text is open
                if ( this._counts.hidden.comment.text.open > 0 ) {

                    // End text
                    this._counts.hidden.comment.text.open = 0;

                    // End text container
                    this._fcode += '</span>'

                } 
                
            } else if ( group === 'tag_start' ) {

                // Verify if the start tag is open
                if ( this._counts.hidden.tag.start.open > 0 ) {

                    // Disable the start tag
                    this._counts.hidden.tag.start.open = 0;

                    // Set end tag name
                    this._fcode += '</span>';    

                } 

            } else if ( group === 'tag_name' ) {

                // Verify if the tag name should be closed
                if ( this._counts.hidden.tag.start.name.close > 0 ) {

                    // Close the tag name
                    this._counts.hidden.tag.start.name.close = 0;

                    // End tag name
                    this._fcode += '</span>'                    

                }

            } else if ( group === 'tag_end' ) {

                // Check if this._counts.hidden.tag.end.name.close is open
                if ( this._counts.hidden.tag.end.name.close > 0 ) {

                    // Disable this._counts.hidden.tag.end.name.close
                    this._counts.hidden.tag.end.name.close = 0;

                    // Set end tag name
                    this._fcode += '</span>';                                     

                }

            } else if ( group === 'meta_name' ) {

                // Check if meta name is open
                if ( this._counts.hidden.tag.meta.name > 0 ) {

                    // Set end meta name
                    this._fcode += '</span>'; 

                    // Disable tag meta name
                    this._counts.hidden.tag.meta.name = 0;

                }

            } else if ( group === 'meta_value' ) {

                // Check if meta value is open
                if ( this._counts.hidden.tag.meta.value > 0 ) {

                    // Set end meta value
                    this._fcode += '</span>'; 

                    // Disable tag meta value
                    this._counts.hidden.tag.meta.value = 0;

                }

            } else if ( group === 'condition_start' ) {

                // Verify if condition rules are enabled
                if ( this._counts.hidden.comment.condition.start.open > 0 ) {

                    // Set end condition rules
                    this._fcode += '</span>';

                    // Disable the condition start
                    this._counts.hidden.comment.condition.start.open = 0;

                }

            } else if ( group === 'condition_end' ) {

                // Verify if condition rules are enabled
                if ( this._counts.hidden.comment.condition.end.open > 0 ) {

                    // End text container
                    this._fcode += '</span>';

                    // Disable hidden comment end condition
                    this._counts.hidden.comment.condition.end.open = 0;

                }

            }

        }

        /**
         * Convert entities to html
         * 
         * @param string html with entities
         * 
         * @returns string
         */
        _to_html(html: string): string {

            html = html.replace(/&gt;/g, '>');
            html = html.replace(/&lt;/g, '<');
            html = html.replace(/&quot;/g, '"');
            html = html.replace(/&apos;/g, "'");
            html = html.replace(/&amp;/g, '&');

            return html;

        }

    }

}