
function closeModal() {

    // Limpa os campos
    $('#cnpj').val('');
    $('#idParceiro').val('');
    $('#collapseOne').removeClass('show');
    $('#collapseTwo').removeClass('show');
    $('#collapseThree').removeClass('show');
    $('#comercial').removeClass('show');

    $('#mdlCadParceiros').modal('hide'); 
}

$('#btnFechar').on('click', function(e) {
    $('#mdlCadParceiros').modal('hide'); 
    closeModal();
    e.preventDefault();
})

$('#btnClose').on('click', function(e) {
    closeModal();
    e.preventDefault();
})

$('#salvaParceiro').on('click',function (e){
    let dados={'url':'/createParceiro/'}
    conectaBackEnd(dados,createParceiro)
})

var createParceiro = (response) =>{
    switch (response.status) {
        case 200:
            alert('Parceiro cadastrado com sucesso !')
            break;
        default:
            break;
    }
}



// Mudar logica de variaveis globais para que cada botão encaminhe para uma rota  
// var editaContato
// var quemChamouModal
// var botaoQueFoiAcionado
// // Reduzir as duas funçoes abaixo em uma só duas funcoes que basicamente fazem a mesma coisa
// function preencheModalClick(cnpj, insc, razao, fantasia, cep,
//     endereco, numero, complemento, bairro, cidade, uf) {
//     $('#collapseOne').addClass('show');
//     let cnpjModal = $('#' + cnpj).val().replace(/[^\d]+/g, '');
//     $('#cnpjMdl').val(cnpjModal);
//     $('#insc_estMdl').val($('#' + insc).val());
//     $('#razaoMdl').val($('#' + razao).val());
//     $('#fantasiaMdl').val($('#' + fantasia).val());
//     let cepMdl = $('#' + cep).val().replace(/\D/g, '');
//     $('#cepMdl').val(cepMdl);
//     $('#ruaMdl').val($('#' + endereco).val());
//     $('#numeroMdl').val($('#' + numero).val());
//     $('#bairroMdl').val($('#' + bairro).val());
//     $('#complementoMdl').val($('#' + complemento).val());
//     $('#cidadeMdl').val($('#' + cidade).val());
//     $('#ufMdl').val($('#' + uf).val());
// }

// function chamaMdlPopula(response) {
//     $('#mdlCadParceiros').modal('show');
//     $('#collapseOne').addClass('show');
//     $('#idParceiro').val(response.dados[0].id)
//     $('#idEndereco').val(response.dados[0].endereco_fk.id)
//     let cnpjModal = response.dados[0].cnpj_cpf.replace(/[^\d]+/g, '');
//     $('#cnpjMdl').val(cnpjModal);
//     $('#razaoMdl').val(response.dados[0].raz_soc);
//     $('#fantasiaMdl').val(response.dados[0].nome_fantasia);
//     let cep = response.dados[0].endereco_fk.cep.replace(/\D/g, '');
//     $('#cepMdl').val(cep);
//     $('#ruaMdl').val(response.dados[0].endereco_fk.logradouro);
//     $('#numeroMdl').val(response.dados[0].endereco_fk.numero);
//     $('#bairroMdl').val(response.dados[0].endereco_fk.bairro);
//     $('#complementoMdl').val(response.dados[0].endereco_fk.complemento);
//     $('#cidadeMdl').val(response.dados[0].endereco_fk.cidade);
//     $('#ufMdl').val(response.dados[0].endereco_fk.uf);
//     $('#razaoMdl').focus()
// }

// function completaCnpj(response, insc, razao, fantasia, cep,
//     endereco, numero, complemento, bairro, cidade, uf) {
//     if (response.dados.length > 0) {
//         $('#idParceiro').val(response.dados[0].id)
//         $('#idEndereco').val(response.dados[0].endereco_fk.id)
//         $('#' + insc).val(response.dados[0].insc_est);
//         $('#' + razao).val(response.dados[0].raz_soc);
//         $('#' + fantasia).val(response.dados[0].nome_fantasia);
//         $('#' + cep).val(response.dados[0].endereco_fk.cep);
//         $('#' + endereco).val(response.dados[0].endereco_fk.logradouro);
//         $('#' + numero).val(response.dados[0].endereco_fk.numero);
//         $('#' + complemento).val(response.dados[0].endereco_fk.complemento);
//         $('#' + bairro).val(response.dados[0].endereco_fk.bairro);
//         $('#' + cidade).val(response.dados[0].endereco_fk.cidade);
//         $('#' + uf).val(response.dados[0].endereco_fk.uf);
//     } else {
//         alert(response.message)
//     }
// }

function limpaCnpj(cnpj, insc, razao, fantasia, cep,
    endereco, numero, complemento, bairro, cidade, uf) {

    $('#idParceiro').val('')
    $('#idEndereco').val('')
    $('#' + cnpj).val('');
    $('#' + insc).val('');
    $('#' + razao).val('');
    $('#' + fantasia).val('');
    $('#' + cep).val('');
    $('#' + endereco).val('');
    $('#' + numero).val('');
    $('#' + complemento).val('');
    $('#' + bairro).val('');
    $('#' + cidade).val('');
    $('#' + uf).val('');
}

// function busca_parceiro(cnpj, insc, razao, fantasia, cep,
//     endereco, numero, complemento, bairro, cidade, uf) {
//     let url = '/busca_parceiro/'
//     let postData = $('form').serialize();
//     postData += '&cnpj_cpf=' + cnpj;
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             switch (response.status) {
//                 case 200:
//                     completaCnpj(response, insc, razao, fantasia, cep,
//                         endereco, numero, complemento, bairro, cidade, uf);
//                     formHabilitaEdicao()
//                     limpaTabelaContatos()
//                     adicionaContatoNaTabela(response)
//                     break;
//                 case 201:
//                     completaCnpj(response, insc, razao, fantasia, cep,
//                         endereco, numero, complemento, bairro, cidade, uf);
//                     limpaTabelaContatos()
//                     formHabilitaEdicao()
//                     break;
//                 case 429:
//                     alert('Limite de requisições por minuto, excedido,tente novamente mais tarde.')
//                     break;
//                 case 202:
//                     console.log(response.status)
//                     chamaMdlPopula(response);
//                     formDesabilitaEdicao()
//                     break;
//                 case 401:
//                     alert('Cnpj ou Cpf inválido !')
//                     break;

//             }
//         },
//         error: function(xhr) {
//             console.log('Erro');
//         }

//     });
// }

// $('.somenteCadastrado').on('click', function(e) {
//     if (!editaContato) {
//         alert("Para acessar esse módulo, é necessário primeiro salvar o parceiro.")
//     }
// })





// $('#salvaParceiro').on('click', function(e) {
//     $('#acaoForm').val('salvaParceiro')
//     let url = '/salva_parceiro/'
//     let postData = $('form').serialize();
//     postData += '&cepMdl=' + $('#cepMdl').val()
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             alert('Cadastro efetuado com sucesso')
//             formHabilitaEdicao()
//         },
//         error: function(xhr) {
//             console.log('Erro');
//         }
//     });
//     e.preventDefault();
// });

// $('#incluiContato').on('click', function(e) {
//     $('#acaoForm').val('incluiContato');
//     let url = '/inclui_contato/'
//     let postData = $('form').serialize();
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             // TODO
//             limpaTabelaContatos();
//             adicionaContatoNaTabela(response);

//         },
//         error: function(xhr) {
//             console.log('Erro');
//         },
//         complete: function() {
//             // closeModal()
//         }
//     });
//     e.preventDefault();
// });

// function resetaForm() {
//     $('#salvaParceiro').val('Cadastrar');
//     $('#cnpjMdl').val('');
//     $('#razaoMdl').val('');
//     $('#fantasiaMdl').val('');
//     $('#insc_estMdl').val('');
//     $('#obsMdl').val('');
//     //Endereco
//     $('#idEnderecoMdl').val('');
//     $('#cepMdl').val('');
//     $('#ruaMdl').val('');
//     $('#numeroMdl').val('');
//     $('#bairroMdl').val('');
//     $('#complementoMdl').val('');
//     $('#cidadeMdl').val('');
//     $('#ufMdl').val('');
//     //Contatos
//     limpaTabelaContatos();
// }

// function limpaTabelaContatos() {
//     $('#tabela td').remove();
//     $('#contato').val('');
//     $('#nome').val('');
//     $('#contato').val('');
//     $('#cargo').val('');
// }

// function identificaRowBotaoAcionado() {
//     var tr = document.querySelectorAll('tr');
//     tr.forEach((e) => {
//         e.addEventListener('click', acaoNaRowSelecionada);
//     });

// }

// function acaoNaRowSelecionada(e) {
//     if (botaoQueFoiAcionado == 'excluiContato') {
//         excluiContato(e)
//     } else if (botaoQueFoiAcionado == 'alteraContato') {
//         alert('alterar Contato')
//     }
// }

// function identificaBotaoClicado(e) {
//     botaoQueFoiAcionado = e.currentTarget.id;
//     identificaRowBotaoAcionado(e)
// }

// $(document).ready(function() {
//     $('#corpoTabela').click(function(e) {
//         var botao = document.querySelectorAll('button');
//         botao.forEach((e) => {
//             e.addEventListener('click', identificaBotaoClicado);
//         });
//     });
// })

// function excluiContato(e) {
//     let idContato = e.currentTarget.id;
//     let textoMsg = "Deseja realmente apagar o contato selecionado ?"
//     if (confirm(textoMsg) == true) {
//         apagaContato(idContato)
//     }
// }

// function apagaContato(id) {
//     let url = '/exclui_contato/'
//     let postData = $('form').serialize();
//     postData += '&idContato=' + id;
//     $.ajax({
//         url: url,
//         type: 'POST',
//         data: postData,
//         success: function(response) {
//             alert('Contato deletado com sucesso !')
//             limpaTabelaContatos();
//             adicionaContatoNaTabela(response);
//         },
//         error: function(xhr) {
//             console.log('Erro');
//         },
//         complete: function() {
//             // closeModal()
//         }
//     });
// };

// function adicionaContatoNaTabela(response) {
//     const data = response.contato;
//     let template
//     for (let i = 0; i < data.length; i++) {
//         template = '<tr class="tr" id="' + data[i].id + '">' +
//             '<td>' + data[i].id + '</td>' +
//             '<td>' + data[i].nome + '</td>' +
//             '<td>' + data[i].cargo + '</td>' +
//             '<td>' + data[i].tipo + '</td>' +
//             '<td>' + data[i].fone_email_etc + '</td>' +
//             '<td>' + '<button type="button" id="alteraContato"  class="btn btn-success btn-rounded btn-icon">' +
//             '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
//             '<td>' + '<button type="button" id="excluiContato" class="btn btn-danger btn-rounded btn-icon">' +
//             '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
//             '</tr>'
//         $('#tabela tbody').append(template)
//     }
// };

// function formDesabilitaEdicao() {
//     editaContato = false;
//     $('#salvaParceiro').val('Cadastrar');
//     $("#btnContato").attr("disabled", true);
//     $("#btnComercial").attr("disabled", true);
// }

// function formHabilitaEdicao() {
//     $('#salvaParceiro').val('Editar');
//     $("#btnContato").attr("disabled", false);
//     $("#btnComercial").attr("disabled", false);
//     editaContato = true;
// }

// $('form').on('load', function(e) {
//     resetaForm();
//     formDesabilitaEdicao();
// });

// function populaColetaPeloRemetente() {
//     $('#cepColeta').val($('#cepRem').val());
//     $('#ruaColeta').val($('#ruaRem').val());
//     $('#numeroColeta').val($('#numeroRem').val());
//     $('#bairroColeta').val($('#bairroRem').val());
//     $('#complementoColeta').val($('#complementoRem').val());
//     $('#cidadeColeta').val($('#cidadeRem').val());
//     $('#ufColeta').val($('#ufRem').val());
// }

// /* $('#btnCnpjRem').on('click', function(e) {
//     quemChamouModal = 'cnpjRem'
//     $('#mdlCadParceiros').modal('show');
//     preencheModalClick('cnpjRem', 'inscRem', 'razaoRem',
//         'fantasiaRem', 'cepRem', 'ruaRem', 'numeroRem',
//         'complementoRem', 'bairroRem', 'cidadeRem', 'ufRem');
//     e.preventDefault();
// });*/

// $('#btnLimpaCnpjRem').on('click', function(e) {
//     alert(123654)
//     e.preventDefault();
// });

// $('#btnLimpaCnpjDest').on('click', function(e) {
//     limpaCnpj('cnpjDest', 'inscDest', 'razaoDest',
//         'fantasiaDest', 'cepDest', 'ruaDest', 'numeroDest',
//         'complementoDest', 'bairroDest', 'cidadeDest', 'ufDest');
//     e.preventDefault();
// });

// $('#btnLimpaCnpjRedesp').on('click', function(e) {
//     limpaCnpj('cnpjRedesp', 'inscRedesp', 'razaoRedesp',
//         'fantasiaRedesp', 'cepRedesp', 'ruaRedesp', 'numeroRedesp',
//         'complementoRedesp', 'bairroRedesp', 'cidadeRedesp', 'ufRedesp');
//     e.preventDefault();
// });

// $('#btnLimpaCnpjConsig').on('click', function(e) {
//     limpaCnpj('cnpjConsig', 'inscConsig', 'razaoConsig',
//         'fantasiaConsig', 'cepConsig', 'ruaConsig', 'numeroConsig',
//         'complementoConsig', 'bairroConsig', 'cidadeConsig', 'ufConsig');
//     e.preventDefault();
// });

// $('#btnCnpjDest').on('click', function(e) {
//     quemChamouModal = 'cnpjDest'
//     $('#mdlCadParceiros').modal('show');
//     preencheModalClick('cnpjDest', 'inscDest', 'razaoDest',
//         'fantasiaDest', 'cepDest', 'ruaDest', 'numeroDest',
//         'complementoDest', 'bairroDest', 'cidadeDest', 'ufDest');
//     e.preventDefault();
// });


// $('#mdlCadParceiros').on('hidden.bs.modal', function(e) {
//     resetaForm();
//     formDesabilitaEdicao();
// })

// $('#cnpjMdl').on('blur', function(e) {
//     quemChamouModal = 'cnpjMdl';
//     busca_parceiro($('#cnpjMdl').val(), 'insc_estMdl', 'razaoMdl',
//         'fantasiaMdl', 'cepMdl', 'ruaMdl', 'numeroMdl',
//         'complementoMdl', 'bairroMdl', 'cidadeMdl', 'ufMdl');
// });