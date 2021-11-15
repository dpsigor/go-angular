import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user().subscribe(
      user => Emitters.authEmitter.emit(user),
      () => Emitters.authEmitter.emit(null),
    )
  }

}
