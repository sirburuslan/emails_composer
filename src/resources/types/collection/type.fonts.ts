/**
 * @file Fonts
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the type for the fonts
 */

// Create types for fonts
type font_type = {
    name: string,
    slug: string,
    link: string,
    property: string,
    weight: number[]
};

// Export the types
export {
    font_type
}