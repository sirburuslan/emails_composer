/**
 * @file Params
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the type for the main parameters
 */

// Create the main composer parameters
type params_type = {
    options: (name: string) => string | boolean,
    words: (word: string) => string,
    icons: (icon: string, extra?: object) => string,
    selector: Element,
    template_id?: string
};

// Export the parameters
export {
    params_type
}