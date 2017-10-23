/**
 * created by plj on 2017-10-20
 * @desc RESTFUL API about video_parser
 */
'use strict';
import * as Router from 'koa-router';
import logger from '../utils/logger';
import videoService from '../services/videoServices';
import CONFIG from '../config';
import Videos from '../models/video';


/**
 * a Unified prefix
 */
const router = new Router({
    prefix: '/api/v1'
});

/**
 * restful api
 * get videoInfo by longUrl
 */
router.get('/videos', async (ctx, next) => {
    let longUrl:string = ctx.request.query.url;
    let videoSite = null;
    if (!longUrl) {
        return ctx.body = {code: 1003, message: 'parameter can not be empty'};
    }
    for (let site in CONFIG.videoSites) {
        if (longUrl.indexOf(CONFIG.videoSites[site].http) === 0 || longUrl.indexOf(CONFIG.videoSites[site].https) === 0) {
            videoSite = site;//get website according to longUrl
            break;
        }
    }
    if (!videoSite) {
        return ctx.body = {code: 1001, message: 'this website has not been supported'};
    }
    try {
        let videoInfo = await Videos.findOne({longurl: longUrl});
        logger.debug(`the videoInfo query from mongodb is ${JSON.stringify(videoInfo)}`);
        if (videoInfo) {
            let shortUrl = await videoService.getShortUrl(videoInfo.longurl);
            videoInfo.site = videoSite;
            videoInfo.shorturl = shortUrl;
        } else {
            videoInfo = await videoService.getVideoInfoByUrl(longUrl, videoSite);
            videoInfo.longurl = longUrl;
            let shortUrl = await videoService.getShortUrl(videoInfo.longurl);
            videoInfo.site = videoSite;
            videoInfo.shorturl = shortUrl;
            let videoEntity = new Videos(videoInfo);
            let videoSave = await videoEntity.save();
        }
        return ctx.body = {code: 0, message: 'success', data: videoInfo}
    } catch (e) {
        logger.error(`get videos api error: ${e.stack}`);
        return ctx.body = {code: 1002, message: 'server error'};
    }
});

export default router;