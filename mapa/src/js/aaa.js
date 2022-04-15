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
  import "leaflet-control-custom";
  import "./leaflet.Control.Center";
  import "leaflet.markercluster";
  import 'leaflet.markercluster.layersupport';
  import 'leaflet-groupedlayercontrol';
  
  // import "pretty-checkbox";
  // import "leaflet.markercluster.placementstrategies";
  
  document.addEventListener('DOMContentLoaded', function () {
    auth == 'True' ? auth = true : auth = false;
    var marker = "";
    var colors = ['#ffff00', '#fba657', '#4ade80', '#52b551', '#ff0000', '#00ffff', '#50dbff', '#5eb9fc', '#6199ee', '#808080'];
    var cotizarEnable = false;
    navbar(); // js para el navbar
  
    refreshMap();
  
    function refreshMap() {
  
      var mapZoomLevel = localStorage.theZoom;
      var mapCenter = [localStorage.lat, localStorage.lon];
  
      if (isNaN(mapZoomLevel)) {
        mapZoomLevel = 12;
      }
      if (isNaN(localStorage.lat)) {
        mapCenter = [-17.784071, -63.180522];
      }
  
      const opacidad = auth ? parseFloat(document.getElementById("mapopacity-select").value) : 1
  
      // initialize the map
      var map = L.map('map', {
        center: mapCenter,
        zoom: mapZoomLevel,
        zoomControl: false
      });
  
      marker != "" ? marker.addTo(map) : null
  
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
  
      OpenStreetMap_Mapnik.addTo(map);
  
      document.getElementById('map').style.cursor = 'crosshair';
  
      // Coloca pantalla gris y deshabilita funciones 
      function LoadOverlay(status) {
        waiting.classList.toggle("invisible");
        waitingSpinner.classList.toggle("invisible");
        status ? map.off('click', onMapClick) : map.on('click', onMapClick)
      }
  
      function onMapClick(e) {
        if (marker != "") {
          map.removeLayer(marker);
        };
        marker = L.marker(e.latlng, {
          icon: iconRed
        }).addTo(map);
        if (!cotizarEnable) {
          contratanos.classList.remove("opacity-50", "cursor-not-allowed");
          cotizarEnable = true;
        }
      }
  
      map.on('click', onMapClick);
  
      // Cambia el icono del globito
      var iconRed = L.icon({
        iconUrl: static_url + 'img/leaflet/marker-red.svg',
        iconRetinaUrl: './img/leaflet/marker-red.svg',
        iconSize: [26, 42],
        iconAnchor: [13, 42],
        popupAnchor: [-3, -76],
        shadowUrl: static_url + 'img/leaflet/marker-shadow.png',
        shadowRetinaUrl: './img/leaflet/marker-shadow.png',
        shadowSize: [68, 50],
        shadowAnchor: [22, 49]
      });
  
      L.control.custom({
        position: 'bottomcenter',
        content: `<div>
                      <button id="contratanos" class="bg-secondary hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-base text-white font-medium py-2.5 px-6 opacity-50 rounded-lg cursor-not-allowed">
                      CONTRATANOS
                      </button>
                    </div>`,
        classes: 'pb-8',
        events: {
          click: contratar
        }
      }).addTo(map);
  
      function contratar() {
        if (inscrito(marker, scz) === true) {
          LoadOverlay(true);
          console.log("---------------------");
          const saguapac = '-63.12672898420913,-17.74620847104891';
          const garaje = '-63.124512434005744,-17.785958137470452';
          // https://stackoverflow.com/questions/56153172/fetch-data-from-multiple-apis-with-async-await
  
          const request = (lon_lat, marker, origen) => {
            let url = 'http://router.project-osrm.org/route/v1';
            // const url = 'http://127.0.0.1:5000/route/v1';
            const profile = '/driving/';
            url = url + profile + lon_lat + ";" + marker._latlng.lng + "," + marker._latlng.lat + "?steps=true&geometries=geojson";
            return fetch(url)
              .then(resp => resp.json())
              .then(resp => workJson(resp))
              .then(resp => {
                resp["origen"] = origen;
                return resp;
              })
          }
  
          Promise.all([
              request(saguapac, marker, "Saguapac"),
              request(garaje, marker, "Garaje")
            ])
            .then(resp => {
              let d = 0,
                origenOptimo;
              resp.forEach((e, i) => {
                console.log("%c" + e.origen + ": " + e.distancia + " km - " + e.tiempo + " min", "color:" + pathColor[i]);
                if (e.distancia < d || d == 0) {
                  origenOptimo = e;
                  d = e.distancia;
                }
              });
              return origenOptimo;
            })
            .then(cotiza)
            .then(resp => {
              // Activa el Modal
              precioText.textContent = "Bs." + resp.precio;
              waitingSpinner.classList.toggle("invisible");
              modal.classList.toggle("invisible");
            })
            .catch(err => {
              LoadOverlay(false);
              let idToast = 'noServidor';
              let iconToast = `
                          <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <path
                              d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                          </svg>`;
              let colorToast = 'error';
              let tituloToast = 'ALGO SUCEDIÓ';
              let textoToast = `Comunicate con nosotros para cotizar el servicio!`;
              createToast(idToast, iconToast, colorToast, tituloToast, textoToast, 'center');
              cancelnoServidor.onclick = () => noServidor.remove();
            })
  
        } else {
          console.log("----------OO---------");
          // Crea el Toast fuera de rango
          let idToast = 'fueraRango';
          let iconToast = `
                      <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                          <path
                          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                      </svg>`;
          let colorToast = 'warning';
          let tituloToast = 'FUERA DE RANGO';
          let textoToast = `Comunicate con nosotros para cotizar el servicio!`;
          createToast(idToast, iconToast, colorToast, tituloToast, textoToast, 'center');
          cancelfueraRango.onclick = () => fueraRango.remove();
          }
        };
      //   iPathColor = 0;
      // };
  
      // Agregar poligonos
      var polyUrubo = L.polygon(urubo, {color: 'red'});
      var polyLaguardia = L.polygon(laguardia, {color: 'yellow'});
      var polySatNorte = L.polygon(satNorte, {color: 'red'});
      var polyIntNorte = L.polygon(intNorte, {color: 'yellow'});
      var polyWarnes = L.polygon(warnes, {color: 'blue'});
  
      var areasDiferenciadas = L.layerGroup([polyUrubo, polyLaguardia, polySatNorte, polyIntNorte, polyWarnes]);
  
      var polyScz = L.polygon(scz, {color: 'gray'});
  
      var cotizarEnable = false;
  
      const precioEle = document.getElementById("precio");
      const precioText = precioEle.querySelector("p");
  
      // Agrega boton de CONTRATANOS que haga fetch al servidor de mapas y encontrar rutas y tiempos
      var pathColor = ['red', 'blue', 'green'];
      var iPathColor = 0;
      // Funcion desprendida de arriba con la API obtiene datos y graficar ruta
      function workJson(e) {
        let array = [];
        let result = new Object();
        let distancia = parseFloat((e.routes[0].distance / 1000).toFixed(2)); //kilometros
        let tiempo = parseInt(Math.round(e.routes[0].duration % 3600 / 60)); //minutos
        let pasos = e.routes[0].legs[0].steps;
        pasos.forEach(e => {
          for (var index = 1; index < e.geometry.coordinates.length; index++) {
            array.push(e.geometry.coordinates[index]);
          }
        });
        // Da la vuelta entre latitud y longitud
        for (var i = 0; i < array.length; i++) {
          array[i].reverse();
        }
      // Dibuja la ruta
      let style = {
        color: pathColor[iPathColor],
        opacity: 1
      }
      L.polyline(array, style).addTo(map);
        iPathColor++;
        result.distancia = distancia;
        result.tiempo = tiempo;
        return result;
      }
  
    // evaluar el precio y saca por consola
    function cotiza(e) {
      var ajusteBarrio = 1;
      let costoDist = (e.distancia * 11 + 260).toFixed(2);
      console.log("%cCosto por distancia: " + costoDist, "color: brown");
      let costoTime = (e.tiempo * 12.5 + 212.50).toFixed(2);
      console.log("%cCosto por tiempo: " + costoTime, "color: brown");
      let costo = costoDist > costoTime ? costoDist : costoTime
      console.log("%cPrecio: " + costo, "color: red");
      costo = Math.floor(costo / 10) * 10;
      console.log("%cPrecio redondeo: " + costo, "color: red");
  
      inscrito(marker, satNorte) ? ajusteBarrio = 0.8 : null
      inscrito(marker, intNorte) ? ajusteBarrio = 0.8 : null
      inscrito(marker, laguardia) ? ajusteBarrio = 0.9 : null
      inscrito(marker, urubo) ? ajusteBarrio = 1.05 : null
      inscrito(marker, warnes) ? ajusteBarrio = 0.83 : null
  
      costo = costo * ajusteBarrio;
      console.log("%cPrecio barrio: " + costo + " Factor: " + ajusteBarrio, "color:green");
      precio = Math.floor(costo / 10) * 10;
      if (costo < 300) {
        precio = 300;
        console.log("%cTarifa minima: " + costo, "color:green");
      } else {
        console.log("%cTarifa: " + costo, "color:green");
      }
      e["precio"] = precio;
      return e;
    }
  
  
      // Verificar si el punto se encuentra dentro un poligono

  
      // Modal
      xModal.onclick = function (event) {
        LoadOverlay(false);
        modal.classList.toggle("invisible");
  
      };
      confirmarModal.onclick = function (event) {
        LoadOverlay(false);
        modal.classList.toggle("invisible");
        console.log(precio);
      };
  
    // Crear toast con diferentes variabes para los mensajes
    function createToast(id, icon, color, titulo, texto, posicion) {
      posicion === 'top' ? posicion = 'absolute top-2 left-1/2 transform -translate-x-1/2' : null
      posicion === 'bottom' ? posicion = 'absolute bottom-24 left-1/2 transform -translate-x-1/2' : posicion = 'absolute centrearXY';
  
      var div = document.createElement('div');
      div.id = id;
      div.setAttribute('class', posicion + ' ' + 'z-[600] flex justify-between w-full max-w-sm mx-auto bg-white rounded-lg shadow-md opacity-90');
      div.innerHTML = `
            <div class="flex items-center justify-center w-12 bg-${color}">
            ${icon}  
            </div>
            <div class="px-4 py-2 mr-auto">
                <div class="mx-3">
                <span class="font-semibold text-${color}">${titulo}</span>
                <p class="text-sm ">${texto}</p>
                </div>
            </div>
            <button id="cancel${id}" type="button" class="flex items-center justify-center w-12 cursor-pointer">
                <svg class="w-4 h-4 mr-2 fill-current" viewBox="0 0 512 512">
                    <path fill="currentColor"
                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z">
                    </path>
                </svg>
            </button>`;
      document.body.appendChild(div);
    }
  
   
      // https://vis4.net/palettes/#/9|s|00429d,96ffea,ffffe0|ffffe0,ff005e,93003a|1|1
  
      var circleStyle = function (point) {
        return {
          fillColor: colors[point],
          radius: 8,
          stroke: true,
          color: "black",
          weight: 2,
          opacity: 1,
          fillOpacity: 1,
          className: "marker",
        };
      };
  
  
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
      var p300 = [],
        p350 = [],
        p400 = [],
        p450 = [],
        p500 = [],
        p600 = [],
        p700 = [],
        p800 = [],
        p900 = [],
        p1000 = [];
  
      var tipoMarca = document.getElementById("elms-shape-select").value;
  
      const urlGet = 'http://127.0.0.1:8000/mapa/api/cliente/list/?format=json';
      fetch(urlGet)
        .then(resp => resp.json())
        .then(resp => {
          resp.forEach((e, i) => {
            // console.log(e);
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
                p300.push([e.lat, e.lon, e.cost]);
                break;
              case 1:
                p350.push([e.lat, e.lon, e.cost]);
                break;
              case 2:
                p400.push([e.lat, e.lon, e.cost]);
                break;
              case 3:
                p450.push([e.lat, e.lon, e.cost]);
                break;
              case 4:
                p500.push([e.lat, e.lon, e.cost]);
                break;
              case 5:
                p600.push([e.lat, e.lon, e.cost]);
                break;
              case 6:
                p700.push([e.lat, e.lon, e.cost]);
                break;
              case 7:
                p800.push([e.lat, e.lon, e.cost]);
                break;
              case 8:
                p900.push([e.lat, e.lon, e.cost]);
                break;
              case 9:
                p1000.push([e.lat, e.lon, e.cost]);
                break;
            }
          });
        })
        .then(() => {
          
          var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(),
          group300 = L.layerGroup(),
          group350 = L.layerGroup(),
          control = L.control.layers(null, null, { collapsed: false }),
          i, a, titulo, marca;
  
          mcgLayerSupportGroup.addTo(map);
  
          p300.forEach((e,i) => {
            titulo = e[2];
            marca = L.marker([e[0], e[1]],{ title: titulo });
            marca.bindPopup(titulo);
            marca.addTo(group300);
          });
  
          mcgLayerSupportGroup.checkIn([group300]);
  
          control.addOverlay(group300, 'First quarter');
          control.addTo(map);
  
          group300.addTo(map);
          // var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options)
  
          // var group300 = L.layerGroup(fillMarkerList(p300, 0));
          // var group350 = L.layerGroup(fillMarkerList(p350, 1));
          // var group400 = L.layerGroup(fillMarkerList(p400, 2));
          // var group450 = L.layerGroup(fillMarkerList(p450, 3));
          // var group500 = L.layerGroup(fillMarkerList(p500, 4));
          // var group600 = L.layerGroup(fillMarkerList(p600, 5));
          // var group700 = L.layerGroup(fillMarkerList(p700, 6));
          // var group800 = L.layerGroup(fillMarkerList(p800, 7));
          // var group900 = L.layerGroup(fillMarkerList(p900, 8));
          // var group1000 = L.layerGroup(fillMarkerList(p1000, 9));
          // mcgLayerSupportGroup.addTo(map);
  
          // mcgLayerSupportGroup.checkIn([group300, group350, group400, group450, group500, group600, group700, group800, group900, group1000]);
  
          // group300.addTo(map);
          // group350.addTo(map);
          // group400.addTo(map);
          // group450.addTo(map);
          // group500.addTo(map);
          // group600.addTo(map)
          // group700.addTo(map);
          // group800.addTo(map);
          // group900.addTo(map);
          // group1000.addTo(map);
  
          // var baseMaps = {
          //   "Light": OpenStreetMap_Mapnik,
          //   "Dark": OpenStreetMap_Dark,
          //   "Satelite": Esri_WorldImagery,
          // };
  
        
          // var overlayMaps = {
          //   "Areas:": {
          //     "Santa Cruz": polyScz,
          //     "Precio Diferenciado": areasDiferenciadas
          //   },
          //   "Todos los Puntos": {
          //     '..300 <div class="puntos bg-precio300">&zwnj;</div>': group300,
          //     '\xa0\xa0\xa0350<div class="puntos bg-precio350">&zwnj;</div>': group350,
          //     '\xa0\xa0\xa0400<div class="puntos bg-precio400">&zwnj;</div>': group400,
          //     '\xa0\xa0\xa0450<div class="puntos bg-precio450">&zwnj;</div>': group450,
          //     '\xa0\xa0\xa0500<div class="puntos bg-precio500">&zwnj;</div>': group500,
          //     '\xa0\xa0\xa0600<div class="puntos bg-precio600">&zwnj;</div>': group600,
          //     '\xa0\xa0\xa0700<div class="puntos bg-precio700">&zwnj;</div>': group700,
          //     '\xa0\xa0\xa0800<div class="puntos bg-precio800">&zwnj;</div>': group800,
          //     '\xa0\xa0\xa0900<div class="puntos bg-precio900">&zwnj;</div>': group900,
          //     '\xa01000..<div class="puntos ml-0 bg-precio1000">&zwnj;</div>': group1000,
          //   }
          // }
  
          // var optionsControl = {
          //   // Make the "Landmarks" group exclusive (use radio inputs)
          //   // exclusiveGroups: ["Landmarks"],
          //   // Show a checkbox next to non-exclusive group labels for toggling all
          //   groupCheckboxes: true,
          //   position: 'topleft',
          //   collapsed: false
          // };
  
          // L.control.groupedLayers(baseMaps, overlayMaps, optionsControl).addTo(map);
  
          // // Iniciar por defecto checked
          // let allPoints = document.getElementById("leaflet-control-layers-group-2");
          // allPoints.firstChild.firstChild.checked = true;
        })
  
      function fillMarkerList(puntoPPrecio, color) {
        var markerList = [];
        for (var i = 0; i < puntoPPrecio.length; i++) {
          var e = puntoPPrecio[i];
          var title = e[2];
          console.log(title);
          var marca =
            tipoMarca === "circulo" ?
            L.circleMarker(L.latLng(e[0], e[1]), circleStyle(color), {
              title: title
            }) :
            L.marker([e[0], e[1]],{title:"a"});
  
          marca.bindPopup(title);
          markerList.push(marca);
        }
        return markerList;
      }
  
      panelRefesh.addEventListener('change', (event) => {
        map ? map.remove() : null
        refreshMap();
        // setTimeout(refreshMap(),200);
      });
  
      var centro;
      map.on('moveend', function (e) {
        localStorage.theZoom = map.getZoom();
        centro = map.getCenter();
        localStorage.lat = centro.lat;
        localStorage.lon = centro.lng;
      });
  
      putMarker.onclick = () => {
        let coord = URLwhatsapp.value;
        let lat = coord.substring(coord.indexOf("-17"));
        lat = lat.substring(0, 11);
        let lon = coord.substring(coord.indexOf("-6"));
        lon = lon.substring(0, 11);
        try {
          if (marker != "") {
            map.removeLayer(marker);
          };
          marker = L.marker([lat, lon], {
            icon: iconRed
          });
          marker.addTo(map);
          map.flyTo([lat, lon], 16);
        } catch {
          alert("Algo salió mal");
        }
      }
  
  
  
  
    };
  
  
  
  
  
  
  
  
  });