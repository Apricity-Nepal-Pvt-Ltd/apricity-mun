var osmLayer = new ol.layer.Tile({
    visible: true,
    zIndex: -2,
    source: new ol.source.OSM()

});


var bingLayer = new ol.layer.Tile({
    visible: false,
    zIndex: -1,
    id: 'Satellite',
    source: new ol.source.BingMaps({
        key: 'AjyggOxEO7AMgXgSllVTch_tJ2cWEzTXsPd7AoHMZ5EJjf6i2U5LESio4Si3Ly3X',
        imagerySet: 'AerialWithLabels'
    })
});

// var URLs = 'http://tansen.geonepal.com.np:8080/geoserver';
// var legendUrl = 'http://tansen.geonepal.com.np:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=14&HEIGHT=14&LAYER=';



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
    'flood': [new ol.style.Style({
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


}


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
//   'contour': [new ol.style.Style({
//       stroke: new ol.style.Stroke({
//           width: 1,
//           color: 'rgb(185, 132, 102)'
//       })
//   }), 'LineString'],
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



var layers = [osmLayer, bingLayer, riverLayer, roadLayer, wardLayer, houseLayer]
// var layers = [osmLayer, bingLayer, riverLayer, roadLayer, houseLayer]


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

// var contourLayer = new ol.layer.VectorTile({
//     id: 'contour',
//     title: 'Contour 10m',
//     visible: false,
//     declutter: true,
//     source: new ol.source.VectorTile({
//         tileGrid: ol.tilegrid.createXYZ({
//             maxZoom: 24
//         }),
//         format: new ol.format.MVT(),
//         url: '/api/v1/data/contour.mvt?tile={z}/{x}/{y}'
//     }),
//     // style: styleLayer['contour'][0]
//     style: function(feature) {
//       return new ol.style.Style({
//           stroke: new ol.style.Stroke({
//               width: 1,
//               color: 'rgb(185, 132, 102)'
//           }),
//           text: new ol.style.TextPath({
//               text: feature.get("contour_value").toString(),
//               // text: 'feature',
//               font: "15px Arial",
//               fill: new ol.style.Fill ({ color:"#369" }),
//               stroke: new ol.style.Stroke({ color:"#fff", width:3 }),
//               textBaseline: 'middle',
//               textAlign: 'center',
//               minWidth: 0
//             })
//       })
//     }
// });

// var roadPolygonLayer = new ol.layer.VectorTile({
//     id: 'roadpolygon',
//     title: 'Road Outline',
//     visible: false,
//     declutter: true,
//     source: new ol.source.VectorTile({
//         tileGrid: ol.tilegrid.createXYZ({
//             maxZoom: 24
//         }),
//         format: new ol.format.MVT(),
//         url: '/api/v1/data/road-polygon.mvt?tile={z}/{x}/{y}'
//     }),
//     style: styleLayer['roadpolygon'][0]
// });

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

var covidMediumRiskZoneLayer = new ol.layer.Vector({
  visible: false,
  id: 'covid-medium-risk',
  title: 'Covid Medium risk zone',
  source: source2,
  projection: 'EPSG:3857',
  zIndex: 2,
  style: styleLayer['covid-medium-risk'][0]
});


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
