/**
 * @file Fonts
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions for the fonts used in the template
 */

// Import types
import { font_type } from './../resources/types/types.index.js';

// Import the fonts
import * as fonts from './../resources/fonts/fonts.index.js';

/**
 * Get all fonts list
 * 
 * @returns string with html
 */
const get_all_fonts = (): string => {

    // Fonts container
    let fonts_html: string = '';

    // Verify if fonts exists
    if ( Object.keys(fonts).length > 0 ) {

        // Get only the fonts without keys
        let fonts_list: Array<font_type> = Object.values(fonts);

        // Open the list
        fonts_html += '<ul class="ec-fonts">';

        // List the fonts
        for ( let font of fonts_list ) {

            // Add font
            fonts_html += '<li>'
                + '<a href="#" style="font-family: ' + font.property + ';" data-font="' + font.slug + '">'
                    + font.name
                + '</a>'
            + '</li>';

        }

        // Close the list
        fonts_html += '</ul>';        

    }

    return fonts_html;

}

/**
 * Get the fonts link
 * 
 * @returns string with url
 */
const get_fonts_link = (): string => {

    // Fonts url container
    let fonts_url: string = '';

    // Verify if fonts exists
    if ( Object.keys(fonts).length > 0 ) {

        // Get only the fonts without keys
        let fonts_list: Array<font_type> = Object.values(fonts);

        // List the fonts
        for ( let font of fonts_list ) {

            // Add font
            fonts_url += font.link + '&';

        }      

    }

    return 'https://fonts.googleapis.com/css2?' + fonts_url + 'display=swap';

}

/**
 * Get the text sizes
 * 
 * @returns string with sizes
 */
const get_text_sizes = (): string => {

    // Sizes container
    let sizes: string = '<ul class="ec-ste-text-sizes">';

    // List the sizes
    for ( let s = 7; s < 99; s++ ) {

        // Add sise to the list
        sizes += '<li>'
            + '<a href="#" data-size="' + s + 'px">'
                + s + 'px'
            + '</a>'
        + '</li>';

    }

    // Close the list
    sizes += '</ul>';

    return sizes;

}

export {
    get_all_fonts,
    get_fonts_link,
    get_text_sizes
}