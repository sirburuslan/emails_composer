/**
 * @file Generate Survey Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the generate survey email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the generate survey email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const generate_survey_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('generate_survey_email'),
        command: 'generate survey email'
    }

}

// Export the generate survey email function
export default generate_survey_email;