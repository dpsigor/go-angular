import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SecureModule } from './secure/secure.module';
import { MainComponent } from './main.component';
import { NavComponent } from './nav/nav.component';
import { FrontendProductsComponent } from './frontend-products/frontend-products.component';



@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    FrontendProductsComponent,
  ],
  imports: [
    SharedModule,
    SecureModule,
  ]
})
export class MainModule { }
