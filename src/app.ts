/**
 * created by plj on 2017-09-25
 */

'use strict';
import * as Koa2 from 'koa';
import * as BodyParser from 'koa-bodyparser';
import * as Session from 'koa-session2';
const app = new Koa2();

import {getClientIp} from './utils/tools';
import CONFIG from './config';
import logger from './utils/logger';
import SessionStore from './utils/session';

//router
import user from './routers/user';
import login from './routers/login';
import contact from './routers/contact';
import video from './routers/video';

/**
 * a middleware to record the time consuming and url of every request
 */
app.use(async (ctx, next) => {
    const startTime = new Date();
    const clientIp = getClientIp(ctx);
    await next();
    const timeConsuming = (new Date()).getTime() - startTime.getTime();
    logger.info(`${clientIp} ${ctx.method} ${ctx.status} ${ctx.url} - ${timeConsuming}ms`);
});

/**
 * Request Body Parse
 */
app.use(BodyParser());

/**
 * session middleware
 */
app.use(Session({
    key: 'addressbook',
    store: new SessionStore(),
    maxAge: 60 * 60 * 1000
}));

//load router
app.use(user.routes()).use(user.allowedMethods())
   .use(login.routes()).use(login.allowedMethods())
   .use(contact.routes()).use(contact.allowedMethods())
   .use(video.routes()).use(video.allowedMethods());

app.use(async (ctx) => {
    if (ctx.status !== 200) {
        ctx.body = 'hello addressbook';
    }
});

app.listen(CONFIG.listenPort, () => {
    logger.info(`AddressBook API server bind port-${CONFIG.listenPort}`);
})