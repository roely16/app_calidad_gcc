<template>
    <v-row justify="center">
    <v-dialog
        v-model="intShow"
        scrollable 
    >
        <v-card :loading="isLoading">
            <v-toolbar flat color="primary" dark>
                <v-btn icon dark @click="intShow = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ item.DOCUMENTO }} - {{ item.ANIO }}</v-toolbar-title>
                <template v-slot:extension>
                    <v-tabs dark background-color="primary" v-model="tab">
                        
                        <v-tab >
                            <v-icon left>mdi-check-all</v-icon>
                            Calidad
                        </v-tab>

                        <v-tab >
                            <v-icon left>mdi-message-alert</v-icon>
                            <v-badge color="error" right>
                                <template v-if="errores.length > 0" v-slot:badge>
                                    <span>{{ errores.length }}</span>
                                </template>
                                <span>Errores</span>
                            </v-badge>
                        </v-tab>

                    </v-tabs>
                </template>
            </v-toolbar>
              
            <v-card-text class="ml-0 pl-0 mr-0 pr-0" style="height: 600px;">

                <v-tabs-items v-model="tab">

                    <v-tab-item :disabled="!mode == 'edit'">
                        <v-card  flat>
                            <v-card-text style="padding-top: 0px">
                                
                                <!-- Mostrar el detalle de los diferentes controles de calidad -->

                                <v-row v-if="detalle_acierto" justify="center" align="center">
                                    <v-col cols="8">

                                        <v-expansion-panels focusable accordion>
                                            <v-expansion-panel
                                                v-for="(acierto, key) in detalle_acierto" 
                                                :key="key" 
                                            >
                                                <v-expansion-panel-header>
                                                    <v-row justify="center">
                                                        <v-col cols="1">
                                                            <v-icon color="success" large>
                                                                mdi-check
                                                            </v-icon> 
                                                        </v-col>
                                                        <v-col cols="11">
                                                            <span class="overline">
                                                                El expediente ha cumplido con los criterios de calidad correspondientes a la FASE {{ key + 1 }} en fecha {{ acierto.FECHA }}
                                                            </span>
                                                        </v-col>
                                                    </v-row>
                                                    
                                                </v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-row v-for="(criterio, key) in acierto.CRITERIOS" :key="key">
                                                        <v-col cols="12">
                                                            <strong>
                                                                {{ criterio.NOMBRE }}
                                                            </strong>
                                                            
                                                            <v-divider class="mt-2"></v-divider>
                                                            <v-row>
                                                                <v-col v-for="(item, key) in criterio.ITEMS" :key="key" cols="6">
                                                                    <v-icon :color="item.NO_APLICA ? null : 'success'" size="20" class="mr-2">
                                                                        {{ item.NO_APLICA ? 'mdi-circle-off-outline' : 'mdi-checkbox-marked' }}    
                                                                    </v-icon>
                                                                    <span :style="[item.NO_APLICA ? {'text-decoration' : 'line-through'} : null]">
                                                                        {{ item.NOMBRE }}
                                                                    </span>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>

                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-col>
                                </v-row>

                                <v-list-item v-for="(criterio, key) in criterios" :key="key">
                                    <v-list-item-content>
                                        <v-list-item-title style="margin-top: 0px">
                                            <div class="title font-weight-black">{{ criterio.NOMBRE }}</div>
                                           
                                        </v-list-item-title>
                                        <v-container class="ml-6" fluid>
                                            <v-row dense>
                                                <v-col cols="6" v-for="(detalle, key) in criterio.DETALLE" :key="key">
                                                    <v-row no-gutters align="center" justify="center">
                                                        <v-col class="mt-0 pt-0">
                                                             <v-checkbox :disabled="mode != 'edit' || detalle.NO_APLICA"  hide-details v-model="detalle.CUMPLE" @change="indeterminate(detalle)"> </v-checkbox>
                                                        </v-col>
                                                        <v-col cols="11">
                                                            <div class="pt-4">
                                                                <span @click="() => {

                                                                    detalle.NO_APLICA = !detalle.NO_APLICA

                                                                   
                                                                }" :style="[detalle.NO_APLICA ? {'text-decoration' : 'line-through', 'cursor' : 'pointer'} : {'cursor' : 'pointer'}]">{{ detalle.NOMBRE }}</span>
                                                            </div>
                                                                
                                                        </v-col>
                                                    </v-row>

                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-list-item-content>
                                </v-list-item>
                            
                                <v-row v-if="criterios.length > 0" justify="center" align="center">
                                    <v-col cols="6" align="center" justify="center">
                                        <v-textarea
                                            label="Comentario"
                                            v-model="comentario"
                                            placeholder="Ingrese un comentario sobre el control de calidad realizado."
                                            outlined
                                            :disabled="mode != 'edit'"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col align="center" justify="center">
                                        <v-btn color="error" :loading="rechazando" @click="rechazar()" :disabled="allChecked || rechazando || mode != 'edit'" class="mr-4" x-large>
                                            <v-icon left>mdi-thumb-down</v-icon>
                                            RECHAZAR
                                        </v-btn>
                                        <v-btn color="success" :loading="aceptando" :disabled="!allChecked || aceptando || mode != 'edit'" @click="aceptar()" x-large>
                                            <v-icon left>mdi-thumb-up</v-icon>
                                            ACEPTAR
                                        </v-btn>
                                        {{ criterios_cumplen }}
                                    </v-col>
                                    
                                </v-row>

                            
                            </v-card-text>
                        </v-card>
                    </v-tab-item>

                    <v-tab-item>
                        <v-container fluid>
                            
                            <v-row v-if="errores.length == 0" dense justify="center" align="center">
                                <v-col cols="8">
                                    <v-alert border="top" colored-border elevation="2" class="mt-4" type="info">
                                        El expediente no ha presentando ningun error.
                                    </v-alert>
                                </v-col>
                            </v-row>

                            <v-row dense>
                                <v-col>
                                    <v-data-iterator
                                        :items="errores"
                                        disable-pagination
                                        hide-default-footer
                                        no-data-text=""
                                    >
                                    <template v-slot:default="props">
                                        <v-row>
                                            <v-col
                                                v-for="(error, key) in props.items"
                                                :key="key"
                                                cols="12"
                                                sm="6"
                                                md="4"
                                                lg="4"
                                            >
                                            <v-card>
                                                <v-card-title>
                                                    <v-list-item two-line>
                                                        <v-list-item-avatar>
                                                        <v-icon
                                                            class="red white--text"
                                                        >
                                                            mdi-message-alert
                                                        </v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title>{{ error.FECHA }}</v-list-item-title>
                                                            <v-list-item-subtitle>{{ error.USUARIO }}</v-list-item-subtitle>
                                                            
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-card-title>
                                                <v-divider></v-divider>
                                                <v-list class="overflow-y-auto" height="250" dense>
                                                    
                                                    <v-list-item
                                                        v-for="(error, i) in error.DETALLE"
                                                        :key="i"
                                                        
                                                    >
                                                        <template v-slot:default="{  }">
                                                            <v-list-item-content class="ml-5">
                                                            
                                                                <v-subheader>{{ error.NOMBRE }}</v-subheader>

                                                                <v-list-item v-for="(item, key) in error.LISTADO_ERRORES" :key="key">
                                                                    {{ item.NOMBRE }}
                                                                </v-list-item>

                                                            </v-list-item-content>
                                                        </template>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-col>
                                        </v-row>
                                    </template>
                                    </v-data-iterator>
                                </v-col>
                            </v-row>

                        </v-container>
                    </v-tab-item>

                </v-tabs-items>
                
            </v-card-text>
        </v-card>
    </v-dialog>
    </v-row>
</template>

<script>
    export default {
        props: {
            id: {
                type: Number,
                default: null
            },
            show: Boolean,
            item: {
                type: Object,
                default: null,
                required: false
            },
            mode: {
                type: String,
                default: null,
                required: false
            }
        },
        data(){
            return{
                dialog: false,
                criterios: [],
                isLoading : false,
                criterios_cumplen: null,
                //allChecked: false,
                aceptando: false,
                rechazando: false,
                comentario: null,
                tab: 0,
                errores: [],
                detalle_acierto: null
            }
        },
        methods: {
            obtener_detalle(){

                this.isLoading = true

                let data = {
                    name: "obtener_criterios",
                    param: {
                        documento: this.item
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    this.criterios = response.data.response.result
                })

                // Obtener el detalle del documento

                let data_ = {
                    name: "obtener_detalle",
                    param: {
                        documento: this.item
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data_)
                .then((response) => {
                    // eslint-disable-next-line no-console
                    console.log(response.data)
                    this.errores = response.data.response.result.ERRORES
                    this.detalle_acierto = response.data.response.result.ACIERTO
                    this.isLoading = false
                })

            },
            aceptar(){

                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Ya no podrá alterar el control de calidad registrado!",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#47ad51',
                    cancelButtonColor: '#b5b5b5',
                    confirmButtonText: 'Si, aceptar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {

                    if (result.value) {

                        this.aceptando = true

                        let array_no_aplican = []

                        this.criterios.forEach(criterio => {
                            
                            let no_aplican = criterio.DETALLE.filter( item => item.NO_APLICA )

                            no_aplican.forEach(element => {
                                array_no_aplican.push(element)
                            });

                        });

                        let data = {
                            name: "aceptar_documento",
                            param: {
                                documento: this.item,
                                comentario: this.comentario,
                                no_aplican: array_no_aplican
                            }
                        }

                        // eslint-disable-next-line no-console
                        console.log(data);
                        
                        this.axios.post(process.env.VUE_APP_API_URL, data)
                        // eslint-disable-next-line no-unused-vars
                        .then((response) => {
                            
                            // eslint-disable-next-line no-console
                            console.log(response.data);
                            
                            this.aceptando = false

                            // eslint-disable-next-line no-undef
                            Swal.fire(
                                'Excelente!',
                                'El expediente ha superado el control de calidad.',
                                'success'
                            ).then(() => {
                                this.$root.$emit('reload-documentos');
                                this.intShow = false
                            })

                        })
                        

                        
                    }
                })

            },
            rechazar(){

                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "El expediente será reasignado al usuario responsable y se registrará un servicio no conforme!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#b5b5b5',
                    confirmButtonText: 'Si, rechazar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {

                    if (result.value) {

                        this.rechazando = true

                        // Buscar los errores
                        let array_criterios = []
                        let array_no_aplican = []

                        this.criterios.forEach(criterio => {
                            
                            let no_cumplen = criterio.DETALLE.filter( item => !item.CUMPLE && !item.NO_APLICA )
                            
                            let no_aplican = criterio.DETALLE.filter( item => item.NO_APLICA )
                            
                            // Por cada que no cumplen agregar
                            no_cumplen.forEach(element => {
                                array_criterios.push(element)
                            });

                            no_aplican.forEach(element => {
                                array_no_aplican.push(element)
                            });

                        });

                        let data = {
                            name: "rechazar_documento",
                            param: {
                                documento: this.item,
                                errores: array_criterios,
                                comentario: this.comentario,
                                no_aplican: array_no_aplican
                            }
                        }

                        // eslint-disable-next-line no-console
                        console.log(data);
                        
                        this.axios.post(process.env.VUE_APP_API_URL, data)
                        .then((response) => {
                            
                            // eslint-disable-next-line no-console
                            console.log(response.data)

                            this.rechazando = false

                            // eslint-disable-next-line no-undef
                            Swal.fire(
                                'Excelente!',
                                'El expediente será reasignado al usuario responsable.',
                                'success'
                            ).then(() => {
                                this.$root.$emit('reload-documentos');
                                this.intShow = false
                            })

                        })
                        
                        
                    }

                })

            },
            checkAll(criterio){

                if (criterio.TODOS) {
                    
                    criterio.DETALLE.forEach(element => {
                        element.CUMPLE = true
                    });

                }else{
                    criterio.DETALLE.forEach(element => {
                        element.CUMPLE = false
                    });
                }

                this.enabledAceptar()

            },
            indeterminate(detalle){

                let criterio = this.criterios.filter( element => element.ID == detalle.ID_CRITERIO )
                
                let cumplen = criterio[0].DETALLE.filter( element => element.CUMPLE )

                if (criterio[0].DETALLE.length == cumplen.length) {
                    criterio[0].TODOS = true
                    criterio[0].INDETERMINATE = false
                }else if(cumplen.length == 0){
                    criterio[0].TODOS = false
                    criterio[0].INDETERMINATE = false
                }else if(criterio[0].DETALLE.length > cumplen.length){
                    criterio[0].INDETERMINATE = true
                    criterio[0].TODOS = false
                }

                //this.enabledAceptar()

            },
            /*enabledAceptar(){

                //let no_checked = this.criterios.filter( criterio => !criterio.TODOS ).length

                this.criterios.forEach(element => {
                    
                });

                if (no_checked == 0) {
                    this.allChecked = true
                }else{
                    this.allChecked = false
                }

            }
            */
        },
        computed: {
            intShow: {
                get: function(){
                    if (this.show) {
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.tab = 0
                        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                        this.comentario = null
                        this.obtener_detalle()
                    }
                    return this.show
                },
                set: function(value){
                    if (!value) {
                        this.$emit('close')
                    }
                }
            },
            allChecked(){

                // eslint-disable-next-line no-unused-vars
                let num_categorias = this.criterios.length
                
                let all_checked = 0

                this.criterios.forEach(element => {
                    // eslint-disable-next-line no-console
                    
                    // eslint-disable-next-line no-unused-vars
                    let num_criterios = element.DETALLE.length
                    
                    let checked = element.DETALLE.filter( element => element.CUMPLE ).length

                    let no_aplica = element.DETALLE.filter( element => element.NO_APLICA ).length

                    if (num_criterios == (checked + no_aplica)) {
                        
                        // eslint-disable-next-line no-console
                        all_checked++

                    }
                
                });

                if (all_checked == num_categorias) {
                    return true
                }else{
                    return false
                }

            }
            
        },
        
    }
</script>