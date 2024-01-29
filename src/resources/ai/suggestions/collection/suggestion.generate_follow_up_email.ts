/**
 * @file Generate Follow-up Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the generate follow up email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the generate follow up email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const generate_follow_up_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('generate_follow_up_email'),
        command: 'generate follow up email'
    }

}

// Export the generate follow up email function
export default generate_follow_up_email;