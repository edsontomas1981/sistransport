from comercial.models.cotacao import Cotacao as ClsCotacao
from comercial.classes.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem
from comercial.classes.calculaFrete import somaSubtotais, calculaPedagio, calculaFretePeso
from comercial.classes.calculaFrete import aplicaIcms, geraPercentualAliquota, calculaFreteValor, calculaFreteVolume
from parceiros.models.parceiros import Parceiros
from Classes.utils import dpprint
from Classes.dtc import Dtc


class Cotacao:
    def __init__(self):
        self.cotacao = ClsCotacao()

    def createCotacao(self, dados):
        return self.criaOuAtualizaCotacao(dados)

    def criaOuAtualizaCotacao(self, dados):
        try:
            self.cotacao.dtc_fk = dados['dtc_fk'][0]
            self.cotacao.peso = dados['peso'][0]
            self.cotacao.qtde = dados['qtde'][0]
            self.cotacao.vlrNf = dados['vlrNf'][0]
            self.cotacao.m3 = dados['m3'][0]
            self.cotacao.pesoCalcular = 0
            self.cotacao.totalFrete = 0
            self.tabela = dados['tabela'][0]
            self.cotacao.save()
            return 200
        except:
            return 400

    def calculaFrete(self):
        if self.tabela.tipoCalculo == 1:
            self.calcularFretePeso()
        elif self.tabela.tipoCalculo == 2:
            self.calculaFreteValor()
        elif self.tabela.tipoCalculo == 3:
            self.calcularFreteVolume()

    # opcao 1
    def calculaFreteValor(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.cotacao.adValor = calculaAdvalor(
            self.tabela.adValor, self.cotacao.vlrNf)
        self.cotacao.gris = calculaGris(self.tabela.gris, self.cotacao.vlrNf)
        self.cotacao.fretePeso = calculaFreteValor(
            self.cotacao.vlrNf, self.tabela.frete)
        self.cotacao.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.subtotal = somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)

        self.cotacao.aliquotaIcms = geraPercentualAliquota(
            self.tabela.aliquotaIcms)

        if self.tabela.icmsIncluso == True:
            self.cotacao.totalFrete = aplicaIcms(
                self.cotacao.subtotal, self.cotacao.aliquotaIcms)
        else:
            self.cotacao.totalFrete = self.cotacao.subtotal

        if self.cotacao.totalFrete < self.tabela.freteMinimo:
            self.cotacao.totalFrete = self.tabela.freteMinimo    

    # opcao 2
    def calcularFretePeso(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.cotacao.adValor = calculaAdvalor(
            self.tabela.adValor, self.cotacao.vlrNf)
        self.cotacao.gris = calculaGris(self.tabela.gris, self.cotacao.vlrNf)
        self.cotacao.pesoCubado = calculaCubagem(
            self.cotacao.m3, self.tabela.fatorCubagem)
        self.cotacao.pesoCalcular = pesoACalcular(
            self.cotacao.peso, self.cotacao.pesoCubado)
        self.cotacao.fretePeso = calculaFretePeso(
            self.tabela.frete, self.cotacao.pesoCalcular)
        self.cotacao.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.aliquotaIcms = geraPercentualAliquota(
            self.tabela.aliquotaIcms)
        self.cotacao.subtotal = somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)
        if self.tabela.icmsIncluso == True:
            self.cotacao.totalFrete = aplicaIcms(
                self.cotacao.subtotal, self.cotacao.aliquotaIcms)
        else:
            self.cotacao.totalFrete = self.cotacao.subtotal
    
        if self.cotacao.totalFrete < self.tabela.freteMinimo:
            self.cotacao.totalFrete = self.tabela.freteMinimo    

    # opcao 2
    def calcularFreteVolume(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.cotacao.adValor = calculaAdvalor(
            self.tabela.adValor, self.cotacao.vlrNf)
        self.cotacao.gris = calculaGris(self.tabela.gris, self.cotacao.vlrNf)
        self.cotacao.fretePeso = calculaFreteVolume(
            self.cotacao.qtde, self.tabela.frete)
        self.cotacao.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.cotacao.pesoCalcular)
        self.cotacao.aliquotaIcms = geraPercentualAliquota(
            self.tabela.aliquotaIcms)
        self.cotacao.subtotal = somaSubtotais(self.cotacao.adValor, self.cotacao.gris,
                                              self.cotacao.fretePeso, self.cotacao.pedagio,
                                              self.cotacao.despacho, self.cotacao.outros)
        if self.tabela.icmsIncluso == True:
            self.cotacao.totalFrete = aplicaIcms(
                self.cotacao.subtotal, self.cotacao.aliquotaIcms)
        else:
            self.cotacao.totalFrete = self.cotacao.subtotal

        if self.cotacao.totalFrete < self.tabela.freteMinimo:
            self.cotacao.totalFrete = self.tabela.freteMinimo

    def adicionaDespacho(self):
        self.cotacao.despacho = self.tabela.despacho

    def adicionaOutros(self):
        self.cotacao.outros = self.tabela.outros

    def calculaPorValor(self):
        return 'valor'
