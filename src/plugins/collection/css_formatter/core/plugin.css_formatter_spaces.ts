/**
 * @class Spaces
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class adds spaces in the code
 */

// Css Formatter
export namespace CssFormatter {

    // Add spaces
    export class Spaces {

        // Space counter
        _cspace: number = 0;

        // Open container
        _open: string = '';

        // Text container
        _t_container: string = '';

        // Counts
        _counts = {
            break: 0,
            start: 0,
            brackets: {
                round: 0,
                curly: 0,
                url: 0          
            },
            last: '',
            next: ''
        };

        // Rules
        _rules = {
            break: [';', '{', '}']
        }

        // History
        _history: string = '';

        /**
         * Add spaces to the code
         * 
         * @param string fcode contains the formatted code
         * 
         * @returns string
         */
        add_spaces(fcode: string): string {

            // Split the code
            let splits: string[] = fcode.split('');

            // Total splits
            let tsplits: number = splits.length;

            // Verify if splits exists
            if ( tsplits > 0 ) {

                // List the splits
                for ( let s: number = 0; s < tsplits; s++ ) {

                    // Verify if previous split exists
                    if ( typeof splits[(s - 1)] !== 'undefined' ) {

                        // Verify if previous split is * and current /
                        if ( (splits[(s - 1)] === '*') && (splits[s] === '/' ) ) {

                            // Add split
                            this._open += splits[s];
                            
                            // Add break line
                            this._open += "\r\n";

                            // Change last
                            this._counts.last = "\r\n";

                            // Enable break
                            this._counts.break = 1;

                            continue;

                        }

                    }

                    // Check if char is not curly end
                    if ( (splits[s] !== '}') && (splits[s] !== '\n') ) {

                        // Check if curly is open and last char is break line
                        if ( (this._counts.brackets.curly > 0) && (this._counts.last === "\r\n") ) {

                            // Set space
                            this._open += (this._counts.brackets.curly > 1)?'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':'&nbsp;&nbsp;&nbsp;&nbsp;';

                        }

                    } else if ( (splits[s] === '}') && (this._counts.brackets.curly > 1) ) {

                        // Set space
                        this._open += '&nbsp;&nbsp;&nbsp;&nbsp;';

                    }

                    // Add split
                    this._open += splits[s];

                    // Change last
                    this._counts.last = splits[s];

                    // Check if split is {
                    if ( (splits[s] === '{') && (this._counts.brackets.curly < 1) ) {

                        // Enable curly
                        this._counts.brackets.curly = 1;

                    } else if ( (splits[s] === '{') && (this._counts.brackets.curly > 0) ) {

                        // This curly is inside media
                        this._counts.brackets.curly = 2;

                    } else if ( (splits[s] === '}') && (this._counts.brackets.curly === 2) ) {

                        // Disable second curly
                        this._counts.brackets.curly = 1;

                        // Enable break
                        this._counts.break = 0;

                    } else if ( splits[s] === '}' ) {

                        // Disable curly
                        this._counts.brackets.curly = 0;

                        // Enable break
                        this._counts.break = 0;

                    }

                    // Check if char is new line
                    if (splits[s] === "\n") this._counts.last = "\r\n";

                    // Add break
                    this._add_break(splits[s]);

                }

            }

            return this._open;

        }
        
        _add_break(char: string): void {

            // Check if char is \r\n
            if ( char === "\r\n" ) {

                // Enable break
                this._counts.break = 1;
                
            } else {

                // Check if previous if break is negative
                if ( this._counts.break < 1 ) {
                    
                    // Check if char has the break rule
                    if ( this._rules.break.includes(char) ) {
                        
                        // Check if url is open
                        if ( this._counts.brackets.url > 0 ) {
                            return;
                        }

                        // Enable break
                        this._counts.break = 1;

                        // Add new line
                        this._open += "\r\n";

                        // Save last char
                        this._counts.last = "\r\n"; 

                    } else {

                        // Disable break
                        this._counts.break = 0;

                    }

                } else {

                    // Disable break
                    this._counts.break = 0;

                }

            }

        }

    }

}