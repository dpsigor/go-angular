import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { LinksComponent } from './secure/links/links.component';
import { ProductsFormComponent } from './secure/products/products-form/products-form.component';
import { ProductsComponent } from './secure/products/products.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { SecureComponent } from './secure/secure.component';
import { UsersComponent } from './secure/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/:id/links', component: LinksComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: ProductsFormComponent },
    ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
