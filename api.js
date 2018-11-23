var mymap;


function DrawMap() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoidml0ZWt6a3l0ZWsiLCJhIjoiY2pvdTYyZWE4MThvOTNwbXpkcG40YTEyeCJ9.NYfKgDcmwcTw5zo8u4UFmg';

    mymap = new mapboxgl.Map({
    container: 'mapid', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //hosted style id
    center: [-50.1, 14.4], // starting position
    zoom: 10 // starting zoom
});

}
