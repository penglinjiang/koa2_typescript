/**
 * created by plj on 2017-09-26
 * @desc dao of contact
 */
'use strict';
import RedisConn from '../utils/redis';
import logger from '../utils/logger';

class Contact {
    redis:any;
    constructor() {
        RedisConn(null).then(res => {
            this.redis = res;
            logger.info('contact: redis connect successfully');
        }).catch(err => {
            logger.error(`contact: redis connect failed-${err.stack}`);
        })
    };

    get(key:string):Promise<any> {
        return this.redis.get(key).then(res => {
            try {
                return Promise.resolve(res);
            } catch (e) {
                logger.error(`contact: redis get error-${e.stack}`);
                return Promise.resolve({})
            }
        })
    };

    set(key:string, value:Array<any>):Promise<any> {
        return this.redis.set(key, JSON.stringify(value)).then(res => {
            try {
                return Promise.resolve(1);
            } catch (e) {
                logger.error(`contact: redis lpush error-${e.stack}`);
                return Promise.resolve(0);
            }
        });
    };
}

export default Contact;