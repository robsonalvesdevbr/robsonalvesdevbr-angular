import { Component, Input } from '@angular/core';
import { IBook } from '../../../interfaces/IBook';
import { PaginationInstance } from 'ngx-pagination';
import { BasePageComponent } from '../../base-page/base-page.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent extends BasePageComponent  {
  @Input({ required: true }) books: IBook[] = [];

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
