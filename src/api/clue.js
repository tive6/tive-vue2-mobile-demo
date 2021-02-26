/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-17 20:59:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-10-22 15:08:36
 */
import { ajax } from './ajax'

export default {
  getMaxDateForValidData (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/lastDate`,
      data: params,
    })
  },
  postOverview (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/overview/all`,
      data: params,
    })
  },
  postOverviewPlatform (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/overview/platform`,
      data: params,
    })
  },
  postOverviewSource (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/overview/source`,
      data: params,
    })
  },
  postOrderLeadsNum (params) {
    return ajax({
      method: 'POST',
      url: `/nbi/clue/overview/orderLeadsNum`,
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
}