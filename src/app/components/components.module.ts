import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EntidadComponent } from './entidad/entidad.component';
import { CrearEntidadComponent } from './entidad/crear-entidad/crear-entidad.component';
import { ListarEntidadComponent } from './entidad/listar-entidad/listar-entidad.component';
import { SospechosoComponent } from './sospechoso/sospechoso.component';
import { CrearSospechosoComponent } from './sospechoso/crear-sospechoso/crear-sospechoso.component';
import { CrearCamaraComponent } from './camara/crear-camara/crear-camara.component';
import { ListarSospechosoComponent } from './sospechoso/listar-sospechoso/listar-sospechoso.component';
import { CamaraComponent } from './camara/camara.component';
import { ListarCamaraComponent } from './camara/listar-camara/listar-camara.component';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { CrearAntecedenteComponent } from './antecedente/crear-antecedente/crear-antecedente.component';
import { ActasComponent } from './actas/actas.component';
import { CrearActasComponent } from './actas/crear-actas/crear-actas.component';
import { CrearAlertasComponent } from './alertas/crear-alertas/crear-alertas.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ListarActasComponent } from './actas/listar-actas/listar-actas.component';
import { ListarAlertasComponent } from './alertas/listar-alertas/listar-alertas.component';
import { MatCardModule } from '@angular/material/card';
import { ListarAntecedenteComponent } from './antecedente/listar-antecedente/listar-antecedente.component';

@NgModule({
  declarations: [
    EntidadComponent,
    CrearEntidadComponent,
    ListarEntidadComponent,
    SospechosoComponent,
    CrearSospechosoComponent,
    ListarSospechosoComponent,
    CamaraComponent,
    ListarCamaraComponent,
    CrearCamaraComponent,
    AntecedenteComponent,
    CrearAntecedenteComponent,
    ActasComponent,
    CrearActasComponent,
    CrearAlertasComponent,
    AlertasComponent,
    ListarActasComponent,
    ListarAlertasComponent,
    ListarAntecedenteComponent

  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    NgFor,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
})
export class ComponentsModule {}
