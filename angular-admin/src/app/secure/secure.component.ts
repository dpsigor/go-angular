import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Emitters} from '../emitters/emitters';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => {
        Emitters.authEmitter.emit(user);
      },
      err => {
        Emitters.authEmitter.emit(null);
        this.router.navigate(['/login']);
      },
    )
  }

}
