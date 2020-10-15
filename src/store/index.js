import Vue from 'vue'
import Vuex from 'vuex'

import auth from "@/store/modules/auth"
import contactsList from "@/store/modules/contactsList"
import alert from "@/store/modules/alert"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    contactsList,
    alert
  }
})
