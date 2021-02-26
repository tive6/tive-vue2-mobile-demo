/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-17 20:59:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-11-25 14:15:25
 */
import { ajax } from './ajax'

export default {
  getMaxDateForValidData (params) {
    return ajax({
      url: `/nbi/track/lastRecordDate`,
      params,
    })
  },
  postTrafficOverview (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/traffic/overview`,
      data: params,
    })
  },
  postTrafficUserAnalysis (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/traffic/userAnalysis`,
      data: params,
    })
  },
  postRetentionAnalysis (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/traffic/retentionAnalysis`,
      data: params,
    })
  },
  postTrafficAnalysis (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/traffic/trafficAnalysis`,
      data: params,
    })
  },
  postOrderLeadsNumGroupByPlatform (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/overview/orderLeadsNumGroupByPlatform`,
      data: params,
    })
  },
  //业务部分
  postContentOverview (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/content/overview`,
      data: params,
    })
  },
  getContentCatalog (params) {
    return ajax({
      url: `/nbi/track/content/catalog`,
      params,
    })
  },
  postContentCatalogTrend (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/content/catalogTrend`,
      data: params,
    })
  },
  postContentHomepageInfoFlow (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/content/homepageInfoFlow`,
      data: params,
    })
  },
  postContentPageActiveUser (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/track/content/pageActiveUser`,
      data: params,
    })
  },
}