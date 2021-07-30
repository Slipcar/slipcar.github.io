// Classe de serviço
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/taskModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Url base de acesso a API
  apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  // Retorna uma lista com todas as tasks do back-end
  listAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.apiUrl);
  }

  // Recupera os dados da task no back-end de acordo com o id informado
  taskById(id?: number): Observable<TaskModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskModel>(url);
  }

  // Salva uma task no back-end
  saveTask(task: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.apiUrl, task);
  }

  // Edita uma task no back-end
  editTask(id?: number): Observable<TaskModel> {
    const url = `${this.apiUrl}/${id}/edit`;
    return this.http.put<TaskModel>(url, {});
  }

  // Atualiza o status da task no back-end para concluída 
  // e salva a data da conclusão
  doneTask(id?: number): Observable<TaskModel> {
    const url = `${this.apiUrl}/${id}/done`;
    return this.http.patch<TaskModel>(url, {});
  }

  // Deleta uma task no back-end
  deleteTask(id?: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
