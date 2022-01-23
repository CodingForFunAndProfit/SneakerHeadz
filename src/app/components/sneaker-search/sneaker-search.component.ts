import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Sneaker } from '../../entities/sneaker';
import { SneakerService } from '../../services/sneaker.service';

@Component({
  selector: 'app-sneaker-search',
  templateUrl: './sneaker-search.component.html',
  styleUrls: ['./sneaker-search.component.scss'],
})
export class SneakerSearchComponent implements OnInit {
  sneakers$!: Observable<Sneaker[]>;
  private searchTerms = new Subject<string>();

  constructor(private sneakerService: SneakerService) {}

  ngOnInit(): void {
    this.sneakers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.sneakerService.searchSneakers(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
