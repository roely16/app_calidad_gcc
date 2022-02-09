import Vue from 'vue'
import Vuex from 'vuex'

import modal from './store/modal'
import dashboard from './store/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	modules: {
		modal: modal,
		dashboard: dashboard
	}
})
