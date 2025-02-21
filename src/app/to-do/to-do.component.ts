import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do',
  imports: [FormsModule, CommonModule],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {
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
    if (this.toDoItemDescription.trim() !== "") {
      const newTask = {
        description: this.toDoItemDescription,
        status: false
      }
      this.toDoItemsList.push(newTask);
    }
    localStorage.setItem('toDoItems', JSON.stringify(this.toDoItemsList));
    this.toDoItemDescription = '';
  }
}
