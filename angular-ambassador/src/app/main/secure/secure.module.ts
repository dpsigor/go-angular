import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SecureComponent,
    ProfileComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class SecureModule { }
