import { NgModule } from '@angular/core';
import { NavigationComponent } from '@path-components/pages/navigation/navigation.component';
import { MasterheadComponent } from '@path-components/pages/masterhead/masterhead.component';
import { ServicesComponent } from '@path-components/pages/services/services.component';
import { PortifoliogridComponent } from '@path-components/pages/portifoliogrid/portifoliogrid.component';
import { AboutComponent } from '@path-components/pages/about/about.component';
import { TeamComponent } from '@path-components/pages/team/team.component';
import { ClientsComponent } from '@path-components/pages/clients/clients.component';
import { ContactComponent } from '@path-components/pages/contact/contact.component';
import { FooterComponent } from '@path-components/pages/footer/footer.component';
import { GraduationComponent } from '@path-components/pages/graduation/graduation.component';
import { CourseComponent } from '@path-components/pages/course/course.component';
import { CommonModule } from '@angular/common';
import { ImgcursoPipe } from '@path-pipes/imgcurso.pipe';
import { PrintTagsPipe } from '@path-pipes/print-tags.pipe';
import { MessageDateConclusionPipe } from '@path-pipes/message-date-conclusion.pipe';
import { SortbyPipe } from '@path-pipes/sortby.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookComponent } from '@path-components/pages/book/book.component';
import { FormationoourseComponent } from '@path-components/pages/formationoourse/formationoourse.component';
import { FilterPipe } from '@path-pipes/filter.pipe';
import { AppRoutingModule } from '@path-app/app-routing.module';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { GoogleAnalyticsDirective } from '@path-components/google-analytics.directive';


@NgModule({
  declarations: [
    NavigationComponent,
    MasterheadComponent,
    ServicesComponent,
    PortifoliogridComponent,
    AboutComponent,
    TeamComponent,
    ClientsComponent,
    ContactComponent,
    FooterComponent,
    GraduationComponent,
    CourseComponent,
    ImgcursoPipe,
    PrintTagsPipe,
    MessageDateConclusionPipe,
    SortbyPipe,
    BookComponent,
    FormationoourseComponent,
    FilterPipe,
    BasePageComponent,
    GoogleAnalyticsDirective
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  exports: [
    NavigationComponent,
    MasterheadComponent,
    ServicesComponent,
    PortifoliogridComponent,
    AboutComponent,
    TeamComponent,
    ClientsComponent,
    ContactComponent,
    FooterComponent,
    GraduationComponent,
    CourseComponent,
    ImgcursoPipe,
    PrintTagsPipe,
    MessageDateConclusionPipe,
    SortbyPipe,
    BookComponent,
    FormationoourseComponent,
    FilterPipe,
    AppRoutingModule,
    BasePageComponent,
    GoogleAnalyticsDirective
  ]
})
export class ComponentsModule { }
