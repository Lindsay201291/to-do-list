import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

@Component({
  selector: 'app-to-do',
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {
  id: number = 1;
  toDoItemDescription: string = '';
  toDoItemsList: Task[] = [];

  constructor() {
    
  }

  ngOnInit(): void {
    let localToDoItems = localStorage.getItem('toDoItems');
    if (localToDoItems != null) {
      this.toDoItemsList = JSON.parse(localToDoItems);
    }
  }

  AddItem() {
    this.id = 1;
    if (this.toDoItemDescription.trim() !== "") {
      if (this.toDoItemsList.length > 0) {
      let task = this.toDoItemsList.reduce((previous, current) => {
        return current?.id > previous.id ? current : previous;
      });

      this.id = task.id + 1;
      let newTask = {
        id: this.id,
        description: this.toDoItemDescription,
        status: false
      }

      this.toDoItemsList.push(newTask);
      } else {
        let newTask = {
          id: this.id,
          description: this.toDoItemDescription,
          status: false
        }
        this.toDoItemsList.push(newTask);
      }
    }

    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
    this.toDoItemDescription = '';
  }

  changeStatus() {
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
  }

  deleteItem(index: number) {
    this.toDoItemsList.splice(index, 1);
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
  }
}
