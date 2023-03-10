from operacional.models.rota import Rota as MdlRota
from Classes.utils import verificaCamposObrigatorios,toFloat,checkBox,dprint,dpprint


class Rota:
    def __init__(self):
        self.rota=MdlRota()
    
    def salvaRota(self,nome,origemUF,origemCidade,destinoUF,destinoCidade):
        self.rota.nome=nome
        self.rota.origemCidade= origemCidade
        self.rota.origemUf=origemUF
        self.rota.destinoCidade=destinoCidade
        self.rota.destinoUf= destinoUF
        self.rota.save()
    
    def readRotas(self):
        rotas=[]
        self.rota=MdlRota.objects.all().order_by('nome')
        for i in self.rota:
            rotas.append(i.to_dict())    
        return rotas 
      
    def readRota(self,idRota):
        try:
            self.rota=MdlRota.objects.filter(id=idRota).get()
            return 200
        except MdlRota.DoesNotExist:
            return 400
        except MdlRota.MultipleObjectsReturned:
            return 300
        except ValueError:
            return 500
   
    def deleteRota(self,idRota):
        pass
    
                
        
    
        