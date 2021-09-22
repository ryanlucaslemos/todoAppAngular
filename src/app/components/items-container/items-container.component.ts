import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { TodoItem } from 'src/app/models/todoitem.model';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.css'],
})
export class ItemsContainerComponent implements OnInit {
  todoList$: Observable<TodoItem[]>;

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.todoList$;
  }

  ngOnInit(): void {}

  toggleFinished(index: number) {
    this.todoService.toggleFinished(index);
  }

  removeItem(index: number) {
    this.todoService.removeItem(index);
  }
}
