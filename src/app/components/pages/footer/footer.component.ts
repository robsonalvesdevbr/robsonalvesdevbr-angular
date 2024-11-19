import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
    selector: 'app-footer',
    imports: [CommonModule, NgxPaginationModule],
    templateUrl: './footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}
