import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Emitters } from '../../../emitters/emitters';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnDestroy {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  subs: Subscription;

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
    if (Emitters.user) this.infoForm.patchValue(Emitters.user);
    this.subs = Emitters.authEmitter.subscribe(
      user => {
        if (user) this.infoForm.patchValue(user);
      },
    )
  }

  infoSubmit(): void {
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(user => Emitters.user = user);
  }

  passwordSubmit(): void {
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res),
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
