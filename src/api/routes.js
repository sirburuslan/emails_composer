// Import classes
import Templates from "./classes/templates.js";
import Updates from "./classes/updates.js";
import History from "./classes/history.js";
import Images from "./classes/images.js";
import Icons from "./classes/icons.js";
import Modules from "./classes/modules.js";
import Ai from "./classes/ai.js";
import Preview from "./classes/preview.js";

// Reutes class
export default class Reutes {    

    /**
     * Create a template
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_template(req, res) {

        // Create a template
        new Templates().create_template(req, res);

    }

    /**
     * Clone a template
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    clone_template(req, res) {

        // Clone a template
        new Templates().clone_template(req, res);

    }

    /**
     * Update the template name
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    update_template_name(req, res) {

        // Re-name template
        new Templates().update_template_name(req, res);

    }

    /**
     * Gets my templates
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    my_templates(req, res) {

        // Gets my templates
        new Templates().my_templates(req, res);

    }

    /**
     * Gets templates
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_templates(req, res) {

        // Gets templates
        new Templates().get_templates(req, res);

    }

    /**
     * Download a template
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    download_template(req, res) {

        // Download
        new Templates().download_template(req, res);

    }

    /**
     * Delete a template
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    delete_template(req, res) {

        // Delete
        new Templates().delete_template(req, res);

    }

    /**
     * Save update
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_update(req, res) {

        // Save a update
        new Updates().create_update(req, res);

    }

    /**
     * Get history all with limited number of updates by day
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_all(req, res) {

        // Get the history updates
        new History().get_history_all(req, res);

    }

    /**
     * Get history updates by date
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_by_date(req, res) {

        // Get the history updates
        new History().get_history_by_date(req, res);

    }

    /**
     * Get last history record
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_history_recent(req, res) {

        // Get the history record
        new History().get_history_recent(req, res);

    }

    /**
     * Restore history record by time
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    restore_history_record(req, res) {

        // Restore the history record
        new History().restore_history_record(req, res);

    }

    /**
     * Sanitize html code
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    sanitize_html(req, res) {

        // Process the request
        new Sanitize().sanitize_html(req, res);

    }

    /**
     * Upload an image
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    upload_image(req, res) {

        // Process the request
        new Images().upload_image(req, res);

    }

    /**
     * Get the images
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_images(req, res) {

        // Process the request
        new Images().get_images(req, res);

    }

    /**
     * Get the icons
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_icons(req, res) {

        // Process the request
        new Icons().get_icons(req, res);

    }

    /**
     * Get the icon
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_icon(req, res) {

        // Process the request
        new Icons().get_icon(req, res);

    } 
    
    /**
     * Upload a cover for module
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    upload_module_cover(req, res) {

        // Process the request
        new Modules().upload_module_cover(req, res);

    }

    /**
     * Create a module
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    create_module(req, res) {

        // Process the request
        new Modules().create_module(req, res);

    }

    /**
     * Get the list with modules
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_modules(req, res) {

        // Process the request
        new Modules().get_modules(req, res);

    }

    /**
     * Get a module
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_module(req, res) {

        // Process the request
        new Modules().get_module(req, res);

    }

    /**
     * Get ai content
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_ai_content(req, res) {

        // Process the request
        new Ai().get_ai_content(req, res);

    }

    /**
     * Get preview
     * 
     * @param req represents the incoming HTTP request
     * @param res represents the outgoing HTTP response
     */
    get_preview(req, res) {

        // Process the request
        new Preview().get_preview(req, res);

    }

}