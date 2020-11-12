<template>
    <div>
        <v-tabs background-color="primary" fixed-tabs dark>
            <v-tab @click="pendientes">
                <!-- Pendientes -->
                <v-icon left>mdi-alarm</v-icon>
                <v-badge color="error" right>
                    <template v-slot:badge>
                        <span>{{ total_pendientes }}</span>
                    </template>
                    <span class="mr-4">Pendientes</span>
                </v-badge>
            </v-tab>
            <v-tab @click="realizado">
                <!-- Realizado -->
                <v-icon left>mdi-check-all</v-icon>
                <v-badge color="success" right>
                    <template v-slot:badge>
                        <span>{{ total_realizado }}</span>
                    </template>
                    <span class="mr-4">FINALIZADOS</span>
                </v-badge>
            </v-tab>
            <v-tab @click="todas">
                <v-icon left>mdi-check-all</v-icon>
                <v-badge color="secondary" class="mr-4" right>
                    <template v-slot:badge>
                        <span>{{ total_todas }}</span>
                    </template>
                    <span class="mr-4">TODOS</span>
                </v-badge>
            </v-tab>
        </v-tabs>
        <v-card outlined>
            <v-card-title class="mb-4">
                <v-row dense>
                    <v-col cols="4">
                         <v-text-field append-icon="mdi-magnify" v-model="search" dense label="Buscar" placeholder="Ingrese el texto a buscar..." clearable outlined hide-details autocomplete="off">

                        </v-text-field>
                    </v-col>
                    <v-col cols="6">

                    </v-col>
                    <v-col cols="2">
                        <v-select
                            dense
                            label="Filas por página"
                            hide-details
                            outlined
                            :items="filas"
                            v-model="filas_selected"
                        >
                        </v-select>
                    </v-col>
                </v-row>
            </v-card-title>
        
            <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="filas_selected"
                :page.sync="page"
                class="elevation-1"
                fixed-header
                hide-default-footer
                @page-count="pageCount = $event"
                :search="search"
                :loading="isLoading"
            >
                <template v-slot:item.accion="{item}">                   
                    <v-icon v-if="item.FILTRO == 'pendientes'" color="success" @click="showModal(item, 'edit')">mdi-check</v-icon>

                    <v-icon v-if="item.FILTRO != 'pendientes'" color="info" @click="showModal(item, 'info')">mdi-information</v-icon>

                </template>

                <template v-slot:item.DOCUMENTO="{item}">
                    {{ item.DOCUMENTO }} - {{ item.ANIO }}
                </template>

                <template v-slot:item.ESTADO="{item}">
                    <v-icon :color="item.ACIERTO <= 0 ? 'error' : 'success'" >{{ item.ACIERTO <= 0 ? 'mdi-alarm' : item.ACIERTO < 2 ? 'mdi-check' : 'mdi-check-all' }}</v-icon>

                </template>
               
            </v-data-table>

        </v-card>
        
        <v-row justify="center" align="center" dense>
            <v-col cols="3">
                <!-- <span class="title">Mostrando {{ init_pagina }} - {{ page * filas_selected }} de {{ items.length }}</span> -->
            </v-col>
            <v-col>
                <div class="text-center mt-6">
                    <v-pagination
                    v-model="page"
                    :length="pageCount"
                    :total-visible="10"
                    ></v-pagination>
                </div>
            </v-col>
            <v-col cols="3"></v-col>
        </v-row>
        

        <Modal :show="show_modal" :item="select_item" :mode="modal_mode" @close="cerrarModal" />

    </div>
</template>

<script>

    import Modal from '@/components/Control/Modal'

    export default {
        components: {
            Modal
        },
        data(){
            return{
                headers: [],
                items: [],
                page: 1,
                filas: [5, 10, 15, 25],
                filas_selected: 10,
                show_modal: false,
                pageCount: 0,
                select_item: {},
                filtro: 'pendientes',
                total_pendientes: null,
                total_realizado: null,
                total_todas: null,
                modal_mode: null,
                search: null,
                isLoading: false
            }
        },
        methods: {
            obtenerDatos(){

                this.isLoading = true

                let data = {
                    name: "obtener_documentos",
                    param: {
                        filtro: this.filtro
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    this.items = response.data.response.result.items
                    this.headers = response.data.response.result.headers
                    this.total_pendientes = response.data.response.result.total_pendientes
                    this.total_realizado = response.data.response.result.total_realizado
                    this.total_todas = response.data.response.result.total_todas
                    this.isLoading = false
                })

            },
            showModal(item, mode){

                this.select_item = item
                this.modal_mode = mode
                this.show_modal = true

            },
            cerrarModal(){

                this.show_modal = false

            },
            pendientes(){
                this.filtro = 'pendientes'
                this.search = null
                this.obtenerDatos()
            },
            realizado(){
                this.filtro = 'realizado'
                this.search = null
                this.obtenerDatos()
            },
            todas(){
                this.filtro = 'todas'
                this.search = null
                this.obtenerDatos()
            }
        },
        computed: {
            init_pagina: function(){

                if (this.page == 1) {
                    return 1
                }else{

                    let number = (this.filas_selected * (this.page - 1)) + 1

                    return number
                }

            }
        },
        mounted(){

            this.obtenerDatos()

            this.$root.$on('reload-documentos', () =>{
                this.obtenerDatos()
            })

        }
    }
</script>