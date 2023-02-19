function GenericPieChartData(data) {
    var data_list = data.value
    var categories = data.category
    var sum = 0;
    var series = [];
    for (i = 0; i < data_list.length; i++) {
        sum += data_list[i]
    }
    for (j = 0; j < categories.length; j++) {
        var data_i = {
            name: categories[j],
            y: parseFloat((data_list[j] * 100 / (sum)).toFixed(2)),
        };
        series.push(data_i);
    }

    // Format to be sent
    var return_obj = {
        'series': series
    };
    return return_obj
}

function GenericDonutChartData(data) {
    var data_list = data.value
    var categories = data.category
    var sum = 0;
    for (i = 0; i < data_list.length; i++) {
        sum += data_list[i]
    }
    var donut_data = []
    for (j = 0; j < categories.length; j++) {
        var data_i = [
            categories[j],
            parseFloat((data_list[j] * 100 / (sum)).toFixed(2)),
        ];
        donut_data.push(data_i);
    }

    var series = [{
        type: 'pie',
        name: 'Data Distribution',
        innerSize: '50%',
        data: donut_data
    }];

    // Format to be sent
    var return_obj = {
        'series': series
    };
    return return_obj
}

function GenericBarChartdata(data) {
    var categories_new = [];
    var count_values = data.value;
    for (i = 0; i < data.category.length; i++) {
        categories_new.push(data.category[i])
    }
    var return_obj = {
            'categories': categories_new,
            'series': [{
                name: 'Count',
                data: count_values
            }]
        }
        // console.log("I am in chartData prep")
    return return_obj
}


function GenericPyramidChartData(data) {
    var categories = data.Male.category;

    var return_obj = {
            'series': [{
                    name: 'Male',
                    data: data.Male.value
                },
                {
                    name: 'Female',
                    data: data.Female.value
                }
            ],
            'categories': categories
        }
        // console.log("I am in pyramidData prep")

    return return_obj
}


function GenericLineChartdata(data) {
    var count_values = data.value;
    var return_obj = {
        'categories': data['quarter'],
        'series': [{
            name: 'Cumulative Amount',
            data: data['Actual']
        }]
    }
    return return_obj
}