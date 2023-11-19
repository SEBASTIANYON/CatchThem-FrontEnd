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
import { Reporte1Component } from './reportes/reporte1/reporte1.component';
import { TipoEntidadComponent } from './tipo-entidad/tipo-entidad.component';
import { CrearTipoEntidadComponent } from './tipo-entidad/crear-tipo-entidad/crear-tipo-entidad.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { RoleComponent } from './role/role.component';
import { ReportesComponent } from './reportes/reportes.component';
import { Reporte5Component } from './reportes/reporte5/reporte5.component';
import { AntecedenteComponent } from './antecedente/antecedente.component';
import { CrearAntecedenteComponent } from './antecedente/crear-antecedente/crear-antecedente.component';
import { Reporte2Component } from './reportes/reporte2/reporte2.component';
import { ListarCamaraComponent } from './camara/listar-camara/listar-camara.component';
import { Reporte3Component } from './reportes/reporte3/reporte3.component';
import { Reporte4Component } from './reportes/reporte4/reporte4.component';
import { GuardService } from '../services/guards.service';

const routes: Routes = [
  {
    path: 'entidades', canActivate: [GuardService],
    data: {role: ['POLICIA', 'AGENTE','ADMIN']},
    component: EntidadComponent,
    children: [
      { path: 'nuevo', component: CrearEntidadComponent },
      { path: 'edicion/:id', component: CrearEntidadComponent },
    ]
  },
  {
    path: 'sospechosos', canActivate: [GuardService],
    data: {role: ['POLICIA', 'AGENTE','ADMIN']},
    component: SospechosoComponent,
    children: [
      { path: 'nuevo', component: CrearSospechosoComponent, data: {role: ['POLICIA', 'AGENTE','ADMIN']},canActivate: [GuardService],  },
      { path: 'edicion/:id', component: CrearSospechosoComponent, data: {role: ['POLICIA', 'AGENTE','ADMIN']},canActivate: [GuardService] }
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
    path: 'tipoentidad', canActivate: [GuardService],
    data: {role: ['POLICIA', 'AGENTE','ADMIN']},
    component: TipoEntidadComponent,
    children: [
      { path: 'nuevo', component: CrearTipoEntidadComponent, data: {role: ['ADMIN']},canActivate: [GuardService], },
      { path: 'edicion/:id', component: CrearTipoEntidadComponent, data: {role: ['POLICIA', 'ADMIN']},canActivate: [GuardService],}
    ]
  },
  {
    path:'usuario',
    component:UsuarioComponent,
    children:[
      {path:'nuevo', component: CrearUsuarioComponent, data: {role: ['ADMIN']},canActivate: [GuardService], },
      {path:'edicion/:id', component: CrearUsuarioComponent , data: {role: ['ADMIN']},canActivate: [GuardService], }
    ]
  },
  {
    path: 'antecedentes',
    canActivate: [GuardService],
    data: { role: ['POLICIA', 'AGENTE', 'ADMIN'] },
    component: AntecedenteComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearAntecedenteComponent,
        data: { role: ['ADMIN', 'POLICIA'] },
        canActivate: [GuardService],
      },
    ],
  },
  {
    path:'role',
    component:RoleComponent ,
    data: {role: ['ADMIN']},canActivate: [GuardService],
  },
  {
    path:'reportes',
    component:ReportesComponent,
    data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService],
    children:[
      {path:'reporte1', component: Reporte1Component, data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService], },
      {path:'reporte2', component: Reporte2Component, data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService], },
      {path:'reporte3', component: Reporte3Component, data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService], },
      {path:'reporte4', component: Reporte4Component, data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService], },
      {path:'reporte5', component: Reporte5Component, data: {role: ['ADMIN','POLICIA']},canActivate: [GuardService], },
    ]
  },
  {
    path: 'antecedentes',
    canActivate: [GuardService],
    data: { role: ['POLICIA', 'AGENTE', 'ADMIN'] },
    component: AntecedenteComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearAntecedenteComponent,
        data: { role: ['ADMIN', 'POLICIA'] },
        canActivate: [GuardService],
      },
    ],
  },
  {
    path: 'camaras',
    canActivate: [GuardService],
    data: { role: ['POLICIA', 'AGENTE', 'ADMIN'] },
    component: CamaraComponent,
    children: [
      {
        path: 'nuevo',
        component: CrearCamaraComponent,
        data: { role: ['ADMIN', 'POLICIA', 'AGENTE'] },
        canActivate: [GuardService],
      },
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule { }

