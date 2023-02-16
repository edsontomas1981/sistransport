$('#incluiContato').on('click', function(e){
    var contato = new Contato($('#cnpjMdl').val());
    contato.sendPostRequest('/contato/createContato/');
    populaContatos(contato.result.listaContatos)
    e.preventDefault();
})

var populaContatos=(listaContatos)=>{
  limpaTabelaContatos()
  if (listaContatos){
    const data = listaContatos;
    let template
    for (let i = 0; i < data.length; i++) {
        template = '<tr class="tr" id="' + data[i].id + '">' +
            '<td>' + data[i].id + '</td>' +
            '<td>' + data[i].nome + '</td>' +
            '<td>' + data[i].cargo + '</td>' +
            '<td>' + data[i].tipo + '</td>' +
            '<td>' + data[i].fone_email_etc + '</td>' +
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

    async sendPostRequest(url) {
      let postData = $('form').serialize();
      postData += '&cnpj_cpf=' + this.cnpj;
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

      console.log(result)

    }

    async deleteContato(idContato){
        let url = '/contato/deleteContato/';
        let postData = $('form').serialize();
        postData += '&idContato=' + idContato;
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
        console.table(result)
      }
  }