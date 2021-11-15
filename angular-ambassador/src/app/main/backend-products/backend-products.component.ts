import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedProducts } from 'src/app/interfaces/paginated-products';
import { Product } from 'src/app/interfaces/product';
import { LinkService } from 'src/app/services/link.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-backend-products',
  templateUrl: './backend-products.component.html',
  styleUrls: ['./backend-products.component.css']
})
export class BackendProductsComponent implements OnInit {
  products: Product[] = [];
  page = 1;
  showButton = true;
  sort: 'asc' | 'desc' | '' = '';
  selected: number[] = [];
  link = '';
  error = false;

  constructor(
    private productService: ProductService,
    private linkService: LinkService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queryParams => {
        this.page = parseInt(queryParams['page']) || 1;
        this.sort = ['asc', 'desc'].includes(queryParams['sort']) ? queryParams['sort'] : '';
        const s = queryParams['s'] || '';
        this.productService.backend({
          page: this.page,
          sort: this.sort,
          s,
        }).subscribe(
          (res: PaginatedProducts) => {
            this.products = this.page === 1 ? res.data : [...this.products, ...res.data];
            this.showButton = res.last_page !== this.page;
          },
        );
      },
    );
  }

  loadMore(): void {
    this.page++;
    this.router.navigate([], { queryParams: { page: this.page } });
  }

  search(s: string): void {
    this.router.navigate([], {
      queryParams: {
        s,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSort(sort: string): void {
    if (!['asc', 'desc'].includes(sort)) return;
    this.router.navigate([], {
      queryParams: {
        sort,
        page: 1,
      },
      queryParamsHandling: 'merge',
    });
  }

  select(id: number): void {
    if (!this.isSelected(id)) {
      this.selected = [...this.selected, id];
    } else {
      this.selected = this.selected.filter(s => s !== id);
    }
  }

  isSelected(id: number): boolean {
    return this.selected.some(s => s === id);
  }

  generate(): void {
    this.linkService.generate({
      products: this.selected,
    }).subscribe(
      link => {
        this.link = `${environment.checkout_url}/${link.code}`;
      },
      err => {
        console.error(err);
        this.error = true;
      },
    );
  }

}
