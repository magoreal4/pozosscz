export function rutas(marker, origen) {
    const request = (lat, lon, marker, origen) => {
        const profile = '/driving/';
        let url = 'http://router.project-osrm.org/route/v1';
        // var url = 'http://127.0.0.1:5000/route/v1';
        url = url + profile + lon + "," + lat + ";" + marker._latlng.lng + "," + marker._latlng.lat + "?steps=true&geometries=geojson";
        let result = new Object();
        return fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                let ruta = [];
                let distancia = parseFloat((resp.routes[0].distance / 1000).toFixed(2)); //kilometros
                let tiempo = parseInt(Math.round(resp.routes[0].duration % 3600 / 60)); //minutos
                let pasos = resp.routes[0].legs[0].steps;
                pasos.forEach(e => {
                    for (var index = 1; index < e.geometry.coordinates.length; index++) {
                        ruta.push(e.geometry.coordinates[index]);
                    }
                });
                // Da la vuelta entre latitud y longitud
                for (var i = 0; i < ruta.length; i++) {
                    ruta[i].reverse();
                }
                result.distancia = distancia;
                result.tiempo = tiempo;
                result.ruta = ruta;
                result.origen = origen
                return result;
            })
    }
    console.log("---------------------");
    const promises = [];
    origen.map((o) => {
        promises.push(request(o[0], o[1], marker, o[2]))
    });
    return Promise.all(promises)
};