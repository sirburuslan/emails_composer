/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file gathers all plugins in one place for faster usage
 */

// Import Plugins
import * as StartLoading from './collection/start_loading/plugin.start_loading.js';
import * as HtmlFormatter from './collection/html_formatter/plugin.html_formatter.js';
import * as CssFormatter from './collection/css_formatter/plugin.css_formatter.js';
import * as Color from './collection/color/plugin.color.js';
import * as Small_editor from './collection/small_editor/plugin.small_editor.js';
import * as Sanitizer from './collection/sanitizer/plugin.sanitizer.js';

// Create a plugins list
const Plugins = {
    Sanitizer: Sanitizer.Plugins.Sanitizer,
    StartLoading: StartLoading.Plugins.StartLoading,
    HtmlFormatter: HtmlFormatter.Plugins.HtmlFormatter,
    CssFormatter: CssFormatter.Plugins.CssFormatter,
    Color: Color.Plugins.Color,
    Small_editor: Small_editor.Plugins.Small_editor
}

// Export the Plugins list
export default Plugins;