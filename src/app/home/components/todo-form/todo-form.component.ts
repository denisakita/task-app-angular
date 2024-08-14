import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToDo} from "../../models/todo";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {
  toDoForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  userId: number | null = 0;

  constructor(
    private fb: FormBuilder,
    private toDoService: TodoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDo
  ) {

  }

  ngOnInit(): void {
    this.toDoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      done: [false],
      deadline:['']
    });


    // this.userId = this.authService.getUserId();

    if (this.data) {
      this.isEditMode = true;
      this.toDoForm.patchValue(this.data);
    }
  }

  saveToDo() {
    if (this.toDoForm.invalid) return;

    if (this.isEditMode) {
      this.toDoService.updateToDo(this.data.id, this.toDoForm.value).subscribe(
        (response) => {
          this.snackBar.open('ToDo updated successfully', 'Close', {duration: 3000});
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.snackBar.open('Error updating ToDo', 'Close', {duration: 3000});
        }
      );
    } else {
      this.toDoService.createToDo(this.toDoForm.value).subscribe(
        () => {
          this.snackBar.open('ToDo added successfully', 'Close', {duration: 3000});
          this.dialogRef.close(true);
        },
        (error: any) => {
          this.snackBar.open('Error adding ToDo', 'Close', {duration: 3000});
        }
      );
    }
  }

  closeToDoForm(result: any) {
    this.dialogRef.close(result);

  }


}
