/**
 * @file Confirmation Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the confirmation email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the confirmation email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const confirmation_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('confirmation_email'),
        command: 'confirmation email'
    }

}

// Export the confirmation email function
export default confirmation_email;