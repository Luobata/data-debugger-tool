import path from 'path'
import webpack from 'webpack'

export default {
    entry: {
        background: './src/background',
    },
    output: {
        path: path.join(__dirname, 'build'),
            filename: '[name].js'
    },
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            SRC: path.resolve(__dirname, '../src'),
            COMPONENTS: path.resolve(__dirname, '../src/components'),
            LIB: path.resolve(__dirname, '../src/lib')
        }
    },
    module: {
        rules: [],
    },
    
},
