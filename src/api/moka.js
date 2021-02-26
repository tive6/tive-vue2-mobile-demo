/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-17 20:59:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-09 18:02:53
 */
import { ajax } from './ajax'

export default {
  getMaxDateForValidData (params) {
    return ajax({
      url: `/nbi/mocard/batch`,
      params,
    })
  },
  getMaxReportDt (params) {
    return ajax({
      url: `/nbi/mocard/reportDt`,
      params,
    })
  },
  getOverview (params) {
    return ajax({
      url: `/nbi/mocard/overview/all`,
      params,
    })
  },
  getOverviewGas (params) {
    return ajax({
      url: `/nbi/mocard/overview/gas`,
      params
    })
  },
  getOverviewVip (params) {
    return ajax({
      url: `/nbi/mocard/overview/vip`,
      params
    })
  },
  getOverviewPlatform (params) {
    return ajax({
      url: `/nbi/mocard/overview/platform`,
      params
    })
  },
  //加油页面
  getGasOverview (params) {
    return ajax({
      url: `/nbi/mocard/gas/overview`,
      params
    })
  },
  getPathApp (params) {
    return ajax({
      url: `/nbi/mocard/gas/path/app`,
      params
    })
  },
  getPathMinApp (params) {
    return ajax({
      url: `/nbi/mocard/gas/path/minapp`,
      params
    })
  },
  getYouhuiOrder (params) {
    return ajax({
      url: `/nbi/mocard/gas/youhui/order`,
      params
    })
  },
  getYouhuiAmt (params) {
    return ajax({
      url: `/nbi/mocard/gas/youhui/amt`,
      params
    })
  },
  getGasPlatform (params) {
    return ajax({
      url: `/nbi/mocard/gas/platform`,
      params
    })
  },
  getGasHours (params) {
    return ajax({
      url: `/nbi/mocard/gas/hours`,
      params
    })
  },
  getGasCity (params) {
    return ajax({
      url: `/nbi/mocard/gas/city`,
      params
    })
  },
}