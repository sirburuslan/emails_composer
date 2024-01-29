/**
 * @file Styles
 * @package ec
 *
 * @author Ruslan Sirbu
 * @version 0.0.1
 * @updated 2023-12-30
 *
 * This file contains the functions to read and create the styles
 */

// Import inc
import {
    get_fonts_link
} from './inc.index.js';

/**
 * Get general styles
 * 
 * @param string scope
 * 
 * @return string response
 */
export const get_styles = (scope: string): string => {

    // Styles
    let styles: string = '';

    // Verify if the scope is template
    if ( scope === 'template' ) {

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Add content
        style.textContent = `

            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&family=Didact+Gothic&family=Work+Sans:wght@200;300;400;500&display=swap');

            body {
                padding-right: 0;
                overflow: visible;
                height: 100%;
                color: #12130f;
            }

            body::-webkit-scrollbar {
                width: 4px;
                height: 4px;
            }
            
            body::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: transparent;
            }
            
            body::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: transparent;
            }

            body.ec-composer-template-preview {
                pointer-events: none;
                user-select: none;
            }

            body [contenteditable="true"] {
                outline: none;
            }
            
            body table {
                font-size: inherit;
            }

            body a {
                text-decoration: none;
                color: #2984ff;
            }

            .ec-disable-mouse * {
                pointer-events: none !important;
            }

            .ec-composer-template {
                margin: 0 10px 300px !important;
                padding-bottom: 100px !important;
            }

            .ec-composer-template .ec-composer-template-row td {
                vertical-align: top;
            }   
            
            @media only screen and (max-width: 600px) {

                .ec-composer-template-row > tbody > tr {
                    display: block;
                }

                .ec-composer-template-row > tbody > tr > td {
                    display: block;
                    width: 100% !important;
                }

            }

            .ec-composer-template .ec-composer-template-content-line-temp-show {
                animation: 0.3s ec-show-content ease-in-out forwards; 
            }            

            .ec-composer-template .ec-composer-template-content-line-drop {
                position: relative;
                width: 100%;
                outline: 1px solid #d7b740;
                opacity: 0;
                transition: opacity 0.3s ease-in;
            }

            .ec-composer-template .ec-composer-template-content-line-drop.ec-composer-template-content-line-drop-active {
                opacity: 1;
            }           
            
            .ec-composer-template .ec-composer-template-content-line-drop > span {
                position: absolute;
                top: -9px;
                left: 50%;
                z-index: 9999;
                margin-left: -24px;
                width: 20px;
                height: 19px;
                border-radius: 3px;
                text-align: center;
                font-size: 17px;
                color: #FFFFFF;
                background-color: #d7b740;
            } 
            
            .ec-composer-template .ec-composer-template-content-line {
                padding: 0 15px;
                box-sizing: border-box;
                width: 100%;
                outline: none;
                outline-offset: -2px;
            }

            .ec-composer-template .ec-composer-template-content-line:hover {
                position: relative;
            }

            .ec-composer-template .ec-composer-template-content-line.ec-composer-template-content-line-drag-active {
                position: absolute;
                right: 0;
                left: 0;
                cursor: grab;
            }

            .ec-composer-template button {
                cursor: pointer;
            }   

            .ec-composer-template .ec-composer-template-content-line .ec-composer-template-content-move-button {
                display: none;
                position: absolute;
                z-index: 3;
                top: calc(50% - 15px);
                left: 0;
                width: 27px;
                height: 30px;
                border: 0;
                border-radius: 0 3px 3px 0;
                color: #FFFFFF;
                background-color: #d7b740;
                cursor: grab;
            }
            
            .ec-composer-template button > * {
                font-size: 22px;
                pointer-events: none;
            }
            
            .ec-composer-template .ec-composer-template-content-buttons-group {
                display: none;
                position: absolute;
                top: 50%;
                right: 0;
                z-index: 3;
                margin-top: -15px;
                border-radius: 3px 0 0 3px;
                overflow: hidden;
            }

            .ec-composer-template .ec-composer-template-content-buttons-group > button {
                width: 35px;
                height: 30px;
                border: 0;
                color: #FFFFFF;
                background-color: #d7b740;
            }

            .ec-composer-template .ec-composer-template-content-line:only-child .ec-composer-template-content-buttons-group > .ec-composer-template-content-delete-button {
                opacity: 0.5;
                pointer-events: none;
            }
            
            .ec-composer-template .ec-composer-template-content-buttons-group > button:hover {
                background-color: rgba(215, 183, 64, 0.8);
            }

            .ec-composer-template .ec-composer-template-content-line:hover {
                outline: 2px solid #d7b740;
            }          
 
            .ec-composer-template .ec-composer-template-content-line:hover .ec-composer-template-content-move-button,
            .ec-composer-template .ec-composer-template-content-line:hover .ec-composer-template-content-buttons-group {
                display: block;
            }

            .ec-composer-template .ec-composer-template-content-line.ec-composer-template-content-line-drag-active {
                outline: none;
            }

            .ec-composer-template .ec-composer-template-content-line.ec-composer-template-content-line-drag-active .ec-composer-template-content-move-button,
            .ec-composer-template .ec-composer-template-content-line.ec-composer-template-content-line-drag-active .ec-composer-template-content-buttons-group {
                display: none;
            }   
            
            .ec-composer-template .ec-composer-template-content-line:has(.ec-composer-template-cell:hover) {
                outline: none;
            }
            
            .ec-composer-template .ec-composer-template-content-line:has(.ec-composer-template-cell:hover) .ec-composer-template-content-move-button,
            .ec-composer-template .ec-composer-template-content-line:has(.ec-composer-template-cell:hover) .ec-composer-template-content-buttons-group {
                display: none;
            }  

            body:has(.ec-element-content.ec-composer-element-drag-active) .ec-composer-template .ec-composer-template-content-line,
            body:has(.ec-element-content ~ .ec-composer-template-cell-drop) .ec-composer-template .ec-element-content {
                position: unset;
                outline: none;
            }

            body:has(.ec-element-content.ec-composer-element-drag-active) .ec-composer-template .ec-composer-template-content-move-button,
            body:has(.ec-element-content.ec-composer-element-drag-active) .ec-composer-template .ec-composer-template-content-buttons-group {
                display: none;
            }
            
            .ec-composer-template .ec-element-content .ec-element-content-data:not([contenteditable]) > * {
                pointer-events: none;
            } 

            .ec-composer-template .ec-element-content[data-name="product"] .ec-element-content-data:not([contenteditable]) > * {
                pointer-events: all;
            }             
            
            .ec-composer-template .ec-element-content .ec-element-content-data .ec-element-cover {
                display: block;
                width: 100%;
                height: 72px;
                text-align: center;
                background-color: #f3f3f3;
            }
            
            .ec-composer-template .ec-element-content .ec-element-content-data .ec-element-cover > * {
                margin-top: 11px;
                font-size: 48px;
                color: #cccccc;
            }

            .ec-composer-template .ec-element-content .ec-composer-element-buttons-group {
                display: none;
                position: absolute;
                right: 0;
                bottom: -30px;
                z-index: 3;
                margin-top: -15px;
                border-radius: 0 0 3px 3px;
                overflow: hidden;
            }

            .ec-element-content.ec-composer-element-drag-active {
                position: absolute;
                right: 0;
                left: 0;
                cursor: grab;
            }

            .ec-element-content.ec-composer-element-drag-active .ec-composer-element-buttons-group {
                display: none;
            }

            .ec-composer-template .ec-element-content .ec-composer-element-buttons-group > button {
                width: 35px;
                height: 30px;
                border: 0;
                color: #FFFFFF;
                background-color: #f18f01;
            }

            .ec-composer-template .ec-element-content .ec-composer-element-buttons-group > button.ec-composer-element-move-button {
                cursor: grab;
            }            

            .ec-composer-template .ec-element-content .ec-composer-element-buttons-group > button:hover {
                background-color: rgba(241, 143, 1, 0.8);
            }
            
            .ec-composer-template .ec-element-content:hover,
            .ec-composer-template .ec-element-content.ec-element-content-active {
                position: relative;
                box-sizing: border-box;
                outline: 2px solid #f18f01;
                outline-offset: -2px;
            }
            
            .ec-composer-template .ec-element-content:hover .ec-composer-element-buttons-group,
            .ec-composer-template .ec-element-content.ec-element-content-active .ec-composer-element-buttons-group {
                display: block;
            }

            body:has(.ec-element-content.ec-composer-element-drag-active) .ec-composer-template .ec-element-content,
            body:has(.ec-element-content ~ .ec-composer-template-cell-drop) .ec-composer-template .ec-element-content {
                position: unset;
                outline: none;
            }

            body:has(.ec-element-content.ec-composer-element-drag-active) .ec-composer-template .ec-composer-element-buttons-group,
            body:has(.ec-element-content ~ .ec-composer-template-cell-drop) .ec-composer-template .ec-composer-element-buttons-group {
                display: none;
            }

            .ec-composer-template .ec-composer-template-cell .ec-composer-template-cell-placeholder {
                display: block;
                padding: 2px;
                width: 100%;
                height: 70px;
                text-align: center;
                text-decoration: none;
                font-size: 24px;
            }

            .ec-composer-template .ec-composer-template-row .ec-composer-template-cell:has(.ec-composer-template-cell-placeholder) {
                padding: 0;
                background-color: #FFFFFF;
            }

            .ec-composer-template .ec-composer-template-cell .ec-composer-template-cell-placeholder > span {
                display: block;
                width: calc(100% - 6px);
                height: 68px;
                border: 1px dashed #dcdee2;
                background-color: #fdfdfd;
            }
            
            .ec-composer-template .ec-composer-template-cell .ec-composer-template-cell-placeholder .ec-composer-template-cell-placeholder-icon {
                display: block;
                line-height: 45px;
                color: #5b567f;
            }
            
            .ec-composer-template .ec-composer-template-cell .ec-composer-template-cell-placeholder .ec-composer-template-cell-placeholder-text {
                display: block;
                margin-top: -2px;
                font-family: 'Poppins', sans-serif;
                font-size: 12px;
                color: #8e94a2;
            }

            .ec-composer-template .ec-composer-template-cell-drop {
                position: relative;
                width: 100%;
                outline: 1px solid #f18f01;
                opacity: 0;
                transition: all 0.3s ease-in;
            }

            .ec-composer-template .ec-composer-template-cell-drop.ec-composer-template-cell-drop-active {
                opacity: 1;
            }

            .ec-composer-template .ec-composer-template-cell-drop > span {
                position: absolute;
                top: -9px;
                left: 50%;
                margin-left: -10px;
                width: 20px;
                height: 19px;
                border-radius: 3px;
                text-align: center;
                font-size: 17px;
                color: #FFFFFF;
                background-color: #f18f01;
            } 

            .ec-show-content {
                animation: 0.3s ec-show-content ease-in-out forwards; 
            }

            .ec-hide-content {
                animation: 0.3s ec-hide-content ease-in-out forwards; 
            }
            
            @keyframes ec-show-content {

                0% {
                    transform: scaleY(0.4);
                    opacity: 0;
                }
            
                100% {
                    transform: scaleY(1);
                    opacity: 1;
                }
            
            }

            @keyframes ec-hide-content {

                0% {
                    transform: scaleY(1);
                    opacity: 1;
                }
            
                100% {
                    transform: scaleY(0.4);
                    opacity: 0;
                }
            
            }   

        `;

        styles = style.outerHTML;

    } else if ( scope === 'html' ) {

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Add content
        style.textContent = `

            body {
                margin: 0 8px;
            }

            body [contenteditable="true"] {
                outline: none;
                scrollbar-width: none;
                -ms-overflow-style: none;                
            }

            body::-webkit-scrollbar {
                display: none;
            }

            .ec-composer-code-editor {
                display: flex;
                position: absolute;
                top: 0;
                right: 5px;
                bottom: 0;
                left: 0;
            }
            
            .ec-composer-code-index {
                padding-top: 5px;
                width: 30px;
                user-select: none;
                overflow-y: auto;
                overflow-x: hidden;
                scrollbar-width: none;
                -ms-overflow-style: none;     
            }

            .ec-composer-code-index::-webkit-scrollbar {
                display: none;
            }

            .ec-composer-code-editor-line-index {
                box-sizing: border-box;
                padding: 0 2px 0 0;
                min-height: 22px;
                line-height: 22px;
                text-align: right;
                font-family: system-ui;
                font-size: 11px;
                font-weight: 600;
                color: #FFFFFF;
                overflow-y: auto;
            }

            .ec-composer-code-lines {
                margin-left: 3px;
                padding: 5px 0 0 0;
                width: calc(100% - 33px);
                overflow: auto;
            }

            .ec-composer-code-lines::-webkit-scrollbar-corner {
                background-color: #20201d;
            }

            .ec-composer-code-lines::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            .ec-composer-code-lines::-webkit-scrollbar-track {
                width: 6px;
                height: 6px;
            }
            
            .ec-composer-code-lines::-webkit-scrollbar-thumb {
                width: 6px;
                height: 6px;
                border-radius: 6px;
                background-color: #FFFFFF;
            } 

            .ec-composer-code-editor-line {
                width: auto;
                min-height: 23px;
                animation: ec-composer-code-editor-line-new 0.1s forwards;
            }
            
            @keyframes ec-composer-code-editor-line-new {

                0% {
                    opacity: 0;
                    caret-color: transparent;   
                }

                99% {
                    opacity: 0;
                    caret-color: transparent;   
                }

                100% {
                    opacity: 1;
                    caret-color: auto;   
                }

            }

            .ec-composer-code-editor-line-code {
                display: inline;
                position: relative;
                box-sizing: border-box;
                white-space: nowrap;
                padding: 0 5px 0;
                width: auto;
                min-height: 23px;
                line-height: 22px;
                letter-spacing: 0.6px;
                font-family: system-ui;
                font-size: 11px;
                font-weight: 600;
                color: #e8eaed;
            }

            .ec-composer-code-editor-line-code > * {
                display: inline;
            }

            .ec-code-tag-start-open:has(+ .ec-code-tag-start-name + .ec-code-tag-close),
            .ec-code-tag-start-name:has(~ .ec-code-tag-start-open, + .ec-code-tag-close),
            .ec-code-tag-start-open + .ec-code-tag-start-name + .ec-code-tag-close,
            .ec-code-tag-start-open:has(+ .ec-code-tag-start-name + .ec-code-whitespace),
            .ec-code-tag-start-name:has(~ .ec-code-tag-start-open, + .ec-code-whitespace),                    
            .ec-code-tag-end-open:has(+ .ec-code-tag-end-slash + .ec-code-tag-end-name + .ec-code-tag-close),
            .ec-code-tag-end-slash:has(~ .ec-code-tag-end-open, + .ec-code-tag-end-name + .ec-code-tag-close),
            .ec-code-tag-end-open + .ec-code-tag-end-slash + .ec-code-tag-end-name:has(+ .ec-code-tag-close),
            .ec-code-tag-end-open + .ec-code-tag-end-slash + .ec-code-tag-end-name + .ec-code-tag-close,
            .ec-code-tag-meta-value + .ec-composer-code-editor-caret + .ec-code-tag-close,
            .ec-code-tag-meta-name + .ec-composer-code-editor-caret + .ec-code-tag-close,                        
            .ec-code-tag-meta-name + .ec-composer-code-editor-caret + .ec-code-tag-close,
            .ec-code-tag-end-slash + .ec-composer-code-editor-caret + .ec-code-tag-close,
            .ec-code-whitespace + .ec-code-tag-close,
            .ec-code-tag-meta-value + .ec-code-tag-close,
            .ec-code-tag-meta-name + .ec-code-tag-close,
            .ec-code-tag-end-slash + .ec-code-tag-close,
            .ec-code-string + .ec-code-tag-close,           
            .ec-code-tag-end-slash:has(+ .ec-code-tag-close) {
                color: #20a4f3;
            }
            
            .ec-code-hidden-comment-open,
            .ec-code-hidden-comment-exclamation,
            .ec-code-hidden-comment-line,
            .ec-code-hidden-comment-text,
            .ec-code-hidden-comment-whitespace,
            .ec-code-hidden-comment-condition-rules,
            .ec-code-hidden-comment-condition-parenthese,
            .ec-code-hidden-comment-tag-end-open,
            .ec-code-hidden-comment-tag-end-slash,
            .ec-code-hidden-comment-tag-start-name,
            .ec-code-hidden-comment-tag-meta-name,
            .ec-code-hidden-comment-tag-meta-equal,
            .ec-code-hidden-comment-tag-meta-value,
            .ec-code-hidden-comment-tag-close,
            .ec-code-hidden-comment-tag-end-name,
            .ec-code-hidden-comment-close {
                color: #c1cfda;
            }

            .ec-code-tag-meta-name,
            .ec-code-tag-meta-equal {
                color: #b9d9eb;
            }

            .ec-code-tag-meta-value,
            .ec-code-tag-meta-value + .ec-code-string,
            .ec-code-tag-meta-value-slash,
            .ec-code-tag-meta-value-slash + .ec-code-tag-meta-value {
                color: #f6be9a;
            }

        `;

        styles = style.outerHTML;

    } else if ( scope === 'css' ) {

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Add content
        style.textContent = `

            body {
                margin: 0 8px;
            }

            body [contenteditable="true"] {
                outline: none;
                scrollbar-width: none;
                -ms-overflow-style: none;                
            }

            body::-webkit-scrollbar {
                display: none;
            }

            .ec-composer-code-editor {
                display: flex;
                position: absolute;
                top: 0;
                right: 5px;
                bottom: 0;
                left: 0;
            }
            
            .ec-composer-code-index {
                padding-top: 5px;
                width: 30px;
                user-select: none;
                overflow-y: auto;
                overflow-x: hidden;
                scrollbar-width: none;
                -ms-overflow-style: none;     
            }

            .ec-composer-code-index::-webkit-scrollbar {
                display: none;
            }

            .ec-composer-code-editor-line-index {
                box-sizing: border-box;
                padding: 0 2px 0 0;
                min-height: 22px;
                line-height: 22px;
                text-align: right;
                font-family: system-ui;
                font-size: 11px;
                font-weight: 600;
                color: #FFFFFF;
                overflow-y: auto;
            }

            .ec-composer-code-lines {
                margin-left: 3px;
                padding: 5px 0 0 0;
                width: calc(100% - 33px);
                overflow: auto;
            }

            .ec-composer-code-lines::-webkit-scrollbar-corner {
                background-color: #20201d;
            }

            .ec-composer-code-lines::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            .ec-composer-code-lines::-webkit-scrollbar-track {
                width: 6px;
                height: 6px;
            }
            
            .ec-composer-code-lines::-webkit-scrollbar-thumb {
                width: 6px;
                height: 6px;
                border-radius: 6px;
                background-color: #FFFFFF;
            } 

            .ec-composer-code-editor-line {
                width: auto;
                min-height: 23px;
                animation: ec-composer-code-editor-line-new 0.1s forwards;
            }
            
            @keyframes ec-composer-code-editor-line-new {

                0% {
                    opacity: 0;
                    caret-color: transparent;   
                }

                99% {
                    opacity: 0;
                    caret-color: transparent;   
                }

                100% {
                    opacity: 1;
                    caret-color: auto;   
                }

            }

            .ec-composer-code-editor-line-code {
                display: inline;
                position: relative;
                box-sizing: border-box;
                white-space: nowrap;
                padding: 0 5px 0;
                width: auto;
                min-height: 23px;
                line-height: 22px;
                letter-spacing: 0.6px;
                font-family: system-ui;
                font-size: 11px;
                font-weight: 600;
                color: #e8eaed;
            }

            .ec-composer-code-editor-line-code > * {
                display: inline;
            }

            .ec-code-css-comment {
                color: #cbd2dd;
            }
            
            .ec-code-css-text {
                color: #d7c0ae;
            }            

            .ec-code-css-curly-bracket-open,
            .ec-code-css-curly-bracket-close {
                color: #ead637;
            }
            
            .ec-code-css-curly-bracket-open {
                margin-left: 5px;
            }

            .ec-code-css-dots,
            .ec-code-css-end {
                color: #b1bfbf;
            }

            .ec-code-css-text:has(+ .ec-code-css-dots) {
                color: #c2e1ff;
            } 
            
            .ec-code-css-text + .ec-code-css-dots + .ec-code-css-text {
                color: #c39a93;
            } 

            .ec-code-css-at:has(+ .ec-code-css-media),
            .ec-code-css-at + .ec-code-css-media,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text,
            .ec-code-css-at:has(+ .ec-code-css-import),
            .ec-code-css-at + .ec-code-css-import {
                color: #66c3ff;
            }

            .ec-code-css-dots:has(+ .ec-code-css-root),
            .ec-code-css-dots + .ec-code-css-root {
                color: #e88c8c;
            }            

            .ec-code-css-at + .ec-code-css-import + .ec-code-css-text {
                color: #d7fcd4;
            }
            
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-round-bracket-open,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots + .ec-code-css-text + .ec-code-css-round-bracket-close,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text + .ec-code-css-round-bracket-open,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots + .ec-code-css-text + .ec-code-css-round-bracket-close {
                color: #d7fcd4;
            }

            .ec-code-css-at + .ec-code-css-media + .ec-code-css-round-bracket-open + .ec-code-css-text,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text + .ec-code-css-round-bracket-open + .ec-code-css-text {
                color: #b6cca1;
            }

            .ec-code-css-at + .ec-code-css-media + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots {
                color: #ebfef5;
            }  
            
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots + .ec-code-css-text,
            .ec-code-css-at + .ec-code-css-media + .ec-code-css-text + .ec-code-css-round-bracket-open + .ec-code-css-text + .ec-code-css-dots + .ec-code-css-text {
                color: #e09d90;
            }
            
            .ec-code-css-variable:has(+ .ec-code-css-text + .ec-code-css-dots),
            .ec-code-css-variable + .ec-code-css-text:has(+ .ec-code-css-dots) {
                color: #e88c8c;
            }

            .ec-code-css-comment2:has(+ .ec-code-css-text),
            .ec-code-css-comment2 + .ec-code-css-text {
                color: #cbd2dd;
            }            

        `;

        styles = style.outerHTML;

    } else if ( scope === 'default' ) {

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Set the scope
        style.setAttribute('data-scope', 'default');

        // Get the fonts link
        let fonts_link: string = get_fonts_link();

        // Add content
        style.textContent = `

            @import url('${fonts_link}');

            body {
                display: grid;
                margin: 0;
                min-height: 100vh;
            }

            table {
                margin: 0;
                padding: 0;
                border-collapse: collapse;
                border-spacing: 0;
            }
              
            th, td {
                padding: 0;
            }

            td:has(.ec-composer-template-row) {
                display: block;
                text-align: center;
            }

            .ec-composer-template {
                position: relative;
                margin: 0;
                font-family: 'Lato', sans-serif;
                font-size: 14px;
                background-color: transparent;
                transition: all 0.3s ease;
            }

            .ec-composer-template-editor.ec-composer-template {
                transform: scaleY(0);
                transform-origin: top;
            }

            .ec-composer-template * {
                margin: 0;
                padding: 0;
                border-collapse: collapse;
            } 
        
            .ec-composer-template-content-line {
                display: flex;
                justify-content: center;
            }
            
            .ec-composer-template-left .ec-composer-template-content-line {
                justify-content: start;
            }

            .ec-composer-template-center .ec-composer-template-content-line {
                justify-content: center;
            }  
            
            .ec-composer-template-right .ec-composer-template-content-line {
                justify-content: end;
            }            
            
            .ec-composer-template-content-line .ec-composer-template-content {
                display: inline-table;
                width: 100%;
            }

            .ec-composer-template-row {
                display: inline-table;
                width: 950px;
                max-width: 100%;
                background-color: transparent;
            }  

            .ec-composer-template .ec-composer-template-row td {
                vertical-align: top;
            }     
            
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(1) {
                width: 100%;
            }
            
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(2),
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(2) ~ .ec-composer-template .ec-composer-template-row td {
                width: 50%;
            }
            
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(3),
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(3) ~ .ec-composer-template .ec-composer-template-row td {
                width: 33.3333%;
            }
            
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(4),
            .ec-composer-template .ec-composer-template-row td:first-child:nth-last-child(4) ~ .ec-composer-template .ec-composer-template-row td {
                width: 25%;
            }

            .ec-composer-template .ec-composer-template-row .ec-composer-template-cell {
                box-sizing: border-box;
                width: 100%;
            }
            
            .ec-composer-template .ec-element-content .ec-element-content-data:not([contenteditable]) {
                display: flex;
                cursor: pointer;
            }

            .ec-element-content .ec-element-content-data {
                display: flex;
                box-sizing: border-box;
                width: 100%;
                flex-direction: column;
            }

            .ec-element-content[data-name="menu"] .ec-element-content-data > ul {
                max-width: fit-content;
            }             

            .ec-element-content[data-name="text"] p,
            .ec-element-content[data-name="text"] ul {
                margin-bottom: 15px;
                width: 100%;
            }  

            .ec-element-content[data-name="text"] .ec-element-content-data > *:last-child {
                margin: 0;
            }

            .ec-element-content[data-name="button"] .ec-element-content-data {
                display: inherit !important;
            }           
            
            .ec-element-content[data-name="button"] a {
                display: inline-block;
                box-sizing: border-box;
                text-decoration: none;
            }

            .ec-element-content[data-name="image"] a,
            .ec-element-content[data-name="video"] a {
                display: block;
                line-height: 0;
            }  

            .ec-element-content[data-name="icons"] img {
                width: fit-content;
            } 
            
            .ec-element-content[data-name="product"] .ec-element-product {
                display: grid;
                grid-template-columns: 20% 60% calc(20% - 60px);
                grid-gap: 10px;
                padding: 7px 0;
                border-bottom: 1px solid;
            }

            .ec-element-content[data-name="product"] .ec-element-cover {
                margin: 4px auto 0;
                width: 80% !important;
            }    
            
            .ec-element-content[data-name="product"] .ec-element-image {
                width: 100%;
                text-align: center;
            }            

            .ec-element-content[data-name="product"] .ec-element-product-image img {
                max-width: 100%;
                max-height: 80px;
            }

            .ec-element-content[data-name="product"] .ec-element-product-image,
            .ec-element-content[data-name="product"] .ec-element-product-price {
                display: flex;
            }

            .ec-element-content[data-name="product"] .ec-element-product-price h3 {
                width: 100%;
            }
            
            .ec-element-content[data-name="product"] .ec-element-product > * {
                pointer-events: all;
            }   

            @media only screen and (max-width: 949px) {
                
                .ec-composer-template-row {
                    width: 100%;
                }

            }
            
            @media only screen and (max-width: 600px) {

                .ec-composer-template-row > tbody > tr {
                    display: block;
                }

                .ec-composer-template-row > tbody > tr > td {
                    display: block;
                    width: 100% !important;
                }

            }

        `;

        styles = style.outerHTML;

    } else if ( scope === 'library' ) {

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Add content
        style.textContent = `

            .ec-display-block {
                display: block;
            } 
            
            .ec-display-inline-block {
                display: inline-block;
            }   
            
            .ec-display-none {
                display: none;
            }
            
            .ec-display-flex {
                display: flex;
            } 
            
            .ec-display-grid {
                display: grid;
            }
            
            .ec-no-list-bullets {
                list-style-type: none;
            }

        `;

        styles = style.outerHTML;

    }

    return styles;

}

/**
 * Prepare styles
 * 
 * @param string element_id
 * @param Array<{[key: string]: string | number}> with css properties
 * @param string element_styles
 * 
 * @return string with ready to use css or undefined
 */
export const prepare_styles = (element_id: string, properties: Array<{[key: string]: string | number}>, element_styles: string): string | undefined => {

    // Check if properties exists
    if ( properties.length > 0 ) {

        // Elements styles container
        let elements_styles: {[key: string]: Array<{[key: string]: number | string}>} = {};

        // Syles container
        let styles: string = '';

        // List the properties
        for ( let property of properties ) {

            // Save element name
            let element_name = property.element_name?property.element_name as string:'';

            // Remove element name
            delete property.element_name;               

            // Check if element name exists
            if ( element_name.length > 0 ) {

                // Verify if element's name is already saved
                if ( typeof elements_styles[element_name] !== 'undefined' ) {

                    // Save style
                    elements_styles[element_name].push({
                        [Object.keys(property)[0].replaceAll('_', '-')]: property[Object.keys(property)[0]]
                    });

                } else {

                    // Save style
                    elements_styles[element_name] = [{
                        [Object.keys(property)[0].replaceAll('_', '-')]: property[Object.keys(property)[0]]
                    }];

                }

                continue;

            }

            // Add property
            styles += `\n    ` + Object.keys(property)[0].replaceAll('_', '-') + ': ' + property[Object.keys(property)[0]] + `;`;

        }

        // Create style
        let style: HTMLElement = document.createElement('style');

        // Add element's id
        style.setAttribute('data-element', element_id);

        // Prepare the style 
        let css_style: string = `.ec-element-content[data-id="${element_id}"] .ec-element-content-data {`;

        // Append properties
        css_style += styles;

        // Close the bracklet
        css_style += `\n` + `}`;

        // Verify if elements with styles exists
        if ( Object.keys(elements_styles).length > 0 ) {

            // List the elements styles
            for ( let element of Object.keys(elements_styles) ) {

                // Add selector
                css_style += `\n.ec-element-content[data-id="${element_id}"] .ec-element-content-data ${element} {`;

                // Add breakline
                css_style += `\n`;

                // Verify if properties exists
                if ( elements_styles[element].length > 0 ) {

                    // List the properties
                    for ( let property of elements_styles[element] ) {

                        // Add property
                        css_style += `    ` + Object.keys(property)[0] + ': ' + Object.values(property)[0] + `;`;

                    }

                }

                // Close the bracklet
                css_style += `\n` + `}`;

            }

        }

        // Add additional styles
        css_style += element_styles;

        // Append media
        css_style += `\n@media only screen and (max-width: 600px) {`;

        // Add the selector
        css_style += `\n    .ec-element-content[data-id="${element_id}"] .ec-element-content-data {`;

        // Append properties
        css_style += `        ` + styles;

        // Close the bracklet
        css_style += `\n    }`;

        // Verify if elements with styles exists
        if ( Object.keys(elements_styles).length > 0 ) {

            // List the elements styles
            for ( let element of Object.keys(elements_styles) ) {

                // Add selector
                css_style += `\n    .ec-element-content[data-id="${element_id}"] .ec-element-content-data ${element} {`;

                // Add breakline
                css_style += `\n`;

                // Verify if properties exists
                if ( elements_styles[element].length > 0 ) {

                    // List the properties
                    for ( let property of elements_styles[element] ) {

                        // Add property
                        css_style += `        ` + Object.keys(property)[0] + ': ' + Object.values(property)[0] + `;`;

                    }

                }

                // Close the bracklet
                css_style += `\n    }`;

            }

        }

        // Close the media
        css_style += `\n}`;

        // Add content
        style.innerHTML = css_style;

        return style.outerHTML;

    }

}

/**
 * Get property value
 * 
 * @param CSSStyleSheet | null sheet
 * @param string element_id
 * @param string name
 * 
 * @return string
 */
export const get_property_value = (sheet: CSSStyleSheet | null, element_id: string, name: string): string => {

    // Property value
    let property_value: string = '';

    // Check if sheet exists
    if ( sheet !== null ) {
        
        // Verify if rules exists
        if ( sheet.cssRules.length > 0 ) {

            // List all rules
            for ( let rule of sheet.cssRules ) {

                // Check if is the element's selector
                if ( (rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data' ) {

                    // Get style
                    let style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                    // List the properties
                    for ( let property of (rule as CSSStyleRule).style ) {

                        // Verify if property is property_name
                        if ( property === name ) {

                            // Set property value
                            property_value = style.getPropertyValue(property); 

                        }                                    

                    }

                }

            }

        }

    }

    return property_value;

}

/**
 * Adapt the styles
 * 
 * @param string property_name
 * @param string | number property_value
 * 
 * @returns string with property value
 */
const adapt_styles = (property_name: string, property_value: string | number): string | number => {

    // Verify if property_name is justify-content
    if ( property_name === 'justify-content' ) {

        // Return property_value
        return property_value.toString().replace('left', 'start').replace('right', 'end');

    } else if ( property_name === 'align-self' ) {

        // Return property_value
        return property_value.toString().replace('left', 'start').replace('right', 'end');

    } else {

        return property_value;

    }

};

/**
 * Adapt the css selector
 * 
 * @param string selector
 * 
 * @returns string with property value
 */
const adapt_selector = (selector: string): string => {

    // Replace &gt;
    selector = selector.replaceAll('&gt;', '>');

    return selector;

};

/**
 * Update property value
 * 
 * @param CSSStyleSheet | null sheet
 * @param string element_id
 * @param string element_name
 * @param string property_name
 * @param string | number property_value
 * @param string device
 * 
 * @returns string with style
 */
export const update_property_value = (sheet: CSSStyleSheet | null, element_id: string, element_name: string, property_name: string, property_value: string | number, device: string): string => {

    // Style container
    let style_list: string = '';

    // Check if sheet exists
    if ( sheet !== null ) {
        
        // Verify if rules exists
        if ( sheet.cssRules.length > 0 ) {

            // List all rules
            for ( let rule of sheet.cssRules ) {

                // Check if rule is import
                if ( typeof (rule as CSSImportRule).href !== 'undefined' ) {

                    // Set start media
                    style_list += (rule as CSSImportRule).cssText;
                    continue;                         

                }

                // Verify if element_id is not empty
                if ( element_id ) {

                    // Check if media exists
                    if ( typeof (rule as CSSMediaRule).media !== 'undefined' ) {

                        // Set start media
                        style_list += '@media ' + (rule as CSSMediaRule).conditionText + ' {'; 

                        // Verify if is a mobile view
                        if ( (rule as CSSMediaRule).conditionText.replaceAll(' ', '').search('(max-width:600px)') > -1 ) {

                            // Verify if rules exists
                            if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                // List all rules
                                for ( let media_rule of (rule as CSSMediaRule).cssRules ) {

                                    // Set start selector
                                    style_list += adapt_selector((media_rule as CSSStyleRule).selectorText) + ' {'; 

                                    // Get style
                                    let style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                    // Property found counter
                                    let property_found: number = 0;

                                    // List the properties
                                    for ( let property of (media_rule as CSSStyleRule).style ) {
                                        
                                        // Check if is the element's selector
                                        if ( (((((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) || ((media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name)) && (property === property_name)) && (device === 'mobile') ) {
                                            
                                            // Set property value
                                            style_list += property + ': ' + adapt_styles(property, property_value) + ';';   
                                            
                                            // Mark property as found
                                            property_found = 1;

                                        } else {

                                            // Set property value
                                            style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                                        }                                  

                                    }

                                    // Verify if the property was found
                                    if ( (property_found < 1) && (device !== 'desktop') ) {

                                        // Verify if the property should be added
                                        if ( (((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) ) {

                                            // Set property value
                                            style_list += property_name + ': ' + adapt_styles(property_name, property_value) + ';';                              

                                        } else if ( (media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name ) {

                                            // Set property value
                                            style_list += property_name + ': ' + property_value + ';';     
                                            
                                        }

                                    }

                                    // Set end selector
                                    style_list += '}';

                                }

                            }

                        } else {

                            // Verify if rules exists
                            if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                // List all rules
                                for ( let media_rule of (rule as CSSMediaRule).cssRules ) {

                                    // Set start selector
                                    style_list += adapt_selector((media_rule as CSSStyleRule).selectorText) + ' {'; 

                                    // Get style
                                    let style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                    // Property found counter
                                    let property_found: number = 0;

                                    // List the properties
                                    for ( let property of (media_rule as CSSStyleRule).style ) {
                                        
                                        // Check if is the element's selector
                                        if ( (((((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) || ((media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name)) && (property === property_name)) && (device === 'mobile') ) {
                                            
                                            // Set property value
                                            style_list += property + ': ' + adapt_styles(property, property_value) + ';';     
                                            
                                            // Mark property as found
                                            property_found = 1;

                                        } else {

                                            // Set property value
                                            style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                                        }                                  

                                    }

                                    // Verify if the property was found
                                    if ( (property_found < 1) && (device !== 'desktop') ) {

                                        // Verify if the property should be added
                                        if ( (((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) ) {

                                            // Set property value
                                            style_list += property_name + ': ' + adapt_styles(property_name, property_value) + ';';                              

                                        } else if ( (media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name ) {

                                            // Set property value
                                            style_list += property_name + ': ' + property_value + ';';     
                                            
                                        }

                                    }

                                    // Set end selector
                                    style_list += '}';

                                }

                            }

                        }

                        // Set end style
                        style_list += '}';

                    } else {

                        // Set start selector
                        style_list += adapt_selector((rule as CSSStyleRule).selectorText) + ' {'; 
                        
                        // Get style
                        let style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                        // Property found counter
                        let property_found: number = 0;

                        // List the properties
                        for ( let property of (rule as CSSStyleRule).style ) {
                        
                            // Check if is the element's selector
                            if ( (((((rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) || ((rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name)) && (property === property_name)) && (device === 'desktop') ) {

                                // Set property value
                                style_list += property + ': ' + adapt_styles(property, property_value) + ';';  
                                
                                // Mark property as found
                                property_found = 1;

                            } else {

                                // Set property value
                                style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                            }

                        }

                        // Verify if the property was found
                        if ( (property_found < 1) && (device === 'desktop') ) {

                            // Verify if the property should be added
                            if ( (((rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) ) {

                                // Set property value
                                style_list += property_name + ': ' + adapt_styles(property_name, property_value) + ';';                              

                            } else if ( (rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name ) {

                                // Set property value
                                style_list += property_name + ': ' + property_value + ';';     
                                
                            }

                        }

                        // Set end selector
                        style_list += '}';

                    }

                } else {

                    // Check if media exists
                    if ( typeof (rule as CSSMediaRule).media !== 'undefined' ) {

                        // Set start media
                        style_list += '@media ' + (rule as CSSMediaRule).conditionText + ' {'; 

                        // Verify if is a mobile view
                        if ( (rule as CSSMediaRule).conditionText.replaceAll(' ', '').search('(max-width:600px)') > -1 ) {

                            // Verify if rules exists
                            if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                // List all rules
                                for ( let media_rule of (rule as CSSMediaRule).cssRules ) {

                                    // Set start selector
                                    style_list += adapt_selector((media_rule as CSSStyleRule).selectorText) + ' {'; 

                                    // Get style
                                    let style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                    // Property found counter
                                    let property_found: number = 0;

                                    // List the properties
                                    for ( let property of (media_rule as CSSStyleRule).style ) {
                                        
                                        // Check if is the element's selector
                                        if ( (((((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) || ((media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name)) && (property === property_name)) && (device === 'mobile') ) {
                                            
                                            // Set property value
                                            style_list += property + ': ' + adapt_styles(property, property_value) + ';';   
                                            
                                            // Mark property as found
                                            property_found = 1;

                                        } else {

                                            // Set property value
                                            style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                                        }                                  

                                    }

                                    // Verify if the property was found
                                    if ( (property_found < 1) && (device !== 'desktop') ) {

                                        // Verify if the property should be added
                                        if ( (((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) ) {

                                            // Set property value
                                            style_list += property_name + ': ' + adapt_styles(property_name, property_value) + ';';                              

                                        } else if ( (media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name ) {

                                            // Set property value
                                            style_list += property_name + ': ' + property_value + ';';     
                                            
                                        }

                                    }

                                    // Set end selector
                                    style_list += '}';

                                }

                            }

                        } else {

                            // Verify if rules exists
                            if ( (rule as CSSMediaRule).cssRules.length > 0 ) {

                                // List all rules
                                for ( let media_rule of (rule as CSSMediaRule).cssRules ) {

                                    // Set start selector
                                    style_list += adapt_selector((media_rule as CSSStyleRule).selectorText) + ' {'; 

                                    // Get style
                                    let style: CSSStyleDeclaration = (media_rule as CSSStyleRule).style;

                                    // Property found counter
                                    let property_found: number = 0;

                                    // List the properties
                                    for ( let property of (media_rule as CSSStyleRule).style ) {
                                        
                                        // Check if is the element's selector
                                        if ( (((((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) || ((media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name)) && (property === property_name)) && (device === 'mobile') ) {
                                            
                                            // Set property value
                                            style_list += property + ': ' + adapt_styles(property, property_value) + ';';     
                                            
                                            // Mark property as found
                                            property_found = 1;

                                        } else {

                                            // Set property value
                                            style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                                        }                                  

                                    }

                                    // Verify if the property was found
                                    if ( (property_found < 1) && (device !== 'desktop') ) {

                                        // Verify if the property should be added
                                        if ( (((media_rule as CSSStyleRule).selectorText.replaceAll(' ', '') === '.ec-element-content[data-id="' + element_id + '"].ec-element-content-data') && !element_name) ) {

                                            // Set property value
                                            style_list += property_name + ': ' + adapt_styles(property_name, property_value) + ';';                              

                                        } else if ( (media_rule as CSSStyleRule).selectorText.slice(-(' ' + element_name).length) === ' ' + element_name ) {

                                            // Set property value
                                            style_list += property_name + ': ' + property_value + ';';     
                                            
                                        }

                                    }

                                    // Set end selector
                                    style_list += '}';

                                }

                            }

                        }

                        // Set end style
                        style_list += '}';

                    } else {

                        // Set start selector
                        style_list += adapt_selector((rule as CSSStyleRule).selectorText) + ' {'; 
                        
                        // Get style
                        let style: CSSStyleDeclaration = (rule as CSSStyleRule).style;

                        // Property found counter
                        let property_found: number = 0;

                        // List the properties
                        for ( let property of (rule as CSSStyleRule).style ) {
                        
                            // Check if is the element's selector
                            if ( ((rule as CSSStyleRule).selectorText === element_name) && (property === property_name) ) {

                                // Set property value
                                style_list += property + ': ' + adapt_styles(property, property_value) + ';';  
                                
                                // Mark property as found
                                property_found = 1;

                            } else {

                                // Set property value
                                style_list += property + ': ' + style.getPropertyValue(property) + ';'; 

                            }

                        }

                        // Verify if the property should be added
                        if ( ((rule as CSSStyleRule).selectorText === element_name) && (property_found < 1) ) {

                            // Set property value
                            style_list += property_name + ': ' + property_value + ';';     
                            
                        }

                        // Set end selector
                        style_list += '}';

                    }

                }

            }

        }

    }

    return style_list;

}