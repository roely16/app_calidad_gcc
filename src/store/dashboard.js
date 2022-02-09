import axios from 'axios'

const namespaced = true

const state = {
	loading: false,
	rejected: {}
}

const mutations = {
	setLoading: (state, payload) => {
		state.loading = payload
	},
	setRejected: (state, payload) => {
		state.rejected = payload
	}
}

const actions = {

	async fetchRejected({commit}, payload){
		
		try {
			
			commit('setLoading', true)

			const data = {
				name: "detalle_rechazados",
				param: {
					month: payload
				}
			}

			const response = await axios.post(process.env.VUE_APP_API_URL, data)

			if (response.data.response.status == 200) {
				
				commit('setRejected', response.data.response.result)

				commit('setLoading', false)

			}

		} catch (error) {
			
			// eslint-disable-next-line no-console
			console.log(error)

		}

	}

}

export default {
	namespaced,
	state,
	mutations,
	actions
}