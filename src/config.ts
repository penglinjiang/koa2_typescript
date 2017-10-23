/**
 * created by plj on 2017-09-25
 * @desc the settings of the whole project
 */
'use strict';
//listen port
const listenPort: number = process.env.PORT || 9025;

// Redis Config
const redis = {
    port: 6379,
    host: '127.0.0.1',
    db: 2,
    password: '123456'
};

//Mysql Config
const mysql = {
    host: '127.0.0.1',
    database: 'addressbook',
    user: 'root',
    password: '123456',
    protocol: 'mysql',
    port: '3306'
};

//Mongodb Config
const mongodb = {
    host: '127.0.0.1',
    port: '27017',
    db: 'VideoService'
};

//video_parser config
const videoSites = {
    sohu: {
        http: 'http://tv.sohu.com',
        https: 'https://tv.sohu.com'
    },
    tencent: {
        http: 'http://v.qq.com',
        https: 'https://v.qq.com'
    }
};

export default {
    listenPort: listenPort,
    redis: redis,
    mysql: mysql,
    mongodb: mongodb,
    videoSites: videoSites
};