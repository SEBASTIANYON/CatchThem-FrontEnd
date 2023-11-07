import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntidadComponent } from './components/entidad/entidad.component';
import { CrearEntidadComponent } from './components/entidad/crear-entidad/crear-entidad.component';
import { SospechosoComponent } from './components/sospechoso/sospechoso.component';
import { CrearSospechosoComponent } from './components/sospechoso/crear-sospechoso/crear-sospechoso.component';
import { CamaraComponent } from './components/camara/camara.component';
import { CrearCamaraComponent } from './components/camara/crear-camara/crear-camara.component';
import { CrearAntecedenteComponent } from './components/antecedente/crear-antecedente/crear-antecedente.component';
import { AntecedenteComponent } from './components/antecedente/antecedente.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
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
      {path:'edicion/:id', component: CrearSospechosoComponent}
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
    path:'antecedentes',
    component:AntecedenteComponent,
    children:[
      {path:'nuevo', component: CrearAntecedenteComponent},
      {path:'edicion/:id', component: CrearAntecedenteComponent}
    ]
  }
  //Colocar las rutas para las demas entidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
