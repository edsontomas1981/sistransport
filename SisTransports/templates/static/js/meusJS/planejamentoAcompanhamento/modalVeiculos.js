  var socket = new WebSocket('ws://127.0.0.1:8000/operacional/ws/some_url/');
  socket.onopen = function(event) {
      console.log('Conexão WebSocket aberta.');

      // Aguarda um curto período de tempo antes de enviar dados
      setTimeout(() => {
          socket.send(JSON.stringify({
              'message': 'Olá, servidor WebSocket!'
          }));
      }, 1000); // Delay de 1 segundo (1000 milissegundos)
  };

  socket.onmessage = function(event) {
      var data = JSON.parse(event.data);
      console.log('Mensagem recebida:', data.message);
  };

  socket.onclose = function(event) {
      console.log('Conexão WebSocket fechada.');
  };

  socket.onerror = function(error) {
      console.error('Erro na conexão WebSocket:', error);
  };

// Função para enviar mensagem ao servidor WebSocket
function sendMessage(message = 'get_active_users') {
    var usuario = 'teste';       // Substitua pelo identificador do seu usuário
    var destinatario = 'edson';  // Substitua pelo identificador do destinatário (quem receberá a mensagem)

    // Verificar se a variável 'socket' está definida e é uma instância válida de WebSocket
    if (socket.readyState === WebSocket.OPEN) {
        // Enviar mensagem ao servidor WebSocket
        socket.send(JSON.stringify({
            'message': message,
            'usuario': usuario,
            'destinatario': destinatario
        }));
    } else {
        console.error('Erro: Conexão WebSocket não está aberta.');
    }
}


const constroeModalVeiculosPlanejamento = (element) => {
  let containerTituloModalVeiculos = document.getElementById("modalVeiculoId");
  limpaContainers("modalVeiculoId");

  let titulo = document.createElement('h4');
  titulo.textContent = `Motorista: ${element.motorista}`;
  containerTituloModalVeiculos.appendChild(titulo);

  let subTitulo = document.createElement('h5');
  let placa = element.placa;
  subTitulo.id = 'subTitulo';
  subTitulo.dataset.id = placa;
  subTitulo.textContent = `Placa: ${placa}`;
  containerTituloModalVeiculos.appendChild(subTitulo);

  let botoes = {
      mostrar: {
          classe: "btn-success text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
          callback: sendMessage
      },
      excluir: {
          classe: "btn-danger text-white",
          texto: '<i class="fa fa-print" aria-hidden="true"></i>',
        //   callback: enviarMensagemWebSocket
      }
  };

  popula_tbody("tbodyDocumentos", element.dados, botoes, false);
  openModal('modalPlanejamentoVeiculos');
};
