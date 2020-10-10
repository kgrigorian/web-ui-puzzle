import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTotalUnread } from '@tmo/books/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-total-count',
  templateUrl: './total-count.component.html',
  styleUrls: ['./total-count.component.scss']
})
export class TotalCountComponent {
  totalUnread$: Observable<number> = this.store.select(getTotalUnread);

  constructor(private readonly store: Store) {}
}
