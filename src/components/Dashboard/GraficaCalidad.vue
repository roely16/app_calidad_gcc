<template>
    <v-card>
        <v-container fluid>
            <v-row align="center" justify="center">
                <!-- <v-col align="center" justify="center">
                    <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="value"
                    color="teal"
                    >
                    {{ value }}
                    </v-progress-circular>
                </v-col> -->
            </v-row>
        </v-container>    
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                value: 80
            }
        }
    }
</script>