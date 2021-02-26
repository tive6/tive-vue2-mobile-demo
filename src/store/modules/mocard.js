/*
 * @desc: 
 * @author: zhangxin
 * @Date: 2020-06-10 11:03:15
 * @LastEditors: zhangxin
 * @LastEditTime: 2020-06-21 19:58:26
 */
import Utils from '@/common/utils'
import { UserApi } from '@/api/index'

const USER_TOKEN = 'bi-user-token'
const GET_MOTS_INDEX = 'GET_MOTS_INDEX'

const Mocard = {
  namespaced: true,

  state: {
    motsIndex: 0,
  },
  getters: {
    getMotsIndex (state) {
      return state.motsIndex
    },
  },
  mutations: {
    GET_MOTS_INDEX: (state, index) => {
      state.motsIndex = index
    },
  },
  actions: {
    async getUserToken ({ dispatch, commit, getters }) {
      // await dispatch('getUserInfo')
      try {
        // await dispatch('getUserInfo')
      } catch (e) {
        console.log(e)
      }
      return new Promise((resolve, reject) => {
        let username = getters.getUserInfo.DomainAccount || 'gaoxiaofeng'
        // let username = getters.getUserInfo.DomainAccount || ''
        // console.log('【username】：', username)
        // if (!username) {
        // 	return reject('【vuex：】token为空！')
        // }
        UserApi.getUserToken({
          params: {
            username: 'gaohuiying',
          }
        }).then(res => {
          // console.log('【token】：', res)
          Utils.setCookie(USER_TOKEN, res, { expires: 7 })
          commit(GET_USER_TOKEN, res)
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
  }
}

export default Mocard
