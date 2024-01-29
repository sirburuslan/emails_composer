// Import the default Path module
import path from 'path';

// Import the fileURLToPath from the URL module
import { fileURLToPath } from 'url';

// Import jsdom
import { JSDOM } from 'jsdom';

// Import the Security Inc
import { clean_string } from '../inc/security.js';

// Import the Files Manager
import { dir_exists, get_dirs, file_exists, get_files, read_file } from "../inc/fmanager.js";

// Preview class
export default class Preview {

    // Class properties
    __filename;
    __dirname;

    /**
     * Constructor
     */
    constructor() {

        // Set file name
        this.__filename = fileURLToPath(import.meta.url);

        // Set directory name
        this.__dirname = path.dirname(path.dirname(this.__filename));

    }

    /**
     * Get preview for a template
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_preview(req, res) {

        // Check if template's id exists
        if ( typeof req.params.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id from the request
        let template_id = clean_string(req.params.template_id);

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Check if the template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return false response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Get the updates directory path
        let updates_dir_path = path.join(template_dir_path, 'updates');

        // Get all update directories
        let update_dirs = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

        // Check if directories exists
        if ( typeof update_dirs.dirs === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'No updates found.'
            });

            return;

        }

        // Last directory
        let content_dir_path = update_dirs.dirs[0].directory;

        // Get the html file
        let get_html_file = read_file(path.join(updates_dir_path, content_dir_path, 'html.json'));

        // Verify if the file is available
        if ( !get_html_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: 'The html was not found.'
            });

            return;

        }

        // Define jsdom
        let jsdom;

        // Get the content
        try {

            // Turn file content to JSON
            let html_to_json = JSON.parse(get_html_file.data);                    
            
            // Init the JSDOM
            jsdom = new JSDOM(html_to_json.content,
                { includeNodeLocations: true });                    

        } catch (error) {

            // Return error response
            res.json({
                success: false,
                message: error.message
            });
            
            return;

        }

        // Get the body
        let saved_body = jsdom.window.document.documentElement.querySelector('body');

        // Check if template exists
        if ( !saved_body.querySelector('.ec-composer-template') ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template has no valid content.'
            });

            return;

        }

        // Create the CSS styles
        let css = ``;

        // Verify if the old css file exists
        if ( file_exists(path.join(updates_dir_path, content_dir_path, 'css.json')) )  {

            // Get the css file
            let css_file = read_file(path.join(updates_dir_path, content_dir_path, 'css.json'));

            // Verify if the file is available
            if ( css_file.success ) {

                // Turn file content to JSON
                let css_file_json = JSON.parse(css_file.data); 
                
                // Verify if content exists
                if ( (typeof css_file_json.content !== 'undefined') && css_file_json.content ) {

                    // Set css
                    css += css_file_json.content.replaceAll('&amp;', '&').replaceAll(`    `, `                `);

                }

            }

        }

        // Verify if the library file exists
        if ( file_exists(path.join(template_dir_path, 'library.json')) )  {

            // Get the library file
            let library_file = read_file(path.join(template_dir_path, 'library.json'));

            // Verify if the file is available
            if ( library_file.success ) {

                // Turn file content to JSON
                let library_file_json = JSON.parse(library_file.data); 
                
                // Verify if content exists
                if ( (typeof library_file_json.content !== 'undefined') && library_file_json.content ) {

                    // Set library to css
                    css += library_file_json.content.replaceAll(`    `, `                `);

                }

            }

        }

        // Set elements dir path
        let css_elements_path = path.join(updates_dir_path, content_dir_path, 'elements');

        // Check if elements dir exists
        if ( dir_exists(css_elements_path) ) {

            // Get all css files
            let css_elements_files = get_files(css_elements_path);

            // Check if files exists
            if ( css_elements_files.success ) {            

                // List the files
                for ( let file of css_elements_files.files ) {

                    // Get the css file
                    let css_file = read_file(path.join(css_elements_path, file));

                    // Verify if the file is available
                    if ( css_file.success ) {

                        // Turn file content to JSON
                        let css_file_json = JSON.parse(css_file.data); 
                        
                        // Verify if content exists
                        if ( (typeof css_file_json.content !== 'undefined') && css_file_json.content ) {

                            // Set css
                            css += css_file_json.content.replaceAll(`    `, `                `);

                        }

                    }

                }

            }

        }

        // Verify if css is not empty
        if ( css ) {

            // Open and close tags
            css = `\r\n        <style>\r\n            ` + css + `\r\n        </style>`;

        }

        // Get template
        let template = saved_body.querySelector('.ec-composer-template');

        // Get the template html
        let template_html = saved_body.querySelector('.ec-composer-template').outerHTML;

        // Verify if should be used the analytics url's parameters
        if ( template.getAttribute('data-google-analytics') === '1' ) {

            // Lets check if all required attributes exists
            if ( template.getAttribute('data-utm-source') && template.getAttribute('data-utm-medium') && template.getAttribute('data-utm-campaign') && template.getAttribute('data-utm-term') && template.getAttribute('data-utm-content') ) {

                // Verify if links exists
                if ( saved_body.querySelectorAll('a').length > 0 ) {

                    // Urls container
                    let urls = [];

                    // List the links
                    for ( let link of saved_body.querySelectorAll('a') ) {

                        // Verify if url is valid
                        if ( link.getAttribute('href') && /^(https?|ftp):\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(link.getAttribute('href')) && !urls.includes(link.getAttribute('href')) ) {

                            // Save url
                            urls.push(link.getAttribute('href'));

                        }

                    }

                    // Create the url parameters
                    let url_params = 'utm_source=' + encodeURIComponent(template.getAttribute('data-utm-source')) + '&utm_medium=' + encodeURIComponent(template.getAttribute('data-utm-medium')) + '&utm_campaign=' + encodeURIComponent(template.getAttribute('data-utm-campaign')) + '&utm_term=' + encodeURIComponent(template.getAttribute('data-utm-term')) + '&utm_content=' + encodeURIComponent(template.getAttribute('data-utm-content'));

                    // Verify if urls exists
                    if ( urls.length > 0 ) {

                        // List the urls
                        for ( let link of urls ) {

                            // Verify if ? exists in the url
                            if ( link.split('?').length > 1 ) {

                                // Replace url in the template
                                template_html = template_html.replaceAll(link + '"', link + '&' + url_params + '"');
                                template_html = template_html.replaceAll(link + "'", link + '&' + url_params + "'");

                            } else {

                                // Replace url in the template
                                template_html = template_html.replaceAll(link + '"', link + '?' + url_params + '"');
                                template_html = template_html.replaceAll(link + "'", link + '?' + url_params + "'");

                            }

                        }

                    }

                }

            }

        }

        // Verify if ec-element-cover exists
        if ( saved_body.querySelectorAll('.ec-element-cover').length > 0 ) {

            // List the covers
            for ( let cover of saved_body.querySelectorAll('.ec-element-cover') ) {

                // Remove cover from template
                template_html = template_html.replace(cover.outerHTML, '');                

            }

        }
        
        // Check if the analytics attributes exists and remove them

        if ( template.getAttribute('data-google-analytics') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-google-analytics="' + template.getAttribute('data-google-analytics') + '"', '');

        }

        if ( template.getAttribute('data-utm-source') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-utm-source="' + template.getAttribute('data-utm-source') + '"', '');

        }        

        if ( template.getAttribute('data-utm-medium') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-utm-medium="' + template.getAttribute('data-utm-medium') + '"', '');

        }

        if ( template.getAttribute('data-utm-campaign') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-utm-campaign="' + template.getAttribute('data-utm-campaign') + '"', '');

        }

        if ( template.getAttribute('data-utm-term') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-utm-term="' + template.getAttribute('data-utm-term') + '"', '');

        }

        if ( template.getAttribute('data-utm-content') !== null ) {

            // Remove attribute from template
            template_html = template_html.replace(' data-utm-content="' + template.getAttribute('data-utm-content') + '"', '');

        }

        // Lets create the html file
        let html = `<!doctype html>`;
        html += `\r\n<html>`;
        html += `\r\n    <head>`;
        html += `\r\n        <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        html += `\r\n        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">`;
        html += css;
        html += `\r\n    </head>`;
        html += `\r\n    <body>`;
        html += `\r\n        ` + template_html;
        html += `\r\n    </body>`;
        html += `\r\n</html>`;

        // Display HTML
        res.end(html);

    }
    
}