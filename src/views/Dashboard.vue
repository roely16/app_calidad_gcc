<template>
    <div>

        <v-container fluid>

            <v-card outlined>
                <v-breadcrumbs :items="items" large divider="/"></v-breadcrumbs>
            </v-card>
            <v-row>
                <v-col cols="6">
                    <Grafica1 />
                </v-col>
                <v-col cols="6">
                    <GraficaCalidad />
                </v-col>
                <v-col cols="12">
                    <GraficaCriterios />
                </v-col>
                <v-col cols="12">
                    <GraficaUsuarios />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

    import Grafica1 from '@/components/Dashboard/Grafica1'
    import GraficaCriterios from '@/components/Dashboard/GraficaCriterios'
    import GraficaUsuarios from '@/components/Dashboard/GraficaUsuarios'
    import GraficaCalidad from '@/components/Dashboard/GraficaCalidad'

    export default {
        components: {
            Grafica1,
            GraficaCriterios,
            GraficaUsuarios,
            GraficaCalidad
        },
        data(){
            return{
                
                chart2: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Browser market shares in January, 2018'
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
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                            }
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'Chrome',
                            y: 61.41,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Internet Explorer',
                            y: 11.84
                        }, {
                            name: 'Firefox',
                            y: 10.85
                        }, {
                            name: 'Edge',
                            y: 4.67
                        }, {
                            name: 'Safari',
                            y: 4.18
                        }, {
                            name: 'Sogou Explorer',
                            y: 1.64
                        }, {
                            name: 'Opera',
                            y: 1.6
                        }, {
                            name: 'QQ',
                            y: 1.2
                        }, {
                            name: 'Other',
                            y: 2.61
                        }]
                    }]
                },
                
                items: [
                    {
                    text: 'Dashboard',
                    disabled: true,
                    href: 'breadcrumbs_dashboard',
                    },
                    
                ],
            }
        }
    }
</script>