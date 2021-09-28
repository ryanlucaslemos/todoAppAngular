import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TodoItem } from 'src/app/models/todoitem.model';
import { StorageManagerService } from '../storage-manager/storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoListSubject = new BehaviorSubject<TodoItem[]>([]);
  private filteredListSubject = new BehaviorSubject<TodoItem[]>([]);
  private filter = new BehaviorSubject<string>('');
  private readonly storageName = 'todoList';

  todoList$ = this.todoListSubject.asObservable();
  filteredList$ = this.filteredListSubject.asObservable();

  get todoList() {
    return this.todoListSubject.getValue();
  }

  get filteredList() {
    return this.filteredListSubject.getValue();
  }

  constructor(private storageService: StorageManagerService) {
    const storageList = this.storageService.getFromStorage<TodoItem[]>(
      this.storageName
    );
    if (storageList != null) {
      this.updateListState(storageList);
    }
  }

  addTodo(description: string) {
    const tamanhoLista = this.todoList.length;

    const newList = [
      ...this.todoList,
      {
        createdAt: new Date(),
        todoAction: description,
        finished: false,
        id: tamanhoLista > 0 ? this.todoList[tamanhoLista - 1].id + 1 : 0,
      },
    ];

    this.updateListState(newList);
  }

  toggleFinished(index: number) {
    const newList = this.todoList.map((item) => {
      if (item.id === index) item.finished = !item.finished;
      return item;
    });

    this.updateListState(newList);
  }

  removeItem(index: number) {
    const newList = this.todoList.filter((item) => item.id !== index);
    this.updateListState(newList);
  }

  applyFilter(filter: string) {
    let list: TodoItem[];
    switch (filter) {
      case 'done':
        list = this.todoList.filter((t) => t.finished);
        break;
      case 'undone':
        list = this.todoList.filter((t) => !t.finished);
        break;
      default:
        list = this.todoList;
    }
    this.filter.next(filter);
    this.filteredListSubject.next(list);
  }

  private updateListState(newList: TodoItem[]) {
    this.todoListSubject.next(newList);
    this.storageService.saveOnStorage(this.storageName, newList);
    this.applyFilter(this.filter.getValue());
  }
}
