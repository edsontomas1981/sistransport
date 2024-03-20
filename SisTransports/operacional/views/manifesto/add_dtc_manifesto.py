from parceiros.classes.parceiros import Parceiros
from Classes.utils import string_para_data
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json

from Classes.utils import string_para_data
from Classes.utils import toFloat

from operacional.classes.emissores import EmissorManager
from operacional.classes.rotas import Rota
from operacional.classes.manifesto import ManifestoManager

from django.db import IntegrityError

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def add_dtc_manifesto(request):
    required_fields = ['idDtc','idManifesto','ocorrencia_id']
    # dados = {'idDtc':192,'idManifesto':44,'ocorrencia_id':2}

    try:
        dados = json.loads(request.body)

        print(dados)
        # Verifica se todos os campos obrigatórios estão presentes
    #     if all(field in dados for field in required_fields):
    #         # Adicione aqui a lógica para adicionar o dtc_manifesto
    #         ManifestoManager.add_documento_manifesto(dados)
    #         return JsonResponse({'status': 'add dtc'})
    #     else:
        return JsonResponse({'error': 'Campos obrigatórios faltando'})
    # except IntegrityError:
    #     return JsonResponse({'error': 'Registro duplicado'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

    # data = json.loads(request.body.decode('utf-8'))


    # data['usuario_cadastro'] = request.user

    # for field in required_fields:
    #     if field not in data or data[field] == '':
    #         return JsonResponse({'status': 422, 'error': f'O campo {field} é obrigatório.'})

    # if data.get('idManifesto'):
    #     dados = prepare_data(data)
    #     dados['usuario_ultima_atualizacao']= request.user
    #     print(data['idManifesto'])
    #     manifesto = ManifestoManager.atualizar_manifesto(data.get('idManifesto'),**dados)
    #     return JsonResponse({'status': 201,'manifesto':manifesto.to_dict()})

    # else:
    #     dados = prepare_data(data)
    #     dados['usuario_cadastro']= request.user
    #     manifesto = ManifestoManager.criar_manifesto(dados)
        # return JsonResponse({'status': 200,'manifesto':manifesto.to_dict()})


def prepare_data(data):
    rota = Rota()
    rota.readRota(data.get('rotasManifesto'))
    emissor = EmissorManager.get_emissores_por_id(data.get('emissorMdfe'))
    
    return {
            'emissor_fk':EmissorManager.get_emissores_por_id(data.get('emissorMdfe')),
            'rota_fk':rota.rota,
            'data_previsão_inicio':string_para_data(data.get("dtInicioManif")),
            'data_previsão_chegada':string_para_data(data.get("dtPrevisaoChegada")),
            'frete_carreteiro':toFloat(data.get("freteCarreteiro")),
            'frete_adiantamento':toFloat(data.get("adiantamentoCarreteiro")),
            'lacres':data.get("lacresManifesto"),
            'averbacao':data.get("averbacaoManifesto"),
            'liberacao':data.get("liberacaoMotorista"),
            'observacao':data.get("txtObservacao"),
            }