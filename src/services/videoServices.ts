/**
 * created by plj on 2017-10-18
 * @desc video_parser related service
 */
'use strict';
import * as request from 'request';
import * as bluebird from 'bluebird';
import * as iconvLite from 'iconv-lite';
import * as cheerio from 'cheerio';
import logger from '../utils/logger';

bluebird.promisifyAll(request);

const resolvers = {
    sohu: sohu,
    tencent: tencent
};

/**
 * 搜狐视频
 */
function sohu(htmlBuf) {
  var htmlStr = iconvLite.decode(htmlBuf, 'gbk');
  var $       = cheerio.load(htmlStr);
  var title   = $('#crumbsBar').find('h2').text().replace(/\s+/g, '');

  var vid         = /vid.+\"(\d+)\"/g.exec(htmlStr)[1];
  var coverImgUrl = /cover.+\"(.+)\"/g.exec(htmlStr)[1];
  var swfReg = /(share\.vrs\.sohu\.com.*v\.swf)/g.exec(htmlStr);
  var swfPlayer = (swfReg && swfReg[1]) ? swfReg[1] : null;
  //var swfPlayer   = /\nvrs_player.*\"(http[\s\S]+swf)"/g.exec(htmlStr)[1];
  var info = {
      title      : title,
      coverImgUrl: 'https' + coverImgUrl.slice(4,coverImgUrl.length),
  };
  if(swfPlayer){
    info.player = 'https://' + swfPlayer;
  }
  return info;
/*  return {
    title      : title,
    coverImgUrl: coverImgUrl,
    player     : swfPlayer + '?' + querystring.stringify({vid: vid})
  }*/
}

