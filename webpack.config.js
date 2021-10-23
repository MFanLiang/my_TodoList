//引入webpack.config.dev.js配置文件（webpack核心开发配置文件）
const dev = require('./webpack.config.dev')

//引入webpack.config.prod.js配置文件（webpack核心生产配置文件）
const prod = require('./webpack.config.prod')

//运行是npm run 工程命令时，获取package.json中的配置命令键名
// "scripts": {
//   "dev": "npx webpack-dev-server --open",
//   "start": "npm run dev",
//   "build": "npx webpack --mode=production"
// },

const TARGET = process.env.npm_lifecycle_event;
// console.log("TARGET", TARGET);
if(TARGET === 'dev') {
    module.exports = dev
}
if(TARGET === 'build') {
    module.exports = prod
}