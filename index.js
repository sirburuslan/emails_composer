// Import express
import express from 'express';

// Import the Multer midleware
import multer from 'multer';

// Import the Dotenv module
import dotenv from 'dotenv';

// Import the Routes
import Routes from './src/api/routes.js';

// Add support for env files
dotenv.config();

// Load express
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Use public folder
app.use('/public', express.static('public'));

// Accept json
app.use(express.json());

// Handle favicon requests
app.use('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// Handle http requests
app.get('/', (req, res) => {

    // Render templates
    res.render('templates');

});

// Handling POST request for template creation
app.post('/api/create_template', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Create template
    routes.create_template(req, res);

});

// Handling POST request for template cloning
app.post('/api/clone_template', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Clone template
    routes.clone_template(req, res);

});

// Handling POST request for template name update
app.post('/api/update_template_name', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Update template name
    routes.update_template_name(req, res);

});

// Handling GET requests my templates reading
app.get('/api/my_templates', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get my templates
    routes.my_templates(req, res);

});

// Handling GET requests templates
app.get('/api/get_templates', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Gets templates
    routes.get_templates(req, res);

});

// Handling POST requests for template downloading
app.post('/api/download_template', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Download the template
    routes.download_template(req, res);

});

// Handling POST requests for template deleting
app.post('/api/delete_template', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Delete the template
    routes.delete_template(req, res);

});

// Handling PUT request for update saving
app.put('/api/create_update', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Save update
    routes.create_update(req, res);

});

// Handling GET requests for history reading
app.get('/api/get_history_all/:template_id/:page/:limit', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get history records
    routes.get_history_all(req, res);

});

// Handling GET requests for history reading
app.get('/api/get_history_by_date/:template_id/:date/:page/:limit', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get history records
    routes.get_history_by_date(req, res);

});

// Handling GET requests for last history record reading
app.get('/api/get_history_recent/:template_id', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get history record
    routes.get_history_recent(req, res);

});

// Handling GET requests for history record reading
app.get('/api/restore_history_record/:template_id/:time', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Restore history record
    routes.restore_history_record(req, res);

});

// Handling POST requests for images uploading
app.post('/api/upload_image', multer({ dest: './public/uploads/', preservePath: true }).single('file'), (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Process the request
    routes.upload_image(req, res);

});

// Handling POST requests the images list
app.post('/api/get_images', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get the images
    routes.get_images(req, res);

});

// Handling POST requests the icons list
app.post('/api/get_icons', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get the icons
    routes.get_icons(req, res);

});

// Handling POST requests the icon
app.post('/api/get_icon', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get the icon
    routes.get_icon(req, res);

});

// Handling POST requests for module cover uploading
app.post('/api/upload_module_cover', multer({ dest: './public/uploads/', preservePath: true }).single('file'), (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Process the request
    routes.upload_module_cover(req, res);

});

// Handling POST requests for module creation
app.post('/api/create_module', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Process the request
    routes.create_module(req, res);

});

// Handling POST requests for modules reading
app.post('/api/get_modules', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Gets the modules list
    routes.get_modules(req, res);

});

// Handling POST requests for module reading
app.post('/api/get_module', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Gets a module
    routes.get_module(req, res);

});

// Handling POST requests for ai content
app.post('/api/get_ai_content', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get ai content
    routes.get_ai_content(req, res);

});

// Handling GET requests for preview
app.get('/api/get_preview/:template_id', (req, res) => {

    // Call the Routes class
    let routes = new Routes();

    // Get preview
    routes.get_preview(req, res);

});

// Catch-all route for undefined URLs
app.use((req, res) => {

    // Send response
    return res.status(400).send({
        success: false,
        message: 'Invalid URL'
    });

});

// Run server
app.listen('3000', () => {});