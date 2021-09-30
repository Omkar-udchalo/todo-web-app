import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { AuthService } from '../auth.service';
import { TodoItem } from '../model/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  todoList: TodoItem[] = [];

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.retriveDataFromFireStore();
    this.todoList = this.auth.todoItems;
  }

  logoutClicked() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  onTaskSubmit(taskForm: NgForm) {
    let newTask = new TodoItem(taskForm.value.task);
    this.auth.updateNewTaskData(newTask).then((data) => {
      // this.auth.retriveDataFromFireStore();
      this.todoList = this.auth.todoItems;
    });

    taskForm.reset();
  }

  onTodoDelete(todoItem: TodoItem) {
    console.log('Deleting' + todoItem.docId);
    this.auth.deleteItem(todoItem.docId);
  }

  onCheckClicked(todoItem: TodoItem) {
    if (todoItem.status === 'progress') {
      todoItem.status = 'done';
      this.auth.updateStatus(todoItem);
    } else {
      todoItem.status = 'progress';
      this.auth.updateStatus(todoItem);
    }
  }
}
