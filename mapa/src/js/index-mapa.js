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
import "./Leaflet.AccuratePosition";
import "leaflet-control-custom";
import "./leaflet.Control.Center";
import "leaflet.markercluster";
import 'leaflet.markercluster.layersupport';
import 'leaflet-groupedlayercontrol';

document.addEventListener('DOMContentLoaded', function () {
  auth == 'True' ? auth = true : auth = false;
  var marker = "";
  var precio;
  var colors = ['#ffff00', '#fba657', '#4ade80', '#52b551', '#ff0000', '#00ffff', '#50dbff', '#5eb9fc', '#6199ee', '#808080'];
  var cotizarEnable = false;
  var celular = "+59171011118";

  navbar(); // js para el navbar

  // initialize the map
  var map = L.map('map', {
    center: [-17.784071, -63.180522],
    zoom: 12,
    zoomControl: true
  });

  // load a tile layer
  var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  var Esri_WorldImagery = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    });

  var OpenStreetMap_Dark = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  Esri_WorldImagery.addTo(map);

  const precioEle = document.getElementById("precio");
  const precioText = precioEle.querySelector("p");

  document.getElementById('map').style.cursor = 'crosshair';

  // Coloca pantalla gris y deshabilita funciones 
  function LoadOverlay(status) {
    waiting.classList.toggle("invisible");
    waitingSpinner.classList.toggle("invisible");
    status ? map.off('click', onMapClick) : map.on('click', onMapClick)
  }

  // Agrega boton para encontrar ubicacion 
  L.control.custom({
      position: 'topright',
      content: `    
            <svg class="sombra" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" viewBox="0 0 24 24">
              <path  d="M2 12h3m14 0h3M12 2v3m0 14v3" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="3" />
            </svg>`,
      classes: 'ml-auto h-14 w-14 bg-white rounded-md border border-black',
      id: 'ubicando',
      title: "Encuentra tu ubicación",
      style: {
        cursor: 'pointer',
      },
      events: {
        click: function () {
          ttubicacion.remove();
          LoadOverlay(true);
          map.findAccuratePosition({
            maxWait: 10000,
            desiredAccuracy: 20 
          });
        },
      }
    })
    .addTo(map);

  function onAccuratePositionProgress(e) {
    console.log(e.accuracy);
    console.log(e.latlng);
  }

  function onAccuratePositionFound(e) {
    LoadOverlay(false);
    console.log(e.accuracy);
    console.log(e.latlng);
    map.flyTo(e.latlng, 15);
    (marker != "") ? map.removeLayer(marker): null;
    marker = L.marker(e.latlng, {
      icon: iconRed
    }).addTo(map);
    if (!cotizarEnable) {
      contratanos.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }

  function onAccuratePositionError(e) {
    LoadOverlay(false);
    let idToast = 'accesoUbicacion';
    let iconToast = `
      <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path
          d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
      </svg>`;
    let colorToast = 'warning';
    let tituloToast = 'UBICACION';
    let textoToast = `No pudimos acceder a tu ubicación... Intentalo manualmente o comunicate con nosotros.`;
    createToast(idToast, iconToast, colorToast, tituloToast, textoToast);
    globoWapp("No se encontro la ubicación");
    cancelaccesoUbicacion.onclick = function (event) {
      accesoUbicacion.remove();
    }
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
    ttubicacion.classList.remove("animate-bounce-bottom");
  }

  map.on('accuratepositionprogress', onAccuratePositionProgress);
  map.on('accuratepositionfound', onAccuratePositionFound);
  map.on('accuratepositionerror', onAccuratePositionError);
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

  // Agrega boton de CONTRATANOS que haga fetch al servidor de mapas y encontrar rutas y tiempos
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
          modal.classList.toggle("invisible");
          iPathColor = 0;
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
          globoWapp("Algo sucedió con el servidor, necesito una cotización");
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
      globoWapp("Mi ubicación fuera de rango");
      cancelfueraRango.onclick = () => fueraRango.remove();
    }
  };

  // Funcion desprendida de arriba con la API obtiene datos y graficar ruta
  var pathColor = ['red', 'blue', 'green'];
  var iPathColor = 0;

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
      opacity: 0.1
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
  function inscrito(marker, polygon) {
    let x = marker._latlng.lat,
      y = marker._latlng.lng;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i][0],
        yi = polygon[i][1];
      let xj = polygon[j][0],
        yj = polygon[j][1];
      let intersect = ((yi > y) != (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  };

  // Base de datos del modal si el usuario no esta logueado
  function postCliente (user){
    const urlPost = 'http://127.0.0.1:8000/mapa/api/cliente/create/';
    var data = {
      'lat': marker._latlng.lat.toFixed(6),
      'lon': marker._latlng.lng.toFixed(6),
      'cost': precio,
      'status': 'COT',
      'user': user
    }
    fetch(urlPost, {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))

  }
  
  // icono de cancelar pone base de datos si no esta logueado
  xModal.onclick = function () {
    modal.classList.toggle("invisible");
    !auth ? postCliente ('CLX') : null;
    setTimeout(() => LoadOverlay(false), 100);
  };

  // boton aceptar, pone base de datos si no esta logueado
  confirmarModal.onclick = function () {
    modal.classList.toggle("invisible");
    !auth ? postCliente ('CLC') : null;
    setTimeout(() => LoadOverlay(false), 100);
    let codigo = precio.toString(10).split('');
    codigo.unshift(parseInt(Math.random() * 10));
    codigo.splice(2, 0, parseInt(Math.random() * 10));
    codigo.splice(4, 0, parseInt(Math.random() * 10));
    codigo.splice(6, 0, parseInt(Math.random() * 10));
    codigo = codigo[0] + codigo[1] + codigo[2] + codigo[3] + codigo[4] + codigo[5] + codigo[6];
    let menLatLon = `Código de cotización:${codigo}%0D%0A
    ¡Hola!,Requiero el servicio de limpieza en la siguiente unicación:%0D%0Ahttps://maps.google.com/maps?q=${marker._latlng.lat.toFixed(6)}%2C${marker._latlng.lng.toFixed(6)}&z=17&hl=es`;
    mensajeWapp(menLatLon);
  };

  // Toast de Titulo
  let toast = document.getElementById("toastTitulo");
  toast.addEventListener("mouseover", () => map.off('click', onMapClick));
  toast.addEventListener("mouseout", () => map.on('click', onMapClick));

  toastTituloButton.onclick = function () {
    toastTitulo.classList.toggle("invisible");
    setTimeout(() => map.on('click', onMapClick), 100);
  }

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

  function mensajeWapp(mensaje) {
    let link = "https://wa.me/";
    link += celular;
    link += '?text=';
    mensaje = mensaje.replace(/ /g, "%20");
    link += mensaje;
    console.log(link);
    window.open(link);
  } 

  // Mensaje del globo de whatsapp
  function globoWapp(mensaje) {
    wapp.classList.remove("invisible");
    wapp.classList.add("animate-wapp");
    let link = "https://wa.me/";
    link += celular;
    link += '?text=';
    mensaje = mensaje.replace(/ /g, "%20");
    link += mensaje;
    wapp.querySelector("a").href = link;
  }

  // color del circulo de los marker cluster
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
    spiderfyOnMaxZoom: true,
    zoomToBoundsOnClick: false,
    removeOutsideVisibleBounds: true,
    showCoverageOnHover: false,
    disableClusteringAtZoom: 18,
    maxClusterRadius: 70,
    spiderfyDistanceMultiplier: 1,
    chunkedLoading: true,
    chunkInterval: 100,
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

  const urlGet = 'http://127.0.0.1:8000/mapa/api/cliente/list/?format=json';
  fetch(urlGet)
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

      var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(options)

      var grupoLayers = L.layerGroup()
        .addLayer(fillMarkerList(p300, 0))
        .addLayer(fillMarkerList(p350, 1))
        .addLayer(fillMarkerList(p400, 2))
        .addLayer(fillMarkerList(p450, 3))
        .addLayer(fillMarkerList(p500, 4))
        .addLayer(fillMarkerList(p600, 5))
        .addLayer(fillMarkerList(p700, 6))
        .addLayer(fillMarkerList(p800, 7))
        .addLayer(fillMarkerList(p900, 8))
        .addLayer(fillMarkerList(p1000, 9));

      mcgLayerSupportGroup.addTo(map);

      mcgLayerSupportGroup.checkIn(grupoLayers);

      grupoLayers.addTo(map);

      var baseMaps = {
        "Light": OpenStreetMap_Mapnik,
        "Dark": OpenStreetMap_Dark,
        "Satelite": Esri_WorldImagery,
      };

      var overlayMaps = {
        "Nuestros clientes": {
          "Mostrar los últimos": grupoLayers
        }
      }

      var optionsControl = {
        groupCheckboxes: false,
        position: 'topleft',
        collapsed: true
      };

      L.control.groupedLayers(baseMaps, overlayMaps, optionsControl).addTo(map);

    })

  function fillMarkerList(puntoPPrecio, color) {
    var markerList = [];
    for (var i = 0; i < puntoPPrecio.length; i++) {
      var e = puntoPPrecio[i];
      var title = e[2];
      var marca =

        L.circleMarker(L.latLng(e[0], e[1]), circleStyle(color), {
          title: title
        });

      markerList.push(marca);
    }
    return markerList;
  }

});