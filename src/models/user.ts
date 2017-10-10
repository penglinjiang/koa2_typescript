/**
 * created by plj on 2017-09-25
 * @desc dao of user
 */
'use strict';
import {query} from '../utils/mysql';

/**
 * get userInfo by username
 * @param userName 
 */
async function getUserByName(userName:string):Promise<any> {
    const sql = `SELECT * FROM user_tbl WHERE name = ?`;
    return await query(sql, [userName]);
};

/**
 * add a new user
 * @param userName 
 * @param pwd 
 */
async function addNewUser(userName:string, pwd:string):Promise<any> {
    const sql = `INSERT INTO user_tbl SET name = ?, pwd = ?`;
    return await query(sql, [userName, pwd]);
}

/**
 * get userInfo by id
 * @param id 
 */
async function getUserById(id:number):Promise<any> {
    const sql = `SELECT * FROM user_tbl WHERE id = ?`;
    return await query(sql,[id]);
}

export default {
    getUserByName: getUserByName,
    addNewUser: addNewUser,
    getUserById: getUserById
};

