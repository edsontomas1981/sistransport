const buscaNf = async (idDtc,chaveAcesso)=>{
    let data = {'idDtc':idDtc,'chave':chaveAcesso}
let conexao = new Conexao('/operacional/readNf/', data);
    try {
        const result = await conexao.sendPostRequest();
        return result
    } catch (error) {
        console.error(error); // Imprime a mensagem de erro
    }    
}