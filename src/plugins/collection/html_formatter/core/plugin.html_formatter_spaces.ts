/**
 * @class Spaces
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class adds spaces in the code lines
 */

// Import dependencies
import { HtmlFormatterGeneral } from "./plugin.html_formatter_index.js";

// Html Formatter
export namespace HtmlFormatter {

    // Add spaces
    export class Spaces {

        // Space counter
        _cspace: number = 0;

        // Open container
        _open: string = '';
        
        // Space model
        _space: string = '&nbsp;&nbsp;&nbsp;&nbsp;';

        // General methods
        _general: any;

        // In line tags
        _in_line: string[] = [
            'br',
            'hr'
        ];

        // New line tags
        _new_line: string[] = [
            'button'
        ];

        // No ends
        _no_ends: string[] = [
            'area',
            'base',
            'br',
            'col',
            'embed',
            'hr',
            'img',
            'input',
            'link',
            'meta',
            'param',
            'source',
            'track',
            'wbr',
            'area',
            'base',
            'br',
            'col',
            'embed',
            'hr',
            'img',
            'input',
            'link',
            'meta',
            'param',
            'source',
            'track',
            'wbr',
        ];

        // Text container
        _t_container: string = '';

        /**
         * Add spaces to the code
         * 
         * @param string fcode contains the formatted code
         * 
         * @returns string
         */
        add_spaces(fcode: string): string {

            // Split the code
            let splits: string[] = fcode.split('<');

            // Verify if the code is splitted
            if ( splits.length < 2 ) {
                return fcode.replace(/\s/g, '&nbsp;');
            }
            
            // Init the General class
            this._general = new HtmlFormatterGeneral.HtmlFormatter.General();

            // Total splits
            let tsplits: number = splits.length;

            // Splits counter
            let s: number = 0;

            // List the splits
            do {

                // Get tag
                let get_tag = this._general.get_tag(splits[s]);
                
                // Check if tag exists
                if ( !get_tag.tag ) {

                    // Add split
                    this._open += (s < 1)?splits[s]:'<' + splits[s];
                 
                    // Increase s
                    s++;

                    continue;
                    
                }

                // Get previous tag
                let previous_tag: {[key: string]: string | boolean | number | undefined} = this._general.get_tag_by_index(splits, (s - 1));

                // Get next tag
                let next_tag: {[key: string]: string | boolean | number | undefined} = this._general.get_tag_by_index(splits, (s + 1));                

                // Check if tag is start
                if ( get_tag.start ) {

                    // Verify if the next tag is hidden start
                    if ( next_tag.hidden && !next_tag.start && get_tag.hidden && next_tag.hidden ) {
                        
                        // Set tag end
                        this._open += (previous_tag.text || ( (previous_tag.tag === get_tag.tag) && previous_tag.start && !get_tag.start ) )?'<' + splits[s]:this._space.repeat(this._cspace) + '<' + splits[s];

                        // Set breakline
                        this._open += "\r\n";

                        // Change the cspace
                        if ( this._cspace > 0 ) this._cspace--;
                        
                        // Increase s
                        s++;

                        continue;
                        
                    } else if ( previous_tag.text ) {
                        
                        // Set space
                        this._open += ' ';

                        // Check if is new line
                        if ( this._new_line.indexOf(get_tag.tag) > -1 ) {
                            splits[s] = splits[s].replaceAll('<' + get_tag.tag, "\r\n" + this._space.repeat(this._cspace) + '<' + get_tag.tag);
                        }

                    }

                    // If current has text
                    if ( get_tag.text ) {
                        if ( !this._t_container ) this._t_container = get_tag.tag + '_';
                    } else if ( this._t_container.split(get_tag.tag + '_').length > 1 ) {
                        this._t_container += get_tag.tag + '_';
                    }

                    // Replace space
                    splits[s] = splits[s].replaceAll('> ', '>');

                } else {

                    // Verify if the next tag is hidden start
                    if ( next_tag.hidden && !next_tag.start && get_tag.hidden && next_tag.hidden ) {
                        
                        // Set tag end
                        this._open += (previous_tag.text || ( (previous_tag.tag === get_tag.tag) && previous_tag.start && !get_tag.start ) )?'<' + splits[s]:this._space.repeat(this._cspace) + '<' + splits[s];

                        // Set breakline
                        this._open += "\r\n";

                        // Change the cspace
                        if ( this._cspace > 0 ) this._cspace--;
                        
                        // Increase s
                        s++;

                        continue;
                        
                    } else if ( !get_tag.text ) {

                        // Replace space
                        splits[s] = splits[s].replaceAll('> ', '>');

                    }

                    // Reset text container
                    if ( this._t_container.split(get_tag.tag + '_').length > 1 ) {

                        // Empty
                        this._t_container = this._t_container.replace(get_tag.tag + '_', '');

                        // Set tag end
                        this._open += '<' + splits[s];

                        // Verify if this._t_container is empty
                        if ( !this._t_container ) {

                            // Set breakline
                            this._open += "\r\n";

                            // Verify if the next tag is start
                            if ( !next_tag.start ) {

                                // Change the cspace
                                if ( this._cspace > 0 ) this._cspace--;

                            }

                        }
                        
                        // Increase s
                        s++;

                        continue;

                    }

                }

                // Prepare the tag
                let temp = (previous_tag.text || ( (previous_tag.tag === get_tag.tag) && previous_tag.start && !get_tag.start ) )?'<' + splits[s]:this._space.repeat(this._cspace) + '<' + splits[s];

                // Check if tag is start
                if ( get_tag.start ) {

                    // Check if previous tag has text
                    if ( previous_tag.text ) {

                        // Check if is new line
                        if ( this._new_line.indexOf(get_tag.tag) > -1 ) {
                            temp = temp.replaceAll('<' + get_tag.tag, "\r\n" + this._space.repeat(this._cspace) + '<' + get_tag.tag);
                        } else {
                            temp = this._space.repeat(this._cspace) + '<' + splits[s];
                        }

                    } else if ( get_tag.text && next_tag.start ) {

                        // Get current tag
                        let ctag: string | undefined = splits[s].split('>').shift();

                        // Add end
                        temp = this._space.repeat(this._cspace) + '<' + ctag + '>';

                        // Set breakline
                        temp += "\r\n";

                        // Increase space
                        this._cspace++;

                        // Add end
                        temp += this._space.repeat(this._cspace) + get_tag.text;

                        // Set breakline
                        temp += "\r\n";

                        // Add end
                        this._open += temp;

                        // Increase s
                        s++;

                        continue;

                    }

                    // Check if the tag has no value
                    if ( (next_tag.tag === get_tag.tag) && !next_tag.start ) {

                        // Add end
                        this._open += temp;

                        // Increase s
                        s++;

                        continue;

                    }

                }

                // Check if tag has end
                if ( (this._no_ends.indexOf(get_tag.tag) > -1) ) {

                    // Add end
                    this._open += this._add_end(temp);

                    // Set breakline
                    this._open += "\r\n";

                    // Verify if the next tag has no ends
                    if ( (this._no_ends.indexOf((next_tag as {tag: string}).tag) < 0) && !next_tag.start && !next_tag.hidden ) {

                        // Change the cspace
                        if ( this._cspace > 0 ) this._cspace--;

                    }

                    // Increase s
                    s++;

                    continue;

                } else if ( (this._no_ends.indexOf((previous_tag as {tag: string}).tag) > -1) && !previous_tag.text ) {

                    // Set space
                    temp = temp;

                    // Change the cspace
                    if ( this._cspace > 0 && !get_tag.start && get_tag.start ) {
                        this._cspace--;
                    }
                    
                } else if ( (this._no_ends.indexOf((previous_tag as {tag: string}).tag) > -1) && !get_tag.start ) {

                    // Set space
                    temp = this._space.repeat(this._cspace) + temp;

                }

                // Set split
                this._open += temp;

                // Check if text exists
                if ( !get_tag.text && !get_tag.hidden && !this._t_container ) {

                    // Set breakline
                    this._open += "\r\n";

                    // Change the cspace
                    if ( get_tag.start ) {
                        this._cspace++;
                    } else if ( (this._cspace > 0) && (next_tag.tag !== get_tag.tag) && !next_tag.start && ( this._in_line.indexOf((next_tag as {tag: string}).tag) < 0 ) ) {
                        this._cspace--;
                    } else if ( (this._cspace > 1) && !next_tag.start ) {
                        this._cspace--;
                    } else if ( !get_tag.start && !next_tag.start ) {
                        if ( this._cspace > 0 ) this._cspace--;
                    }

                } else if ( get_tag.hidden ) {

                    // Set breakline
                    this._open += "\r\n";                    

                } else {

                    // Set breakline
                    this._open += "\r\n"; 

                    // Change the cspace
                    if ( get_tag.start ) {
                        this._cspace++;
                    } else if ( (this._cspace > 0) && (next_tag.tag !== get_tag.tag) && !next_tag.start && ( this._in_line.indexOf((next_tag as {tag: string}).tag) < 0 ) ) {
                        this._cspace--;
                    } else if ( (this._cspace > 1) && !next_tag.start ) {
                        this._cspace--;
                    } else if ( !get_tag.start && !next_tag.start ) {
                        if ( this._cspace > 0 ) this._cspace--;
                    }

                }

                // Increase s
                s++;

            } while ( s < tsplits );

            return this._open;

        }

        /**
         * Add end to the tag
         * 
         * @param string tag
         * 
         * @returns string with tag
         */
        _add_end(tag: string): string {

            // Add slash
            return tag.replace(' >', '>').replace('> ', '>').replace('/>', '>').replace('>', ' />').replaceAll('  ', ' ');

        }

    }

}