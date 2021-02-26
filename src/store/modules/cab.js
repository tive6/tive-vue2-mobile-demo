/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-09 10:30:36
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-11-24 11:13:23
 */
import { Cab } from '@/api/index'

const MokaStore = {
  namespaced: true,

  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    //获取最大r间
    async getMaxDateForValidData ({ commit }, prams) {
      let res = await Cab.getMaxDateForValidData(prams)
      return res
    },
    //概览
    async postTrafficOverview ({ commit }, prams) {
      let res = await Cab.postTrafficOverview(prams)
      return res
    },
    //用户分析
    async postTrafficUserAnalysis ({ commit }, prams) {
      let res = await Cab.postTrafficUserAnalysis(prams)
      return res
    },
    //留存分析
    async postRetentionAnalysis ({ commit }, prams) {
      let res = await Cab.postRetentionAnalysis(prams)
      return res
    },
    //PC-M 流量分析
    async postTrafficAnalysis ({ commit }, prams) {
      let res = await Cab.postTrafficAnalysis(prams)
      return res
    },
    //业务概览
    async postContentOverview ({ commit }, prams) {
      let res = await Cab.postContentOverview(prams)
      return res
    },
    //内容分类
    async getContentCatalog ({ commit }, prams) {
      let res = await Cab.getContentCatalog(prams)
      return res
    },
    //内容趋势
    async postContentCatalogTrend ({ commit }, prams) {
      let res = await Cab.postContentCatalogTrend(prams)
      return res
    },
    //信息流
    async postContentHomepageInfoFlow ({ commit }, prams) {
      let res = await Cab.postContentHomepageInfoFlow(prams)
      return res
    },
    //活跃用户
    async postContentPageActiveUser ({ commit }, prams) {
      let res = await Cab.postContentPageActiveUser(prams)
      return res
    },
  }
}

export default MokaStore
