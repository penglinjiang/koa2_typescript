/**
 * created by plj on 2017-09-25
 * @desc: some public method to serve the main server
 */
'use strict';

/**
 * get ip of client
 */
export function getClientIp (ctx) {
    let clientIp: string = '';
    if (ctx.headers['x-forwarded-for']) {
        clientIp = ctx.headers['x-forwarded-for'];
    } else if (ctx.connection) {
        if (ctx.connection.remoteAddress) {
            clientIp = ctx.connection.remoteAddress;
        } else if (ctx.connection.socket && ctx.connection.socket.remoteAddress) {
            clientIp = ctx.connection.socket.remoteAddress;
        }
    } else if (ctx.socket && ctx.socket.remoteAddress) {
        clientIp = ctx.socket.remoteAddress;
    }
    if (clientIp === '::1') {
        clientIp = "127.0.0.1";
    }
    if (clientIp.length >= 15) {
        if (clientIp.substr(0, 7) === "::ffff:") {
            clientIp = clientIp.substr(7);
        }
    }

    return clientIp;
};
