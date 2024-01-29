// Import the default Path module
import path from 'path';

// Import the default File System Module
import fs from 'fs';

// Import the Node Copy module
import ncp from 'ncp';

// Import the fileURLToPath from the URL module
import { fileURLToPath } from 'url';

// Import jsdom
import { JSDOM } from 'jsdom';

// Import Archiver
import archiver from 'archiver';

// Import the Security Inc
import { clean_string, clean_html, clean_css } from '../inc/security.js';

// Import the Files Manager
import { create_dir, dir_exists, get_dirs, delete_dir, file_exists, get_files, read_file, create_file, delete_file } from "../inc/fmanager.js";

// Import the Updates class
import Updates from './updates.js';

// Templates class
export default class Templates {

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
     * Create a template
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_template(req, res) {

        // Check if template's id exists
        if ( typeof req.body.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id
        let template_id = clean_string(req.body.template_id);

        // Verify if html exists
        if ( typeof req.body.html === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The template html code is missing."
            });

            return;

        }

        // Get template html
        let template_html = clean_html(req.body.html);

        // Verify if css exists
        if ( typeof req.body.css === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The css default is missing."
            });

            return;

        } 

        // Get the css code
        let css = clean_css(req.body.css);

        // Verify if library exists
        if ( typeof req.body.library === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The css library is missing."
            });

            return;

        } 

        // Get the css library
        let library = clean_css(req.body.library);

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Get the updates directory path
        let updates_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString(), 'updates');

        // Get the template directory
        let template_exists = dir_exists(template_dir_path);

        // Check if the template directory exists
        if ( template_exists ) {

            // Return error response
            res.json({
                success: false,
                message: "The template was already created."
            });

            return;

        }

        // Create a template directory
        let create_template = create_dir(template_dir_path);

        // Verify if the template directory was created
        if ( !create_template.success ) {

            // Return error response
            res.json({
                success: false,
                message: "The template directory was not created successfully."
            });

            return;

        }

        // Create the html object
        let new_html = {
            content: template_html
        }

        // Turn object to json
        let html_json = JSON.stringify(new_html, null, 4);

        // Create a updates directory
        let create_updates = create_dir(updates_dir_path);

        // Verify if the updates directory was created
        if ( !create_updates.success ) {

            // Delete the template
            delete_dir(template_dir_path);

            // Return error response
            res.json({
                success: false,
                message: "The updates directory was not created successfully."
            });

        }

        // Update directory path
        let update_dir = path.join(updates_dir_path, parseInt((Date.now() / 1000)).toString());

        // Create the update directory
        let new_directory = create_dir(update_dir);

        // Verify if the update directory was created
        if ( !new_directory.success ) {

            // Delete the template
            delete_dir(template_dir_path);

            // Return error response
            res.json({
                success: false,
                message: new_directory.message
            });

            return;

        }                

        // Save html update
        let html_update = create_file(path.join(update_dir, 'html.json'), html_json);

        // Verify if the html update was created
        if ( !html_update.success ) {

            // Delete the template
            delete_dir(template_dir_path);

            // Return error response
            res.json({
                success: false,
                message: html_update.message
            });

            return;

        }

        // Create the css object for css code
        let css_file = {
            content: css.replaceAll('&amp;', '&').replaceAll('&gt;', '>')
        }

        // Turn object to json
        let css_file_json = JSON.stringify(css_file, null, 4);

        // Save css update
        let create_css_file = create_file(path.join(update_dir, 'css.json'), css_file_json);
        
        // Verify if the css update was created
        if ( !create_css_file.success ) {

            // Delete the directory
            delete_dir(update_dir);

            // Return error response
            res.json({
                success: false,
                message: create_css_file.message
            });

            return;

        }

        // Create the css object for library
        let css_library = {
            content: library
        }

        // Turn object to json
        let css_library_json = JSON.stringify(css_library, null, 4);

        // Save css update
        let create_css_library = create_file(path.join(template_dir_path, 'library.json'), css_library_json);
        
        // Verify if the css update was created
        if ( !create_css_library.success ) {

            // Delete the directory
            delete_dir(update_dir);

            // Return error response
            res.json({
                success: false,
                message: create_css_library.message
            });

            return;

        }

        // Create the template object
        let new_template = {
            name: 'Template',
            created: parseInt((Date.now() / 1000))
        }

        // Turn object to json
        let template_json = JSON.stringify(new_template, null, 4);

        // Create the template json file
        let create_template_main = create_file(path.join(template_dir_path, 'template.json'), template_json);

        // Verify if the template json file was created
        if ( !create_template_main.success ) {

            // Delete the template
            delete_dir(template_dir_path);

            // Return error response
            res.json({
                success: false,
                message: "The html.json was not created successfully."
            });

            return;

        }

        // Return success response
        res.json({
            success: true,
            message: "The template was created successfully."
        });

    }

    /**
     * Clone a template
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    clone_template(req, res) {

        // Check if template's id exists
        if ( typeof req.body.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id
        let template_id = clean_string(req.body.template_id);

        // Check if template's type exists
        if ( typeof req.body.type === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template type is not valid.'
            });

            return;

        }

        // Get type
        let type = clean_string(req.body.type);

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', type, template_id.toString());

        // Get the template directory
        let template_exists = dir_exists(template_dir_path);

        // Check if the template directory exists
        if ( !template_exists ) {

            // Return error response
            res.json({
                success: false,
                message: "The template was not found."
            });

            return;

        }

        // Create a new template id
        let new_template_id = template_id.substring(0, 2) + Date.now().toString();

        // Get the template directory path
        let new_template_dir_path = path.join(this.__dirname, 'templates', 'personal', new_template_id);

        // Copy the template directory
        ncp(template_dir_path, new_template_dir_path, (error) => {

            // Verify if has been occurred an error
            if (error) {
                
                // Return error response
                res.json({
                    success: false,
                    message: error.message
                });

            } else {

                // Create a cover
                new Updates().create_cover(new_template_id);
                
                // Return success response
                res.json({
                    success: true,
                    template_id: new_template_id
                });

            }
            
        });

    }

    /**
     * Update a template's name
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    update_template_name(req, res) {
        
        // Check if template's id exists
        if ( typeof req.body.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id
        let template_id = clean_string(req.body.template_id);

        // Check if template's name exists
        if ( typeof req.body.template_name === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template name is not valid.'
            });

            return;

        }

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Verify if dir exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.',
            });

            return;
            
        }

        // Get template name
        let template_name = clean_string(req.body.template_name); 
        
        // Verify if template name is too short
        if ( !template_name ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template name is too short.'
            });

            return;
            
        }

        // Get the template file
        let get_template_file = read_file(path.join(template_dir_path, 'template.json'));

        // Verify if the template.json is readable
        if ( !get_template_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template.json file was not found.',
            });

            return;            

        }

        // Parse the json response
        let json_data = JSON.parse(get_template_file.data);

        // Update the template's name
        json_data.name = template_name;

        // Save template update
        let template_update = create_file(path.join(template_dir_path, 'template.json'), JSON.stringify(json_data, null, 4));

        // Verify if the template.json was updated
        if ( template_update.success ) {

            // Return success response
            res.json({
                success: true
            });

        } else {

            // Return error response
            res.json({
                success: false,
                message: 'The template.json file was not updated.',
            });

        }

    }

    /**
     * Get my templates
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    my_templates(req, res) {

        // Templates path
        let templates_path = path.join(this.__dirname, 'templates', 'personal');

        // Get the templates
        let templates = get_dirs(templates_path, {order: 'DATE_DESC'});

        // Verify if templates exists
        if ( templates.success ) {

            // All templates container
            let all_templates = [];

            // List the templates
            for ( let template of templates.dirs ) {

                // Get the template's information
                let template_info = read_file(path.join(this.__dirname, 'templates', 'personal', template.directory, 'template.json'));
                
                // Check if template can be read
                if ( template_info.success ) {

                    // Parse json
                    let parse_json = JSON.parse(template_info.data);

                    // Add template to the container
                    all_templates.push({
                        template_id: template.directory,
                        name: parse_json.name,
                        cover: file_exists(path.join('public', 'share', 'template-' + template.directory + '.png'))?true:false
                    });

                }

            }

            // Verify if templates exists
            if ( all_templates.length > 0 ) {

                // Return success response
                res.json({
                    success: true,
                    templates: all_templates
                });
                return;

            }

        }

        // Return error response
        res.json({
            success: false,
            message: "No templates were found."
        });

    }

    /**
     * Get templates
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_templates(req, res) {

        // Default type
        let type = 'default';

        // Verify if type exists in the query
        if ( typeof req.query.type === 'string' ) {

            // Set type
            type = clean_string(req.query.type);

        }

        // Templates path
        let templates_path = path.join(this.__dirname, 'templates', type);

        // Get the templates
        let templates = get_dirs(templates_path, {order: 'DATE_DESC'});

        // Verify if templates exists
        if ( templates.success ) {

            // All templates container
            let all_templates = [];

            // List the templates
            for ( let template of templates.dirs ) {

                // Get the template's information
                let template_info = read_file(path.join(this.__dirname, 'templates', type, template.directory, 'template.json'));
                
                // Check if template can be read
                if ( template_info.success ) {

                    // Parse json
                    let parse_json = JSON.parse(template_info.data);

                    // Add template to the container
                    all_templates.push({
                        template_id: template.directory,
                        name: parse_json.name,
                        cover: file_exists(path.join('public', 'share', 'template-' + template.directory + '.png'))?true:false
                    });

                }

            }

            // Verify if templates exists
            if ( all_templates.length > 0 ) {

                // Return success response
                res.json({
                    success: true,
                    templates: all_templates
                });
                return;

            }

        }

        // Return error response
        res.json({
            success: false,
            message: "No templates were found."
        });

    }

    /**
     * Download a template
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    download_template(req, res) {

        // Check if template's id exists
        if ( typeof req.body.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id from the request
        let template_id = clean_string(req.body.template_id);

        // Check if format exists
        if ( typeof req.body.format === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The format is not valid.'
            });

            return;

        }

        // Get format from the request
        let format = clean_string(req.body.format);

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
                    css += css_file_json.content.replaceAll('&amp;', '&').replaceAll('&gt;', '>').replaceAll('&gt;', '>').replaceAll(`    `, `                `);

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

        // Generate unique file's name
        let unique_name = Date.now() + '.html';

        // Create a HTML file
        create_file(path.join('public/share', unique_name), html);

        // Check if file was created
        if ( !file_exists(path.join('public/share', unique_name)) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The html file was not created successfully.'
            });

            return;
            
        }

        // Set a pause
        setTimeout(() => {

            delete_file(path.join('public/share', unique_name));

        }, 2000);

        // Set the output file
        let new_zip = fs.createWriteStream('public/share/' + unique_name + '.zip');

        // Init the Archive class
        let archive = archiver('zip', { zlib: { level: 9 } });
      
        // Register the close event catcher
        new_zip.on('close', () => {

            // Return success response
            res.json({
                success: true,
                message: "The template was created successfully.",
                zip: 'public/share/' + unique_name + '.zip'
            });   
        
            // Set a pause
            setTimeout(() => {

                delete_file('public/share/' + unique_name + '.zip');

            }, 2000);

        });
      
        // Register the error event catcher
        archive.on('error', (error) => {

            // Return error response
            res.json({
                success: false,
                message: error.message
            });

        });
      
        // Set the zip file stream
        archive.pipe(new_zip);

        // Create the zip
        archive.file(path.join('public/share', unique_name), { name: unique_name });
      
        // End
        archive.finalize();

    }

    /**
     * Delete a template
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    delete_template(req, res) {

        // Check if template's id exists
        if ( typeof req.body.template_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get template id from the request
        let template_id = clean_string(req.body.template_id);

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Check if the template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Delete the template
        delete_dir(template_dir_path);

        // Check if the template exists
        if ( dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not deleted successfully.'
            });
            
        } else {

            // Verify if the template has a cover
            if ( file_exists(path.join('public', 'share', 'template-' + template_id.toString() + '.png')) ) {

                // Delete the template's cover
                delete_file(path.join('public', 'share', 'template-' + template_id.toString() + '.png'));

            }

            // Return success response
            res.json({
                success: true,
                message: 'The template was deleted successfully.'
            });

        }

    }
    
}