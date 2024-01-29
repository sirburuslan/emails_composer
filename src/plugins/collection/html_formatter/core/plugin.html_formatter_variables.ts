/**
 * @class Variables
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2024-01-21
 *
 * This class counts the code types
 */

// Html Formatter
export namespace HtmlFormatter {

    // Variables
    export class Variables {

        // Counts
        counts: any = {
            string: 0,
            whitespace: 0,
            tag: {
                start: {
                    open: 0,
                    close: 0,
                    name: {
                        open: 0,
                        close: 0   
                    }
                },
                end: {
                    open: 0,
                    name: {
                        open: 0,
                        close: 0   
                    }
                },
                meta: {
                    open: 0,
                    close: 0,
                    name: 0,
                    value: 0,
                    equal: 0,
                    slash: 0
                }
            },
            hidden: {
                comment: {
                    open: 0,
                    text: {
                        open: 0
                    },
                    condition: {
                        start: {
                            open: 0
                        },
                        end: {
                            open: 0
                        }
                    }
                },
                tag: {
                    start: {
                        open: 0,
                        close: 0,
                        name: {
                            open: 0,
                            close: 0   
                        }
                    },
                    end: {
                        open: 0,
                        name: {
                            open: 0,
                            close: 0   
                        }
                    },
                    meta: {
                        open: 0,
                        close: 0,
                        name: 0,
                        value: 0,
                        equal: 0
                    }
                }
            }
        };

        // Conditions
        conditions: {[key: string]: string[]} = {
            tag_quotes: ['"', "'", '\"', "\'"]
        };

        // Classes
        classes: string[] = [
            'ec-composer-code-editor-line-code',
            'ec-code-string',
            'ec-code-tag-start-open',
            'ec-code-tag-start-name',
            'ec-code-tag-close',
            'ec-code-whitespace',                
            'ec-code-tag-end-open',
            'ec-code-tag-end-slash',
            'ec-code-tag-end-name',
            'ec-code-tag-meta-value',
            'ec-code-tag-meta-name',
            'ec-composer-code-editor-caret',
            'ec-code-hidden-comment-open',
            'ec-code-hidden-comment-exclamation',
            'ec-code-hidden-comment-line',
            'ec-code-hidden-comment-text',
            'ec-code-hidden-comment-whitespace',
            'ec-code-hidden-comment-condition-rules',
            'ec-code-hidden-comment-condition-parenthese',
            'ec-code-hidden-comment-tag-end-open',
            'ec-code-hidden-comment-tag-end-slash',
            'ec-code-hidden-comment-tag-start-name',
            'ec-code-hidden-comment-tag-meta-name',
            'ec-code-hidden-comment-tag-meta-equal',
            'ec-code-hidden-comment-tag-meta-value',
            'ec-code-hidden-comment-tag-close',
            'ec-code-hidden-comment-tag-end-name',
            'ec-code-hidden-comment-close',
            'ec-code-tag-meta-equal'
        ];

    }

}