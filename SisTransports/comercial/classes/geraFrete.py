from faturamento.components.calculaFrete import calculaAdvalor, calculaGris, pesoACalcular, calculaCubagem
from faturamento.components.calculaFrete import somaSubtotais, calculaPedagio, calculaFretePeso, freteFaixa
from faturamento.components.calculaFrete import aplicaIcms, geraPercentualAliquota, calculaFreteValor, calculaFreteVolume
from Classes.utils import dprint
from comercial.classes.tabelaFrete import TabelaFrete


class CalculaFrete:
    def __init__(self):
        self.tabela = TabelaFrete()

    def calculaFrete(self, dadosCalculo, tabela, **faixa):
        self.dadosTabela = tabela
        self.dadosCalculo(dadosCalculo)
        self.geraTabela()
        if faixa:
            self.calculaFreteFaixa(faixa['faixas'])
            if not self.totalFrete:
                self.tipoDeCalculo()
        else:
            self.tipoDeCalculo()
        return self.toDict()

    def calculaFreteFaixa(self, faixas):
        self.pesoCubado = calculaCubagem(
            self.m3, self.tabela.fatorCubagem)
        self.pesoCalcular = pesoACalcular(
            self.peso, self.pesoCubado)

        self.fretePeso = freteFaixa(faixas, int(self.pesoCalcular))
        if self.fretePeso:
            self.adicionaDespacho()
            self.adicionaOutros()
            self.aliquotaIcms = geraPercentualAliquota(
                self.tabela.aliquotaIcms)
            self.adValor = calculaAdvalor(
                self.tabela.advalor, self.vlrNf)
            self.gris = calculaGris(
                self.tabela.gris, self.vlrNf)
            self.pedagio = calculaPedagio(
                self.tabela.tipoPedagio, self.tabela.pedagio, self.pesoCalcular)
            self.subtotal = somaSubtotais(self.adValor, self.gris,
                                          self.fretePeso, self.pedagio,
                                          self.despacho, self.outros)

            self.aliquotaIcms = geraPercentualAliquota(
                self.tabela.aliquotaIcms)

            if self.tabela.icmsIncluso == True:
                self.totalFrete = aplicaIcms(
                    self.subtotal, self.aliquotaIcms)
            else:
                self.totalFrete = self.subtotal

            if float(self.totalFrete) < float(self.tabela.freteMinimo):
                self.totalFrete = self.tabela.freteMinimo

    # opcao 1
    def calculaFreteValor(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.pesoCubado = calculaCubagem(self.m3, self.tabela.fatorCubagem)
        self.pesoCalcular = pesoACalcular(self.peso, self.pesoCubado)
        self.adValor = calculaAdvalor(
            self.tabela.advalor, self.vlrNf)
        self.gris = calculaGris(self.tabela.gris, self.vlrNf)
        self.fretePeso = calculaFreteValor(
            self.vlrNf, self.tabela.vlrFrete)
        self.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.pesoCalcular)
        self.subtotal = somaSubtotais(self.adValor, self.gris,
                                      self.fretePeso, self.pedagio,
                                      self.despacho, self.outros)

        self.aliquotaIcms = geraPercentualAliquota(
            self.tabela.aliquotaIcms)

        if self.tabela.icmsIncluso == True:
            self.totalFrete = aplicaIcms(
                self.subtotal, self.aliquotaIcms)
        else:
            self.totalFrete = self.subtotal

        if self.totalFrete < self.tabela.freteMinimo:
            self.totalFrete = self.tabela.freteMinimo

    # opcao 2
    def calcularFretePeso(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.adValor = calculaAdvalor(self.tabela.advalor, self.vlrNf)
        self.gris = calculaGris(self.tabela.gris, self.vlrNf)
        self.pesoCubado = calculaCubagem(self.m3, self.tabela.fatorCubagem)
        self.pesoCalcular = pesoACalcular(self.peso, self.pesoCubado)
        self.fretePeso = calculaFretePeso(self.tabela.vlrFrete, self.pesoCalcular)
        self.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.pesoCalcular)
        self.aliquotaIcms = geraPercentualAliquota(self.tabela.aliquotaIcms)
        self.subtotal = somaSubtotais(self.adValor, self.gris, self.fretePeso, self.pedagio,
                                      self.despacho, self.outros)

        if self.tabela.icmsIncluso == True:
            self.totalFrete = aplicaIcms(self.subtotal, self.aliquotaIcms)
        else:
            self.totalFrete = self.subtotal
        if float(self.totalFrete) < float(self.tabela.freteMinimo):
            self.totalFrete = self.tabela.freteMinimo

    # opcao 2
    def calcularFreteVolume(self):
        self.adicionaDespacho()
        self.adicionaOutros()
        self.adValor = calculaAdvalor(
            self.tabela.advalor, self.vlrNf)
        self.gris = calculaGris(self.tabela.gris, self.vlrNf)
        self.fretePeso = calculaFreteVolume(
            self.qtde, self.tabela.vlrFrete)
        self.pedagio = calculaPedagio(
            self.tabela.tipoPedagio, self.tabela.pedagio, self.pesoCalcular)
        self.aliquotaIcms = geraPercentualAliquota(
            self.tabela.aliquotaIcms)
        self.subtotal = somaSubtotais(self.adValor, self.gris,
                                      self.fretePeso, self.pedagio,
                                      self.despacho, self.outros)
        if self.tabela.icmsIncluso == True:
            self.totalFrete = aplicaIcms(
                self.subtotal, self.aliquotaIcms)
        else:
            self.totalFrete = self.subtotal

        if self.totalFrete < self.tabela.freteMinimo:
            self.totalFrete = self.tabela.freteMinimo

    def adicionaDespacho(self):
        self.despacho = self.tabela.despacho

    def adicionaOutros(self):
        self.outros = self.tabela.outros

    def tipoDeCalculo(self):
        if self.tabela.tipoCalculo == 1:
            self.calcularFretePeso()
        elif self.tabela.tipoCalculo == 2:
            self.calculaFreteValor()
        elif self.tabela.tipoCalculo == 3:
            self.calcularFreteVolume()

    def geraTabela(self):
        

        self.tabela.freteMinimo = self.dadosTabela.freteMinimo
        self.tabela.fatorCubagem = self.dadosTabela.cubagem
        self.tabela.outros = self.dadosTabela.outros
        self.tabela.despacho = self.dadosTabela.despacho
        self.tabela.tipoFrete = self.dadosTabela.tipoFrete
        self.tabela.vlrFrete = self.dadosTabela.vlrFrete
        self.tabela.descricao = self.dadosTabela.descTabela
        self.tabela.icmsIncluso = self.dadosTabela.icms
        self.tabela.tabBloq = self.dadosTabela.tabBloq
        self.tabela.aliquotaIcms = self.dadosTabela.aliquotaIcms
        self.tabela.advalor = self.dadosTabela.advalor
        self.tabela.gris = self.dadosTabela.gris
        self.tabela.pedagio = self.dadosTabela.pedagio
        self.tabela.tipoPedagio = self.dadosTabela.tipoCobranPedagio
        self.tabela.cobraCubagem = self.dadosTabela.cobraCubagem
        self.tabela.tipoCalculo = self.dadosTabela.tipoCalculo

    def dadosCalculo(self, dados):
        self.peso = dados['peso']
        self.qtde = dados['qtde']
        self.vlrNf = dados['vlrNf']
        self.m3 = dados['m3']
        
    def toDict(self):
        return {
            'despacho': self.despacho,
            'outros': self.outros,
            'adValor': self.adValor,
            'gris': self.gris,
            'freteCalculado': self.fretePeso,
            'pedagio': self.pedagio,
            'subtotal': self.subtotal,
            'freteTotal': self.totalFrete
        }
