import json from '@rollup/plugin-json';

export default {
    input: 'dist/index.js',
    output: {
        file: 'public/js/ec.js',
        format: 'es'
    },
    plugins: [
        json()
    ]
};