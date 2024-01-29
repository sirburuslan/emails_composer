/**
 * @file Options
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the types for all options
 */

// Type for the number option
export type option_number_type = {
    name: string,
    template: string,
    value: number,
    unit: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the color option
export type option_color_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the selector option
export type option_selector_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    items: Array<{item_id: number | string, item_name: number | string}>,
    element?: string,
    custom?: string | number
}

// Type for the font option
export type option_font_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the align option
export type option_align_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the text option
export type option_text_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the link option
export type option_link_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the images option
export type option_images_type = {
    name: string,
    template: string,
    has_link: boolean,
    element?: string,
    custom?: string | number
}

// Type for the menu option
export type option_menu_type = {
    name: string,
    template: string,
    element?: string,
    custom?: string | number
}

// Type for the icons option
export type option_icons_type = {
    name: string,
    template: string,
    element?: string,
    custom?: string | number
}

// Type for the list option
export type option_list_type = {
    name: string,
    template: string,
    items: Array<{
        name: string,
        label: string,
        description: string,
        placeholder: string
    }>,
    element?: string,
    custom?: string | number
}

// Type for the checkbox option
export type option_checkbox_type = {
    name: string,
    template: string,
    value: string,
    text: {
        label: string,
        description: string,
    },
    element?: string,
    custom?: string | number
}

// Type for the ai option
export type option_ai_type = {
    name: string,
    template: string,
    element?: string,
    custom?: string | number
}

// Type for the general option
export type option_type = option_number_type | option_color_type | option_selector_type | option_font_type | option_align_type | option_text_type | option_link_type | option_images_type | option_menu_type | option_icons_type | option_list_type | option_checkbox_type | option_ai_type;

// Type for elements options sections
export type options_type = {
    desktop: Array<
        {
            title: string,
            list: option_type[],
            collapsed: boolean
        }
    >,
    mobile: Array<
        {
            title: string,
            list: option_type[],
            collapsed: boolean
        }
    >
};

// Type for template options sections
export type options_template_type = Array<
    {
        title: string,
        list: option_type[],
        collapsed: boolean
    }
>;

// Type for property
export type option_property_type = {
    [key: string]: string | number,
    element_name: string
} | undefined;