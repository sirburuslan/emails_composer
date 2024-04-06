/**
 * @file Colors
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains some functions used to handle the colors
 */

/**
 * Convert a hex color to rgb
 * 
 * @param string hex
 * 
 * @return custom type with rgb
 */
const convert_hex_to_rgb = (hex: string): {r: number, g: number, b: number, a?: number} => {

    // Remove #
    hex = hex.replaceAll('#', '');

    // Extract colors
    const r: number = parseInt(hex.slice(0, 2), 16);
    const g: number = parseInt(hex.slice(2, 4), 16);
    const b: number = parseInt(hex.slice(4, 6), 16);

    // Create rgb format
    let rgb: {r: number, g: number, b: number, a?: number};

    // Check if the hex is correct
    if ( isNaN(r) || isNaN(g) || isNaN(b) ) {

        // Set default rgb
        rgb = {
            r: 0,
            g: 0,
            b: 0
        };

        return rgb;

    }

    // Extract the alpha
    const a: number = parseInt(hex.slice(6, 8), 16) / 255;

    // Prepare rgb
    rgb = {
        r: r,
        g: g,
        b: b       
    };

    // Verify if alpha is not nan
    if ( !isNaN(a) ) {

        // Add alpha
        rgb.a = a;

    }
    
    return rgb;  

}

/**
 * Convert a rgb color to hex
 * 
 * @param number r
 * @param number g
 * @param number b
 * @param number a
 * 
 * @return string with hex
 */
const convert_rgb_to_hex = (r: number, g: number, b: number, a: number): string => {

    // Prepare the rgba color
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    a = Math.min(1, Math.max(0, a));
    
    // Convert rgb to hexadecimal
    const rh: string = r.toString(16).padStart(2, '0');
    const gh: string = g.toString(16).padStart(2, '0');
    const bh: string = b.toString(16).padStart(2, '0');
    
    // Convert alpha to hexadecimal
    const ah: string = Math.round(a * 255).toString(16).padStart(2, '0');
    
    // Return hex
    return `#${rh}${gh}${bh}${ah}`;

}

/**
 * Convert a rgb color to hsl
 * 
 * @param number r
 * @param number g
 * @param number b
 */
const convert_rgb_to_hsl = (r: number, g: number, b: number): number[] => {

    // Divide colors to 255
    r /= 255;
    g /= 255;
    b /= 255;

    // Get maximum color value
    const max: number = Math.max(r, g, b);

    // Get minimum color value
    const min: number = Math.min(r, g, b);

    // Define saturation and lightness
    let s: number = 0, l: number = 0;

    // Divide maximum + minimum color
    s = l = (max + min) / 2;

    // Define the hue
    let h: number = s;

    // Check if max is equal to minimum
    if (max === min) {

        // Set achromatic
        h = s = 0;

    } else {

        // Drop max
        const d = max - min;

        // Calculate saturation
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        // Process max
        switch (max) {

            case r:

                // Set hue
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                
                // Set hue
                h = (b - r) / d + 2;
                break;

            case b:

                // Set hue
                h = (r - g) / d + 4;
                break;

        }

        // Divide hue to 6
        h /= 6;

    }

    return [h * 360, s * 100, l * 100];
}

/**
 * Set opacity
 * 
 * @param any params
 * @param number r
 * @param number g
 * @param number b
 * @param number a
 */
const set_opacity = (params: any, r: number, g: number, b: number, a?: number): void => {

    // Get the opacity
    const opacity: HTMLElement = params.selector.getElementsByClassName('ec-option-color-opacity-filter')[0];

    // Set gradient
    opacity.style.setProperty('--background', 'linear-gradient(to right, rgba(' + r + ', ' + g + ', ' + b + ', 1), rgba(255, 0, 0, 0))');

    // Check if a is not undefined
    if ( a ) {

        // Get the opacity rect
        const opacity_rect: DOMRect = opacity.getBoundingClientRect();

        // Set the left position
        opacity.getElementsByTagName('span')[0].style.left = (opacity_rect.width - (((a * 100)/opacity_rect.width) * 100)) + 'px';

    } else {

        // Set the left position
        opacity.getElementsByTagName('span')[0].style.left = '0';

    }

}

/**
 * Draw a gradient
 * 
 * @param any params
 * @param any rgb_color
 */
const draw_gradient = (params: any, rgb_color: any): void => {

    // Convert rgb to hsl
    const hsl: any = convert_rgb_to_hsl(rgb_color['r'], rgb_color['g'], rgb_color['b']);

    // Get the gradient element
    const gradient: any = params.selector.getElementsByClassName('ec-option-color-gradient-selector')[0];

    // Get the gradient 2d context
    const gradient_2d: any = gradient.getContext('2d');

    // Get the gradient width
    const gradient_width: number = gradient.width;

    // Get the gradient height
    const gradient_height: number = gradient.height;

    // Create the gradient
    gradient_2d.clearRect(0, 0, gradient_width, gradient_height);

    // Create a gradient from white to black
    const wb_gradient: CanvasGradient = gradient_2d.createLinearGradient(0, 0, 0, gradient_height);

    // Add colors
    wb_gradient.addColorStop(0, '#FFFFFF');
    wb_gradient.addColorStop(1, '#000000');

    // Create a gradiend from a hsl color
    const hsl_gradient: CanvasGradient = gradient_2d.createLinearGradient(0, 0, gradient_width, 0);

    // Add colors
    hsl_gradient.addColorStop(0, `hsla(${Math.floor(hsl[0])},100%,50%,0)`);
    hsl_gradient.addColorStop(1, `hsla(${Math.floor(hsl[0])},100%,50%,1)`);
  
    // Set color
    gradient_2d.fillStyle = hsl_gradient;

    // Fill the rect
    gradient_2d.fillRect(0, 0, gradient_width, gradient_height);

    // Set color
    gradient_2d.fillStyle = wb_gradient;

    // Set the type of compositing operation
    gradient_2d.globalCompositeOperation = 'multiply';

    // Fill the rect
    gradient_2d.fillRect(0, 0, gradient_width, gradient_height);

    // Set the type of compositing operation
    gradient_2d.globalCompositeOperation = 'source-over';

}

/**
 * Draw a filter
 * 
 * @param any params
 */
const draw_filter = (params: any): void => {

    // Get the filter element
    const filter: any = params.selector.getElementsByClassName('ec-option-color-gradient-filter')[0];

    // Get the filter 2d context
    const filter_2d: any = filter.getContext('2d');

    // Get the filter width
    const filter_width: number = filter.width;

    // Get the filter height
    const filter_height: number = filter.height;

    // Draw rect in filter
    filter_2d.rect(0, 0, filter_width, filter_height);

    // Create a linear gradient in the filter
    const filter_linear_gradient: any = filter_2d.createLinearGradient(0, 0, 0, filter_height);

    // Set colors
    filter_linear_gradient.addColorStop(0, 'rgba(255, 0, 0, 1)');
    filter_linear_gradient.addColorStop(0.18, 'rgba(255, 255, 0, 1)');
    filter_linear_gradient.addColorStop(0.35, 'rgba(0, 255, 0, 1)');
    filter_linear_gradient.addColorStop(0.55, 'rgba(0, 255, 255, 1)');
    filter_linear_gradient.addColorStop(0.69, 'rgba(0, 0, 255, 1)');
    filter_linear_gradient.addColorStop(0.91, 'rgba(255, 0, 255, 1)');
    filter_linear_gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');

    // Set the color
    filter_2d.fillStyle = filter_linear_gradient;

    // Fill the rect
    filter_2d.fill();

}

/**
 * Get gradient color
 * 
 * @param any e(event)
 * @param any params
 */
const get_gradient_color = (e: any, params: any): void => {

    // Get the gradient
    const gradient: any = e.target.closest('.ec-option-color-gradient-selector');

    // Create an image
    const img: any = new Image();

    // Set src
    img.src = gradient.toDataURL();

    // Wait for image to be loaded
    img.onload = (): void => {

        // Get the gradient rect
        const gradient_rect: DOMRect = gradient.getBoundingClientRect();

        // Set image width
        img.width = gradient_rect.width;
        
        // Set image height
        img.height = gradient_rect.height;
        
        // Create a new canvas
        const canvas: any = document.createElement('canvas');

        // Set canvas width
        canvas.width = img.width;

        // Set canvas height
        canvas.height = img.height;

        // Draw image
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        // Get the image data
        const image_data: any = canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;

        // Get the color input
        const input: any = params.selector.getElementsByClassName('ec-option-color-input')[0];
        
        // Change the color input value
        input.value = "#" + ((1 << 24) | (image_data[0] << 16) | (image_data[1] << 8) | image_data[2]).toString(16).slice(1).toUpperCase();

        // Change the button color
        params.selector.getElementsByClassName('ec-option-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', input.value);
        params.selector.getElementsByClassName('ec-option-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', input.value);

        // Set opacity
        set_opacity(params, image_data[0], image_data[1], image_data[2]);

    };

}

/**
 * Get filter color
 * 
 * @param any e(event)
 * @param any params
 */
const get_filter_color = (e: any, params: any): void => {

    // Get the filter 2d context
    const filter_2d: any = e.target.closest('.ec-option-color-gradient-filter').getContext('2d');

    // Get the image data
    const image_data: any = filter_2d.getImageData(e.offsetX, e.offsetY, 1, 1).data;

    // Get the color input
    const input: any = params.selector.getElementsByClassName('ec-option-color-input')[0];
    
    // Change the color input value
    input.value = "#" + ((1 << 24) | (image_data[0] << 16) | (image_data[1] << 8) | image_data[2]).toString(16).slice(1).toUpperCase();

    // Change the button color
    params.selector.getElementsByClassName('ec-option-color-active')[0].getElementsByTagName('button')[0].style.setProperty('--bgcolor', input.value);
    params.selector.getElementsByClassName('ec-option-color-active')[0].getElementsByTagName('button')[0].setAttribute('data-color', input.value);

    // Change the filter color
    draw_gradient(params, {
        r: image_data[0],
        g: image_data[1],
        b: image_data[2]
    });

    // Set opacity
    set_opacity(params, image_data[0], image_data[1], image_data[2]);

}

// Export functions
export {convert_hex_to_rgb, convert_rgb_to_hex, set_opacity, draw_gradient, draw_filter, get_gradient_color, get_filter_color};