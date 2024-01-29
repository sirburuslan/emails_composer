/**
 * @file Lang
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains a function to read the emails composer words
 */

// Import inc
import {get_option} from './../inc/inc.options.js';

// Set default language
const lang: string = get_option('language')?get_option('language'):'english';

// Import words
import {get_words}  from './../language/language.index.js';

// Request the words list
const word_list: {[key: string]: string} = get_words(lang);

/**
 * Get a word or any text
 * 
 * @param string
 * 
 * @return string
 */
export const get_word = (word: string): string => {

    // Return empty if missing
    return word_list[word]?word_list[word]:'';

}