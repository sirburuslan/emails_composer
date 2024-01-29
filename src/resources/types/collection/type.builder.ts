/**
 * @file Builder
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the type for the builder options
 */

// Create types for the builder settings
type builder_type = {
    name: string,
    language: string,
    base_url: string,
    builder: {
        template_id?: string,
        css: { href: string; }[],
        start: {
            animation: boolean
        },
        resources: {
            elements: {
                sections: {
                    general: {
                        enabled: boolean,
                        show: boolean
                    },
                    advanced: {
                        enabled: boolean,
                        show: boolean
                    }
                }
            },
            rows: {
                sections: {
                    general: {
                        enabled: boolean,
                        show: boolean
                    }
                }
            },
            modules: {
                sections: {
                    general: {
                        enabled: boolean,
                        show: boolean
                    }
                }
            },
            media: {
                sections: {
                    general: {
                        enabled: boolean,
                        show: boolean
                    }
                }
            },
            history: {
                sections: {
                    general: {
                        enabled: boolean,
                        show: boolean
                    }
                }
            }
        }     

    }

};

// Create types for the builder options
type builder_options_type = {
    template_id?: string,
    css: [{
        href: string;
    }],
    start: {
        animation: boolean
    },
    resources: {} 
};

// Create the composer's options
export {
    builder_type,
    builder_options_type
}