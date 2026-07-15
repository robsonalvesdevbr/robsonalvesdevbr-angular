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
import { TagLabelPipe } from '@path-pipes/tag-label.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { AnalyticsService } from '@path-services/analytics.service';
import { CatalogFilterService } from '@path-services/catalog-filter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EnumToArrayPipe } from '@path-pipes/enum-to-array.pipe';
import { IBook } from '@path-interfaces/IBook';
import { debounce } from '@path-utils/performance.utils';
import { getPublisherLogo } from '@path-data/PublisherLogo';

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
    TagLabelPipe,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly paginationService = inject(PaginationService);
  private readonly catalogFilterService = inject(CatalogFilterService);

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
    this._tagsArray.set(this.catalogFilterService.collectUniqueTags(this.allBooks(), (book) => book.tags));
  }

  tagsArray = this._tagsArray.asReadonly();

  availableTags = computed(() =>
    this.catalogFilterService.availableTags(
      this.allBooks(),
      this.publishNameFilter(),
      (book) => book.publishName as PublishNameEnum,
      (book) => book.tags
    )
  );

  filteredAndSortedBooks = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();

    const result = this.catalogFilterService.filterByCategoryAndTags(
      this.allBooks(),
      this.publishNameFilter(),
      (book) => book.publishName as PublishNameEnum,
      this.tagsFilter(),
      (book) => book.tags,
      (book) =>
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.some((a) => a.toLowerCase().includes(query))
    );

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

  onClickIntitutionEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;

    const id = input.id.replace('input_book_institution_', '');
    const publishName = PublishNameEnum[id as keyof typeof PublishNameEnum];

    if (!publishName) return;

    const action = this.publishNameFilter().has(publishName) ? 'remove' : 'add';
    this.analyticsService.trackFilterPublisher(publishName, action);

    const currentFilters = new Set(this.publishNameFilter());
    if (currentFilters.has(publishName)) {
      currentFilters.delete(publishName);
    } else {
      currentFilters.add(publishName);
    }
    this.publishNameFilter.set(currentFilters);

    const validTags = this.catalogFilterService.reconcileTagFilters(this.availableTags(), this.tagsFilter());
    if (validTags) {
      this.tagsFilter.set(validTags);
    }

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;

    const id = input.id.replace('input_book_tag_', '');

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

  readonly getPublisherLogo = getPublisherLogo;
}
