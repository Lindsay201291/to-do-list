import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-to-do',
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {
  id: number = 0;
  toDoItemDescription: string = '';
  toDoItemsList: Task[] = [];

  constructor() {
    
  }

  ngOnInit(): void {
    let localToDoItems = localStorage.getItem('toDoItems');
    if (localToDoItems != null) {
      this.toDoItemsList = JSON.parse(localToDoItems);
      this.id = this.toDoItemsList.length;
    }
  }

  AddItem() {
    if (this.toDoItemDescription.trim() !== "") {
      this.id = this.id + 1;
      const newTask = {
        id: this.id,
        description: this.toDoItemDescription,
        status: false
      }
      this.toDoItemsList.push(newTask);
    }
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
    this.toDoItemDescription = '';
  }

  changeStatus(i: number) {
    console.log(i);
      localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
  }
}
