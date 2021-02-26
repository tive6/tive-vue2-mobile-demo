/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-09 10:30:36
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-02 20:10:57
 */
import { Moka } from '@/api/index'

const MokaStore = {
  namespaced: true,

  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    //实时
    async getMaxDateForValidData ({ commit }, prams) {
      let res = await Moka.getMaxDateForValidData(prams)
      return res
    },
    //昨日,累计最大日期
    async getMaxReportDt ({ commit }, prams) {
      let res = await Moka.getMaxReportDt(prams)
      return res
    },
    //概览
    async getOverview ({ commit }, prams) {
      let res = await Moka.getOverview(prams)
      return res
    },
    //24小时加油订单量
    async getOverviewGas ({ commit }, prams) {
      let res = await Moka.getOverviewGas(prams)
      return res
    },
    //付费、免费会员数据对比
    async getOverviewVip ({ commit }, prams) {
      let res = await Moka.getOverviewVip(prams)
      return res
    },
    //APP、小程序数据对比
    async getOverviewPlatform ({ commit }, prams) {
      let res = await Moka.getOverviewPlatform(prams)
      return res
    },


    //加油页面
    //概览
    async getGasOverview ({ commit }, prams) {
      let res = await Moka.getGasOverview(prams)
      return res
    },
    //app加油路径接口
    async getPathApp ({ commit }, prams) {
      let res = await Moka.getPathApp(prams)
      return res
    },
    //小程序加油路径接口
    async getPathMinApp ({ commit }, prams) {
      let res = await Moka.getPathMinApp(prams)
      return res
    },
    //订单订单量接口
    async getYouhuiOrder ({ commit }, prams) {
      let res = await Moka.getYouhuiOrder(prams)
      return res
    },
    //订单金额接口
    async getYouhuiAmt ({ commit }, prams) {
      let res = await Moka.getYouhuiAmt(prams)
      return res
    },
    //APP、小程序数据对比
    async getGasPlatform ({ commit }, prams) {
      let res = await Moka.getGasPlatform(prams)
      return res
    },
    //APP、小程序数据趋势
    async getGasHours ({ commit }, prams) {
      let res = await Moka.getGasHours(prams)
      return res
    },
    //城市topN
    async getGasCity ({ commit }, prams) {
      let res = await Moka.getGasCity(prams)
      return res
    },
  }
}

export default MokaStore
