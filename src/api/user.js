import { ajax } from './ajax'

export default {
  getToken() {
    return ajax({
      url: '/api/xxx',
    })
  },
  getUserInfo () {
    return ajax({
      url: '/api/xxx',
    })
  },
}