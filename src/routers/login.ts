/**
 * created by plj on 2017-09-25
 * @desc restful api about session
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
 * login
 */
router.post('/session', async (ctx) => {
    const userName:string = ctx.request.body.userName;
    const pwd: string = ctx.request.body.pwd;
    if (!userName || !pwd) {
        return ctx.body = {code: 1001, message: 'invalid_parameters'}
    }
    try {
        const userList = await userDao.getUserByName(userName);
        if (userList.length === 0 || !userList) {
            return ctx.body = {code: 1002, message: 'username or password is wrong, please check'}
        }
        console.log(3333333, userList, userName, pwd);
        if (userList.length > 0 && userList[0].pwd === pwd){
            ctx.session.uid = userList[0].id;
            return ctx.body = {code: 0, message: 'success'}
        } else {
            return ctx.body = {code: 1003, message: 'username or password is wrong, please check'}
        }
    } catch (e) {
        logger.error(`sign up err: ${e.stack}`);
        return ctx.body = {code: 1004, message: 'server error, please try again later'};
    }
});

/**
 * restful api
 * logout
 */
router.del('/session', async (ctx) => {
    ctx.session.uid = null;
    return ctx.body = {code: 0, message: 'success'}
})

export default router;