var path = require('path');
 
module.exports = {
    mode: 'production',
    entry: './src/Validation/CustomValidator.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
		},
		optimization: {
			// We no not want to minimize our code.
			minimize: true
		}
}