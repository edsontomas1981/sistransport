var listaTabelas

const carregaTabelasGerais=async()=>{
    let dados = {'idRota':$('#rotasDtc').val()}
    let conexao = new Conexao('/comercial/readTabelasGeraisPorRota/', dados);
    try {
        const result = await conexao.sendPostRequest();
        populaSelectTabelas('tabelaCotacao',result)
        listaTabelas=result.tabelas
        // console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}  

const carregaTabelasEspecificas=async()=>{
    let conexao = new Conexao('/comercial/readTabelasPorParceiro/', {tomador:$('#cnpjTomador').val()});
    try {
        const result = await conexao.sendPostRequest();
        populaSelectTabelas('tabelaCotacao',result)
        listaTabelas=result.tabelas
        console.log(result); // Imprime a resposta JSON da solicitação POST
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }
}

const bloqueiaFreteCotacao=()=>{
    $('#freteValorCotacao').attr('disabled',true)
    $('#fretePesoCotacao').attr('disabled',true)
    $('#advalorCotacao').attr('disabled',true)
    $('#grisCotacao').attr('disabled',true)
    $('#pedagioCotacao').attr('disabled',true)
    $('#despachoCotacao').attr('disabled',true)
    $('#outrosCotacao').attr('disabled',true)
    $('#vlrColetaCotacao').attr('disabled',true)
}

const desbloqueiaFreteCotacao=()=>{
    $('#freteValorCotacao').attr('disabled',false)
    $('#fretePesoCotacao').attr('disabled',false)
    $('#advalorCotacao').attr('disabled',false)
    $('#grisCotacao').attr('disabled',false)
    $('#pedagioCotacao').attr('disabled',false)
    $('#despachoCotacao').attr('disabled',false)
    $('#outrosCotacao').attr('disabled',false)
    $('#vlrColetaCotacao').attr('disabled',false)
    $('#tabelaCotacao').val(0)
}

const limpaCamposFreteCotacao = ()=>{
    $('#freteValorCotacao').val('')
    $('#fretePesoCotacao').val('')
    $('#advalorCotacao').val('')
    $('#grisCotacao').val('')
    $('#pedagioCotacao').val('')
    $('#despachoCotacao').val('')
    $('#outrosCotacao').val('')
    $('#baseCalculoCotacao').val('')
    $('#aliquotaCotacao').val('')
    $('#icmsCotacao').val('')
}

const resetaSelectCotacao = () => {
    const tipoTabelaCotacao = $('#tipoTabelaCotacao')[0];
    tipoTabelaCotacao.innerHTML = '<option value="0">Selecione o tipo de tabela</option><option value="1">Tabela geral</option><option value="2">Tabela cliente</option><option value="3">Frete informado</option>';
    const tabelaCotacao = $('#tabelaCotacao')[0];
    tabelaCotacao.innerHTML =''
    tabelaCotacao.innerHTML = '<option value="0">Selecione a tabela</option>';
};

const populaFreteCotacao = (composicaoFrete) => {
    $('#fretePesoCotacao').val(composicaoFrete.fretePeso ? arredondaDuasCasas(composicaoFrete.fretePeso):arredondaDuasCasas(0));
    $('#advalorCotacao').val(composicaoFrete.advalor ? arredondaDuasCasas(composicaoFrete.advalor) :arredondaDuasCasas(0) );
    $('#vlrColetaCotacao').val(composicaoFrete.vlrColeta ? arredondaDuasCasas(composicaoFrete.vlrColeta):arredondaDuasCasas(0) );
    $('#grisCotacao').val(composicaoFrete.gris ? arredondaDuasCasas(composicaoFrete.gris) : arredondaDuasCasas(0));
    $('#pedagioCotacao').val(composicaoFrete.vlrPedagio ? arredondaDuasCasas(composicaoFrete.vlrPedagio):arredondaDuasCasas(0));
    $('#despachoCotacao').val(composicaoFrete.despacho ? arredondaDuasCasas(composicaoFrete.despacho):arredondaDuasCasas(0));
    $('#outrosCotacao').val(composicaoFrete.outros ? arredondaDuasCasas(composicaoFrete.outros):arredondaDuasCasas(0));
    $('#vlrColetaCotacao').val(composicaoFrete.vlrColeta)
    $('#aliquotaCotacao').val(composicaoFrete.aliquota)
}

const arredondaDuasCasas=(valor)=>{
    return parseFloat(valor).toFixed(2)
}

function limpaCotacao(){
    $('#nomeCotacao').val('')
    $('#contatoCotacao').val('')
    $('#nfCotacao').val('')
    $('#volumeCotacao').val('')
    $('#mercadoriaCotacao').val('')
    $('#valorNfCotacao').val('')
    $('#pesoCotacao').val('')
    $('#pesoFaturadoCotacao').val('')
    $('#resultM3Cotacao').val('')
    $('#obsCotacao').val('')
    limpaCamposFreteCotacao();
    resetaSelectCotacao();
}

const geraDadosCotacao=()=>{
    return{
            'volumes':$('#volumeCotacao').val(),
            'vlrNf':$('#valorNfCotacao').val(),
            'peso':$('#pesoCotacao').val(),
            'm3':$('#resultM3Cotacao').val(),
        }
};

$('#pills-cotacao-tab').on('focus', function(e) {
    resetaSelectCotacao()
});

$('#tipoTabelaCotacao').on('change', function() {
    // Verifica o valor da opção selecionada
    var selectedValue = $(this).val();
       // Executa ação com base no valor selecionado
    if (selectedValue === '1') {
        bloqueiaFreteCotacao();
        carregaTabelasGerais()
    } else if (selectedValue === '2') {
        carregaTabelasEspecificas()
      // Executa ação quando a opção "Tabela cliente" é selecionada
    } else {
        bloqueiaFreteCotacao();
        carregaFreteInformado();
      // Executa ação quando nenhuma opção é selecionada
    }
});

$('#rotasDtc').on('change',function(e){
    resetaSelectCotacao()
})

const checkCamposVazios = (idForm,idCposObrigatorios) => {
    let formulario = document.getElementById(idForm);
    let campos = formulario.querySelectorAll(idCposObrigatorios);
    let campoVazios = []
    for (let i = 0; i < campos.length; i++) {
      if (campos[i].value.trim() === '') {
        campoVazios.push(campos[i].placeholder)
      }
    }
    return campoVazios;
  };
  



