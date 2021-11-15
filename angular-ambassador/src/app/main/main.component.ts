import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => Emitters.user = user,
      () => Emitters.user = null,
    );
  }

  isMainPage(): boolean {
    const url = this.router.url;
    return url === '/' || url === '/backend';
  }

}
