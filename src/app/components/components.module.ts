import { NgModule } from '@angular/core';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { MasterheadComponent } from './pages/masterhead/masterhead.component';
import { ServicesComponent } from './pages/services/services.component';
import { PortifoliogridComponent } from './pages/portifoliogrid/portifoliogrid.component';
import { AboutComponent } from './pages/about/about.component';
import { TeamComponent } from './pages/team/team.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { GraduationComponent } from './pages/graduation/graduation.component';
import { CourseComponent } from './pages/course/course.component';
import { CommonModule } from '@angular/common';
import { ImgcursoPipe } from '../pipes/imgcurso.pipe';
import { PrintTagsPipe } from '../pipes/print-tags.pipe';


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
    PrintTagsPipe
  ],
  imports: [
    CommonModule
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
    PrintTagsPipe
  ]
})
export class ComponentsModule { }
