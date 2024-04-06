/**
 * @class Color
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This class creates the color box and allows to select a color
 */

// Import types
import { params_type } from '../../../resources/types/types.index.js';

// Plugins
export namespace Plugins {

    // Color class
    export class Color {

        /**
         * Add the color box in the document
         * 
         * @param MouseEvent e(event)
         * @param params_type params
         */
        add_color_box(e: MouseEvent, params: params_type): void {

            // Save target
            const target = e.target as HTMLElement;

            // Check if ec-color-box exists
            if ( params.selector.getElementsByClassName('ec-color-box').length > 0 ) {

                // Remove color box
                params.selector.getElementsByClassName('ec-color-box')[0].remove();

                // Verify if color active exists
                if ( params.selector.getElementsByClassName('ec-button-color-active').length > 0 ) {

                    // Remove the class ec-button-color-active
                    params.selector.getElementsByClassName('ec-button-color-active')[0].classList.remove('ec-button-color-active');

                }

            }

            // Set pause
            setTimeout((): void => {

                // Add active class
                target.closest('.ec-button-color')!.classList.add('ec-button-color-active');

                // Get the value
                const value: string = (target.getAttribute('data-color') && (target.getAttribute('data-color') !== 'transparent'))?target.getAttribute('data-color')!.slice(0, 7):'';

                // Create color box
                const box: string = '<div class="ec-dropdown ec-dropdown-show ec-dropdown-bottom ec-color-box">'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-7">'
                            + '<div class="ec-color-opacity-filter">'
                                + '<span></span>'
                            + '</div>'
                        + '</div>'
                        + '<div class="ec-grid-column-5">'
                            + '<input type="text" class="ec-color-input" value="' + value + '" maxlength="7" />'
                        + '</div>'
                    + '</div>'
                    + '<div class="ec-grid">'
                        + '<div class="ec-grid-column-11">'
                            + '<canvas class="ec-color-gradient-selector"></canvas>'
                        + '</div>'
                        + '<div class="ec-grid-column-1">'
                            + '<canvas class="ec-color-gradient-filter"></canvas>'
                        + '</div>'
                    + '</div>'
                + '</div>';

                // Append box
                params.selector.getElementsByClassName('ec-composer')[0].insertAdjacentHTML('beforeend', box);
                
                // Get the button rect
                const button_rect: DOMRect = target.getBoundingClientRect();

                // Get the color box
                const color_box = params.selector.getElementsByClassName('ec-color-box')[0] as HTMLElement;

                // Set top position
                const top_position: number = (window.innerHeight > (button_rect.top + 40 + 230))?(button_rect.top + 40):(button_rect.top - 245);

                // Verify if the box should be above the button
                if ( window.innerHeight < (button_rect.top + 40 + 230) ) {

                    // Set ec-color-box-top class
                    color_box.classList.add('ec-color-box-top');

                }

                // Set color box position
                color_box.style.cssText = 'top: ' + top_position + 'px;left:' + (button_rect.left - 201) + 'px';

                // Convert color to rgb
                const rgb_color: any = this.convert_hex_to_rgb(target.getAttribute('data-color')!); 

                // Draw a gradient
                this.draw_gradient(params, {
                    r: rgb_color['r'],
                    g: rgb_color['g'],
                    b: rgb_color['b']
                });

                // Draw a filter
                this.draw_filter(params);  
                
                // Set opacity
                this.set_opacity(params, rgb_color['r'], rgb_color['g'], rgb_color['b'], rgb_color['a']);

            }, 300); 

        }

        /**
         * Check if hex is valid
         * 
         * @param string hex
         * 
         * @return custom type with rgb
         */
        is_hex_valid = (hex: string): boolean => {

            // Prepare the regex pattern
            const regex = /^#?([0-9A-Fa-f]{3}){1,2}$/;

            // Return the response
            return regex.test(hex);
        }

        /**
         * Convert a hex color to rgb
         * 
         * @param string hex
         * 
         * @return custom type with rgb
         */
        convert_hex_to_rgb = (hex: string): {r: number, g: number, b: number, a?: number} => {

            // Check if hex is null
            if ( !hex ) {
                return {r: 255, g: 255, b: 255};
            }

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
        convert_rgb_to_hex = (r: number, g: number, b: number, a: number): string => {

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
            return (a < 1)?`#${rh}${gh}${bh}${ah}`:`#${rh}${gh}${bh}`;

        }

        /**
         * Convert a rgb color to hsl
         * 
         * @param number r
         * @param number g
         * @param number b
         */
        convert_rgb_to_hsl = (r: number, g: number, b: number): number[] => {

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
         * @param params_type params
         * @param number r
         * @param number g
         * @param number b
         * @param number a
         */
        set_opacity = (params: params_type, r: number, g: number, b: number, a?: number): void => {

            // Get the opacity
            const opacity = params.selector.getElementsByClassName('ec-color-opacity-filter')[0] as HTMLElement;

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
         * Create opacity when the mouse is moved
         * 
         * @param MouseEvent e(event)
         * @param params_type params
         * @param function callback
         */
        create_opacity = (e: MouseEvent, params: params_type, callback: (hex: string) => void): void => {

            // Get target
            const target = e.target as HTMLElement;

            // Get filter
            const filter: Element = params.selector.getElementsByClassName('ec-color-opacity-filter-active')[0];

            // Get filter rect
            const filter_rect: DOMRect = filter.getBoundingClientRect();

            // Check if the mouse is over filter
            if ( ((e.clientX - filter_rect.x) >= 0) && ((e.clientX - filter_rect.x) <= (filter_rect.width - 4)) ) {

                // Set left
                const left: number = ((e.clientX - filter_rect.x) < 1)?0:(e.clientX - filter_rect.x);

                // Set left position
                filter.getElementsByTagName('span')[0].style.cssText = 'left: ' + left + 'px;';

                // Get the slider width
                const slider_width: number = (100 - ((((filter_rect.width - 4) - left) / (filter_rect.width - 4)) * 100));

                // Get the slider opacity
                const slider_opacity: string = ((100 - Math.round(slider_width)) < 10)?'0.1' + (100 - Math.round(slider_width)):((100 - Math.round(slider_width)) < 100)?'0.' + (100 - Math.round(slider_width)):'1';

                // Get color input
                const color_input = target.closest('.ec-grid')!.getElementsByClassName('ec-color-input') as HTMLCollectionOf<HTMLInputElement>;

                // Check if color input exists
                if ( color_input!.length > 0 ) {

                    // Get value
                    const value: string | undefined = color_input[0]?.value;

                    // Check if value exists
                    if ( value ) {

                        // Convert color to rgba
                        const rgba_color: {r: number, g: number, b: number, a?: number} = this.convert_hex_to_rgb(value.slice(0, 7));

                        // Prepare the rgba
                        const rgba: string = 'rgba(' + rgba_color['r'] + ', ' + rgba_color['g'] + ', ' + rgba_color['b'] + ', ' + slider_opacity + ')';

                        // Set validation rules
                        const is_valid: any = rgba.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
                        
                        // Verify if the rgba is valid
                        if ( is_valid ) {

                            // Extract the rgba
                            const [, r, g, b, a] = is_valid.map(Number);

                            // Convert to hex color
                            const hex: string = this.convert_rgb_to_hex(r, g, b, a || 1);

                            // Change the button color
                            callback(hex);
                            
                        }

                    }

                }

            }

        }

        /**
         * Draw a gradient
         * 
         * @param params_type params
         * @param any rgb_color
         */
        draw_gradient = (params: params_type, rgb_color: any): void => {

            // Convert rgb to hsl
            const hsl: any = this.convert_rgb_to_hsl(rgb_color['r'], rgb_color['g'], rgb_color['b']);

            // Get the gradient element
            const gradient: any = params.selector.getElementsByClassName('ec-color-gradient-selector')[0];

            // Get the gradient 2d context
            const gradient_2d: any = gradient.getContext('2d', {willReadFrequently: true});

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
         * @param params_type params
         */
        draw_filter = (params: params_type): void => {

            // Get the filter element
            const filter: any = params.selector.getElementsByClassName('ec-color-gradient-filter')[0];

            // Get the filter 2d context
            const filter_2d: any = filter.getContext('2d', {willReadFrequently: true});

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
         * @param MouseEvent e(event)
         * @param params_type params
         * @param function callback
         */
        get_gradient_color = (e: MouseEvent, params: params_type, callback: (hex: string) => void): void => {

            // Get target
            const target = e.target as HTMLElement;

            // Get the gradient
            const gradient: HTMLCanvasElement | null = target.closest('.ec-color-gradient-selector');

            // Check gradient is not null
            if ( gradient instanceof HTMLCanvasElement ) {

                // Create an image
                const img: any = new Image();

                // Set src
                img.src = gradient.toDataURL();

                // Wait for image to be loaded
                img.onload = (): void => {

                    // Get the gradient rect
                    const gradient_rect: DOMRect = gradient!.getBoundingClientRect();

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
                    canvas.getContext('2d', {willReadFrequently: true}).drawImage(img, 0, 0, img.width, img.height);

                    // Get the image data
                    const image_data: any = canvas.getContext('2d', {willReadFrequently: true}).getImageData(e.offsetX, e.offsetY, 1, 1).data;

                    // Get the color input
                    const input: any = params.selector.getElementsByClassName('ec-color-input')[0];
                    
                    // Change the color input value
                    input.value = "#" + ((1 << 24) | (image_data[0] << 16) | (image_data[1] << 8) | image_data[2]).toString(16).slice(1).toUpperCase();

                    // Change the button color
                    callback(input.value);

                    // Set opacity
                    this.set_opacity(params, image_data[0], image_data[1], image_data[2]);

                };

            }

        }

        /**
         * Get filter color
         * 
         * @param MouseEvent e(event)
         * @param params_type params
         * @param function callback
         */
        get_filter_color = (e: MouseEvent, params: params_type, callback: (hex: string) => void): void => {

            // Extract target
            const target = e.target as HTMLElement;

            // Get the gradient
            const gradient: HTMLCanvasElement | null = target.closest('.ec-color-gradient-filter');

            // Check if gradient exists
            if ( gradient ) {

                // Get the filter 2d context
                const filter_2d: any = gradient.getContext('2d', {willReadFrequently: true});

                // Get the image data
                const image_data: any = filter_2d.getImageData(e.offsetX, e.offsetY, 1, 1).data;

                // Get the color input
                const input: any = params.selector.getElementsByClassName('ec-color-input')[0];
                
                // Change the color input value
                input.value = "#" + ((1 << 24) | (image_data[0] << 16) | (image_data[1] << 8) | image_data[2]).toString(16).slice(1).toUpperCase();

                // Change the button color
                callback(input.value);

                // Change the filter color
                this.draw_gradient(params, {
                    r: image_data[0],
                    g: image_data[1],
                    b: image_data[2]
                });

                // Set opacity
                this.set_opacity(params, image_data[0], image_data[1], image_data[2]);

            }

        }

        /**
         * Remove dropdown
         * 
         * @param MouseEvent e(event)
         * @param params_type params
         */
        remove_dropdown = (e: MouseEvent, params: params_type): void => {
                
            // Check if ec-color-box exists
            if ( params.selector.getElementsByClassName('ec-color-box').length > 0 ) {

                // Save target
                const target = e.target as HTMLElement;

                // Check for target
                if ( target !== null ) {

                    // Check if ec-dropdown is closest
                    if ( !target.closest('.ec-dropdown') ) {

                        // Verify if color active exists
                        if ( params.selector.getElementsByClassName('ec-button-color-active').length > 0 ) {

                            // Remove the class ec-button-color-active
                            params.selector.getElementsByClassName('ec-button-color-active')[0].classList.remove('ec-button-color-active');

                        }

                        // Get the color box
                        const color_box: Element = params.selector.getElementsByClassName('ec-color-box')[0];

                        // Add the hide class
                        color_box.classList.add('ec-dropdown-hide');

                        // Set pause
                        setTimeout((): void => {

                            // Remove color box
                            color_box.remove();

                        }, 300);

                    }

                }

            }

        }

    }

}