import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicComponent } from './public.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";



@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class PublicModule { }
