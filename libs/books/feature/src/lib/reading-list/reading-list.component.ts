import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit, OnDestroy {
  readingList$: Observable<ReadingListItem[]> = this.store.select(getReadingList);
  subscription: Subscription;

  constructor(private readonly store: Store, private readonly snackBar: MatSnackBar) {}

  ngOnInit() {
    this.subscription = new Subscription();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  removeFromReadingList(item: ReadingListItem): void {
    const snackBarRef = this.snackBar.open(`Book ${item.title} has been removed from reading list`, 'Undo');

    this.subscription.add(snackBarRef.afterDismissed().subscribe((result)=>{
      if (!result.dismissedByAction) {
    this.store.dispatch(removeFromReadingList({ item }));
    }}))
}
}
