import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
  computed,
} from '@angular/core';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { EnumToArrayPipe } from '@path-pipes/enum-to-array.pipe';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule,
    FilterPipe,
    ImgcursoPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    SortbyPipe,
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

  courses = signal(this.dataService.getCourses());

  institutionList = InstitutionEnum;

  tags: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  coursesFilter: WritableSignal<Set<InstitutionEnum>> = signal<
    Set<InstitutionEnum>
  >(new Set<InstitutionEnum>());
  selectInstitutionsFilter: WritableSignal<string> = signal<string>(
    InstitutionEnum.All
  );

  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(
    new Set<string>()
  );
  selectTagFilter: WritableSignal<string> = signal<string>('');

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  });

  ngOnInit(): void {
    this.courses().forEach((course) =>
      course.tags.forEach((tag) => this.tags().add(tag.trim()))
    );
  }

  tagsArray = computed(() => Array.from(this.tags().values()));

  absoluteIndex = (indexOnPage: number): number =>
    this.config().itemsPerPage * (this.config().currentPage - 1) +
    indexOnPage +
    1;

  onPageChange = (number: number) => (this.config().currentPage = number);

  clearFilters() {
    this.gaService?.event('clear_filters', 'courses', 'filters_cleared');

    // Desmarcar todos os checkboxes de instituição diretamente no DOM
    document.querySelectorAll('input[id^="input_course_institution_"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });

    // Desmarcar todos os checkboxes de tags diretamente no DOM  
    document.querySelectorAll('input[id^="input_course_tag_"]').forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });

    this.coursesFilter().clear();
    this.selectInstitutionsFilter.set(InstitutionEnum.All);
    this.tagsFilter().clear();
    this.selectTagFilter.set('');
    this.config().currentPage = 1;
  }

  onClickIntitutionEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;
    
    const id = input.id.replace('input_course_institution_', '');
    const institution = InstitutionEnum[id as keyof typeof InstitutionEnum];
    
    if (!institution) return;

    const action = this.coursesFilter().has(institution) ? 'remove' : 'add';
    this.gaService?.event('filter_institution', 'courses', `${action}_${institution}`);

    if (this.coursesFilter().has(institution)) {
      this.coursesFilter().delete(institution);
    } else {
      this.coursesFilter().add(institution);
    }
    this.selectInstitutionsFilter.set(
      Array.from(this.coursesFilter().values()).join(',')
    );

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !input.id) return;
    
    const id = input.id.replace('input_course_tag_', '');
    
    const action = this.tagsFilter().has(id) ? 'remove' : 'add';
    this.gaService?.event('filter_tag', 'courses', `${action}_${id}`);

    if (this.tagsFilter().has(id)) {
      this.tagsFilter().delete(id);
    } else {
      this.tagsFilter().add(id);
    }
    this.selectTagFilter.set([...this.tagsFilter().keys()].join(','));
    this.config().currentPage = 1;
  }

  onCertificateClick(courseName: string, institution: string) {
    this.gaService?.event('certificate_click', 'courses', `${courseName}_${institution}`);
  }
}
