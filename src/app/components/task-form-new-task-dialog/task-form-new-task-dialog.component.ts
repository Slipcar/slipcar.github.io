// Componente para criação de Tasks
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from 'src/app/models/taskModel';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form-new-task-dialog',
  templateUrl: './task-form-new-task-dialog.component.html',
  styleUrls: ['./task-form-new-task-dialog.component.css'],
})
export class TaskFormNewTaskDialogComponent implements OnInit {
  tasks: TaskModel[] = [];
  form!: FormGroup;

  constructor(
    private service: TaskService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskFormNewTaskDialogComponent>,
  ) { }

  ngOnInit(): void {
    // Inicia os campos do formulário seta como obrigatórios,
    // além de definir o uso de no mínímo 5 caracteres em cada campo
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]], // Valida o campo título
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // Salva uma task no back-end e atualiza a lista na tela
  onSaveNewTask() {
    this.service.saveTask(this.form.value).subscribe((result) => { });
    this.dialogRef.close();
    window.location.reload();
  }

  // Método que fecha o formulário ao clicar no botão de cancelar
  onCancel(): void {
    this.dialogRef.close();
  }
}
