// import Utils from '@/common/utils'

const GET_TABS_INDEX = 'GET_TABS_INDEX'
const GET_PAGE_ID = 'GET_PAGE_ID'
const SET_AUTH_LIST = 'SET_AUTH_LIST'


const Finance = {
  namespaced: true,

  state: {
    tabsIndex: '3.11.59',
    pageId: '',
    authList: [],
  },
  getters: {
    getTabsIndex (state) {
      return state.tabsIndex
    },
    getPageId (state) {
      return state.pageId
    },
    getAuthList (state) {
      return state.authList
    },
  },
  mutations: {
    [GET_TABS_INDEX]: (state, index) => {
      state.tabsIndex = index
    },
    [GET_PAGE_ID]: (state, id) => {
      state.pageId = id
    },
    [SET_AUTH_LIST]: (state, authList) => {
      state.authList = authList
    },
  },
  actions: {
  }
}

export default Finance
