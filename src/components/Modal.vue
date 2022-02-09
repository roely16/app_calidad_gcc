<template>
	<div>

		<v-dialog
			v-model="show"
			:width="width"
			@click:outside="setShow(false)"
			@keydown.esc="setShow(false)"
		>
			<slot name="content"></slot>
		</v-dialog>

	</div>
</template>

<script>

	import { mapState, mapMutations } from "vuex"

	export default {
		props: {
			width: Number
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			})
		},
		computed: {
			...mapState({
				show: state => state.modal.show
			})
		}
	}
</script>