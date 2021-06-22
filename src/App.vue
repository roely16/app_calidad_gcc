<template>
	<v-app id="inspire">

		<!-- Drawer -->
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
			dark
		>
			<v-list dense>
				<template v-for="item in items">
					<v-row
						v-if="item.heading"
						:key="item.heading"
						align="center"
					>
						<v-col cols="6">
						<v-subheader v-if="item.heading">
							{{ item.heading }}
						</v-subheader>
						</v-col>
						<v-col
						cols="6"
						class="text-center"
						>
						<a
							href="#!"
							class="body-2 black--text"
						>EDIT</a>
						</v-col>
					</v-row>
					<v-list-group
						v-else-if="item.children"
						:key="item.text"
						v-model="item.model"
						:prepend-icon="item.model ? item.icon : item['icon-alt']"
						append-icon=""
					>
						<template v-slot:activator>
						<v-list-item>
							<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						</template>
						<v-list-item
						v-for="(child, i) in item.children"
						:key="i"
						link
						>
						<v-list-item-action v-if="child.icon">
							<v-icon>{{ child.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
							{{ child.text }}
							</v-list-item-title>
						</v-list-item-content>
						</v-list-item>
					</v-list-group>


					<v-list-item
						v-else
						:key="item.text"
						link
						:to="item.to"
					>
						<v-list-item-action>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-content>
							<v-list-item-title>
								{{ item.text }}
							</v-list-item-title>
						</v-list-item-content>
					</v-list-item>


				</template>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			:clipped-left="$vuetify.breakpoint.lgAndUp"
			app
			color="blue darken-3"
			dark
		>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
		
			<v-toolbar-title
				
				class="ml-0 pl-4"
			>
				<span class="hidden-sm-and-down">Control de Calidad</span>
			</v-toolbar-title>

			<!-- <v-text-field
				flat
				solo-inverted
				hide-details
				prepend-inner-icon="mdi-magnify"
				label="Search"
				class="hidden-sm-and-down"
			/> -->
			<v-spacer />
			<!-- <v-btn icon>
				<v-icon>mdi-apps</v-icon>
			</v-btn> -->
			<v-btn icon>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<!-- <v-btn
				icon
				large
			>
				<v-avatar
				size="32px"
				item
				>
				<v-img
					src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
					alt="Vuetify"
				/></v-avatar>
			</v-btn> -->
		</v-app-bar>

		<v-content>
			<router-view/>
		</v-content>
	</v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
	dialog: false,
		drawer: false,
		items: [
			{ icon: 'mdi-monitor-dashboard', text: 'Dashboard', to: '/' },
			{ icon: 'mdi-file-document-box-check', text: 'Control de Calidad', to: '/calidad' },
			{ icon: 'mdi-file-document-box-check', text: 'Reportes', to: '/reportes' },
		],
	}),
};
</script>
