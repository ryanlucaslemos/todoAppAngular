import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoItem } from './models/todoitem.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'Todo Angular';
}
