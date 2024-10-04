from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ValidationError
from parceiros.classes.parceiros import Parceiros
import json

@login_required(login_url='/auth/entrar/')
@require_http_methods(["POST","GET"])
def busca_parceiro_trecho(request):
    try:
        data = json.loads(request.body.decode('utf-8'))
        parceiros = Parceiros.search_by_cnpj_or_razao_social(data.get('termoBusca'))
        return JsonResponse({'status': 200,'parceiros':parceiros})
    except ValidationError as ve:
        return JsonResponse({'status': 400, 'error': f'Erro de validação: {str(ve)}'})
    except Exception as e:
        return JsonResponse({'status': 500, 'error': f'Erro desconhecido: {str(e)}'})