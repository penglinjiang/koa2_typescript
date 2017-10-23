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

function getVideoInfoByUrl (url, site):Promise<any> {
    return new Promise((resolve, reject) => {
        let resolver = resolvers[site];
        if (!resolver) {
            reject('this webSite has not been supported');
        } else {
            getHtmlStr(url).then(function(htmlStr) {
                let info:Object = resolver(htmlStr);
                resolve(info);
            }).catch(function (e) {
                reject('video_parse error');
                logger.error(`getHtmlStr error: ${e.stack}`);
            })
        }
    });
};

/**
 * 获取网页内容
 * @param url
 */
function getHtmlStr(url) {
    return request.getAsync({
        headers : {
        //'User-Agent':''
        },
        url     : url,
        gzip    : true,
        encoding: null,
        timeout : 6000
    }).then(function (results, body) {
        //logger.debug(`getHtmlStr result is: ${results.statusCode} ${results.body.toString()}`);
        return results.statusCode === 200 ? results.body : '';
    }).catch(function (err) {
        logger.error(`getHtmlStr err: ${err.stack}`);
    });
};


/**
 * 搜狐视频
 */
function sohu(htmlBuf):Object {
    let htmlStr = iconvLite.decode(htmlBuf, 'gbk');
    let $ = cheerio.load(htmlStr);
    let title = $('#crumbsBar').find('h2').text().replace(/\s+/g, '');

    let vid = /vid.+\"(\d+)\"/g.exec(htmlStr)[1];
    let coverImgUrl = /cover.+\"(.+)\"/g.exec(htmlStr)[1];
    let swfReg = /(share\.vrs\.sohu\.com.*v\.swf)/g.exec(htmlStr);
    let swfPlayer = (swfReg && swfReg[1]) ? swfReg[1] : null;
    let info = {
        title: title,
        coverImgUrl: 'https' + coverImgUrl.slice(4, coverImgUrl.length),
        player: null
    };
    if (swfPlayer) {
        info.player = 'https://' + swfPlayer;
    }
    return info;
};

/**
 * 腾讯视频
 */
function tencent(htmlStr):Object {
    let $ = cheerio.load(htmlStr);
    let title = $('title').text();
    let intro = $('meta[name=description]').attr('content');
    // 与该页面视频相关的图片，但不一定是显示在导航页面的封面，其余
    let coverImgUrl = $('meta[itemprop="image"]').attr('content');
    // var relUrl      = $('meta[itemprop="url"]').attr('content');
    let relUrl = $('link[rel="canonical"]').attr('href');
    let paramsInfo = /.*?\/([^\/]*)\/([^\/]*)\.html/g.exec(relUrl);
    let cid = paramsInfo[1];
    let vid = paramsInfo[2];
    let player = 'https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?vid=' + vid + '&cid=' + cid;
    return {
        title: title,
        intro: intro,
        coverImgUrl: (coverImgUrl.indexOf('http://') < 0 && coverImgUrl.indexOf('https://') < 0) ? 'https:' + coverImgUrl : coverImgUrl,
        player: player
    }
};

/**
 * 通过longurl得到shorturl
 */
function getShortUrl(url) {
    let longUrl = encodeURI(url);
    return request.getAsync('http://www.15.cn/urlmap/encode', {
        qs: {longurl: longUrl},
        json: true
    }).then(function (resp) {
        logger.debug(`getShortUrl return: ${resp.statusCode}  ${JSON.stringify(resp.body)}`);
        if (resp.statusCode === 200) {
            return resp.body.shorturl.trim();
        } else {
            logger.error(`getShortUrl statusCode is not 200, is ${resp.statusCode}`);
            return '';
        }
    }).catch (function (e) {
        logger.error(`getShortUrl error: ${e.stack}`);
    })
}

export default {
    getVideoInfoByUrl: getVideoInfoByUrl,
    getShortUrl: getShortUrl
};


