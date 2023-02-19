var drawSource = new ol.source.Vector();
var AoidrawSource = new ol.source.Vector({
    format: new ol.format.WKT(),
});
// reference for the color choices
var colorsChoices = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

var vectorLayer = new ol.layer.Vector({
    source: drawSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#44711e',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});


var osmLayer = new ol.layer.Tile({
    visible: true,
    zIndex: -2,
    id: 'OSM',
    source: new ol.source.OSM()
});

var bingLayer = new ol.layer.Tile({
    visible: false,
    id: 'Satellite',
    zIndex: -2,
    source: new ol.source.BingMaps({
        key: 'AjyggOxEO7AMgXgSllVTch_tJ2cWEzTXsPd7AoHMZ5EJjf6i2U5LESio4Si3Ly3X',
        imagerySet: 'AerialWithLabels'
    })
});

var defaultStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: "rgba(255, 255, 255, 0.3)",
    }),
    stroke: new ol.style.Stroke({
        color: "rgba(35, 74, 131, 1)",
        width: 2,
    }),
});

var wardBoundaryLayer = new ol.layer.Vector({
    title: "Highlight",
    style: defaultStyle,
    source: new ol.source.Vector(),
});

// var houseMarkerLayer = new ol.layer.Vector({
//     source: new ol.source.Vector(),
//     zIndex: 1,
//     style: new ol.style.Style({
//         image: new ol.style.Icon({
//             anchor: [0.5, 46],
//             anchorXUnits: 'fraction',
//             anchorYUnits: 'pixels',
//             src: '/static/backend/img/marker.png'
//         })
//     })
// });



var styleLayer = {
    'ward': [new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 4,
            color: 'black'
        })
    }), 'Polygon'],
  'road': [new ol.style.Style({
      stroke: new ol.style.Stroke({
          width: 4,
          color: '#B6423F'
      })
  }), 'LineString'],
  'river': [new ol.style.Style({
      stroke: new ol.style.Stroke({
          width: 2,
          color: 'blue'
      })
  }), 'LineString'],
  'roadpolygon':[new ol.style.Style({
      stroke: new ol.style.Stroke({
          width: 4,
          color: 'rgb(182, 66, 63)'
      }),
      fill: new ol.style.Fill({
          color: 'rgba(182, 66, 63,0.3)'
        })
  }), 'Polygon'],
  'house': [new ol.style.Style({
      image: new ol.style.Circle({
          radius: 3,
          stroke: new ol.style.Stroke({
              color: 'red',
              // LineStringDash: [4],
              width: 2
          }),
          fill: new ol.style.Fill({
              color: 'red'
          })
      })
  }), 'Point'],
  'house_tax_paid': [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            stroke: new ol.style.Stroke({
                color: 'fuchsia',
                // LineStringDash: [4],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'fuchsia'
            })
        })
    }), 'Point'],
    'house_tax_due': [new ol.style.Style({
        image: new ol.style.Circle({
            radius: 3,
            stroke: new ol.style.Stroke({
                color: 'maroon',
                // LineStringDash: [4],
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'maroon'
            })
        })
    }), 'Point'],
  'flood': [new ol.style.Style({
      stroke: new ol.style.Stroke({
          width: 4,
          color: 'red'
      })
    }), 'Polygon'],
  'covid': [new ol.style.Style({
      image: new ol.style.Circle({
          radius: 3,
          stroke: new ol.style.Stroke({
              color: 'red',
              // LineStringDash: [4],
              width: 2
          }),
          fill: new ol.style.Fill({
              color: 'red'
          })
      })
  }), 'Point'],
  'cadastral': [new ol.style.Style({
      stroke: new ol.style.Stroke({
          width: 1,
          color: 'black'
      })
    }), 'Polygon'],

}




// var URLs = 'http://waling.geonepal.com.np:8080/geoserver';
// var legendUrl = 'http://waling.geonepal.com.np:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=14&HEIGHT=14&LAYER=';


var stroke = new ol.style.Stroke({
    color: 'black',
    width: 2
});
var fill = new ol.style.Fill({
    color: 'blue'
});
var highlightOverlay = new ol.layer.Vector({
    title: "Highlight",
    style: new ol.style.Style({
        image: new ol.style.RegularShape({
            fill: fill,
            stroke: stroke,
            points: 4,
            radius: 10,
            angle: Math.PI / 4

        }),
    }),
    source: new ol.source.Vector(),
});

var wardLayer = new ol.layer.VectorTile({
    id: 'ward',
    title: 'Ward',
    visible: true,
    legendPath: 'tansen:ward',
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/municipal.mvt?tile={z}/{x}/{y}'
    }),
    style: function(feature, res) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 4,
                color: 'black'
            }),
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color: 'red'
                }),
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 1
                }),
                text: feature.get('new_ward_n').toString()
            })
        })
    }
});
var houseLayer = new ol.layer.VectorTile({
    id: 'house',
    title: 'House',
    visible: false,
    legendPath: 'tansen:house',
    declutter: true,
    zIndex: 5,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/house.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['house'][0]
});

var riverLayer = new ol.layer.VectorTile({
    id: 'river',
    title: 'River',
    visible: false,
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/river.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['river'][0]
});
var roadLayer = new ol.layer.VectorTile({
    id: 'road',
    title: 'Road',
    visible: false,
    legendPath: 'tansen:road',
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/road.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['road'][0]
});

var roadPolygonLayer = new ol.layer.VectorTile({
    id: 'roadpolygon',
    title: 'Road Outline',
    visible: false,
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/road-polygon.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['roadpolygon'][0]
});

var floodLayer = new ol.layer.VectorTile({
    id: 'flood',
    title: 'Flood',
    visible: false,
    legendPath: 'tansen:flood',
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/flood.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['flood'][0]
});


var covidLayer = new ol.layer.VectorTile({
    id: 'covid',
    title: 'Covid',
    visible: false,
    legendPath: 'tansen:covid',
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/covid.mvt?tile={z}/{x}/{y}'
    }),
    style: styleLayer['covid'][0]
});


var cadastralLayer = new ol.layer.VectorTile({
    id: 'cadastral',
    title: 'Cadastral',
    visible: false,
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: '/api/v1/data/cadastral.mvt?tile={z}/{x}/{y}'
    }),
    style: function(feature, res) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 1,
                color: 'black'
            }),
            text: new ol.style.Text({
                font: '14px Calibri,sans-serif',
                fill: new ol.style.Fill({
                    color: 'black'
                }),
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 1
                }),
                text: feature.get('parcel_no').toString()
            })
        })
    }
});

var spatiallayers = [osmLayer, bingLayer, riverLayer, roadLayer, roadPolygonLayer, floodLayer, covidLayer, wardLayer, houseLayer, highlightOverlay, vectorLayer]
// var spatiallayers = [osmLayer, bingLayer, riverLayer, roadLayer, roadPolygonLayer, floodLayer, covidLayer, houseLayer, highlightOverlay, vectorLayer]


var layers = [osmLayer, wardBoundaryLayer, wardLayer]


var style100 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 0, 0, 0.4)'
    }),
    stroke: new ol.style.Stroke({
        width: 2,
        color: 'rgba(255, 0, 0,1)'
    })
});

var style200 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(163, 205, 59, 0.3)'
    }),
    stroke: new ol.style.Stroke({
        width: 2,
        color: 'rgba(163, 205, 59, 1)'
    })
});


styleLayer['covid-high-risk'] = [style100, 'Polygon']
styleLayer['covid-medium-risk'] = [style200, 'Polygon']


var source1 = new ol.source.Vector();
var source2 = new ol.source.Vector();

var covidHighRiskZoneLayer = new ol.layer.Vector({
    visible: false,
    id: 'covid-high-risk',
    title: 'Covid high risk zone',
    source: source1,
    projection: 'EPSG:3857',
    zIndex: 3,
    style: styleLayer['covid-high-risk'][0]
});


spatiallayers.push(covidHighRiskZoneLayer);


var covidMediumRiskZoneLayer = new ol.layer.Vector({
  visible: false,
  id: 'covid-medium-risk',
  title: 'Covid Medium risk zone',
  source: source2,
  projection: 'EPSG:3857',
  zIndex: 2,
  style: styleLayer['covid-medium-risk'][0]
});


spatiallayers.push(covidMediumRiskZoneLayer);

styleLayer['incident-location'] = [new ol.style.Style ({
      image: new ol.style.FontSymbol({
        form: "poi",
        glyph: 'car',
        radius: 15,
        offsetY: -15,
        fontSize: .7,
        color: '#fff',
        fill: new ol.style.Fill ({
          color: 'blue'
        }),
        stroke: new ol.style.Stroke ({
          color: 'white',
          width: 2
        })
      }),
      stroke: new ol.style.Stroke ({
        width: 5,
        color: 'white'
      }),
      fill: new ol.style.Fill ({
        color: '[255, 0, 0, 0.6]'
      })
    }), 'Point']

var drawSourceCovid = new ol.source.Vector();

var incidentLocationLayer = new ol.layer.Vector({
    id:"incident-location",
    title:"Incident Location",
    zIndex: 4,
    visible: false,
    source: drawSourceCovid,
    style:styleLayer['incident-location'][0]
});
spatiallayers.push(incidentLocationLayer)

var temp_styleLayer = [new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    stroke: new ol.style.Stroke({
      color: 'white',
      // lineDash: [4],
      width: 2
    }),
    fill: new ol.style.Fill({
      color: '#9b59b6'
    })
  })
}), 'Point']
styleLayer['municipal-project'] = temp_styleLayer
var url = '/en/api/v1/data/municipal-projects.mvt?tile={z}/{x}/{y}'
var municipal_project = new ol.layer.VectorTile({
    id: 'municipal-project',
    title: "Municipal Project",
    visible: false,
    zIndex: -1,
    declutter: true,
    source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ({
            maxZoom: 24
        }),
        format: new ol.format.MVT(),
        url: url
    }),
    style: styleLayer['municipal-project'][0]
});
spatiallayers.push(municipal_project);
