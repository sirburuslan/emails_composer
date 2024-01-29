/**
 * @file Index
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains groups all incs files for more easy usage
 */

// Import inc
import { run_builder } from './inc.builder.js';
import { show_message } from './inc.errors.js';
import { get_icon } from './inc.icons.js';
import { 
    save_instance, 
    get_instance 
} from './inc.instances.js';
import { get_word } from './inc.lang.js';
import { 
    get_option, 
    update_options 
} from './inc.options.js';
import { get_section } from './inc.sections.js';
import { 
    get_styles, 
    prepare_styles, 
    get_property_value, 
    update_property_value 
} from './inc.styles.js';
import { 
    get_content, 
    reset_contents 
} from './inc.contents.js';
import { 
    get_element_by_name, 
    get_element_options, 
    move_element, 
    reset_elements, 
    unselect_element 
} from './inc.elements.js';
import { 
    move_structure, 
    reset_structures 
} from './inc.structures.js';
import { 
    convert_hex_to_rgb, 
    convert_rgb_to_hex, 
    set_opacity, 
    draw_gradient, 
    draw_filter, 
    get_gradient_color, 
    get_filter_color 
} from './inc.colors.js';
import { 
    remove_buttons, 
    get_template, 
    get_template_options 
} from './inc.template.js';
import { 
    get_structure_buttons, 
    get_element_buttons, 
    get_placeholder 
} from './inc.buttons.js';
import { 
    get_date, 
    get_time 
} from './inc.time.js';
import { 
    get_all_fonts, 
    get_fonts_link, 
    get_text_sizes 
} from './inc.fonts.js';
import { 
    show_index, 
    sanitize_code 
} from './inc.code.js';
import { is_url_valid } from './inc.url.js';
import { 
    format_file_size, 
    get_images, 
    get_icons, 
    download_icon 
} from './inc.media.js';
import { show_modal_message } from './inc.modals.js';
import { get_ai_content } from './inc.ai.js';

// Export inc
export {
    run_builder,
    show_message,
    get_icon,
    save_instance,
    get_instance,
    get_word,
    get_option,
    update_options,
    get_section,
    get_styles,
    prepare_styles,
    get_property_value,
    update_property_value,
    get_content,
    reset_contents,
    get_element_by_name,
    get_element_options,
    move_element,
    reset_elements,
    unselect_element,
    move_structure,
    reset_structures,
    convert_hex_to_rgb,
    convert_rgb_to_hex,
    set_opacity,
    draw_gradient,
    draw_filter,
    get_gradient_color,
    get_filter_color,
    remove_buttons,
    get_template,
    get_template_options,
    get_structure_buttons,
    get_element_buttons,
    get_placeholder,
    get_date,
    get_time,
    get_all_fonts,
    get_fonts_link,
    get_text_sizes,
    show_index,
    sanitize_code,
    is_url_valid,
    format_file_size,
    get_images,
    get_icons,
    download_icon,
    show_modal_message,
    get_ai_content
}