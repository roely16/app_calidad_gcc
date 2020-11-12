<template>
    <div>
        <v-card>
            <v-container fluid>
                <v-row justify="space-between" dense>
                    <v-col cols="12">
                        <highcharts :options="chartOptions"></highcharts>
                    </v-col>
                    <v-col cols="12" >
                        <v-row dense>
                            <v-col >
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
    </div>
</template>

<script>
    export default {
        data(){
            return{
                chartOptions: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Control de Calidad'
                    },
                    subtitle: {
                        text: '11/2019'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<h2>{point.percentage:.1f}%</h2>',
                                useHTML: true,
                                distance: -40,
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        // align: 'right',
                        // layout: 'vertical',
                        // verticalAlign: 'middle',
                        labelFormatter: function(){
                            return this.name + ': ' + this.y
                        }
                    },
                    series: [{
                        name: 'Expedientes',
                        colorByPoint: true,
                        data: []
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
                    name: "grafica_pendientes",
                    param: {
                        mes: this.date
                    }
                }

                this.axios.post(process.env.VUE_APP_API_URL, data)
                .then((response) => {
                    
                    this.chartOptions.series[0].data = response.data.response.result.series
                    this.date = response.data.response.result.mes
                    this.chartOptions.subtitle.text = response.data.response.result.mes_grafica
                    this.isLoading = false
                    
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