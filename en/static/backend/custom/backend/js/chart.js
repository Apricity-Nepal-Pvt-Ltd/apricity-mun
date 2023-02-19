//HIGHCHARTS EXPORT MENU
var exportContextMenu = {
    buttons: {
        contextButton: {
            menuItems: [{
                textKey: 'downloadPNG',
                onclick: function() {
                    this.exportChart();
                }
            }, {
                textKey: 'downloadJPEG',
                onclick: function() {
                    this.exportChart({
                        type: 'image/jpeg'
                    });
                }
            }, {
                textKey: 'downloadPDF',
                onclick: function() {
                    this.exportChart({
                        type: 'image/pdf'
                    });
                }
            }, {
                textKey: 'downloadCSV',
                onclick: function() {
                    this.downloadCSV();
                }
            }]
        }
    }
}



function genericPieChart(data, divid, chart_title, xAxisTitle) {
    // console.log(data);
    // Build the chart
    Highcharts.chart(divid, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: chart_title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        colors: ['#234a83', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],

        series: [{
            name: 'Percentage of distribution',
            colorByPoint: true,
            data: data.series
        }],
        exporting: exportContextMenu
    });
}

function GenericBarChart(data, divid, chart_title, xAxisTitle, barType) {

    Highcharts.chart(divid, {
        chart: {
            type: barType
        },
        title: {
            text: chart_title
        },
        xAxis: {
            categories: data.categories,
            // allowDecimals:false,
            title: {
                text: xAxisTitle,
                enabled: false
            },
            // labels: {
            //   enabled:false
            // }
        },
        yAxis: {
            min: 0,
            title: {
                enabled: false,
                text: 'Counts',
                align: 'high'
            },
            // labels: {
            //   overflow: 'justify'
            // }
        },
        tooltip: {
            valueSuffix: ' ',
            formatter: function() {
                return '<b>' + this.x + '</b><br/>' +
                    Highcharts.numberFormat(this.y, 0);
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: false,
                    formatter: function() {
                        return Highcharts.numberFormat(this.y, 0)
                    }
                }
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        colors: ['#234a83', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],

        series: data.series,
        exporting: exportContextMenu

    });

};


function GenericPyramidChart(data, divid, chartTitle) {
    Highcharts.chart(divid, {
        chart: {
            type: 'bar'
        },
        title: {
            text: chartTitle
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
            }
        },
        xAxis: [{
            categories: data.categories,
            reversed: false,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (male)'
            }
        }, { // mirror axis on right side
            opposite: true,
            reversed: false,
            categories: data.categories,
            linkedTo: 0,
            labels: {
                step: 1
            },
            accessibility: {
                description: 'Age (female)'
            }
        }],
        yAxis: {
            title: {
                text: null
            },
            labels: {
                formatter: function() {
                    return Math.abs(this.value);
                }
            },
            accessibility: {
                description: 'Percentage population',
                rangeDescription: 'Range: 0 to 5%'
            }
        },

        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },

        tooltip: {
            formatter: function() {
                return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                    'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
            }
        },

        credits: {
            enabled: false
        },
        colors: ['#234a83', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        series: data.series,
        exporting: exportContextMenu
    })
}

function GenericDonutChart(data, divid, chartTitle) {
    Highcharts.chart(divid, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: chartTitle,
            align: 'center',
            verticalAlign: 'middle',
            y: 80
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        credits: {
            enabled: false
        },
        colors: ['#234a83', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        series: data.series,
        exporting: exportContextMenu
    })

}

function GenericLineChart(data, divid, chartTitle, xAxisTitle) {
    Highcharts.chart(divid, {
        chart: {
            type: 'line'
        },
        title: {
            text: chartTitle,
        },
        xAxis: {
            categories: data.categories,
            title: {
                text: xAxisTitle,
                enabled: false
            }
        },

        yAxis: {
            title: {
                text: 'Amount'
            }
        },

        legend: {
            layout: 'horizontal',
            align: 'center'
                // verticalAlign: 'middle'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            point: {
                colorByPoint: true
            }
        },
        colors: ['#d35400', '#23835B', '#23835B', '#23835B'],


        series: data.series,
        exporting: exportContextMenu

    });
}

function GenericMultibarChart(data, divid, chartTitle, xAxisTitle) {
    Highcharts.chart(divid, {
        chart: {
            type: 'column'
        },
        title: {
            text: chartTitle,
        },
        xAxis: {
            categories: data.categories,
            title: {
                text: 'Cumulative Amount',
                // enabled: false
            }
        },

        yAxis: {
            title: {
                text: 'Amount'
            }
        },

        legend: {
            layout: 'horizontal',
            align: 'center',
            itemStyle: {
                color: '#23835B',
                fontWeight: 'bold'
            },
            enabled: false
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            column: {
                colorByPoint: true
            }
        },
        colors: ['#d35400', '#23835B', '#23835B', '#23835B'],
        series: data.series,
        exporting: exportContextMenu

    });
}

function GenericTrendLineChart(data, divid, chartTitle) {



    Highcharts.chart(divid, {

        title: {
            text: chartTitle,
            align: 'center',
            verticalAlign: 'middle',
            y: 80
        },

        yAxis: {
            title: {
                text: 'Amount / Number'
            }
        },

        xAxis: {
            title: {
                text: 'Year'
            },
            categories: data.categories
        },


        credits: {
            enabled: false
        },
        colors: ['#234a83', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],


        series: data.series,
        exporting: exportContextMenu


    });

}