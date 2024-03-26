import { Component, Input } from '@angular/core';
import { IBook } from '../../../interfaces/IBook';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  @Input({required: false}) bglight: boolean = false;
  @Input({ required: true }) books: IBook[] = [];

  currentClass: Record<string, boolean> = {
    'bg-light': this.bglight
  };

  config: PaginationInstance = {
    id: 'booksPag',
    itemsPerPage: 5,
    currentPage: 1
  };

  absoluteIndex(indexOnPage: number): number {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + indexOnPage + 1;
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
}
