// Import the fs module
import fs from 'fs';

// Import the https module
import https from 'https';

// Import the Database methods
import Db from './db.js';

// Import the Files Manager
import { file_exists } from '../inc/fmanager.js';

// Import the Security Inc
import { clean_string } from '../inc/security.js';

// Image class
export default class Icons {

    /**
     * Get the icons
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    async get_icons(req, res) {

        // Limit
        let limit = 10;

        // Get the page
        let page = !isNaN(req.body.page)?((req.body.page - 1) * limit):0;

        // Get the search words
        let search = req.body.search?clean_string(req.body.search):'social';

        // Create the parameters
        let request_params = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.ICONFINDER_TOKEN,
                'accept': 'application/json'
            }
        };

        // Make the fetch request
        let response = await fetch(`https://api.iconfinder.com/v4/icons/search?query=${search}&count=${limit}&offset=${page}`, request_params);

        // Verify if an error has been occurred
        if ( !response.ok ) {

            // Return error response
            res.json({
                success: false,
                message: "No icons were found."
            });
            
            return;

        }

        // Process the response
        let data = await response.json();

        // Verify if icons exists
        if ( data.total_count < 1 ) {

            // Return error response
            res.json({
                success: false,
                message: "No icons were found."
            });
            
            return;
            
        }

        // Icons list container
        let icons = [];

        // List the icons
        for ( let icon of data.icons ) {

            // Sizes container
            let sizes = [];

            // Cover
            let cover = '';

            // List raster sizes
            for ( let raster of icon.raster_sizes ) {

                // Verify if formats key exists exists
                if ( typeof raster.formats !== 'undefined' ) {

                    // Set preview url as cover
                    cover = raster.formats[0].preview_url;

                }

                // Add size to the container
                sizes.push({
                    size: raster.size
                });

            }

            // Add icon to the list container
            icons.push({
                icon_id: icon.icon_id,
                sizes: sizes,
                cover: cover
            });

        }

        // Return success response
        res.json({
            success: true,
            icons: icons,
            page: ((page / limit) + 1)
        });

    }

    /**
     * Get the icon
     *
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    async get_icon(req, res) {

        // Verify if icon's ID exists
        if ( typeof req.body.icon_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The icon_id parameter is missing."
            });
            
            return;

        }

        // Get the icon's ID
        let icon_id = clean_string(req.body.icon_id);

        // Verify if icon's size exists
        if ( typeof req.body.size === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The size parameter is missing."
            });
            
            return;

        }
        
        // Get the icon's size
        let icon_size = clean_string(req.body.size);

        // Create the parameters
        let request_params = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.ICONFINDER_TOKEN,
                'accept': 'application/json'
            }
        };

        // Make the fetch request
        let response = await fetch(`https://api.iconfinder.com/v4/icons/${icon_id}`, request_params);

        // Verify if an error has been occurred
        if ( !response.ok ) {

            // Return error response
            res.json({
                success: false,
                message: "The icon's was not found."
            });
            
            return;

        }

        // Process the response
        let data = await response.json();

        // Verify if icon exists
        if ( typeof data.icon_id === 'undefined' ) {

            // Return error response
            res.json({
                success: false,
                message: "The icon's was not found."
            });
            
            return;
            
        }

        // Download url container
        let download_url = '';

        // List raster sizes
        for ( let raster of data.raster_sizes ) {

            // Verify if formats key exists exists
            if ( (typeof raster.formats !== 'undefined') && (raster.size === parseInt(icon_size)) ) {

                // Set download url
                download_url = raster.formats[0].preview_url;

            }

        }

        // Verify if download url is empty
        if ( !download_url ) {

            // Return error response
            res.json({
                success: false,
                message: "The icon's size is not supported."
            });
            
            return;

        }

        // Set the icon's name
        let icon_name =  Date.now() + '-' + Math.random().toString(36).substring(2, 9) + '.png';        

        // Set the icon's path
        let icon_path = 'public/uploads/' + icon_name;

        // Icon size container
        let icon_file_size = 0;
        
        // Create the icon
        let icon = fs.createWriteStream(icon_path);
        
        // Copy icon from url
        https.get(download_url, response => {

            // Write to icon
            response.pipe(icon);

            // Fetch file stats to get file size
            fs.stat(icon_path, (error, stats) => {

                // Verify if an error has been occurred
                if (error) {
                    console.error('Error getting file size:', error);
                    return;
                }

                // Set icon file size
                icon_file_size = stats.size;

            });
            
            // Set hook for writting finish
            icon.on('finish', () => {
                icon.close();
            });

        }).on('error', err => {
            fs.unlink(icon_path);
        });

        // Verify if the icon was saved
        if ( !file_exists(icon_path) ) {

            // Create the image parameters
            let image_params = {
                user_ip: req.socket.remoteAddress,
                name: icon_name,
                thumbnail: icon_path,
                original: icon_path,
                extension: 'png',
                size: icon_file_size
            };

            // Save the image
            new Db().save_image(image_params);

            // Return success response
            res.json({
                success: true,
                message: "The icon was downloaded successfully.",
                file_name: icon_name,
                file_path: icon_path
            });

        } else {

            // Return error response
            res.json({
                success: false,
                message: "The icon was not downloaded successfully."
            });

        }

    }
    
}