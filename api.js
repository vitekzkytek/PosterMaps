function loadJS() {
    $.ajax({
        url:
            'https://www.overpass-api.de/api/interpreter?data=' + 
            '[out:json][bbox:50.074,14.39,50.099,14.45];'+
    '(' +
    'way["highway"~"primary|secondary|tertiary|residential"];'+
    'way["railway"="rail"];'+
    'rel["water"];'+
    'rel["waterway"~"river|stream"];'+
    ');'+
    '(._;>;);'+
    'out;',
        dataType: 'json',
        type: 'GET',
        async: true,
        crossDomain: true
    }).done(function() {
        console.log( "second success" );
    }).fail(function(error) {
        console.log(error);
        console.log( "error" );
    }).always(function() {
        console.log( "complete" );
    });
    ​
}


