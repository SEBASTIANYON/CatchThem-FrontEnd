import { CrearCamaraComponent } from './camara/crear-camara/crear-camara.component';
import { CamaraComponent } from './camara/camara.component';
import { CrearSospechosoComponent } from './sospechoso/crear-sospechoso/crear-sospechoso.component';
import { SospechosoComponent } from './sospechoso/sospechoso.component';
import { CrearEntidadComponent } from './entidad/crear-entidad/crear-entidad.component';
import { EntidadComponent } from './entidad/entidad.component';
import { ActasComponent } from './actas/actas.component';
import { CrearActasComponent } from './actas/crear-actas/crear-actas.component';
import { CrearAlertasComponent } from './alertas/crear-alertas/crear-alertas.component';
import { AlertasComponent } from './alertas/alertas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { RoleComponent } from './role/role.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {
    path: 'entidades', canActivate: [GuardService],
    component: EntidadComponent,
    children: [
      { path: 'nuevo', component: CrearEntidadComponent },
      { path: 'edicion/:id', component: CrearEntidadComponent },
    ]
  },
  {
    path: 'sospechosos', canActivate: [GuardService],
    component: SospechosoComponent,
    children: [
      { path: 'nuevo', component: CrearSospechosoComponent },
      { path: 'edicion/:id', component: CrearSospechosoComponent }
    ]
  },
  {
    path: 'camaras', canActivate: [GuardService],
    component: CamaraComponent,
    children: [
      { path: 'nuevo', component: CrearCamaraComponent },
      { path: 'edicion/:id', component: CrearCamaraComponent }
    ]
  },
  {
    path: 'alertas', canActivate: [GuardService],
    data: {role: ['POLICIA', 'AGENTE','ADMIN']},
    component: AlertasComponent,
    children: [
      { path: 'nuevo', component: CrearAlertasComponent, data: {role: ['POLICIA', 'AGENTE','ADMIN']},canActivate: [GuardService], },
      { path: 'edicion/:id', component: CrearAlertasComponent, data: {role: ['ADMIN']},canActivate: [GuardService], },
    ]
  },
  {
    path: 'actas', canActivate: [GuardService],
    data: {role: ['POLICIA', 'AGENTE','ADMIN']},
    component: ActasComponent,
    children: [
      { path: 'nuevo', component: CrearActasComponent, data: {role: ['ADMIN']},canActivate: [GuardService], },
      { path: 'edicion/:id', component: CrearActasComponent, data: {role: ['POLICIA', 'ADMIN']},canActivate: [GuardService],}
    ]
  },
  {
    path:'usuario',
    component:UsuarioComponent,
    children:[
      {path:'nuevo', component: CrearUsuarioComponent},
      {path:'edicion/:id', component: CrearUsuarioComponent}
    ]
  },

  {
    path:'role',
    component:RoleComponent,
  },
  {
    path:'reportes',
    component:ReportesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }