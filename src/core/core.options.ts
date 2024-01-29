// Import options
import options from './../options.json';

// Core
export namespace Core {

    // Options
    export class Options {

        // Options list
        options_list: {
            [key: string]: any;
        } = {};

        /**
         * Get an option
         * 
         * @param string name
         * 
         * @return string or boolean response
         */
        get_option(name: string): string | boolean {

            // Verify if json contains options
            if ( Object.keys(this.options_list).length < 1 ) {

                // Set the options
                this.options_list = options;

            }

            // Check if option exists
            if (typeof this.options_list.hasOwnProperty(name) !== 'undefined') {
                return this.options_list[name];
            } else {
                return false;
            }

        }
        
        /**
         * Replace the options
         * 
         * @param object updated_options
         */
        replace_options(updated_options: object): void {

            // Verify if json contains options
            if ( Object.keys(this.options_list).length < 1 ) {

                // Set the options
                this.options_list = options;

            }

            // Verify if updated options exists
            if ( Object.keys(updated_options).length > 0 ) {

                // Get the default options
                let default_options = Object.keys(this.options_list);

                // New options
                let new_options = {};
                
                // Group the options
                let group_options = (c_options: any, d_options: any, old_obj: any, n_options: any): void => {
                
                    // Get total options
                    let total_options = d_options.length;

                    // List options
                    for ( var t = 0; t < total_options; t++ ) {

                        // Verify if new keys missing
                        if ( !old_obj ) {
                            
                            // Save all childrens
                            n_options[d_options[t]] = c_options[d_options[t]];
                            
                        } else if ( typeof c_options[d_options[t]] === 'object' ) {
                   
                            // Check if there are more than a children
                            if ( Object.keys(c_options[d_options[t]]).length > 0 ) {
                                
                                // Save path
                                n_options[d_options[t]] = c_options[d_options[t]];

                                // Verify if new preferences exists
                                if ( typeof old_obj[d_options[t]] === 'object' ) {
 
                                    // Verify if is an array
                                    if ( Array.isArray(old_obj[d_options[t]]) ) {

                                        // Save all array childrens
                                        n_options[d_options[t]] = c_options[d_options[t]].concat(old_obj[d_options[t]]);

                                    } else {

                                        // Group options
                                        group_options(c_options[d_options[t]], Object.keys(c_options[d_options[t]]), old_obj[d_options[t]], n_options[d_options[t]]);

                                    }

                                } else {

                                    // Group options
                                    group_options(c_options[d_options[t]], Object.keys(c_options[d_options[t]]), false, n_options[d_options[t]]);

                                }
                            
                            } else {
                            
                                // Save option
                                n_options[d_options[t]] = {};
                            
                            }
                        
                        } else {
                             
                            // Save option
                            n_options[d_options[t]] = (old_obj[d_options[t]] !== 'undefined')?old_obj[d_options[t]]:c_options[d_options[t]];
                    
                        }
                
                    }
                
                }
                
                // Group the options
                group_options(this.options_list, default_options, updated_options, new_options);

                // Replace the options
                this.options_list = new_options;

            }

        }

    }   

}