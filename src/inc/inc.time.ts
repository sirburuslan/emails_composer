/**
 * @file Time
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains functions for time reading
 */

// Import types
import { params_type } from '../resources/types/types.index.js';

/**
 * Get the date from timestamp
 * 
 * @param params_type params
 * @param string timestamp
 * 
 * @return string response
 */
export const get_date = (params: params_type, timestamp: string ): string => {

    // Create the date
    let the_date = new Date(parseInt(timestamp) * 1000);

    // Set year
    let year = the_date.getFullYear();

    // Set month
    let month = (the_date.getMonth() + 1).toString().padStart(2, '0');

    // Set date
    let date = the_date.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + date;

}

/**
 * Get the time from timestamp
 * 
 * @param params_type params
 * @param string timestamp
 * 
 * @return string response
 */
export const get_time = (params: params_type, timestamp: string ): string => {

    // Create the date
    let the_date = new Date(parseInt(timestamp) * 1000);

    // Get hour
    let hours = the_date.getHours();

    // Get minutes
    let minutes = the_date.getMinutes().toString().padStart(2, '0');

    // Set meridiam
    let meridiam = (hours > 12)?'PM':'AM';

    return ((hours > 12)?(hours - 12):hours).toString().padStart(2, '0') + ':' + minutes + ' ' + meridiam;

}