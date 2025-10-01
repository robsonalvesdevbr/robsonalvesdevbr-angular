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
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { EnumToArrayPipe } from '@path-pipes/enum-to-array.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { DataService } from '@path-services/data-service';
import { PaginationService } from '@path-services/pagination.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule,
    ImgcursoPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    NgOptimizedImage,
    HighlightDirective,
    EnumToArrayPipe,
  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent extends BasePageComponent implements OnInit {
  private readonly dataService = inject(DataService);
  private readonly gaService = inject(GoogleAnalyticsService);
  private readonly paginationService = inject(PaginationService);

  private readonly allCourses = signal(this.dataService.getCourses());

  institutionList = InstitutionEnum;
  InstitutionEnum = InstitutionEnum;

  private readonly _tagsArray = signal<string[]>([]);
  coursesFilter: WritableSignal<Set<InstitutionEnum>> = signal<Set<InstitutionEnum>>(new Set<InstitutionEnum>());
  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  config = this.paginationService.createPaginationConfig('coursesPag', 5);

  ngOnInit(): void {
    const uniqueTags = new Set<string>();
    this.allCourses().forEach((course) =>
      course.tags.forEach((tag) => uniqueTags.add(tag.trim()))
    );
    this._tagsArray.set(Array.from(uniqueTags).sort());
  }

  tagsArray = this._tagsArray.asReadonly();

  filteredAndSortedCourses = computed(() => {
    let result = [...this.allCourses()];

    const institutionFilters = this.coursesFilter();
    if (institutionFilters.size > 0) {
      result = result.filter(course => institutionFilters.has(course.institution as InstitutionEnum));
    }

    const tagFilters = this.tagsFilter();
    if (tagFilters.size > 0) {
      result = result.filter(course =>
        course.tags.some(tag => tagFilters.has(tag))
      );
    }

    return result.sort((a, b) => {
      const dateA = a.conclusion ? new Date(a.conclusion).getTime() : 0;
      const dateB = b.conclusion ? new Date(b.conclusion).getTime() : 0;
      return dateB - dateA;
    });
  });

  absoluteIndex = (indexOnPage: number): number =>
    this.config().itemsPerPage * (this.config().currentPage - 1) +
    indexOnPage +
    1;

  onPageChange = (number: number) => (this.config().currentPage = number);

  clearFilters() {
    this.gaService?.event('clear_filters', 'courses', 'filters_cleared');

    this.coursesFilter.set(new Set<InstitutionEnum>());
    this.tagsFilter.set(new Set<string>());
    this.config().currentPage = 1;
  }

  trackByCourse(index: number, item: any): string {
    return item.name + item.institution;
  }

  trackByInstitution(index: number, item: any): string {
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
    this.gaService?.event('filter_institution', 'courses', `${action}_${institution}`);

    const currentFilters = new Set(this.coursesFilter());
    if (currentFilters.has(institution)) {
      currentFilters.delete(institution);
    } else {
      currentFilters.add(institution);
    }
    this.coursesFilter.set(currentFilters);
    this.config().currentPage = 1;
  }

  onClickTagEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;
    
    const id = input.id.replace('input_course_tag_', '');
    
    const action = this.tagsFilter().has(id) ? 'remove' : 'add';
    this.gaService?.event('filter_tag', 'courses', `${action}_${id}`);

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
    this.gaService?.event('certificate_click', 'courses', `${courseName}_${institution}`);
  }

  isInstitutionSelected(institutionKey: string): boolean {
    const institution = InstitutionEnum[institutionKey as keyof typeof InstitutionEnum];
    return this.coursesFilter().has(institution);
  }
}
