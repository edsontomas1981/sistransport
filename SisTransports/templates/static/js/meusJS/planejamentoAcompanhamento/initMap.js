

// const initMapColetas= ()=>{
//     // Cria um novo mapa do Google
//     var map = new google.maps.Map(document.getElementById('map'), { 
//         center: myLatLng,
//         zoom: 10.3, // Ajuste o zoom conforme necessário
//     });
// }

// const criaMapas = (divMapa, latLng) => {
//     const mapa = new google.maps.Map(document.getElementById(divMapa), {
//         center: latLng,
//         zoom: 10.3,
//     });

//     mapa.markers = []; // Inicializa a lista de marcadores dentro do objeto mapa
//     mapa.dados = [];

//     return mapa;
// };

const criaMapas = (divMapa, latLng) => {
    console.log(latLng)
    var mapa = L.map(divMapa).setView([latLng.lat, latLng.lng], 10); // Coordenadas iniciais e nível de zoom
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa); // Adicionar camada de mapa ao mapa

    mapa.markers = []; // Inicializa a lista de marcadores dentro do objeto mapa
    mapa.dados = []; // Inicializa a lista de dados associados ao mapa (por exemplo, informações de marcadores)

    return mapa; // Retorna o objeto do mapa Leaflet recém-criado
};


const addMarker = (latitude, longitude, icone, dados, id, mapa, callback) => {
    // Cria um ícone personalizado com o tamanho desejado
    let customIcon = L.icon({
        iconUrl: icone,
        iconSize: [30, 30], // Largura e altura do ícone em pixels
        iconAnchor: [15, 15] // Ponto de ancoragem do ícone (centro)
    });

    // Cria um marcador com a posição e o ícone personalizado
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(mapa);

    // Atribui um ID único ao marcador (se necessário)
    if (id) {
        marker.myId = id;
    }

    // Adiciona um evento de clique ao marcador para chamar a função de callback
    marker.on('click', () => {
        if (typeof callback === 'function') {
            callback(dados);
        }
    });

    // Retorna o marcador criado
    return marker;
};


// const addMarker = (latitude, longitude, icone, dados, id, mapa,callback) => {
//     let markers = []

//     var iconSize = {
//         width: 30, // Largura desejada em pixels
//         height: 30 // Altura desejada em pixels
//       };
//     const marker = new google.maps.Marker({
//         position: { lat: latitude, lng: longitude },
//         map: mapa,
//         icon: {
//             url: icone,
//             scaledSize: new google.maps.Size(iconSize.width, iconSize.height)
//         },
//         id: id // Atribui um ID único ao marcador
//     });

//     marker.addListener('click', () => {
//         if (typeof callback === 'function') {
//             callback(dados);
//         }
//     });

//     // Adiciona o marcador à lista de marcadores do mapa
//     markers.push(marker);
//     return marker
// };

const addMarkerResponsavel = (lat,lng,icon,dados,id,mapa,callback)=>{
    addMarker(lat,lng,icon,dados,id,mapa)
}

const removeMarker = (map, markerId) => {
    if (map.markers && map.markers.length > 0) {
        for (let i = 0; i < map.markers.length; i++) {
            if (map.markers[i].options.id === markerId) {
                // Remove o marcador do mapa
                map.removeLayer(map.markers[i]);
                // Remove o marcador da lista de marcadores
                map.markers.splice(i, 1);
                break;
            }
        }
    }
};


