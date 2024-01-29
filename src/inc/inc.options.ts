/**
 * @file Options
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used to read and update the emails composer options
 */

// Import controllers
import { CoreOptions } from './../core/core.index.js';

/**
 * Get an option
 * 
 * @param string name
 * 
 * @return string or boolean response
 */
export const get_option = (name: string): any => {

    // Get an option
    return new CoreOptions.Core.Options().get_option(name);

}

/**
 * Update options
 * 
 * @param object updated_options
 */
export const update_options = (updated_options: object): void => {

    // Replace default options
    new CoreOptions.Core.Options().replace_options(updated_options);

}