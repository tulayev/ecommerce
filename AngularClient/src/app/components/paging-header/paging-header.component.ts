import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-paging-header',
    templateUrl: './paging-header.component.html'
})
export class PagingHeaderComponent {
    @Input() pageNumber?: number;
    @Input() pageSize?: number;
    @Input() totalCount?: number;
}
