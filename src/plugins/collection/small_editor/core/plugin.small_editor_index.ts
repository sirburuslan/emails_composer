/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file gathers the plugin's classes in one place to make the easier to call
 */

// Import Link
import * as Link from './plugin.small_editor_link.js';

// Import Font
import * as Font from './plugin.small_editor_font.js';

// Import Color
import * as Color from './plugin.small_editor_color.js';

// Create the PluginsSmallEditorCore object
let PluginsSmallEditorCore = {
    Link: Link.PluginsSmallEditorCore.Link,
    Font: Font.PluginsSmallEditorCore.Font,
    Color: Color.PluginsSmallEditorCore.Color
};

// Export the PluginsSmallEditorCore object
export default PluginsSmallEditorCore;