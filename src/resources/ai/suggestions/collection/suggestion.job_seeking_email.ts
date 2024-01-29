/**
 * @file Job Seeking Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the job seeking email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the job seeking email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const job_seeking_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('job_seeking_email'),
        command: 'job seeking email'
    }

}

// Export the job seeking email function
export default job_seeking_email;