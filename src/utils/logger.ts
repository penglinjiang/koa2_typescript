/**
 * created by plj on 2017-09-25
 * @desc the setting of log4js
 */
'use strict';
import * as log4js from 'koa-log4';
import * as path from 'path';
const appDir = path.resolve(__dirname, '../..');
const logDir:string = path.join(appDir, 'logs');
log4js.configure(path.join(appDir, 'log4js.json'), {cwd: logDir});
const logger = log4js.getLogger('startup');

export default logger;