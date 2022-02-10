<template>
    <div>
        <v-container fluid>
            <v-card class="mb-4" outlined>
                <v-breadcrumbs :items="items" large divider="/"></v-breadcrumbs>
            </v-card>

            <Tabla />

            <!-- <v-row v-if="status == 102" class="mt-4" justify="center">
                <v-col cols="6">
                    <v-alert
                        prominent
                        type="error"
                    >
                        <v-row align="center">
                            <v-col class="grow">
                                {{ message }}
                            </v-col>
                            <v-col class="shrink">
                                <v-btn>IR</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-col>
            </v-row> -->
            
        </v-container>
    </div>
</template>

<script>

    import Tabla from '@/components/Control/Tabla'

    export default {
        components: {
            Tabla
        },
        data(){
            return{
                 items: [
                    {
                        text: 'Control de Calidad',
                        disabled: true,
                        href: '/#/calidad',
                    },
                   
                ],
                status: null,
                message: null
            }
        },
        methods: {

            obtener_usuario(){

                let data = {
                    name: "obtener_usuario",
                    param: {

                    },
                };

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    // eslint-disable-next-line no-console
                    console.log(response.data);
                    this.status = response.data.response.status
                    this.message = response.data.response.result
                })

            }

        },
        mounted(){

            this.obtener_usuario()

        }
    }
</script>