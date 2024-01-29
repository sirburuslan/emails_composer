/**
 * @interface Sections
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an interface with rules to build the sections classes
 */

// Interfaces
export namespace Interfaces {

    // Interface for sections
    export interface Sections {
        get_section: (extra: any) => any
    }

}