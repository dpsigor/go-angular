import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Welcome';
  description = 'Share links to earn money';
  user: User | null = null;

  constructor() { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (user: User) => {
        this.user = user;
        this.title = user ? '$' + user.revenue : 'Welcome';
        this.description = user ? 'You have earned this far' : 'Share links to earn money';
      }
    )
  }

}
