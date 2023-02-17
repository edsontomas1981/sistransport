$('#incluiContato').on('click', function(e){
  alert(123)
    if(contato.id){    
      alert('altera')
    }else{
    e.preventDefault();
    var contato = new Contato($('#cnpjMdl').val());
    contato.sendPostRequest('/contato/createContato/');
    contato.populaContatos();
    }
})

var populaContatos=(listaContatos)=>{
  limpaTabelaContatos()
  if (listaContatos){
    const data = listaContatos;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td>' + data[i].id + '</td>' +
            '<td id="nome">' + data[i].nome + '</td>' +
            '<td id="cargo">' + data[i].cargo + '</td>' +
            '<td id="tipo">' + data[i].tipo + '</td>' +
            '<td id="fone">' + data[i].fone_email_etc + '</td>' +
            '<td>' + '<button type="button" id="alteraContato"  class="btn btn-success btn-rounded btn-icon">' +
            '<i class="ti-pencil-alt2"></i></button>' + '</td>' +
            '<td>' + '<button type="button" id="excluiContato" class="btn btn-danger btn-rounded btn-icon">' +
            '<i class="ti-eraser "></i>' + '</button>' + '</td>' +
            '</tr>'
          $('#tabela tbody').append(template)
    }
  }
};

var limpaTabelaContatos=()=> {
    $('#tabela td').remove();
    $('#contato').val('');
    $('#nome').val('');
    $('#contato').val('');
    $('#cargo').val('');
}

class Contato {
    constructor(cnpj){
      this.cnpj=cnpj
    }

    async sendPostRequest(url,...idContato) {
      let postData = $('form').serialize();
      postData += '&cnpj_cpf=' + this.cnpj;
      if(idContato){
        postData += '&idContato=' + idContato;
      }
      const result = await $.ajax({
        url: url,
        beforeSend: function() {
          $('#loader').show();
        },
        type: 'POST',
        data: postData,
        dataType: 'json',
        complete: function() {
          $('#loader').hide();
        }
      }); 
      populaContatos(result.listaContatos)
    }
  }