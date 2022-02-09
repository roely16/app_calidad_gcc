<template>
    <v-card>
        <v-container fluid>
            <v-row justify="space-between" dense>
                <v-col cols="12">
                    <highcharts :options="chartOptions"></highcharts>
                </v-col>
                <v-col cols="12">
                    <v-row dense>
                        <v-col>
                            <v-btn @click="getData" small icon class="mr-6">
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
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
                chartOptions: {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Expedientes ISO por Técnico'
                    },
                    subtitle: {
                        text: '11/2019'
                    },
                    accessibility: {
                        announceNewData: {
                            enabled: true
                        }
                    },
                    xAxis: {
                        type: 'category'
                    },
                    yAxis: {
                        title: {
                            text: 'Total de Expedientes'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true,
                                format: '{point.y}'
                            },
                            
                        }
                        
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                    },
                    series: [
                        {
                            name: "Expedientes ISO",
                            colorByPoint: true,
                            data: null
                        }
                    ],
                    credits: {
                        enabled: false
                    }
                },
                value: 80,
                date: null,
                menu: false,
                isLoading: false
            }
        },
        methods: {
            getData(){

                this.isLoading = true

                let data = {
                    name: "grafica_total_tecnicos",
                    param: {
                        mes: this.date
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    
                    this.date = response.data.response.result.mes
                    this.chartOptions.subtitle.text = response.data.response.result.mes_grafica
                    this.chartOptions.series[0].data = response.data.response.result.series
                    
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