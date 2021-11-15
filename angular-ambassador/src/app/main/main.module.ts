import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class MainModule { }
