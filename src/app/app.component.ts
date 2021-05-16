import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from './todo-item/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo-App'
  isLightMode: boolean = true;
  originalItems: Item[] = []
  filteredItems: Item[] = []

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void { }

  addItem(form: NgForm): void {
    if (!form.valid) return

    const id = this.originalItems[this.originalItems.length - 1]?.id + 1 || 1
    const item: Item = {
      id,
      title: form.value.title,
      isDone: false
    }

    this.originalItems.push(item)
    this.filteredItems = [...this.originalItems]
    form.resetForm();
  }

  removeItem(index: number): void {
    this.originalItems = this.originalItems.filter(e => e.id !== index)
    this.filteredItems = this.originalItems
  }

  removeItemsDone() {
    this.originalItems = this.originalItems.filter(e => !e.isDone)
    this.filteredItems = this.originalItems
  }

  getItemsNotDone(): number {
    return this.filteredItems.filter(e => !e.isDone).length
  }

  getAllItems() {
    this.filteredItems = this.originalItems
  }

  getActiveItems() {
    this.filteredItems = this.originalItems.filter(e => !e.isDone)
  }

  getCompleteItems() {
    this.filteredItems = this.originalItems.filter(e => e.isDone)
  }

  toggleTheme() {
    if (this.document.body.classList.contains('light')) {
      this.isLightMode = false
      this.document.body.classList.replace('light', 'dark')
    }
    else {
      this.isLightMode = true
      this.document.body.classList.replace('dark', 'light')
    }
  }
}
