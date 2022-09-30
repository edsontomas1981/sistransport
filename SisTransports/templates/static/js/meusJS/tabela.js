

// function incluiTabela() {
//     let url = '/comercial/createTabela/'
//     let postData = $('form').serialize();

//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {

//         },
//         error: function(xhr) {
//             console.log('Erro');
//         }
//     });
// }

$('#comlCnpj').on('blur', function(e) {
    let dados=['/busca_parceiro/',$('#comlCnpj').val()]
    alert(dados)
    ajaxTabela(dados,populaRazao)
    
});

function populaRazao(response) {
    $('#comlRazao').val(response.dados[0].raz_soc)
}

function limpaForm(){

    $('#descTabela').val('')
        //se sim tabela esta bloqueada
    $('#tabelaBloqueada').prop("checked", false);
    $('#icms').prop("checked", true);
    $('#cobraCubagem').prop("checked", true);
    $('#vlrFrete').val('');
    $('#advalor').val('');
    $('#gris').val('');
    $('#despacho').val('');
    $('#outros').val('');
    $('#pedagio').val('');
    $('#cubagem').val('');
    $('#freteMinimo').val('');
    $('#tipoFrete').val('');
    $('#tipoCobranPedagio').val('');
    limpaTabela();

}

function populaTabela(response) {
    limpaTabela()
    parceirosVinculados(response)
    $('#descTabela').val(response.tabela.descricao)
        //se sim tabela esta bloqueada
    if (response.tabela.bloqueada == 1) {
        $('#tabelaBloqueada').prop("checked", true);
    } else {
        $('#tabelaBloqueada').prop("checked", false);
    }
    if (response.tabela.icmsIncluso == 1) {
        $('#icms').prop("checked", true);
    } else {
        $('#icms').prop("checked", false);
    }
    if (response.tabela.cubagem == 1) {
        $('#cobraCubagem').prop("checked", true);
    } else {
        $('#cobraCubagem').prop("checked", false);
    }
    $('#vlrFrete').val(response.tabela.frete);
    $('#advalor').val(response.tabela.adValor);
    $('#gris').val(response.tabela.gris);
    $('#despacho').val(response.tabela.despacho);
    $('#outros').val(response.tabela.outros);
    $('#pedagio').val(response.tabela.pedagio);
    $('#cubagem').val(response.tabela.fatorCubagem);
    $('#freteMinimo').val(response.tabela.freteMinimo);
    $('#tipoFrete').val(response.tabela.tipoCalculo);
    $('#tipoCobranPedagio').val(response.tabela.tipoPedagio);
}
//enviar um array com a url e caso necessario o cnpj para consulta  
function ajaxTabela(dados,callback){
    let url = dados[0]
    let postData = $('form').serialize();
    if (dados.length>1){
        alert(dados[1])
        postData += '&cnpj_cpf=' + dados[1];
    }
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        success: function(response) {
            callback(response)
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

$('#btnIncluiTabela').on('click', function(e) {
    alert('inclui')
    dados=['/comercial/createTabela/']
    ajaxTabela(dados,incluiTabela)
    e.preventDefault();
})

function incluiTabela(response){
    switch (response.status) {
        case 200:
            alert('Tabela salva com sucesso !')
            break;
        case 210:
            alert('Dtc ' + $('#numPed').val(response.dados.id) + ' alterado com sucesso !')
            $('#numPed').val(response.dados.id)
            break;
        case 400:
            alert('Erro !' + response.camposObrigatorios)
            break;
        default:
            // code block
    }
}

$('#btnBuscaTabela').on('click', function(e) {
    dados=['/comercial/readTabela/']
    ajaxTabela(dados,populaTabela);
});

function limpaTabela() {
    $('#cnpjsRelacionados td').remove();
}

function parceirosVinculados(response) {
    alert(response.parceirosVinculados)
    const data = response.parceirosVinculados;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr">' +
            '<td>' + data[i].cnpj_cpf + '</td>' +
            '<td>' + data[i].raz_soc+ '</td>' +
            '<td>' + '<button type="button" id="alteraContato"  class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" id="excluiContato" class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
        $('#cnpjsRelacionados tbody').append(template)
    }
};