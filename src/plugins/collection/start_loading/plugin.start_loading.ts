/**
 * @class StartLoading
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class loads an animation when the composer starts
 */

// Import dependencies
import content from "./views/main.js";

// Plugins
export namespace Plugins {

    // Start Loading
    export class StartLoading {

        /**
         * Get and return html
         * 
         * @param any selector
         */
        get_content(selector: any): void {

            // Display html
            selector!.querySelector('.ec-composer')!.innerHTML = content.html;

            // Default counter
            let c = 0,

            // Timer
            timer = setInterval(() => {

                // Increase counter
                c = c + 1;

                // Display the percentage
                selector!.querySelector('.ec-start-loading-counter').textContent = c + '%';

                // Increase the bar
                selector!.querySelector('.ec-start-loading-progress-bar').style.width = c + '%';

                // Verify if the limit was reached
                if ( c === 100 ) {

                    // Stop
                    clearInterval(timer);

                    // Wait 2 seconds
                    setTimeout(() => {

                        // Remove the loader
                        selector!.querySelector('.ec-start-loading').remove();

                    }, 1200);

                }

            }, 1);

        }

    }

}