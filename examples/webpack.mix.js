let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('bootstrap-3.4.0/js/app.js', 'bootstrap-3.4.0/outputforb3.4.js');
mix.js('bootstrap-4.0.0/js/app.js', 'bootstrap-4.0.0/outputforb4.x.js');
