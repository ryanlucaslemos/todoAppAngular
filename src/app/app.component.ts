import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoItem } from './models/todoitem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getFromStorage();
  }
  title = 'todo-angular';
  name = new FormControl('');
  todoList: TodoItem[] = [];

  addToList() {
    const tamanhoLista = this.todoList.length;
    this.todoList.push({
      todoAction: this.name.value,
      finished: false,
      id: tamanhoLista > 0 ? this.todoList[tamanhoLista - 1].id + 1 : 0,
    });
    this.name.setValue('');
    this.saveOnStorage();
  }

  toggleFinished(index: number) {
    this.todoList = this.todoList.map((item) => {
      if (item.id === index) item.finished = !item.finished;
      return item;
    });
    this.saveOnStorage();
  }

  removeItem(index: number) {
    this.todoList = this.todoList.filter((item) => item.id !== index);
    this.saveOnStorage();
  }

  saveOnStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  getFromStorage() {
    const stringList = localStorage.getItem('todoList');

    if (!stringList) return;
    const storageList: TodoItem[] = JSON.parse(stringList);

    if (storageList != null) this.todoList = storageList;
    console.log(this.todoList);
  }
}
