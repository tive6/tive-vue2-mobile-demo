/*
 * @desc:
 * @author: zhangxin
 * @Date: 2020-06-09 10:30:36
 * @LastEditors: zhangxin
 * @LastEditTime: 2021-01-22 11:17:37
 */
import { Clue, UserApi } from '@/api/index';

const MokaStore = {
  namespaced: true,

  state: {
    title: '',
  },
  getters: {
    getTitle(state) {
      console.log('getter title: ', state.title);
      return state.title;
    },
  },
  mutations: {
    setTitle: (state, title) => {
      state.title = title;
    },
  },
  actions: {
    // 获取最大时间
    async getMaxDateForValidData({ commit }, prams) {
      const res = await Clue.getMaxDateForValidData(prams);
      return res;
    },
    // 概览
    async postOverview({ commit }, prams) {
      const res = await Clue.postOverview(prams);
      return res;
    },
    // 分端
    async postOverviewPlatform({ commit }, prams) {
      const res = await Clue.postOverviewPlatform(prams);
      return res;
    },
    // 分端
    async postOverviewSource({ commit }, prams) {
      const res = await Clue.postOverviewSource(prams);
      return res;
    },
    // 订单话单贡献
    async postOrderLeadsNum({ commit }, prams) {
      const res = await Clue.postOrderLeadsNum(prams);
      return res;
    },
    // 概览
    async postOrderLeadsNumGroupByPlatform({ commit }, prams) {
      const res = await Clue.postOrderLeadsNumGroupByPlatform(prams);
      return res;
    },
    // 概览
    async getPermission({ commit }, prams) {
      const res = await UserApi.getPermission(prams);
      return res;
    },
  },
};

export default MokaStore;
