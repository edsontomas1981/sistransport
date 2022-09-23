# Generated by Django 4.0.6 on 2022-09-22 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('parceiros', '0001_initial'),
        ('operacional', '0011_coleta_horario'),
    ]

    operations = [
        migrations.CreateModel(
            name='TabelaFrete',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descricao', models.CharField(max_length=15)),
                ('icmsIncluso', models.BooleanField(default=True)),
                ('bloqueada', models.BooleanField(default=False)),
                ('frete', models.DecimalField(decimal_places=2, max_digits=9)),
                ('tipoCalculo', models.IntegerField()),
                ('adValor', models.DecimalField(decimal_places=2, max_digits=5)),
                ('gris', models.DecimalField(decimal_places=2, max_digits=5)),
                ('despacho', models.DecimalField(decimal_places=2, max_digits=5)),
                ('outros', models.DecimalField(decimal_places=2, max_digits=5)),
                ('pedagio', models.DecimalField(decimal_places=2, max_digits=5)),
                ('tipoPedagio', models.IntegerField()),
                ('cubagem', models.BooleanField(default=True)),
                ('fatorCubagem', models.IntegerField()),
                ('parceiro', models.ManyToManyField(blank=True, to='parceiros.parceiros')),
                ('rota', models.ManyToManyField(blank=True, to='operacional.rota')),
            ],
        ),
    ]
