// Import the sqlite3 module
import sqlite3 from 'sqlite3';

// Db class
export default class Db {

    // Database connection
    _db;

    /**
     * Constructor
     */
    constructor() {

        // Connect to the database
        this._db = new sqlite3.Database('ec.db');

    }

    /**
     * Save image
     *
     * @param object with parameters
     * 
     * @returns boolean
     */
    save_image(params) {

        // Verify if the required parameters exists
        if ( (typeof params.user_ip !== 'undefined')
            && (typeof params.name !== 'undefined')
            && (typeof params.thumbnail !== 'undefined')
            && (typeof params.original !== 'undefined')
            && (typeof params.extension !== 'undefined')
            && (typeof params.size !== 'undefined') ) {

                // Check if the table images exists
                this._db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='ec_images'", (error, rows) => {

                    // Verify if an error has been occured
                    if ( typeof rows === 'undefined' ) {
                        
                        // Prepare database table
                        let db_table = 'CREATE TABLE IF NOT EXISTS ec_images (id INTEGER PRIMARY KEY AUTOINCREMENT, user_ip TEXT, name TEXT, thumbnail TEXT, original TEXT, extension TEXT, size REAL, created REAL);';

                        // Create the database table
                        this._db.run(db_table);

                    } else {

                        // Prepare the SQL query
                        this._db.run('INSERT INTO ec_images (user_ip, name, thumbnail, original, extension, size, created) VALUES (?, ?, ?, ?, ?, ?, ?)', [params.user_ip, params.name, params.thumbnail, params.original, params.extension, params.size, Date.now()], function(error) {
                            
                            // Verify if an error has been occurred
                            if (error) {
                                console.error(error.message);
                            }

                        });

                        // Close the database connection
                        this._db.close((error) => {

                            // Verify if an error has been occurred
                            if (error) {
                                console.error(err.message);
                            }
                            
                        });

                    }
                    
                });

            return true;

        }
        
        return false;

    }

    /**
     * Get the images from sqlite
     *
     * @param object with parameters
     * 
     * @returns object with response
     */
    get_images(params) {

        // Verify if the required parameters exists
        if ( typeof params.page !== 'undefined' ) {

            return new Promise((resolve, reject) => {

                // Check if the table images exists
                let db_images = this._db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='ec_images'");

                // Verify if the table images exists
                if ( !db_images ) {

                    // Prepare database table
                    let db_table = 'CREATE TABLE IF NOT EXISTS ec_images (id INTEGER PRIMARY KEY AUTOINCREMENT, user_ip TEXT, name TEXT, thumbnail TEXT, original TEXT, extension TEXT, size REAL, created REAL);';

                    // Create the database table
                    this._db.run(db_table);
                    
                    // Return the error
                    reject('The database was created.');

                } else {

                    // Prepare the page
                    let page = params.page * 10;

                    // Images container
                    let images = [];

                    // Prepare the search
                    let search = (params.search !== '')?" WHERE name LIKE '%" + params.search + "%'":"";

                    // Request the images
                    this._db.each("SELECT * FROM ec_images" + search + " ORDER BY id DESC LIMIT 10 OFFSET " + page, (error, row) => {

                        // Verify if an error has been occured
                        if (error) {
                            
                            // Return the error
                            reject(error);
                            return;
                        }

                        // Add image to the container
                        images.push(row);
                        
                    }, (error) => {

                        // Verify if an error has been occured
                        if (error) {

                            // Return the error
                            reject(error);
                            return;

                        }

                        // Return images
                        resolve(images);

                    });

                }

                // Close the connection
                this._db.close();
                
            });

        }

    }
    
}