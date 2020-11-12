<template>
    <div>
        <v-container fluid>
            <v-card class="mb-4" outlined>
                <v-breadcrumbs :items="items" large divider="/"></v-breadcrumbs>
            </v-card>

            <Tabla />
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
            }
        }
    }
</script>