from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from Classes.parceiros import Parceiros
from Classes.utils import dprint 
from comercial.classes.cotacao import Cotacao
import json
from faturamento.components.obj_calcula_frete import FreightCalculator

@login_required(login_url='/auth/entrar/')
def calcula_frete (request):
    if request.method == 'GET':
        return JsonResponse({'status': 200}) 
    elif request.method == "POST" :
        data = json.loads(request.body.decode('utf-8'))
        calcula_frete = FreightCalculator(data)
        calcula_frete.calcula_frete()
        return JsonResponse({'status':'post'}) 

    