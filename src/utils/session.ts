/**
 * created by plj on 2017-09-25
 * @desc persistence session to redis
 */
'use strict';
import RedisConn from './redis';
import logger from './logger';
import * as Uid from 'uid-safe';

class Session {
    redis:any;
    constructor() {
        RedisConn(null).then(res => {
            this.redis = res;
            logger.info('session: redis connect successfully');
        }).catch(err => {
            logger.error(`session: redis connect failed-${err.stack}`);
        })
    };
    //Get Session from redis
    get(sid:string):Promise<any> {
        return this.redis.get(`session-${sid}`).then(res => {
            try {
                return Promise.resolve(JSON.parse(res));
            } catch (e) {
                return Promise.resolve({});
            }
        });
    };
    //write Session to redis
    set(session, opts):Promise<any> {
        if (!opts.sid) {
            opts.sid = Uid.sync(24);
        }
        return this.redis.set(`session-${opts.sid}`, JSON.stringify(session)).then(() => {
            return Promise.resolve(opts.sid);
        })
    };
    //Remove Session from redis
    destroy(sid:string):any {
        return this.redis.del(`session-${sid}`);
    };
};

export default Session;