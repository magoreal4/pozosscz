import {
    navbar
  } from '../../../src/js/navbar';
  import "leaflet";
  import {
    intNorte,
    laguardia,
    satNorte,
    scz,
    urubo,
    warnes
  } from "./poligonos";
  // import "./Leaflet.AccuratePosition";
  // import "leaflet-control-custom";
  // import "./leaflet.Control.Center";
  import "leaflet.markercluster";
  import 'leaflet.markercluster.layersupport';
  import 'leaflet-groupedlayercontrol';
  
  
  document.addEventListener('DOMContentLoaded', function () {
    navbar(); // js para el navbar
    auth == 'True' ? auth = true : auth = false;
    var map;
    var loadData = false;
    var p300 = [],
      p350 = [],
      p400 = [],
      p450 = [],
      p500 = [],
      p600 = [],
      p700 = [],
      p800 = [],
      p900 = [],
      p1000 = [],
      pNegro = [];
    var colors = ['#ffff00', '#fba657', '#4ade80', '#52b551', '#ff0000', '#00ffff', '#50dbff', '#5eb9fc', '#6199ee', '#808080', 'black'];
  
    const urlGet = 'http://127.0.0.1:8000/mapa/api/cliente/list/?format=json';
  
    async function fetchPoints() {
      await fetch(urlGet)
        .then(resp => resp.json())
        .then(resp => {
          resp.forEach((e, i) => {
            let color;
            // 10 colores algunos multiples de 50
            color = e.cost / 100;
            color <= 3 ? color = 0 : null;
            if (color > 3 && color < 5) {
              color = Math.round(color * 2) / 2;
              color <= 3.5 ? color = 1 : null;
              color == 4 ? color = 2 : null;
              color >= 4.5 ? color = 3 : null;
            }
            color >= 5 && color < 10 ? color = Math.trunc(color) - 1 : null;
            color >= 10 ? color = 9 : null;
  
            switch (color) {
              case 0:
                p300.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 1:
                p350.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 2:
                p400.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 3:
                p450.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 4:
                p500.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 5:
                p600.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 6:
                p700.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 7:
                p800.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 8:
                p900.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
              case 9:
                p1000.push([e.lat, e.lon, e.cost, e.status, e.user]);
                break;
            }
            loadData = true;
          });
        })
    }
  
    refreshMap();
  
    async function refreshMap() {
      !loadData ? await fetchPoints() : null
      
      map ? map.remove() : null
  
      var mapZoomLevel = localStorage.theZoom;
      var mapCenter = [localStorage.lat, localStorage.lon];
  
      var opacidad = parseFloat(document.getElementById("mapopacity-select").value);
      var tipoMarca = document.getElementById("elms-shape-select").value;
  
      // load a tile layer
      var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        opacity: opacidad
      });
  
      var Esri_WorldImagery = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          opacity: opacidad
        });
  
      var OpenStreetMap_Dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        opacity: opacidad
      });
  
      if (isNaN(mapZoomLevel)) {
        mapZoomLevel = 12;
      }
      if (isNaN(localStorage.lat)) {
        mapCenter = [-17.784071, -63.180522];
      }
  
      // initialize the map
      map = L.map('map', {
        center: mapCenter,
        zoom: mapZoomLevel,
        zoomControl: false
      });
  
      OpenStreetMap_Mapnik.addTo(map);
  
      var options = {
        // spiderLegPolylineOptions: { weight: 0 },
        // spiderfyOnMaxZoom: $("#spiderfyOnMaxZoom-select").val() === "true",
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: false,
        removeOutsideVisibleBounds: true,
        // document.getElementById("zoomToBoundsOnClick-select").value === "true",
        showCoverageOnHover: document.getElementById("showCoverageOnHover-select").value === "true",
        disableClusteringAtZoom: 18,
        maxClusterRadius: parseInt(document.getElementById("maxClusterRadius-select").value),
        spiderfyDistanceMultiplier: 1,
        chunkedLoading: true,
        chunkInterval: 100,
        // chunkProgress: updateProgressBar
      };
  
  
      var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options),
        group300 = L.layerGroup(),
        group350 = L.layerGroup(),
        group400 = L.layerGroup(),
        group450 = L.layerGroup(),
        group500 = L.layerGroup(),
        group600 = L.layerGroup(),
        group700 = L.layerGroup(),
        group800 = L.layerGroup(),
        group900 = L.layerGroup(),
        group1000 = L.layerGroup(),
        groupADM = L.layerGroup(),
        groupCLC = L.layerGroup(),
        groupCLX = L.layerGroup(),
        groupNegro = L.layerGroup(),
        titulo, marca;
  
      mcgLayerSupportGroup.addTo(map);
  
      var pTodos = [p300, p350, p400, p450, p500, p600, p700, p800, p900, p1000, pNegro];
      var groupEje = [group300, group350, group400, group450, group500, group600, group700, group800, group900, group1000, groupNegro];
      var groupCot = [groupADM, groupCLC, groupCLX];
  
      pTodos.forEach((pn, i) => {
        pn.forEach((e) => {
          titulo = e[2].toString();
          marca =
            tipoMarca === "circulo" ?
            L.circleMarker(L.latLng(e[0], e[1]), (e[3]=="NEG") ? circleStyle(10) : circleStyle(i), {
              title: titulo
            }) :
            L.marker([e[0], e[1]], {
              title: titulo
            });
          marca.bindPopup(titulo);
          // e[3] == "EJE" ? marca.addTo(groupEje[i]) : null
          // e[3] == "NEG" ? marca.addTo(groupNegro) : null
          if (e[3] == "COT") {
            e[4] == "ADM" ? marca.addTo(groupADM) : null
            e[4] == "CLC" ? marca.addTo(groupCLC) : marca.addTo(groupCLX)
          } else {
            e[3] == "EJE" ? marca.addTo(groupEje[i]) : marca.addTo(groupEje[10])
          }
        });
      })
  
      // mcgLayerSupportGroup.checkIn([groupEje]);
      mcgLayerSupportGroup.checkIn([groupCot]);
      mcgLayerSupportGroup.checkIn([groupEje]);
  
      groupEje.forEach((group) => {
        group.addTo(map);
      });
  
      var baseMaps = {
        "Light": OpenStreetMap_Mapnik,
        "Dark": OpenStreetMap_Dark,
        "Satelite": Esri_WorldImagery,
      };
  
      // Agregar poligonos
      var polyUrubo = L.polygon(urubo, {
        color: 'red'
      });
      var polyLaguardia = L.polygon(laguardia, {
        color: 'yellow'
      });
      var polySatNorte = L.polygon(satNorte, {
        color: 'red'
      });
      var polyIntNorte = L.polygon(intNorte, {
        color: 'yellow'
      });
      var polyWarnes = L.polygon(warnes, {
        color: 'blue'
      });
  
      var areasDiferenciadas = L.layerGroup([polyUrubo, polyLaguardia, polySatNorte, polyIntNorte, polyWarnes]);
  
      var polyScz = L.polygon(scz, {
        color: 'gray'
      });
  
      var overlayMaps = {
        "Areas:": {
          "Santa Cruz": polyScz,
          "Precio Diferenciado": areasDiferenciadas,
        },
        "Ejecutado:": {
          '..300 <div class="puntos bg-precio300">&zwnj;</div>': group300,
          '\xa0\xa0\xa0350<div class="puntos bg-precio350">&zwnj;</div>': group350,
          '\xa0\xa0\xa0400<div class="puntos bg-precio400">&zwnj;</div>': group400,
          '\xa0\xa0\xa0450<div class="puntos bg-precio450">&zwnj;</div>': group450,
          '\xa0\xa0\xa0500<div class="puntos bg-precio500">&zwnj;</div>': group500,
          '\xa0\xa0\xa0600<div class="puntos bg-precio600">&zwnj;</div>': group600,
          '\xa0\xa0\xa0700<div class="puntos bg-precio700">&zwnj;</div>': group700,
          '\xa0\xa0\xa0800<div class="puntos bg-precio800">&zwnj;</div>': group800,
          '\xa0\xa0\xa0900<div class="puntos bg-precio900">&zwnj;</div>': group900,
          '\xa01000..<div class="puntos ml-0 bg-precio1000">&zwnj;</div>': group1000,
          'Lista Negra\xa0<div class="puntos ml-0 bg-precioNegro">&zwnj;</div>': groupNegro
        },
        "Cotizado:": {
          'Administrador': groupADM,
          'Cliente Confirma': groupCLC,
          'Cliente Cancela': groupCLX,
        },
      }
  
      var optionsControl = {
        // Make the "Landmarks" group exclusive (use radio inputs)
        // exclusiveGroups: ["Landmarks"],
        // Show a checkbox next to non-exclusive group labels for toggling all
        groupCheckboxes: true,
        position: 'topleft',
        collapsed: false
      };
  
      L.control.groupedLayers(baseMaps, overlayMaps, optionsControl).addTo(map);
  
      // Iniciar por defecto checked
      let allPoints = document.getElementById("leaflet-control-layers-group-2");
      allPoints.firstChild.firstChild.checked = true;
  
      map.on('moveend', () => {
        localStorage.theZoom = map.getZoom();
        var centro = map.getCenter();
        localStorage.lat = centro.lat;
        localStorage.lon = centro.lng;
      });
    }
  
  
    panelRefesh.addEventListener('change', () => {
      refreshMap();
    });
  
    var circleStyle = function (point) {
      return {
        fillColor: colors[point],
        radius: 8,
        stroke: true,
        color: "black",
        weight: 2,
        opacity: 1,
        fillOpacity: 1,
        // className: "marker",
      };
    };
  
  
  });