from comercial.models.tabelaFrete import TabelaFrete as TblFrete
from comercial.models.tabelaFaixa import TabelaFaixa as Faixa
from Classes.utils import toFloat



class TabelaFaixa:
    def __init__(self):
        self.faixa=None
    
    def __str__ (self):
        return self.faixa.toDict()

    def verificaFaixa(self,idFaixa,idTabela):
        valorFaixa=idFaixa['valor']
        faixas=self.readFaixas(idTabela)
        if faixas:
            for i in faixas:
                if int(valorFaixa) in range (i.faixaInicial,i.faixaFinal+1) :
                    return True,idFaixa['chave'],i
        return False,None,None

    def createFaixa(self,tblVinculada,inicial,final,vlrFaixa):
        faixaInicial = {'valor':inicial,'chave':'Inicial'}
        faixaFinal = {'valor':final,'chave':'Final'}
        self.faixa=Faixa() 
        self.faixa.tblVinculada=tblVinculada
        checaInicial,campo,faixa=self.verificaFaixa(faixaInicial,tblVinculada.id)
        if not checaInicial:
            checaFinal,campo,faixa=self.verificaFaixa(faixaFinal,tblVinculada.id)
        if checaInicial or checaFinal:
            return 400,campo,faixa #Faixa ja coberta 
        else:
            self.faixa.faixaInicial= inicial
            self.faixa.faixaFinal=final
            self.faixa.vlrFaixa=toFloat(vlrFaixa)
            self.faixa.save()
            return 200,None,None

    # seleciona todas as faixas referentes a tabela 
    def readFaixas(self,idTabela):
        if Faixa.objects.filter(tblVinculada=idTabela).exists():
           faixas=Faixa.objects.filter(tblVinculada=idTabela).order_by('faixaInicial')
           return faixas 

        
    def readFaixa(self,idFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
           self.faixa=Faixa.objects.filter(id=idFaixa).get()
           return self.faixa 



    def updateFaixa(self,idFaixa,tblVinvulada,inicial,final,vlrFaixa):
        if Faixa.objects.filter(id=idFaixa).exists():
            self.faixa=Faixa.objects.filter(id=idFaixa).get()
            self.faixa.tblVinculada=tblVinvulada
            if not self.verificaFaixa(inicial) or not self.verificaFaixa(inicial):
                self.faixa.faixaInicial= inicial
                self.faixa.faixaFinal=final
                self.faixa.vlrFaixa=toFloat(vlrFaixa)
                self.faixa.save()
                return 200
            else:
                return 400 #Faixa ja coberta
        else:
            return 410 #Tabela nao
        
    def deleteFaixa(self,idFaixa):
        pass        
    
    def deleteFaixa(self,idFaixa):
        pass
    
    def toDict(self):
        return self.faixa.toDict()
    