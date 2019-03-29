window.onload = function() {
var mapa = L.map('mapa1').setView([-25.45, -49.27], 11);

//Mapbox  L.tileLayer(
//'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
//{
//id: ‘mapa_escolhido',  accessToken: ‘seu_token'
//}
//).addTo(mapa);


//OpenStreetMap
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
//.addTo(mapa);


///// ADICIONAR FEIÇÕES/////

//Ponto
var ponto = L.marker(  [-25.45, -49.27]
)
//.addTo(mapa);

//Linha
var linha = L.polyline([
[-25.4, -49.2],
[-25.5, -49.1]
])
//.addTo(mapa);

//Polígono
var poligono = L.polygon([  [-25.5, -49.3],
[-25.5, -49.5],
[-25.6, -49.3]
])
//.addTo(mapa);


//Círculo
var circulo = L.circle(  [-25.45, -49.35],
{
color: 'red',  fillColor: '#f03',  fillOpacity: 0.5,
radius: 5000
}
)
//.addTo(mapa);

/////COLOCAR LEGENDA NAS FEIÇÕES/////
//Anexar popups  ponto.bindPopup(“Eu sou um ponto!”);  linha.bindPopup(“Eu sou uma linha!”);
poligono.bindPopup("Eu sou um polígono!");
circulo.bindPopup("Eu sou um círculo");

//Abrir popus
ponto.openPopup();
linha.openPopup();
poligono.openPopup();
circulo.openPopup();

//Popup em local específico do mapa
var popup = L.popup()
.setLatLng([-25.44, -49.51])
.setContent("Eu sou uma popup!")
.openOn(mapa);


//Adicionar camada WMS ao mapa
var bairros = L.tileLayer.wms('http://localhost:8082/geoserver/sig/wms', {
layers: 'sig:divisa_de_bairros_wgs3',
transparent: 'true',
format: 'image/png'
})
//.addTo(mapa);

// //Adicionar legenda WMS
// var uri = 'http://localhost:8080/geoserver/wms?
// REQUEST=GetLegendGraphic&  FORMAT=image/jpeg&  LAYER=topp:states';
//
// document.getElementById('legenda').src = uri;


// ///////////GRUPO DE CAMADAS/////////////
// //Pontos
// var ponto1 = L.marker([-25.45, -49.27]);
// ponto2 = L.marker([-25.43, -49.29]);
//
// //Linhas
// var linha1 = L.polyline([[-25.4, -49.2], [-25.5, -49.1]]);
// linha2 = L.polyline([[-25.4, -49.1], [-25.5, -49.2]]);
//
// //Tile
// var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
//
// //Agrupar camadas
// var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
// var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
// var combinacao = L.layerGroup([ponto1, ponto2, linha1, linha2, osm]).addTo(mapa);
//


//Mapas base
var baseCartografica = {
"OpenStreetMapdadosbanco": osm
}

//Mapas de sobreposiçao
var informacaoTematica = {
"Pontos": ponto,
"Linhas": linha,
"Poligono": poligono,
"Geoserver": bairros
}

//Adicionar objetos ao controle de camadas
L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);


//Escala gráfica
L.control.scale({position: 'bottomright'}).addTo(mapa);


}
