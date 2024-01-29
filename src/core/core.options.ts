/**
 * @class Options
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-29
 *
 * This class replaces and reads options
 */

// Import options
import options from './../options.json';

// Core
export namespace Core {

    // Options
    export class Options {

        // Options list
        static options_list: {
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

            // Check if option exists
            if (typeof Options.options_list.hasOwnProperty(name) !== 'undefined') {
                return Options.options_list[name];
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
            if ( Object.keys(Options.options_list).length < 1 ) {

                // Set the options
                Options.options_list = options;

            }

            // Verify if updated options exists
            if ( Object.keys(updated_options).length > 0 ) {

                // Get the default options
                let default_options = Object.keys(Options.options_list);

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
                            n_options[d_options[t]] = old_obj[d_options[t]]?old_obj[d_options[t]]:c_options[d_options[t]];

                        }
                
                    }
                
                }
              
                // Group the options
                group_options(Options.options_list, default_options, updated_options, new_options);

                // Replace the options
                Options.options_list = new_options;

            }

        }

    }   

}