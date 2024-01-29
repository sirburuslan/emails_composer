/**
 * @file Welcome Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the welcome email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the welcome email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const welcome_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('welcome_email'),
        command: 'welcome email'
    }

}

// Export the welcome email function
export default welcome_email;