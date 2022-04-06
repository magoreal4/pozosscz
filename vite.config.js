const path = require('path');
const { defineConfig } = require('vite')
module.exports = defineConfig({
    build: {
        outDir: path.resolve(__dirname, 'static/js'),
        minify: true,
        // sourcemap: 'hidden',
        rollupOptions: {
            output: {
                entryFileNames: 'main.js',
                format: 'iife',
                // assetFileNames: `[name].[ext]`,
              },
            input: './src/js/index-home.js',
        }
    }
});

