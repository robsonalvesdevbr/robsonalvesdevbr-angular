import { BasePageComponent } from '@path-components/base-page/base-page.component'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CommonModule, NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AboutComponent extends BasePageComponent { }
