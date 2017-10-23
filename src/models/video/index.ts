/**
 * created by plj on 2017-10-17
 * @desc operate mongodb
 */
'use strict';
import CONFIG from '../../config';
import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import video_schema from './video_schema';

const conn = mongoose.createConnection(`mongodb://${CONFIG.mongodb.host}:${CONFIG.mongodb.port}/${CONFIG.mongodb.db}`);
const Videos = conn.model('Videos', video_schema);
//Promise.promisifyAll(Videos);

export default Videos;
