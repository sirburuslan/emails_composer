// Import the Sharp module
import sharp from 'sharp';

// Import the Database methods
import Db from './db.js';

// Import the Files Manager
import { file_exists, rename_file, delete_file } from '../inc/fmanager.js';

// Import the Security Inc
import { clean_string } from '../inc/security.js';

// Image class
export default class Images {

    /**
     * Upload an image
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    upload_image(req, res) {

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

        // Set pause
        setTimeout(() => {

            // Create the thumbnail file name
            let thumbnail_path = 'public/uploads/' + req.file.filename + '_thumbnail.' + req.file.originalname.split('.').slice(-1)[0];

            // Create a thumbnail
            sharp('public/uploads/' + new_name)

            // Set thumbnail size
            .resize(250, 250)

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
                        file_name: clean_string(req.body.file_name)
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

        }, 1000);

    }

    /**
     * Get the images
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_images(req, res) {

        // Get the page
        let page = clean_string(req.body.page);

        // Get the search words
        let search = clean_string(req.body.search);

        // Get the images
        new Db().get_images({
            page: (page - 1),
            search: search
        })
        .then(images => {

            // Return success response
            res.json({
                success: true,
                images: images,
                page: page
            });

        })
        .catch(err => {

            // Return error response
            res.json({
                success: false,
                message: err.message
            });

        });

    }
    
}