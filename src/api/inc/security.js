// Import the sanitize-html module
import sanitizeHtml from 'sanitize-html';

/**
 * Remove unwanted characters from string
 *
 * @param string string
 * 
 * @returns string as response
 */
const clean_string = (string) => {

    // Verify if string is defined
    if ( typeof string === 'undefined' ) {
        return '';
    }

    // Check if string is object
    if ( typeof string === 'object' ) {
        return string;
    }

    // Remove all special characters
    string = ( typeof string === 'number' )?string:string.replace('^[a-zA-Z0-9-\s]*$', '');

    // Verify if length is greater than 50
    if ( string.length > 50 ) {
        return '';
    }

    return string;

}

/**
 * Remove unwanted characters from html
 *
 * @param string with html
 * 
 * @returns string as response
 */
const clean_html = (html) => {

    // Sanitize HTML
    html = sanitizeHtml(html, {
        allowedTags: [
            'address', 'article', 'aside', 'footer', 'header', 'h1', 'h2', 'h3', 'h4',
            'h5', 'h6', 'hgroup', 'main', 'nav', 'section', 'blockquote', 'dd', 'div',
            'dl', 'dt', 'figcaption', 'figure', 'hr', 'li', 'main', 'ol', 'p', 'pre',
            'ul', 'a', 'abbr', 'bdi', 'bdo', 'br', 'cite', 'code', 'data', 'dfn',
            'em', 'i', 'kbd', 'mark', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp',
            'small', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr', 'caption',
            'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 
            'font-family', 'font-size', 'font-weight', 'text-color', 'img', 'svg', 'path'
        ],
        allowedClasses: {
            'div': [
                'ec-composer-*',
                'ec-element-*'
            ],
            'table': [
                'ec-composer-*',
                'ec-element-*'
            ],
            'a': [
                'ec-composer-*',
                'ec-element-*'
            ],
            'span': [
                'material-*',
                'ec-composer-*',
                'ec-element-*'
            ],
            'ul': [
                'ec-*'
            ],
            'path': [
                'ec-*'
            ]
        },
        allowedAttributes: {
            '*': [
                'data-*',
                'href',
                'align',
                'src',
                'alt',
                'center',
                'bgcolor',
                'style'
            ],
            'svg': [
                'xmlns',
                'x',
                'y',
                'width',
                'height',
                'viewbox'
            ],
            'path': [
                'd',
                'fill',
                'class'
            ],
            'h3': [
                'contenteditable'
            ],
            'h4': [
                'contenteditable'
            ],
            'h5': [
                'contenteditable'
            ],
            'h6': [
                'contenteditable'
            ],
            'p': [
                'contenteditable'
            ]
        }

    });

    // Return sanitized html
    return html;

}

/**
 * Remove unwanted characters from css
 *
 * @param string with css
 * 
 * @returns string as response
 */
const clean_css = (css) => {

    // Sanitize CSS
    css = sanitizeHtml(css);

    // Return sanitized css
    return css;

}

// Export the functions
export {
    clean_string,
    clean_html,
    clean_css
}