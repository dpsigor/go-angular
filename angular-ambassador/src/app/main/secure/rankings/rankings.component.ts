import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  rankings: { [key: string]: number } = {};

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.rankings().subscribe(
      rankings => {
        for (const rank of rankings) {
          this.rankings[Object.keys(rank)[0]] = Number(Object.values(rank)[0]);
        }
      }
    );
  }

}
