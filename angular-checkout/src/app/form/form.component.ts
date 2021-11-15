import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { LinkService } from '../services/link.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  code: string = '';
  user: User | null = null;
  products: Product[] = [];
  quantities: number[] = [];
  form: FormGroup;

  constructor(
    private linkService: LinkService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      country: '',
      city: '',
      zip: '',
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.params['code'];
    this.linkService.get(this.code).subscribe(
      r => {
        this.user = r.user;
        this.products = r.products;
      },
    );
  }

  total(): number {
    return this.products.reduce((s, p) => s + p.price * (this.quantities[p.id] || 0), 0)
  }

  submit(): void {
    const products = this.products.map(p => ({
      product_id: p.id,
      quantity: this.quantities[p.id],
    })).filter(p => p.quantity > 0);
    const data = {
      code: this.code,
      products,
      ...this.form.getRawValue(),
    };
    this.orderService.create(data).subscribe(
      r => {
        console.log(r);
      },
    )
  }

}
