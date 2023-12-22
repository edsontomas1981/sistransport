let selectEmissorCte  = document.getElementById('emissoraCte')
selectEmissorCte.addEventListener('change',()=>{
    limpaFreteCte()
})

const carregaEmissores = ()=>{
    // Obtém os dados do emissor usando a função dadosEmissor
    var emissores = dadosEmissor();
    // Itera sobre os dados do emissor e adiciona opções ao select
    emissores.forEach((emissor)=> {
        // Cria um elemento option
        var option = document.createElement('option');
        // Define os atributos do option com base nos dados do emissor
        option.value = emissor.id;
        option.text = emissor.siglaFilial;
        // Adiciona a opção ao select
        selectEmissorCte.appendChild(option);
    });
}