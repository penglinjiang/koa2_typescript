/**
 * created by plj on 2017-09-25
 * @desc offer o client_connection to operate redis-server
 */
'use strict';
import * as ioredis from 'ioredis';
import CONFIG from '../config';

let redisInst:any = null;

const clientCreate = (opt, cb):void => {
    const redis = new ioredis(opt);
    redis.on('connect', ():void => {
        cb(null, redis);
    });
    redis.on('error', (err):void => {
        cb(err, null);
    })
};

const redisConn = (opt):Promise<any> => {
    let redisConf = opt || CONFIG.redis;
    if (redisInst) {
        return Promise.resolve(redisInst);
    } else {
        return new Promise((resolve, reject) => {
            clientCreate(redisConf, (err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    redisInst = conn;
                    resolve(redisInst);
                }
            });
        })
    }
};

export default redisConn;




