# Identifica campos enviados se estao vazios ou nao
# sendo identificacaoCampo e o nome vindo da requisição
# e nome campo e uma frase mais agradavel para retorno da requisição
from termcolor import colored


def checaCampos(request, **kwargs):
    camposVazios = []
    for identificacaoCampo, nomeCampo in kwargs.items():
        if request.POST.get(identificacaoCampo) == '':
            camposVazios.append(nomeCampo)
    return camposVazios


def checaCamposGeral(request, **kwargs):
    camposInvalidos = []
    for nomeCampo, value in kwargs.items():
        if testaCampos(request[nomeCampo][0], nomeCampo,regrasValidacao={nomeCampo: value}):
            camposInvalidos.append(nomeCampo)

    return camposInvalidos

def testaCampos(valor, nomeCampo, regrasValidacao):
        
    if 'tipoDado' in regrasValidacao[nomeCampo]:
        if regrasValidacao[nomeCampo]['tipoDado'][0] != type(valor):
            return True
        
    if not str(valor).isnumeric():
        if 'tamanhoMinimo' in regrasValidacao[nomeCampo]:
            if len(valor) < regrasValidacao[nomeCampo]['tamanhoMinimo'][0] :
                return True   
        if 'tamanhoMaximo' in regrasValidacao[nomeCampo]:
            if len(valor)> regrasValidacao[nomeCampo]['tamanhoMaximo'][0]:
                return True                  
        
    if 'obrigatorio' in regrasValidacao[nomeCampo]:   
        if regrasValidacao[nomeCampo]['obrigatorio'][0] == True:
            if valor == '':
                return True
            
    if 'negativo' in regrasValidacao[nomeCampo]: 
        if regrasValidacao[nomeCampo]['negativo'][0] == False:
            if valor < 0:
                return True 

    if 'zero' in regrasValidacao[nomeCampo]: 
        if regrasValidacao[nomeCampo]['zero'][0] == False:
            if valor == 0:
                return True                           
    # if valor == str:
    #     if 'tamanhoMinimo' in regrasValidacao[nomeCampo]:
    #         if regrasValidacao[nomeCampo]['tamanhoMinimo'][0] < len(valor):
    #             return False
    #     if 'tamanhoMaximo' in regrasValidacao[nomeCampo]:
    #         if regrasValidacao[nomeCampo]['tamanhoMaximo'][0] > len(valor):
    #             return False
    # if regrasValidacao[nomeCampo]['negativo']:
    #     if regrasValidacao[nomeCampo]['negativo'][0]:
    #         return False
    # if regrasValidacao[nomeCampo]['zero']:
    #     if regrasValidacao[nomeCampo]['zero'][0] < valor:
    #         return False


def verificaCamposObrigatorios(request):
    camposObrigatorios = []
    if request.POST.get('tipoTabela'):
        camposObrigatorios.append('Tipo da Tabela')
    if request.POST.get('freteMinimo'):
        camposObrigatorios.append('Frete mínimo')
    if request.POST.get('descTabela'):
        camposObrigatorios.append('Descrição da tabela')
    if request.POST.get('vlrFrete'):
        camposObrigatorios.append('Valor do Frete')
    if request.POST.get('tipoFrete'):
        camposObrigatorios.append('Tipo do frete')
    return camposObrigatorios


def toFloat(stringToFloat):
    if ',' in stringToFloat:
        stringToFloat = stringToFloat.replace(".", "")
        stringToFloat = stringToFloat.replace(",", ".")
        stringToFloat = float(stringToFloat)

    return stringToFloat


def checkBox(check):
    if check == 'on' or check == 1:
        return True
    else:
        return False


def checaUf(uf):
    listaUf = ['RO', 'AC', 'AM', 'RR', 'PA', 'AP', 'TO',
               'MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL',
               'SE', 'BA', 'MG', 'ES', 'RJ', 'SP', 'PR',
               'SC', 'RS', 'MS', 'MT', 'GO', 'DF']
    if uf in listaUf:
        return True
    else:
        return False


def dprint(*args):
    for i in args:
        print(colored('********************************************', 'red'))
        print(colored(i, 'cyan'))


def dpprint(titulo, *args):
    for i in args:
        print(colored('******************'+titulo+'*************', 'yellow'))
        print(colored(i, 'green'))
