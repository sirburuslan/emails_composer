/**
 * @file ChatGPT
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the chatgpt service for ai
 */

// Import types
import {
    params_type,
    ai_service_type
} from '../../../types/types.index.js';

/**
 * Create the chatgpt service
 * 
 * @param params_type params
 * 
 * @returns object with service's data
 */
const chatgpt = (params: params_type): ai_service_type => {

    return {
        name: params.words('chatgpt'),
        slug: 'chatgpt'
    }

}

// Export the chatgpt function
export default chatgpt;