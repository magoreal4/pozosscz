
import "./index-mapa";

document.addEventListener('DOMContentLoaded', function (event) {



});

// var p300 = L.layerGroup();
// var p350 = L.layerGroup();
// var p400 = L.layerGroup();
// var p450 = L.layerGroup();
// var p500 = L.layerGroup();
// var p600 = L.layerGroup();
// var p700 = L.layerGroup();
// var p800 = L.layerGroup();
// var p900 = L.layerGroup();
// var p1000 = L.layerGroup();

// var layersPrecio = [p300,p350,p400,p450,p500,p600,p700,p800,p900,p1000];

// var tipoMarca = document.getElementById("elms-shape-select").value;

// var markers = L.markerClusterGroup(options);

// let urlDjango = 'http://127.0.0.1:8000/mapa/api/cliente/list/?format=json';

// fetch(urlDjango)
//   .then(resp => resp.json())
//   .then(resp => {
//     resp.forEach((e, i) => {
//       let color;
//       // 10 colores algunos multiples de 50
//       color = e.cost / 100;
//       color <= 3 ? color = 0 : null;
//       if (color > 3 && color < 5) {
//         color = Math.round(color * 2) / 2;
//         color <= 3.5 ? color = 1 : null;
//         color == 4 ? color = 2 : null;
//         color >= 4.5 ? color = 3 : null;
//       }
//       color >= 5 && color < 10 ? color = Math.trunc(color) - 1 : null;
//       color >= 10 ? color = 9 : null;

//       var marca =
//         tipoMarca === "circulo" ?
//         L.circleMarker(L.latLng(e.lat, e.lon), circleStyle(colors[color]), {
//           title: e.cost
//         }) :
//         L.marker([e.lat, e.lon]);

//       switch (color) {
//         case 0:
//           p300.addLayer(marca);
//           break;
//         case 1:
//           p350.addLayer(marca);
//           break;
//         case 2:
//           p400.addLayer(marca);
//           break;
//         case 3:
//           p450.addLayer(marca);
//           break;
//         case 4:
//           p500.addLayer(marca);
//           break;
//         case 5:
//           p600.addLayer(marca);
//           break;
//         case 6:
//           p700.addLayer(marca);
//           break;
//         case 7:
//           p800.addLayer(marca);
//           break;
//         case 8:
//           p900.addLayer(marca);
//           break;
//         case 9:
//           p1000.addLayer(marca);
//           break;
//       }

//       layersPrecio.forEach((e)=>markers.addLayer(e));
      
//     });
    
//     map.addLayer(markers);
//   });


//   const inputsCheckB = document.querySelectorAll('#cbs input');
//   const parentCheckB = document.querySelector('#parent_cb input')
//   // check();
//   parentCheckB.checked = true;

//   function check(checked = true) {
//     inputsCheckB.forEach((checkbox) => {
//       checkbox.checked = checked;
//     });
//   }

//   parentCheckB.onclick = () =>
//     parentCheckB.checked ? check() : check(false);

//   cbs.addEventListener('change', (event) => {
//     var revCheck=false;
//     inputsCheckB.forEach((checkbox) => {
//       checkbox.checked ? revCheck=true : null
//     });
//     parentCheckB.checked = revCheck;
//     console.log("hola");
//     // p300.addTo(map); }
//     map.removeLayer(p300);
//     markers.refreshClusters();
//     markers.refreshClusters(p300);

//   });


// var group300 = L.LayerGroup(fillMarkerList(p300,0));
// var group350 = L.LayerGroup(fillMarkerList(p350,1));
// var group400 = L.LayerGroup(fillMarkerList(p400,2));
// var group450 = L.LayerGroup(fillMarkerList(p450,3));
// var group500 = L.LayerGroup(fillMarkerList(p500,4));
// var group600 = L.LayerGroup(fillMarkerList(p600,5));
// var group700 = L.LayerGroup(fillMarkerList(p700,6));
// var group800 = L.LayerGroup(fillMarkerList(p800,7));
// var group900 = L.LayerGroup(fillMarkerList(p900,8));
// var group1000 = L.LayerGroup(fillMarkerList(p1000,9));
