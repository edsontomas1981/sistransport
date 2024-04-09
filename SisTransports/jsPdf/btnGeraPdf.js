let btnGerarPdfRomaneio = document.getElementById("gerarPdfSemFrete");

const corTituloSemFrete = "#404040"; // Cor para os títulos
const corParSemFrete = "#CCCCCC"; // Cor para linhas pares
const corImparSemFrete = "#FFFFFF"; // Cor para linhas ímpares
const largurasColunasSemFrete = [70,70,70]; // Largura das colunas em ordem
const titulosTabelaSemFrete = ["Dtc", "Cte", "Remetente", "Destinatário",
                       "Destino","Nf's","Vols","Peso","Cubagem",
                        "Valor NF","Tipo Frete"];

btnGerarPdfRomaneio.addEventListener("click",()=>{
    geraPdfRomaneio();
})                        

const geraPdfRomaneio = async() => {
    const doc = new jsPDF();
    
    // URL da imagem que você deseja inserir
    let imageUrl = 'logo.png';

    const rectWidth = 30;
    const rectHeight = 25;


    // Dimensões do retângulo

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Calcular a escala para ajustar a imagem ao retângulo
    var scale = Math.min(rectWidth / imageUrl.width, rectHeight / imageUrl.height);

    const rectX = (pageWidth - rectWidth) / 2; // Centraliza horizontalmente
    const rectY = (pageHeight - rectHeight) / 2; // Centraliza verticalmente

    const rectRightX = pageWidth - rectWidth - 10; // Alinhado à direita, com uma margem de 10 unidades
    const rectLeftX = 10; // Alinhado à esquerda, com uma margem de 10 unidades

    const toBase64 = async(url)=> {
        let response = await fetch(url);
        let blob = await response.blob();
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });

        
    }

    const jsonDados = {
        numManifesto:125,
        motorista:"Edson Tomas da Silva",
        principalPlaca:"AWY1749",
        secundariaPlaca:"AWY1750",
        emissor:"Empresa de Teste Ltda",
        cnpj:"30.784.315/0008-41",
        inscrEmissor:"320799190",
        enderecoEmissor:"Rua Nova Veneza",
        numEmissor:"172",
        complementoEmissor:"Anexo 1",
        bairroEmissor:"Cumbica",
        cidadeEmissor:"Guarulhos",
        ufEmissor:"SP",
        foneEmissor:"(11)96926-2277"
    }

    let base64Image = await toBase64(imageUrl);

    // Calculando novas dimensões da imagem
    let newWidth = rectWidth;
    let newHeight = rectHeight;

    // Verifica se a largura da imagem é maior que a largura do retângulo
    if (newWidth > rectWidth) {
        newHeight = (newHeight * rectWidth) / newWidth;
        newWidth = rectWidth;
    }

    // Verifica se a altura da imagem é maior que a altura do retângulo
    if (newHeight > rectHeight) {
        newWidth = (newWidth * rectHeight) / newHeight;
        newHeight = rectHeight;
    }

    // Calcula a posição para centralizar a imagem no retângulo
    let x = (rectWidth - newWidth) / 2;
    let y = (rectHeight - newHeight) / 2;

    // Desenha o retângulo
    // doc.rect(5, 5, rectWidth, rectHeight);

    // Insira a imagem dentro do retângulo
    doc.addImage(base64Image, 'JPEG', 3 + x, 3 + y, newWidth, newHeight);

    

    doc.setFontSize(16)
    doc.text(`${jsonDados.emissor}`,40,5)
    doc.setFontSize(10)
    doc.text(`Cnpj ${jsonDados.cnpj} Inscrição Estadual ${jsonDados.inscrEmissor}`,40,10)

    if(jsonDados.complementoEmissor){
        doc.text(`${jsonDados.enderecoEmissor}, ${jsonDados.numEmissor} , ${jsonDados.complementoEmissor} , ${jsonDados.bairroEmissor}`,40,15)
    }else{
        doc.text(`${jsonDados.enderecoEmissor}, ${jsonDados.numEmissor} , ${jsonDados.bairroEmissor}`,40,15)
    }
    doc.text(`${jsonDados.cidadeEmissor}-${jsonDados.ufEmissor} | ${jsonDados.foneEmissor}`,40,20)

    // Função para calcular a largura do texto
    function getTextWidth(text, fontSize) {
        doc.setFontSize(fontSize);
        return doc.getTextWidth(text);
    }

    // Calcular a largura do texto
    let textWidth = getTextWidth(`Romaneio nº : ${jsonDados.numManifesto}`, 25);

    // Calcular a posição X para centralizar o texto
    let textX = (pageWidth - textWidth) / 2;

    doc.text(`Romaneio nº : ${jsonDados.numManifesto}`, textX, 32);

    textWidth = getTextWidth(`Motorista : ${jsonDados.motorista}`, 12);
    textX = (pageWidth - textWidth) - 10;
    doc.text(`Motorista : ${jsonDados.motorista}`, 5, 38);

    if(jsonDados.secundariaPlaca){
        textWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca} Carreta : ${jsonDados.secundariaPlaca}`, 12);
        textX = (pageWidth - textWidth) - 10;
        doc.text(`Placa : ${jsonDados.principalPlaca} Carreta : ${jsonDados.secundariaPlaca}`, textX, 38);
    }else{
        textWidth = getTextWidth(`Placa : ${jsonDados.principalPlaca}`, 12);
        textX = (pageWidth - textWidth) - 10;
        doc.text(`Placa : ${jsonDados.principalPlaca}`, textX, 38);
    }

    let xDados = 5
    let yDados = 50
    doc.setFontSize(9)
    dados.forEach(e => {
        const alturaNecessaria = 40; // Defina a altura necessária para os dados de cada item
        let alturaDocumento = doc.internal.pageSize.getHeight();

        if ((yDados+alturaNecessaria)>alturaDocumento) {
            doc.addPage();
            xDados = 5
            yDados = 15
        }

        doc.line(xDados-2, yDados-7, 202, yDados-7);
        doc.text(`DTC Nº ${e.dtcNum}`,xDados,yDados)
        yDados += 5
        doc.text(`Tomador : ${e.tomador}       Fone : ${e.fone}`,xDados,yDados)
        yDados += 5
        if(e.complemento){
            doc.text(`Endereço : ${e.logradouro}, ${e.numLogradouro} , - ${e.complemento} - ${e.bairro} `,xDados,yDados)
        }else{
            doc.text(`Endereço : ${e.logradouro}, ${e.numLogradouro}  - ${e.bairro} `,xDados,yDados)
        }
        yDados += 5
        doc.text(`Nf's : ${e.notasFiscais} | Volumes : ${e.volume} |  Peso : ${e.peso}`,xDados,yDados)

        yDados += 5
        doc.text(`Horário de chegada : ______:______ | Horário de saída : ______:______`,xDados,yDados);
        
        doc.rect(rectRightX-10, yDados-25, rectWidth+12, rectHeight+5);
        doc.text(`Carimbo ou Assinatura`,rectRightX-5,yDados-20);

        // Adicionando o texto sobre o recibo referente ao adiantamento
        const mascaraData = "______/______/________";
        
        doc.text(mascaraData, rectRightX-7, yDados);
        
        yDados += 15;
    
        });


        // Gerar Blob a partir do PDF
        const pdfBlob = doc.output("bloburl");

        // Abrir o PDF em outra aba
        window.open(pdfBlob, "_blank");

};



let dados = [
    {
        dtcNum:1,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
        fone:"(11)96926-2277",numLogradouro:172,
        complemento:"Anexo 1",
        bairro:"Cid Indl Satélite de Sao Paulo",
        cidade:"Guarulhos",
        uf:"SP",
        notasFiscais:"10/20/30",
        volume:10,
        peso:120,
    },
 {
    dtcNum:2,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },
  {
    dtcNum:3,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },
  {
    dtcNum:4,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
  },    
  {
    dtcNum:5,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:6,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:7,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
    dtcNum:8,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},      

{
    dtcNum:9,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
{
dtcNum:10,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:11,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},
{
dtcNum:12,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
fone:"(11)96926-2277",numLogradouro:172,
complemento:"Anexo 1",
bairro:"Cid Indl Satélite de Sao Paulo",
cidade:"Guarulhos",
uf:"SP",
notasFiscais:"10/20/30",
volume:10,
peso:120,
},      

{
    dtcNum:13,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
    fone:"(11)96926-2277",numLogradouro:172,
    complemento:"Anexo 1",
    bairro:"Cid Indl Satélite de Sao Paulo",
    cidade:"Guarulhos",
    uf:"SP",
    notasFiscais:"10/20/30",
    volume:10,
    peso:120,
},
// {
// dtcNum:14,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },
// {
// dtcNum:15,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },
// {
// dtcNum:16,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },      

// {
//     dtcNum:17,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
//     fone:"(11)96926-2277",numLogradouro:172,
//     complemento:"Anexo 1",
//     bairro:"Cid Indl Satélite de Sao Paulo",
//     cidade:"Guarulhos",
//     uf:"SP",
//     notasFiscais:"10/20/30",
//     volume:10,
//     peso:120,
// },
// {
// dtcNum:18,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },
// {
// dtcNum:19,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },
// {
// dtcNum:20,tomador:"Serafim Transportes de Cargas Ltda",logradouro:"Rua Nova Veneza",
// fone:"(11)96926-2277",numLogradouro:172,
// complemento:"Anexo 1",
// bairro:"Cid Indl Satélite de Sao Paulo",
// cidade:"Guarulhos",
// uf:"SP",
// notasFiscais:"10/20/30",
// volume:10,
// peso:120,
// },      


]
