/**
 * @class Timer
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This class schedules events with the scope to execute the request once instead multiple times
 */

// Class Namespace
export namespace Class {

    // Timer
    export class Timer {

        // Scheduled events
        static events: {[key: string]: NodeJS.Timeout} | null = null;

        /**
         * Schedule and event
         * 
         * @param string schedule_id
         * @param function target
         * @param number time
         */
        static schedule_event(schedule_id: string, target: () => void, time: number = 1000) {

            // Verify if schedule id exists
            if ( (typeof Timer.events !== 'undefined') && Timer.events && (typeof Timer.events![schedule_id] !== 'undefined') ) {

                // Cancel the existing scheduling
                clearTimeout(Timer.events![schedule_id]);

            }

            // Check if Timer.events is null
            if ( !Timer.events ) {

                // Set a pause
                Timer.events = {
                    [schedule_id]: setTimeout(target, time)
                };

            } else {

                // Set a pause
                Timer.events![schedule_id] = setTimeout(target, time);

            }

        }

    }

}