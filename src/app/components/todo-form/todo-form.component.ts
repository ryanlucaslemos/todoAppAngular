import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
  form = this.formBuilder.group({
    name: [
      '',
      Validators.compose([Validators.required, Validators.minLength(1)]),
    ],
  });

  addToList() {
    this.todoService.addTodo(this.form.controls.name.value);
    this.form.controls.name.setValue('');
  }
}
