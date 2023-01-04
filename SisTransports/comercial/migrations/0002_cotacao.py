# Generated by Django 4.0.6 on 2023-01-04 17:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('operacional', '0014_delete_municipios'),
        ('comercial', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cotacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('peso', models.IntegerField()),
                ('qtde', models.IntegerField()),
                ('vlrNf', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('m3', models.DecimalField(decimal_places=2, default=0.0, max_digits=7)),
                ('totalFrete', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('freteValor', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('adValor', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('gris', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('despacho', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('outros', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('pedagio', models.DecimalField(decimal_places=2, default=0.0, max_digits=5)),
                ('dtc_fk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='operacional.dtc')),
            ],
        ),
    ]
