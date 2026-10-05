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
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { EnumToArrayPipe } from '@path-pipes/enum-to-array.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { TagLabelPipe } from '@path-pipes/tag-label.pipe';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { AnalyticsService } from '@path-services/analytics.service';
import { CatalogFilterService } from '@path-services/catalog-filter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICourse } from '@path-interfaces/ICourse';
import { debounce } from '@path-utils/performance.utils';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule,
    ImgcursoPipe,
    PrintTagsPipe,
    TranslatePipe,
    NgxPaginationModule,
    NgOptimizedImage,
    HighlightDirective,
    EnumToArrayPipe,
    TagLabelPipe,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly paginationService = inject(PaginationService);
  private readonly catalogFilterService = inject(CatalogFilterService);

  private readonly allCourses = signal(this.dataService.getCourses());

  institutionList = InstitutionEnum;
  InstitutionEnum = InstitutionEnum;

  private readonly _tagsArray = signal<string[]>([]);
  coursesFilter: WritableSignal<Set<InstitutionEnum>> = signal<Set<InstitutionEnum>>(new Set<InstitutionEnum>());
  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());
  searchQuery = signal<string>('');

  config = this.paginationService.createPaginationConfig('coursesPag', 5);

  private readonly debouncedTrackSearch = debounce((term: string, count: number) => {
    if (term.length >= 2) {
      this.analyticsService.trackSearch(term, 'courses', count);
    }
  }, 600);

  constructor() {
    super();
    effect(() => {
      const term = this.searchQuery().trim();
      const count = this.filteredAndSortedCourses().length;
      this.debouncedTrackSearch(term, count);
    });
  }

  ngOnInit(): void {
    this._tagsArray.set(
      this.catalogFilterService.collectUniqueTags(this.allCourses(), (course) => course.tags)
    );
  }

  tagsArray = this._tagsArray.asReadonly();

  availableTags = computed(() =>
    this.catalogFilterService.availableTags(
      this.allCourses(),
      this.coursesFilter(),
      (course) => course.institution as InstitutionEnum,
      (course) => course.tags
    )
  );

  filteredAndSortedCourses = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();

    const result = this.catalogFilterService.filterByCategoryAndTags(
      this.allCourses(),
      this.coursesFilter(),
      (course) => course.institution as InstitutionEnum,
      this.tagsFilter(),
      (course) => course.tags,
      (course) => !query || course.name.toLowerCase().includes(query)
    );

    return this.sortCourses(result);
  });

  private sortCourses(courses: readonly ICourse[]): ICourse[] {
    return [...courses].sort((a, b) => {
      const dateA = a.conclusion ? new Date(a.conclusion).getTime() : 0;
      const dateB = b.conclusion ? new Date(b.conclusion).getTime() : 0;
      return dateB - dateA;
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
    const totalPages = Math.ceil(this.filteredAndSortedCourses().length / this.config().itemsPerPage);
    this.analyticsService.trackPagination('courses', number, totalPages);
  }

  clearFilters() {
    this.analyticsService.trackClearFilters('courses');

    this.coursesFilter.set(new Set<InstitutionEnum>());
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

  removeInstitution(institutionKey: string): void {
    const institution = InstitutionEnum[institutionKey as keyof typeof InstitutionEnum];
    if (!institution) return;
    const current = new Set(this.coursesFilter());
    current.delete(institution);
    this.coursesFilter.set(current);
    this.config().currentPage = 1;
  }

  trackByCourse(index: number, item: ICourse): string {
    return item.id;
  }

  trackByInstitution(index: number, item: { key: string; value: string | number }): string {
    return item.key;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  onClickIntitutionEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;

    const id = input.id.replace('input_course_institution_', '');
    const institution = InstitutionEnum[id as keyof typeof InstitutionEnum];

    if (!institution) return;

    const action = this.coursesFilter().has(institution) ? 'remove' : 'add';
    this.analyticsService.trackFilterInstitution(institution, action);

    const currentFilters = new Set(this.coursesFilter());
    if (currentFilters.has(institution)) {
      currentFilters.delete(institution);
    } else {
      currentFilters.add(institution);
    }
    this.coursesFilter.set(currentFilters);

    const validTags = this.catalogFilterService.reconcileTagFilters(this.availableTags(), this.tagsFilter());
    if (validTags) {
      this.tagsFilter.set(validTags);
    }

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;

    const id = input.id.replace('input_course_tag_', '');

    const action = this.tagsFilter().has(id) ? 'remove' : 'add';
    this.analyticsService.trackFilterTag(id, action, 'courses');

    const currentTags = new Set(this.tagsFilter());
    if (currentTags.has(id)) {
      currentTags.delete(id);
    } else {
      currentTags.add(id);
    }
    this.tagsFilter.set(currentTags);
    this.config().currentPage = 1;
  }

  onCertificateClick(courseName: string, institution: string) {
    this.analyticsService.trackCertificateClick(courseName, institution);
  }

  isInstitutionSelected(institutionKey: string): boolean {
    const institution = InstitutionEnum[institutionKey as keyof typeof InstitutionEnum];
    return this.coursesFilter().has(institution);
  }
}
