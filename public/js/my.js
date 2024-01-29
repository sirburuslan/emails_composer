// Import the Emails Composer
import Ec from './ec.js'

/*(async () => {

    // Init the Email Composer
    new Ec(
        '#ec-composer',
        {
            "builder": {
                "template_id": "rk1704732685193",
                "start": {
                    "animation": false
                },
                "resources": {

                    "elements": {

                        "sections": {
                            
                            "advanced": {
                                "enabled": true,
                                "show": false
                            }

                        }

                    }

                }

            }

        }
    );

})();*/

// My templates events container
let my_templates_events = [];

// Get My Templates by default
const my_templates = async () => {

    // Verify if saved events exists
    if ( my_templates_events.length > 0 ) {

        // List all saved events
        for ( let saved of my_templates_events ) {
            
            // Check if saved has target
            if ( typeof saved.target === 'undefined' ) {
                continue;
            }

            // Remove event
            saved.target.removeEventListener(saved.event, saved.func);

        }

    }

    // Get all my templates
    let all_my_templates = document.querySelectorAll('.ec-templates #ec-my-templates-tab > ul > li > a');

    // Verify if templates exists
    if ( all_my_templates.length > 0 ) {

        // List the templates
        Array.from(all_my_templates).map(template => {

            // Verify if is not ec-new-template
            if ( !template.classList.contains('ec-new-template') ) {

                // Remove the template
                template.closest('li').remove();

            }

        });

    }

    // Request parameters
    let request_params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Get templates
    let response = await fetch('api/my_templates', request_params);

    // Get json data
    let data_json = await response.json();

    // Verify if the response is successfully
    if ( data_json.success ) {

        // Templates list container
        let templates_list = '';

        // List the templates
        for ( let template of data_json.templates ) {

            // Default template cover
            let cover = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-richtext" viewBox="0 0 16 16">
                <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208M5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
            </svg>`;

            // Verify if the template has a cover
            if ( template.cover ) {

                // Replace the default cover
                cover = `<img src="public/share/template-${template.template_id}.png" alt="${template.name}" />`;

            }

            // Add template to the container
            templates_list += `<li data-template="${template.template_id}">
                <a href="#" class="ec-template">
                    ${cover}
                    <span>${template.name}</span>
                </a>
                <div>
                    <button type="button" class="ec-button ec-delete-button">
                        <span class="material-symbols-sharp">
                            scan_delete
                        </span>
                    </button>
                    <button type="button" class="ec-button ec-edit-button">
                        <span class="material-symbols-sharp">
                            draw
                        </span>
                    </button>  
                </div>
            </li>`;

        }

        // Insert templates
        document.querySelector('.ec-templates #ec-my-templates-tab > ul').insertAdjacentHTML('beforeend', templates_list);

        // Get the edit template buttons
        let edit_templates = document.getElementsByClassName('ec-edit-button');

        // Check if edit template buttons exists
        if ( edit_templates.length > 0 ) {

            // Edit template function
            let edit_template = (e) => {
                e.preventDefault();

                // Get the target
                let target = e.target;

                // Add the ec-selected-template class
                target.classList.add('ec-selected-template');

                // Set a pause
                setTimeout(() => {

                    // Show the Email Composer
                    document.getElementById('ec-composer').classList.add('ec-composer-show');

                    // Remove the ec-selected-template class
                    target.classList.remove('ec-selected-template');

                    // Save event
                    my_templates_events.push({
                        target: document.querySelector('#ec-composer .ec-templates-button'),
                        event: 'mousedown',
                        func: my_templates
                    });

                    // Register event for ec composer
                    document.querySelector('#ec-composer .ec-templates-button').addEventListener('mousedown', my_templates);

                }, 600);

                // Init the Email Composer
                new Ec(
                    '#ec-composer',
                    {
                        "builder": {
                            "template_id": target.closest('li').getAttribute('data-template'),
                            "start": {
                                "animation": false
                            },
                            "resources": {

                                "elements": {

                                    "sections": {
                                        
                                        "advanced": {
                                            "enabled": true,
                                            "show": false
                                        }

                                    }

                                }

                            }

                        }

                    }
                );

            };

            // List the templates
            for ( let template of edit_templates ) {

                // Save event
                my_templates_events.push({
                    target: template,
                    event: 'click',
                    func: edit_template
                });

                // Register event
                template.addEventListener('click', edit_template);

            }

        }

        // Get the delete template buttons
        let delete_templates = document.getElementsByClassName('ec-delete-button');

        // Check if delete template buttons exists
        if ( delete_templates.length > 0 ) {

            // Create the delete function
            let delete_template = async (e) => {
                e.preventDefault();

                // Get the target
                let target = e.target;

                // Set the template id
                let template_id = target.closest('li').getAttribute('data-template');

                // Prepare the fields
                let fields = {
                    template_id: template_id
                };

                // Prepare the request parameters
                let request_params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fields)
                };

                // Delete the template
                let response = await fetch('api/delete_template', request_params);

                // Verify if the response has been failed
                if ( !response.ok ) {

                    // Error message container
                    let error_message = 'Unknown error occurred.';

                    // Handle different error statuses
                    if (response.status === 404) {

                        // Set error message
                        error_message = 'Resource not found.';

                    } else if (response.status === 500) {

                        // Set error message
                        error_message = 'Internal server error.';       
                        
                    }

                    // Display the error message
                    document.getElementsByClassName('ec-message')[0].innerHTML = error_message;

                    // Show message box
                    document.getElementsByClassName('ec-message')[0].style.minHeight = '50px';

                    // Set pause
                    setTimeout(() => {

                        // Hide message box
                        document.getElementsByClassName('ec-message')[0].style.minHeight = '0px';

                        // Set pause
                        setTimeout(() => {

                            // Remove message
                            document.getElementsByClassName('ec-message')[0].innerHTML = '';
                            
                        }, 300);    
                            

                    }, 2000);

                    return;

                }

                // Turn response to json
                let json_data = await response.json();

                // Verify if the template was deleted
                if ( json_data.success ) {

                    // Remove the template from the list
                    document.querySelector('.ec-templates #ec-my-templates-tab > ul > li[data-template="' + template_id + '"]').remove();

                }

            };

            // List the templates
            for ( let template of delete_templates ) {

                // Save event
                my_templates_events.push({
                    target: template,
                    event: 'click',
                    func: delete_template
                });

                // Register event
                template.addEventListener('click', delete_template);

            }

        }

    }

};

// Get Templates by default
const get_templates = async (type) => {

    // Request parameters
    let request_params = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Get templates
    let response = await fetch('api/get_templates?type=' + type, request_params);

    // Get json data
    let data_json = await response.json();

    // Verify if the response is successfully
    if ( data_json.success ) {

        // Templates list container
        let templates_list = '';

        // List the templates
        for ( let template of data_json.templates ) {

            // Default template cover
            let cover = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-richtext" viewBox="0 0 16 16">
                <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208M5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
            </svg>`;

            // Verify if the template has a cover
            if ( template.cover ) {

                // Replace the default cover
                cover = `<img src="public/share/template-${template.template_id}.png" alt="${template.name}" />`;

            }

            // Add template to the container
            templates_list += `<li data-template="${template.template_id}">
                <a href="#" class="ec-template">
                    ${cover}
                    <span>${template.name}</span>
                </a>
            </li>`;

        }

        // Templates list
        let templates = {};

        // Check if type is default
        if ( type === 'default' ) {

            // Set templates in the gallery section
            document.querySelector('.ec-templates #ec-gallery-tab > ul').innerHTML = templates_list;

            // Save templates
            templates = document.querySelectorAll('.ec-templates #ec-gallery-tab > ul > li');

        } else {

            // Set templates in the premium section
            document.querySelector('.ec-templates #ec-premium-tab > ul').innerHTML = templates_list;

            // Save templates
            templates = document.querySelectorAll('.ec-templates #ec-premium-tab > ul > li');

        }

        // Total templates
        let ttemplates = templates.length;

        // List the templates
        for ( let t = 0; t < ttemplates; t++ ) {

            // Register event
            templates[t].addEventListener('click', async (e) => {
                e.preventDefault();

                // Get the target
                let target = e.target;

                // Get the template's ID
                let template_id = target.closest('li').getAttribute('data-template');

                // Prepare the fields
                let fields = {
                    template_id: template_id,
                    type: (target.closest('.ec-tab').getAttribute('id') === 'ec-gallery-tab')?'default':'premium'
                };

                // Request parameters
                let request_params = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(fields)
                };

                // Clone a template
                let response = await fetch('api/clone_template', request_params);

                // Verify if the response has been failed
                if ( !response.ok ) {

                    // Error message container
                    let error_message = 'Unknown error occurred.';

                    // Handle different error statuses
                    if (response.status === 404) {

                        // Set error message
                        error_message = 'Resource not found.';

                    } else if (response.status === 500) {

                        // Set error message
                        error_message = 'Internal server error.';       
                        
                    }

                    // Display the error message
                    document.getElementsByClassName('ec-message')[0].innerHTML = error_message;

                    // Show message box
                    document.getElementsByClassName('ec-message')[0].style.minHeight = '50px';

                    // Set pause
                    setTimeout(() => {

                        // Hide message box
                        document.getElementsByClassName('ec-message')[0].style.minHeight = '0px';

                        // Set pause
                        setTimeout(() => {

                            // Remove message
                            document.getElementsByClassName('ec-message')[0].innerHTML = '';
                            
                        }, 300);    
                            

                    }, 2000);

                    return;

                }

                // Get json data
                let data_json = await response.json();

                // Verify if the response is successfully
                if ( data_json.success ) {

                    // Set a pause
                    setTimeout(() => {

                        // Show the Email Composer
                        document.getElementById('ec-composer').classList.add('ec-composer-show');

                    }, 600);

                    // Set a pause
                    setTimeout(() => {

                        // Load my templates
                        my_templates();

                    }, 3000);                    

                    // Init the Email Composer
                    new Ec(
                        '#ec-composer',
                        {
                            "builder": {
                                "template_id": data_json.template_id,
                                "start": {
                                    "animation": false
                                },
                                "resources": {

                                    "elements": {

                                        "sections": {
                                            
                                            "advanced": {
                                                "enabled": true,
                                                "show": false
                                            }

                                        }

                                    }

                                }

                            }

                        }
                    );

                } else {

                    // Create error message
                    let error_message = '<div class="ec-message-error">'
                        + '<span class="material-symbols-sharp">'
                            + 'notifications'
                        + '</span>'
                        + data_json.message
                    + '</div>';

                    // Display the error message
                    document.getElementsByClassName('ec-message')[0].innerHTML = error_message;

                    // Show message box
                    document.getElementsByClassName('ec-message')[0].style.minHeight = '50px';

                    // Set pause
                    setTimeout(() => {

                        // Hide message box
                        document.getElementsByClassName('ec-message')[0].style.minHeight = '0px';

                        // Set pause
                        setTimeout(() => {

                            // Remove message
                            document.getElementsByClassName('ec-message')[0].innerHTML = '';
                            
                        }, 300);    
                            

                    }, 2000);
                    
                }

            });

        }

    } else {

        // Create the message
        let message = '<li class="ec-no-templates-found">'
            + data_json.message
        + '</li>';

        // Check if type is default
        if ( type === 'default' ) {

            // Set templates in the gallery section
            document.querySelector('.ec-templates #ec-gallery-tab > ul').innerHTML = message;

        } else {

            // Set templates in the premium section
            document.querySelector('.ec-templates #ec-premium-tab > ul').innerHTML = message;

        }        

    }

};

// Load my templates
my_templates();

// Load default templates
setTimeout(() => get_templates('default'), 300);

// Load premium templates
setTimeout(() => get_templates('premium'), 600);

// Get all nav links for templates
let templates_nav_links = document.querySelectorAll('.ec-templates .ec-sidebar a');

// Verify if links exists
if ( templates_nav_links.length > 0 ) {

    // List the nav links
    for ( let nav_link of templates_nav_links ) {

        // Register event
        nav_link.addEventListener('click', (e) => {
            e.preventDefault();

            // Check if no active link exists
            if ( document.querySelectorAll('.ec-templates .ec-sidebar a.ec-active-link').length > 0 ) {

                // Remove the class ec-active-link
                document.querySelector('.ec-templates .ec-sidebar a.ec-active-link').classList.remove('ec-active-link');

                // Remove the class ec-tab-show
                document.querySelector('.ec-templates .ec-tabs .ec-tab.ec-tab-show').classList.remove('ec-tab-show');  

            }

            // check if tab exists
            if ( document.querySelectorAll(e.target.getAttribute('href')).length > 0 ) {

                // Add the class ec-active-link
                e.target.classList.add('ec-active-link');

                // Add the class ec-tab-show
                document.querySelector(e.target.getAttribute('href')).classList.add('ec-tab-show');    

            }                 

        });

    }

}

// Get the new template link
let new_template = document.getElementsByClassName('ec-new-template');

// Check if new template link exists
if ( new_template.length > 0 ) {

    // Register event
    new_template[0].addEventListener('click', (e) => {
        e.preventDefault();

        // Get the target
        let target = e.target;

        // Add the ec-selected-template class
        target.classList.add('ec-selected-template');

        // Set a pause
        setTimeout(() => {

            // Show the Email Composer
            document.getElementById('ec-composer').classList.add('ec-composer-show');

            // Remove the ec-selected-template class
            target.classList.remove('ec-selected-template');

            // Save event
            my_templates_events.push({
                target: document.querySelector('#ec-composer .ec-templates-button'),
                event: 'mousedown',
                func: my_templates
            });

            // Register event for ec composer
            document.querySelector('#ec-composer .ec-templates-button').addEventListener('mousedown', my_templates);

        }, 600);

        // Init the Email Composer
        new Ec(
            '#ec-composer',
            {
                "builder": {
                    "template_id": "",
                    "start": {
                        "animation": false
                    },
                    "resources": {

                        "elements": {

                            "sections": {
                                
                                "advanced": {
                                    "enabled": true,
                                    "show": false
                                }

                            }

                        }

                    }

                }

            }
        );

    });

}