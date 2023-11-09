import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
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
  ],
})
export class ComponentsModule { }
