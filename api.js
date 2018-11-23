var mymap;

function processSVG() {
    var coords = mymap.getBounds();
    $.ajax({
        url:
            `
            https://www.overpass-api.de/api/interpreter?data=  
                [out:json][bbox:${coords._southWest.lat},${coords._southWest.lng},${coords._northEast.lat},${coords._northEast.lng}];
                (
                    way["highway"~"primary|secondary|tertiary|residential|footway|trunk"];
                    way["railway"="rail"];
                    rel["water"];
                    rel["waterway"~"river|stream"];
                );
                (._;>;);
                out;
            `,
        dataType: 'json',
        type: 'GET',
        async: true,
        crossDomain: true
    }).done(function(result,status) {


        testD3(osmtogeojson(result),coords);
    }).fail(function(error) {
        console.log(error);
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });
}

function DrawMap() {
    mymap = L.map('mapid').setView([50.09,14.41], 14);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1Ijoidml0ZWt6a3l0ZWsiLCJhIjoiY2pvdTYyZWE4MThvOTNwbXpkcG40YTEyeCJ9.NYfKgDcmwcTw5zo8u4UFmg'
}).addTo(mymap);

}


function testD3(response,coords) {
    var width = 960,
        height = 500

    var svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    var clip = d3.geoClipRectangle(50.057,14.38,50.11,14.48);

    //var projection = d3.geoMercator().fitExtent([[0,0],[width,height]],response);//.scale(1).center([(coords._southWest.lat + coords._northEast.lat)/2,(coords._southWest.lng + coords._northEast.lng)/2])//.postclip(clip);//.clipExtent([[50.057,14.38],[50.11,14.48]]);//.scale(100);
    var projection = d3.geoMercator().fitExtent([[20,20],[width,height]],response)//.preclip([[coords._southWest.lng,coords._northEast.lat],[coords._northEast.lng,coords._southWest.lat]]);


    var path = d3.geoPath().projection(projection);　
    svg.selectAll('path')
    .data(response.features)
    .enter()
    .append('path')
    .attr('d',path)
    .attr('fill','black');
}