import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Link } from 'src/app/interfaces/link';
import { Order } from 'src/app/interfaces/order';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  columns = ['ID', 'code', 'count', 'revenue'];
  dataSource = new MatTableDataSource();
  id: number = 0;

  constructor(
    private linkService: LinkService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.linkService.all(this.id).subscribe(
      (links: Link[]) => this.dataSource.data = links,
    );
  }

  sum(orders: Order[]): number {
    return orders.reduce((a, c) => a + c.total, 0);
  }

}
