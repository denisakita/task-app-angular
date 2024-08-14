import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {TodoFormComponent} from "../todo-form/todo-form.component";
import {catchError, map, merge, startWith, switchMap} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {environment} from "../../../../environments/environment";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToDo} from "../../models/todo";
import {TodoService} from "../../services/todo.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  columns: string[] = ['title', 'description', 'deadline', 'done', 'actions'];

  @ViewChild('paginator', {static: true}) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild('sorter', {static: true}) sorter!: MatSort;
  isLoading = true;
  toDoDS: MatTableDataSource<ToDo> = new MatTableDataSource<ToDo>();
  pageSize = environment.PAGE_SIZE;
  resultSize = 0;
  toDoFG: FormGroup = new FormGroup({});

  constructor(
    private toDoService: TodoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.toDoFG = this.getFilterForm();
    this.initializeToDoList();
  }

  getFilterForm() {
    return this.fb.group({
      title: [''],
      description: ['']
    });
  }

  getToDoList() {
    this.isLoading = true;
    return this.toDoService.getToDos(this.paginator, this.sorter, this.toDoFG.value);
  }

  initializeToDoList() {
    merge(this.sorter.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getToDoList();
        }),
        map(data => {
          this.isLoading = false;
          return data || [];
        }),
        catchError(() => {
          this.isLoading = false;
          return [];
        })
      ).subscribe((data: ToDo[]) => {
      this.toDoDS.data = data;
    });
  }

  getList() {
    this.getToDoList().subscribe((data: ToDo[]) => {
      this.resultSize = data.length;
      this.toDoDS.data = data;
      this.isLoading = false;
    });
  }

  searchToDo() {
    this.paginator.pageIndex = 0;
    const title = this.toDoFG.get('title')?.value.trim();
    const description = this.toDoFG.get('description')?.value.trim();

    this.toDoFG.patchValue({
      title: title,
      description: description
    });

    // Update the data source with filtered results
    this.initializeToDoList();
  }

  addToDo() {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '600px',
      height: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('ToDo added successfully', 'Close', {duration: 2000});
        this.getList();
      }
    }, (error) => {
      this.snackBar.open(error.message, 'Close', {duration: 3000});
    });
  }

  editToDo(toDo: ToDo) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '600px',
      height: '550px',
      data: toDo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getList();
      }
    });
  }

  deleteToDo(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toDoService.deleteToDo(id).subscribe(
          () => {
            this.getList();
          },
          error => {
            this.snackBar.open('Error deleting ToDo', 'Close', {duration: 3000});
          }
        );
      }
    });
  }

  clearToDoFG() {
    this.toDoFG.setValue({title: '', description: ''});
  }

  toggleDone(toDo: ToDo) {
    toDo.done = !toDo.done;
    this.toDoService.updateToDo(toDo.id, toDo).subscribe(
      () => {
        this.snackBar.open('ToDo status updated', 'Close', {duration: 3000});
      },
      (error) => {
        this.snackBar.open('Error updating status', 'Close', {duration: 3000});
        toDo.done = !toDo.done;
      }
    );
  }

  exportToCsv() {
    this.toDoService.exportToCsv(this.toDoDS.data, 'tasks');
  }
}
