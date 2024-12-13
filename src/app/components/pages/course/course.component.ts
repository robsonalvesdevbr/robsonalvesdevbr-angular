import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  signal,
  WritableSignal,
  inject,
} from '@angular/core';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GoogleAnalyticsDirective } from '@path-app/directives/google-analytics.directive';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { DataService } from '@path-services/data-service';
import { HighlightDirective } from '@path-app/directives/highlight.directive';
import { InstitutionEnum } from '@path-app/models/InstitutionEnum';
import { EnumToArrayPipe } from '@path-pipes/enum-to-array.pipe';

@Component({
  selector: 'app-course',
  imports: [
    CommonModule,
    FilterPipe,
    ImgcursoPipe,
    PrintTagsPipe,
    NgxPaginationModule,
    GoogleAnalyticsDirective,
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
  courses = this.dataService.getCourses();

  institutionList = InstitutionEnum;

  tags: WritableSignal<Set<string>> = signal<Set<string>>(new Set<string>());

  coursesFilter: WritableSignal<Set<InstitutionEnum>> = signal<
    Set<InstitutionEnum>
  >(new Set<InstitutionEnum>());
  selectInstitutionsFilter: WritableSignal<string> = signal<string>(
    InstitutionEnum.All,
  );

  tagsFilter: WritableSignal<Set<string>> = signal<Set<string>>(
    new Set<string>(),
  );
  selectTagFilter: WritableSignal<string> = signal<string>('');

  config: WritableSignal<PaginationInstance> = signal<PaginationInstance>({
    id: 'coursesPag',
    itemsPerPage: 5,
    currentPage: 1,
  });

  ngOnInit(): void {
    this.courses.forEach((course) =>
      course.tags.forEach((tag) => this.tags().add(tag.trim())),
    );
  }

  getTags = () => Array.from(this.tags().values());

  absoluteIndex = (indexOnPage: number): number =>
    this.config().itemsPerPage * (this.config().currentPage - 1) +
    indexOnPage +
    1;

  onPageChange = (number: number) => (this.config().currentPage = number);

  clearFilters() {
    this.coursesFilter().forEach((x) => {
      document.getElementById(`label_course_institution_${x}`)?.click();
    });

    this.tagsFilter().forEach((x) => {
      document.getElementById(`label_course_tag_${x}`)?.click();
    });

    this.coursesFilter().clear();
    this.selectInstitutionsFilter.set(InstitutionEnum.All);
    this.tagsFilter().clear();
    this.selectTagFilter.set('');
  }

  onClickIntitutionEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_course_institution_', '');

    const institution = InstitutionEnum[id as keyof typeof InstitutionEnum];

    if (this.coursesFilter().has(institution)) {
      this.coursesFilter().delete(institution);
    } else {
      this.coursesFilter().add(institution);
    }
    this.selectInstitutionsFilter.set(
      Array.from(this.coursesFilter().values()).join(','),
    );

    this.config().currentPage = 1;
  }

  onClickTagEvent(e: MouseEvent) {
    const link = e.target as HTMLInputElement;
    const id = link.id.replace('input_course_tag_', '');

    if (this.tagsFilter().has(id)) {
      this.tagsFilter().delete(id);
    } else {
      this.tagsFilter().add(id);
    }
    this.selectTagFilter.set(Array.from(this.tagsFilter().keys()).join(','));
  }
}
