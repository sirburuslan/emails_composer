/**
 * @interface Icons
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an interface with rules to build the icons classes
 */


// Interfaces
export namespace Interfaces {

    // Interface for icons
    export interface Icons {
        get_icon: (extra: any) => string
    }

}