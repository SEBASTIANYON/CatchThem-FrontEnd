import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { CrearCamaraComponent } from './camara/crear-camara/crear-camara.component';
import { ListarCamaraComponent } from './camara/listar-camara/listar-camara.component';
import { CamaraComponent } from './camara/camara.component';
import { ListarSospechosoComponent } from './sospechoso/listar-sospechoso/listar-sospechoso.component';
import { CrearSospechosoComponent } from './sospechoso/crear-sospechoso/crear-sospechoso.component';
import { SospechosoComponent } from './sospechoso/sospechoso.component';
import { ListarEntidadComponent } from './entidad/listar-entidad/listar-entidad.component';
import { CrearEntidadComponent } from './entidad/crear-entidad/crear-entidad.component';
import { EntidadComponent } from './entidad/entidad.component';
import { HttpClientModule } from '@angular/common/http';
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
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { CrearAntecedenteComponent } from './antecedente/crear-antecedente/crear-antecedente.component';
import { ActasComponent } from './actas/actas.component';
import { CrearActasComponent } from './actas/crear-actas/crear-actas.component';
import { CrearAlertasComponent } from './alertas/crear-alertas/crear-alertas.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ListarActasComponent } from './actas/listar-actas/listar-actas.component';
import { ListarAlertasComponent } from './alertas/listar-alertas/listar-alertas.component';
import { ListarAntecedenteComponent } from './antecedente/listar-antecedente/listar-antecedente.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { DialogoConfirmacionComponent } from './dialog/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoMapaComponent } from './dialog/dialogo-mapa/dialogo-mapa.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { TipoEntidadComponent } from './tipo-entidad/tipo-entidad.component';
import { CrearTipoEntidadComponent } from './tipo-entidad/crear-tipo-entidad/crear-tipo-entidad.component';
import { ListarTipoEntidadComponent } from './tipo-entidad/listar-tipo-entidad/listar-tipo-entidad.component';
import { RoleComponent } from './role/role.component';
import { CrearRoleComponent } from './role/crear-role/crear-role.component';

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
    DialogComponent,
    DialogoConfirmacionComponent,
    DialogoMapaComponent,
    CrearUsuarioComponent,
    ListarUsuarioComponent,
    UsuarioComponent,
    TipoEntidadComponent,
    ListarTipoEntidadComponent,
    CrearTipoEntidadComponent,
    RoleComponent,
    CrearRoleComponent,
],
  imports: [
    CommonModule,
    HttpClientModule,
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
    MatCardModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ComponentsRoutingModule,
    MatDialogModule,
    GoogleMapsModule
  ],
})
export class ComponentsModule { }
