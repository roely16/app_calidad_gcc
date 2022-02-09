<template>
	<div>

		<Loading v-if="loading" />

		<v-card v-if="!loading">
			<v-card-title class="text-h5 grey lighten-2">
				Expedientes Rechazados
			</v-card-title>

			<v-card-text>
				
				<v-data-table
					:headers="rejected.headers"
					:items="rejected.items"
					:items-per-page="5"
					class="elevation-0 mt-4"
					hide-default-footer
				></v-data-table>

			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					text
					@click="setShow(false)"
				>
					Cerrar
				</v-btn>
			</v-card-actions>
		</v-card>

	</div>
</template>

<script>

	import { mapMutations, mapState } from "vuex"

	import Loading from '@/components/Animations/Loading'

	export default {

		components: {
			Loading
		},
		methods: {
			...mapMutations({
				setShow: 'modal/setShow'
			})
		},
		computed: {
			...mapState({
				loading: state => state.dashboard.loading,
				rejected: state => state.dashboard.rejected
			})
		}

	}
</script>