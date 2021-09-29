import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TodoItem } from 'src/app/models/todoitem.model';
import { StorageManagerService } from '../storage-manager/storage-manager.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly baseTodos: TodoItem[] = [
    {
      id: 1,
      todoAction: 'Adicione um novo ToDo digitando abaixo.',
      createdAt: new Date(),
      finished: false,
    },
    {
      id: 2,
      todoAction: 'Filtre os todos clicando nos filtros abaixo.',
      createdAt: new Date(),
      finished: false,
    },
    {
      id: 3,
      todoAction: 'Edite um todo clicando sobre ele.',
      createdAt: new Date(),
      finished: false,
    },
    {
      id: 4,
      todoAction:
        'Marque um todo como finalizado clicando na caixa ao lado do seu nome.',
      createdAt: new Date(),
      finished: true,
    },
  ];
  private todoListSubject = new BehaviorSubject<TodoItem[]>(this.baseTodos);
  private filteredListSubject = new BehaviorSubject<TodoItem[]>(this.baseTodos);
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
    if (storageList != null && storageList.length > 0) {
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

  updateItem(index: number, newValue: string) {
    const newList = this.todoList.map((item) => {
      if (item.id === index) item.todoAction = newValue;
      return item;
    });

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
