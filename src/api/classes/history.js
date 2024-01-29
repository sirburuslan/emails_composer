// Import the path module
import path from 'path';

// Import the fileURLToPath function from the url module
import { fileURLToPath } from 'url';

// Import the Security Inc
import { clean_string } from '../inc/security.js';

// Import the Files Manager
import { get_dirs, dir_exists, create_dir, delete_dir, create_file, read_file, copy_file, get_files } from "../inc/fmanager.js";

// History class
export default class History {

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
     * Get history all with limited number of updates by day
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_all(req, res) {

        // Get template's id
        let template_id = clean_string(req.params.template_id);

        // Check if template id exists
        if ( !template_id ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get the limit
        let limit = (typeof req.params.limit === 'string')?(parseInt(req.params.limit) + 1):11;

        // Get the page
        let page = (typeof req.params.page === 'string')?((parseInt(req.params.page) - 1) * (limit - 1)):0;

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Verify if template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Get the updates directory path
        let updates_dir_path = path.join(template_dir_path, 'updates');

        // Get the update records
        let updates = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

        // Check if success is false
        if ( !updates.success ) {

            // Return error response
            res.json({
                success: false,
                message: "The updates directory is empty."
            });

            return;

        }

        // Dates
        let dates = {};

        // Counter for required days
        let c = 0;

        // Iterate through timestamps and group them by formatted date
        for ( let timestamp of updates.dirs ) {

            // Convert timestamps to milliseconds
            let milliseconds = new Date(parseInt(timestamp.directory) * 1000);

            // Get year
            let year = milliseconds.getFullYear();

            // Get month
            let month = String(milliseconds.getMonth() + 1).padStart(2, '0');

            // Get day
            let day = String(milliseconds.getDate()).padStart(2, '0');

            // Verify if date exists
            if (!dates[`${year}-${month}-${day}`]) {

                // Check if the counter is less than page
                if ( page > c ) {

                    // Increase counter
                    c++;

                    continue;

                }

                // Verify if dates has reached the limit
                if ( Object.keys(dates).length >= limit ) {
                    break;
                }

                // Create new array
                dates[`${year}-${month}-${day}`] = [];

                // Save the timestamp
                dates[`${year}-${month}-${day}`].push(parseInt(timestamp.directory));

            } else {

                // Check if date has 5 times
                if ( dates[`${year}-${month}-${day}`].length > 4 ) {
                    continue;
                }

                // Save the timestamp
                dates[`${year}-${month}-${day}`].push(parseInt(timestamp.directory));
                
            }

        };

        // Return success response
        res.json({
            success: true,
            data: Object.entries(dates)
        });

    }

    /**
     * Get history updates by date
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_by_date(req, res) {

        // Get template's id
        let template_id = clean_string(req.params.template_id);

        // Check if template id exists
        if ( !template_id ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Verify if template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Verify if the date is not valid
        if (typeof req.params.date !== 'string') {

            // Return error response
            res.json({
                success: false,
                message: 'The date parameter is not valid.'
            });

            return;            

        }

        // Get the date
        let date = req.params.date;

        // Get the page
        let page = (typeof req.params.page === 'string')?parseInt(req.params.page):0;        

        // Get the limit
        let limit = (typeof req.params.limit === 'string')?(parseInt(req.params.limit) + 1):5;

        // Received date
        let rdate = new Date(date * 1000);

        // Create year
        let ryear = rdate.getFullYear();

        // Create month
        let rmonth = (rdate.getMonth() + 1).toString().padStart(2, '0');

        // Create date
        let rday = rdate.getDate().toString().padStart(2, '0');

        // Get the updates directory path
        let updates_dir_path = path.join(template_dir_path, 'updates');
        
        // Get the update records
        let updates = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

        // Check if success is false
        if ( !updates.success ) {

            // Return error response
            res.json({
                success: false,
                message: "The updates directory is empty."
            });

            return;

        }

        // Dates
        let dates = [];

        // Counter for required days
        let c = 0;

        // Iterate through timestamps and group them by formatted date
        for ( let timestamp of updates.dirs ) {

            // Convert timestamps to milliseconds
            let milliseconds = new Date(parseInt(timestamp.directory) * 1000);

            // Get year
            let year = milliseconds.getFullYear();

            // Get month
            let month = String(milliseconds.getMonth() + 1).padStart(2, '0');

            // Get day
            let day = String(milliseconds.getDate()).padStart(2, '0');

            // Check if is the received date
            if ( (ryear === year) && (rmonth === month) && (rday === day) ) {

                // Verify if page is greater than counter
                if ( page === c ) {

                    // Add date to the list
                    dates.push(parseInt(timestamp.directory));

                    // Check if dates were reached the limit
                    if ( dates.length === limit ) {
                        break;
                    }

                } else {

                    // Increase the counter
                    c++;

                }

            }

        };

        // Return success response
        res.json({
            success: true,
            data: dates
        });

    }

    /**
     * Get last history record
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_recent(req, res) {

        // Get template's id
        let template_id = clean_string(req.params.template_id);

        // Check if template id exists
        if ( !template_id ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Verify if template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Get the updates directory path
        let updates_dir_path = path.join(template_dir_path, 'updates');

        // Get the update records
        let update_dirs = get_dirs(updates_dir_path, {order: 'DATE_DESC'});

        // Check if success is false
        if ( !update_dirs.success ) {

            // Return error response
            res.json({
                success: false,
                message: "The updates directory is empty."
            });

            return;

        }

        // Verify if at least one directory exists
        if ( update_dirs.dirs.length < 1 ) {

            // Return success response
            res.json({
                success: true,
                data: {
                    html: '<div class="ec-composer-template"></div>'
                }
            });

            return;

        }

        // Last directory
        let content_dir_path = update_dirs.dirs[0].directory;

        // Get the html file
        let get_html_file = read_file(path.join(updates_dir_path, content_dir_path, 'html.json'));

        // Check if the html file exists
        if ( !get_html_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: get_html_file.message
            });

            return;  

        }

        // Get the css file
        let get_css_file = read_file(path.join(updates_dir_path, content_dir_path, 'css.json'));

        // Check if the css file exists
        if ( !get_css_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: get_css_file.message
            });

            return;  

        }

        // Parse html from the readed file
        let html = JSON.parse(get_html_file.data);

        // Parse css from the readed file
        let css = JSON.parse(get_css_file.data);        

        // Create the data to send as response
        let data = {
            name: '',
            html: html.content,
            css: {
                content: css.content
            }
        };

        // Set elements dir path
        let css_elements_path = path.join(updates_dir_path, content_dir_path, 'elements');

        // Get the css elements
        let elements = this.get_css_elements(css_elements_path);

        // Verify if elements exists
        if ( elements.length > 0 ) {

            // Set elements
            data.css.elements = elements;

        }

        // Get the template file
        let get_template_file = read_file(path.join(template_dir_path, 'template.json'));

        // Verify if the template.json is readable
        if ( get_template_file.success ) {

            // Parse the json response
            let json_data = JSON.parse(get_template_file.data);
            
            // Replace the template's name
            data.name = json_data.name;

        }

        // Return success response
        res.json({
            success: true,
            data: data
        });

    }

    /**
     * Restore history record
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    restore_history_record(req, res) {

        // Get template's id
        let template_id = clean_string(req.params.template_id);

        // Check if template id exists
        if ( !template_id ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template id is not valid.'
            });

            return;

        }

        // Get the template directory path
        let template_dir_path = path.join(this.__dirname, 'templates', 'personal', template_id.toString());

        // Verify if template exists
        if ( !dir_exists(template_dir_path) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The template was not found.'
            });

            return;
            
        }

        // Verify if the time is not valid
        if (typeof req.params.time !== 'string') {

            // Return error response
            res.json({
                success: false,
                message: 'The time parameter is not valid.'
            });

            return;            

        }

        // Get the time
        let time = req.params.time;

        // Get the update directory path
        let update_dir_path = path.join(template_dir_path, 'updates', time);

        // Get the html file
        let get_html_file = read_file(path.join(update_dir_path, 'html.json'));

        // Check if the html file exists
        if ( !get_html_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: get_html_file.message
            });

            return;  

        }

        // Get the css file
        let get_css_file = read_file(path.join(update_dir_path, 'css.json'));

        // Check if the css file exists
        if ( !get_css_file.success ) {

            // Return error response
            res.json({
                success: false,
                message: get_css_file.message
            });

            return;  

        }

        // Update directory path
        let update_dir = path.join(template_dir_path, 'updates', parseInt((Date.now() / 1000)).toString());

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
        let html_update = create_file(path.join(update_dir, 'html.json'), get_html_file.data);
        
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

        // Save css update
        let css_update = create_file(path.join(update_dir, 'css.json'), get_css_file.data);
        
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

        // Parse css from the readed file
        let css = JSON.parse(get_css_file.data);

        // Set elements dir path
        let css_elements_path = path.join(update_dir_path, 'elements');
  
        // Check if the elements directory exists
        if ( dir_exists(css_elements_path) ) {

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
            success: true
        });

    }

    /**
     * Get the css elements
     *
     * @param string css_elements_path
     * 
     * @returns array with elements
     */
    get_css_elements(css_elements_path) {

        // CSS styles list
        let css_styles_list = [];        
        
        // Check if elements dir exists
        if ( dir_exists(css_elements_path) ) {

            // Get all css files
            let css_elements_files = get_files(css_elements_path);
            
            // Check if files exists
            if ( css_elements_files.success ) {

                // List the files
                for ( let file of css_elements_files.files ) {

                    // Get the css file
                    let get_css_file = read_file(path.join(css_elements_path, file));

                    // Check if the css file exists
                    if ( !get_css_file.success ) {
                        continue;
                    }

                    // Parse css from the readed file
                    let css = JSON.parse(get_css_file.data);

                    // Get file info
                    let file_info = path.parse(file);

                    // Set style
                    css_styles_list.push({
                        element_id: file_info.name,
                        content: css.content
                    });

                }

            }

        }

        return css_styles_list;

    }
    
}