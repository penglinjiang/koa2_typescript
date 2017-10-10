/**
 * created by plj on 2017-09-25
 * @desc restful api about user
 */
'use strict';
import * as Router from 'koa-router';
import userDao from '../models/user';
import logger from '../utils/logger';

/**
 * a Unified prefix
 */
const router = new Router({
    prefix: '/api/v1'
});
/**
 * restful api 
 * get userInfo
 */
router.get('/users/:id', async (ctx) => {
    const id:number = +ctx.params.id;
    if (!id) {
        return ctx.body = {code: 0, message: 'invalid_parameters'};
    }
    try {
        const data = await userDao.getUserById(id);
        return ctx.body = {code: 0, message: 'success', data: data};
    } catch (e) {
        logger.error(`get userInfo err: ${e.stack}`);
        return ctx.body = {code: 1001, message: 'server error'};
    }
});

/**
 * restful api
 * sign up
 */
router.post('/users', async (ctx) => {
    const userName:string = ctx.request.body.userName;
    const pwd: string = ctx.request.body.pwd;
    if (!userName || !pwd) {
        return ctx.body = {code: 1001, message: 'invalid_parameters'}
    }
    try {
        const exist = await userDao.getUserByName(userName);
        if (exist.length > 0) {
            return ctx.body = {code: 1002, message: 'account has been registered'};
        }
        const register = await userDao.addNewUser(userName, pwd);
        return ctx.body = {code: 0, message: 'success', data: register}
    } catch (e) {
        logger.error(`sign up err: ${e.stack}`);
        return ctx.body = {code: 1003, message: 'server error, please try again later'};
    }
});

export default router;