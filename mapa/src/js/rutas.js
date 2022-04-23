// https://stackoverflow.com/questions/56153172/fetch-data-from-multiple-apis-with-async-await
    // const prueba1 = [-17.68524100, -63.08830261, 'prueba1'];
    // const prueba2 = [-17.72252621, -63.04779052, 'prueba2'];
    const saguapac = [-17.74620847, -63.12672898, 'saguapac'];
    const garaje = [-17.78595813, -63.12451243, 'garaje'];
    var bases = [saguapac, garaje];

export function rutas(marker) {
    const request = (lat, lon, marker, origen) => {
        const profile = '/driving/';
        // let url = 'http://router.project-osrm.org/route/v1';
        var url = 'https://osrm.pozosscz.com/route/v1';
        url = url + profile + lon + "," + lat + ";" + marker._latlng.lng + "," + marker._latlng.lat + "?steps=true&geometries=geojson";
        let result = new Object();

        // Rough implementation. Untested.
        function timeout(ms, promise) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    reject(new Error("timeout"))
                }, ms)
                promise.then(resolve, reject)
            })
        }

        return timeout(6000, fetch(url))
            .then(resp => resp.json())
            .then(resp => {
                let ruta = [];
                let distancia = parseFloat((resp.routes[0].distance / 1000).toFixed(2)); //kilometros
                // Multiplicamos por dos para tener un tiempo estimado de recorrido de un camion
                let tiempo = parseInt(Math.round(resp.routes[0].duration / 60) * 2); //minutos
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
            .catch(function (error) {
                return null;
            })


    }
    console.log("---------------------");
    const promises = [];
    bases.map((o) => {
        promises.push(request(o[0], o[1], marker, o[2]))
    });
    return Promise.all(promises);
};