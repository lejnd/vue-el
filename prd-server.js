const express = require('express');
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const path = require('path');
const favicon = require('serve-favicon');

const port = process.env.PORT || 8000;

const router = express.Router();
const app = express();

morgan.format('prd', '[prd] :method :url :status');
app.use(morgan('prd'));

app.use(express.static('./dist'));
app.use(favicon('./static/logo-48.png'));

const proxyConfigArr = [{
    url: ['/api'],
    config: {
        target: 'http://localhost:60001', // target host
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
            '^/api': '' // remove base path
        },
        router: {
        },
        onError: function(err, req, res) {
            if (err) {
                console.error(err.stack);
            }
        },
        onProxyRes: function(proxyRes, req, res) {
            //console.log(proxyRes);
        },
        onProxyReq: function(proxyReq, req, res) {
            //console.log(proxyReq);
        }
    }
}];

proxyConfigArr.forEach((proxyConfig) => {
    app.use(proxyConfig.url, proxy(proxyConfig.config));
})

router.all('/*', (req, res) => {
    res.sendFile(path.resolve('./dist/index.html'));
})

app.use('/',router)

// 以下都是启动服务
const net = require('net')
const chalk = require('chalk');
const shell = require('shelljs');

const log = {
    success: function(data, ...args) {
        console.log(chalk.green(data, args))
    },
    error: function(data, ...args) {
        console.log(chalk.red(data, args))
    },
    info: function(data, ...args) {
        console.log(chalk.white(data, args))
    }
}

let listenPort = (app, port) => {
    app.listen(port, () => {
        console.log(`服务启动成功 localhost:${port}`);
    })
}

let killPort = function(port) {
    let promise = new Promise(function(resolve, reject) {
        try {
            let processId = Number(shell.exec(`lsof -t -s TCP:LISTEN -i:${port}`))
            if (processId) {
                log.info(`正在干死进程 ${processId}`)
                shell.exec(`kill ${processId}`, function() {
                    log.success(`成功干死进程 ${processId}`)
                    setTimeout(function() {
                        resolve()
                    }, 1000)
                })
            } else {
                reject('没找到进程，如果是以root权限运行的，需手动杀死进程')
            }
        } catch (e) {
            reject(e)
        }
    })
    return promise
}

let checkPort = function(port) {
    let server = net.createServer().listen(port)
    let promise = new Promise(function(resolve, reject) {
        server.on('listening', function() {
            server.close()
        })
        server.on('error', function(error) {
            let errorMessage = error.code;
            switch (error.code) {
                case 'EADDRINUSE':
                    errorMessage = `端口 ${port} 被占用`;
                    break
                case 'EACCES':
                    errorMessage = `没有权限监听 ${port} 端口`
                    break
            }
            reject(errorMessage)
        })
        server.on('close', function() {
            resolve()
        })
    })

    return promise
}

module.exports = ((port)=>{
    checkPort(port)
        .then(function() {
            listenPort(app, port)
        })
        .catch(function(errorMessage) {
            log.error(errorMessage);
             killPort(port)
                .then(function() {
                    listenPort(app, port)
                })
                .catch(function(error) {
                    log.error('没干死该进程', error)
                });
        });
})(port);
