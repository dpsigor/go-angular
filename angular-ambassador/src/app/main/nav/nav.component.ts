import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (user: User) => this.user = user,
    )
  }

  logout(): void {
    console.log('alou');
    this.authService.logout().subscribe(
      () => Emitters.authEmitter.emit(null),
    )
  }

}
