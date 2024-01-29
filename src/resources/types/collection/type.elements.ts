/**
 * @file Element
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the type for the elements options
 */

// Import types
import { 
    option_type, 
    params_type, 
    events_type, 
    option_property_type 
} from './../types.index.js';

// Create a class which will be used as type
class ElementOptions {
    constructor (params: params_type) {}
    get_option (option: option_type): string | undefined { return; }
    get_property (option: option_type): option_property_type | undefined { return; }
    get_events(params: params_type): events_type | undefined { return; }
}
  
// Type for the ElementOptions class
export type element_options_type = typeof ElementOptions;