import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.component.html'
})
export class PagerComponent {
    @Input() totalCount?: number;
    @Input() pageSize?: number;
    @Output() pageChanged = new EventEmitter<number>();
  
    onPagerChanged(event: any): void {
      this.pageChanged.emit(event.page);
    }
}
