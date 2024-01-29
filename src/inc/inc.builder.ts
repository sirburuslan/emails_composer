/**
 * @file Builder
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file contains some functions for the builder
 */

// Import core builder
import { CoreBuilder } from './../core/core.index.js';

/**
 * Run builder
 * 
 * @param string element
 */
export const run_builder = (element: string): void => {

    // Run builder
    new CoreBuilder.Core.Builder(element).run_builder();

}