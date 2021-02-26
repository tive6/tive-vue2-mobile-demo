import Utils from '@/common/utils'
import { UserApi } from '@/api/index'

// const devToken = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJnYW9odWl5aW5nIiwidW5pcXVlVmFsdWUiOiJnYW9odWl5aW5nIiwiZXhwIjoxNjA5MTIxNzQ4fQ.BG9vxct-IJ9CKXmzCPOAlYnUDzjuMdm0xtaWRjM8JsKa5gozdUhRGjJsrpJOyW22IOSt05SObMkbx51cJASkIn0fbi1BsoTxslCVd761RS83sjTTaofhDGATn6NCajIrTxXLn6jd6vUvMbMnPnvPNIhoO9YOFtqc9a0GPXvsel4'
const devToken = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ4dWppbmd4aWFuZzEiLCJ1bmlxdWVWYWx1ZSI6Inh1amluZ3hpYW5nMSIsImV4cCI6MTY5MDcwMDE3NH0.DyppUeXN5lUWYHnuHYdJj72ulYU3GAgjWgeu41yn0B22J7cARYFzvTDFxEE_gj5SYXJ29Kh90Qg55gKAv3qKvGlIP4nyXhvVOA0ZEEzojYe-kzxXnmovY36oqb3WS30NzwCzXWS-7caXknLWuGhQWCwBqoQqZPsWeLJ_hGz4YIQ'

const isDev = process.env.NODE_ENV === 'development'
const isWkTest = window.location.hostname.includes('tnorbi')
const pubWhiteList = [
  'zhouxianfu',
  'xujingxiang1',
  'wangjungen',
  'huangwk',
  'chendq', // 陈冬泉
  'liran7', // 李然
  // 'gaoxiaofeng',
  // 'gaohuiying'
]

const USER_TOKEN = 'bi-user-token'
const GET_USER_TOKEN = 'GET_USER_TOKEN'
const GET_USER_INFO = 'GET_USER_INFO'
const GET_PUB_PER = 'GET_PUB_PER'
const PUBLISH_PERMISSION = 'bi-pub-per'
const GET_CURR = 'GET_CURR'

const User = {
  namespaced: true,

  state: {
    token: Utils.getCookie(USER_TOKEN),
    userInfo: {
      CnName: '测试文字',
      EmployeeNumber: '12345'
    },
    currentUser: [1, 2, 3],
    pubPer: Utils.getCookie(PUBLISH_PERMISSION),
    showNavBar: true,
    // showNavBar: !Utils.getCookie('x-app-version') || Utils.compareVersion(Utils.getCookie('x-app-version'), '6.4.0') < 0,
  },
  getters: {
    getUserToken (state) {
      return state.token
    },
    getUserInfo (state) {
      return state.userInfo
    },
    getUserPubPer (state) {
      return state.pubPer
    },
    getUserShowNavBar (state) {
      return state.showNavBar
    },
    getCurrentUsers (state) {
      return state.currentUser
      // return ["1_3_1","1_3_10","3.10.58.185","3.10.58.186","3.10.58.187","3.10.43","3.10.43.145","3.10.44","3.10.44.149","3.10.45","3.10.45.150","3.10.46","3.10.46.152","1_3_1_1","3.10.37.143","1_3_1_6","3.10.47","3.10.47.153","3.10.47.159","3.10.47.160","3.10.52","3.10.52.174","3.10.52.175","3.10.52.176","1_3_4","1_3_4_5","1_3_4_6","1_3_5","1_3_50","1_3_50_1","1_3_5_1","1_3_5_2","1_3_5_3","3.10.47.48","1_3_6_1","1_3_6_2","1_3_7","1_3_7_1","1_3_7_2","1_3_7_3","1_3_7_4","1_3_8","1_3_8_1","1_3_8_2","1_3_8_3","3.10.47.51","1_3_9_1","3.10.55.181","3.10.55.182"];
    },
  },
  mutations: {
    GET_USER_TOKEN: (state, token) => {
      state.token = token
    },
    GET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    GET_PUB_PER: (state, pubPer) => {
      state.pubPer = pubPer
    },
    GET_CURR: (state, currentUser) => {
      state.currentUser = currentUser
    },
  },
  actions: {
    async getUserToken ({ dispatch, commit, getters }) {
      // await dispatch('getUserInfo')
      try {
        console.log('isDev', isDev)
        !isDev && await dispatch('getUserInfo')
        let username = ''
        let list = []
        let testList = [...pubWhiteList, 'gaoxiaofeng', 'gaohuiying']
        let token = devToken
        if (isDev) {
          // dev
          username = 'gaohuiying'
          // username = 'huangwk'
          list = testList
        } else {
          // prod
          if (isWkTest) {
            // 蜗壳预生产
            list = testList
          } else {
            // 蜗壳生产
            list = pubWhiteList
          }
          username = getters.getUserInfo.DomainAccount || ''
          token = await UserApi.getUserTokenByCookie()
        }
        // token = await UserApi.getUserTokenByCookie()
        // alert(token)
        // let res = await UserApi.getUserToken({
        //   params: {
        //     username: username,
        //   }
        // })
        let pubState = Number(list.includes(username))
        Utils.setCookie(PUBLISH_PERMISSION, pubState)
        commit(GET_PUB_PER, pubState)

        Utils.setCookie(USER_TOKEN, token, { expires: 7 })
        commit(GET_USER_TOKEN, token)
        return token
      } catch (e) {
        throw new Error(e)
      }

    },
    async getUserInfo ({ commit }) {
      try {
        let res = await UserApi.getUserInfo()
        commit(GET_USER_INFO, res)
      } catch (e) {
        throw new Error(e)
      }
    },
    async getCurrentUser ({ commit }, prams) {
      let res = await UserApi.getCurrentUser(prams)
      commit(GET_CURR, res);
      return res
    },
  }
}

export default User

