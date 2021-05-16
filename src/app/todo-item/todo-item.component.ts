import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() item: Item = {} as Item;
  @Output() removeIndex = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void { }

  toggleState() {
    this.item.isDone = !this.item.isDone
  }

  remove() {
    this.removeIndex.emit(this.item.id)
  }

}
