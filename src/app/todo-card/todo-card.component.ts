import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../model/todo.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
})
export class TodoCardComponent implements OnInit {
  @Input() taskItem: TodoItem;
  @Output() delClicked = new EventEmitter<TodoItem>();
  @Output() checkClicked = new EventEmitter<TodoItem>();
  constructor() {}

  ngOnInit(): void {
    // console.log(this.taskItem);
  }
  onDelClicked() {
    this.delClicked.emit(this.taskItem);
  }
  onChecked() {
    this.checkClicked.emit(this.taskItem);
  }
}
