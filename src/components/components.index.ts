/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-29
 *
 * This file organizes the components for better usage
 */

// Import components
import * as ComponentsTabs from './collection/component.tabs.js';
import * as ComponentsSections from './collection/component.sections.js';
import * as ComponentsMain from './collection/component.main.js';
import * as ComponentsSearch from './collection/component.search.js';
import * as ComponentsHistory from './collection/component.history.js';
import * as ComponentsCode from './collection/component.code.js';
import * as ComponentsContent from './collection/component.content.js';
import * as ComponentsModals from './collection/component.modals.js';
import * as ComponentsElements from './collection/component.elements.js';
import * as ComponentsStructures from './collection/component.structures.js';
import * as ComponentsOptions from './collection/component.options.js';
import * as ComponentsText from './collection/component.text.js';
import * as ComponentsModules from './collection/component.modules.js';

// Create a components list
const Components = {
    Tabs: ComponentsTabs.Components.Tabs,
    Sections: ComponentsSections.Components.Sections,
    Main: ComponentsMain.Components.Main,
    Search: ComponentsSearch.Components.Search,
    History: ComponentsHistory.Components.History,
    Code: ComponentsCode.Components.Code,
    Content: ComponentsContent.Components.Content,
    Modals: ComponentsModals.Components.Modals,
    Elements: ComponentsElements.Components.Elements,
    Structures: ComponentsStructures.Components.Structures,
    Options: ComponentsOptions.Components.Options,
    Text: ComponentsText.Components.Text,
    Modules: ComponentsModules.Components.Modules
};

// Export icons
export default Components;