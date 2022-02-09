const namespaced = true

const state = {
	show: false
}

const mutations = {
	setShow: (state, payload) => {
		state.show = payload
	}
}

const actions = {}

export default {
	namespaced,
	state,
	mutations,
	actions
}