import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ToDo} from "../models/todo";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import * as FileSaver from 'file-saver';



@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.API_HOST}/todos`;

  constructor(private http: HttpClient) {
  }

  getToDos(paginator: MatPaginator, sort: MatSort, filter: any): Observable<ToDo[]> {
    const queryParams = this.buildQueryParams(paginator, sort, filter);
    debugger
    return this.http.get<ToDo[]>(`${this.apiUrl}?${queryParams}`);
  }

  private buildQueryParams(paginator: MatPaginator, sort: MatSort, filter: any): string {
    let queryParams = `_page=${paginator.pageIndex + 1}&_limit=${paginator.pageSize || environment.PAGE_SIZE}`;

    if (sort && sort.active && sort.direction) {
      queryParams += `&_sort=${sort.active}&_order=${sort.direction}`;
    }

    if (filter) {
      // Use _like for partial string matching
      if (filter.title) {
        queryParams += `&title_like=${filter.title}`;
      }
      if (filter.description) {
        queryParams += `&description_like=${filter.description}`;
      }
    }

    return queryParams;
  }


  getToDo(id: string): Observable<ToDo> {
    return this.http.get<ToDo>(`${this.apiUrl}/${id}`);
  }

  createToDo(toDo: ToDo): Observable<ToDo> {
    return this.http.post<ToDo>(this.apiUrl, toDo);
  }

  updateToDo(id: string, toDo: ToDo): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.apiUrl}/${id}`, toDo);
  }

  deleteToDo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  exportToCsv(tasks: ToDo[], filename: string) {
    const csvContent = this.convertToCsv(tasks);
    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8'});
    FileSaver.saveAs(blob, filename + '.csv');
  }

  private convertToCsv(tasks: ToDo[]): string {
    const header = Object.keys(tasks[0]).join(',') + '\n';
    const body = tasks.map(task => Object.values(task).join(',')).join('\n');
    return header + body;
  }

}
