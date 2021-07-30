// Módulo principal da aplicação
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './components/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormUpdateDialogComponent } from './components/task-form-update-dialog/task-form-update-dialog.component';
import { TaskFormNewTaskDialogComponent } from './components/task-form-new-task-dialog/task-form-new-task-dialog.component';

// Declaração dos componentes da aplicação
@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskFormUpdateDialogComponent,
    TaskFormNewTaskDialogComponent,
  ],
  // Importação dos módulos
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
