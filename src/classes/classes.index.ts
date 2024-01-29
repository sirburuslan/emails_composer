/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file groups the classes for better usage
 */

// Import interfaces
import * as InterfaceIcons from './interfaces/interface.icons.js';
import * as InterfaceComponents from './interfaces/interface.components.js';
import * as InterfaceElements from './interfaces/interface.elements.js';
import * as InterfaceSections from './interfaces/interface.sections.js';
import * as InterfaceFonts from './interfaces/interface.fonts.js';
import * as AbstractOptions from './abstracts/options.js';
import * as ClassEvents from './class.events.js';
import * as ClassHttps from './class.https.js';
import * as ClassBackup from './class.backup.js';
import * as ClassHistory from './class.history.js';
import * as ClassStyles from './class.styles.js';
import * as ClassCustom from './class.custom.js';
import * as ClassTimer from './class.timer.js';
import * as ClassObserver from './class.observer.js';
import * as ClassModules from './class.modules.js';

// Export the interfaces
export {
    InterfaceIcons,
    InterfaceComponents,
    InterfaceElements,
    InterfaceSections,
    InterfaceFonts
};

// Export the abstracts
export {
    AbstractOptions
};

// Create the classes list
const Classes = {
    Events: ClassEvents.Class.Events,
    Https: ClassHttps.Class.Https,
    Backup: ClassBackup.Class.Backup,
    History: ClassHistory.Class.History,
    Styles: ClassStyles.Class.Styles,
    Custom: ClassCustom.Class.Custom,
    Timer: ClassTimer.Class.Timer,
    Observer: ClassObserver.Class.Observer,
    Modules: ClassModules.Class.Modules
};

// Export interfaces
export default Classes;