let btnAddDocumento = document.getElementById('btnAddDocumento')
let listaDocumentos = []

const removerDocumentoPorId=async(id,tipo_documento)=> {
    let idManifesto = document.getElementById('spanNumManifesto')
    const apiService = new ApiService();
    const url = "/operacional/get_dtc_id/";
    const dados = {id_dtc:id};
    const resposta = await apiService.postData(url, dados);

    if(tipo_documento == 'Coleta'){
        console.log(resposta.dadosDtc.id)
        let coleta = new NovaColeta();
        coleta.update_status_coleta(resposta.dadosDtc.coleta.id,1)
    }

    if(tipo_documento == 'Entrega'){
        console.log(resposta.dadosDtc)
        let cte = new Cte();
        cte.update_status_cte(resposta.dadosDtc.cte.id,1)
    }

    let response  = await connEndpoint('/operacional/delete_dtc_manifesto/', {'idDtc':id,'idManifesto':idManifesto.textContent});
    
    if(response.status == 200)  
    {
        populaTbodyDocumentos(response.documentos)
        populaQtdeDocumentosBarraManifesto(response.documentos.length)
    }else{
        msgErro("Não foi possível excluir o registro.")
    }
}

let botoesManifesto={
    salvar: { 
      classe: "btn-success text-white rounded",
      texto:  '<i class="fa fa-check" aria-hidden="true"></i>',
      // callback: removerDocumentoPorId
    },
    excluir: { 
        classe: "btn-danger text-white rounded",
        texto: '<i class="fa fa-trash" aria-hidden="true"></i>',
        callback: removerDocumentoPorId
      },
  };

  btnAddDocumento.addEventListener('click', async () => {

    let numDcto = document.getElementById('numeroDocumento')
    let idManifesto = document.getElementById('spanNumManifesto')
    let idTipoDocumento = document.getElementById('cmbTipoDocumento').value
    let cmbTipoManifesto = document.getElementById('cmbTipoManifesto').value

        
    if (numDcto.value.trim() == '') {
        msgAviso("Por favor, informe um número de documento.");
        return;
    }
    
    if (document.getElementById('cmbTipoManifesto').value == '') {
        msgAviso("Por favor, selecione um tipo de manifesto.");
        return;
    }
    
    if (document.getElementById('cmbTipoDocumento').value == '') {
        msgAviso("Por favor, selecione o tipo de documento.");
        return;
    }

    let response = await connEndpoint('/operacional/add_dtc_manifesto/', {'idTipoDocumento': idTipoDocumento,
                                                                        'idDcto': numDcto.value,
                                                                        'idManifesto':idManifesto.textContent,
                                                                        'cmbTipoManifesto':cmbTipoManifesto});

    if (response.status == 400 ) {
        msgErro(response.error)
    }

    if (parseInt(response.status) != 422){
        populaTbodyDocumentos(response.documentos)
        populaQtdeDocumentosBarraManifesto(response.documentos.length)
        document.getElementById('numeroDocumento').value = ""
        document.getElementById('numeroDocumento').focus()
    }else{
        msgErro('Não foi possível encontrar o documento. Verifique se os dados estão corretos e tente novamente.')
    }
});



const getDocumento = async()=>{
    let response
    switch (document.getElementById('cmbTipoDocumento').value) {
        case '1':
            response = await connEndpoint('/operacional/get_cte_id/', {'idCte': numDcto.value});
            return response

        case '2':
            response = await connEndpoint('/operacional/get_cte_chave_nfe/', {'chaveNfe': numDcto.value});
            return response

        case '3':
            response = await connEndpoint('/operacional/get_cte_dtc/', {'idDtc': numDcto.value});
            return response

        default:
            break;
    }
}












