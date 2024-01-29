/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file groups all plugin's classes for better usage
 */

// Import dependencies
import * as HtmlFormatterPrepare from "./plugin.html_formatter_prepare.js";
import * as HtmlFormatterLines from "./plugin.html_formatter_lines.js";
import * as HtmlFormatterVariables from "./plugin.html_formatter_variables.js";
import * as HtmlFormatterSpaces from "./plugin.html_formatter_spaces.js";
import * as HtmlFormatterGeneral from "./plugin.html_formatter_general.js";

// Export cores
export {
    HtmlFormatterPrepare,
    HtmlFormatterLines,
    HtmlFormatterVariables,
    HtmlFormatterSpaces,
    HtmlFormatterGeneral
}