var frontmap, view

var municipalityBound = [87.606485, 26.579615, 87.726759, 26.76038];
var bounds = ol.proj.transformExtent(municipalityBound, 'EPSG:4326', 'EPSG:3857');
var zoomToExtentControl = new ol.control.ZoomToExtent({
    extent: bounds
});

var center_wgs84 = [ (municipalityBound[0]+municipalityBound[2])/2, (municipalityBound[1]+municipalityBound[3])/2]

view = new ol.View({
    // projection: projection,
    projection: 'EPSG:3857',
    center: ol.proj.transform(center_wgs84, 'EPSG:4326', 'EPSG:3857'),
    zoom: 11
});

spatialView = new ol.View({
    // projection: projection,
    projection: 'EPSG:3857',
    center: ol.proj.transform(center_wgs84, 'EPSG:4326', 'EPSG:3857'),
    zoom: 12
});

var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu'

});


// layer switcher
function getLayer(id) {
    var layer;
    for (i = 0; i < layers.length; i++) {

        if (id == layers[i].getProperties().id) {
            layer = layers[i];


        }
    }
    return layer;
}

function getLayFeature(id) {
    var layerFeature;
    for (i = 0; i < layers.length; i++) {
        if (id == layers[i].getProperties().id) {
            layerFeature = layers[i].getProperties().legendPath;
            break;
        }
    }
    return layerFeature;
}

function getLayTitle(id) {
    var layerFeature;
    for (i = 0; i < layers.length; i++) {
        if (id == layers[i].getProperties().id) { ///popDensityLayer.getProperties().id
            layerFeature = layers[i].getProperties().title;
            break;
        }
    }
    return layerFeature;
}


function init() {
    frontmap = new ol.Map({
        layers: layers,
        target: 'frontendmap',
        controls: ol.control.defaults({
            zoom: false,
            attribution: false,
            rotate: false
        }),
        view: spatialView
    });

    map = new ol.Map({
        layers: layers,
        target: 'olMap',
        interactions: ol.interaction.defaults({
            doubleClickZoom: true,
            dragAndDrop: false,
            dragPan: true,
            keyboardPan: false,
            keyboardZoom: false,
            mouseWheelZoom: false,
            pointer: false,
            select: false
        }),
        controls: ol.control.defaults({
            zoom: true,
            attribution: false,
            rotate: false
        }).extend([zoomToExtentControl]),
        view: view,

        // renderer: 'webgl'
    });


}

var drawTool;

function addDrawInteraction(drawtype, drawMotive) {

    if (drawMotive !== 'None') {

        var geometryFunction, maxPoints;
        frontmap.getViewport().style.cursor = "crosshair";
        drawTool = new ol.interaction.Draw({
            source: drawSource,
            type: /** @type {ol.geom.GeometryType} */ (drawtype),
            geometryFunction: geometryFunction,
            maxPoints: maxPoints
        });
        var source = houseLayer.getSource();

        drawTool.on('drawend', function(e) {
            lastFeature = e.feature;
            frontmap.getViewport().style.cursor = "pointer";

            if (drawMotive === 'AreaString') {
                $(".feature-info").removeClass("visible");
                var area = ol.sphere.getArea(lastFeature.getGeometry())
                var output;
                // console.log(area)
                if (area > 10000) {
                    output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
                } else {
                    output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
                }
                $(".feature-info").addClass("visible");
                var html = "<h6 style='text-align: center;'> Area: " + output + "</h6>";
                $("#info-Div").empty();
                $("#info-Div").append(html);



            } else if (drawMotive === 'LineString') {
                $(".feature-info").removeClass("visible");
                var length = ol.sphere.getLength(lastFeature.getGeometry())


                var output;
                if (length > 100) {
                    output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
                } else {
                    output = Math.round(length * 100) / 100 + ' ' + 'm';
                }

                $(".feature-info").addClass("visible");
                var html = "<h6 style='text-align: center;'> Distance: " + output + "</h6>";
                $("#info-Div").empty();
                $("#info-Div").append(html);


            } else {
                $(".feature-info").removeClass("visible");


                var format = new ol.format.WKT();
                poly = format.writeGeometry(lastFeature.getGeometry(), {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });



                SpatialAoiInfo(poly)


            }

            drawTool.setActive(false);
            frontmap.removeInteraction(drawTool);


        })
        drawTool.on('drawstart', function(e) {
            drawSource.clear();
        });

        frontmap.addInteraction(drawTool);
    }
}
