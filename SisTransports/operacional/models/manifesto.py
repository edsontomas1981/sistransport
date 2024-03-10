from django.db import models
from django.conf import settings
from django.utils import timezone

from operacional.models.emissor import Emissor
from operacional.models.rota import Rota
from operacional.models.motoristas import Motorista
from operacional.models.veiculos import Veiculo
from operacional.models.ocorrencias_manifesto import Ocorrencia_manifesto
from operacional.models.tipo_documento import Tipo_Documento
from operacional.models.dtc import Dtc

class Manifesto(models.Model):
    emissor_fk = models.ForeignKey(Emissor, on_delete=models.CASCADE)
    data_previsão_inicio = models.DateTimeField(null=True)
    data_previsão_chegada = models.DateTimeField(null=True)
    rota_fk =  models.ForeignKey(Rota, on_delete=models.CASCADE)
    frete_carreteiro = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    frete_adiantamento = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    lacres = models.CharField(max_length=100, null=True)
    averbacao = models.CharField(max_length=20, null=True)
    liberacao = models.CharField(max_length=20, null=True)
    motoristas = models.ManyToManyField(Motorista)
    veiculos = models.ManyToManyField(Veiculo)
    observacao = models.TextField(null=True)
    dtc = models.ManyToManyField(Dtc, through='DtcManifesto')
    
    usuario_cadastro = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='criador_manifesto'
    )
    usuario_ultima_atualizacao = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='atualizador_manifesto'
    )
    data_cadastro = models.DateTimeField(null=True)
    data_ultima_atualizacao = models.DateTimeField(default=timezone.now)  

    def to_dict(self):
        emissor_data = self.emissor_fk.to_dict() if self.emissor_fk else None
        motoristas_data = [motorista.to_dict() for motorista in self.motoristas.all()]
        veiculos_data = [veiculo.to_dict() for veiculo in self.veiculos.all()]
        dtc_data = [dtc.to_dict() for dtc in self.dtc.all()]
        return {
            'id': self.id,
            'emissor_fk': emissor_data,
            'data_previsão_inicio': self.data_previsão_inicio.isoformat() if self.data_previsão_inicio else None,
            'data_previsão_chegada': self.data_previsão_chegada.isoformat() if self.data_previsão_chegada else None,
            'rota_fk': self.rota_fk.to_dict(),
            'frete_carreteiro': self.frete_carreteiro,
            'frete_adiantamento': self.frete_adiantamento,
            'lacres': self.lacres,
            'averbacao': self.averbacao,
            'liberacao': self.liberacao,
            'motoristas': motoristas_data,
            'veiculos': veiculos_data,
            'observacao': self.observacao,
            'usuario_cadastro': self.usuario_cadastro.id if self.usuario_cadastro else None,
            'usuario_ultima_atualizacao': self.usuario_ultima_atualizacao.id if self.usuario_ultima_atualizacao else None,
            'data_cadastro': self.data_cadastro.isoformat() if self.data_cadastro else None,
            'data_ultima_atualizacao': self.data_ultima_atualizacao.isoformat(),
            'dtc': dtc_data
        }

class DtcManifesto(models.Model):
    manifesto = models.ForeignKey(Manifesto, on_delete=models.CASCADE)
    dtc_fk = models.ForeignKey(Dtc, on_delete=models.CASCADE)
    # Adicione os campos extras que você deseja
    tipo_manifesto = models.ForeignKey(Ocorrencia_manifesto, on_delete=models.CASCADE)
