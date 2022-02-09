<template>
	<div>
		<lottie loop :animationData="require('@/assets/lottie/loading.json')"/>
	</div>
</template>

<script>

	import LottieAnimation from 'lottie-web-vue'

	export default {

		components: {
			'lottie': LottieAnimation
		},

	}
</script>