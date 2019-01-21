module.exports = {
    outputDir:'dist',
    lintOnSave:false,
    devServer: {
        open: true,
        host: '192.168.1.102',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy:{
            '/api':{
                target:'https://api.apiopen.top',
                changeOrigin:true,
                ws:true,
                pathRewrite:{'^/api':''}
            }
        }
    }
}