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
    db: 2
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

export default {
    listenPort: listenPort,
    redis: redis,
    mysql: mysql
};