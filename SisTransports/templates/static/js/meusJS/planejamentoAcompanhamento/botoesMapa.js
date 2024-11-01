let btnResetMapa = document.getElementById('btnResetMapa')
btnResetMapa.addEventListener('click',()=>{
    let centroMapa = document.getElementById('selectFilial')

    // Obtém a opção selecionada atualmente
    var selectedOption = centroMapa.options[centroMapa.selectedIndex];
    // Obtém os valores de latitude e longitude da opção selecionada
    var selectedLat = parseFloat(selectedOption.getAttribute('data-lat'));
    var selectedLng = parseFloat(selectedOption.getAttribute('data-lng'));
    if(selectedLat && selectedLng ){
        mapa.removerCirculo()
        mapa.removerRota()
        mapa.alterarCentroDoMapa()
    
        mapa.alterarCentroDoMapa(selectedLat,selectedLng)
    }else{
        msgAviso("Selecione uma filial")
    }

    limpaSemaforo()
})


let btnVisualizaPontosDeAtendimento = document.getElementById('btnVisualizaPontosDeAtendimento')
btnVisualizaPontosDeAtendimento.addEventListener('click',()=>{
    mapa.removerTodosMarcadores()
    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)
})

let btnLocalizacaoVeiculos = document.getElementById('btnLocalizacaoVeiculos')
btnLocalizacaoVeiculos.addEventListener('click',()=>{
    mapa.removerTodosMarcadores()
    mapa.adicionarMarcadorComIcone(-23.47337308,-46.47320867,"Matriz",armazem,iconeSize,1,verificaEstado)
})

let btnHabilitaCriacaoIntinerario = document.getElementById('btnHabilitaCriacaoIntinerario')
btnHabilitaCriacaoIntinerario.addEventListener('click',async ()=>{
    if(!(await msgConfirmacao(`Deseja Criar um Intinerário para o veiculo`))){
       return
    }

    abrirPainelIntinerario()
    stateMapa.estado = "selecionandoLocais"
})

// let btnFinalizaIntinerario = document.getElementById('btnFinalizaIntinerario')
// btnFinalizaIntinerario.addEventListener('click',async ()=>{
//     restauraMapa()
//     stateMapa.estado = null
// })