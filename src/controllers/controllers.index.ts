/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file groups all constrollers for better usage
 */

// Import controllers
import * as ControllerBuilder from '../controllers/controller.builder.js';

// Create the controllers list
const Controllers = {
    Builder: ControllerBuilder.Controllers.Builder
};

// Export controllers
export default Controllers;