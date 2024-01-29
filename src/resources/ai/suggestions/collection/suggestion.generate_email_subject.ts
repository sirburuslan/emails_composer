/**
 * @file Generate Email Subject
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the generate email subject suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the generate email subject function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const generate_email_subject = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('generate_email_subject'),
        command: 'generate email subject'
    }

}

// Export the generate email subject function
export default generate_email_subject;