// vue.config.js
module.exports = {
    // options...
    // baseUrl:'',
    devServer: {
        proxy: 'http://localhost:8080'
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? ''
        : '/',
    outputDir:'dist',
    indexPath:'index.html',
    integrity:false,
    lintOnSave:false,
    css:{
        extract:true,
        sourceMap:true,
        requireModuleExtension:true,
    }
};