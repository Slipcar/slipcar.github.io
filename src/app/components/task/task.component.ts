// Componente Task principal
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { TaskModel } from 'src/app/models/taskModel';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormUpdateDialogComponent } from '../task-form-update-dialog/task-form-update-dialog.component';
import { TaskFormNewTaskDialogComponent } from '../task-form-new-task-dialog/task-form-new-task-dialog.component';

// Exporta os campos para serem recuperados no formulário de edição de Tasks
export interface dialogFormData {
  id: number;
  title: string;
  description: string;
  createdDate: string;
  editedDate: string;
  doneDate: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  title!: string;
  description!: string;

  task!: TaskModel;
  tasks: TaskModel[] = [];

  // Dados do formulário
  form: FormGroup = new FormGroup({
    title: new FormControl(this.title, [
      Validators.required,
      Validators.minLength(5),
    ]),
    description: new FormControl(this.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
    ]),
  });

  constructor(private service: TaskService, public dialog: MatDialog) { }

  // Lista todas as tasks criadas ao carregar a tela
  ngOnInit(): void {
    this.listAllTask();
  }

  // Abre o formulário para adicionar uma nova task
  newTask(): void {
    this.dialog.open(TaskFormNewTaskDialogComponent, {
      width: '450px',
    });
  }

  // Abre o formulário de edição de tasks
  editTask(task: TaskModel): void {
    // recupera os dados do back-end de acordo com o id informado
    this.service.taskById(task.id).subscribe({
      next: (Response) =>
        this.dialog.open(TaskFormUpdateDialogComponent, {
          width: '450px', // seta o tamanho do formulário para 450 pixels
          data: {
            id: Response.id,
            title: Response.title,
            description: Response.description,
            createdDate: Response.createdDate,
            editedDate: Response.editedDate,
            doneDate: Response.doneDate,
          },
        }),
    });
  }

  // Método que faz o drag and drop
  dragDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  // Lista todas as tasks recuperadas do back-end
  listAllTask() {
    this.service
      .listAllTasks()
      .subscribe((taskList) => (this.tasks = taskList));
  }

  // Recupera uma task do back-end de acordo com o id informado
  getTaskById(task: TaskModel) {
    this.service.taskById(task.id).subscribe((task) => (this.task = task));
  }

  // Salva uma task no back-end e atualiza a lista na tela
  submitTask() {
    const task: TaskModel = { ...this.form.value };
    this.service.saveTask(task).subscribe((savedTask) => {
      this.tasks.push(savedTask);
      this.form.reset();
    });
  }

  // Atualiza o status da task no back-end para concluída 
  // e salva a data da conclusão
  doneTask(task: TaskModel) {
    this.service.doneTask(task.id).subscribe({
      next: (TaskUpdated) => {
        task.done = TaskUpdated.done;
        task.doneDate = TaskUpdated.doneDate;
      },
    });
  }

  // Deleta uma task do back-end de aconrdo com o id informado
  deleteTask(task: TaskModel) {
    this.service.deleteTask(task.id).subscribe({
      next: (Response) => this.listAllTask(),
    });
  }
}
