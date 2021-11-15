import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
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
    this.productService.create(this.myForm.getRawValue()).subscribe(
      () => this.router.navigate(['/products']),
    );
  }

}
