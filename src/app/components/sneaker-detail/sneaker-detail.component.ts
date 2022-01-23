import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sneaker } from '../../entities/sneaker';
import { SneakerService } from '../../services/sneaker.service';

@Component({
  selector: 'app-sneaker-detail',
  templateUrl: './sneaker-detail.component.html',
  styleUrls: ['./sneaker-detail.component.scss'],
})
export class SneakerDetailComponent implements OnInit {
  sneaker: Sneaker | undefined;

  constructor(
    private route: ActivatedRoute,
    private sneakerService: SneakerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSneaker();
  }

  getSneaker(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.sneakerService
      .getSneaker(id)
      .subscribe((sneaker) => (this.sneaker = sneaker));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.sneaker) {
      this.sneakerService
        .updateSneaker(this.sneaker)
        .subscribe(() => this.goBack());
    }
  }
}
