import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Sneaker } from '../entities/sneaker';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sneakers = [
      { id: 1, name: 'Nike Air Jordan 1' },
      { id: 2, name: 'Adidas Ultraboost' },
      { id: 3, name: 'Nike Air Max 90' },
      { id: 4, name: 'Nike Air Force 1' },
      { id: 5, name: 'Adidas NMD' },
      { id: 6, name: 'Adidas Yeezy Boost 350 V2' },
    ];
    return { sneakers };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(sneakers: Sneaker[]): number {
    return sneakers.length > 0
      ? Math.max(...sneakers.map((sneaker) => sneaker.id)) + 1
      : 1;
  }
}
