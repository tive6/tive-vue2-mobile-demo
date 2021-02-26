/*
 * @desc:
 * @author: zhangxin
 * @Date: 2020-06-09 10:30:36
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-09-17 14:26:05
 */
import {Brand, UserApi} from '@/api/index';

const GET_BRAND_DATERANGETYPE = 'GET_BRAND_DATERANGETYPE';
const GET_BRAND_VERSION = 'GET_BRAND_VERSION';
const GET_SHOW_REFRESH = 'GET_SHOW_REFRESH';
const GET_COMPETING_LIST = 'GET_COMPETING_LIST';
const GET_MAX_DATE = 'GET_MAX_DATE';
const BrandStore = {
  namespaced: true,

  state: {
    showNavBar: true,
    showRefresh: false, //刷新功能
    dateRangeType: 3,
    versionList: [
      {
        versionNo: '--',
        publishDate: '--',
        content: '暂无',
      },
    ],
    itemParams: {
      indexStatistical: {
        //首页统计
        dateRangeType: 1,
        startDate: '2020-01-01',
        endDate: '2020-08-01',
      },
      indexHealth: {
        //健康统计
        dateRangeType: 1,
        startDate: '2020-01-01',
        endDate: '2020-08-01',
      },
    },
    competingList: {
      Member020: [],
      Member009: [],
      Member116: [],
      Member012: [],
      Member024: [],
      Member096: [],
      Member111: [],
      Member127: [],
      Member203: [],
      Member209: [],
    }, //竞品对标数据
    maxDate: {
      day: '',
      weeks: '',
      month: '',
      salesMonth: '',
    },
    competitionDate: {
      start: '',
      end: ''
    },
    predictBrand: {}
  },
  getters: {
    getDateRangeType(state) {
      return state.dateRangeType;
    },
    getVersionList(state) {
      return state.versionList;
    },
    getShowRefresh: (state) => state.showRefresh,
    getCompetingList: (state) => state.competingList,
    getMaxDate: (state) => state.maxDate,
    getSalesMonth: (state) => state.maxDate.salesMonth,
    getCompetitionDate: (state) => ({startDate: state.start, endDate: state.end}),
    getPredictBrand: state => state.predictBrand || {},
  },
  mutations: {
    GET_BRAND_DATERANGETYPE: (state, dateRangeType) => {
      state.dateRangeType = dateRangeType;
    },
    GET_BRAND_VERSION: (state, versionList) => {
      console.log('versionList', versionList);
      state.versionList = versionList;
    },
    GET_SHOW_REFRESH: (state, type) => {
      state.showRefresh = type;
    },
    GET_COMPETING_LIST: (state, type) => {
      state.competingList = type;
    },
    GET_MAX_DATE: (state, type) => {
      state.maxDate = type;
    },
    SET_COMPETITION_DATE: (state, value) => {
      state.start = value.start;
      state.end = value.end;
    },
    setPredictBrand: (state, value) => {
      state.predictBrand = value;
    }
  },
  actions: {
    setDateRangeType({dispatch, commit, getters}, prams) {
      commit(GET_BRAND_DATERANGETYPE, prams);
    },
    setShowRefresh({dispatch, commit, getters}, prams) {
      commit(GET_SHOW_REFRESH, prams);

    },
    setCompetingList({dispatch, commit, getters}, prams) {
      commit(GET_COMPETING_LIST, prams);
    },
    async postErrors({commit}, prams) {
      try {
        let res = await UserApi.postErrors(prams);
        return res;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getBrandTapeStatistics({commit}, prams) {
      try {
        let res = await Brand.getBrandTapeStatistics(prams);
        return res;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getBrandDiagnoseStatistics({commit}, prams) {
      //合并请求
      const all = await Promise.all([
        Brand.getBrandDiagnoseStatistics({...prams, diagnoseType: 1}),
        Brand.getBrandDiagnoseStatistics({...prams, diagnoseType: 2}),
        Brand.getBrandDiagnoseStatistics({...prams, diagnoseType: 3}),
      ]).catch((ex) => {
        console.log(ex);
      });
      return all;
    },
    async getBrandDiagnoseList({commit}, prams) {
      let res = await Brand.getBrandDiagnoseList(prams);
      //console.log('res', res)
      return res;
    },
    async getListMemberBrand({commit}, prams) {
      let res = await Brand.getListMemberBrand(prams);
      //console.log('res', res)
      return res;
    },
    //二级top图表
    async getBrandStatistics({commit}, prams) {
      let res = await Brand.getBrandStatistics(prams);
      //console.log('res', res)
      return res;
    },
    //二级list-大区
    async getRegionList({commit}, prams) {
      let res = await Brand.getRegionList(prams);
      //console.log('res', res)
      return res;
    },
    //三级图表
    async getRegionStatistics({commit}, prams) {
      let res = await Brand.getRegionStatistics(prams);
      //console.log('res', res)
      return res;
    },
    //三级省级列表
    async getProvinceList({commit}, prams) {
      let res = await Brand.getProvinceList(prams);
      //console.log('res', res)
      return res;
    },
    //三级省级经销商列表
    async getRegionDealerList({commit}, prams) {
      let res = await Brand.getRegionDealerList(prams);
      //console.log('res', res)
      return res;
    },
    //四级市图表
    async getProvinceStatistics({commit}, prams) {
      let res = await Brand.getProvinceStatistics(prams);
      //console.log('res', res)
      return res;
    },
    //四级市级列表
    async getProvinceCityList({commit}, prams) {
      let res = await Brand.getProvinceCityList(prams);
      //console.log('res', res)
      return res;
    },
    //四级市级经销商列表
    async getProvinceDealerList({commit}, prams) {
      let res = await Brand.getProvinceDealerList(prams);
      //console.log('res', res)
      return res;
    },
    //五级个体图表
    async getCityStatistics({commit}, prams) {
      let res = await Brand.getCityStatistics(prams);
      //console.log('res', res)
      return res;
    },
    //五级个体经销商
    async getCityDealerList({commit}, prams) {
      let res = await Brand.getCityDealerList(prams);
      //console.log('res', res)
      return res;
    },
    //经销商详情
    async getDealerDetails({commit}, prams) {
      //合并请求
      const all = await Promise.all([
        Brand.getDealerClueStatistics(prams),
        Brand.getClueSourceStatistics(prams),
        Brand.getSeriesDistribute({orderBy: 'leads_num desc', ...prams, startDate: prams.endDate}),
      ]).catch((ex) => {
        console.log(ex);
      });
      return all;
    },
    //车系分布
    async getSeriesDistribute({commit}, prams) {
      let res = await Brand.getSeriesDistribute(prams);
      //console.log('res', res)
      return res;
    },

    //二期接口
    //交易转换率
    async getDealConvertRatio({commit}, prams) {
      let res = await Brand.getDealConvertRatio(prams);
      return res;
    },
    //全漏斗
    async getCompetitorFunnel({commit}, prams) {
      let res = await Brand.getCompetitorFunnel(prams);
      return res;
    },
    //经销商转化
    async getDealerConvert({commit}, prams) {
      let res = await Brand.getDealerConvert(prams);
      return res;
    },
    //厂商认定成交转化
    async getDealConvert({commit}, prams) {
      let res = await Brand.getDealConvert(prams);
      return res;
    },
    //漏斗转化率趋势
    async getFunnelTrend({commit}, prams) {
      let res = await Brand.getFunnelTrend(prams);
      return res;
    },
    //经销商转化趋势
    async getDealerConvertTrend({commit}, prams) {
      let res = await Brand.getDealerConvertTrend(prams);
      return res;
    },
    //获取有效数据最大日期
    async getMaxDateForValidData({commit}, prams) {
      let res = await Brand.getMaxDateForValidData(prams);
      if (res) {
        let list = {
          day: '',
          weeks: '',
          month: '',
        };
        res.map((item, index) => {
          if (item.type == '4_1') {
            list.day = item.report_dt;
            return;
          }
          if (item.type == '4_2') {
            list.weeks = item.report_dt;
            return;
          }
          if (item.type == '4_3') {
            list.month = item.report_dt;
            return;
          }
          if (item.type == '4_4') {
            list.salesMonth = item.report_dt;
          }
        });
        commit(GET_MAX_DATE, list);
      }
      return res;
    },
    //厂商独号
    async postFactoryStatistics({commit}, prams) {
      let res = await Brand.postFactoryStatistics(prams);
      return res;
    },
    //车系分布
    async postSeriesList({commit}, prams) {
      let res = await Brand.postSeriesList(prams);
      return res;
    },
    //经销商线索来源分布
    async postDealerSourceStatistics({commit}, prams) {
      let res = await Brand.postDealerSourceStatistics(prams);
      return res;
    },
    //交易转换率（全部）
    async postDealConvertRatioes({commit}, prams) {
      let res = await Brand.postDealConvertRatioes(prams);
      return res;
    },
    //全漏斗(全部)
    async postCompetitorFunnels({commit}, prams) {
      let res = await Brand.postCompetitorFunnels(prams);
      return res;
    },
    //经销商转化(全部)
    async postDealerConverts({commit}, prams) {
      let res = await Brand.postDealerConverts(prams);
      return res;
    },
    //第四期接口

    //获取用户列表
    async getListUsers({commit}, prams) {
      let res = await Brand.getListUsers(prams);
      return res;
    },
    //获取版本信息
    async getVersionInfo({dispatch, commit, getters}, prams) {
      let res = await Brand.getVersionInfo(prams);
      console.log('records', res);
      if (res) {
        commit(GET_BRAND_VERSION, res);
      }
      return res;
    },
    //cps统计
    async postCplStatistics({commit}, prams) {
      let res = await Brand.postCplStatistics(prams);
      return res;
    },
    //cps详情
    async postCplDetail({commit}, prams) {
      let res = await Brand.postCplDetail(prams);
      return res;
    },
    //获取搜索排行
    async getListSearchLog({commit}, prams) {
      let res = await Brand.getListSearchLog(prams);
      return res;
    },
    //保存搜索日志
    async postSaveSearchLog({commit}, prams) {
      let res = await Brand.postSaveSearchLog(prams);
      return res;
    },
    //保存搜索日志
    async postCplTop10({commit}, prams) {
      let res = await Brand.postCplTop10(prams);
      return res;
    },
  },
};

export default BrandStore;
