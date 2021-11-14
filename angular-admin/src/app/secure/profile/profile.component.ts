import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Emitters } from 'src/app/emitters/emitters';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  authSubs: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: '',
    });
    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: '',
    });
    this.authSubs = Emitters.authEmitter.subscribe(user => {
      if (user) this.infoForm.patchValue(user);
    });
  }

  infoSubmit(): void {
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(user => Emitters.authEmitter.emit(user));
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res),
    )
  }

  ngOnDestroy(): void {
    this.authSubs.unsubscribe();
  }

}
