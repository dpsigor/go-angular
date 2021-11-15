import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  myForm: FormGroup;
  isCreate: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.isCreate = this.route.snapshot.data['create'];
    if (!this.isCreate) {
      this.id = this.route.snapshot.params['id'];
      this.productService.get(this.id).subscribe(
        (product: Product) => this.myForm.patchValue(product),
      )
    }
    this.myForm = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: '',
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    const method = this.isCreate
      ? this.productService.create(this.myForm.getRawValue())
      : this.productService.update(this.id, this.myForm.getRawValue());
    method.subscribe(() => this.router.navigate(['/products']));
  }

}
