import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  computed,
  signal,
  WritableSignal,
} from '@angular/core';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';
import { IBook } from '@path-interfaces/IBook';

@Component({
  selector: 'app-book',
  imports: [
    CommonModule,
    PrintTagsPipe,
    SortbyPipe,
    NgxPaginationModule,
    NgOptimizedImage,
    HighlightDirective,
    EnumToArrayPipe,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly gaService = inject(GoogleAnalyticsService);
  private readonly paginationService = inject(PaginationService);

  private readonly allBooks = signal(this.dataService.getBooks());
  publishNameList = PublishNameEnum;
  PublishNameEnum = PublishNameEnum;

  private readonly _tagsArray = signal<string[]>([]);
  publishNameFilter: WritableSignal<Set<PublishNameEnum>> = signal<Set<PublishNameEnum>>(new Set<PublishNameEnum>());
  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  config = this.paginationService.createPaginationConfig('booksPag', 5);

  ngOnInit(): void {
    const uniqueTags = new Set<string>();
    this.allBooks().forEach((book) =>
      book.tags.forEach((tag) => uniqueTags.add(tag.trim()))
    );
    this._tagsArray.set(Array.from(uniqueTags).sort());
  }

  tagsArray = this._tagsArray.asReadonly();

  availableTags = computed(() => {
    const publisherFilters = this.publishNameFilter();

    // If no publisher filter, show all tags
    if (publisherFilters.size === 0) {
      return this.tagsArray();
    }

    // Filter books by selected publishers and accumulate their tags
    const uniqueTags = new Set<string>();
    this.allBooks()
      .filter(book => publisherFilters.has(book.publishName as PublishNameEnum))
      .forEach(book => book.tags.forEach(tag => uniqueTags.add(tag.trim())));

    return Array.from(uniqueTags).sort();
  });

  filteredAndSortedBooks = computed(() => {
    const books = this.allBooks();
    const publisherFilters = this.publishNameFilter();
    const tagFilters = this.tagsFilter();

    // Early return if no filters
    if (publisherFilters.size === 0 && tagFilters.size === 0) {
      return this.sortBooks(books);
    }

    // Apply filters efficiently
    const result = books.filter(book => {
      // Check publisher filter
      if (publisherFilters.size > 0 && !publisherFilters.has(book.publishName as PublishNameEnum)) {
        return false;
      }

      // Check tag filter
      if (tagFilters.size > 0 && !book.tags.some(tag => tagFilters.has(tag))) {
        return false;
      }

      return true;
    });

    return this.sortBooks(result);
  });

  private sortBooks(books: readonly IBook[]): IBook[] {
    return [...books].sort((a, b) => {
      if (a.favorite !== b.favorite) {
        return b.favorite ? 1 : -1;
      }
      const yearA = a.publishYear || 0;
      const yearB = b.publishYear || 0;
      return yearB - yearA;
    });
  }

  absoluteIndex(indexOnPage: number): number {
    return (
      this.config().itemsPerPage * (this.config().currentPage - 1) +
      indexOnPage +
      1
    );
  }

  onPageChange(number: number) {
    this.config().currentPage = number;
  }

  clearFilters() {
    this.gaService?.event('clear_filters', 'books', 'filters_cleared');

    this.publishNameFilter.set(new Set<PublishNameEnum>());
    this.tagsFilter.set(new Set<string>());
    this.config().currentPage = 1;
  }

  onClickIntitutionEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_book_institution_', '');

    const publishName = PublishNameEnum[id as keyof typeof PublishNameEnum];

    const action = this.publishNameFilter().has(publishName) ? 'remove' : 'add';
    this.gaService?.event('filter_publisher', 'books', `${action}_${publishName}`);

    const currentFilters = new Set(this.publishNameFilter());
    if (currentFilters.has(publishName)) {
      currentFilters.delete(publishName);
    } else {
      currentFilters.add(publishName);
    }
    this.publishNameFilter.set(currentFilters);

    // Clean up invalid tags after filter change
    const availableTags = new Set(this.availableTags());
    const currentTags = new Set(this.tagsFilter());
    const validTags = new Set([...currentTags].filter(tag => availableTags.has(tag)));

    if (validTags.size !== currentTags.size) {
      this.tagsFilter.set(validTags);
    }

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_book_tag_', '');

    const action = this.tagsFilter().has(id) ? 'remove' : 'add';
    this.gaService?.event('filter_tag', 'books', `${action}_${id}`);

    const currentTags = new Set(this.tagsFilter());
    if (currentTags.has(id)) {
      currentTags.delete(id);
    } else {
      currentTags.add(id);
    }
    this.tagsFilter.set(currentTags);
    this.config().currentPage = 1;
  }

  onBookUrlClick(bookTitle: string, publishName: string) {
    this.gaService?.event('book_url_click', 'books', `${bookTitle}_${publishName}`);
  }

  isPublisherSelected(publisherKey: string): boolean {
    const publisher = PublishNameEnum[publisherKey as keyof typeof PublishNameEnum];
    return this.publishNameFilter().has(publisher);
  }

  trackByBook(index: number, item: any): string {
    return item.title + item.publishName;
  }

  trackByPublisher(index: number, item: any): string {
    return item.key;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  getPublisherLogo(publishName: PublishNameEnum): string {
    const logoMap: Record<PublishNameEnum, string> = {
      [PublishNameEnum.CasaDoCodigo]: 'assets/img/publishers/casa_do_cdigo_logo.jpeg',
      [PublishNameEnum.Novatec]: 'assets/img/publishers/novatec_editora_logo.jpeg',
      [PublishNameEnum.Packts]: 'assets/img/publishers/packt_publishing_logo.jpeg',
      [PublishNameEnum.Elsevier]: 'assets/img/publishers/elsevier_logo.jpeg',
      [PublishNameEnum.AltaBooks]: 'assets/img/publishers/editora_alta_books_logo.jpeg',
    };

    return logoMap[publishName] || 'assets/img/others/livro.jpg';
  }
}
