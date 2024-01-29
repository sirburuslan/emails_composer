/**
 * @class Https
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * The goal of this class is to make http requests for updates
 */

// Import the types
import { option_type } from "../resources/types/types.index.js";

// Import inc
import {
    show_message
} from '../inc/inc.index.js';

type template = {template_id: string};

// Class Namespace
export namespace Class {

    // Https
    export class Https {

        /**
         * Process a GET http request
         * 
         * @param string with url
         * 
         * @returns Promise<PromiseConstructor> as response
         */
        async get(url: string): Promise<{success: boolean, message?: string, data?: string[]}> {

            // Request data
            return new Promise((resolve, reject) => {

                // Execute a fetch request
                fetch(url, {
                    method: 'GET'
                })
                .then(response => {

                    // Return response
                    resolve(response.json());

                })
                .catch(error => {

                    // Return error
                    reject(new Error(error));

                });

                /** 
                // Init XMLHTTPRequest
                let xmlhttp: XMLHttpRequest = new XMLHttpRequest();

                // Open url
                xmlhttp.open('GET', url, true);

                // Detect response
                xmlhttp.addEventListener('load', (): void => {

                    // Verify if response is success
                    if ( (xmlhttp.status >= 200) && (xmlhttp.status < 300) ) {

                        // Decode response
                        let response = JSON.parse(xmlhttp.responseText);

                        // Return
                        resolve(response);

                    } else {

                        // Return response
                        reject(new Error(xmlhttp.statusText));

                    }

                });

                // Catch error
                xmlhttp.addEventListener('error', (): void => {

                    // Return response
                    reject(new Error(xmlhttp.statusText));

                });

                // Send request
                xmlhttp.send();
                */

            });

        }

        /**
         * Process a POST http request
         * 
         * @param string with url
         * @param template template
         * @param option_type option
         * 
         * @returns Promise<{ success: boolean; message: string }> as response
         */
        async post(url: string, template?: template, option?: option_type): Promise<{ success: boolean; message: string }> {

            // Request data
            return new Promise((resolve, reject) => {

                // Parameters type
                type params_type = {
                    method: string,
                    headers?: {[key: string]: string},
                    body?: string
                };

                // Prepare the parameters
                let params: params_type = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }

                };

                // Check if template exists
                if ( template !== null ) {

                    // Turn template to string
                    params['body'] = JSON.stringify(template);

                } else if ( option !== null ) {

                    // Turn option to string
                    params['body'] = JSON.stringify(option);

                }

                // Execute a fetch request
                let fetch_request = fetch(url, params);

                // Process the response
                fetch_request.then(response => {

                    // Return response
                    resolve(response.json());

                });

                // Proccess the error
                fetch_request.catch(error => {

                    // Return error
                    reject(new Error(error));

                });

                /** 
                // Init XMLHTTPRequest
                let xmlhttp: XMLHttpRequest = new XMLHttpRequest();

                // Open url
                xmlhttp.open('POST', url, true);

                // Set header parameters
                xmlhttp.setRequestHeader('Content-Type', 'application/json');

                // Detect response
                xmlhttp.addEventListener('load', (): void => {

                    // Verify if response is success
                    if ( (xmlhttp.status >= 200) && (xmlhttp.status < 300) ) {

                        // Decode response
                        let response = JSON.parse(xmlhttp.responseText);

                        // Return
                        resolve(response);

                    } else {

                        // Return response
                        reject(new Error(xmlhttp.statusText));

                    }

                });

                // Catch error
                xmlhttp.addEventListener('error', (): void => {

                    // Return response
                    reject(new Error(xmlhttp.statusText));

                });

                // Turn params into string
                let json_string: string = JSON.stringify(option);

                // Send request with string
                xmlhttp.send(json_string);*/

            });

        }

        /**
         * Process a PUT http request
         * 
         * @param string with url
         * @param object update
         * 
         * @returns Promise<{ success: boolean; message: string }> as response
         */
        async put(url: string, update?: {template_id: string, html?: {index?: number, structure?: number, content: string}}): Promise<{ success: boolean; message: string }> {

            // Request data
            return new Promise((resolve, reject) => {

                // Parameters type
                type params_type = {
                    method: string,
                    headers?: {[key: string]: string},
                    body?: string
                };

                // Prepare the parameters
                let params: params_type = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }

                };

                // Turn option to string
                params['body'] = JSON.stringify(update);

                // Execute a fetch request
                let fetch_request = fetch(url, params);

                // Process the response
                fetch_request.then(response => {

                    // Return response
                    resolve(response.json());

                });

                // Proccess the error
                fetch_request.catch(error => {

                    // Return error
                    reject(new Error(error));

                });

                /** 
                // Init XMLHTTPRequest
                let xmlhttp: XMLHttpRequest = new XMLHttpRequest();

                // Open url
                xmlhttp.open('POST', url, true);

                // Set header parameters
                xmlhttp.setRequestHeader('Content-Type', 'application/json');

                // Detect response
                xmlhttp.addEventListener('load', (): void => {

                    // Verify if response is success
                    if ( (xmlhttp.status >= 200) && (xmlhttp.status < 300) ) {

                        // Decode response
                        let response = JSON.parse(xmlhttp.responseText);

                        // Return
                        resolve(response);

                    } else {

                        // Return response
                        reject(new Error(xmlhttp.statusText));

                    }

                });

                // Catch error
                xmlhttp.addEventListener('error', (): void => {

                    // Return response
                    reject(new Error(xmlhttp.statusText));

                });

                // Turn params into string
                let json_string: string = JSON.stringify(option);

                // Send request with string
                xmlhttp.send(json_string);*/

            });

        }

        /**
         * Process a DELETE http request
         * 
         * @param string with url
         * 
         * @returns Promise<PromiseConstructor> as response
         */
        async delete(url: string): Promise<PromiseConstructor> {

            // Request data
            return new Promise((resolve, reject) => {

                // Execute a fetch request
                fetch(url, {
                    method: 'DELETE'
                })
                .then(response => {

                    // Return response
                    resolve(response.json());

                })
                .catch(error => {

                    // Return error
                    reject(new Error(error));

                });

                /** 
                // Init XMLHTTPRequest
                let xmlhttp: XMLHttpRequest = new XMLHttpRequest();

                // Open url
                xmlhttp.open('DELETE', url, true);

                // Detect response
                xmlhttp.addEventListener('load', (): void => {

                    // Verify if response is success
                    if ( (xmlhttp.status >= 200) && (xmlhttp.status < 300) ) {

                        // Decode response
                        let response = JSON.parse(xmlhttp.responseText);

                        // Return
                        resolve(response);

                    } else {

                        // Return response
                        reject(new Error(xmlhttp.statusText));

                    }

                });

                // Catch error
                xmlhttp.addEventListener('error', (): void => {

                    // Return response
                    reject(new Error(xmlhttp.statusText));

                });

                // Send request
                xmlhttp.send();
                */

            });

        }

    }

}