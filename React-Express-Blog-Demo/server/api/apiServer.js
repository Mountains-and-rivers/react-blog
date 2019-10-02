/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */
import Express from 'express'
import config from '../../config/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import redis from 'redis'

let RedisStore = require('connect-redis')(session),
RDS_PORT = 6379,
RDS_HOST = '127.0.0.1';

let client = redis.createClient(RDS_PORT, RDS_HOST);

const port = config.apiPort;

const app = new Express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('express_react_cookie'));
app.use(session({
    store: new RedisStore({ client }),
    secret:'express_react_cookie',
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: 1000 * 30}//过期时间
}));


//展示页面路由
app.use('/', require('./main'));
//管理页面路由
app.use('/admin', require('./admin'));

mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://root:adminpassword@127.0.0.1:27017/admin`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    app.listen(port, function (err) {
        if (err) {
            console.error('err:', err);
        } else {
            console.info(`===> api server is running at ${config.apiHost}:${config.apiPort}`)
        }
    });
});
