import { ajax } from './ajax'
import Utils from '@/common/utils'

export default {
  getUserInfo () {
    return ajax({
      url: '/Employee/GetCurrentLoginUser',
    })
  },
  getUserToken (opts, callback) {
    return ajax(Object.assign({
      url: '/nbi/auth/token',
    }, opts, {
      callback
    }))
  },
  getUserTokenByCookie () {
    return ajax({
      url: '/nbi/auth/getTokenByCookie',
    })
  },
  getUserMainModuleAuth () {
    return ajax({
      url: '/nbi/uc/nbiUBusiness/listModuleByCurrentUser',
    })
  },
  getCurrentUser (prams) {
    return ajax({
      // url: `/nbi/uc/nbiUResource/listResourceByCurrentUser?${prams ? Utils.objectToQueryString(prams) : ''}`,
       url: `/nbi/uc/uResource/permission?${prams ? Utils.objectToQueryString(prams) : ''}`,
    })
  },
  postErrors (prams) {
    return ajax({
      method: 'POST',
      url: `/nbi/mocard/errors`,
      data: prams
    })
  },
  getPermission (params) {
    return ajax({
      method: 'GET',
      url: `/nbi/uc/uResource/permission`,
      params: params
    })
  },
}