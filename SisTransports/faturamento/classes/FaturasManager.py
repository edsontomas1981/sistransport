from django.utils import timezone
from django.db.models import Q
from operacional.models.dtc import Dtc
from faturamento.models.faturas import Faturas
from operacional.classes.cte import Cte
from django.db import transaction
from Classes.utils import dprint


class FaturasManager:
    def __init__(self):
        self.obj_fatura = Faturas()

    def save_or_update(self, dados):
        self.obj_fatura.emissor_fk = dados.get('emissor_id', None)
        self.obj_fatura.sacado_fk = dados.get('sacado_id', None)
        self.obj_fatura.data_emissao = dados.get('data_emissao', None)
        self.obj_fatura.vencimento = dados.get('vencimento', None)
        self.obj_fatura.valor_total = dados.get('valor_total', 0.0)
        self.obj_fatura.valor_a_pagar = dados.get('valor_a_pagar', 0.0)
        self.obj_fatura.desconto = dados.get('desconto', 0.0)
        self.obj_fatura.data_pagamento = dados.get('data_pagamento', None)

    def create_fatura(self, dados):
        try:
            self.save_or_update(dados)
            self.obj_fatura.save()
            return 200
        except Exception as e:
            print(f"Erro ao criar fatura: {e}")
            return 300

    def update_fatura(self, id_fatura, dados):
        try:
            if not Faturas.objects.filter(id=id_fatura).exists():
                raise ValueError(f"A fatura com o ID {id_fatura} não foi encontrada.")
            self.obj_fatura = Faturas.objects.get(id=id_fatura)
            self.save_or_update(dados)
            self.obj_fatura.save()
            return 200
        except Exception as e:
            print(f"Erro ao atualizar fatura: {e}")
            return 300

    def delete_fatura(self, id_fatura):
        try:
            if Faturas.objects.filter(id=id_fatura).exists():
                self.obj_fatura = Faturas.objects.get(id=id_fatura)
                self.obj_fatura.delete()
                return 200
            else:
                return 404  # Fatura não encontrada
        except Exception as e:
            print(f"Erro ao excluir fatura: {e}")
            return 500

    def read_fatura(self, id_fatura):
        try:
            if not Faturas.objects.filter(id=id_fatura).exists():
                raise ValueError(f"A fatura com o ID {id_fatura} não foi encontrada.")
            self.obj_fatura = Faturas.objects.get(id=id_fatura)
            return self.obj_fatura.to_dict()
        except Exception as e:
            print(f"Erro ao ler fatura: {e}")
            return None

    def read_faturas(self):
        try:
            faturas = Faturas.objects.all()
            return [fatura.to_dict() for fatura in faturas]
        except Exception as e:
            print(f"Erro ao ler faturas: {e}")
            return []

    @staticmethod
    @transaction.atomic
    def selecionar_dtc_com_cte_sem_fatura():
        try:
            dtcs = Dtc.objects.filter(
                Q(frete_dtc__isnull=False) & Q(frete_dtc__faturas_fk__isnull=True)
            ).distinct()

            # Agrupa os DTCs por tomador
            dtcs_por_tomador = {}
            for dtc in dtcs:
                tomador = dtc.tomador_fk.cnpj_cpf
                id_dtc = dtc.id
                cte = Cte.obtem_cte_by_dtc(id_dtc)
                if tomador not in dtcs_por_tomador:
                    dtcs_por_tomador[tomador] = []
                dtcs_por_tomador[tomador].append(cte.to_dict())

            faturas_criadas = []

            for pre_fatura in dtcs_por_tomador:
                cte = dtcs_por_tomador.get(pre_fatura)
                dprint(cte[0].get('dtc_fk').get('tomador'))
                valor_total = 0.00
                qtde_cte = 0
                for dtc in dtcs_por_tomador.get(pre_fatura):
                    valor_total += float(dtc.get('totalFrete'))
                    qtde_cte += 1
                faturas_criadas.append({cte[0].get('dtc_fk').get('tomador').get('raz_soc'):valor_total,'qtde_cte':qtde_cte})

            for fatura in faturas_criadas:
                dprint(fatura)

            # Cria as faturas e associa os CTEs
            # for tomador, dtcs_lista in dtcs_por_tomador.items():
            #     dprint(tomador,dtcs_lista)
            #     # Cria uma nova fatura para o tomador
            #     dados_fatura = {
            #         'emissor_id': dtcs_lista[0].remetente_fk.id,
            #         'sacado_id': tomador.id,
            #         'data_emissao': timezone.now().date(),
            #         'vencimento': timezone.now().date() + timezone.timedelta(days=30),
            #         'valor_total': sum(dtc.frete_dtc.total_frete for dtc in dtcs_lista),
            #         'valor_a_pagar': sum(dtc.frete_dtc.total_frete for dtc in dtcs_lista),
            #         'desconto': 0.00,
            #         'data_pagamento': None,
            #     }
                # fatura = FaturasManager().create_fatura(dados_fatura)
                # faturas_criadas.append(fatura)

                # # Associa os CTEs da lista de DTCs à nova fatura
                # for dtc in dtcs_lista:
                #     cte = Cte.objects.get(dtc_fk=dtc)
                #     cte.faturas_fk = fatura
                #     cte.save()

            # return faturas_criadas

            return dtcs_por_tomador

        except Exception as e:
            print(f"Erro ao selecionar DTCs com CTEs sem fatura: {e}")
            return None
