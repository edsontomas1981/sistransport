from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from Classes.dtc import Dtc 
from Classes.utils import dprint,dpprint
from operacional.classes.coleta import Coleta

@login_required(login_url='/auth/entrar/')
def buscaDtc (request):
    if request.method == 'GET':
        return render(request, 'preDtc.html')
    elif request.method == "POST" :
        dtc=Dtc()
        dtc.readDtc(request.POST.get('numPed'))
        return JsonResponse({
                    'status': 200,
                    'dtc': dtc.to_dict() if dtc is not None else None,
                    'coleta': dtc.dtc.coleta_fk.to_dict() if dtc is not None and dtc.dtc.coleta_fk is not None else None
                })
        