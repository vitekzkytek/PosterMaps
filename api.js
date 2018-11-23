var mymap;


function DrawMap() {
    mymap = new mapboxgl.Map({
    container: 'mapid', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //hosted style id
    center: [-50.1, 14.4], // starting position
    zoom: 10 // starting zoom
});

}
