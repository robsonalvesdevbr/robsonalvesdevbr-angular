import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AboutComponent extends BasePageComponent {}
