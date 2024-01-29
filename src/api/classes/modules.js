// Import the path module
import path from 'path';

// Import the fileURLToPath function from the url module
import { fileURLToPath } from 'url';

// Import the Sharp module
import sharp from 'sharp';

// Import the Database methods
import Db from './db.js';

// Import the Security Inc
import { clean_string } from '../inc/security.js';

// Import the Files Manager
import { create_dir, delete_dir, get_dirs, file_exists, create_file, rename_file, delete_file, read_file, dir_exists } from '../inc/fmanager.js';

// Image class
export default class Modules {

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
     * Upload a cover
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    upload_module_cover(req, res) {

        // Allowed file size
        let file_size = 2000000;

        // Allowed mime types
        let mime_types = ['image/jpeg', 'image/png', 'image/gif'];

        // Verify if the file is too big
        if ( req.file.size > file_size ) {

            // Delete file
            delete_file('public/uploads/' + req.file.filename);

            // Return error response
            res.json({
                success: false,
                message: 'The file is too big.',
                file_name: clean_string(req.body.file_name)
            });

            return;

        }

        // Verify if the format is allowed
        if ( !mime_types.includes(req.file.mimetype) ) {

            // Delete file
            delete_file('public/uploads/' + req.file.filename);

            // Return error response
            res.json({
                success: false,
                message: 'The file\'s format is not supported.',
                file_name: clean_string(req.body.file_name)
            });

            return;
            
        }

        // New file name
        let new_name = req.file.filename + '.' + req.file.originalname.split('.').slice(-1)[0];

        // Try to rename the file
        if ( !rename_file('public/uploads/' + req.file.filename, 'public/uploads/' + new_name) ) {

            // Delete file
            delete_file('public/uploads/' + req.file.filename);

            // Return error response
            res.json({
                success: false,
                message: 'The file was not uploaded successfully.',
                file_name: clean_string(req.body.file_name)
            });

            return;
            
        }

        // Create the thumbnail file name
        let thumbnail_path = 'public/uploads/' + req.file.filename + '_thumbnail.' + req.file.originalname.split('.').slice(-1)[0];

        // Create a thumbnail
        sharp('public/uploads/' + new_name)

        // Set thumbnail size
        .resize(590, 300)

        // Set thumbnail path
        .toFile(thumbnail_path, (error, info) => {

            // Verify if the thumbnail has been created
            if ( file_exists(thumbnail_path) ) {

                // Create the image parameters
                let image_params = {
                    user_ip: req.socket.remoteAddress,
                    name: req.file.originalname,
                    thumbnail: thumbnail_path,
                    original: 'public/uploads/' + new_name,
                    extension: req.file.originalname.split('.').slice(-1)[0],
                    size: req.file.size
                };

                // Save the image
                new Db().save_image(image_params);

                // Return success response
                res.json({
                    success: true,
                    message: "The file was uploaded successfully.",
                    file_name: clean_string(req.body.file_name),
                    original_name: req.file.filename + '_thumbnail.' + req.file.originalname.split('.').slice(-1)[0]
                });

            } else {

                // Delete file
                delete_file('public/uploads/' + req.file.filename);

                // Return error response
                res.json({
                    success: false,
                    message: 'The file was not uploaded successfully.',
                    file_name: clean_string(req.body.file_name)
                });

            }

        });

    }

    /**
     * Create a module
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_module(req, res) {

        // Get the module
        let module = clean_string(req.body.module);

        // Verify if the module has no the required keys
        if ( typeof module.name !== 'string' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The module has no valid data.'
            });

            return;

        }

        // Verify if the module has html or css
        if ( (typeof module.html !== 'string') || !module.html || (typeof module.css !== 'string') || !module.css ) {

            // Return error response
            res.json({
                success: false,
                message: 'The module has no valid data.'
            });

            return;
            
        }

        // Category
        let category = 'uncategorized';

        // Verify if category exists
        if ( typeof module.category === 'string' ) {

            // Verify if the category is allowed
            if ( ['header', 'footer', 'social', 'buttons', 'gallery', 'uncategorized'].includes(module.category) ) {

                // Replace the category
                category = module.category;

            }

        }

        // Verify if the module cover is missing
        if ( typeof module.cover !== 'string' ) {

            // Return error response
            res.json({
                success: false,
                message: 'The module\'s cover is missing.'
            });

            return;

        } else if ( !file_exists('public/uploads/' + module.cover) ) {

            // Return error response
            res.json({
                success: false,
                message: 'The module\'s cover is missing.'
            });

            return;
            
        }

        /* GENERATE UNIQUE ID */

        // String
        let allowed = 'abcdefghijklmnopqrstuvwxyz';

        // Total characters
        let tchars = allowed.length;

        // First number
        let first_number = Math.floor(Math.random() * tchars);

        // First char
        let first_char = allowed.slice(first_number, (first_number + 1));

        // Second number
        let second_number = Math.floor(Math.random() * tchars);

        // Second char
        let second_char = allowed.slice(second_number, (second_number + 1));

        // Ready unique id
        let unique_id = first_char + second_char + Date.now();

        /* SAVE MODULE */

        // Create the module directory path
        let module_dir_path = path.join(this.__dirname, 'modules', 'personal', unique_id);

        // Create the module directory
        let new_directory = create_dir(module_dir_path);

        // Verify if the module directory was created
        if ( !new_directory.success ) {

            // Return false response
            res.json({
                success: false,
                message: 'The module\'s directory was not created successfully.',
            });

            return;

        }

        // Lets create the module's data for json file
        let module_json = {
            id: unique_id,
            user_ip: req.socket.remoteAddress,
            name: module.name,
            category: category,
            description: (typeof module.description === 'string')?module.description:'',
            cover: 'public/uploads/' + module.cover
        };

        // Save module
        let module_create = create_file(path.join(module_dir_path, 'module.json'), JSON.stringify(module_json, null, 4));
        
        // Verify if the module was created
        if ( !module_create.success ) {   

            // Delete the directory
            delete_dir(module_dir_path);

            // Return error response
            res.json({
                success: false,
                message: module_create.message
            });

            return;

        }

        // Create the html json for html code
        let html_json = {
            content: module.html
        };

        // Try to save the html code
        let html_create = create_file(path.join(module_dir_path, 'html.json'), JSON.stringify(html_json, null, 4));
        
        // Verify if the html code was created
        if ( !html_create.success ) {
            
            // Delete the module.json
            delete_file(path.join(module_dir_path, 'module.json'));

            // Delete the directory
            delete_dir(module_dir_path);

            // Return error response
            res.json({
                success: false,
                message: module_create.message
            });

            return;

        }

        // Create the css json for css code
        let css_json = {
            content: module.css
        };

        // Try to save the css code
        let css_create = create_file(path.join(module_dir_path, 'css.json'), JSON.stringify(css_json, null, 4));
        
        // Verify if the css code was created
        if ( !css_create.success ) {
            
            // Delete the module.json
            delete_file(path.join(module_dir_path, 'module.json'));

            // Delete the html.json
            delete_file(path.join(module_dir_path, 'html.json'));

            // Delete the directory
            delete_dir(module_dir_path);

            // Return error response
            res.json({
                success: false,
                message: module_create.message
            });

            return;

        }

        // Return success response
        res.json({
            success: true,
            message: "The module was created successfully."
        });

    }

    /**
     * Get the modules list
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_modules(req, res) {

        // Get the user's IP
        let user_ip = req.socket.remoteAddress;

        // Get the page
        let page = 0;

        // Verify if page exists
        if ( typeof req.body.page === 'number' ) {

            // Replace default page number
            page = (clean_string(req.body.page) - 1);

        }

        // Prepare the start for index
        let start = page * 10;

        // Get the search words
        let search = clean_string(req.body.search);

        // Modules list container
        let modules_list = [];

        // Verify if type is personal
        if ( ( typeof req.body.type === 'string' ) && (clean_string(req.body.type) === 'personal') ) {

            // Modules path
            let modules_path = path.join(this.__dirname, 'modules', 'personal');

            // Get the modules
            let modules = get_dirs(modules_path, {order: 'DATE_DESC'});

            // Verify if modules exists
            if ( modules.success ) {

                // Index's for modules
                let index = 0;

                // List the modules
                for ( let module of modules.dirs ) {

                    // Create the file path
                    let file_path = path.join(this.__dirname, 'modules', 'personal', module.directory, 'module.json');

                    // Get the file
                    let get_file = read_file(file_path);

                    // Verify if the file exists
                    if ( !get_file.success ) {
                        continue;
                    }

                    // Parse json
                    let parse_json = JSON.parse(get_file.data);

                    // Verify if the file is not of the current user
                    if ( parse_json.user_ip !== user_ip ) {
                        continue;
                    }

                    // Verify if search is not empty
                    if ( search ) {

                        // Search in the module's name
                        if ( parse_json.name.search(new RegExp(search, 'i')) < 0 ) {
                            continue;
                        }

                    }

                    // Verify index is not less than start
                    if ( index < start ) {

                        // Increase the index
                        index++;

                        continue;

                    }

                    // Add module to the list
                    modules_list.push(parse_json);

                    // Verify if there were achieved 10 modules
                    if ( modules_list.length > 9 ) {
                        break;
                    }

                }

            }
            
        } else {

            // Modules path
            let modules_path = path.join(this.__dirname, 'modules', 'default');

            // Get the modules
            let modules = get_dirs(modules_path, {order: 'DATE_DESC'});

            // Verify if modules exists
            if ( modules.success ) {

                // Default category container
                let category = ( typeof req.body.category === 'string' )?clean_string(req.body.category):'';

                // Index's for modules
                let index = 0;

                // List the modules
                for ( let module of modules.dirs ) {

                    // Create the file path
                    let file_path = path.join(this.__dirname, 'modules', 'default', module.directory, 'module.json');

                    // Get the file
                    let get_file = read_file(file_path);

                    // Verify if the file exists
                    if ( !get_file.success ) {
                        continue;
                    }

                    // Parse json
                    let parse_json = JSON.parse(get_file.data);

                    // Verify if the file is not of the current user
                    if ( parse_json.user_ip !== user_ip ) {
                        continue;
                    }

                    // Verify if category exists
                    if ( category ) {

                        // Verify if is not
                        if ( parse_json.category !== category ) {
                            continue;
                        }

                    }

                    // Verify if search is not empty
                    if ( search ) {

                        // Search in the module's name
                        if ( parse_json.name.search(new RegExp(search, 'i')) < 0 ) {
                            continue;
                        }

                    }

                    // Verify index is not less than start
                    if ( index < start ) {

                        // Increase the index
                        index++;

                        continue;

                    }

                    // Add module to the list
                    modules_list.push(parse_json);

                    // Verify if there were achieved 10 modules
                    if ( modules_list.length > 9 ) {
                        break;
                    }

                }

            }

        }

        // Verify if modules exists
        if ( modules_list.length > 0 ) {

            // Return success response
            res.json({
                success: true,
                modules: modules_list,
                page: (page + 1)
            });

        } else {

            // Return error response
            res.json({
                success: false,
                message: "No modules were found."
            });

        }

    }

    /**
     * Get a module by id
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_module(req, res) {

        // Get the module's id
        let module_id = clean_string(req.body.module_id);

        // Get the module's type
        let module_type = clean_string(req.body.module_type);  
        
        // Verify if module_type is personal
        if ( module_type === 'personal' ) {

            // Verify if the module is personal
            if ( dir_exists(path.join(this.__dirname, 'modules', 'personal', module_id)) ) {

                // Get html json
                let html = read_file(path.join(this.__dirname, 'modules', 'personal', module_id, 'html.json'));

                // Verify if the file exists
                if ( !html.success ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: "The file html.json was not found."
                    });
                    
                    return;
                    
                }

                // Get css json
                let css = read_file(path.join(this.__dirname, 'modules', 'personal', module_id, 'css.json'));

                // Verify if the file exists
                if ( !css.success ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: "The file css.json was not found."
                    });
                    
                    return;
                    
                }
                
                // Return success response
                res.json({
                    success: true,
                    html: JSON.parse(html.data).content,
                    css: JSON.parse(css.data).content
                });

            } else {

                // Return error response
                res.json({
                    success: false,
                    message: "The module was not found."
                });

            }

        } else {

            // Verify if the module is default
            if ( dir_exists(path.join(this.__dirname, 'modules', 'default', module_id)) ) {

                // Get html json
                let html = read_file(path.join(this.__dirname, 'modules', 'default', module_id, 'html.json'));

                // Verify if the file exists
                if ( !html.success ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: "The file html.json was not found."
                    });
                    
                    return;
                    
                }

                // Get css json
                let css = read_file(path.join(this.__dirname, 'modules', 'default', module_id, 'css.json'));

                // Verify if the file exists
                if ( !css.success ) {

                    // Return error response
                    res.json({
                        success: false,
                        message: "The file css.json was not found."
                    });
                    
                    return;
                    
                }
                
                // Return success response
                res.json({
                    success: true,
                    html: JSON.parse(html.data).content,
                    css: JSON.parse(css.data).content
                });

            } else {

                // Return error response
                res.json({
                    success: false,
                    message: "The module was not found."
                });

            }

        }

    }
    
}