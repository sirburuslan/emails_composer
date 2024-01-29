/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file gathers all options in one place for better usage
 */

// Import options
import * as AbstractOptionsColor from "./collection/option.color.js";
import * as AbstractOptionsNumber from "./collection/option.number.js";
import * as AbstractOptionsSelector from "./collection/option.selector.js";
import * as AbstractOptionsFont from "./collection/option.font.js";
import * as AbstractOptionsAlign from "./collection/option.align.js";
import * as AbstractOptionsPosition from "./collection/option.position.js";
import * as AbstractOptionsText from "./collection/option.text.js";
import * as AbstractOptionsLink from "./collection/option.link.js";
import * as AbstractOptionsImages from "./collection/option.images.js";
import * as AbstractOptionsDirection from "./collection/option.direction.js";
import * as AbstractOptionsMenu from "./collection/option.menu.js";
import * as AbstractOptionsSocial from "./collection/option.social.js";
import * as AbstractOptionsIcons from "./collection/option.icons.js";
import * as AbstractOptionsList from "./collection/option.list.js";
import * as AbstractOptionsCheckbox from "./collection/option.checkbox.js";
import * as AbstractOptionsAi from "./collection/option.ai.js";

// Import types
import {element_options_type} from "./../types/types.index.js"

// Initialize components
const Color: element_options_type = AbstractOptionsColor.Resources.Options.Color;
const Number: element_options_type = AbstractOptionsNumber.Resources.Options.Number;
const Selector: element_options_type = AbstractOptionsSelector.Resources.Options.Selector;
const Font: element_options_type = AbstractOptionsFont.Resources.Options.Font;
const Align: element_options_type = AbstractOptionsAlign.Resources.Options.Align;
const Position: element_options_type = AbstractOptionsPosition.Resources.Options.Position;
const Text: element_options_type = AbstractOptionsText.Resources.Options.Text;
const Link: element_options_type = AbstractOptionsLink.Resources.Options.Link;
const Images: element_options_type = AbstractOptionsImages.Resources.Options.Images;
const Direction: element_options_type = AbstractOptionsDirection.Resources.Options.Direction;
const Menu: element_options_type = AbstractOptionsMenu.Resources.Options.Menu;
const Social: element_options_type = AbstractOptionsSocial.Resources.Options.Social;
const Icons: element_options_type = AbstractOptionsIcons.Resources.Options.Icons;
const List: element_options_type = AbstractOptionsList.Resources.Options.List;
const Checkbox: element_options_type = AbstractOptionsCheckbox.Resources.Options.Checkbox;
const Ai = AbstractOptionsAi.Resources.Options.Ai;

// Export the options
export {
    Color,
    Number,
    Selector,
    Font,
    Align,
    Position,
    Text,
    Link,
    Images,
    Direction,
    Menu,
    Social,
    Icons,
    List,
    Checkbox,
    Ai
};