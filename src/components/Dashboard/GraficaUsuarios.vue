<template>
    <v-card>
        <v-container fluid>
            <v-row dense>
                <v-col cols="12">
                    <highcharts :options="grafica"></highcharts>
                </v-col>

                <v-col cols="12">
                    <v-row justify="center" dense>
                        <v-col >
                            <v-btn small icon class="mr-6" @click="getData">
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                            <!-- <v-btn small icon class="mr-6">
                                <v-icon>mdi-calendar</v-icon>
                            </v-btn> -->
                            <v-btn small icon class="mr-6">
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on }">
                                        <v-icon v-on="on">mdi-calendar</v-icon>
                                    </template>
                                    <v-date-picker v-model="date" :show-current="false" type="month" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn text color="primary" @click="changeDate">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-btn>
                            
                        </v-col >
                        <v-col v-if="isLoading" align="right">
                           <v-progress-circular
                                indeterminate
                                color="primary"
                                :size="25"
                            ></v-progress-circular>
                        </v-col>
                        
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        data(){
            return{
                grafica: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'CANTIDAD DE ERRORES POR USUARIO'
                    },
                    subtitle: {
                        text: '11/2019'
                    },
                    xAxis: {
                        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Total de Errores'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold',
                            
                            }
                        }
                    },
                    legend: {
                        // align: 'right',
                        // x: -30,
                        // verticalAlign: 'bottom',
                        // y: 25,
                        // floating: false,
                        
                        // borderColor: '#CCC',
                        // borderWidth: 1,
                        // shadow: false
                    },
                    tooltip: {
                        headerFormat: '<b>{point.x}</b><br/>',
                        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                    },
                    plotOptions: {
                        column: {
                            stacking: 'normal',
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: 'John',
                        data: [5, 3, 4, 7, 2]
                    }, {
                        name: 'Jane',
                        data: [2, 2, 3, 2, 1]
                    }, {
                        name: 'Joe',
                        data: [3, 4, 4, 2, 5]
                    }],
                    credits: {
                        enabled: false
                    }
                },
                date: null,
                menu: false,
                isLoading: false
            }
        },
        methods: {
            getData(){

                this.isLoading = true

                let data = {
                    name: "grafica_errores_usuario",
                    param: {
                        mes: this.date
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    this.grafica.xAxis.categories = response.data.response.result.CATEGORIAS
                    this.grafica.subtitle.text = response.data.response.result.mes_grafica
                    this.date = response.data.response.result.mes
                    this.grafica.series = response.data.response.result.SERIES
                    this.isLoading = false
                    console.log(response.data)                    
                })

            },
            changeDate(){

                this.$refs.menu.save(this.date)

                this.getData()

            }
        },
        mounted(){

            this.getData()

        }
    }
</script>