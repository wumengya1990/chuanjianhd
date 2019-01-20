module.exports = {
    baseUrl: '/',
    outputDir:'dist',
    lintOnSave:false,
    devServer: {
        open: true,
        host: '192.168.1.100',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null
    }

}