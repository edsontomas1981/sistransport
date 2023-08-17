class Conexao {
    constructor(url,data){
        this.url=url
        this.data=data
    }

    getCSRFToken() {
        const cookieValue = document.cookie.match(/(^|;)csrftoken=([^;]*)/)[2];
        return cookieValue;
      }
    
      async sendPostRequest() {
        this.csrfToken=this.getCSRFToken()
        try {
          const response = await fetch(this.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": this.csrfToken,
            },
            body: JSON.stringify(this.data),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const result = await response.json();
          return result;
        } catch (error) {
          console.error(error);
          alert("Erro interno!");
        }
      }
}

function conectaBackEnd(dados, callback,...idComponente) {
    let url = dados.url
    let postData = $('form').serialize();
    postData +='&id='+dados.id;
    $.ajax({
        url: url,
        type: 'POST',
        data: postData,
        beforeSend: function() {
          $('#loader-parceiro').show();
        },
        success: function(response) {
            if (idComponente){
                callback(response,idComponente)
                return response
            }else{
                callback(response)
                return response
            }
        },
        complete: function() {
          $('#loader-parceiro').hide();
        },
        error: function(xhr) {
            console.log('Erro');
        }
    });
}

function capturaDadosNaRowClicada(row) {
  var data = $(row).find("td").map(function() {
      return $(this).text();
  }).get();

  return data

}


$(document).ready(function() {
  capturaDadosNaRowClicada()
});

var abaSemSalvar=(idAbas)=>{
    var conteudoAlterado = false;
  
    // Detectar alterações no conteúdo
    $(idAbas).on("input", function() {
      conteudoAlterado = true;
    });
  
    // Verificar alterações não salvas antes de mudar de aba
    $(".link-aba").on("click", function() {
      if (conteudoAlterado) {
        if (!confirm("Você tem alterações não salvas. Tem certeza de que deseja sair dessa página?")) {
          return false;
        }else{
            alert('Salvar o Conteudo')
        }
      }
    });
}

function validateDocumentNumber(documentNumber) {
  if (documentNumber.length === 11) {
    return validateCPF(documentNumber);
  } else if (documentNumber.length === 14) {
    return validateCNPJ(documentNumber);
  } else {
    return false;
  }
}

function validateCPF(cpf) {
  let sum = 0;
  let rest;

  if (
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false;
  }
  return true;
}

function validateCNPJ(cnpj) {
  let sum = 0;
  let rest;
  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  rest = sum % 11;
  if (rest === 0 || rest === 1) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }
  if (rest !== parseInt(digits.charAt(0))) {
    return false;
  }

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  rest = sum % 11;
  if (rest === 0 || rest === 1) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }
  if (rest !== parseInt(digits.charAt(1))) {
    return false;
  }
  return true;
}

const geraMensagemCamposFaltando=(campos)=>{
  let msgInicial = 'Os campos '
  let camposFaltando = ''
  for (let i = 0; i < campos.length; i++) {
    eOuVirgula = campos.length == i + 2 ? " e " :
        campos.length == i + 1 ? '' : ', ';
    camposFaltando += campos[i] + eOuVirgula
  }
 msgInicial += camposFaltando + ' precisam ser preenchidos.'
 return msgInicial
}

const formatarTelefone=(input)=> {
  const numeroLimpo = input.value.replace(/\D/g, '');
  const isCelular = numeroLimpo.length === 11; // 11 dígitos para números de celular

  let mascara;
  if (isCelular) {
    mascara = '(XX) XXXXX-XXXX';
  } else {
    mascara = '(XX) XXXX-XXXX';
  }

  let indice = 0;
  let telefoneFormatado = '';

  for (let i = 0; i < mascara.length; i++) {
    if (mascara[i] === 'X') {
      telefoneFormatado += numeroLimpo[indice] || '';
      indice++;
    } else {
      telefoneFormatado += mascara[i];
    }
  }
  input.value = telefoneFormatado;
}



// Controla o comportamento das tabs
let tabs = document.querySelectorAll('.nav-link');

// Adiciona um ouvinte de evento para cada guia
tabs.forEach(tab => {
  tab.addEventListener('click', async () => {
      // Obtém o ID do conteúdo da guia associado
      let tabContentId = tab.getAttribute('aria-controls');
      
      switch (tabContentId) {
          case 'pills-nf':
              limpaNf();
              break;
          case 'pills-calculoFrete':
              let nf = await loadNfs();
              if (nf.nfs.length !== 0) {
                // await limpaDivCalculo();
                populaTotaisNaTabelaNfCte();
                identificaTomadorCalculoCte()
              } else {
                  preDtcSemNf()
                  return;
              }
              break;
          default:
              break;
      }
  });
});


// Função para validar entrada como números inteiros
function validarNumeroInteiroInput(inputElement) {
  inputElement.addEventListener('keydown', function (event) {
    const key = event.key;
    // Permitir teclas especiais como backspace, delete, setas, home, end, etc.
    if (key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Tab' || key === 'Home' || key === 'End') {
      return;
    }
    // Verificar se a tecla é um número inteiro
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  });
}

$('#numPed').on('keydown', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Seu código aqui para lidar com a tecla Enter
    // Por exemplo, você pode chamar uma função ou executar um código específico.
    // Por exemplo, exibir um alert ou fazer uma busca.
  }
});
