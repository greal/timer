const mix = require('laravel-mix');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

mix.webpackConfig({
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		// Ignore all locale files of moment.js
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// Если нужны некоторые локали
		// new webpack.IgnorePlugin(/^\.\/locale\/(en|de)\.js$/, /moment$/)
	],
});

mix.js('src/js/app.js', 'js')
	.postCss('src/css/styles.css', 'css')
	.setPublicPath('assets');

mix.options({
	extractVueStyles: true, // Extract .vue component styling to file, rather than inline.
//  globalVueStyles: file, // Variables file to be imported in every component.
//  processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//  purifyCss: false, // Remove unused CSS selectors.
//  terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
	postCss: [
		require('postcss-nested')
	] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
});

mix.extract([
	'vue',
	'vuex',
	'moment',
	'moment-duration-format',
	'favico.js',
	'setimmediate',
	'process'
], 'js/vendor.js');

mix.disableNotifications();

if (mix.inProduction()) {
	mix.version();
} else {
/*	mix.version().webpackConfig({
		devtool: 'cheap-module-source-map'
	});
*/
	// https://browsersync.io/docs/options
	/*mix.browserSync({
		proxy: 'timer-vue.local'
	});*/
}

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
