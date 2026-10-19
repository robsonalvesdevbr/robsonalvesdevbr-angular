import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BasePageComponent } from '@path-components/base-page/base-page.component';
import { TranslatePipe } from '@path-pipes/translate.pipe';
import { DataService } from '@path-services/data-service';

@Component({
  selector: 'app-skills',
  imports: [TranslatePipe],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent extends BasePageComponent {
  readonly skillGroups = inject(DataService).getSkillGroups();
}
