from django.contrib import admin
from operacional.models.emissor import Emissor
from operacional.models.marca_veiculos import Marca
from operacional.models.tipo_carroceria import Tipo_Carroceria
from operacional.models.tipo_combustivel import Tipo_Combustivel
from operacional.models.tipo_veiculo import  Tipo_Veiculo


admin.site.register(Emissor)
admin.site.register(Marca)
admin.site.register(Tipo_Carroceria)
admin.site.register(Tipo_Combustivel)
admin.site.register(Tipo_Veiculo)


# class ModelosJSON(View):
#     def get(self, request):
#         data = {
#             'marcas': list(Marca.objects.values()),
#             'tipos_carroceria': list(Tipo_Carroceria.objects.values()),
#             'tipos_combustivel': list(Tipo_Combustivel.objects.values()),
#             'tipos_veiculo': list(Tipo_Veiculo.objects.values()),
#         }
#         return JsonResponse(data)








