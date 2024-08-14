import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {HomeComponent} from "./home/home.component";


export const components: any[] = [
  TodoListComponent, TodoFormComponent,
  ConfirmationDialogComponent, SideNavComponent, HomeComponent
]


export * from '../components/todo-list/todo-list.component';
export * from '../components/todo-form/todo-form.component';
export * from '../components/confirmation-dialog/confirmation-dialog.component';
export * from '../components/side-nav/side-nav.component';
export * from '../components/home/home.component';
