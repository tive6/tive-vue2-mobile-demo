import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Mocard from './modules/mocard'
import Brand from './modules/brand'
import Finance from './modules/finance'
import Moka from './modules/moka'
import Clue from './modules/clue'
import Flow from './modules/flow'
import Cab from './modules/cab'
import BP from './modules/buryingPoint'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    User,
    Mocard,
    Brand,
    Finance,
    Moka,
    Clue,
    Flow,
    Cab,
    BP,
  }
})
