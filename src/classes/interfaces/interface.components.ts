/**
 * @interface Components
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * Is an interface with rules to build the components
 */

// Interfaces
export namespace Interfaces {

    // Interface for components
    export interface Components {
        get_events: (extra: any) => any
    }

}