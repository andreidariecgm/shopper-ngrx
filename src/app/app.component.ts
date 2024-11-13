import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectCartSize } from 'src/app/shared/store/shopper.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  cartSize$: Observable<number> = of(0);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.cartSize$ = this.store.select(selectCartSize);
  }
}
