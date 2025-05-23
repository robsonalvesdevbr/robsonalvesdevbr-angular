import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import {
  GoogleAnalyticsService,
  NgxGoogleAnalyticsModule,
} from '@hakimio/ngx-google-analytics';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { PublishNameEnum } from '@path-app/models/PublishNameEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
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
    NgxGoogleAnalyticsModule,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService);
  books = this.dataService.getBooks();
  private readonly _gaService = inject(GoogleAnalyticsService);

  publishNameList = PublishNameEnum;

  tags: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  publishNameFilter: WritableSignal<Set<PublishNameEnum>> = signal<
    Set<PublishNameEnum>
  >(new Set<PublishNameEnum>());
  selectPublishNameFilter: WritableSignal<string> = signal<string>('');

  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(
    new Set<string>()
  );
  selectTagFilter: WritableSignal<string> = signal<string>('');

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'booksPag',
    itemsPerPage: 5,
    currentPage: 1,
  });

  ngOnInit(): void {
    this._gaService.pageView('/#books', {
      title: 'Books',
    });
    //this.books.forEach((book) => this.publishNameList().add(book.publishName.trim()))
    this.books.forEach((book) =>
      book.tags.forEach((tag) => this.tags().add(tag.trim()))
    );
  }

  //getPublishNameList = () => Array.from(this.publishNameList().values()).sort((a, b) => (a > b ? 1 : -1))

  getTags = () => Array.from(this.tags().values());

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
    this.publishNameFilter().forEach((x) => {
      document.getElementById(`label_book_institution_${x}`)?.click();
    });

    this.tagsFilter().forEach((x) => {
      document.getElementById(`label_book_tag_${x}`)?.click();
    });

    this.publishNameFilter().clear();
    this.selectPublishNameFilter.set('');
    this.tagsFilter().clear();
    this.selectTagFilter.set('');
  }

  onClickIntitutionEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_book_institution_', '');

    const publishName = PublishNameEnum[id as keyof typeof PublishNameEnum];

    if (this.publishNameFilter().has(publishName)) {
      this.publishNameFilter().delete(publishName);
    } else {
      this.publishNameFilter().add(publishName);
    }
    this.selectPublishNameFilter.set(
      Array.from(this.publishNameFilter().values()).join(',')
    );

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_book_tag_', '');

    if (this.tagsFilter().has(id)) {
      this.tagsFilter().delete(id);
    } else {
      this.tagsFilter().add(id);
    }
    this.selectTagFilter.set([...this.tagsFilter().values()].join(','));
  }
}
