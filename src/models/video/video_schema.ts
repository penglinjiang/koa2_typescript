/**
 * created by plj on 2017-10-11
 * @desc the schema of video_parser
 */
'use strict';
import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  site       : {type: String, required: true, index: true, unique: false, trim: true, comment: '网站'},
  title      : {type: String, required: true, index: true, unique: false, trim: true, comment: '标题'},
  intro      : {type: String, required: false, index: true, unique: false, trim: true, comment: '描述'},
  player     : {type: String, required: true, index: true, unique: true, trim: true, comment: '播放地址'},
  coverImgUrl: {type: String, required: true, index: true, unique: false, trim: true, comment: '封面'},
  longurl    : {type: String, required: true, index: true, unique: true, trim: true, comment: '页面地址'},
  shorturl   : {type: String, required: true, index: true, unique: true, trim: true, comment: '短链地址'}
});

export default schema;