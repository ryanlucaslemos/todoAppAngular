import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}
  form = new FormGroup({
    name: new FormControl(''),
  });

  addToList() {
    this.todoService.addTodo(this.form.controls.name.value);
    this.form.controls.name.setValue('');
  }
}
