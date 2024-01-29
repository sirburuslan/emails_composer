/**
 * @file Module
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the type for the modules
 */

// Create type for modules
type module_type = {
    name: string | null,
    category: string | null,
    description: string | null,
    cover?: string | null,
    html?: string | null,
    css?: string | null
};

// Export the types
export {
    module_type
}