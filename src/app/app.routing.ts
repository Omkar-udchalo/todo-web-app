import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: TodoItemComponent, canActivate: [AuthGuard] },
  { path: 'todo', component: TodoItemComponent, canActivate: [AuthGuard] },
  { path: 'products', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserProfileComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
