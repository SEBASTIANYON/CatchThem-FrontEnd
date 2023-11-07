import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntidadComponent } from './components/entidad/entidad.component';
import { CrearEntidadComponent } from './components/entidad/crear-entidad/crear-entidad.component';
import { ListarEntidadComponent } from './components/entidad/listar-entidad/listar-entidad.component';
import { SospechosoComponent } from './components/sospechoso/sospechoso.component';
import { CrearSospechosoComponent } from './components/sospechoso/crear-sospechoso/crear-sospechoso.component';
import { ListarSospechosoComponent } from './components/sospechoso/listar-sospechoso/listar-sospechoso.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ThemePalette} from '@angular/material/core';
import {CommonModule, NgFor} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CamaraComponent } from './components/camara/camara.component';
import { ListarCamaraComponent } from './components/camara/listar-camara/listar-camara.component';
import { CrearCamaraComponent } from './components/camara/crear-camara/crear-camara.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CrearUsuarioComponent } from './components/usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './components/usuario/listar-usuario/listar-usuario.component';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    EntidadComponent,
    CrearEntidadComponent,
    ListarEntidadComponent,
    SospechosoComponent,
    CrearSospechosoComponent,
    ListarSospechosoComponent,
    CamaraComponent,
    ListarCamaraComponent,
    CrearCamaraComponent,
    UsuarioComponent,
    CrearUsuarioComponent,
    ListarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
