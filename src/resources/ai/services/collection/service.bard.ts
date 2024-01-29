/**
 * @file Bard
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the bard service for ai
 */

// Import types
import {
    params_type,
    ai_service_type
} from '../../../types/types.index.js';

/**
 * Create the bard service
 * 
 * @param params_type params
 * 
 * @returns object with service's data
 */
const bard = (params: params_type): ai_service_type => {

    return {
        name: params.words('bard'),
        slug: 'bard'
    }

}

// Export the bard function
export default bard;