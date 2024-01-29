// Import the path module
import path from 'path';

// Import the fs module
import fs from 'fs';

/**
 * Create a directory
 *
 * @param string path_dir to the directory
 * 
 * @returns object with response
 */
const create_dir = (path_dir) => {

    // Process the request
    try {

        // Create directory
        fs.mkdirSync(path_dir);

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/**
 * Get the directories
 *
 * @param string path_dir to the directory
 * @param object with parameters
 * 
 * @returns array with response
 */
const get_dirs = (path_dir, params = {}) => {

    // Process the request
    try {

        // Get the directories
        let dirs = fs.readdirSync(path_dir);

        // Verify if directories exists
        if ( dirs.length > 0 ) {

            // Check if params has options
            if ( typeof params.order === 'string' ) {

                // Verify if order is DATE_DESC
                if ( params.order === 'DATE_DESC' ) {
                
                    // Get the directories with information
                    let directories_info = dirs.map(directory => {

                        // Create the individual file path
                        let directory_path = path.join(path_dir, directory);

                        // Get new directory information
                        let stats = fs.statSync(directory_path);

                        // Return object with directory details
                        return {
                            directory,
                            date: stats.mtime
                        };

                    });
                
                    // Sort directories by date in descending order
                    dirs = directories_info.sort((a, b) => b.date - a.date);

                }

            }

        }

        return {
            success: true,
            dirs: dirs
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/**
 * Check if a directory exists
 *
 * @param string path_dir to the directory
 * 
 * @returns boolean with response
 */
const dir_exists = (path_dir) => {

    // Process the request
    try {

        return fs.readdirSync(path_dir)?true:false;

    } catch (error) {

        return false;

    }

}

/**
 * Check if a directory is empty
 *
 * @param string path_dir to the directory
 * 
 * @returns boolean with response
 */
const is_dir_empty = (path_dir) => {

    // Process the request
    try {

        // Empty
        let empty = 0;

        // Check if the files exists
        fs.readdirSync(path_dir, (error, files) => {

            // Check if files exists
            if ( files.length > 0 ) {
                empty++;
            }

        });

        return empty?false:true;

    } catch (error) {

        return false;

    }

}

/**
 * Try to delete a directory
 *
 * @param string path_dir contains the path for the directory
 */
const delete_dir = (path_dir) => {

    // Check if directory exists
    if (fs.existsSync(path_dir)) {

        // Get the files
        let files = fs.readdirSync(path_dir);
    
        // List all files
        files.forEach(file => {

            // Create the file path
            let path_file = path.join(path_dir, file);

            // Verify if the file is a directory
            if (fs.statSync(path_file).isDirectory()) {

                // Recursively delete subdirectories
                delete_dir(path_file);

            } else {

                // Delete file
                fs.unlinkSync(path_file);

            }

        });
    
        // Delete the empty directory
        fs.rmdirSync(path_dir);
    }

}

/**
 * Create or update a file
 *
 * @param string path_file to the file
 * @param string data
 * 
 * @returns object with response
 */
const create_file = (path_file, data) => {

    // Process the request
    try {

        // Save the data
        fs.writeFileSync(path_file, data, 'utf8');

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/**
 * Read a file
 *
 * @param string path_file to the file
 * 
 * @returns object with response
 */
const read_file = (path_file) => {

    // Process the request
    try {

        // Get the data
        let get_data = fs.readFileSync(path_file, 'utf8');

        return {
            success: true,
            data: get_data
        };

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/**
 * Get the files from a directory
 *
 * @param string path_dir to the directory
 * 
 * @returns array with response
 */
const get_files = (path_dir) => {

    // Process the request
    try {

        // Get the files
        let files = fs.readdirSync(path_dir);

        // Check if files exists
        if ( files.length > 0 ) {

            return {
                success: true,
                files: files
            };

        } else {

            return {
                success: false,
                message: 'No files were found.'
            };
            
        }

    } catch (error) {

        return {
            success: false,
            message: error.message
        };

    }

}

/**
 * Checks if a file exists
 *
 * @param string path_file to the file
 * 
 * @returns boolean with response
 */
const file_exists = (path_file) => {

    // Process the request
    try {

        return fs.existsSync(path_file);

    } catch (error) {

        return false;

    }

}

/**
 * Copy a file
 *
 * @param string path_file_source
 * @param string path_file_destination
 * 
 *@returns boolean
 */
const copy_file = (path_file_source, path_file_destination) => {
    
    // Process the request
    try {

        // Get the data
        let get_data = fs.readFileSync(path_file_source, 'utf8');

        // Save data
        fs.writeFileSync(path_file_destination, get_data);

        return true;

    } catch (error) {

        return false;

    }

}

/**
 * Rename a file
 *
 * @param string path_file_old
 * @param string path_file_new
 * 
 *@returns boolean
 */
 const rename_file = (path_file_old, path_file_new) => {
    
    // Process the request
    try {

        // Rename the file
        fs.rename(path_file_old, path_file_new, (error) => {
            
            // Verify if error exists
            if ( error ) {
                return false;
            }

        });

        return true;

    } catch (error) {

        return false;

    }

}

/**
 * Delete a file
 *
 * @param string path_file
 * 
 *@returns boolean
 */
 const delete_file = (path_file) => {
    
    // Process the request
    try {

        // Delete the file
        fs.unlink(path_file, (error) => {
            
            // Verify if error exists
            if ( error ) {
                return false;
            }

        });

        return true;

    } catch (error) {

        return false;

    }

}

// Export the functions
export {
    create_dir,
    get_dirs,
    dir_exists,
    is_dir_empty,
    delete_dir,
    create_file,
    read_file,
    get_files,
    file_exists,
    copy_file,
    rename_file,
    delete_file
}