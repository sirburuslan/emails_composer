/**
 * @class General
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class contains some methods for html code formatting
 */

// Html Formatter
export namespace HtmlFormatter {

    // General class with different methods
    export class General {

        /**
         * Extract the tag
         * 
         * @param string tag information
         * 
         * @returns object
         */
        get_tag(tag: string): object {

            // Verify if the split exists
            if ( tag?.split('>').length > 1 ) {

                // Hidden container
                let hidden: boolean = false;

                // Start container
                let start: boolean = false;

                // Verify if the tag is hidden
                if ( ( tag.split('<!--').length > 1 ) || ( tag.split('-->').length > 1 ) ) {

                    // Set tag as hidden
                    hidden = true;

                    // Set start
                    start = ( tag.split('-->').length > 1 )?false:true;

                } else {

                    // Prepare tag
                    const tag_full: string = '<' + tag;                    

                    // Set start
                    start = ( (tag_full.split('/>').length > 1) || (tag_full.split('</').length > 1) || (tag_full.split('<\/').length > 1) )?false:true;

                }

                // Return the tag information
                return {
                    tag: tag.split('>').shift()!.split(' ').shift()?.replace('/', ''),
                    start: start,
                    text: tag.split('>').slice(-1)[0]?tag.split('>').slice(-1)[0]:'',
                    hidden: hidden
                };
                
            }

            return {
                tag: '',
                start: false,
                text: '',
                hidden: false
            };
        }

        /**
         * Get tag by index
         * 
         * @param array tags all tags
         * @param number i with index
         * 
         * @returns object
         */
        get_tag_by_index(tags: string[], i: number): {[key: string]: string | boolean | number | undefined} {

            // Verify if tag exists
            if ( typeof tags[i] !== 'undefined' ) {

                // Verify if the split exists
                if ( tags[i].split('>').length > 1 ) {

                    // Hidden container
                    let hidden: boolean = false;

                    // Start container
                    let start: boolean = false;

                    // Verify if the tag is hidden
                    if ( ( tags[i].split('<!--').length > 1 ) || ( tags[i].split('-->').length > 1 ) ) {

                        // Set tag as hidden
                        hidden = true;

                        // Set start
                        start = ( tags[i].split('-->').length > 1 )?false:true;

                    } else {

                        // Prepare tag
                        const tag: string = '<' + tags[i];                

                        // Set start
                        start = ( (tag.split('/>').length > 1) || (tag.split('</').length > 1) || (tag.split('<\/').length > 1) )?false:true;

                    }

                    // Return the tag information
                    return {
                        tag: tags[i].split('>').shift()!.split(' ').shift()?.replace('/', ''),
                        start: start,
                        text: tags[i].split('>').slice(-1)[0]?tags[i].split('>').slice(-1)[0]:'',
                        hidden: hidden
                    };
                    
                }

            }

            return {
                tag: '',
                start: false,
                text: '',
                hidden: false
            };
            
        }

    }

}