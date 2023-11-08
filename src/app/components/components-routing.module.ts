import { CrearCamaraComponent } from './camara/crear-camara/crear-camara.component';
import { CamaraComponent } from './camara/camara.component';
import { CrearSospechosoComponent } from './sospechoso/crear-sospechoso/crear-sospechoso.component';
import { SospechosoComponent } from './sospechoso/sospechoso.component';
import { CrearEntidadComponent } from './entidad/crear-entidad/crear-entidad.component';
import { EntidadComponent } from './entidad/entidad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      {path:'edicion/id', component: CrearCamaraComponent}
    ]
  },
  
  //Colocar las rutas para las demas entidades
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
