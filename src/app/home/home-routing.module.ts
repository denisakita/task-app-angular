import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent, TodoListComponent} from "./components";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'todo-list', component: TodoListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
