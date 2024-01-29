/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains a function for words reading
 */

// Import english language
import * as english_lang from './../language/english/language.main.json';

/**
 * Export the words
 * 
 * @param string lang 
 */
export const get_words = (lang: string): any => {

    // Export the wanted language
    if ( lang === 'english' ) {

        // Return the language
        return english_lang;

    } else {

        return false;

    }

};