import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadComponent } from './components/entidad/entidad.component';
import { CrearEntidadComponent } from './components/entidad/crear-entidad/crear-entidad.component';
import { SospechosoComponent } from './components/sospechoso/sospechoso.component';
import { CrearSospechosoComponent } from './components/sospechoso/crear-sospechoso/crear-sospechoso.component';
import { CamaraComponent } from './components/camara/camara.component';
import { CrearCamaraComponent } from './components/camara/crear-camara/crear-camara.component';
import { AlertasComponent } from './components/alertas/alertas.component';
import { CrearAlertasComponent } from './components/alertas/crear-alertas/crear-alertas.component';
import { ActasComponent } from './components/actas/actas.component';
import { CrearActasComponent } from './components/actas/crear-actas/crear-actas.component';
const routes: Routes = [
  {
    path: 'entidades',
    component: EntidadComponent,
    children: [
      { path: 'nuevo', component: CrearEntidadComponent },
      { path: 'edicion/:id', component: CrearEntidadComponent },
    ]
  },
  {
    path:'sospechosos',
    component:SospechosoComponent,
    children:[
      {path:'nuevo', component: CrearSospechosoComponent},
      {path:'edicion/id', component: CrearSospechosoComponent}
    ]
  },
  {
    path:'camaras',
    component:CamaraComponent,
    children:[
      {path:'nuevo', component: CrearCamaraComponent},
      {path:'edicion/:id', component: CrearCamaraComponent}
    ]
  },
  {
    path:'alertas',
    component:AlertasComponent,
    children:[
      {path:'nuevo', component: CrearAlertasComponent},
      {path:'edicion/:id', component: CrearAlertasComponent}
    ]
  },
  {
    path:'actas',
    component:ActasComponent,
    children:[
      {path:'nuevo', component: CrearActasComponent},
      {path:'edicion/:id', component: CrearActasComponent}
    ]
  }
  //Colocar las rutas para las demas entidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
