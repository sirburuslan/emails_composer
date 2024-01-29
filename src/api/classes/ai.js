// Import the Security Inc
import { clean_string} from '../inc/security.js';

// Export the Ai class
export default class Ai {

    /**
     * Get ai content by service and text request
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    async get_ai_content(req, res) {

        // Verify if service exists in the body
        if ( typeof req.body.service === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: '<p>The service was not found in the query.</p>'
            });

            return;

        }

        // Get the ai service
        let service = clean_string(req.body.service);

        // Verify if command exists in the body
        if ( typeof req.body.command === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: '<p>The command was not found in the request.</p>'
            });

            return;

        }

        // Get the ai command
        let command = clean_string(req.body.command);

        // Verify if the service is chatgpt
        if ( service === 'chatgpt' ) {

            // Prepare the open ai api key
            let OPENAI_API_KEY = process.env.OPENAI_KEY;

            // Create the post fields
            let post_fields = {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: command }],
                temperature: 0.7,
            };

            // Prepare the request parameters
            let request_params = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify(post_fields),
            }

            // Send request
            let response = await fetch('https://api.openai.com/v1/chat/completions', request_params);

            // Verify if an error has been occurred
            if ( !response.ok ) {

                // Return error response
                res.json({
                    success: false,
                    message: "<p>An error occurred while processing your request.</p>"
                });
                
                return;

            }

            // Process the response
            let data = await response.json();

            // Verify if the data has choices
            if ( typeof data.choices !== 'undefined' ) {

                // Prepare the response
                let content = '<p>' + data.choices[0].message.content.replaceAll(/\n/g, '</p><p>') + '</p>';

                // Return success response
                res.json({
                    success: true,
                    response: content.replaceAll('<p></p>', '')
                });

            } else {

                // Return error response
                res.json({
                    success: false,
                    message: "<p>No available response.</p>"
                });
                
            }

        } else {

            // Return error response
            res.json({
                success: false,
                message: "<p>The service is not available.</p>"
            });

        }

    }

}