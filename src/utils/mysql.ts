/**
 * created by plj on 2017-09-25
 * @desc get connection to mysql
 */
'use strict';
import * as mysql from 'mysql';

const pool:any = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'addressbook'
});

/**
 * chose a connection from pool to execute sql
 */
export function query(sql:string, variable:Array<any>):Promise<any> {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(connect_err, connection) {
            if (connect_err) {
                return reject(connect_err);
            } else {
                if (variable.length > 0) {
                    connection.query(sql, variable, function(query_err, result) {
                        if (query_err) {
                            connection.release();
                            return reject(query_err);
                        } else {
                            connection.release();
                            return resolve(result);
                        }
                    });
                } else {
                    connection.query(sql, function(query_err, result) {
                        if (query_err) {
                            connection.release();
                            return reject(query_err);
                        } else {
                            connection.release();
                            return resolve(result);
                        }
                    });
                }
            }
        });
    });
}

