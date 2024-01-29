/**
 * @file Events
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the types for the events
 */

// Multiple events
type events_type = Array<{
    action: string,
    element?: string | undefined,
    iframe?: string | undefined,
    target: (e: MouseEvent & KeyboardEvent & InputEvent) => void,
    capture: boolean
}>;

// Single event
type event_type = {
    action: string,
    element?: string | undefined,
    iframe?: string | undefined,
    target: (e: MouseEvent & KeyboardEvent & InputEvent) => void,
    capture: boolean
};

export {
    events_type,
    event_type
}