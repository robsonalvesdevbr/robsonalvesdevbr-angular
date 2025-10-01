import { Component } from '@angular/core';
import { LoadingComponent } from '@path-components/utils/loading/loading.component';
import { PlaceholderComponent } from '@path-components/utils/placeholder/placeholder.component';
import { AboutComponent } from '@path-components/pages/about/about.component';
import { BookComponent } from '@path-components/pages/book/book.component';
import { ContactComponent } from '@path-components/pages/contact/contact.component';
import { CourseComponent } from '@path-components/pages/course/course.component';
import { DashboardComponent } from '@path-components/pages/dashboard/dashboard.component';
import { FooterComponent } from '@path-components/pages/footer/footer.component';
import { FormationCourseComponent } from '@path-components/pages/formationcourse/formationcourse.component';
import { GraduationComponent } from '@path-components/pages/graduation/graduation.component';
import { MasterheadComponent } from '@path-components/pages/masterhead/masterhead.component';
import { NavigationComponent } from '@path-components/pages/navigation/navigation.component';

@Component({
  selector: 'app-home',
  imports: [
    NavigationComponent,
    MasterheadComponent,
    AboutComponent,
    DashboardComponent,
    GraduationComponent,
    CourseComponent,
    FormationCourseComponent,
    BookComponent,
    ContactComponent,
    FooterComponent,
    PlaceholderComponent,
    LoadingComponent,
  ],
  template: `
    <!-- Navigation and Header load immediately (critical) -->
    <app-navigation />
    <app-masterhead [bglight]="true" />

    <!-- Main content with viewport-based lazy loading -->
    @defer (on viewport; prefetch on idle) {
      <app-about />
      <app-dashboard [bglight]="true" />
      <app-graduation />
      <app-course [bglight]="true" />
      <app-formationcourse />
      <app-book [bglight]="true" />
      <app-contact />
      <app-footer />
    } @loading (minimum 100ms; after 500ms) {
      <app-loading />
    } @placeholder (minimum 300ms) {
      <app-placeholder />
    } @error {
      <div class="error-fallback alert alert-warning text-center">
        <i class="bi bi-exclamation-triangle"></i>
        Erro ao carregar conteúdo. Tente recarregar a página.
      </div>
    }
  `,
})
export class HomeComponent {}
