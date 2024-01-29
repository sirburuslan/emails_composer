/**
 * @file Sales Promotional Email
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-01
 *
 * This file contains the sales promotional email suggestion
 */

// Import types
import {
    params_type,
    ai_suggestion_type
} from '../../../types/types.index.js';

/**
 * Create the sales promotional email function
 * 
 * @param params_type params
 * 
 * @returns object with suggestion's data
 */
const sales_promotional_email = (params: params_type): ai_suggestion_type => {

    return {
        name: params.words('sales_promotional_email'),
        command: 'sales promotional email'
    }

}

// Export the sales promotional email function
export default sales_promotional_email;