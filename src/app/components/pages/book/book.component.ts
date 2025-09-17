import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  computed,
  signal,
  WritableSignal,
  effect,
} from '@angular/core';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { EnumToArrayPipe } from '../../../pipes/enum-to-array.pipe';

@Component({
  selector: 'app-book',
  imports: [
    CommonModule,
    FilterPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    SortbyPipe,
    NgOptimizedImage,
    HighlightDirective,
    EnumToArrayPipe,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent extends BasePageComponent {
  private readonly dataService = inject(DataService);
  private readonly gaService = inject(GoogleAnalyticsService);
  private readonly paginationService = inject(PaginationService);

  books = signal(this.dataService.getBooks());
  publishNameList = PublishNameEnum;
  PublishNameEnum = PublishNameEnum;

  tags: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());
  
  publishNameFilter: WritableSignal<Set<PublishNameEnum>> = signal<Set<PublishNameEnum>>(new Set<PublishNameEnum>());
  selectPublishNameFilter: WritableSignal<string> = signal<string>('');

  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());
  selectTagFilter: WritableSignal<string> = signal<string>('');

  config = this.paginationService.createPaginationConfig('booksPag', 5);

  constructor() {
    super();

    effect(() => {
      this.books().forEach((book) =>
        book.tags.forEach((tag) => this.tags().add(tag.trim()))
      );
    });
  }


  getTags = computed(() => Array.from(this.tags().values()));
  
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
    this.selectPublishNameFilter.set('');
    this.tagsFilter.set(new Set<string>());
    this.selectTagFilter.set('');
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
    this.selectPublishNameFilter.set(
      Array.from(this.publishNameFilter().values()).join(',')
    );

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
    this.selectTagFilter.set([...this.tagsFilter().values()].join(','));
    this.config().currentPage = 1;
  }
  
  onBookUrlClick(bookTitle: string, publishName: string) {
    this.gaService?.event('book_url_click', 'books', `${bookTitle}_${publishName}`);
  }

  isPublisherSelected(publisherKey: string): boolean {
    const publisher = PublishNameEnum[publisherKey as keyof typeof PublishNameEnum];
    return this.publishNameFilter().has(publisher);
  }
}
