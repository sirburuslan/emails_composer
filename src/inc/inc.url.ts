/**
 * @file Urs
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains a function to verify if the urls are valid
 */

/**
 * Checks if url is valid
 * 
 * @param string url
 * 
 * @returns boolean
 */
export const is_url_valid = (url: string): boolean => {

    // Try url
    try {

        // Init url
        new URL(url);

        // Return success
        return true;

    } catch (e) {

        // Return false
        return false;

    }

}