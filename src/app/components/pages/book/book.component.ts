import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  computed,
  signal,
  effect,
  WritableSignal,
} from '@angular/core';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { AnalyticsService } from '@path-services/analytics.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';
import { IBook } from '@path-interfaces/IBook';
import { debounce } from '../../../utils/performance.utils';

@Component({
  selector: 'app-book',
  imports: [
    CommonModule,
    PrintTagsPipe,
    SortbyPipe,
    TranslatePipe,
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
  private readonly analyticsService = inject(AnalyticsService);
  private readonly paginationService = inject(PaginationService);

  private readonly allBooks = signal(this.dataService.getBooks());
  publishNameList = PublishNameEnum;
  PublishNameEnum = PublishNameEnum;

  private readonly _tagsArray = signal<string[]>([]);
  publishNameFilter: WritableSignal<Set<PublishNameEnum>> = signal<Set<PublishNameEnum>>(new Set<PublishNameEnum>());
  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());
  searchQuery = signal<string>('');

  config = this.paginationService.createPaginationConfig('booksPag', 5);

  private readonly debouncedTrackSearch = debounce((term: string, count: number) => {
    if (term.length >= 2) {
      this.analyticsService.trackSearch(term, 'books', count);
    }
  }, 600);

  constructor() {
    super();
    effect(() => {
      const term = this.searchQuery().trim();
      const count = this.filteredAndSortedBooks().length;
      this.debouncedTrackSearch(term, count);
    });
  }

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

    if (publisherFilters.size === 0) {
      return this.tagsArray();
    }

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
    const query = this.searchQuery().toLowerCase().trim();

    if (publisherFilters.size === 0 && tagFilters.size === 0 && !query) {
      return this.sortBooks(books);
    }

    const result = books.filter(book => {
      if (publisherFilters.size > 0 && !publisherFilters.has(book.publishName as PublishNameEnum)) {
        return false;
      }
      if (tagFilters.size > 0 && !book.tags.some(tag => tagFilters.has(tag))) {
        return false;
      }
      if (query) {
        const titleMatch = book.title.toLowerCase().includes(query);
        const authorMatch = book.author.some(a => a.toLowerCase().includes(query));
        if (!titleMatch && !authorMatch) return false;
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
    const totalPages = Math.ceil(this.filteredAndSortedBooks().length / this.config().itemsPerPage);
    this.analyticsService.trackPagination('books', number, totalPages);
  }

  clearFilters() {
    this.analyticsService.trackClearFilters('books');

    this.publishNameFilter.set(new Set<PublishNameEnum>());
    this.tagsFilter.set(new Set<string>());
    this.searchQuery.set('');
    this.config().currentPage = 1;
  }

  removeTag(tag: string): void {
    const current = new Set(this.tagsFilter());
    current.delete(tag);
    this.tagsFilter.set(current);
    this.config().currentPage = 1;
  }

  removePublisher(publisherKey: string): void {
    const publisher = PublishNameEnum[publisherKey as keyof typeof PublishNameEnum];
    if (!publisher) return;
    const current = new Set(this.publishNameFilter());
    current.delete(publisher);
    this.publishNameFilter.set(current);
    this.config().currentPage = 1;
  }

  onClickIntitutionEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_book_institution_', '');

    const publishName = PublishNameEnum[id as keyof typeof PublishNameEnum];

    const action = this.publishNameFilter().has(publishName) ? 'remove' : 'add';
    this.analyticsService.trackFilterPublisher(publishName, action);

    const currentFilters = new Set(this.publishNameFilter());
    if (currentFilters.has(publishName)) {
      currentFilters.delete(publishName);
    } else {
      currentFilters.add(publishName);
    }
    this.publishNameFilter.set(currentFilters);

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
    this.analyticsService.trackFilterTag(id, action, 'books');

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
    this.analyticsService.trackBookUrlClick(bookTitle, publishName);
  }

  isPublisherSelected(publisherKey: string): boolean {
    const publisher = PublishNameEnum[publisherKey as keyof typeof PublishNameEnum];
    return this.publishNameFilter().has(publisher);
  }

  trackByBook(index: number, item: IBook): string {
    return item.id;
  }

  trackByPublisher(index: number, item: { key: string; value: string | number }): string {
    return item.key;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  getPublisherLogo(publishName: PublishNameEnum): string {
    const logoMap: Partial<Record<PublishNameEnum, string>> = {
      [PublishNameEnum.CasaDoCodigo]: 'assets/img/publishers/casa_do_cdigo_logo.jpeg',
      [PublishNameEnum.Novatec]: 'assets/img/publishers/novatec_editora_logo.jpeg',
      [PublishNameEnum.Packts]: 'assets/img/publishers/packt_publishing_logo.jpeg',
      [PublishNameEnum.Elsevier]: 'assets/img/publishers/elsevier_logo.jpeg',
      [PublishNameEnum.AltaBooks]: 'assets/img/publishers/editora_alta_books_logo.jpeg',
    };

    return logoMap[publishName] || 'assets/img/others/livro.jpg';
  }
}
