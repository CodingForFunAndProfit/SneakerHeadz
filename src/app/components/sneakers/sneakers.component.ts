import { Component, OnInit } from '@angular/core';
import { Sneaker } from '../../entities/sneaker';
import { SneakerService } from '../../services/sneaker.service';

@Component({
  selector: 'app-sneakers',
  templateUrl: './sneakers.component.html',
  styleUrls: ['./sneakers.component.scss'],
})
export class SneakersComponent implements OnInit {
  sneakers: Sneaker[] = [];

  constructor(private sneakerService: SneakerService) {}

  ngOnInit(): void {
    this.getSneakers();
  }

  getSneakers(): void {
    this.sneakerService
      .getSneakers()
      .subscribe((sneakers) => (this.sneakers = sneakers));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.sneakerService.addSneaker({ name } as Sneaker).subscribe((sneaker) => {
      this.sneakers.push(sneaker);
    });
  }

  delete(sneaker: Sneaker): void {
    this.sneakers = this.sneakers.filter((s) => s !== sneaker);
    this.sneakerService.deleteSneaker(sneaker.id).subscribe();
  }
}
