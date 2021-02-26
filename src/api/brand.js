/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-17 20:59:01
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-08-19 15:39:45
 */
import { ajax } from './ajax'
import Utils from '@/common/utils'

export default {

  getListMemberBrand (prams) {
    return ajax({
      url: `/nbi/mds/memberBrand/listMemberBrand?${prams ? Utils.objectToQueryString(prams) : ''}`,
    })
  },
  getBrandTapeStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/brandTapeStatistics`,
      data: prams
    })
  },
  getBrandDiagnoseStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/brandDiagnoseStatistics`,
      data: prams
    })
  },
  getBrandDiagnoseList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/brandDiagnoseList`,
      data: prams
    })
  },
  getBrandStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/brandStatistics`,
      data: prams
    })
  },
  getRegionList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/regionList`,
      data: prams
    })
  },
  getRegionStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/regionStatistics`,
      data: prams
    })
  },
  getProvinceList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/provinceList`,
      data: prams
    })
  },
  getRegionDealerList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/regionDealerList`,
      data: prams
    })
  },
  getProvinceStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/provinceStatistics`,
      data: prams
    })
  },
  getProvinceCityList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/provinceCityList`,
      data: prams
    })
  },
  getProvinceDealerList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/provinceDealerList`,
      data: prams
    })
  },
  getCityStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/cityStatistics`,
      data: prams
    })
  },
  getCityDealerList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/cityDealerList`,
      data: prams
    })
  },
  getDealerClueStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/dealerClueStatistics`,
      data: prams
    })
  },
  getClueSourceStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/clueSourceStatistics`,
      data: prams
    })
  },
  getSeriesDistribute (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/seriesDistribute`,
      data: prams
    })
  },

  /**
   * @name: 二期接口
   * @param {type} 
   * @return: 
   * @msg: 
   * @Author: zhangxin
   */
  getDealConvertRatio (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/dealConvertRatio`,
      data: prams
    })
  },
  getCompetitorFunnel (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryCompetitorFunnel`,
      data: prams
    })
  },
  getDealerConvert (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryDealerConvert`,
      data: prams
    })
  },
  getDealConvert (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryDealConvert`,
      data: prams
    })
  },
  getFunnelTrend (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryFunnelTrend`,
      data: prams
    })
  },
  getDealerConvertTrend (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryDealerConvertTrend`,
      data: prams
    })
  },
  getMaxDateForValidData (prams) {
    return ajax({
      url: `/nbi/brandclue/queryMaxDateForValidData`,
    })
  },
  // postFactoryStatistics (prams) {
  //   return ajax({
  //     method: 'POST',
  //     url: `/nbi/brandclue/queryFactoryStatistics`,
  //     data: prams
  //   })
  // },
  postFactoryStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryFactoryStatistics`,
      data: prams
    })
  },
  postSeriesList (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/querySeriesList`,
      data: prams
    })
  },
  postDealerSourceStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryDealerSourceStatistics`,
      data: prams
    })
  },
  postDealConvertRatioes (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/dealConvertRatioes`,
      data: prams
    })
  },
  postCompetitorFunnels (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryCompetitorFunnels`,
      data: prams
    })
  },
  postDealerConverts (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryDealerConverts`,
      data: prams
    })
  },
  getListUsers (prams) {
    return ajax({
      url: `/nbi/uc/nbiUBusiness/listUsers?${Utils.objectToQueryString(prams)}`,
    })
  },
  getVersionInfo (prams) {
    return ajax({
      url: `/nbi/brandclue/info/getVersionInfo?${Utils.objectToQueryString(prams)}`,
    })
  },
  postCplStatistics (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryCplStatistics`,
      data: prams
    })
  },
  postCplDetail (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryCplDetail`,
      data: prams
    })
  },
  postSaveSearchLog (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/saveSearchLog`,
      data: prams
    })
  },
  getListSearchLog (prams) {
    return ajax({
      url: `/nbi/brandclue/listSearchLog?${prams ? Utils.objectToQueryString(prams) : ''}`,
    })
  },
  postCplTop10 (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/brandclue/queryCplTop10`,
      data: prams
    })
  },
}