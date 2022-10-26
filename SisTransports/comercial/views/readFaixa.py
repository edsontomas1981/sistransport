from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from comercial.classes.tabelaFrete import TabelaFrete 
from comercial.classes.tblFaixa import TabelaFaixa


@login_required(login_url='/auth/entrar/')
def readFaixa (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        faixa=TabelaFaixa()
        faixa.readFaixa(request.POST.get('idFaixa'))
        return JsonResponse({'status': 200,'faixa':faixa.toDict()}) 