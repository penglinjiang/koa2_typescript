/**
 * created by plj on 2017-09-26
 * @desc restful api about contact
 */
'use strict';
import * as Router from 'koa-router';
import Contact from '../models/contact';
import logger from '../utils/logger';
import * as Uid from 'uid-safe';

/**
 * a Unified prefix
 */
const router = new Router({
    prefix: '/api/v1'
});

const contactDao:any = new Contact();
const redisKeyPrefix = 'contact_';

/**
 * restful api 
 * get contactList
 */
router.get('/contacts', async (ctx) => {
    //const uid:number = +ctx.request.query.uid;
    const uid:number = +ctx.session.uid;
    if (!uid) {
        return ctx.body = {code: 1001, message: 'invalid_parameters'};
    }
    try {
        const contactList = await contactDao.get(redisKeyPrefix + uid);
        return ctx.body = {code: 0, message: 'success', data: contactList};
    } catch (e) {
        logger.error(`get contactList err: ${e.stack}`);
        return ctx.body = {code: 1002, message: 'server error'};
    }
});

/**
 * restful api 
 * add a contact
 */
router.post('/contacts', async (ctx) => {
    //const uid = ctx.request.body.uid;
    const uid:number = +ctx.session.uid;
    let contact = {
        id: Uid.sync(5),
        name: ctx.request.body.name,//the name of the address
        address: ctx.request.body.address
    };
    if(!contact.name || !contact.address || !uid) {
        return ctx.body = {code: 1001, message: 'invalid_parameters'};
    }

    try {
        let contactRes = await contactDao.get(redisKeyPrefix + uid);
        let contactList:Array<any> = JSON.parse(contactRes) || [];
        contactList.push(contact);
        await contactDao.set(redisKeyPrefix + uid, JSON.stringify(contactList));
        return ctx.body = {code: 0, message: 'success'};
    } catch (e) {
        logger.error(`add contact err: ${e.stack}`);
        return ctx.body = {code: 1002, message: 'server error'};
    }
})

/**
 * restful api 
 * del a contact
 */
router.del('/contacts/:id', async (ctx) => {
    const uid:number = +ctx.session.uid;
    const id:string = ctx.params.id;
    if (!id) {
        return ctx.body = {code: 1001, message: 'invalid_parameters'};
    }

    try {
        let contactRes = await contactDao.get(redisKeyPrefix + uid);
        let contactList:Array<any> = JSON.parse(contactRes) || [];

        for (let i = 0; i < contactList.length; i++) {
            if (contactList[i].id === id) {
                contactList.splice(i, 1);//delete the contact
            }
        }
        await contactDao.set(redisKeyPrefix + uid, JSON.stringify(contactList));
        return ctx.body = {code: 0, message: 'success'};
    } catch (e) {
        logger.error(`del contact err: ${e.stack}`);
        return ctx.body = {code: 1002, message: 'server error'};
    }
})

export default router;

