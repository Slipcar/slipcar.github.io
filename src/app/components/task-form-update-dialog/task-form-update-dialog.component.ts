// Componente para edição de Tasks
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from 'src/app/models/taskModel';
import { TaskService } from 'src/app/services/task.service';
import { TaskFormNewTaskDialogComponent } from '../task-form-new-task-dialog/task-form-new-task-dialog.component';
import { dialogFormData } from '../task/task.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-task-form-dialog',
  templateUrl: './task-form-update-dialog.component.html',
  styleUrls: ['./task-form-update-dialog.component.css'],
})
export class TaskFormUpdateDialogComponent {

  constructor(
    private service: TaskService,
    public dialogRef: MatDialogRef<TaskFormNewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskEdit: dialogFormData
  ) { }

  // Salva a edição de dados da task no back-end e atualiza a lista na tela
  onEditTask(taskEdit: TaskModel): void {
    // Formata a data e hora da propriedade editedDate antes de salvar as edições.
    taskEdit.editedDate = formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en');
    this.service.saveTask(taskEdit).subscribe();
    window.location.reload();
  }

  // Fecha o formulário e cancela a edição de dados
  onCancel(): void {
    this.dialogRef.close();
  }
}
