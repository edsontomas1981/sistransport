from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from principal.views.cadParceiros import ViewCadPar
from principal import views as viewsPrincipal
from parceiros import views as viewParceiros
from operacional import views as viewsOperacional
from comercial import views as viewsComercial
urlpatterns = [
    path('',viewsPrincipal.home,
         name='home'),
    path('cadParceiros/',
        ViewCadPar.as_view(),name='cadParceiros'),
    path('salva_parceiro/',viewsPrincipal.salva_parceiro,
         name='salva_parceiro'),
    path('inclui_contato/',viewsPrincipal.incluiContato,
         name='incluiContato'),
    path('exclui_contato/',viewsPrincipal.excluiContato,
         name='exluiContato'),
    path('cad_contato/',viewsPrincipal.cad_contato,
         name='cad_contato'),
    path('busca_parceiro/',viewParceiros.busca_parceiro,
        name='busca_parceiro'),
    path('preDtc/',viewsOperacional.preDtc,
         name='preDtc'),
    path('preDtc/buscaDtc/',viewsOperacional.buscaDtc,
         name='buscaDtc'),           
    path('preDtc/saveDtc/',viewsOperacional.saveDtc,
         name='saveDtc'),
    path('preDtc/excluiDtc/',viewsOperacional.excluiDtc,
         name='excluiDtc'),   
    path('preDtc/saveColeta/',viewsOperacional.saveColeta,
         name='saveColeta'), 
    path('preDtc/deletaColeta/',viewsOperacional.deletaColeta,
         name='deletaColeta'), 
    path('comercial/',viewsComercial.readTabela,
         name='readTabela'),
    path('comercial/createTabela/',viewsComercial.createTabela,
         name='createTabela'),                        
]
urlpatterns += static(settings.STATIC_URL, 
                      document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, 
                      document_root=settings.MEDIA_ROOT)