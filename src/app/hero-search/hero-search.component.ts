import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged,
  switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

// variables
  heroes$: Observable<Hero[]>;

// constructor and ng
  constructor(private heroService: HeroService) { }

  ngOnInit() {

    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

// methods
  search(term: string): void {
    this.searchTerms.next(term);
  }

// private
  private searchTerms = new Subject<string>();

  // end
}
