module.exports = {
    outputDir:'dist',
    lintOnSave:false,
    devServer: {
        open: true,
        host: '192.168.1.104',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy:{
            '/api':{
                target:'http://221.229.200.43:9001',
                changeOrigin:true,
                ws:true,
                pathRewrite:{'^/api':''}
            }
        }
    }
}