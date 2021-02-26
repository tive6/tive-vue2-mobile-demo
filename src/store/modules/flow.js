// import Utils from '@/common/utils'

const GET_PAGE_ID = 'GET_PAGE_ID'

const Flow = {
  namespaced: true,

  state: {
    pageId: '',
  },
  getters: {
    getPageId (state) {
      return state.pageId
    },
  },
  mutations: {
    [GET_PAGE_ID]: (state, id) => {
      state.pageId = id
    },
  },
  actions: {
  }
}

export default Flow
