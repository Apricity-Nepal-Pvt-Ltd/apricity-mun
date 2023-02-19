$(document).ready(function() {

    init();

    $(function() {
        $("#draggable1").draggable();
        $("#draggable2").draggable();
        $("#draggable3").draggable();
        $("#draggable4").draggable();
    });

    $(".baselayer").click(function() {
        var bmap = $(this).attr('id')
        if ($(this).prop("checked") == true && bmap == "osm") {

            osmLayer.setVisible(true);
            bingLayer.setVisible(false);
        } else {
            bingLayer.setVisible(true);
            osmLayer.setVisible(false);
        }
    });


    $(document).on('click', '.layer', function() {
        // $(".layer").click(function() {
        var id = $(this).attr("id");
        var l = getLayer(id);
        if ($(this).prop("checked") == true) {
            l.setVisible(true);
        } else {
            l.setVisible(false);
        }
    });

    function getlayerFunction(dataRequest) {
        var layerid = dataRequest.subCatid;
        var l = getLayer(layerid);

        var stylepic = (dataRequest.subCatvalue).toString()
        var legendid = stylepic.replace(/\s+/g, '');

        var filepath = '';

        var serviceStat = {};



        if (typeof l === 'undefined') {

            $.get("service", dataRequest).done(function(data) {


                if (data.fileExist == 'True') {
                    filepath = '/static/backend/img/' + stylepic + '.png'
                } else {
                    filepath = '/static/backend/img/pin.png'
                }


                $('.stat').append('<h5 id="' + legendid + '"><span> ' + data.serviceCount + '</span>  ' + stylepic + '</h5>');
                $(".stat").addClass("visible");

                serviceStat[legendid] = data.serviceCount;

                if (data.geojsondata.Institution) {
                  if (JSON.parse(data.geojsondata.Institution).features.length > 0) {
                    dataRequest.subCatvalue = new ol.layer.Vector({
                        title: layerid.toString(),
                        id: layerid.toString(),
                        visible: true,
                        style: new ol.style.Style({
                            image: new ol.style.Icon({
                                anchor: [0.5, 0.96],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                src: filepath
                            })
                        }),
                        source: new ol.source.Vector(),
                    });
                    spatiallayers.push(dataRequest.subCatvalue)
                    var source = dataRequest.subCatvalue.getSource();
                    var parser = new ol.format.GeoJSON();
                    var result = parser.readFeatures(data.geojsondata.Institution);
                    as_geojson = parser.writeFeatures(result, {
                        featureProjection: "EPSG:4326",
                        dataProjection: "EPSG:3857",
                    });

                    var feature = parser.readFeatures(as_geojson);
                    source.addFeatures(feature);
                    spatialMap.addLayer(dataRequest.subCatvalue);
                    // $('.legend').append('<h5 id="' + legendid + '">' + stylepic + '</h5><img src="' + filepath + '" id="' + legendid + '"/>');
                    // $(".legend").addClass("visible");
                  }
                }

            });
        } else {
            var id = dataRequest.subCatid
            var l = getLayer(id.toString());
            l.setVisible(true);

            $.get("fileservice", dataRequest).done(function(data) {
                if (data.fileExist == 'True') {
                    filepath = '/static/backend/img/' + stylepic + '.png'
                } else {
                    filepath = '/static/backend/img/pin.png'
                }

                // $('.legend').append('<h5 id="' + legendid + '">' + stylepic + '</h5><img src="' + filepath + '" id="' + legendid + '"/>');
                // $(".legend").addClass("visible");

                $('.stat').append('<h5 id="' + legendid + '"><span>' + data.serviceCount + '</span> ' + stylepic + '</h5>');
                $(".stat").addClass("visible");
            });

        }

    }

    function removelayerFunction(dataRequest) {

        var id = (dataRequest.subCatvalue).toString()
        var legendid = id.replace(/\s+/g, '');
        var l = getLayer(id);
        l.setVisible(false);
        $('.legend #' + legendid).remove();
        $('.stat #' + legendid).remove();

    }

    $(".servicelayer").click(function() {
        var id = $(this).attr("id");
        var dataRequest = {
            subCatid: $(this).attr("id"),
            Catid: $(this).attr("name"),
            subCatvalue: $(this).attr("id")
        }

        if ($(this).prop("checked") == true) {
            getlayerFunction(dataRequest);
        } else {
            removelayerFunction(dataRequest);
        }


    });


    $(".draw-title").click(function() {
        var drawMotive = $(this).attr("drawMotive");
        var drawtype = $(this).attr("drawtype");

        addDrawInteraction(drawtype, drawMotive);
    });

    $('#zoomplus').on('click', function() {
        spatialMap.getView().setZoom(spatialMap.getView().getZoom() + 1);
    });

    $('#zoomminus').on('click', function() {
        spatialMap.getView().setZoom(spatialMap.getView().getZoom() - 1);
    });

    $('#zoomhome').on('click', function() {
        spatialMap.getView().fit(bounds, spatialMap.getSize());
    });

    $('#table').on('click', function() {
        $(".tool").addClass("aoiResult");
        $(".aoi").addClass("visible");
    });

    var dragcounter = 0;
    $(".drag-drop").on("click", function(e) {
        if (dragcounter == 0) {
            dragcounter = 1;
            spatialMap.addInteraction(dragAndDropInteraction);
            bootbox.alert({
                message: 'you have enable Drag and Drop feature, so you can now drag and drop GeoJSON, GPX KML directly',

            });
        } else {
            dragcounter = 0;
            spatialMap.removeInteraction(dragAndDropInteraction);
            spatialMap.removeLayer(vectLayer);
            bootbox.alert({
                message: 'you have disable Drag and Drop feature',
            });
        }


    });

    var selectedHouse = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            stroke: new ol.style.Stroke({
                color: 'green',
                // lineDash: [4],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'green'
            })
        })
    });

    // Selection
    var selection = {}
    var selectionLayer = new ol.layer.VectorTile({
        map: spatialMap,
        renderMode: 'vector',
        source: houseLayer.getSource(),
        style: function(feature) {
            if (feature.getProperties().houseId in selection) {
                return selectedHouse;
            }
        },
    });

    // Add an event handler for the map "singleclick" event
    spatialMap.on('singleclick', function(evt) {

        // Attempt to find a feature in one of the visible vector layers
        var feature = spatialMap.forEachFeatureAtPixel(evt.pixel, function(feature, houseLayer) {
            return feature;
        });



        if (feature) {

            var props = feature.getProperties();
            if (props.houseId) {
                var fid = props.houseId;
                selection = {};
                // add selected feature to lookup
                selection[fid] = feature;

                selectionLayer.changed();

                var html = "";
                html += "<table style='margin: 5%;width:90%'>";
                html += "<tr><td><strong> House Head: </strong></td><td>" + props.rname + "</td></tr>";
                html += "<tr><td><strong>Phone Number: </strong></td><td>" + props.phone + "</td></tr>";
                html += "<tr><td><strong>Ward Number: </strong></td><td>" + props.wardNumber_id + "</td></tr>";
                html += "<tr><td><strong>Tole: </strong></td><td>" + props.tole + "</td></tr>";
                html +=
                    "<tr><td><a href= '/data-update/view/" + props.houseId + "'+ class='btn btn-info btn-sm' style='margin:5px;'><i class='fa fa-folder'></i> View </a></td><td><a href= '/data-update/edit/" + props.houseId + "'+ class='btn btn-primary btn-sm' style='margin:5px;'><i class='fa fa-edit'></i> Edit </a></td></tr>";


                html += "</table>";
                $(".feature-info").addClass("visible");
                $("#info-Div").empty();
                $("#info-Div").append(html);

            } else {
                if (props.name) {
                    $(".feature-info").addClass("visible");
                    var html = "";
                    html += "<table>";
                    html += "<tr><td><strong>Name:  </strong></td><td>" + props.name + " </td></tr>";
                    html += "<tr><td><strong>Ward No:  </strong></td><td>" + props.ward + "</td></tr>";
                    html += "<tr><td></td><td></td></tr>";
                    html +=
                        "<tr><td><a href= '/institution/view/" + props.pk + "'+ class='btn btn-info btn-sm' style='margin:5px;'><i class='fa fa-folder'></i> View </a></td><td><a href= '/institution/edit/" + props.pk + "'+ class='btn btn-primary btn-sm' style='margin:5px;'><i class='fa fa-edit'></i> Edit </a></td></tr>";


                    html += "</table>";
                    $("#info-Div").empty();
                    $("#info-Div").append(html);



                }
            }





        }
    })


    // map print
    document.getElementById('export-png').addEventListener('click', function() {
        spatialMap.once('rendercomplete', function() {
            var mapCanvas = document.createElement('canvas');
            var size = spatialMap.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            var mapContext = mapCanvas.getContext('2d');
            Array.prototype.forEach.call(
                document.querySelectorAll('.ol-layer canvas'),
                function(canvas) {
                    if (canvas.width > 0) {
                        var opacity = canvas.parentNode.style.opacity;
                        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                        var transform = canvas.style.transform;
                        // Get the transform parameters from the style's transform matrix
                        var matrix = transform
                            .match(/^matrix\(([^\(]*)\)$/)[1]
                            .split(',')
                            .map(Number);
                        // Apply the transform to the export map context
                        CanvasRenderingContext2D.prototype.setTransform.apply(
                            mapContext,
                            matrix
                        );
                        mapContext.drawImage(canvas, 0, 0);
                    }
                }
            );
            if (navigator.msSaveBlob) {
                // link download attribuute does not work on MS browsers
                navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
            } else {
                var link = document.getElementById('image-download');
                link.href = mapCanvas.toDataURL();
                link.click();
            }
        });
        spatialMap.renderSync();
    });







    $('.close').on('click', function() {
        $(".feature-info").removeClass("visible");
    })
    $('#templayer').on('click', function() {
        $(".tempLayer").addClass("visible");
    })
    $('.closetempLayer').on('click', function() {
        $(".tempLayer").removeClass("visible");
    })
    $('.closeAoi').on('click', function() {
        $(".tool").removeClass("aoiResult");
        $(".aoi").removeClass("visible");
    })



    // Tool Tip

    tippy('#zoomplus', {
        content: 'Right',
        placement: 'right'
    });

    tippy('#zoomminus', {
        content: 'Right',
        placement: 'right'
    });


    tippy('#zoomhome', {
        content: 'Right',
        placement: 'right'
    });

    tippy('#export-png', {
        content: 'Right',
        placement: 'right'
    });

    tippy('#templayer', {
        content: 'Right',
        placement: 'right'
    });

    tippy('#table', {
        content: 'Right',
        placement: 'right'
    });


    tippy('#AreaString', {
        content: 'Right',
        placement: 'right'
    });

    tippy('#LineString', {
        content: 'Right',
        placement: 'right'
    });


    tippy('#polygon', {
        content: 'Right',
        placement: 'right'
    });



});
