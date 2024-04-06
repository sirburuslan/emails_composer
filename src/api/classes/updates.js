// Import the path module
import path from 'path';

// Import the fileURLToPath function from the url module
import { fileURLToPath } from 'url';

// Import jsdom module
import { JSDOM } from 'jsdom';

// Import the Puppeteer module
import puppeteer from 'puppeteer';

// Import the Security Inc
import { clean_string, clean_html, clean_css } from '../inc/security.js';

// Import the Files Manager
import { create_dir, get_dirs, delete_dir, dir_exists, create_file, read_file, get_files, copy_file, file_exists, delete_file } from '../inc/fmanager.js';

// Updates class
export default class Updates {

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
     * Save a update
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_update(req, res) {
        
        // Get template id
        let template_id = clean_string(req.body.template_id);

        // Check if template's id exists
        if ( !template_id ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.',
            });

            return;

        }

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Get the updates directory path
        let updates_dir_path = path.join(template_dir_path, 'updates');

        // Verify if dir exists
        if ( dir_exists(path.join(updates_dir_path, parseInt((Date.now() / 1000)).toString())) ) {

            // Return success response
            res.json({
                success: true,
                message: 'The update was created successfully.',
            });

            // Create cover
            this.create_cover(template_id);

            return;
            
        }

        // Get the body
        let body = req.body;

        // Check if the body has html
        if ( (typeof body.html !== 'undefined') && (typeof body.css === 'undefined') ) {

            // Verify if content and index exists
            if ( typeof body.html.content !== 'undefined' ) {

                // Get all update directories
                let update_dirs = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

                // Check if directories exists
                if ( typeof update_dirs.dirs === 'undefined' ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: 'The update cannot be restored.',
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
                        message: get_html_file.message
                    });

                    return;

                }

                // Define jsdom
                let jsdom;

                // Get the content
                try {

                    // Tur file content to JSON
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

                // Get all divs
                let divs = saved_body.querySelectorAll('div');

                // Verify if divs exists
                if ( (divs.length < 1) || (saved_body.querySelectorAll('.ec-composer-template').length < 1) ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: 'The saved template has no valid data.'
                    });
                    
                    return;

                }

                // Get template html
                let template_html = clean_html(req.body.html.content);
                
                // Check if structure exists
                if ( typeof body.html.structure === 'number' ) {

                    // Get all lines
                    let lines = saved_body.querySelectorAll('.ec-composer-template-content-line');

                    // Verify if lines exists
                    if ( lines.length > 0 ) {

                        // Verify if line exists
                        if ( typeof lines[(body.html.structure - 1)] !== 'undefined' ) {

                            // Add line
                            lines[(body.html.structure - 1)].outerHTML = lines[(body.html.structure - 1)].outerHTML + template_html;

                        } else {

                            // Replace all content
                            saved_body.querySelector('.ec-composer-template').outerHTML = template_html;

                        }

                    }

                } else if ( typeof body.html.index === 'number' ) {
                    
                    // Check if divs exists
                    if ( divs[0].innerHTML ) {

                        // Check if div exists
                        if ( typeof divs[(body.html.index + 1)] === 'undefined' ) {

                            // Return error response
                            res.json({
                                success: false,
                                message: 'The saved template has no valid data.'
                            });
                            
                            return;

                        }

                        // Check if template_html is empty
                        if ( template_html ) {

                            // Replace the div value
                            divs[(body.html.index + 1)].innerHTML = template_html;

                        } else {

                            // Replace the div value
                            divs[(body.html.index + 1)].closest('.ec-composer-template-content-line').outerHTML = '';
                            
                        }

                    } else {

                        // Set template html
                        divs[0].innerHTML = `<div class="ec-composer-template-content-line">
                            <table class="ec-composer-template-content">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table class="ec-composer-template-row">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div class="ec-composer-template-cell">${template_html}</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>`;

                    }

                }
                
                // Check if template exists
                if ( saved_body.querySelector('.ec-composer-template') ) {

                    // Create the html object
                    let new_html = {
                        content: saved_body.querySelector('.ec-composer-template').outerHTML
                    }

                    // Turn object to json
                    let html_json = JSON.stringify(new_html, null, 4);
                    
                    // Update directory path
                    let update_dir = path.join(updates_dir_path, parseInt((Date.now() / 1000)).toString());

                    // Create the update directory
                    let new_directory = create_dir(update_dir);

                    // Verify if the update directory was created
                    if ( !new_directory.success ) {

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

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: html_update.message
                        });

                        return;

                    }

                    // Verify if the old css file exists
                    if ( file_exists(path.join(updates_dir_path, content_dir_path, 'css.json')) )  {

                        // Copy the css file
                        if ( !copy_file(path.join(updates_dir_path, content_dir_path, 'css.json'), path.join(update_dir, 'css.json')) ) {

                            // Delete the directory
                            delete_dir(update_dir);

                            // Return error response
                            res.json({
                                success: false,
                                message: 'The css file was not copied successfully.'
                            });

                            return;

                        }

                    } else {

                        // Create the css object
                        let css_file = {
                            content: ''
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

                    }

                    // Elements directory path
                    let elements_dir = path.join(update_dir, 'elements');

                    // Create the elements directory
                    let new_elements_dir = create_dir(elements_dir);

                    // Verify if the elements directory was created
                    if ( !new_elements_dir.success ) {

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: new_elements_dir.message
                        });

                        return;

                    }

                    // Copy CSS elements errors counter
                    let copy_css_errors = 0;        

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

                                // Copy the file
                                if ( !copy_file(path.join(css_elements_path, file), path.join(update_dir, 'elements', file)) ) {

                                    // Save error
                                    copy_css_errors++;

                                }

                            }

                        }

                    }

                    // Verify if an error has been occurred
                    if ( copy_css_errors > 0 ) {

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: 'The css elements were not copied successfully.',
                        });

                        return;

                    }

                }
                
                // Return success response
                res.json({
                    success: true,
                    message: 'The update was created successfully.',
                });

                // Create cover
                this.create_cover(template_id);

                return;

            }

        } else if ( typeof req.body.css !== 'undefined' ) {

            // Get all update directories
            let update_dirs = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

            // Check if directories exists
            if ( typeof update_dirs.dirs === 'undefined' ) {

                // Return error response
                res.json({
                    success: false,
                    message: 'The update cannot be restored.',
                });

                return;

            }

            // Set content dir path
            let content_dir_path = update_dirs.dirs[0].directory;

            // Update directory path
            let update_dir = path.join(updates_dir_path, parseInt((Date.now() / 1000)).toString());

            // Create the update directory
            let new_directory = create_dir(update_dir);

            // Verify if the update directory was created
            if ( !new_directory.success ) {

                // Return error response
                res.json({
                    success: false,
                    message: new_directory.message
                });

                return;

            }

            // Copy the html file
            if ( !copy_file(path.join(updates_dir_path, content_dir_path, 'html.json'), path.join(update_dir, 'html.json')) ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: 'The html file was not copied successfully.'
                });

                return;

            }

            // Elements directory path
            let elements_dir = path.join(update_dir, 'elements');

            // Create the elements directory
            let new_elements_dir = create_dir(elements_dir);

            // Verify if the elements directory was created
            if ( !new_elements_dir.success ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: new_elements_dir.message
                });

                return;

            }

            // Verify if the old css file exists
            if ( file_exists(path.join(updates_dir_path, content_dir_path, 'css.json')) )  {

                // Copy the css file
                if ( !copy_file(path.join(updates_dir_path, content_dir_path, 'css.json'), path.join(update_dir, 'css.json')) ) {

                    // Delete the directory
                    delete_dir(update_dir);

                    // Return error response
                    res.json({
                        success: false,
                        message: 'The css file was not copied successfully.'
                    });

                    return;

                }

            } else {

                // Create the css object
                let css_file = {
                    content: ''
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

            }

            // Copy CSS elements errors counter
            let copy_css_errors = 0;        

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

                        // Copy the file
                        if ( !copy_file(path.join(css_elements_path, file), path.join(update_dir, 'elements', file)) ) {

                            // Save error
                            copy_css_errors++;

                        }

                    }

                }

            }

            // Verify if an error has been occurred
            if ( copy_css_errors > 0 ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: 'The css elements were not copied successfully.',
                });

                return;

            }

            // Verify if the content exists
            if ( typeof req.body.css.elements !== 'undefined' ) {

                // Verify if html parameter exists
                if ( (typeof req.body.html !== 'undefined') && (typeof req.body.html.content !== 'undefined') ) {

                    // Get template html
                    let template_html = clean_html(req.body.html.content);
                    
                    // Delete the html file
                    if ( !delete_file(path.join(update_dir, 'html.json')) ) {

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: 'The html.json file was not deleted successfully.',
                        });

                        return;

                    }

                    // Create the html object
                    let new_html = {
                        content: template_html
                    }

                    // Turn object to json
                    let html_json = JSON.stringify(new_html, null, 4);            

                    // Save html update
                    let html_update = create_file(path.join(update_dir, 'html.json'), html_json);

                    // Verify if the html update was created
                    if ( !html_update.success ) {

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: html_update.message
                        });

                        return;

                    }

                }

                // Verify if the html file exists
                if ( !file_exists(path.join(update_dir, 'html.json')) ) {

                    // Get template html
                    let template_html = clean_html(req.body.html.content);

                    // Create the html object
                    let new_html = {
                        content: template_html
                    }

                    // Turn object to json
                    let html_json = JSON.stringify(new_html, null, 4);            

                    // Save html update
                    let html_update = create_file(path.join(update_dir, 'html.json'), html_json);

                    // Verify if the html update was created
                    if ( !html_update.success ) {

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: html_update.message
                        });

                        return;

                    }

                }

                // Get the elements
                let elements = Object.keys(clean_string(req.body.css.elements));
                
                // Verify if elements exists
                if ( elements.length < 1 ) {

                    // Delete the directory
                    delete_dir(update_dir);

                    // Return error response
                    res.json({
                        success: false,
                        message: 'No elements were found.',
                    });

                    return;
                    
                }

                // Errors counter
                let copy_errors = 0;

                // List the elements
                for ( let element_id of elements ) {

                    // Create the css object
                    let new_css = {
                        content: clean_css(req.body.css.elements[element_id])
                    }

                    // Turn object to json
                    let css_json = JSON.stringify(new_css, null, 4);

                    // Save css update
                    let css_update = create_file(elements_dir + '/' + element_id + '.json', css_json);
                    
                    // Verify if the css update was created
                    if ( !css_update.success ) {

                        // Increase the errors counter
                        copy_errors++;

                        break;

                    }

                }

                // Verify if an error has been occurred
                if ( copy_errors > 0 ) {

                    // Delete the directory
                    delete_dir(update_dir);

                    // Return error response
                    res.json({
                        success: false,
                        message: 'No elements were saved.',
                    });

                    return;

                }

            } else {

                // Get template css
                let template_css = clean_css(req.body.css.content);

                // Get element id
                let element_id = clean_string(req.body.element_id);

                // Check if element id exists
                if ( element_id ) {

                    // Create the css object
                    let new_css = {
                        content: template_css
                    }

                    // Turn object to json
                    let css_json = JSON.stringify(new_css, null, 4);
                    
                    // Save css update
                    let css_update = create_file(elements_dir + '/' + element_id + '.json', css_json);
                    
                    // Verify if the css update was created
                    if ( !css_update.success ) {   

                        // Delete the directory
                        delete_dir(update_dir);

                        // Return error response
                        res.json({
                            success: false,
                            message: css_update.message
                        });

                        return;

                    }

                } else {

                    // Create the css object
                    let css_file = {
                        content: template_css
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

                }

            } 
            
            // Return success response
            res.json({
                success: true,
                message: 'The update was created successfully.',
            }); 

            // Create cover
            this.create_cover(template_id);

            return;
            
        } else if ( typeof body.template !== 'undefined' ) {

            // Get template html
            let template_html = clean_html(req.body.template.content);

            // Get the elements ids
            let elements_ids = (typeof req.body.template.elements_ids !== 'undefined')?clean_string(req.body.template.elements_ids):[];

            // Get all update directories
            let update_dirs = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

            // Check if directories exists
            if ( typeof update_dirs.dirs === 'undefined' ) {

                // Return error response
                res.json({
                    success: false,
                    message: 'The update was not found.',
                });

                return;

            }

            // Set content dir path
            let content_dir_path = update_dirs.dirs[0].directory;

            // Update directory path
            let update_dir = path.join(updates_dir_path, parseInt((Date.now() / 1000)).toString());

            // Create the update directory
            let new_directory = create_dir(update_dir);

            // Verify if the update directory was created
            if ( !new_directory.success ) {

                // Return error response
                res.json({
                    success: false,
                    message: new_directory.message
                });

                return;

            }

            // Elements directory path
            let elements_dir = path.join(update_dir, 'elements');

            // Create the elements directory
            let new_elements_dir = create_dir(elements_dir);

            // Verify if the elements directory was created
            if ( !new_elements_dir.success ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: new_elements_dir.message
                });

                return;

            }

            // Verify if the old css file exists
            if ( file_exists(path.join(updates_dir_path, content_dir_path, 'css.json')) )  {

                // Copy the css file
                if ( !copy_file(path.join(updates_dir_path, content_dir_path, 'css.json'), path.join(update_dir, 'css.json')) ) {

                    // Delete the directory
                    delete_dir(update_dir);

                    // Return error response
                    res.json({
                        success: false,
                        message: 'The css file was not copied successfully.'
                    });

                    return;

                }

            } else {

                // Create the css object
                let css_file = {
                    content: ''
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

            }

            // Copy CSS elements errors counter
            let copy_css_errors = 0;        

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

                        // Verify if the element is not used moreB
                        if ( !elements_ids.includes(file.replace('.json', '')) ) {
                            continue;
                        }

                        // Copy the file
                        if ( !copy_file(path.join(css_elements_path, file), path.join(update_dir, 'elements', file)) ) {

                            // Save error
                            copy_css_errors++;

                        }

                    }

                }

            }

            // Verify if an error has been occurred
            if ( copy_css_errors > 0 ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: 'The css elements were not copied successfully.',
                });

                return;

            }

            // Create the html object
            let new_html = {
                content: template_html
            }

            // Turn object to json
            let html_json = JSON.stringify(new_html, null, 4);            

            // Save html update
            let html_update = create_file(path.join(update_dir, 'html.json'), html_json);

            // Verify if the html update was created
            if ( !html_update.success ) {

                // Delete the directory
                delete_dir(update_dir);

                // Return error response
                res.json({
                    success: false,
                    message: html_update.message
                });

                return;

            }

            // Return success response
            res.json({
                success: true,
                message: 'The update was created successfully.',
            }); 

            // Create cover
            this.create_cover(template_id);

            return;

        }

        // Return error response
        res.json({
            success: false,
            message: 'The update was not created successfully.',
        });

    }

    /**
     * Create cover for a template
     *
     * @param string template_id
     */
    async create_cover(template_id) {

        // Launch the Puppeteer
        let browser = await puppeteer.launch({
            headless: 'new'
        });
    
        // Create a new page
        let page = await browser.newPage();
      
        // Open the template's preview
        await page.goto('http://localhost:3000/api/get_preview/' + template_id);

        // Set screen size
        await page.setViewport({width: 1440, height: 1024});
        
        // Create the screenshot
        await page.screenshot({path: path.join('public', 'share', 'template-' + template_id.toString() + '.png')});
      
        // Close the Puppeteer session
        await browser.close();

    }
    
}