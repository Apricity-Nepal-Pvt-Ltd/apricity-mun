$(document).ready(function() {

    init();

    $(function() {
        $("#draggable1").draggable();
        $("#draggable2").draggable();
        $("#draggable3").draggable();
    });

    $(".baselayer").click(function() {
        var bfrontmap = $(this).attr('id')
        if ($(this).prop("checked") == true && bfrontmap == "osm") {

            osmLayer.setVisible(true);
            bingLayer.setVisible(false);
        } else {
            bingLayer.setVisible(true);
            osmLayer.setVisible(false);
        }
    });



    $(document).on('click', '.layer', function() {
      // console.log('here');
        var id = $(this).attr("id");
        var l = getLayer(id);
        if ($(this).prop("checked") == true) {
            l.setVisible(true);
        } else {
            l.setVisible(false);

            var legend = getLayFeature(id);
            $('.legend #' + id).remove();
        }
    });

    function getlayerFunction(dataRequest) {
        var layerid = dataRequest.subCatid;
        var l = getLayer(layerid);


        var stylepic = (dataRequest.subCatvalue).toString()
        var legendid = stylepic.replace(/\s+/g, '');

        var filepath = '';


        if (typeof l === 'undefined') {

            $.get("service", dataRequest).done(function(data) {


                if (data.fileExist == 'True') {
                    filepath = '/static/backend/img/' + stylepic + '.png'
                } else {
                    filepath = '/static/backend/img/pin.png'
                }

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
                      layers.push(dataRequest.subCatvalue)

                      var source = dataRequest.subCatvalue.getSource();
                      var parser = new ol.format.GeoJSON();
                      var result = parser.readFeatures(data.geojsondata.Institution);
                      as_geojson = parser.writeFeatures(result, {
                          featureProjection: "EPSG:4326",
                          dataProjection: "EPSG:3857",
                      });
                      var feature = parser.readFeatures(as_geojson);
                      source.addFeatures(feature);
                      frontmap.addLayer(dataRequest.subCatvalue);
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

                $('.legend').append('<h5 id="' + legendid + '">' + stylepic + '</h5><img src="' + filepath + '" id="' + legendid + '"/>');
                $(".legend").addClass("visible");
            });

        }

    }

    function removelayerFunction(dataRequest) {

        var id = (dataRequest.subCatvalue).toString()
        var legendid = id.replace(/\s+/g, '');
        var l = getLayer(id);
        l.setVisible(false);
        $('.legend #' + legendid).remove();

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




    $('#zoomplus').on('click', function() {
        frontmap.getView().setZoom(frontmap.getView().getZoom() + 1);
    });

    $('#zoomminus').on('click', function() {
        frontmap.getView().setZoom(frontmap.getView().getZoom() - 1);
    });


    $('#zoomhome').on('click', function() {
        frontmap.getView().fit(bounds, frontmap.getSize());
    });



    frontmap.on('singleclick', function(evt) {

        // Attempt to find a feature in one of the visible vector layers
        var feature = frontmap.forEachFeatureAtPixel(evt.pixel, function(feature, farmerLayer) {
            return feature;
        });

        if (feature) {

            // var coord = feature.getGeometry().getCoordinates();
            var props = feature.getProperties();
            // console.log(props)

            if (props.name) {
                $(".feature-info").addClass("visible");
                var html = "";
                html += "<table>";
                html += "<tr><td><strong>Name:  </strong></td><td>" + props.name + " </td></tr>";
                html += "<tr><td><strong>Ward No:  </strong></td><td>" + props.ward + "</td></tr>";

                html += "</table>";
                $("#info-Div").empty();
                $("#info-Div").append(html);



            }
        }
    })


    $('.close').on('click', function() {
        $(".feature-info").removeClass("visible");
    })


    $('#feedback-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            name: {
                required: "you must give a name",
                minlength: "your name must consist of at least 2 characters"
            }

        },

        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: '/feedback',
                data: $(form).serialize(),
                success: function(data, status) {
                    $("#feedback-form").trigger('reset');
                    bootbox.alert({
                        message: data.message,

                    });

                },
                error: function() {
                    bootbox.alert({
                        message: data.message,
                        size: 'small'
                    });

                }
            });
        }


    });


});
