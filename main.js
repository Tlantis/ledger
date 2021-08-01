import Vue from 'vue'
import App from './App'

import store from './store/index'

Vue.prototype.$store = store

import {myRequest, simRequest, requestJson} from './util/api.js'

Vue.prototype.$myRequest = myRequest
Vue.prototype.$simRequest = simRequest
Vue.prototype.$requestJson = requestJson

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
