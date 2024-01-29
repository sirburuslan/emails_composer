/**
 * @file Instances
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains a functions to manage the emails composer instances
 */

// Import core
import { CoreInstances } from './../core/core.index.js';

/**
 * Get an instance
 * 
 * @param string name
 * 
 * @return any response
 */
export const get_instance = (name: string): any => {

    // Get an instance
    return CoreInstances.Core.Instances.get_instance(name);

}

/**
 * Save an instance
 * 
 * @param string instance
 */
export const save_instance = (instance: string): void => {

    // Save an instance
    return CoreInstances.Core.Instances.save_instance(instance);

}