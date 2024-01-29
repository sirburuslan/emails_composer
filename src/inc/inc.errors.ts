/**
 * @file Errors
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used to display custom errors in the browser's console
 */

// Import core errors
import { Core } from './../core/core.errors.js';

/**
 * Show error message
 * 
 * @param string message
 */
export const show_message = (message: string): void => {

    // Set and show error
    try {
        throw new Core.Errors(message);
    } catch(error: any) {
        console.log(error.message);
    }

}