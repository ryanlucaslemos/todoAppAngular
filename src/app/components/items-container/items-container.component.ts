import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  filter: FormControl = new FormControl('all');

  constructor(private todoService: TodoService) {
    this.todoList$ = this.todoService.filteredList$;
  }

  ngOnInit(): void {}

  toggleFinished(index: number) {
    this.todoService.toggleFinished(index);
  }

  removeItem(index: number) {
    this.todoService.removeItem(index);
  }

  applyFilter() {
    this.todoService.applyFilter(this.filter.value);
  }

  verifyEnterPressed(
    event: any,
    el: any,
    label: any,
    checkbox: any,
    id: number
  ) {
    if (event.key === 'Enter') this.hideInput(el, label, checkbox, id);
  }

  showInput(el: any, label: any, checkbox: any) {
    el.hidden = false;
    el.style.width = `${el.value.length}ch`;
    el.focus();
    label.hidden = true;
    checkbox.hidden = true;
  }

  hideInput(el: any, label: any, checkbox: any, id: number) {
    if (el.value && el.value !== '') {
      this.todoService.updateItem(id, el.value);
    } else {
      el.value = label.textContent;
    }

    el.hidden = true;
    label.hidden = false;
    checkbox.hidden = false;
  }
}
