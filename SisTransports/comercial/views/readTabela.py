from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.tabelaFrete import TabelaFrete

@login_required(login_url='/auth/entrar/')
def readTabela (request):
    if request.method == 'GET':
        return render(request, 'tabelaFrete.html')
    elif request.method == "POST" :
        tabelaFrete=TabelaFrete.readTabela(16)
        print(tabelaFrete.descricao)  
        return JsonResponse({'status':200})
