import { Component, OnInit } from '@angular/core';
import { Sneaker } from '../../entities/sneaker';
import { SneakerService } from '../../services/sneaker.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sneakers: Sneaker[] = [];
  constructor(private sneakerService: SneakerService) {}

  ngOnInit(): void {
    this.getSneakers();
  }

  getSneakers(): void {
    this.sneakerService
      .getSneakers()
      .subscribe((sneakers) => (this.sneakers = sneakers.slice(1, 5)));
  }
}
